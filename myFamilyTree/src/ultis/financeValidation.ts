/**
 * Validation cho import tài chính từ Excel
 * Kiểm tra dữ liệu trước khi lưu vào database
 */

export interface FinanceThuImportData {
  thu_id?: number;  // Optional - nếu có thì UPDATE, không có thì INSERT
  stt: number | null;
  ho_ten_nguoi_dong: string;
  ngay_dong: string;
  so_tien: number;
  phuong_thuc_thanh_toan: string;
  noi_dung: string;
  ghi_chu: string;
}

export interface FinanceChiImportData {
  chi_id?: number;  // Optional - nếu có thì UPDATE, không có thì INSERT
  stt: number | null;
  ngay_chi: string;
  so_tien: number;
  phuong_thuc_thanh_toan: string;
  noi_dung: string;
  nguoi_nhan: string;
  ghi_chu: string;
}

export interface ValidationError {
  row: number;        // Số dòng trong Excel (STT)
  field: string;      // Tên trường lỗi
  message: string;    // Mô tả lỗi
  value?: any;        // Giá trị gây lỗi
}

export interface ValidationResult<T> {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];  // Cảnh báo (không chặn import)
  validData: T[];
}

// Danh mục có sẵn trong hệ thống (không dùng nữa - có bảng riêng)
// const VALID_THU_CATEGORIES = [
//   'Đóng góp tổ chức sự kiện',
//   'Đóng góp xây dựng',
//   'Đóng góp từ thiện',
//   'Thu khác'
// ];

// const VALID_CHI_CATEGORIES = [
//   'Chi giỗ tổ',
//   'Chi sửa mộ',
//   'Chi họp họ',
//   'Chi khác'
// ];

const VALID_PAYMENT_METHODS = [
  'Tiền mặt',
  'Chuyển khoản',
  'tien mat',
  'chuyen khoan'
];

/**
 * Validate toàn bộ danh sách tài chính THU
 */
export function validateFinanceThuImport(data: FinanceThuImportData[]): ValidationResult<FinanceThuImportData> {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  const validData: FinanceThuImportData[] = [];
  
  for (const item of data) {
    const itemErrors = validateSingleFinanceThu(item);
    
    if (itemErrors.errors.length === 0) {
      validData.push(item);
    }
    
    errors.push(...itemErrors.errors);
    warnings.push(...itemErrors.warnings);
  }

  // Kiểm tra logic tổng thể
  const globalErrors = validateGlobalRules(data);
  errors.push(...globalErrors.errors);
  warnings.push(...globalErrors.warnings);

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    validData
  };
}

/**
 * Validate toàn bộ danh sách tài chính CHI
 */
export function validateFinanceChiImport(data: FinanceChiImportData[]): ValidationResult<FinanceChiImportData> {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  const validData: FinanceChiImportData[] = [];
  
  for (const item of data) {
    const itemErrors = validateSingleFinanceChi(item);
    
    if (itemErrors.errors.length === 0) {
      validData.push(item);
    }
    
    errors.push(...itemErrors.errors);
    warnings.push(...itemErrors.warnings);
  }

  // Kiểm tra logic tổng thể
  const globalErrors = validateGlobalRules(data);
  errors.push(...globalErrors.errors);
  warnings.push(...globalErrors.warnings);

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    validData
  };
}

/**
 * Validate từng khoản THU
 */
function validateSingleFinanceThu(
  item: FinanceThuImportData
): { errors: ValidationError[], warnings: ValidationError[] } {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  const row = item.stt || 0;

  // 1. STT - Bắt buộc và phải là số dương
  if (item.stt === null || item.stt === undefined) {
    errors.push({
      row,
      field: "STT",
      message: "STT không được để trống",
      value: item.stt
    });
  } else if (item.stt <= 0) {
    errors.push({
      row,
      field: "STT",
      message: "STT phải là số dương",
      value: item.stt
    });
  }

  // 2. Họ tên người đóng - Bắt buộc
  if (!item.ho_ten_nguoi_dong || item.ho_ten_nguoi_dong.trim() === "") {
    errors.push({
      row,
      field: "Họ tên người đóng",
      message: "Họ tên người đóng không được để trống"
    });
  } else if (item.ho_ten_nguoi_dong.length > 255) {
    errors.push({
      row,
      field: "Họ tên người đóng",
      message: "Họ tên không được quá 255 ký tự",
      value: item.ho_ten_nguoi_dong.length
    });
  }

  // 3. Ngày đóng - Bắt buộc và validate format
  if (!item.ngay_dong || item.ngay_dong.trim() === "") {
    errors.push({
      row,
      field: "Ngày đóng",
      message: "Ngày đóng không được để trống"
    });
  } else {
    const dateValidation = validateDate(item.ngay_dong);
    if (!dateValidation.isValid) {
      errors.push({
        row,
        field: "Ngày đóng",
        message: dateValidation.message,
        value: item.ngay_dong
      });
    }
  }

  // 4. Số tiền - Bắt buộc và phải là số dương
  if (item.so_tien === null || item.so_tien === undefined) {
    errors.push({
      row,
      field: "Số tiền",
      message: "Số tiền không được để trống"
    });
  } else if (isNaN(item.so_tien) || item.so_tien <= 0) {
    errors.push({
      row,
      field: "Số tiền",
      message: "Số tiền phải là số dương",
      value: item.so_tien
    });
  } else if (item.so_tien > 999999999999) {
    errors.push({
      row,
      field: "Số tiền",
      message: "Số tiền quá lớn (tối đa 999,999,999,999)",
      value: item.so_tien
    });
  }

  // 5. Phương thức thanh toán - Validate nếu có
  if (item.phuong_thuc_thanh_toan && item.phuong_thuc_thanh_toan.trim() !== "") {
    const isValidMethod = VALID_PAYMENT_METHODS.some(method => 
      method.toLowerCase().includes(item.phuong_thuc_thanh_toan.toLowerCase().trim()) ||
      item.phuong_thuc_thanh_toan.toLowerCase().trim().includes(method.toLowerCase())
    );
    if (!isValidMethod) {
      warnings.push({
        row,
        field: "Phương thức thanh toán",
        message: `Phương thức "${item.phuong_thuc_thanh_toan}" không chuẩn. Nên dùng: Tiền mặt hoặc Chuyển khoản`,
        value: item.phuong_thuc_thanh_toan
      });
    }
  }

  // 6. Nội dung - Kiểm tra độ dài
  if (item.noi_dung && item.noi_dung.length > 1000) {
    warnings.push({
      row,
      field: "Nội dung",
      message: "Nội dung quá dài (nên dưới 1000 ký tự)",
      value: item.noi_dung.length
    });
  }

  // 8. Ghi chú - Kiểm tra độ dài
  if (item.ghi_chu && item.ghi_chu.length > 500) {
    warnings.push({
      row,
      field: "Ghi chú",
      message: "Ghi chú quá dài (nên dưới 500 ký tự)",
      value: item.ghi_chu.length
    });
  }

  return { errors, warnings };
}

/**
 * Validate từng khoản CHI
 */
function validateSingleFinanceChi(
  item: FinanceChiImportData
): { errors: ValidationError[], warnings: ValidationError[] } {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  const row = item.stt || 0;

  // 1. STT - Bắt buộc và phải là số dương
  if (item.stt === null || item.stt === undefined) {
    errors.push({
      row,
      field: "STT",
      message: "STT không được để trống",
      value: item.stt
    });
  } else if (item.stt <= 0) {
    errors.push({
      row,
      field: "STT",
      message: "STT phải là số dương",
      value: item.stt
    });
  }

  // 2. Ngày chi - Bắt buộc và validate format
  if (!item.ngay_chi || item.ngay_chi.trim() === "") {
    errors.push({
      row,
      field: "Ngày chi",
      message: "Ngày chi không được để trống"
    });
  } else {
    const dateValidation = validateDate(item.ngay_chi);
    if (!dateValidation.isValid) {
      errors.push({
        row,
        field: "Ngày chi",
        message: dateValidation.message,
        value: item.ngay_chi
      });
    }
  }

  // 3. Số tiền - Bắt buộc và phải là số dương
  if (item.so_tien === null || item.so_tien === undefined) {
    errors.push({
      row,
      field: "Số tiền",
      message: "Số tiền không được để trống"
    });
  } else if (isNaN(item.so_tien) || item.so_tien <= 0) {
    errors.push({
      row,
      field: "Số tiền",
      message: "Số tiền phải là số dương",
      value: item.so_tien
    });
  } else if (item.so_tien > 999999999999) {
    errors.push({
      row,
      field: "Số tiền",
      message: "Số tiền quá lớn (tối đa 999,999,999,999)",
      value: item.so_tien
    });
  }

  // 5. Phương thức thanh toán - Validate nếu có
  if (item.phuong_thuc_thanh_toan && item.phuong_thuc_thanh_toan.trim() !== "") {
    const isValidMethod = VALID_PAYMENT_METHODS.some(method => 
      method.toLowerCase().includes(item.phuong_thuc_thanh_toan.toLowerCase().trim()) ||
      item.phuong_thuc_thanh_toan.toLowerCase().trim().includes(method.toLowerCase())
    );
    if (!isValidMethod) {
      warnings.push({
        row,
        field: "Phương thức thanh toán",
        message: `Phương thức "${item.phuong_thuc_thanh_toan}" không chuẩn. Nên dùng: Tiền mặt hoặc Chuyển khoản`,
        value: item.phuong_thuc_thanh_toan
      });
    }
  }

  // 6. Nội dung - Kiểm tra độ dài
  if (item.noi_dung && item.noi_dung.length > 1000) {
    warnings.push({
      row,
      field: "Nội dung",
      message: "Nội dung quá dài (nên dưới 1000 ký tự)",
      value: item.noi_dung.length
    });
  }

  // 6. Người nhận - Kiểm tra độ dài
  if (item.nguoi_nhan && item.nguoi_nhan.length > 255) {
    warnings.push({
      row,
      field: "Người nhận",
      message: "Tên người nhận quá dài (nên dưới 255 ký tự)",
      value: item.nguoi_nhan.length
    });
  }

  // 8. Ghi chú - Kiểm tra độ dài
  if (item.ghi_chu && item.ghi_chu.length > 500) {
    warnings.push({
      row,
      field: "Ghi chú",
      message: "Ghi chú quá dài (nên dưới 500 ký tự)",
      value: item.ghi_chu.length
    });
  }

  return { errors, warnings };
}

/**
 * Validate các quy tắc tổng thể
 */
function validateGlobalRules(
  data: any[]
): { errors: ValidationError[], warnings: ValidationError[] } {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // 1. Kiểm tra STT trùng lặp
  const sttCount = new Map<number, number>();
  for (const item of data) {
    if (item.stt !== null) {
      sttCount.set(item.stt, (sttCount.get(item.stt) || 0) + 1);
    }
  }
  for (const [stt, count] of sttCount) {
    if (count > 1) {
      errors.push({
        row: stt,
        field: "STT",
        message: `STT ${stt} bị trùng lặp ${count} lần`,
        value: stt
      });
    }
  }

  // 2. Kiểm tra phải có ít nhất 1 dòng dữ liệu
  if (data.length === 0) {
    errors.push({
      row: 0,
      field: "Dữ liệu",
      message: "Không có dữ liệu để import"
    });
  }

  // 3. Kiểm tra số lượng dữ liệu quá lớn
  if (data.length > 1000) {
    warnings.push({
      row: 0,
      field: "Dữ liệu",
      message: `Có ${data.length} dòng dữ liệu, quá nhiều có thể làm chậm hệ thống`
    });
  }

  return { errors, warnings };
}

/**
 * Validate định dạng ngày DD/MM/YYYY
 */
function validateDate(dateStr: string): { isValid: boolean; message: string } {
  if (!dateStr) {
    return { isValid: true, message: "" };
  }

  // Format DD/MM/YYYY
  const ddmmyyyyMatch = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (ddmmyyyyMatch) {
    const day = parseInt(ddmmyyyyMatch[1]);
    const month = parseInt(ddmmyyyyMatch[2]);
    const year = parseInt(ddmmyyyyMatch[3]);

    // Kiểm tra năm hợp lệ (1900-2100)
    if (year < 1900 || year > 2100) {
      return { isValid: false, message: `Năm ${year} không hợp lệ (1900-2100)` };
    }

    // Kiểm tra tháng
    if (month < 1 || month > 12) {
      return { isValid: false, message: `Tháng ${month} không hợp lệ (1-12)` };
    }

    // Kiểm tra ngày
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
      return { isValid: false, message: `Ngày ${day} không hợp lệ cho tháng ${month}/${year}` };
    }

    // Không được là ngày tương lai (cách hiện tại quá 1 ngày)
    const inputDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(23, 59, 59, 999); // Cuối ngày hôm nay
    if (inputDate > today) {
      return { isValid: false, message: "Ngày không được là tương lai" };
    }

    return { isValid: true, message: "" };
  }

  return { isValid: false, message: `Định dạng ngày không hợp lệ: "${dateStr}". Dùng DD/MM/YYYY (ví dụ: 01/01/2025)` };
}

/**
 * Format lỗi thành message dễ đọc
 */
export function formatValidationErrors<T>(result: ValidationResult<T>): string {
  if (result.isValid && result.warnings.length === 0) {
    return "Dữ liệu hợp lệ";
  }

  const lines: string[] = [];

  if (result.errors.length > 0) {
    lines.push(`❌ ${result.errors.length} LỖI:`);
    for (const err of result.errors.slice(0, 10)) { // Giới hạn 10 lỗi đầu
      lines.push(`  - Dòng ${err.row}, ${err.field}: ${err.message}`);
    }
    if (result.errors.length > 10) {
      lines.push(`  ... và ${result.errors.length - 10} lỗi khác`);
    }
  }

  if (result.warnings.length > 0) {
    lines.push(`⚠️ ${result.warnings.length} CẢNH BÁO:`);
    for (const warn of result.warnings.slice(0, 5)) {
      lines.push(`  - Dòng ${warn.row}, ${warn.field}: ${warn.message}`);
    }
    if (result.warnings.length > 5) {
      lines.push(`  ... và ${result.warnings.length - 5} cảnh báo khác`);
    }
  }

  return lines.join("\n");
}

/**
 * Tạo response chi tiết cho frontend
 */
export function createValidationResponse<T>(result: ValidationResult<T>) {
  return {
    success: result.isValid,
    message: result.isValid 
      ? `Import thành công ${result.validData.length} dòng dữ liệu`
      : `Có ${result.errors.length} lỗi trong dữ liệu`,
    errors: result.errors.map(err => ({
      row: err.row,
      field: err.field,
      message: err.message,
      value: err.value
    })),
    warnings: result.warnings.map(warn => ({
      row: warn.row,
      field: warn.field,
      message: warn.message,
      value: warn.value
    })),
    validCount: result.validData.length,
    totalCount: result.validData.length + result.errors.length
  };
}