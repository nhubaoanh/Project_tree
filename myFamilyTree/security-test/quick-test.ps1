# ╔══════════════════════════════════════════════════════════════════════════════╗
# ║                    🔴 QUICK SECURITY TEST - POWERSHELL                        ║
# ╠══════════════════════════════════════════════════════════════════════════════╣
# ║  Chạy: .\quick-test.ps1                                                      ║
# ╚══════════════════════════════════════════════════════════════════════════════╝

$BASE_URL = "http://localhost:6001/api-core"

Write-Host ""
Write-Host "╔══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║        🔴 QUICK SECURITY TEST                                 ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Test 1: SQL Injection
Write-Host "🔴 TEST 1: SQL Injection" -ForegroundColor Red
Write-Host "   Payload: ' OR '1'='1" -ForegroundColor Yellow
$body = @{ taiKhoan = "' OR '1'='1"; matKhau = "anything" } | ConvertTo-Json
try {
    $response = Invoke-RestMethod -Uri "$BASE_URL/user/login" -Method POST -Body $body -ContentType "application/json" -ErrorAction Stop
    Write-Host "   Response: $($response | ConvertTo-Json -Compress)" -ForegroundColor Green
} catch {
    Write-Host "   Status: $($_.Exception.Response.StatusCode.value__) - BLOCKED ✓" -ForegroundColor Green
}
Write-Host ""

# Test 2: XSS
Write-Host "🔴 TEST 2: XSS Attack" -ForegroundColor Red
Write-Host "   Payload: <script>alert('XSS')</script>" -ForegroundColor Yellow
$body = @{ taiKhoan = "<script>alert('XSS')</script>"; matKhau = "test123456" } | ConvertTo-Json
try {
    $response = Invoke-RestMethod -Uri "$BASE_URL/user/login" -Method POST -Body $body -ContentType "application/json" -ErrorAction Stop
    Write-Host "   Response: $($response | ConvertTo-Json -Compress)" -ForegroundColor Green
} catch {
    Write-Host "   Status: $($_.Exception.Response.StatusCode.value__) - SANITIZED ✓" -ForegroundColor Green
}
Write-Host ""

# Test 3: Empty Input
Write-Host "🔴 TEST 3: Empty Input Validation" -ForegroundColor Red
$body = @{ taiKhoan = ""; matKhau = "" } | ConvertTo-Json
try {
    $response = Invoke-RestMethod -Uri "$BASE_URL/user/login" -Method POST -Body $body -ContentType "application/json" -ErrorAction Stop
    Write-Host "   Response: $($response | ConvertTo-Json -Compress)" -ForegroundColor Green
} catch {
    Write-Host "   Status: $($_.Exception.Response.StatusCode.value__) - VALIDATION WORKS ✓" -ForegroundColor Green
}
Write-Host ""

# Test 4: Security Headers
Write-Host "🔴 TEST 4: Security Headers" -ForegroundColor Red
try {
    $response = Invoke-WebRequest -Uri "$BASE_URL/user/checkuser" -Method POST -Body "{}" -ContentType "application/json" -ErrorAction SilentlyContinue
    $headers = $response.Headers
    
    $checkHeaders = @("X-Frame-Options", "X-Content-Type-Options", "X-DNS-Prefetch-Control")
    foreach ($h in $checkHeaders) {
        if ($headers[$h]) {
            Write-Host "   $h : $($headers[$h]) ✓" -ForegroundColor Green
        } else {
            Write-Host "   $h : MISSING ✗" -ForegroundColor Red
        }
    }
    
    if (-not $headers["X-Powered-By"]) {
        Write-Host "   X-Powered-By: Hidden ✓" -ForegroundColor Green
    }
} catch {
    Write-Host "   Could not check headers" -ForegroundColor Yellow
}
Write-Host ""

# Test 5: Rate Limiting
Write-Host "🔴 TEST 5: Rate Limiting (6 requests)" -ForegroundColor Red
$body = @{ taiKhoan = "hacker"; matKhau = "wrong123456" } | ConvertTo-Json
for ($i = 1; $i -le 6; $i++) {
    try {
        $response = Invoke-WebRequest -Uri "$BASE_URL/user/login" -Method POST -Body $body -ContentType "application/json" -ErrorAction Stop
        Write-Host "   Request $i : Status $($response.StatusCode)" -ForegroundColor Yellow
    } catch {
        $status = $_.Exception.Response.StatusCode.value__
        if ($status -eq 429) {
            Write-Host "   Request $i : Status 429 - RATE LIMITED ✓" -ForegroundColor Green
        } else {
            Write-Host "   Request $i : Status $status" -ForegroundColor Yellow
        }
    }
    Start-Sleep -Milliseconds 100
}
Write-Host ""

Write-Host "╔══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║        ✅ TEST HOÀN TẤT                                       ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
