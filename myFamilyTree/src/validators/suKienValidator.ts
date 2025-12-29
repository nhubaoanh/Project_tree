/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         SU KIEN VALIDATORS                                    ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Validators cho các route liên quan đến sự kiện                              ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import { ValidationChain } from "express-validator";
import {
  stringLength,
  optionalStringLength,
  optionalDate,
  idParam,
  paginationRules,
} from "./commonRules";

// ============================================================================
// CREATE SU KIEN VALIDATOR
// ============================================================================
/**
 * Validate dữ liệu tạo sự kiện mới
 *
 * Fields:
 * - tenSuKien: Bắt buộc, 2-200 ký tự
 * - ngayBatDau: Tùy chọn, format YYYY-MM-DD
 * - ngayKetThuc: Tùy chọn, format YYYY-MM-DD
 * - diaDiem: Tùy chọn, tối đa 200 ký tự
 * - moTa: Tùy chọn, tối đa 1000 ký tự
 */
export const createSuKienRules: ValidationChain[] = [
  stringLength("tenSuKien", "Tên sự kiện", 2, 200),
  optionalDate("ngayBatDau", "Ngày bắt đầu"),
  optionalDate("ngayKetThuc", "Ngày kết thúc"),
  optionalStringLength("diaDiem", "Địa điểm", 200),
  optionalStringLength("moTa", "Mô tả", 1000),
];

// ============================================================================
// UPDATE SU KIEN VALIDATOR
// ============================================================================
export const updateSuKienRules: ValidationChain[] = [
  idParam("id"),
  optionalStringLength("tenSuKien", "Tên sự kiện", 200),
  optionalDate("ngayBatDau", "Ngày bắt đầu"),
  optionalDate("ngayKetThuc", "Ngày kết thúc"),
  optionalStringLength("diaDiem", "Địa điểm", 200),
  optionalStringLength("moTa", "Mô tả", 1000),
];

// ============================================================================
// SEARCH SU KIEN VALIDATOR
// ============================================================================
export const searchSuKienRules: ValidationChain[] = [
  optionalStringLength("keyword", "Từ khóa", 100),
  ...paginationRules,
];
