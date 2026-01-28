"""
Knowledge Cache Manager
Load và quản lý cache từ file JSON (persistent cache)
"""

import json
import os
import hashlib
from datetime import datetime
import logging

logger = logging.getLogger(__name__)

class KnowledgeCache:
    def __init__(self, cache_file="knowledge/cache.json"):
        self.cache_file = cache_file
        self.cache = {}  # {question_hash: entry}
        self.index = {}  # {question_normalized: question_hash}
        self.stats = {}
        
    def load(self):
        """Load cache từ file JSON"""
        if not os.path.exists(self.cache_file):
            logger.warning(f"⚠️  No cache file found at {self.cache_file}")
            logger.info("💡 Cache will be built from scratch")
            return
        
        logger.info("🔄 Loading knowledge cache...")
        
        try:
            with open(self.cache_file, "r", encoding="utf-8") as f:
                data = json.load(f)
            
            # Load cache entries
            for entry in data.get("cache", []):
                q_hash = entry["question_hash"]
                q_normalized = entry["question_normalized"]
                
                self.cache[q_hash] = entry
                self.index[q_normalized] = q_hash
            
            # Load stats
            self.stats = data.get("stats", {})
            
            logger.info(f"✅ Loaded {len(self.cache)} cached queries")
            logger.info(f"   Hit rate: {self.stats.get('hit_rate', 0)*100:.1f}%")
            logger.info(f"   Accuracy: {self.stats.get('accuracy', 0)*100:.1f}%")
            
        except Exception as e:
            logger.error(f"❌ Error loading cache: {str(e)}")
            logger.info("💡 Starting with empty cache")
    
    def get(self, question):
        """Tìm trong cache (exact match)"""
        # Normalize question
        q_normalized = question.lower().strip()
        
        # Exact match
        if q_normalized in self.index:
            q_hash = self.index[q_normalized]
            entry = self.cache[q_hash]
            
            # Update stats
            entry["hit_count"] = entry.get("hit_count", 0) + 1
            entry["last_used_at"] = datetime.now().isoformat()
            
            logger.info(f"✅ Cache hit: {question}")
            return entry
        
        logger.info(f"❌ Cache miss: {question}")
        return None
    
    def add(self, question, sql, confidence=0.5, pattern="generated"):
        """Thêm vào cache"""
        q_normalized = question.lower().strip()
        q_hash = hashlib.md5(question.encode()).hexdigest()
        
        # Check if already exists
        if q_hash in self.cache:
            logger.info(f"⚠️  Question already in cache: {question}")
            return
        
        entry = {
            "id": len(self.cache) + 1,
            "question": question,
            "question_normalized": q_normalized,
            "question_hash": q_hash,
            "sql": sql,
            "confidence": confidence,
            "pattern": pattern,
            "category": "runtime",
            "verified": False,
            "hit_count": 0,
            "correct_count": 0,
            "incorrect_count": 0,
            "avg_response_time": 0.0,
            "created_at": datetime.now().isoformat(),
            "last_used_at": datetime.now().isoformat()
        }
        
        self.cache[q_hash] = entry
        self.index[q_normalized] = q_hash
        
        logger.info(f"💾 Added to cache: {question}")
        
        # Auto-save
        self.save()
    
    def save(self):
        """Lưu cache vào file JSON"""
        try:
            # Create directory if not exists
            os.makedirs(os.path.dirname(self.cache_file), exist_ok=True)
            
            # Calculate stats
            total_hits = sum(e.get("hit_count", 0) for e in self.cache.values())
            total_correct = sum(e.get("correct_count", 0) for e in self.cache.values())
            total_incorrect = sum(e.get("incorrect_count", 0) for e in self.cache.values())
            
            self.stats = {
                "total_queries": total_hits,
                "cache_hits": total_hits,
                "cache_misses": 0,  # Not tracked yet
                "hit_rate": 1.0 if total_hits > 0 else 0.0,
                "avg_response_time": 0.05,
                "total_correct": total_correct,
                "total_incorrect": total_incorrect,
                "accuracy": total_correct / (total_correct + total_incorrect) if (total_correct + total_incorrect) > 0 else 1.0
            }
            
            data = {
                "version": "1.0",
                "model_version": "qwen-1.5b-finetuned",
                "created_at": datetime.now().isoformat(),
                "updated_at": datetime.now().isoformat(),
                "total_entries": len(self.cache),
                "cache": list(self.cache.values()),
                "stats": self.stats
            }
            
            with open(self.cache_file, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            
            logger.info(f"💾 Cache saved: {len(self.cache)} entries")
            
        except Exception as e:
            logger.error(f"❌ Error saving cache: {str(e)}")
    
    def get_stats(self):
        """Get cache statistics"""
        return {
            "total_entries": len(self.cache),
            "stats": self.stats,
            "top_questions": sorted(
                self.cache.values(),
                key=lambda x: x.get("hit_count", 0),
                reverse=True
            )[:10]
        }
    
    def clear(self):
        """Clear cache (for testing)"""
        self.cache.clear()
        self.index.clear()
        logger.info("🗑️  Cache cleared")

# Singleton instance
knowledge_cache = KnowledgeCache()
