"""
OPTIMIZED SQL Generator with persistent knowledge cache
"""
import torch
import re
import hashlib
from model_loader_finetuned import finetuned_model_loader as model_loader
from prompt_builder import PromptBuilder
from knowledge_cache import knowledge_cache  # ✅ Import knowledge cache
from config import TEMPERATURE, TOP_P
import logging

logger = logging.getLogger(__name__)

class SQLGenerator:
    
    def __init__(self):
        self.model_loader = model_loader
        self.prompt_builder = PromptBuilder()
        self.memory_cache = {}  # ✅ In-memory cache (fast)
        logger.info("✅ SQL Generator initialized")
    
    def load_knowledge_cache(self):
        """Load persistent knowledge cache from file"""
        knowledge_cache.load()
    
    def generate_sql(self, question):
        # ✅ STEP 1: Check in-memory cache (fastest)
        cache_key = hashlib.md5(question.encode()).hexdigest()
        if cache_key in self.memory_cache:
            logger.info(f"✅ Memory cache hit for: {question}")
            return self.memory_cache[cache_key]
        
        # ✅ STEP 2: Check knowledge cache (persistent)
        cached = knowledge_cache.get(question)
        if cached:
            logger.info(f"✅ Knowledge cache hit for: {question}")
            result = {
                "sql": cached["sql"],
                "confidence": cached["confidence"],
                "raw_output": f"[Cached] {cached['sql']}",
                "source": "knowledge_cache"
            }
            # Save to memory cache
            self.memory_cache[cache_key] = result
            return result
        
        # ✅ STEP 3: Generate new SQL
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
            "raw_output": generated_text,
            "source": "generated"
        }
        
        # ✅ Save to both caches
        self.memory_cache[cache_key] = result
        knowledge_cache.add(question, sql, result["confidence"], pattern="runtime")
        
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
        """Clear memory cache (useful for testing)"""
        self.memory_cache.clear()
        logger.info("🗑️  Memory cache cleared")
    
    def get_cache_size(self):
        """Get number of cached queries"""
        return {
            "memory_cache": len(self.memory_cache),
            "knowledge_cache": len(knowledge_cache.cache)
        }
    
    def get_cache_stats(self):
        """Get cache statistics"""
        return knowledge_cache.get_stats()

sql_generator = SQLGenerator()
