/**
 * Validator tổng hợp - Tối ưu và ngắn gọn
 * Sử dụng: validateForm(data, rules) hoặc validateField(name, value, rules)
 */

// ==================== VALIDATORS ====================
export const v = {
  // Bắt buộc nhập
  required: (val: any, label = "Trường này") =>
    val === undefined || val === null || val === "" || (typeof val === "string" && !val.trim())
      ? `${label} không được để trống`
      : null,

  // Email - chặt chẽ hơn
  email: (val: string, label = "Email") => {
    if (!val) return null;
    // Regex chặt chẽ hơn cho email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(val)) return `${label} không đúng định dạng (VD: user@gmail.com)`;
    // Kiểm tra độ dài
    if (val.length > 254) return `${label} quá dài (tối đa 254 ký tự)`;
    return null;
  },

  // Số điện thoại VN
  phone: (val: string, label = "SĐT") =>
    val && !/^(0|\+84)[0-9]{9,10}$/.test(val.replace(/\s/g, ""))
      ? `${label} không đúng (VD: 0912345678)`
      : null,

  // Độ dài tối thiểu (ký tự)
  min: (val: string, n: number, label = "Trường này") =>
    val && val.length < n ? `${label} tối thiểu ${n} ký tự` : null,

  // Độ dài tối đa (ký tự)
  max: (val: string, n: number, label = "Trường này") =>
    val && val.length > n ? `${label} tối đa ${n} ký tự` : null,

  // Phải là số
  number: (val: any, label = "Trường này") =>
    val !== "" && val !== null && val !== undefined && isNaN(Number(val))
      ? `${label} phải là số`
      : null,

  // Phải là số nguyên
  integer: (val: any, label = "Trường này") =>
    val !== "" && val !== null && !Number.isInteger(Number(val)) ? `${label} phải là số nguyên` : null,

  // Số dương > 0
  positive: (val: any, label = "Trường này") =>
    val !== "" && val !== null && Number(val) <= 0 ? `${label} phải > 0` : null,

  // Số không âm >= 0
  nonNegative: (val: any, label = "Trường này") =>
    val !== "" && val !== null && Number(val) < 0 ? `${label} không được âm` : null,

  // Khoảng giá trị số
  range: (val: any, min: number, max: number, label = "Trường này") => {
    const n = Number(val);
    return val !== "" && val !== null && (isNaN(n) || n < min || n > max)
      ? `${label} phải từ ${min} đến ${max}`
      : null;
  },

  // Ngày hợp lệ
  date: (val: string, label = "Ngày") =>
    val && isNaN(new Date(val).getTime()) ? `${label} không hợp lệ` : null,

  // Không được là ngày tương lai
  notFuture: (val: string, label = "Ngày") =>
    val && new Date(val) > new Date() ? `${label} không được là tương lai` : null,

  // Không được là ngày quá khứ
  notPast: (val: string, label = "Ngày") => {
    if (!val) return null;
    const d = new Date(val);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return d < today ? `${label} không được là quá khứ` : null;
  },

  // Mật khẩu - đơn giản hơn
  password: (val: string, label = "Mật khẩu") => {
    if (!val) return null;
    if (val.length < 6) return `${label} tối thiểu 6 ký tự`;
    if (val.length > 10) return `${label} tối đa 50 ký tự`;
    return null;
  },

  // So khớp với field khác
  match: (val: string, compare: string, label = "Xác nhận") =>
    val && val !== compare ? `${label} không khớp` : null,

  // Tên đăng nhập (chữ, số, _)
  username: (val: string, label = "Tên đăng nhập") => {
    if (!val) return null;
    if (!/^[a-zA-Z0-9_]+$/.test(val)) return `${label} chỉ chứa chữ, số, _`;
    if (val.length < 3 || val.length > 30) return `${label} từ 3-30 ký tự`;
    return null;
  },

  // Giới tính (0, 1, 2 hoặc "Nam", "Nữ", "Khác")
  gender: (val: any, label = "Giới tính") => {
    if (val === undefined || val === null || val === "") return null;
    const valid = [0, 1, 2, "0", "1", "2", "Nam", "Nữ", "Khác", "nam", "nữ", "khác"];
    return !valid.includes(val) ? `${label} không hợp lệ` : null;
  },

  // URL hợp lệ
  url: (val: string, label = "URL") => {
    if (!val) return null;
    try {
      new URL(val);
      return null;
    } catch {
      return `${label} không hợp lệ`;
    }
  },

  // Regex tùy chỉnh
  pattern: (val: string, regex: RegExp, msg: string) =>
    val && !regex.test(val) ? msg : null,

  // Custom function
  custom: (val: any, fn: (v: any) => boolean, msg: string) =>
    !fn(val) ? msg : null,

  // ==================== NEW VALIDATORS ====================

  // Chỉ chữ cái (không số, không ký tự đặc biệt) - cho phép khoảng trắng và dấu tiếng Việt
  alpha: (val: string, label = "Trường này") => {
    if (!val) return null;
    // Cho phép chữ cái (có dấu tiếng Việt), khoảng trắng
    if (/\d/.test(val)) return `${label} không được chứa số`;
    if (/[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?`~-]/.test(val)) return `${label} không được chứa ký tự đặc biệt`;
    return null;
  },

  // Chỉ chữ và số (alphanumeric)
  alphaNum: (val: string, label = "Trường này") => {
    if (!val) return null;
    if (/[^a-zA-Z0-9\s\u00C0-\u024F\u1E00-\u1EFF]/.test(val)) return `${label} chỉ được chứa chữ và số`;
    return null;
  },

  // Không chứa số
  noNumber: (val: string, label = "Trường này") => {
    if (!val) return null;
    return /\d/.test(val) ? `${label} không được chứa số` : null;
  },

  // Không chứa ký tự đặc biệt
  noSpecial: (val: string, label = "Trường này") => {
    if (!val) return null;
    return /[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?`~-]/.test(val) ? `${label} không được chứa ký tự đặc biệt` : null;
  },

  // Không chỉ toàn khoảng trắng (đã có trong required nhưng tách riêng)
  notOnlySpaces: (val: string, label = "Trường này") => {
    if (!val) return null;
    return val.trim() === "" ? `${label} không được chỉ toàn khoảng trắng` : null;
  },

  // Họ tên hợp lệ (2-50 ký tự, không số, không ký tự đặc biệt)
  fullName: (val: string, label = "Họ tên") => {
    if (!val) return null;
    const trimmed = val.trim();
    if (trimmed.length < 2) return `${label} tối thiểu 2 ký tự`;
    if (trimmed.length > 50) return `${label} tối đa 50 ký tự`;
    if (/\d/.test(val)) return `${label} không được chứa số`;
    if (/[!@#$%^&*()_+=\[\]{};':"\\|,.<>\/?`~-]/.test(val)) return `${label} không được chứa ký tự đặc biệt`;
    return null;
  },

  // Tuổi hợp lệ (0-150)
  age: (val: any, label = "Tuổi") => {
    if (val === "" || val === null || val === undefined) return null;
    const n = Number(val);
    if (isNaN(n)) return `${label} phải là số`;
    if (!Number.isInteger(n)) return `${label} phải là số nguyên`;
    if (n < 0 || n > 150) return `${label} phải từ 0-150`;
    return null;
  },

  // Năm hợp lệ (1900 - năm hiện tại + 10)
  year: (val: any, label = "Năm") => {
    if (val === "" || val === null || val === undefined) return null;
    const n = Number(val);
    const maxYear = new Date().getFullYear() + 10;
    if (isNaN(n)) return `${label} phải là số`;
    if (!Number.isInteger(n)) return `${label} phải là số nguyên`;
    if (n < 1900 || n > maxYear) return `${label} phải từ 1900-${maxYear}`;
    return null;
  },

  // Ngày sinh hợp lệ (không quá 150 tuổi, không tương lai)
  birthDate: (val: string, label = "Ngày sinh") => {
    if (!val) return null;
    const date = new Date(val);
    if (isNaN(date.getTime())) return `${label} không hợp lệ`;
    
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    const dayDiff = today.getDate() - date.getDate();
    
    // Kiểm tra tương lai
    if (date > today) return `${label} không được là tương lai`;
    
    // Kiểm tra quá 150 tuổi
    if (age > 150 || (age === 150 && (monthDiff > 0 || (monthDiff === 0 && dayDiff > 0)))) {
      return `${label} không hợp lệ (quá 150 tuổi)`;
    }
    
    return null;
  },

  // Ngày mất hợp lệ (sau ngày sinh, không tương lai)
  deathDate: (val: string, birthDate: string, label = "Ngày mất") => {
    if (!val) return null;
    const date = new Date(val);
    if (isNaN(date.getTime())) return `${label} không hợp lệ`;
    
    const today = new Date();
    // Kiểm tra tương lai
    if (date > today) return `${label} không được là tương lai`;
    
    // Kiểm tra so với ngày sinh
    if (birthDate) {
      const birth = new Date(birthDate);
      if (!isNaN(birth.getTime()) && date <= birth) {
        return `${label} phải sau ngày sinh`;
      }
    }
    
    return null;
  },

  // Năm sáng tác (không quá năm hiện tại)
  creationYear: (val: any, label = "Năm sáng tác") => {
    if (val === "" || val === null || val === undefined) return null;
    const n = Number(val);
    const currentYear = new Date().getFullYear();
    if (isNaN(n)) return `${label} phải là số`;
    if (!Number.isInteger(n)) return `${label} phải là số nguyên`;
    if (n < 1000 || n > currentYear) return `${label} phải từ 1000 đến ${currentYear}`;
    return null;
  },

  // Số CMND/CCCD (9 hoặc 12 số)
  idCard: (val: string, label = "CMND/CCCD") => {
    if (!val) return null;
    const cleaned = val.replace(/\s/g, "");
    if (!/^\d{9}$|^\d{12}$/.test(cleaned)) return `${label} phải có 9 hoặc 12 số`;
    return null;
  },


  // Ngày đóng (không quá ngày hiện tại)
  closingDate: (val: string, label = "Ngày đóng") => {
    if (!val) return null;
    const date = new Date(val);
    if (isNaN(date.getTime())) return `${label} không hợp lệ`;
    
    const today = new Date();
    today.setHours(23, 59, 59, 999); // Cho phép đóng trong ngày hiện tại
    
    if (date > today) return `${label} không được quá ngày hiện tại`;
    return null;
  },


};

// ==================== TYPES ====================
export type Rule =
  | "required"
  | "email"
  | "phone"
  | "number"
  | "integer"
  | "positive"
  | "nonNegative"
  | "date"
  | "notFuture"
  | "notPast"
  | "password"
  | "username"
  | "gender"
  | "url"
  | "alpha"
  | "alphaNum"
  | "noNumber"
  | "noSpecial"
  | "notOnlySpaces"
  | "fullName"
  | "age"
  | "year"
  | "idCard"
  | "birthDate"
  | "creationYear"
  | "closingDate"
  | { min: number }
  | { max: number }
  | { range: [number, number] }
  | { match: string }
  | { deathDate: string }
  | { pattern: RegExp; msg: string }
  | { custom: (val: any, data?: any) => boolean; msg: string };

export interface FieldConfig {
  label: string;
  rules: Rule[];
}

export type FormRules = Record<string, FieldConfig>;
export type FormErrors = Record<string, string | null>;

// ==================== VALIDATE FIELD ====================
export function validateField(
  name: string,
  value: any,
  rules: FormRules,
  formData?: Record<string, any>
): string | null {
  const config = rules[name];
  if (!config) return null;

  const { label, rules: fieldRules } = config;

  for (const rule of fieldRules) {
    let error: string | null = null;

    if (typeof rule === "string") {
      switch (rule) {
        case "required": error = v.required(value, label); break;
        case "email": error = v.email(value, label); break;
        case "phone": error = v.phone(value, label); break;
        case "number": error = v.number(value, label); break;
        case "integer": error = v.integer(value, label); break;
        case "positive": error = v.positive(value, label); break;
        case "nonNegative": error = v.nonNegative(value, label); break;
        case "date": error = v.date(value, label); break;
        case "notFuture": error = v.notFuture(value, label); break;
        case "notPast": error = v.notPast(value, label); break;
        case "password": error = v.password(value, label); break;
        case "username": error = v.username(value, label); break;
        case "gender": error = v.gender(value, label); break;
        case "url": error = v.url(value, label); break;
        case "alpha": error = v.alpha(value, label); break;
        case "alphaNum": error = v.alphaNum(value, label); break;
        case "noNumber": error = v.noNumber(value, label); break;
        case "noSpecial": error = v.noSpecial(value, label); break;
        case "notOnlySpaces": error = v.notOnlySpaces(value, label); break;
        case "fullName": error = v.fullName(value, label); break;
        case "age": error = v.age(value, label); break;
        case "year": error = v.year(value, label); break;
        case "idCard": error = v.idCard(value, label); break;
        case "birthDate": error = v.birthDate(value, label); break;
        case "creationYear": error = v.creationYear(value, label); break;
        case "closingDate": error = v.closingDate(value, label); break;
      }
    } else {
      if ("min" in rule) error = v.min(value, rule.min, label);
      else if ("max" in rule) error = v.max(value, rule.max, label);
      else if ("range" in rule) error = v.range(value, rule.range[0], rule.range[1], label);
      else if ("match" in rule) error = v.match(value, formData?.[rule.match], label);
      else if ("deathDate" in rule) error = v.deathDate(value, formData?.[rule.deathDate], label);
      else if ("pattern" in rule) error = v.pattern(value, rule.pattern, rule.msg);
      else if ("custom" in rule) error = v.custom(value, (val) => rule.custom(val, formData), rule.msg);
    }

    if (error) return error;
  }

  return null;
}

// ==================== VALIDATE FORM ====================
export function validateForm(
  data: Record<string, any>,
  rules: FormRules
): { isValid: boolean; errors: FormErrors } {
  const errors: FormErrors = {};
  let isValid = true;

  for (const name of Object.keys(rules)) {
    const error = validateField(name, data[name], rules, data);
    errors[name] = error;
    if (error) isValid = false;
  }

  return { isValid, errors };
}

// ==================== QUICK VALIDATORS ====================
export const validate = v;

// ==================== STANDALONE VALIDATORS ====================
// Các hàm validate đơn lẻ để dùng trực tiếp
export const validateEmail = (val: string, label = "Email"): string | null => v.email(val, label);
export const validatePassword = (val: string, label = "Mật khẩu"): string | null => v.password(val, label);
export const validateName = (val: string, label = "Họ tên"): string | null => v.fullName(val, label);
export const validatePhone = (val: string, label = "SĐT"): string | null => v.phone(val, label);
export const validateRequired = (val: any, label = "Trường này"): string | null => v.required(val, label);
