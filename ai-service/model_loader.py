import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from config import MODEL_NAME, MODEL_CACHE_DIR, DEVICE
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ModelLoader:
    _instance = None
    _model = None
    _tokenizer = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(ModelLoader, cls).__new__(cls)
        return cls._instance
    
    def load_model(self):
        if self._model is not None and self._tokenizer is not None:
            return self._model, self._tokenizer
            
        logger.info("=" * 60)
        logger.info("Loading model: " + MODEL_NAME)
        logger.info("Device: " + DEVICE)
        logger.info("Cache dir: " + MODEL_CACHE_DIR)
        logger.info("=" * 60)
        
        try:
            logger.info("Loading tokenizer...")
            self._tokenizer = AutoTokenizer.from_pretrained(
                MODEL_NAME, 
                cache_dir=MODEL_CACHE_DIR, 
                trust_remote_code=True
            )
            logger.info("✓ Tokenizer loaded successfully!")
            
            if DEVICE == "cuda" and torch.cuda.is_available():
                logger.info("Loading model on GPU with float16...")
                self._model = AutoModelForCausalLM.from_pretrained(
                    MODEL_NAME, 
                    cache_dir=MODEL_CACHE_DIR, 
                    torch_dtype=torch.float16, 
                    device_map="auto", 
                    trust_remote_code=True
                )
            else:
                logger.info("Loading model on CPU...")
                logger.warning("⚠️  CPU mode: This will be slow. Consider using GPU or smaller model.")
                self._model = AutoModelForCausalLM.from_pretrained(
                    MODEL_NAME, 
                    cache_dir=MODEL_CACHE_DIR,
                    torch_dtype=torch.float16,
                    low_cpu_mem_usage=True,  # Reduce RAM usage
                    trust_remote_code=True
                )
                self._model = self._model.to("cpu")
            
            logger.info("=" * 60)
            logger.info("✓ Model loaded successfully!")
            logger.info(f"Model size: {sum(p.numel() for p in self._model.parameters()) / 1e9:.2f}B parameters")
            logger.info("=" * 60)
            
            return self._model, self._tokenizer
            
        except Exception as e:
            logger.error("=" * 60)
            logger.error("❌ Failed to load model!")
            logger.error(f"Error: {str(e)}")
            logger.error("=" * 60)
            logger.error("\n💡 SOLUTIONS:")
            logger.error("1. Increase Windows Virtual Memory (see FIX_MEMORY_ERROR.md)")
            logger.error("2. Use smaller model: Qwen/Qwen2.5-Coder-1.5B-Instruct")
            logger.error("3. Use 8-bit quantization (requires bitsandbytes)")
            logger.error("=" * 60)
            raise
    
    def get_model(self):
        if self._model is None:
            self.load_model()
        return self._model
    
    def get_tokenizer(self):
        if self._tokenizer is None:
            self.load_model()
        return self._tokenizer

model_loader = ModelLoader()
