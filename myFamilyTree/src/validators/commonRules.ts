/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         COMMON VALIDATION RULES                               ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Các rules dùng chung cho nhiều validators                                   ║
 * ║  Import và sử dụng trong các validator cụ thể                                ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import { body, param, ValidationChain } from "express-validator";

// ============================================================================
//                              STRING RULES
// ============================================================================

/**
 * Required string - Chuỗi bắt buộc
 * @param field - Tên field trong body
 * @param label - Tên hiển thị trong message lỗi
 */
export const requiredString = (field: string, label: string): ValidationChain =>
  body(field)
    .trim()
    .notEmpty()
    .withMessage(`${label} không được để trống`)
    .isString()
    .withMessage(`${label} phải là chuỗi ký tự`);

/**
 * Optional string - Chuỗi không bắt buộc
 */
export const optionalString = (field: string, label: string): ValidationChain =>
  body(field)
    .optional({ values: "falsy" })
    .trim()
    .isString()
    .withMessage(`${label} phải là chuỗi ký tự`);

/**
 * String với độ dài min-max
 */
export const stringLength = (
  field: string,
  label: string,
  min: number,
  max: number
): ValidationChain =>
  body(field)
    .trim()
    .notEmpty()
    .withMessage(`${label} không được để trống`)
    .isLength({ min, max })
    .withMessage(`${label} phải từ ${min} đến ${max} ký tự`);

/**
 * Optional string với độ dài
 */
export const optionalStringLength = (
  field: string,
  label: string,
  max: number
): ValidationChain =>
  body(field)
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max })
    .withMessage(`${label} tối đa ${max} ký tự`);


// ============================================================================
//                              NUMBER RULES
// ============================================================================

/**
 * Required number - Số bắt buộc
 */
export const requiredNumber = (field: string, label: string): ValidationChain =>
  body(field)
    .notEmpty()
    .withMessage(`${label} không được để trống`)
    .isNumeric()
    .withMessage(`${label} phải là số`);

/**
 * Positive number - Số dương (> 0)
 */
export const positiveNumber = (field: string, label: string): ValidationChain =>
  body(field)
    .notEmpty()
    .withMessage(`${label} không được để trống`)
    .isFloat({ min: 0.01 })
    .withMessage(`${label} phải lớn hơn 0`);

/**
 * Required integer - Số nguyên bắt buộc
 */
export const requiredInt = (field: string, label: string): ValidationChain =>
  body(field)
    .notEmpty()
    .withMessage(`${label} không được để trống`)
    .isInt()
    .withMessage(`${label} phải là số nguyên`);

/**
 * Positive integer - Số nguyên dương (>= 1)
 */
export const positiveInt = (field: string, label: string): ValidationChain =>
  body(field)
    .notEmpty()
    .withMessage(`${label} không được để trống`)
    .isInt({ min: 1 })
    .withMessage(`${label} phải là số nguyên dương`);

/**
 * Integer trong khoảng min-max
 */
export const intRange = (
  field: string,
  label: string,
  min: number,
  max: number
): ValidationChain =>
  body(field)
    .notEmpty()
    .withMessage(`${label} không được để trống`)
    .isInt({ min, max })
    .withMessage(`${label} phải từ ${min} đến ${max}`);

/**
 * Optional number
 */
export const optionalNumber = (field: string, label: string): ValidationChain =>
  body(field)
    .optional({ values: "falsy" })
    .isNumeric()
    .withMessage(`${label} phải là số`);

/**
 * Optional integer
 */
export const optionalInt = (field: string, label: string): ValidationChain =>
  body(field)
    .optional({ values: "falsy" })
    .isInt({ min: 1 })
    .withMessage(`${label} phải là số nguyên dương`);

// ============================================================================
//                              EMAIL RULES
// ============================================================================

/**
 * Required email
 */
export const emailRule = (field: string = "email"): ValidationChain =>
  body(field)
    .trim()
    .notEmpty()
    .withMessage("Email không được để trống")
    .isEmail()
    .withMessage("Email không hợp lệ")
    .normalizeEmail();

/**
 * Optional email
 */
export const optionalEmail = (field: string = "email"): ValidationChain =>
  body(field)
    .optional({ values: "falsy" })
    .trim()
    .isEmail()
    .withMessage("Email không hợp lệ")
    .normalizeEmail();

// ============================================================================
//                              PHONE RULES
// ============================================================================

/**
 * Required phone - Số điện thoại Việt Nam
 */
export const phoneRule = (field: string = "soDienThoai"): ValidationChain =>
  body(field)
    .trim()
    .notEmpty()
    .withMessage("Số điện thoại không được để trống")
    .matches(/^(0|\+84)[0-9]{9,10}$/)
    .withMessage("Số điện thoại không hợp lệ (VD: 0912345678)");

/**
 * Optional phone
 */
export const optionalPhone = (field: string = "soDienThoai"): ValidationChain =>
  body(field)
    .optional({ values: "falsy" })
    .trim()
    .matches(/^(0|\+84)[0-9]{9,10}$/)
    .withMessage("Số điện thoại không hợp lệ");


// ============================================================================
//                              PASSWORD RULES
// ============================================================================

/**
 * Basic password - Mật khẩu cơ bản (6-50 ký tự)
 */
export const passwordRule = (field: string = "matKhau"): ValidationChain =>
  body(field)
    .notEmpty()
    .withMessage("Mật khẩu không được để trống")
    .isLength({ min: 6, max: 50 })
    .withMessage("Mật khẩu phải từ 6 đến 50 ký tự");

/**
 * Strong password - Mật khẩu mạnh (8-50 ký tự, có chữ hoa, thường, số)
 */
export const strongPasswordRule = (
  field: string = "matKhau"
): ValidationChain =>
  body(field)
    .notEmpty()
    .withMessage("Mật khẩu không được để trống")
    .isLength({ min: 8, max: 50 })
    .withMessage("Mật khẩu phải từ 8 đến 50 ký tự")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường và 1 số");

// ============================================================================
//                              DATE RULES
// ============================================================================

/**
 * Required date - Ngày bắt buộc (ISO 8601: YYYY-MM-DD)
 */
export const dateRule = (field: string, label: string): ValidationChain =>
  body(field)
    .notEmpty()
    .withMessage(`${label} không được để trống`)
    .isISO8601()
    .withMessage(`${label} không đúng định dạng (YYYY-MM-DD)`);

/**
 * Optional date
 */
export const optionalDate = (field: string, label: string): ValidationChain =>
  body(field)
    .optional({ values: "falsy" })
    .isISO8601()
    .withMessage(`${label} không đúng định dạng (YYYY-MM-DD)`);

// ============================================================================
//                              ID/PARAM RULES
// ============================================================================

/**
 * ID param - Kiểm tra :id trong URL
 */
export const idParam = (field: string = "id"): ValidationChain =>
  param(field)
    .notEmpty()
    .withMessage("ID không được để trống")
    .isInt({ min: 1 })
    .withMessage("ID phải là số nguyên dương");

/**
 * Required ID trong body
 */
export const requiredId = (field: string, label: string): ValidationChain =>
  body(field)
    .notEmpty()
    .withMessage(`${label} không được để trống`)
    .isInt({ min: 1 })
    .withMessage(`${label} phải là số nguyên dương`);

/**
 * Optional ID trong body
 */
export const optionalId = (field: string, label: string): ValidationChain =>
  body(field)
    .optional({ values: "falsy" })
    .isInt({ min: 1 })
    .withMessage(`${label} phải là số nguyên dương`);

// ============================================================================
//                              ENUM RULES
// ============================================================================

/**
 * Enum rule - Giá trị phải nằm trong danh sách cho phép
 */
export const enumRule = (
  field: string,
  label: string,
  allowedValues: string[]
): ValidationChain =>
  body(field)
    .notEmpty()
    .withMessage(`${label} không được để trống`)
    .isIn(allowedValues)
    .withMessage(`${label} phải là một trong: ${allowedValues.join(", ")}`);

/**
 * Optional enum
 */
export const optionalEnum = (
  field: string,
  label: string,
  allowedValues: string[]
): ValidationChain =>
  body(field)
    .optional({ values: "falsy" })
    .isIn(allowedValues)
    .withMessage(`${label} phải là một trong: ${allowedValues.join(", ")}`);

// ============================================================================
//                              PAGINATION RULES
// ============================================================================

/**
 * Pagination rules - Phân trang
 */
export const paginationRules = [
  body("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("page phải là số nguyên >= 1"),
  body("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("limit phải từ 1 đến 100"),
];

// ============================================================================
//                              BOOLEAN RULES
// ============================================================================

/**
 * Boolean rule
 */
export const booleanRule = (field: string, label: string): ValidationChain =>
  body(field)
    .optional()
    .isBoolean()
    .withMessage(`${label} phải là true/false`);

// ============================================================================
//                              ARRAY RULES
// ============================================================================

/**
 * Required array - Mảng bắt buộc, ít nhất 1 phần tử
 */
export const arrayRule = (field: string, label: string): ValidationChain =>
  body(field)
    .isArray({ min: 1 })
    .withMessage(`${label} phải là mảng và có ít nhất 1 phần tử`);

/**
 * Optional array
 */
export const optionalArray = (field: string, label: string): ValidationChain =>
  body(field).optional().isArray().withMessage(`${label} phải là mảng`);
