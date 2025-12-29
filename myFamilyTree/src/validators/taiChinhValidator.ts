/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         TAI CHINH VALIDATORS                                  ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Validators cho các route liên quan đến tài chính (thu/chi)                  ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import { ValidationChain } from "express-validator";
import {
  positiveNumber,
  optionalStringLength,
  optionalDate,
  idParam,
  paginationRules,
} from "./commonRules";

// ============================================================================
// TAI CHINH THU VALIDATOR
// ============================================================================
/**
 * Validate dữ liệu thu tài chính
 *
 * Fields:
 * - soTien: Bắt buộc, số dương
 * - moTa: Tùy chọn, tối đa 500 ký tự
 * - ngay: Tùy chọn, format YYYY-MM-DD
 */
export const taiChinhThuRules: ValidationChain[] = [
  positiveNumber("soTien", "Số tiền"),
  optionalStringLength("moTa", "Mô tả", 500),
  optionalDate("ngay", "Ngày"),
];

// ============================================================================
// TAI CHINH CHI VALIDATOR
// ============================================================================
/**
 * Validate dữ liệu chi tài chính
 */
export const taiChinhChiRules: ValidationChain[] = [
  positiveNumber("soTien", "Số tiền"),
  optionalStringLength("moTa", "Mô tả", 500),
  optionalDate("ngay", "Ngày"),
];

// ============================================================================
// UPDATE TAI CHINH VALIDATOR
// ============================================================================
export const updateTaiChinhRules: ValidationChain[] = [
  idParam("id"),
  positiveNumber("soTien", "Số tiền"),
  optionalStringLength("moTa", "Mô tả", 500),
  optionalDate("ngay", "Ngày"),
];

// ============================================================================
// SEARCH TAI CHINH VALIDATOR
// ============================================================================
export const searchTaiChinhRules: ValidationChain[] = [
  optionalDate("tuNgay", "Từ ngày"),
  optionalDate("denNgay", "Đến ngày"),
  ...paginationRules,
];
