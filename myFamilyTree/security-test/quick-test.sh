#!/bin/bash
# ╔══════════════════════════════════════════════════════════════════════════════╗
# ║                    🔴 QUICK SECURITY TEST - BASH SCRIPT                       ║
# ╠══════════════════════════════════════════════════════════════════════════════╣
# ║  Chạy: chmod +x quick-test.sh && ./quick-test.sh                             ║
# ╚══════════════════════════════════════════════════════════════════════════════╝

BASE_URL="http://localhost:6001/api-core"

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║        🔴 QUICK SECURITY TEST                                 ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Test 1: SQL Injection
echo "🔴 TEST 1: SQL Injection"
echo "   Payload: ' OR '1'='1"
curl -s -X POST "$BASE_URL/user/login" \
  -H "Content-Type: application/json" \
  -d '{"taiKhoan": "'\'' OR '\''1'\''='\''1", "matKhau": "anything"}' | head -c 200
echo -e "\n"

# Test 2: XSS
echo "🔴 TEST 2: XSS Attack"
echo "   Payload: <script>alert('XSS')</script>"
curl -s -X POST "$BASE_URL/user/login" \
  -H "Content-Type: application/json" \
  -d '{"taiKhoan": "<script>alert('\''XSS'\'')</script>", "matKhau": "test123456"}' | head -c 200
echo -e "\n"

# Test 3: Empty Input
echo "🔴 TEST 3: Empty Input Validation"
curl -s -X POST "$BASE_URL/user/login" \
  -H "Content-Type: application/json" \
  -d '{"taiKhoan": "", "matKhau": ""}' | head -c 200
echo -e "\n"

# Test 4: Security Headers
echo "🔴 TEST 4: Security Headers"
curl -s -I "$BASE_URL/user/checkuser" | grep -E "(X-Frame|X-Content-Type|X-XSS|X-Powered)"
echo ""

# Test 5: Rate Limiting (6 requests)
echo "🔴 TEST 5: Rate Limiting (6 requests)"
for i in {1..6}; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE_URL/user/login" \
    -H "Content-Type: application/json" \
    -d '{"taiKhoan": "hacker", "matKhau": "wrong123456"}')
  echo "   Request $i: Status $STATUS"
done
echo ""

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║        ✅ TEST HOÀN TẤT                                       ║"
echo "╚══════════════════════════════════════════════════════════════╝"
