"""
Model Loader cho Fine-tuned Model
Load model đã train sẵn (như trí nhớ) - NHANH, không cần train lại
"""

from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel
import torch
import os

class FinetunedModelLoader:
    def __init__(self):
        self._model = None
        self._tokenizer = None
        self.base_model_name = "Qwen/Qwen2.5-Coder-1.5B-Instruct"
        self.finetuned_path = "./finetuned_model"
        self.cache_dir = "./models"
        
    def load_model(self):
        """
        Load model đã fine-tune
        - Lần 1: Load base model + adapter (2-3 phút)
        - Lần 2+: Load từ cache (10-20 giây) ⚡
        """
        print("="*60)
        print("🧠 LOADING FINE-TUNED MODEL (TRÍ NHỚ)")
        print("="*60)
        
        # Kiểm tra có model đã train không
        if not os.path.exists(self.finetuned_path):
            print(f"❌ Chưa có model fine-tuned tại: {self.finetuned_path}")
            print("💡 Hãy chạy: python finetune_lora.py")
            raise FileNotFoundError("Fine-tuned model not found")
        
        print(f"📂 Base model: {self.base_model_name}")
        print(f"📂 Fine-tuned: {self.finetuned_path}")
        print(f"📂 Cache: {self.cache_dir}")
        
        # 1. Load tokenizer
        print("\n🔄 [1/3] Loading tokenizer...")
        self._tokenizer = AutoTokenizer.from_pretrained(
            self.finetuned_path,
            trust_remote_code=True
        )
        print("✅ Tokenizer loaded")
        
        # 2. Load base model (TỐI ƯU CHO RAM THẤP - 8GB)
        print("\n🔄 [2/3] Loading base model...")
        print("⚠️  RAM thấp - Đang tối ưu...")
        
        base_model = AutoModelForCausalLM.from_pretrained(
            self.base_model_name,
            cache_dir=self.cache_dir,
            torch_dtype=torch.float16,  # float16 nhẹ hơn float32
            device_map="cpu",  # Force CPU
            trust_remote_code=True,
            low_cpu_mem_usage=True,  # Tối ưu RAM
            max_memory={0: "6GB", "cpu": "6GB"}  # Giới hạn RAM
        )
        print("✅ Base model loaded")
        
        # 3. Load LoRA adapters (TRÍ NHỚ ĐÃ HỌC)
        print("\n🔄 [3/3] Loading LoRA adapters (trí nhớ)...")
        self._model = PeftModel.from_pretrained(
            base_model,
            self.finetuned_path,
            device_map="cpu"  # Force CPU cho adapter
        )
        print("✅ LoRA adapters loaded")
        
        # KHÔNG merge để tiết kiệm RAM
        print("\n💡 Keeping adapters separate (saves RAM)")
        
        print("\n" + "="*60)
        print("🎉 MODEL READY! (ĐÃ CÓ TRÍ NHỚ)")
        print("="*60)
        print("💡 Model này đã học từ dữ liệu của bạn")
        print("💡 Lần sau load sẽ nhanh hơn (cache)")
        print("="*60 + "\n")
        
    def generate(self, prompt: str, max_new_tokens: int = 128) -> str:
        """Generate text từ model đã fine-tune - OPTIMIZED"""
        if self._model is None:
            raise RuntimeError("Model chưa được load. Gọi load_model() trước.")
        
        inputs = self._tokenizer(prompt, return_tensors="pt")
        
        # Move to same device as model
        device = next(self._model.parameters()).device
        inputs = {k: v.to(device) for k, v in inputs.items()}
        
        # OPTIMIZED: Faster generation
        outputs = self._model.generate(
            **inputs,
            max_new_tokens=max_new_tokens,
            temperature=0.1,           # Low temperature = more deterministic
            do_sample=True,
            top_p=0.9,
            num_beams=1,               # ✅ No beam search = faster
            early_stopping=True,       # ✅ Stop early if done
            pad_token_id=self._tokenizer.eos_token_id,
            use_cache=True             # ✅ Use KV cache = faster
        )
        
        response = self._tokenizer.decode(outputs[0], skip_special_tokens=True)
        return response[len(prompt):].strip()

# Singleton instance
finetuned_model_loader = FinetunedModelLoader()
