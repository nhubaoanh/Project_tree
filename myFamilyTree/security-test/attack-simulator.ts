/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                    🔴 ATTACK SIMULATOR - MÔ PHỎNG TẤN CÔNG                    ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  File này mô phỏng các cuộc tấn công phổ biến để test bảo mật                ║
 * ║                                                                               ║
 * ║  CÁCH CHẠY:                                                                   ║
 * ║  1. Đảm bảo server đang chạy: npm run dev                                    ║
 * ║  2. Chạy test: npx ts-node security-test/attack-simulator.ts                 ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

const BASE_URL = "http://localhost:6001/api-core";

// ENDPOINTS - Đúng theo routes/index.ts
const ENDPOINTS = {
  LOGIN: "/users/login",        // /users (có s)
  CHECKUSER: "/users/checkuser",
  MEMBER_CREATE: "/member/create", // /member
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

interface TestResult {
  name: string;
  passed: boolean;
  expected: string;
  actual: string;
  details?: string;
}

const results: TestResult[] = [];

async function makeRequest(
  method: string,
  endpoint: string,
  body?: any
): Promise<{ status: number; data: any; headers: Headers }> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });

    let data;
    try {
      data = await response.json();
    } catch {
      data = await response.text();
    }

    return { status: response.status, data, headers: response.headers };
  } catch (error: any) {
    return { status: 0, data: { error: error.message }, headers: new Headers() };
  }
}

function logTest(result: TestResult) {
  const icon = result.passed ? "✅" : "❌";
  console.log(`${icon} ${result.name}`);
  if (!result.passed) {
    console.log(`   Expected: ${result.expected}`);
    console.log(`   Actual: ${result.actual}`);
    if (result.details) console.log(`   Details: ${result.details}`);
  }
  results.push(result);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


// ============================================================================
// TEST 1: SQL INJECTION ATTACKS
// ============================================================================
async function testSqlInjection() {
  console.log("\n" + "=".repeat(60));
  console.log("🔴 TEST 1: SQL INJECTION ATTACKS");
  console.log("=".repeat(60));

  // Dùng đúng field name: tenDangNhap (không phải taiKhoan)
  const sqlPayloads = [
    { name: "Classic OR 1=1", payload: { tenDangNhap: "' OR '1'='1", matKhau: "anything123" } },
    { name: "DROP TABLE", payload: { tenDangNhap: "'; DROP TABLE users;--", matKhau: "anything123" } },
    { name: "UNION SELECT", payload: { tenDangNhap: "' UNION SELECT * FROM users--", matKhau: "test123456" } },
    { name: "Comment Injection", payload: { tenDangNhap: "admin'--", matKhau: "anything123" } },
    { name: "Stacked Queries", payload: { tenDangNhap: "'; DELETE FROM users;--", matKhau: "test123456" } },
  ];

  for (const test of sqlPayloads) {
    const { status, data } = await makeRequest("POST", ENDPOINTS.LOGIN, test.payload);
    // Kỳ vọng: 400 (blocked bởi sanitizer) hoặc 401 (login failed), KHÔNG PHẢI 500
    const passed = status === 400 || status === 401;

    logTest({
      name: `SQL Injection: ${test.name}`,
      passed,
      expected: "Status 400 hoặc 401 (không phải 500)",
      actual: `Status ${status}`,
      details: typeof data === 'object' ? (data.message || JSON.stringify(data).substring(0, 100)) : String(data).substring(0, 100),
    });
  }
}

// ============================================================================
// TEST 2: XSS ATTACKS
// ============================================================================
async function testXssAttacks() {
  console.log("\n" + "=".repeat(60));
  console.log("🔴 TEST 2: XSS (Cross-Site Scripting) ATTACKS");
  console.log("=".repeat(60));

  // Dùng đúng field name: tenDangNhap
  const xssPayloads = [
    { name: "Script Tag", payload: { tenDangNhap: "<script>alert('XSS')</script>", matKhau: "test123456" } },
    { name: "Event Handler", payload: { tenDangNhap: "<img src=x onerror=alert('XSS')>", matKhau: "test123456" } },
    { name: "JavaScript Protocol", payload: { tenDangNhap: "javascript:alert('XSS')", matKhau: "test123456" } },
    { name: "SVG XSS", payload: { tenDangNhap: "<svg onload=alert('XSS')>", matKhau: "test123456" } },
  ];

  for (const test of xssPayloads) {
    const { data } = await makeRequest("POST", ENDPOINTS.LOGIN, test.payload);
    const responseStr = JSON.stringify(data);
    // Kiểm tra XSS payload có còn trong response không
    const hasXss = responseStr.includes("<script") || responseStr.includes("onerror=") || 
                   responseStr.includes("onload=") || responseStr.includes("javascript:");

    logTest({
      name: `XSS Attack: ${test.name}`,
      passed: !hasXss,
      expected: "XSS payload bị loại bỏ",
      actual: hasXss ? "XSS còn trong response!" : "Đã sanitize ✓",
    });
  }
}

// ============================================================================
// TEST 3: BRUTE FORCE (Rate Limiting)
// ============================================================================
async function testBruteForce() {
  console.log("\n" + "=".repeat(60));
  console.log("🔴 TEST 3: BRUTE FORCE ATTACK (Rate Limiting)");
  console.log("=".repeat(60));
  console.log("📝 Gửi 7 request liên tục...\n");

  const results429: number[] = [];

  for (let i = 1; i <= 7; i++) {
    const { status } = await makeRequest("POST", ENDPOINTS.LOGIN, {
      tenDangNhap: "hacker_test",
      matKhau: "wrongpassword123",
    });
    console.log(`   Request ${i}: Status ${status}`);
    if (status === 429) results429.push(i);
    await sleep(100);
  }

  const passed = results429.length > 0;
  logTest({
    name: "Brute Force Protection (Rate Limiting)",
    passed,
    expected: "Status 429 sau 5-6 requests",
    actual: results429.length > 0 ? `429 từ request ${results429[0]}` : "Không có 429!",
  });
}


// ============================================================================
// TEST 4: INPUT VALIDATION
// ============================================================================
async function testInputValidation() {
  console.log("\n" + "=".repeat(60));
  console.log("🔴 TEST 4: INPUT VALIDATION");
  console.log("=".repeat(60));

  // Dùng đúng field name: tenDangNhap
  const tests = [
    { name: "Empty Username", payload: { tenDangNhap: "", matKhau: "test123456" }, expect: "không được để trống" },
    { name: "Empty Password", payload: { tenDangNhap: "testuser", matKhau: "" }, expect: "không được để trống" },
    { name: "Username Too Short", payload: { tenDangNhap: "ab", matKhau: "test123456" }, expect: "3" },
    { name: "Password Too Short", payload: { tenDangNhap: "testuser", matKhau: "123" }, expect: "6" },
    { name: "Missing Fields", payload: {}, expect: "không được để trống" },
  ];

  for (const test of tests) {
    const { status, data } = await makeRequest("POST", ENDPOINTS.LOGIN, test.payload);
    const responseStr = JSON.stringify(data).toLowerCase();
    const hasError = responseStr.includes(test.expect.toLowerCase());

    logTest({
      name: `Validation: ${test.name}`,
      passed: status === 400 && hasError,
      expected: `Status 400, chứa "${test.expect}"`,
      actual: `Status ${status}`,
      details: data.message || JSON.stringify(data.errors || data).substring(0, 100),
    });
  }
}

// ============================================================================
// TEST 5: SECURITY HEADERS
// ============================================================================
async function testSecurityHeaders() {
  console.log("\n" + "=".repeat(60));
  console.log("🔴 TEST 5: SECURITY HEADERS");
  console.log("=".repeat(60));

  const { headers } = await makeRequest("POST", ENDPOINTS.CHECKUSER, {});

  const checks = [
    { name: "X-Content-Type-Options", expected: "nosniff" },
    { name: "X-Frame-Options", expected: "DENY" },
    { name: "X-DNS-Prefetch-Control", expected: "off" },
  ];

  for (const check of checks) {
    const value = headers.get(check.name.toLowerCase());
    logTest({
      name: `Header: ${check.name}`,
      passed: value?.toLowerCase().includes(check.expected.toLowerCase()) || false,
      expected: check.expected,
      actual: value || "MISSING",
    });
  }

  // X-Powered-By should be hidden
  const poweredBy = headers.get("x-powered-by");
  logTest({
    name: "Header: X-Powered-By (hidden)",
    passed: !poweredBy,
    expected: "Hidden",
    actual: poweredBy || "Hidden ✓",
  });
}

// ============================================================================
// TEST 6: LARGE PAYLOAD (DoS)
// ============================================================================
async function testLargePayload() {
  console.log("\n" + "=".repeat(60));
  console.log("🔴 TEST 6: LARGE PAYLOAD ATTACK");
  console.log("=".repeat(60));

  const largeString = "A".repeat(15000); // 15KB > 10KB limit
  const { status } = await makeRequest("POST", ENDPOINTS.LOGIN, {
    tenDangNhap: largeString,
    matKhau: "test123",
  });

  logTest({
    name: "Large Payload (15KB)",
    passed: status === 413 || status === 400,
    expected: "Status 413 hoặc 400",
    actual: `Status ${status}`,
  });
}

// ============================================================================
// TEST 7: THANH VIEN VALIDATION
// ============================================================================
async function testThanhVienValidation() {
  console.log("\n" + "=".repeat(60));
  console.log("🔴 TEST 7: THANH VIEN VALIDATION");
  console.log("=".repeat(60));

  const tests = [
    { name: "Empty hoTen", payload: { hoTen: "", gioiTinh: "Nam" } },
    { name: "Invalid gioiTinh", payload: { hoTen: "Nguyen Van A", gioiTinh: "Invalid" } },
    { name: "SQL in hoTen", payload: { hoTen: "'; DROP TABLE thanhvien;--", gioiTinh: "Nam" } },
  ];

  for (const test of tests) {
    const { status, data } = await makeRequest("POST", ENDPOINTS.MEMBER_CREATE, test.payload);
    logTest({
      name: `ThanhVien: ${test.name}`,
      passed: status === 400 || status === 401, // 401 nếu cần auth
      expected: "Status 400 hoặc 401",
      actual: `Status ${status}`,
      details: data.message || JSON.stringify(data).substring(0, 80),
    });
  }
}


// ============================================================================
// MAIN - RUN ALL TESTS
// ============================================================================
async function runAllTests() {
  console.log("\n");
  console.log("╔══════════════════════════════════════════════════════════════╗");
  console.log("║        🔴 SECURITY ATTACK SIMULATOR - BẮT ĐẦU TEST           ║");
  console.log("╠══════════════════════════════════════════════════════════════╣");
  console.log(`║  Target: ${BASE_URL.padEnd(47)}║`);
  console.log(`║  Time: ${new Date().toLocaleString().padEnd(49)}║`);
  console.log("╚══════════════════════════════════════════════════════════════╝");

  await testSqlInjection();
  await testXssAttacks();
  await testBruteForce();
  await testInputValidation();
  await testSecurityHeaders();
  await testLargePayload();
  await testThanhVienValidation();

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("📊 KẾT QUẢ TỔNG HỢP");
  console.log("=".repeat(60));

  const passed = results.filter((r) => r.passed).length;
  const failed = results.filter((r) => !r.passed).length;
  const total = results.length;

  console.log(`✅ Passed: ${passed}/${total}`);
  console.log(`❌ Failed: ${failed}/${total}`);
  console.log(`📈 Score: ${Math.round((passed / total) * 100)}%`);

  if (failed > 0) {
    console.log("\n❌ CÁC TEST THẤT BẠI:");
    results.filter((r) => !r.passed).forEach((r) => console.log(`   - ${r.name}`));
  }

  console.log("\n" + "=".repeat(60));
  console.log(failed === 0 ? "🎉 TẤT CẢ BẢO MẬT HOẠT ĐỘNG TỐT!" : "⚠️  CÓ LỖ HỔNG CẦN SỬA!");
  console.log("=".repeat(60) + "\n");
}

runAllTests().catch(console.error);
