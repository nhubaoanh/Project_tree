/**
 * Validator tổng hợp cho các form
 * Sử dụng: const error = validate.required(value, "Họ tên")
 *          const errors = validateForm(data, rules)
 */

// ==================== VALIDATORS ĐƠN LẺ ====================

export const validate = {
  // Bắt buộc nhập
  required: (value: any, fieldName: string = "Trường này"): string | null => {
    if (value === undefined || value === null || value === "") {
      return `${fieldName} không được để trống`;
    }
    if (typeof value === "string" && value.trim() === "") {
      return `${fieldName} không được để trống`;
    }
    return null;
  },

  // Email
  email: (value: string, fieldName: string = "Email"): string | null => {
    if (!value) return null; // Không validate nếu rỗng (dùng required riêng)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return `${fieldName} không đúng định dạng`;
    }
    return null;
  },

  // Số điện thoại Việt Nam
  phone: (value: string, fieldName: string = "Số điện thoại"): string | null => {
    if (!value) return null;
    const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
    if (!phoneRegex.test(value.replace(/\s/g, ""))) {
      return `${fieldName} không đúng định dạng (VD: 0912345678)`;
    }
    return null;
  },

  // Độ dài tối thiểu
  minLength: (value: string, min: number, fieldName: string = "Trường này"): string | null => {
    if (!value) return null;
    if (value.length < min) {
      return `${fieldName} phải có ít nhất ${min} ký tự`;
    }
    return null;
  },

  // Độ dài tối đa
  maxLength: (value: string, max: number, fieldName: string = "Trường này"): string | null => {
    if (!value) return null;
    if (value.length > max) {
      return `${fieldName} không được vượt quá ${max} ký tự`;
    }
    return null;
  },

  // Độ dài trong khoảng
  length: (value: string, min: number, max: number, fieldName: string = "Trường này"): string | null => {
    if (!value) return null;
    if (value.length < min || value.length > max) {
      return `${fieldName} phải từ ${min} đến ${max} ký tự`;
    }
    return null;
  },

  // Số nguyên
  integer: (value: any, fieldName: string = "Trường này"): string | null => {
    if (value === undefined || value === null || value === "") return null;
    if (!Number.isInteger(Number(value))) {
      return `${fieldName} phải là số nguyên`;
    }
    return null;
  },

  // Số dương
  positive: (value: any, fieldName: string = "Trường này"): string | null => {
    if (value === undefined || value === null || value === "") return null;
    if (Number(value) <= 0) {
      return `${fieldName} phải là số dương`;
    }
    return null;
  },

  // Số trong khoảng
  range: (value: any, min: number, max: number, fieldName: string = "Trường này"): string | null => {
    if (value === undefined || value === null || value === "") return null;
    const num = Number(value);
    if (isNaN(num) || num < min || num > max) {
      return `${fieldName} phải từ ${min} đến ${max}`;
    }
    return null;
  },

  // Mật khẩu mạnh
  password: (value: string, fieldName: string = "Mật khẩu"): string | null => {
    if (!value) return null;
    if (value.length < 6) {
      return `${fieldName} phải có ít nhất 6 ký tự`;
    }
    if (!/[a-z]/.test(value)) {
      return `${fieldName} phải có ít nhất 1 chữ thường`;
    }
    if (!/[0-9]/.test(value)) {
      return `${fieldName} phải có ít nhất 1 chữ số`;
    }
    return null;
  },

  // Mật khẩu xác nhận
  confirmPassword: (value: string, password: string, fieldName: string = "Xác nhận mật khẩu"): string | null => {
    if (!value) return null;
    if (value !== password) {
      return `${fieldName} không khớp`;
    }
    return null;
  },

  // Ngày hợp lệ
  date: (value: string, fieldName: string = "Ngày"): string | null => {
    if (!value) return null;
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return `${fieldName} không đúng định dạng`;
    }
    return null;
  },

  // Ngày không được là tương lai
  notFutureDate: (value: string, fieldName: string = "Ngày"): string | null => {
    if (!value) return null;
    const date = new Date(value);
    if (date > new Date()) {
      return `${fieldName} không được là ngày tương lai`;
    }
    return null;
  },

  // Ngày không được là quá khứ
  notPastDate: (value: string, fieldName: string = "Ngày"): string | null => {
    if (!value) return null;
    const date = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) {
      return `${fieldName} không được là ngày quá khứ`;
    }
    return null;
  },

  // Năm hợp lệ (1800-2100)
  year: (value: any, fieldName: string = "Năm"): string | null => {
    if (value === undefined || value === null || value === "") return null;
    const year = Number(value);
    if (isNaN(year) || year < 1800 || year > 2100) {
      return `${fieldName} phải từ 1800 đến 2100`;
    }
    return null;
  },

  // Chỉ chữ cái và khoảng trắng (tên người)
  name: (value: string, fieldName: string = "Tên"): string | null => {
    if (!value) return null;
    // Cho phép chữ cái Unicode và khoảng trắng
    const nameRegex = /^[\p{L}\s]+$/u;
    if (!nameRegex.test(value)) {
      return `${fieldName} chỉ được chứa chữ cái và khoảng trắng`;
    }
    return null;
  },

  // Username (chữ, số, gạch dưới)
  username: (value: string, fieldName: string = "Tên đăng nhập"): string | null => {
    if (!value) return null;
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(value)) {
      return `${fieldName} chỉ được chứa chữ cái, số và dấu gạch dưới`;
    }
    if (value.length < 3 || value.length > 30) {
      return `${fieldName} phải từ 3 đến 30 ký tự`;
    }
    return null;
  },

  // Giới tính (0 hoặc 1)
  gender: (value: any, fieldName: string = "Giới tính"): string | null => {
    if (value === undefined || value === null || value === "") return null;
    if (value !== 0 && value !== 1 && value !== "0" && value !== "1") {
      return `${fieldName} phải là 0 (Nữ) hoặc 1 (Nam)`;
    }
    return null;
  },

  // URL
  url: (value: string, fieldName: string = "URL"): string | null => {
    if (!value) return null;
    try {
      new URL(value);
      return null;
    } catch {
      return `${fieldName} không đúng định dạng`;
    }
  },

  // Regex tùy chỉnh
  pattern: (value: string, regex: RegExp, message: string): string | null => {
    if (!value) return null;
    if (!regex.test(value)) {
      return message;
    }
    return null;
  },

  // Custom validator
  custom: (value: any, validator: (val: any) => boolean, message: string): string | null => {
    if (!validator(value)) {
      return message;
    }
    return null;
  },
};

// ==================== VALIDATE FORM ====================

export type ValidationRule = 
  | { type: "required"; message?: string }
  | { type: "email"; message?: string }
  | { type: "phone"; message?: string }
  | { type: "minLength"; value: number; message?: string }
  | { type: "maxLength"; value: number; message?: string }
  | { type: "length"; min: number; max: number; message?: string }
  | { type: "integer"; message?: string }
  | { type: "positive"; message?: string }
  | { type: "range"; min: number; max: number; message?: string }
  | { type: "password"; message?: string }
  | { type: "confirmPassword"; compareField: string; message?: string }
  | { type: "date"; message?: string }
  | { type: "notFutureDate"; message?: string }
  | { type: "notPastDate"; message?: string }
  | { type: "year"; message?: string }
  | { type: "name"; message?: string }
  | { type: "username"; message?: string }
  | { type: "gender"; message?: string }
  | { type: "url"; message?: string }
  | { type: "pattern"; regex: RegExp; message: string }
  | { type: "custom"; validator: (value: any, formData: any) => boolean; message: string };

export interface FormRules {
  [fieldName: string]: {
    label: string;
    rules: ValidationRule[];
  };
}

export interface FormErrors {
  [fieldName: string]: string | null;
}

/**
 * Validate toàn bộ form
 * @param formData - Dữ liệu form
 * @param rules - Quy tắc validate
 * @returns Object chứa lỗi của từng field
 */
export function validateForm<T extends Record<string, any>>(
  formData: T,
  rules: FormRules
): { isValid: boolean; errors: FormErrors } {
  const errors: FormErrors = {};
  let isValid = true;

  for (const [fieldName, config] of Object.entries(rules)) {
    const value = formData[fieldName];
    const { label, rules: fieldRules } = config;

    for (const rule of fieldRules) {
      let error: string | null = null;

      switch (rule.type) {
        case "required":
          error = validate.required(value, label);
          break;
        case "email":
          error = validate.email(value, label);
          break;
        case "phone":
          error = validate.phone(value, label);
          break;
        case "minLength":
          error = validate.minLength(value, rule.value, label);
          break;
        case "maxLength":
          error = validate.maxLength(value, rule.value, label);
          break;
        case "length":
          error = validate.length(value, rule.min, rule.max, label);
          break;
        case "integer":
          error = validate.integer(value, label);
          break;
        case "positive":
          error = validate.positive(value, label);
          break;
        case "range":
          error = validate.range(value, rule.min, rule.max, label);
          break;
        case "password":
          error = validate.password(value, label);
          break;
        case "confirmPassword":
          error = validate.confirmPassword(value, formData[rule.compareField], label);
          break;
        case "date":
          error = validate.date(value, label);
          break;
        case "notFutureDate":
          error = validate.notFutureDate(value, label);
          break;
        case "notPastDate":
          error = validate.notPastDate(value, label);
          break;
        case "year":
          error = validate.year(value, label);
          break;
        case "name":
          error = validate.name(value, label);
          break;
        case "username":
          error = validate.username(value, label);
          break;
        case "gender":
          error = validate.gender(value, label);
          break;
        case "url":
          error = validate.url(value, label);
          break;
        case "pattern":
          error = validate.pattern(value, rule.regex, rule.message);
          break;
        case "custom":
          error = validate.custom(value, (v) => rule.validator(v, formData), rule.message);
          break;
      }

      // Nếu có custom message, dùng nó
      if (error && rule.message) {
        error = rule.message;
      }

      if (error) {
        errors[fieldName] = error;
        isValid = false;
        break; // Dừng ở lỗi đầu tiên của field
      }
    }

    // Nếu không có lỗi, set null
    if (!errors[fieldName]) {
      errors[fieldName] = null;
    }
  }

  return { isValid, errors };
}

/**
 * Validate một field đơn lẻ
 */
export function validateField<T extends Record<string, any>>(
  fieldName: string,
  value: any,
  rules: FormRules,
  formData?: T
): string | null {
  const config = rules[fieldName];
  if (!config) return null;

  const { label, rules: fieldRules } = config;

  for (const rule of fieldRules) {
    let error: string | null = null;

    switch (rule.type) {
      case "required":
        error = validate.required(value, label);
        break;
      case "email":
        error = validate.email(value, label);
        break;
      case "phone":
        error = validate.phone(value, label);
        break;
      case "minLength":
        error = validate.minLength(value, rule.value, label);
        break;
      case "maxLength":
        error = validate.maxLength(value, rule.value, label);
        break;
      case "password":
        error = validate.password(value, label);
        break;
      case "confirmPassword":
        error = validate.confirmPassword(value, formData?.[rule.compareField], label);
        break;
      case "gender":
        error = validate.gender(value, label);
        break;
      // ... thêm các case khác nếu cần
    }

    if (error && rule.message) {
      error = rule.message;
    }

    if (error) return error;
  }

  return null;
}

// ==================== LEGACY EXPORTS (tương thích code cũ) ====================

export const validateEmail = (email: string): string | null => validate.email(email, "Email") || validate.required(email, "Email");
export const validatePassword = (password: string): string | null => validate.required(password, "Mật khẩu") || validate.password(password, "Mật khẩu");
export const validateName = (name: string, fieldName: string = "Tên"): string | null => validate.required(name, fieldName) || validate.maxLength(name, 50, fieldName);
