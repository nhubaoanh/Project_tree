"""
Check system resources and recommend model
"""
import psutil
import torch
import platform

def format_bytes(bytes):
    """Format bytes to human readable"""
    for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
        if bytes < 1024.0:
            return f"{bytes:.2f} {unit}"
        bytes /= 1024.0

def check_system():
    print("=" * 60)
    print("🖥️  SYSTEM CHECK")
    print("=" * 60)
    
    # OS
    print(f"\n📌 Operating System: {platform.system()} {platform.release()}")
    print(f"   Architecture: {platform.machine()}")
    
    # CPU
    print(f"\n🔧 CPU:")
    print(f"   Processor: {platform.processor()}")
    print(f"   Cores: {psutil.cpu_count(logical=False)} physical, {psutil.cpu_count(logical=True)} logical")
    print(f"   Usage: {psutil.cpu_percent(interval=1)}%")
    
    # RAM
    ram = psutil.virtual_memory()
    print(f"\n💾 RAM:")
    print(f"   Total: {format_bytes(ram.total)}")
    print(f"   Available: {format_bytes(ram.available)}")
    print(f"   Used: {format_bytes(ram.used)} ({ram.percent}%)")
    
    # Disk
    disk = psutil.disk_usage('.')
    print(f"\n💿 Disk (current drive):")
    print(f"   Total: {format_bytes(disk.total)}")
    print(f"   Free: {format_bytes(disk.free)}")
    print(f"   Used: {format_bytes(disk.used)} ({disk.percent}%)")
    
    # GPU
    print(f"\n🎮 GPU:")
    if torch.cuda.is_available():
        print(f"   CUDA Available: ✓ Yes")
        print(f"   CUDA Version: {torch.version.cuda}")
        print(f"   GPU Count: {torch.cuda.device_count()}")
        for i in range(torch.cuda.device_count()):
            print(f"   GPU {i}: {torch.cuda.get_device_name(i)}")
            print(f"   Memory: {torch.cuda.get_device_properties(i).total_memory / 1e9:.2f} GB")
    else:
        print(f"   CUDA Available: ✗ No")
        print(f"   Will use CPU (slower)")
    
    # Recommendations
    print("\n" + "=" * 60)
    print("💡 RECOMMENDATIONS")
    print("=" * 60)
    
    ram_gb = ram.total / (1024**3)
    
    if ram_gb < 8:
        print("\n⚠️  Low RAM detected!")
        print("   Recommended model: Qwen/Qwen2.5-Coder-1.5B-Instruct")
        print("   Action: Increase Virtual Memory to 16GB")
    elif ram_gb < 16:
        print("\n✓ Moderate RAM")
        print("   Recommended model: Qwen/Qwen2.5-Coder-3B-Instruct")
        print("   Alternative: 1.5B for faster performance")
    else:
        print("\n✓ Good RAM")
        print("   Recommended model: Qwen/Qwen2.5-Coder-7B-Instruct")
        print("   Alternative: 3B for faster performance")
    
    if not torch.cuda.is_available():
        print("\n💡 No GPU detected")
        print("   Consider using smaller model for better performance")
        print("   Or install CUDA: https://developer.nvidia.com/cuda-downloads")
    
    if disk.free < 50 * (1024**3):  # Less than 50GB
        print("\n⚠️  Low disk space!")
        print("   Models require 10-30GB storage")
        print("   Free up disk space before downloading models")
    
    print("\n" + "=" * 60)

if __name__ == "__main__":
    check_system()
