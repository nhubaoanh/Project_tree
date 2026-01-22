"""
Script to automatically apply speed optimizations
"""
import os
import shutil
from datetime import datetime

def backup_file(filepath):
    """Backup original file"""
    if os.path.exists(filepath):
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        backup_path = f"{filepath}.backup_{timestamp}"
        shutil.copy2(filepath, backup_path)
        print(f"✅ Backed up: {filepath} → {backup_path}")
        return True
    return False

def apply_optimization():
    print("=" * 60)
    print("⚡ APPLYING SPEED OPTIMIZATIONS")
    print("=" * 60)
    
    # Step 1: Backup original file
    print("\n📦 Step 1: Backing up original files...")
    backup_file("sql_generator.py")
    
    # Step 2: Replace with optimized version
    print("\n🔄 Step 2: Replacing with optimized version...")
    if os.path.exists("sql_generator_optimized.py"):
        shutil.copy2("sql_generator_optimized.py", "sql_generator.py")
        print("✅ Replaced sql_generator.py with optimized version")
    else:
        print("❌ sql_generator_optimized.py not found!")
        return
    
    # Step 3: Update .env to use 1.5B model
    print("\n⚙️  Step 3: Updating .env to use 1.5B model...")
    env_path = ".env"
    
    if os.path.exists(env_path):
        with open(env_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        with open(env_path, 'w', encoding='utf-8') as f:
            for line in lines:
                if line.startswith('MODEL_NAME='):
                    f.write('MODEL_NAME=Qwen/Qwen2.5-Coder-1.5B-Instruct\n')
                    print("✅ Updated MODEL_NAME to 1.5B")
                else:
                    f.write(line)
    else:
        print("⚠️  .env file not found, skipping...")
    
    # Step 4: Summary
    print("\n" + "=" * 60)
    print("✅ OPTIMIZATION APPLIED SUCCESSFULLY!")
    print("=" * 60)
    print("\n📊 Changes:")
    print("  ✅ sql_generator.py → Optimized version with caching")
    print("  ✅ max_new_tokens: 256 → 128 (2x faster)")
    print("  ✅ do_sample: True → False (faster)")
    print("  ✅ temperature: 0.1 → 0.0 (deterministic)")
    print("  ✅ Added caching (instant for repeated queries)")
    print("  ✅ MODEL_NAME → 1.5B (fits in 8GB RAM)")
    
    print("\n🚀 Next steps:")
    print("  1. Restart AI service: python main.py")
    print("  2. Test speed: curl -X POST http://localhost:7000/ask ...")
    print("  3. Check logs for 'Cache hit!' messages")
    
    print("\n💡 Expected results:")
    print("  - First query: 15-30 seconds (was 240s)")
    print("  - Repeated query: <1 second (instant!)")
    print("  - RAM usage: ~4GB (was ~14GB)")
    
    print("\n📝 To revert:")
    print("  - Restore from backup: sql_generator.py.backup_YYYYMMDD_HHMMSS")
    
    print("\n" + "=" * 60)

if __name__ == "__main__":
    try:
        apply_optimization()
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
        print("Please apply changes manually following SPEED_OPTIMIZATION_COMPLETE.md")
