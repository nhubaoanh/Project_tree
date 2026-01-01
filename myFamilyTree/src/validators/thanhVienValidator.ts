/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         THANH VIEN VALIDATORS                                 ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Validators cho các route liên quan đến thành viên gia phả                   ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import { ValidationChain, body } from "express-validator";
import {
  stringLength,
  optionalStringLength,
  optionalEnum,
  optionalDate,
  optionalId,
  idParam,
  paginationRules,
} from "./commonRules";

// ============================================================================
// CREATE THANH VIEN VALIDATOR
// ============================================================================
/**
 * Validate dữ liệu tạo thành viên mới
 *
 * Fields:
 * - hoTen: Bắt buộc, 2-100 ký tự
 * - gioiTinh: Tùy chọn (0, 1, 2 hoặc "Nam", "Nữ", "Khác")
 * - ngaySinh: Tùy chọn, format YYYY-MM-DD
 * - ngayMat: Tùy chọn, format YYYY-MM-DD
 * - dongHoId: Tùy chọn, số nguyên dương
 * - chaId: Tùy chọn, số nguyên dương
 * - meId: Tùy chọn, số nguyên dương
 */
export const createThanhVienRules: ValidationChain[] = [
  stringLength("hoTen", "Họ tên", 2, 100),
  // gioiTinh có thể là số (0, 1, 2) hoặc string
  body("gioiTinh")
    .optional({ values: "falsy" })
    .custom((value) => {
      const validValues = [0, 1, 2, "0", "1", "2", "Nam", "Nữ", "Khác"];
      if (!validValues.includes(value)) {
        throw new Error("Giới tính không hợp lệ");
      }
      return true;
    }),
  optionalDate("ngaySinh", "Ngày sinh"),
  optionalDate("ngayMat", "Ngày mất"),
  optionalId("dongHoId", "Dòng họ ID"),
  optionalId("chaId", "Cha ID"),
  optionalId("meId", "Mẹ ID"),
];

// ============================================================================
// UPDATE THANH VIEN VALIDATOR
// ============================================================================
/**
 * Validate dữ liệu cập nhật thành viên
 *
 * Fields:
 * - id (param): Bắt buộc, số nguyên dương
 * - hoTen: Tùy chọn, 2-100 ký tự
 * - gioiTinh: Tùy chọn (0, 1, 2 hoặc "Nam", "Nữ", "Khác")
 * - ngaySinh: Tùy chọn
 */
export const updateThanhVienRules: ValidationChain[] = [
  idParam("id"),
  optionalStringLength("hoTen", "Họ tên", 100),
  // gioiTinh có thể là số (0, 1, 2) hoặc string
  body("gioiTinh")
    .optional({ values: "falsy" })
    .custom((value) => {
      // Chấp nhận số 0, 1, 2 hoặc string "Nam", "Nữ", "Khác"
      const validValues = [0, 1, 2, "0", "1", "2", "Nam", "Nữ", "Khác"];
      if (!validValues.includes(value)) {
        throw new Error("Giới tính không hợp lệ");
      }
      return true;
    }),
  optionalDate("ngaySinh", "Ngày sinh"),
  optionalDate("ngayMat", "Ngày mất"),
];

// ============================================================================
// ID PARAM VALIDATOR
// ============================================================================
/**
 * Validate ID trong URL params
 */
export const idParamRules: ValidationChain[] = [idParam("id")];

// ============================================================================
// SEARCH THANH VIEN VALIDATOR
// ============================================================================
/**
 * Validate dữ liệu tìm kiếm thành viên
 */
export const searchThanhVienRules: ValidationChain[] = [
  optionalStringLength("keyword", "Từ khóa", 100),
  optionalStringLength("search_content", "Nội dung tìm kiếm", 100),
  optionalStringLength("dongHoId", "Dòng họ ID", 50),
  ...paginationRules,
];
