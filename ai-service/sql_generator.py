import torch
import re
import sqlparse
from model_loader import model_loader
from prompt_builder import PromptBuilder
from config import TEMPERATURE, TOP_P
import logging

logger = logging.getLogger(__name__)

class SQLGenerator:
    
    def __init__(self):
        self.model = model_loader.get_model()
        self.tokenizer = model_loader.get_tokenizer()
        self.prompt_builder = PromptBuilder()
    
    def generate_sql(self, question):
        logger.info("Generating SQL for: " + question)
        
        prompt = self.prompt_builder.build_prompt(question)
        inputs = self.tokenizer(prompt, return_tensors="pt")
        device = next(self.model.parameters()).device
        inputs = {k: v.to(device) for k, v in inputs.items()}
        
        with torch.no_grad():
            outputs = self.model.generate(**inputs, max_new_tokens=256, temperature=TEMPERATURE, top_p=TOP_P, do_sample=True, pad_token_id=self.tokenizer.eos_token_id)
        
        generated_text = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        sql = self._extract_sql(generated_text, prompt)
        sql = self._validate_sql(sql)
        
        logger.info("Generated SQL: " + sql)
        
        return {"sql": sql, "confidence": self._calc_confidence(sql), "raw_output": generated_text}
    
    def _extract_sql(self, text, prompt):
        if prompt in text:
            text = text.replace(prompt, "").strip()
        if "SQL:" in text:
            text = text.split("SQL:")[-1].strip()
        text = re.sub(r'```sql\s*', '', text)
        text = re.sub(r'```\s*', '', text)
        if '\n' in text:
            text = text.split('\n')[0].strip()
        return text.strip().rstrip(';')
    
    def _validate_sql(self, sql):
        if not sql:
            raise ValueError("Empty SQL")
        sql_lower = sql.lower()
        if not sql_lower.startswith('select') and not sql_lower.startswith('call'):
            raise ValueError("Only SELECT and CALL allowed")
        try:
            return sqlparse.format(sql, reindent=True, keyword_case='upper').strip()
        except:
            return sql.strip()
    
    def _calc_confidence(self, sql):
        confidence = 1.0
        sql_lower = sql.lower()
        if 'donghoid' not in sql_lower:
            confidence -= 0.3
        if 'active_flag' not in sql_lower:
            confidence -= 0.1
        return max(0.0, min(1.0, confidence))

sql_generator = SQLGenerator()
