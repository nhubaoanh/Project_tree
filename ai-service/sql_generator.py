"""
OPTIMIZED SQL Generator with caching and faster generation
"""
import torch
import re
import sqlparse
import hashlib
from model_loader_finetuned import finetuned_model_loader as model_loader
from prompt_builder import PromptBuilder
from config import TEMPERATURE, TOP_P
import logging

logger = logging.getLogger(__name__)

class SQLGenerator:
    
    def __init__(self):
        self.model_loader = model_loader
        self.prompt_builder = PromptBuilder()
        self.cache = {}  # ✅ Simple in-memory cache
        logger.info("✅ SQL Generator initialized with caching enabled")
    
    def generate_sql(self, question):
        # ✅ Check cache first
        cache_key = hashlib.md5(question.encode()).hexdigest()
        if cache_key in self.cache:
            logger.info(f"✅ Cache hit for: {question}")
            return self.cache[cache_key]
        
        logger.info(f"🔄 Generating SQL for: {question}")
        
        prompt = self.prompt_builder.build_prompt(question)
        
        # Use model_loader.generate() directly
        generated_text = self.model_loader.generate(
            prompt,
            max_new_tokens=128  # ✅ Reduced from 256 (2x faster)
        )
        
        sql = self._extract_sql(generated_text, prompt)
        sql = self._validate_sql(sql)
        
        logger.info(f"✅ Generated SQL: {sql}")
        
        result = {
            "sql": sql, 
            "confidence": self._calc_confidence(sql), 
            "raw_output": generated_text
        }
        
        # ✅ Save to cache
        self.cache[cache_key] = result
        logger.info(f"💾 Cached result for: {question}")
        
        return result
    
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
        
        # ✅ OPTIMIZED: Tắt sqlparse.format() (chậm 0.5-1s)
        # Chỉ strip thôi - nhanh hơn nhiều!
        return sql.strip()
    
    def _calc_confidence(self, sql):
        confidence = 1.0
        sql_lower = sql.lower()
        if 'donghoid' not in sql_lower:
            confidence -= 0.3
        if 'active_flag' not in sql_lower:
            confidence -= 0.1
        return max(0.0, min(1.0, confidence))
    
    def clear_cache(self):
        """Clear cache (useful for testing)"""
        self.cache.clear()
        logger.info("🗑️  Cache cleared")
    
    def get_cache_size(self):
        """Get number of cached queries"""
        return len(self.cache)

sql_generator = SQLGenerator()
