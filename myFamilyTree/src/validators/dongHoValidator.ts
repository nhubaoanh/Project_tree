/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         DONG HO VALIDATORS                                    ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Validators cho các route liên quan đến dòng họ                              ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import { ValidationChain } from "express-validator";
import {
  stringLength,
  optionalStringLength,
  idParam,
  paginationRules,
} from "./commonRules";

// ============================================================================
// CREATE DONG HO VALIDATOR
// ============================================================================
/**
 * Validate dữ liệu tạo dòng họ mới
 *
 * Fields:
 * - tenDongHo: Bắt buộc, 2-100 ký tự
 * - moTa: Tùy chọn, tối đa 500 ký tự
 */
export const createDongHoRules: ValidationChain[] = [
  stringLength("tenDongHo", "Tên dòng họ", 2, 100),
  optionalStringLength("moTa", "Mô tả", 500),
];

// ============================================================================
// UPDATE DONG HO VALIDATOR
// ============================================================================
/**
 * Validate dữ liệu cập nhật dòng họ
 */
export const updateDongHoRules: ValidationChain[] = [
  idParam("id"),
  optionalStringLength("tenDongHo", "Tên dòng họ", 100),
  optionalStringLength("moTa", "Mô tả", 500),
];

// ============================================================================
// SEARCH DONG HO VALIDATOR
// ============================================================================
export const searchDongHoRules: ValidationChain[] = [
  optionalStringLength("keyword", "Từ khóa", 100),
  ...paginationRules,
];
