"""
Script to switch between different Qwen models
"""
import os
import sys

MODELS = {
    "1": {
        "name": "Qwen/Qwen2.5-Coder-1.5B-Instruct",
        "ram": "~4GB",
        "speed": "Fast",
        "accuracy": "Good"
    },
    "2": {
        "name": "Qwen/Qwen2.5-Coder-3B-Instruct",
        "ram": "~8GB",
        "speed": "Medium",
        "accuracy": "Better"
    },
    "3": {
        "name": "Qwen/Qwen2.5-Coder-7B-Instruct",
        "ram": "~14GB",
        "speed": "Slow",
        "accuracy": "Best"
    }
}

def update_env_file(model_name):
    """Update MODEL_NAME in .env file"""
    env_path = ".env"
    
    with open(env_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    with open(env_path, 'w', encoding='utf-8') as f:
        for line in lines:
            if line.startswith('MODEL_NAME='):
                f.write(f'MODEL_NAME={model_name}\n')
            else:
                f.write(line)
    
    print(f"✓ Updated .env: MODEL_NAME={model_name}")

def main():
    print("=" * 60)
    print("🔄 SWITCH QWEN MODEL")
    print("=" * 60)
    print("\nAvailable models:\n")
    
    for key, model in MODELS.items():
        print(f"{key}. {model['name']}")
        print(f"   RAM: {model['ram']} | Speed: {model['speed']} | Accuracy: {model['accuracy']}")
        print()
    
    choice = input("Choose model (1/2/3): ").strip()
    
    if choice not in MODELS:
        print("❌ Invalid choice!")
        sys.exit(1)
    
    model = MODELS[choice]
    print(f"\n✓ Selected: {model['name']}")
    print(f"  RAM required: {model['ram']}")
    print(f"  Speed: {model['speed']}")
    print(f"  Accuracy: {model['accuracy']}")
    
    confirm = input("\nUpdate .env file? (y/n): ").strip().lower()
    
    if confirm == 'y':
        update_env_file(model['name'])
        print("\n✓ Done! Restart AI service to apply changes:")
        print("  python main.py")
    else:
        print("\n❌ Cancelled")

if __name__ == "__main__":
    main()
