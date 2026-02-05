/**
 * Member Validator - Validation rules cho thành viên gia phả
 */

import { FormRules } from "./validator";

// Rules cho tạo thành viên mới
export const createMemberRules: FormRules = {
  hoTen: {
    label: "Họ tên",
    rules: ["required", "fullName", { min: 2 }, { max: 50 }],
  },
  gioiTinh: {
    label: "Giới tính",
    rules: ["required", "gender"],
  },
  ngaySinh: {
    label: "Ngày sinh",
    rules: ["birthDate"],
  },
  ngayMat: {
    label: "Ngày mất",
    rules: [{ deathDate: "ngaySinh" }],
  },
  noiSinh: {
    label: "Nơi sinh",
    rules: [{ max: 200 }],
  },
  noiMat: {
    label: "Nơi mất",
    rules: [{ max: 200 }],
  },
  ngheNghiep: {
    label: "Nghề nghiệp",
    rules: [{ max: 100 }],
  },
  trinhDoHocVan: {
    label: "Trình độ học vấn",
    rules: [{ max: 100 }],
  },
  soDienThoai: {
    label: "Số điện thoại",
    rules: ["phone"],
  },
  email: {
    label: "Email",
    rules: ["email"],
  },
  diaChi: {
    label: "Địa chỉ",
    rules: [{ max: 300 }],
  },
  ghiChu: {
    label: "Ghi chú",
    rules: [{ max: 500 }],
  },
};

// Rules cho cập nhật thành viên (tất cả optional trừ ID)
export const updateMemberRules: FormRules = {
  thanhVienId: {
    label: "ID thành viên",
    rules: ["required", "integer", "positive"],
  },
  hoTen: {
    label: "Họ tên",
    rules: ["fullName", { min: 2 }, { max: 50 }],
  },
  gioiTinh: {
    label: "Giới tính",
    rules: ["gender"],
  },
  ngaySinh: {
    label: "Ngày sinh",
    rules: ["birthDate"],
  },
  ngayMat: {
    label: "Ngày mất",
    rules: [{ deathDate: "ngaySinh" }],
  },
  noiSinh: {
    label: "Nơi sinh",
    rules: [{ max: 200 }],
  },
  noiMat: {
    label: "Nơi mất",
    rules: [{ max: 200 }],
  },
  ngheNghiep: {
    label: "Nghề nghiệp",
    rules: [{ max: 100 }],
  },
  trinhDoHocVan: {
    label: "Trình độ học vấn",
    rules: [{ max: 100 }],
  },
  soDienThoai: {
    label: "Số điện thoại",
    rules: ["phone"],
  },
  email: {
    label: "Email",
    rules: ["email"],
  },
  diaChi: {
    label: "Địa chỉ",
    rules: [{ max: 300 }],
  },
  ghiChu: {
    label: "Ghi chú",
    rules: [{ max: 500 }],
  },
};

// Rules cho tìm kiếm thành viên
export const searchMemberRules: FormRules = {
  keyword: {
    label: "Từ khóa",
    rules: [{ max: 100 }],
  },
  gioiTinh: {
    label: "Giới tính",
    rules: ["gender"],
  },
  namSinhTu: {
    label: "Năm sinh từ",
    rules: ["year"],
  },
  namSinhDen: {
    label: "Năm sinh đến",
    rules: ["year"],
  },
};

// Rules cho import Excel
export const importMemberRules: FormRules = {
  hoTen: {
    label: "Họ tên",
    rules: ["required", "fullName", { min: 2 }, { max: 50 }],
  },
  gioiTinh: {
    label: "Giới tính",
    rules: ["gender"],
  },
  ngaySinh: {
    label: "Ngày sinh",
    rules: ["birthDate"],
  },
  ngayMat: {
    label: "Ngày mất",
    rules: [{ deathDate: "ngaySinh" }],
  },
  chaId: {
    label: "ID cha",
    rules: ["integer", "positive"],
  },
  meId: {
    label: "ID mẹ",
    rules: ["integer", "positive"],
  },
};