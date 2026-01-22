"""
Check Windows Virtual Memory (Paging File) settings
"""
import subprocess
import re

def check_virtual_memory():
    print("=" * 60)
    print("💾 VIRTUAL MEMORY CHECK")
    print("=" * 60)
    
    try:
        # Run systeminfo command
        result = subprocess.run(
            ['systeminfo'],
            capture_output=True,
            text=True,
            encoding='utf-8',
            errors='ignore'
        )
        
        output = result.stdout
        
        # Extract Total Physical Memory
        total_ram_match = re.search(r'Total Physical Memory:\s+([0-9,]+)\s+MB', output)
        if total_ram_match:
            total_ram = int(total_ram_match.group(1).replace(',', ''))
            print(f"\n📊 Physical RAM: {total_ram:,} MB ({total_ram/1024:.1f} GB)")
        
        # Extract Virtual Memory
        virtual_mem_match = re.search(r'Virtual Memory: Max Size:\s+([0-9,]+)\s+MB', output)
        if virtual_mem_match:
            virtual_max = int(virtual_mem_match.group(1).replace(',', ''))
            print(f"💿 Virtual Memory Max: {virtual_max:,} MB ({virtual_max/1024:.1f} GB)")
            
            # Check if sufficient
            print("\n" + "=" * 60)
            print("📋 ANALYSIS")
            print("=" * 60)
            
            if total_ram < 8192:  # Less than 8GB
                print("\n⚠️  Low RAM detected!")
                print(f"   Your RAM: {total_ram/1024:.1f} GB")
                print(f"   Recommended: 8 GB or more")
                print("\n💡 Recommendation:")
                print("   - Use model 1.5B (requires ~4GB)")
                print("   - Virtual Memory should be at least 12GB")
                
                if virtual_max < 12288:
                    print(f"\n❌ Virtual Memory too small: {virtual_max/1024:.1f} GB")
                    print("   Increase to at least 12GB")
                    print("\n📖 How to increase:")
                    print("   1. Windows + R → sysdm.cpl")
                    print("   2. Advanced → Performance Settings")
                    print("   3. Advanced → Virtual Memory → Change")
                    print("   4. Custom size: Initial 12288, Max 16384")
                    print("   5. RESTART computer")
                else:
                    print(f"\n✓ Virtual Memory OK: {virtual_max/1024:.1f} GB")
            
            elif total_ram < 16384:  # 8-16GB
                print(f"\n✓ Moderate RAM: {total_ram/1024:.1f} GB")
                print("\n💡 Recommendation:")
                print("   - Use model 3B (requires ~6-8GB)")
                print("   - Virtual Memory should be 12-16GB")
                
                if virtual_max < 12288:
                    print(f"\n⚠️  Virtual Memory could be larger: {virtual_max/1024:.1f} GB")
                    print("   Recommended: 12-16GB")
                    print("\n📖 How to increase:")
                    print("   1. Windows + R → sysdm.cpl")
                    print("   2. Advanced → Performance Settings")
                    print("   3. Advanced → Virtual Memory → Change")
                    print("   4. Custom size: Initial 12288, Max 16384")
                    print("   5. RESTART computer")
                else:
                    print(f"\n✓ Virtual Memory OK: {virtual_max/1024:.1f} GB")
            
            else:  # 16GB+
                print(f"\n✓ Good RAM: {total_ram/1024:.1f} GB")
                print("\n💡 Recommendation:")
                print("   - Can use model 7B (requires ~14GB)")
                print("   - Virtual Memory should be 16-32GB")
                
                if virtual_max < 16384:
                    print(f"\n⚠️  Virtual Memory could be larger: {virtual_max/1024:.1f} GB")
                    print("   Recommended: 16-32GB for model 7B")
                else:
                    print(f"\n✓ Virtual Memory OK: {virtual_max/1024:.1f} GB")
        
        else:
            print("\n❌ Could not detect Virtual Memory settings")
            print("   Please check manually:")
            print("   1. Windows + R → sysdm.cpl")
            print("   2. Advanced → Performance Settings")
            print("   3. Advanced → Virtual Memory")
        
        print("\n" + "=" * 60)
        
    except Exception as e:
        print(f"\n❌ Error: {str(e)}")
        print("\nPlease check Virtual Memory manually:")
        print("1. Windows + R → sysdm.cpl")
        print("2. Advanced → Performance Settings")
        print("3. Advanced → Virtual Memory")

if __name__ == "__main__":
    check_virtual_memory()
