/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         TIN TUC VALIDATORS                                    ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Validators cho các route liên quan đến tin tức                              ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import { body, ValidationChain } from "express-validator";
import {
  stringLength,
  optionalStringLength,
  idParam,
  paginationRules,
} from "./commonRules";

// ============================================================================
// CREATE TIN TUC VALIDATOR
// ============================================================================
/**
 * Validate dữ liệu tạo tin tức mới
 *
 * Fields:
 * - tieuDe: Bắt buộc, 5-200 ký tự
 * - noiDung: Bắt buộc, ít nhất 10 ký tự
 */
export const createTinTucRules: ValidationChain[] = [
  stringLength("tieuDe", "Tiêu đề", 5, 200),
  body("noiDung")
    .trim()
    .notEmpty()
    .withMessage("Nội dung không được để trống")
    .isLength({ min: 10 })
    .withMessage("Nội dung phải có ít nhất 10 ký tự"),
];

// ============================================================================
// UPDATE TIN TUC VALIDATOR
// ============================================================================
export const updateTinTucRules: ValidationChain[] = [
  idParam("id"),
  optionalStringLength("tieuDe", "Tiêu đề", 200),
  body("noiDung")
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage("Nội dung phải có ít nhất 10 ký tự"),
];

// ============================================================================
// SEARCH TIN TUC VALIDATOR
// ============================================================================
export const searchTinTucRules: ValidationChain[] = [
  optionalStringLength("keyword", "Từ khóa", 100),
  ...paginationRules,
];
