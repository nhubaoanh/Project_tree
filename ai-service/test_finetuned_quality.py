"""
Test chất lượng model đã fine-tune
Kiểm tra xem model có học được gì không
"""

import sys
import os

print("="*60)
print("🧪 TESTING FINE-TUNED MODEL QUALITY")
print("="*60)

# ============================================
# 1. KIỂM TRA FILE SIZE
# ============================================
print("\n1️⃣ Checking file size...")

adapter_file = "./finetuned_model/adapter_model.safetensors"
if os.path.exists(adapter_file):
    size_mb = os.path.getsize(adapter_file) / (1024 * 1024)
    print(f"✅ adapter_model.safetensors: {size_mb:.1f} MB")
    
    if size_mb < 10:
        print("❌ WARNING: File quá nhỏ! Model chưa train đúng!")
        print("💡 Nên > 50 MB (rank 8) hoặc > 100 MB (rank 16)")
    elif size_mb < 50:
        print("⚠️  File nhỏ (rank thấp). Có thể kém chính xác.")
    else:
        print("✅ File size OK!")
else:
    print("❌ File không tồn tại!")
    sys.exit(1)

# ============================================
# 2. KIỂM TRA CONFIG
# ============================================
print("\n2️⃣ Checking adapter config...")

import json
with open("./finetuned_model/adapter_config.json", 'r') as f:
    config = json.load(f)

rank = config.get('r', 0)
alpha = config.get('lora_alpha', 0)
target_modules = config.get('target_modules', [])

print(f"   Rank: {rank}")
print(f"   Alpha: {alpha}")
print(f"   Target modules: {', '.join(target_modules)}")

issues = []
if rank < 8:
    issues.append("Rank quá thấp (nên >= 8)")
if alpha != rank * 2:
    issues.append(f"Alpha nên = {rank * 2} (hiện tại: {alpha})")
if len(target_modules) < 2:
    issues.append("Target modules quá ít (nên >= 4)")

if issues:
    print("⚠️  Issues:")
    for issue in issues:
        print(f"   - {issue}")
else:
    print("✅ Config OK!")

# ============================================
# 3. TEST GENERATION
# ============================================
print("\n3️⃣ Testing generation...")

try:
    from model_loader_finetuned import finetuned_model_loader
    
    print("   Loading model...")
    finetuned_model_loader.load_model()
    
    # Test questions
    test_cases = [
        {
            "question": "Có bao nhiêu người trong gia phả?",
            "expected_keywords": ["COUNT", "thanhvien", "dongHoId"]
        },
        {
            "question": "Danh sách tất cả thành viên",
            "expected_keywords": ["SELECT", "thanhvien", "dongHoId"]
        },
        {
            "question": "Có bao nhiêu nam giới?",
            "expected_keywords": ["COUNT", "gioiTinh", "1"]
        }
    ]
    
    passed = 0
    failed = 0
    
    for i, test in enumerate(test_cases, 1):
        question = test["question"]
        expected = test["expected_keywords"]
        
        print(f"\n   Test {i}: {question}")
        
        # Generate (simple test - không cần SQL generator)
        prompt = f"Question: {question}\nSQL:"
        try:
            response = finetuned_model_loader.generate(prompt, max_new_tokens=100)
            sql = response.strip()
            
            print(f"   SQL: {sql}")
            
            # Check keywords
            found = sum(1 for kw in expected if kw.lower() in sql.lower())
            score = found / len(expected) * 100
            
            if score >= 66:  # 2/3 keywords
                print(f"   ✅ PASS ({score:.0f}%)")
                passed += 1
            else:
                print(f"   ❌ FAIL ({score:.0f}%) - Missing keywords")
                failed += 1
                
        except Exception as e:
            print(f"   ❌ ERROR: {str(e)}")
            failed += 1
    
    print("\n" + "="*60)
    print(f"📊 RESULTS: {passed}/{len(test_cases)} passed")
    print("="*60)
    
    if passed == len(test_cases):
        print("🎉 Model chất lượng TỐT!")
    elif passed >= len(test_cases) * 0.66:
        print("⚠️  Model chất lượng TRUNG BÌNH")
        print("💡 Có thể cần train lại với:")
        print("   - Epochs = 3")
        print("   - Rank = 16")
        print("   - Target modules = 4")
    else:
        print("❌ Model chất lượng KÉM!")
        print("💡 Cần train lại! Xem CHECK_TRAINING.md")
        
except Exception as e:
    print(f"❌ Error loading model: {str(e)}")
    print("💡 Kiểm tra folder finetuned_model/ có đầy đủ file không")
    sys.exit(1)

print("\n" + "="*60)
print("✅ Test completed!")
print("="*60)
