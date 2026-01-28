# ============================================
# COPY TOÀN BỘ FILE NÀY VÀO 1 CELL COLAB
# KHÔNG CHẠY TỪNG PHẦN!
# ============================================

# 1. Install
import subprocess
import sys
subprocess.check_call([sys.executable, "-m", "pip", "install", "-q", "transformers", "datasets", "peft", "accelerate", "bitsandbytes"])
print("✅ Installed!\n")

# 2. Upload dataset
from google.colab import files
import json
print("📤 Upload member.json:")
uploaded = files.upload()

# 3. Load data
with open('member.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
print(f"✅ Loaded {len(data)} examples\n")

# 4. Prepare training data
training_data = []
for item in data:
    training_data.append({"text": f"Question: {item['question']}\nSQL: {item['sql']}"})
print(f"✅ Prepared {len(training_data)} examples\n")

# 5. Load model
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import LoraConfig, get_peft_model
from datasets import Dataset
import torch

print("🔄 Loading model...")
model_name = "Qwen/Qwen2.5-Coder-1.5B-Instruct"
tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)
tokenizer.pad_token = tokenizer.eos_token
model = AutoModelForCausalLM.from_pretrained(model_name, torch_dtype=torch.float16, device_map="auto", trust_remote_code=True)
print("✅ Model loaded\n")

# 6. Configure LoRA
lora_config = LoraConfig(r=16, lora_alpha=32, target_modules=["q_proj", "k_proj", "v_proj", "o_proj"], lora_dropout=0.05, bias="none", task_type="CAUSAL_LM")
model = get_peft_model(model, lora_config)
print("✅ LoRA configured\n")

# 7. Prepare dataset
hf_dataset = Dataset.from_list(training_data)
def tokenize_function(examples):
    return tokenizer(examples["text"], truncation=True, max_length=512, padding="max_length")
tokenized_dataset = hf_dataset.map(tokenize_function, batched=True)
print(f"✅ Dataset ready: {len(tokenized_dataset)} examples\n")

# 8. Train
from transformers import Trainer, TrainingArguments, DataCollatorForLanguageModeling
print("🎯 Training...")
training_args = TrainingArguments(output_dir="./finetuned_model", num_train_epochs=10, per_device_train_batch_size=1, gradient_accumulation_steps=4, learning_rate=2e-4, fp16=True, logging_steps=10, save_strategy="epoch", save_total_limit=1, report_to="none")
data_collator = DataCollatorForLanguageModeling(tokenizer=tokenizer, mlm=False)
trainer = Trainer(model=model, args=training_args, train_dataset=tokenized_dataset, data_collator=data_collator)
trainer.train()
print("✅ Training completed!\n")

# 9. Save
model.save_pretrained("./finetuned_model")
tokenizer.save_pretrained("./finetuned_model")
print("✅ Model saved\n")

# 10. Test
print("🧪 Testing...")
for q in ["Có bao nhiêu người trong gia phả?", "Danh sách tất cả thành viên"]:
    inputs = tokenizer(f"Question: {q}\nSQL:", return_tensors="pt").to(model.device)
    outputs = model.generate(**inputs, max_new_tokens=100, temperature=0.1, do_sample=True, pad_token_id=tokenizer.eos_token_id)
    sql = tokenizer.decode(outputs[0], skip_special_tokens=True).split("SQL:")[-1].strip()
    print(f"Q: {q}\nSQL: {sql}\n")
print("✅ Test completed!\n")

# 11. Pre-generate cache
import hashlib
from datetime import datetime
import os
print("💾 Generating cache...")
knowledge_cache = {"version": "1.0", "model_version": "qwen-1.5b-finetuned", "created_at": datetime.now().isoformat(), "updated_at": datetime.now().isoformat(), "total_entries": len(data), "cache": [], "stats": {"total_queries": 0, "cache_hits": 0, "cache_misses": 0, "hit_rate": 0.0, "avg_response_time": 0.0, "total_correct": 0, "total_incorrect": 0, "accuracy": 1.0}}
for i, item in enumerate(data, 1):
    knowledge_cache["cache"].append({"id": i, "question": item['question'], "question_normalized": item['question'].lower(), "question_hash": hashlib.md5(item['question'].encode()).hexdigest(), "sql": item['sql'], "confidence": 1.0, "pattern": "pre_generated", "category": "trained", "verified": True, "hit_count": 0, "correct_count": 0, "incorrect_count": 0, "avg_response_time": 0.05, "created_at": datetime.now().isoformat(), "last_used_at": datetime.now().isoformat()})
os.makedirs("knowledge", exist_ok=True)
with open("knowledge/cache.json", "w", encoding="utf-8") as f:
    json.dump(knowledge_cache, f, indent=2, ensure_ascii=False)
print(f"✅ Generated {len(data)} cache entries\n")

# 12. Download
subprocess.check_call(["zip", "-r", "model_and_cache.zip", "finetuned_model/", "knowledge/"])
print("✅ Zipped\n")
files.download('model_and_cache.zip')
print("🎉 DONE! Extract và copy vào ai-service/")
