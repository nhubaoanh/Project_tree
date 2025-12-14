/**
 * Validation cho import thành viên từ Excel
 * Kiểm tra dữ liệu trước khi lưu vào database
 */

export interface MemberImportData {
  stt: number | null;
  hoTen: string;
  gioiTinh: number;
  ngaySinh: string | null;
  ngayMat: string | null;
  noiSinh: string;
  noiMat: string;
  ngheNghiep: string;
  trinhDoHocVan: string;
  diaChiHienTai: string;
  tieuSu: string;
  doiThuoc: number;
  chaId: number | null;
  meId: number | null;
  voId: number | null;
  chongId: number | null;
}

export interface ValidationError {
  row: number;        // Số dòng trong Excel (STT)
  field: string;      // Tên trường lỗi
  message: string;    // Mô tả lỗi
  value?: any;        // Giá trị gây lỗi
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];  // Cảnh báo (không chặn import)
  validMembers: MemberImportData[];
}

/**
 * Validate toàn bộ danh sách thành viên
 */
export function validateMemberImport(members: MemberImportData[]): ValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  const validMembers: MemberImportData[] = [];
  
  // Map STT để kiểm tra tham chiếu
  const sttSet = new Set(members.map(m => m.stt).filter(s => s !== null));
  
  for (const member of members) {
    const memberErrors = validateSingleMember(member, sttSet, members);
    
    if (memberErrors.errors.length === 0) {
      validMembers.push(member);
    }
    
    errors.push(...memberErrors.errors);
    warnings.push(...memberErrors.warnings);
  }

  // Kiểm tra logic tổng thể
  const globalErrors = validateGlobalRules(members, sttSet);
  errors.push(...globalErrors.errors);
  warnings.push(...globalErrors.warnings);

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    validMembers
  };
}

/**
 * Validate từng thành viên
 */
function validateSingleMember(
  member: MemberImportData, 
  sttSet: Set<number | null>,
  allMembers: MemberImportData[]
): { errors: ValidationError[], warnings: ValidationError[] } {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];
  const row = member.stt || 0;

  // 1. STT - Bắt buộc và phải là số dương
  if (member.stt === null || member.stt === undefined) {
    errors.push({
      row,
      field: "STT",
      message: "STT không được để trống",
      value: member.stt
    });
  } else if (member.stt <= 0) {
    errors.push({
      row,
      field: "STT",
      message: "STT phải là số dương",
      value: member.stt
    });
  }

  // 2. Họ tên - Bắt buộc
  if (!member.hoTen || member.hoTen.trim() === "") {
    errors.push({
      row,
      field: "Họ và tên",
      message: "Họ và tên không được để trống"
    });
  } else if (member.hoTen.length > 255) {
    errors.push({
      row,
      field: "Họ và tên",
      message: "Họ và tên không được quá 255 ký tự",
      value: member.hoTen.length
    });
  }

  // 3. Giới tính - Phải là 0 hoặc 1
  if (member.gioiTinh !== 0 && member.gioiTinh !== 1) {
    errors.push({
      row,
      field: "Giới tính",
      message: "Giới tính phải là 0 (Nữ) hoặc 1 (Nam)",
      value: member.gioiTinh
    });
  }

  // 4. Ngày sinh - Validate format nếu có
  if (member.ngaySinh) {
    const dateValidation = validateDate(member.ngaySinh);
    if (!dateValidation.isValid) {
      errors.push({
        row,
        field: "Ngày sinh",
        message: dateValidation.message,
        value: member.ngaySinh
      });
    }
  }

  // 5. Ngày mất - Validate format và logic
  if (member.ngayMat) {
    const dateValidation = validateDate(member.ngayMat);
    if (!dateValidation.isValid) {
      errors.push({
        row,
        field: "Ngày mất",
        message: dateValidation.message,
        value: member.ngayMat
      });
    }
    
    // Ngày mất phải sau ngày sinh
    if (member.ngaySinh && member.ngayMat) {
      if (new Date(member.ngayMat) < new Date(member.ngaySinh)) {
        errors.push({
          row,
          field: "Ngày mất",
          message: "Ngày mất phải sau ngày sinh",
          value: `Sinh: ${member.ngaySinh}, Mất: ${member.ngayMat}`
        });
      }
    }
  }

  // 6. Đời thứ - Phải là số dương
  if (member.doiThuoc !== null && member.doiThuoc !== undefined) {
    if (member.doiThuoc <= 0) {
      errors.push({
        row,
        field: "Đời thứ",
        message: "Đời thứ phải là số dương (1, 2, 3...)",
        value: member.doiThuoc
      });
    }
  }

  // 7. ID Cha - Phải tồn tại trong danh sách
  if (member.chaId !== null) {
    if (!sttSet.has(member.chaId)) {
      errors.push({
        row,
        field: "ID Cha",
        message: `Không tìm thấy thành viên có STT = ${member.chaId}`,
        value: member.chaId
      });
    } else {
      // Cha phải là Nam
      const cha = allMembers.find(m => m.stt === member.chaId);
      if (cha && cha.gioiTinh !== 1) {
        errors.push({
          row,
          field: "ID Cha",
          message: `Cha (STT=${member.chaId}) phải là Nam`,
          value: member.chaId
        });
      }
      // Cha phải ở đời trước (chỉ cảnh báo nếu cha ở đời SAU con)
      if (cha && member.doiThuoc && cha.doiThuoc && cha.doiThuoc > member.doiThuoc) {
        warnings.push({
          row,
          field: "ID Cha",
          message: `Cha (đời ${cha.doiThuoc}) ở đời sau con (đời ${member.doiThuoc}), có thể nhập sai`,
          value: member.chaId
        });
      }
    }
  }

  // 8. ID Mẹ - Phải tồn tại và là Nữ
  if (member.meId !== null) {
    if (!sttSet.has(member.meId)) {
      errors.push({
        row,
        field: "ID Mẹ",
        message: `Không tìm thấy thành viên có STT = ${member.meId}`,
        value: member.meId
      });
    } else {
      const me = allMembers.find(m => m.stt === member.meId);
      if (me && me.gioiTinh !== 0) {
        errors.push({
          row,
          field: "ID Mẹ",
          message: `Mẹ (STT=${member.meId}) phải là Nữ`,
          value: member.meId
        });
      }
    }
  }

  // 9. ID Vợ - Chỉ Nam mới có vợ
  // Nếu Nữ nhập ID Vợ -> tự động chuyển sang ID Chồng (cảnh báo thay vì lỗi)
  if (member.voId !== null) {
    if (member.gioiTinh !== 1) {
      // Nữ nhập ID Vợ -> có thể nhầm, chuyển thành chồng
      if (member.chongId === null) {
        member.chongId = member.voId;
        member.voId = null;
        warnings.push({
          row,
          field: "ID Vợ",
          message: `Nữ không có vợ, đã tự động chuyển ID Vợ=${member.chongId} thành ID Chồng`,
          value: member.chongId
        });
      } else {
        warnings.push({
          row,
          field: "ID Vợ",
          message: "Nữ không có vợ, giá trị ID Vợ sẽ bị bỏ qua",
          value: member.voId
        });
        member.voId = null;
      }
    } else if (!sttSet.has(member.voId)) {
      errors.push({
        row,
        field: "ID Vợ",
        message: `Không tìm thấy thành viên có STT = ${member.voId}`,
        value: member.voId
      });
    } else {
      const vo = allMembers.find(m => m.stt === member.voId);
      if (vo && vo.gioiTinh !== 0) {
        warnings.push({
          row,
          field: "ID Vợ",
          message: `Vợ (STT=${member.voId}) không phải Nữ, có thể nhập sai`,
          value: member.voId
        });
      }
    }
  }

  // 10. ID Chồng - Chỉ Nữ mới có chồng
  // Nếu Nam nhập ID Chồng -> tự động chuyển sang ID Vợ
  if (member.chongId !== null) {
    if (member.gioiTinh !== 0) {
      // Nam nhập ID Chồng -> có thể nhầm, chuyển thành vợ
      if (member.voId === null) {
        member.voId = member.chongId;
        member.chongId = null;
        warnings.push({
          row,
          field: "ID Chồng",
          message: `Nam không có chồng, đã tự động chuyển ID Chồng=${member.voId} thành ID Vợ`,
          value: member.voId
        });
      } else {
        warnings.push({
          row,
          field: "ID Chồng",
          message: "Nam không có chồng, giá trị ID Chồng sẽ bị bỏ qua",
          value: member.chongId
        });
        member.chongId = null;
      }
    } else if (!sttSet.has(member.chongId)) {
      errors.push({
        row,
        field: "ID Chồng",
        message: `Không tìm thấy thành viên có STT = ${member.chongId}`,
        value: member.chongId
      });
    } else {
      const chong = allMembers.find(m => m.stt === member.chongId);
      if (chong && chong.gioiTinh !== 1) {
        warnings.push({
          row,
          field: "ID Chồng",
          message: `Chồng (STT=${member.chongId}) không phải Nam, có thể nhập sai`,
          value: member.chongId
        });
      }
    }
  }

  // 11. Không được tự tham chiếu
  if (member.chaId === member.stt) {
    errors.push({ row, field: "ID Cha", message: "Không thể là cha của chính mình" });
  }
  if (member.meId === member.stt) {
    errors.push({ row, field: "ID Mẹ", message: "Không thể là mẹ của chính mình" });
  }
  if (member.voId === member.stt) {
    errors.push({ row, field: "ID Vợ", message: "Không thể là vợ của chính mình" });
  }
  if (member.chongId === member.stt) {
    errors.push({ row, field: "ID Chồng", message: "Không thể là chồng của chính mình" });
  }

  return { errors, warnings };
}

/**
 * Validate các quy tắc tổng thể
 */
function validateGlobalRules(
  members: MemberImportData[],
  sttSet: Set<number | null>
): { errors: ValidationError[], warnings: ValidationError[] } {
  const errors: ValidationError[] = [];
  const warnings: ValidationError[] = [];

  // 1. Kiểm tra STT trùng lặp
  const sttCount = new Map<number, number>();
  for (const m of members) {
    if (m.stt !== null) {
      sttCount.set(m.stt, (sttCount.get(m.stt) || 0) + 1);
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

  // 2. Kiểm tra quan hệ vợ chồng đối xứng (chỉ log, không cảnh báo)
  // Stored procedure sẽ tự xử lý quan hệ 2 chiều

  // 3. Kiểm tra phải có ít nhất 1 thành viên
  if (members.length === 0) {
    errors.push({
      row: 0,
      field: "Dữ liệu",
      message: "Không có dữ liệu thành viên để import"
    });
  }

  return { errors, warnings };
}

/**
 * Validate định dạng ngày
 * Chấp nhận: YYYY-MM-DD, YYYY-MM-01 (chỉ năm-tháng), YYYY-01-01 (chỉ năm)
 */
function validateDate(dateStr: string): { isValid: boolean; message: string } {
  if (!dateStr) {
    return { isValid: true, message: "" };
  }

  // Format YYYY-MM-DD
  const isoMatch = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const year = parseInt(isoMatch[1]);
    const month = parseInt(isoMatch[2]);
    const day = parseInt(isoMatch[3]);

    // Kiểm tra năm hợp lệ (1800-2100)
    if (year < 1800 || year > 2100) {
      return { isValid: false, message: `Năm ${year} không hợp lệ (1800-2100)` };
    }

    // Kiểm tra tháng
    if (month < 1 || month > 12) {
      return { isValid: false, message: `Tháng ${month} không hợp lệ (1-12)` };
    }

    // Kiểm tra ngày
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > daysInMonth) {
      return { isValid: false, message: `Ngày ${day} không hợp lệ cho tháng ${month}` };
    }

    // Không được là ngày tương lai
    if (new Date(dateStr) > new Date()) {
      return { isValid: false, message: "Ngày không được là tương lai" };
    }

    return { isValid: true, message: "" };
  }

  return { isValid: false, message: `Định dạng ngày không hợp lệ: ${dateStr}. Dùng YYYY-MM-DD` };
}

/**
 * Format lỗi thành message dễ đọc
 */
export function formatValidationErrors(result: ValidationResult): string {
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
  }

  return lines.join("\n");
}
