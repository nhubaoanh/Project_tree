"use client";
import { Button } from "@/components/ui/button";
import { DataTableDemo } from "./components/userTable";
import { IUser } from "@/types/user";

// app/(admin)/page.tsx
export default function userPage() {
  // Dữ liệu mẫu - bạn sẽ thay thế bằng API call sau
  const mockData: IUser[] = [
    {
      nguoiDungId: "user001",
      dongHoId: "dongho001",
      tenDangNhap: "admin",
      matKhau: "123456",
      hoTen: "Nguyễn Văn Admin",
      email: "admin@example.com",
      soDienThoai: "0123456789",
      vaiTro: "admin",
      anhDaiDien: "",
      ngayTao: new Date(),
      nguoiTaoId: "system",
      active_flag: 1,
      lu_user_id: "system"
    },
    {
      nguoiDungId: "user001",
      dongHoId: "dongho001",
      tenDangNhap: "admin",
      matKhau: "123456",
      hoTen: "Nguyễn Văn Admin",
      email: "admin@example.com",
      soDienThoai: "0123456789",
      vaiTro: "admin",
      anhDaiDien: "",
      ngayTao: new Date(),
      nguoiTaoId: "system",
      active_flag: 1,
      lu_user_id: "system"
    }
    ,{
      nguoiDungId: "user001",
      dongHoId: "dongho001",
      tenDangNhap: "admin",
      matKhau: "123456",
      hoTen: "Nguyễn Văn Admin",
      email: "admin@example.com",
      soDienThoai: "0123456789",
      vaiTro: "admin",
      anhDaiDien: "",
      ngayTao: new Date(),
      nguoiTaoId: "system",
      active_flag: 1,
      lu_user_id: "system"
    }
    ,{
      nguoiDungId: "user001",
      dongHoId: "dongho001",
      tenDangNhap: "admin",
      matKhau: "123456",
      hoTen: "Nguyễn Văn Admin",
      email: "admin@example.com",
      soDienThoai: "0123456789",
      vaiTro: "admin",
      anhDaiDien: "",
      ngayTao: new Date(),
      nguoiTaoId: "system",
      active_flag: 1,
      lu_user_id: "system"
    }
    ,{
      nguoiDungId: "user001",
      dongHoId: "dongho001",
      tenDangNhap: "admin",
      matKhau: "123456",
      hoTen: "Nguyễn Văn Admin",
      email: "admin@example.com",
      soDienThoai: "0123456789",
      vaiTro: "admin",
      anhDaiDien: "",
      ngayTao: new Date(),
      nguoiTaoId: "system",
      active_flag: 1,
      lu_user_id: "system"
    }
    ,{
      nguoiDungId: "user001",
      dongHoId: "dongho001",
      tenDangNhap: "admin",
      matKhau: "123456",
      hoTen: "Nguyễn Văn Admin",
      email: "admin@example.com",
      soDienThoai: "0123456789",
      vaiTro: "admin",
      anhDaiDien: "",
      ngayTao: new Date(),
      nguoiTaoId: "system",
      active_flag: 1,
      lu_user_id: "system"
    }
    ,{
      nguoiDungId: "user001",
      dongHoId: "dongho001",
      tenDangNhap: "admin",
      matKhau: "123456",
      hoTen: "Nguyễn Văn Admin",
      email: "admin@example.com",
      soDienThoai: "0123456789",
      vaiTro: "admin",
      anhDaiDien: "",
      ngayTao: new Date(),
      nguoiTaoId: "system",
      active_flag: 1,
      lu_user_id: "system"
    }
    ,{
      nguoiDungId: "user001",
      dongHoId: "dongho001",
      tenDangNhap: "admin",
      matKhau: "123456",
      hoTen: "Nguyễn Văn Admin",
      email: "admin@example.com",
      soDienThoai: "0123456789",
      vaiTro: "admin",
      anhDaiDien: "",
      ngayTao: new Date(),
      nguoiTaoId: "system",
      active_flag: 1,
      lu_user_id: "system"
    }
    ,{
      nguoiDungId: "user001",
      dongHoId: "dongho001",
      tenDangNhap: "admin",
      matKhau: "123456",
      hoTen: "Nguyễn Văn Admin",
      email: "admin@example.com",
      soDienThoai: "0123456789",
      vaiTro: "admin",
      anhDaiDien: "",
      ngayTao: new Date(),
      nguoiTaoId: "system",
      active_flag: 1,
      lu_user_id: "system"
    }
    ,{
      nguoiDungId: "user001",
      dongHoId: "dongho001",
      tenDangNhap: "admin",
      matKhau: "123456",
      hoTen: "Nguyễn Văn Admin",
      email: "admin@example.com",
      soDienThoai: "0123456789",
      vaiTro: "admin",
      anhDaiDien: "",
      ngayTao: new Date(),
      nguoiTaoId: "system",
      active_flag: 1,
      lu_user_id: "system"
    } ,{
      nguoiDungId: "user001",
      dongHoId: "dongho001",
      tenDangNhap: "admin",
      matKhau: "123456",
      hoTen: "Nguyễn Văn Admin",
      email: "admin@example.com",
      soDienThoai: "0123456789",
      vaiTro: "admin",
      anhDaiDien: "",
      ngayTao: new Date(),
      nguoiTaoId: "system",
      active_flag: 1,
      lu_user_id: "system"
    } ,{
      nguoiDungId: "user001",
      dongHoId: "dongho001",
      tenDangNhap: "admin",
      matKhau: "123456",
      hoTen: "Nguyễn Văn Admin",
      email: "admin@example.com",
      soDienThoai: "0123456789",
      vaiTro: "admin",
      anhDaiDien: "",
      ngayTao: new Date(),
      nguoiTaoId: "system",
      active_flag: 1,
      lu_user_id: "system"
    } ,{
      nguoiDungId: "user001",
      dongHoId: "dongho001",
      tenDangNhap: "admin",
      matKhau: "123456",
      hoTen: "Nguyễn Văn Admin",
      email: "admin@example.com",
      soDienThoai: "0123456789",
      vaiTro: "admin",
      anhDaiDien: "",
      ngayTao: new Date(),
      nguoiTaoId: "system",
      active_flag: 1,
      lu_user_id: "system"
    } ,{
      nguoiDungId: "user001",
      dongHoId: "dongho001",
      tenDangNhap: "admin",
      matKhau: "123456",
      hoTen: "Nguyễn Văn Admin",
      email: "admin@example.com",
      soDienThoai: "0123456789",
      vaiTro: "admin",
      anhDaiDien: "",
      ngayTao: new Date(),
      nguoiTaoId: "system",
      active_flag: 1,
      lu_user_id: "system"
    } ,{
      nguoiDungId: "user001",
      dongHoId: "dongho001",
      tenDangNhap: "admin",
      matKhau: "123456",
      hoTen: "Nguyễn Văn Admin",
      email: "admin@example.com",
      soDienThoai: "0123456789",
      vaiTro: "admin",
      anhDaiDien: "",
      ngayTao: new Date(),
      nguoiTaoId: "system",
      active_flag: 1,
      lu_user_id: "system"
    } ,{
      nguoiDungId: "user001",
      dongHoId: "dongho001",
      tenDangNhap: "admin",
      matKhau: "123456",
      hoTen: "Nguyễn Văn Admin",
      email: "admin@example.com",
      soDienThoai: "0123456789",
      vaiTro: "admin",
      anhDaiDien: "",
      ngayTao: new Date(),
      nguoiTaoId: "system",
      active_flag: 1,
      lu_user_id: "system"
    } ,{
      nguoiDungId: "user001",
      dongHoId: "dongho001",
      tenDangNhap: "admin",
      matKhau: "123456",
      hoTen: "Nguyễn Văn Admin",
      email: "admin@example.com",
      soDienThoai: "0123456789",
      vaiTro: "admin",
      anhDaiDien: "",
      ngayTao: new Date(),
      nguoiTaoId: "system",
      active_flag: 1,
      lu_user_id: "system"
    } ,{
      nguoiDungId: "user001",
      dongHoId: "dongho001",
      tenDangNhap: "admin",
      matKhau: "123456",
      hoTen: "Nguyễn Văn Admin",
      email: "admin@example.com",
      soDienThoai: "0123456789",
      vaiTro: "admin",
      anhDaiDien: "",
      ngayTao: new Date(),
      nguoiTaoId: "system",
      active_flag: 1,
      lu_user_id: "system"
    } ,{
      nguoiDungId: "user001",
      dongHoId: "dongho001",
      tenDangNhap: "admin",
      matKhau: "123456",
      hoTen: "Nguyễn Văn Admin",
      email: "admin@example.com",
      soDienThoai: "0123456789",
      vaiTro: "admin",
      anhDaiDien: "",
      ngayTao: new Date(),
      nguoiTaoId: "system",
      active_flag: 1,
      lu_user_id: "system"
    } ,{
      nguoiDungId: "user001",
      dongHoId: "dongho001",
      tenDangNhap: "admin",
      matKhau: "123456",
      hoTen: "Nguyễn Văn Admin",
      email: "admin@example.com",
      soDienThoai: "0123456789",
      vaiTro: "admin",
      anhDaiDien: "",
      ngayTao: new Date(),
      nguoiTaoId: "system",
      active_flag: 1,
      lu_user_id: "system"
    } ,{
      nguoiDungId: "user001",
      dongHoId: "dongho001",
      tenDangNhap: "admin",
      matKhau: "123456",
      hoTen: "Nguyễn Văn Admin",
      email: "admin@example.com",
      soDienThoai: "0123456789",
      vaiTro: "admin",
      anhDaiDien: "",
      ngayTao: new Date(),
      nguoiTaoId: "system",
      active_flag: 1,
      lu_user_id: "system"
    } ,{
      nguoiDungId: "user001",
      dongHoId: "dongho001",
      tenDangNhap: "admin",
      matKhau: "123456",
      hoTen: "Nguyễn Văn Admin",
      email: "admin@example.com",
      soDienThoai: "0123456789",
      vaiTro: "admin",
      anhDaiDien: "",
      ngayTao: new Date(),
      nguoiTaoId: "system",
      active_flag: 1,
      lu_user_id: "system"
    } ,{
      nguoiDungId: "user001",
      dongHoId: "dongho001",
      tenDangNhap: "admin",
      matKhau: "123456",
      hoTen: "Nguyễn Văn Admin",
      email: "admin@example.com",
      soDienThoai: "0123456789",
      vaiTro: "admin",
      anhDaiDien: "",
      ngayTao: new Date(),
      nguoiTaoId: "system",
      active_flag: 1,
      lu_user_id: "system"
    } ,{
      nguoiDungId: "user001",
      dongHoId: "dongho001",
      tenDangNhap: "admin",
      matKhau: "123456",
      hoTen: "Nguyễn Văn Admin",
      email: "admin@example.com",
      soDienThoai: "0123456789",
      vaiTro: "admin",
      anhDaiDien: "",
      ngayTao: new Date(),
      nguoiTaoId: "system",
      active_flag: 1,
      lu_user_id: "system"
    } ,{
      nguoiDungId: "user001",
      dongHoId: "dongho001",
      tenDangNhap: "admin",
      matKhau: "123456",
      hoTen: "Nguyễn Văn Admin",
      email: "admin@example.com",
      soDienThoai: "0123456789",
      vaiTro: "admin",
      anhDaiDien: "",
      ngayTao: new Date(),
      nguoiTaoId: "system",
      active_flag: 1,
      lu_user_id: "system"
    } ,{
      nguoiDungId: "user001",
      dongHoId: "dongho001",
      tenDangNhap: "admin",
      matKhau: "123456",
      hoTen: "Nguyễn Văn Admin",
      email: "admin@example.com",
      soDienThoai: "0123456789",
      vaiTro: "admin",
      anhDaiDien: "",
      ngayTao: new Date(),
      nguoiTaoId: "system",
      active_flag: 1,
      lu_user_id: "system"
    } ,{
      nguoiDungId: "user001",
      dongHoId: "dongho001",
      tenDangNhap: "admin",
      matKhau: "123456",
      hoTen: "Nguyễn Văn Admin",
      email: "admin@example.com",
      soDienThoai: "0123456789",
      vaiTro: "admin",
      anhDaiDien: "",
      ngayTao: new Date(),
      nguoiTaoId: "system",
      active_flag: 1,
      lu_user_id: "system"
    } ,{
      nguoiDungId: "user001",
      dongHoId: "dongho001",
      tenDangNhap: "admin",
      matKhau: "123456",
      hoTen: "Nguyễn Văn Admin",
      email: "admin@example.com",
      soDienThoai: "0123456789",
      vaiTro: "admin",
      anhDaiDien: "",
      ngayTao: new Date(),
      nguoiTaoId: "system",
      active_flag: 1,
      lu_user_id: "system"
    } ,{
      nguoiDungId: "user001",
      dongHoId: "dongho001",
      tenDangNhap: "admin",
      matKhau: "123456",
      hoTen: "Nguyễn Văn Admin",
      email: "admin@example.com",
      soDienThoai: "0123456789",
      vaiTro: "admin",
      anhDaiDien: "",
      ngayTao: new Date(),
      nguoiTaoId: "system",
      active_flag: 1,
      lu_user_id: "system"
    } ,{
      nguoiDungId: "user001",
      dongHoId: "dongho001",
      tenDangNhap: "admin",
      matKhau: "123456",
      hoTen: "nhữ bảo anh",
      email: "admin@example.com",
      soDienThoai: "0123456789",
      vaiTro: "admin",
      anhDaiDien: "",
      ngayTao: new Date(),
      nguoiTaoId: "system",
      active_flag: 1,
      lu_user_id: "system"
    } ,{
      nguoiDungId: "user001",
      dongHoId: "dongho001",
      tenDangNhap: "admin",
      matKhau: "123456",
      hoTen: "Nguyễn Văn Admin",
      email: "admin@example.com",
      soDienThoai: "0123456789",
      vaiTro: "admin",
      anhDaiDien: "",
      ngayTao: new Date(),
      nguoiTaoId: "system",
      active_flag: 1,
      lu_user_id: "system"
    }
    
  ];
  const handleEdit = (userId: IUser) => {
    console.log("Edit user with ID:", userId);
  }

  const handleDelete = (userId: IUser) => {
    console.log("Edit user with ID:", userId);
  };

  return (
    <div className="scrollbar">
      <div className="flex justify-between item-center mb-4">
        <h1 className="text-xl font-bold">Quan ly nguoi dung</h1>
        <Button
          variant="default"
          className="rounded-xs text-red-200 bg-red-700 hover:bg-red-600 cursor-pointer"
        >
          Them nguoi dung
        </Button>
      </div>

      <DataTableDemo
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
