"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import storage from "@/utils/storage";
import { useToast } from "@/service/useToas";
import { useFormValidation } from "@/lib/useFormValidation";
import { FormRules } from "@/lib/validator";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { autherization, loginService } from "@/service/user.service";

// ==================== CONFIG ====================

interface LoginFormData {
  tenDangNhap: string;
  matKhau: string;
}

const initialValues: LoginFormData = {
  tenDangNhap: "",
  matKhau: "",
};

const loginRules: FormRules = {
  tenDangNhap: {
    label: "Tên đăng nhập",
    rules: ["required", "email"],
  },
  matKhau: {
    label: "Mật khẩu",
    rules: ["required", "password"],
  },
};

// ==================== COMPONENT ====================

export default function LoginPage() {
  const router = useRouter();
  const { showError, showSuccess } = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    storage.clearToken()
  }, []);

  // Sử dụng custom hook - gom nhóm tất cả logic validate
  const form = useFormValidation<LoginFormData>({
    initialValues,
    rules: loginRules,
  });

  // Xử lý đăng nhập
  const handleSubmit = async () => {
    if (!form.validateAll()) {
      showError("Vui lòng kiểm tra lại thông tin đăng nhập!");
      return;
    }

    setLoading(true);
    try {
      const result = await loginService(form.values);
      if (result?.token) {
        // Save access token`
        storage.setToken(result.token);
        
        // Save refresh token
        if (result.refreshToken) {
          storage.setRefreshToken(result.refreshToken);
        }

        const userData = await autherization(result.token);
        if (userData) {
          storage.setUser({
            nguoiDungId: userData.nguoiDungId,
            first_name: userData.first_name,
            middle_name: userData.middle_name,
            last_name: userData.last_name,
            full_name: userData.full_name,
            gender: userData.gender,
            date_of_birthday: userData.date_of_birthday,
            avatar: userData.avatar,
            email: userData.email,
            phone: userData.phone,
            dongHoId: userData.dongHoId,
            roleId: userData.roleId,
            roleCode: userData.roleCode,
            online_flag: userData.online_flag,
            // Menu và permissions từ authorize response
            menus: userData.menus || [],
            permissions: userData.permissions || {},
            canSelectAllDongHo: userData.canSelectAllDongHo || false,
          });

          showSuccess("Đăng nhập thành công!");

          // Redirect dựa trên roleCode
          // Thủ Đô (TD) → Dashboard
          // Thành viên (TV) → Giữ nguyên URL hoặc về trang genealogy
          if (userData.roleCode === "thudo") {
            router.push("/dashboard");
          } else {
            // Thành viên: redirect về trang genealogy
            router.push("/genealogy");
          }
        } else {
          showSuccess("Đăng nhập thành công!");
          router.push("/dashboard");
        }
      } else {
        showError(result?.message || "Đăng nhập thất bại. Vui lòng thử lại.");
      }
    } catch (err: any) {
      showError(err.message || "Kết nối thất bại. Vui lòng kiểm tra kết nối mạng.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header với logo */}
      <div className="fixed top-2 left-0 right-0 z-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          <div className="relative -mt-20 hidden md:block">
            <Image src="/images/rong.png" alt="Logo trái" className="object-contain" priority width={300} height={300} />
          </div>
          <div className="relative mt-8 md:-mt-50 mx-auto md:mx-0">
            <Image src="/images/logo1.png" alt="Logo giữa" className="object-contain" priority width={350} height={350} sizes="(max-width: 768px) 250px, 350px" />
          </div>
          <div className="relative hidden md:block">
            <Image src="/images/rong2.png" alt="Logo phải" className="object-contain" priority width={300} height={300} />
          </div>
        </div>
      </div>

      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <Image src="/images/img_login.jpg" alt="Background" fill className="object-cover" priority />
      </div>

      {/* Form đăng nhập */}
      <div className="flex-1 flex items-center justify-center p-4 z-10 mt-32 md:mt-20">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm border border-white/20">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Đăng nhập</CardTitle>
            <CardDescription className="text-center">Vui lòng đăng nhập để tiếp tục</CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            {/* Tên đăng nhập */}
            <div className="grid gap-2">
              <label className="text-sm font-medium">Tên đăng nhập</label>
              <Input
                type="text"
                placeholder="Nhập email"
                className={`h-12 text-base bg-white/90 ${form.hasError("tenDangNhap") ? "border-red-500" : ""}`}
                {...form.getFieldProps("tenDangNhap")}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
              {form.getError("tenDangNhap") && (
                <p className="text-sm text-red-500">{form.getError("tenDangNhap")}</p>
              )}
            </div>

            {/* Mật khẩu */}
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Mật khẩu</label>
                <Link href="/forgotPass" className="text-sm text-blue-600 hover:underline">
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  maxLength={50}
                  className={`h-12 text-base bg-white/90 pr-12 ${form.hasError("matKhau") ? "border-red-500" : ""}`}
                  {...form.getFieldProps("matKhau")}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {form.getError("matKhau") && (
                <p className="text-sm text-red-500">{form.getError("matKhau")}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full h-12 text-base font-medium cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 bg-red-600"
              variant="destructive"
            >
              {loading ? "Đang xử lý..." : "Đăng nhập"}
            </Button>
            <p className="text-sm text-gray-600 text-center">
              Chưa có tài khoản?{" "}
              <Link href="/register" className="text-blue-600 hover:underline font-medium">
                Đăng ký ngay
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
