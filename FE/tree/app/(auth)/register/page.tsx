"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/service/useToas";
import { useFormValidation } from "@/lib/useFormValidation";
import { FormRules } from "@/lib/validator";
import { sighInService, checkUsernameExist } from "@/service/user.service";

// ==================== CONFIG ====================

interface RegisterFormData {
  tenDangNhap: string;
  matKhau: string;
  nhapLaiMatKhau: string;
  tenDongHo: string;
  queQuanGoc: string;
  ngayThanhLap: string;
}

const initialValues: RegisterFormData = {
  tenDangNhap: "",
  matKhau: "",
  nhapLaiMatKhau: "",
  tenDongHo: "",
  queQuanGoc: "",
  ngayThanhLap: "",
};

const registerRules: FormRules = {
  tenDangNhap: {
    label: "Email",
    rules: ["required", "email"],
  },
  matKhau: {
    label: "Mật khẩu",
    rules: ["required", "password"],
  },
  nhapLaiMatKhau: {
    label: "Nhập lại mật khẩu",
    rules: ["required", { match: "matKhau" }],
  },
  tenDongHo: {
    label: "Tên dòng họ",
    rules: ["required", { min: 2 }, { max: 100 }, "noNumber"],
  },
  queQuanGoc: {
    label: "Quê quán gốc",
    rules: [{ max: 200 }],
  },
  ngayThanhLap: {
    label: "Ngày thành lập",
    rules: ["date"],
  },
};

// ==================== COMPONENT ====================

export default function RegisterPage() {
  const router = useRouter();
  const { showError, showSuccess } = useToast();
  const [loading, setLoading] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const checkEmailTimeout = useRef<NodeJS.Timeout | null>(null);

  // Sử dụng custom hook
  const form = useFormValidation<RegisterFormData>({
    initialValues,
    rules: registerRules,
  });

  // Check email tồn tại với debounce
  const checkEmailExists = useCallback(async (email: string) => {
    if (!email || email.length < 3) {
      setEmailExists(false);
      return;
    }

    // Validate email format trước
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailExists(false);
      return;
    }

    setCheckingEmail(true);
    try {
      const result = await checkUsernameExist(email);
      if (result.exists) {
        setEmailExists(true);
        form.setError("tenDangNhap", "Email này đã được đăng ký");
      } else {
        setEmailExists(false);
        // Xóa lỗi nếu email chưa tồn tại
        if (form.errors.tenDangNhap === "Email này đã được đăng ký") {
          form.setError("tenDangNhap", null);
        }
      }
    } catch (error) {
      console.error("Error checking email:", error);
    } finally {
      setCheckingEmail(false);
    }
  }, [form]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    form.handleChange(e);
    
    // Clear timeout cũ
    if (checkEmailTimeout.current) {
      clearTimeout(checkEmailTimeout.current);
    }
    
    // Set timeout mới (debounce 500ms)
    checkEmailTimeout.current = setTimeout(() => {
      checkEmailExists(email);
    }, 500);
  };

  const handleSubmit = async () => {
    // Kiểm tra email đã tồn tại
    if (emailExists) {
      showError("Email này đã được đăng ký. Vui lòng sử dụng email khác!");
      return;
    }

    if (!form.validateAll()) {
      showError("Vui lòng kiểm tra lại thông tin!");
      return;
    }

    setLoading(true);
    try {
      const dataToSend = {
        tenDangNhap: form.values.tenDangNhap,
        matKhau: form.values.matKhau,
        tenDongHo: form.values.tenDongHo,
        queQuanGoc: form.values.queQuanGoc,
        ngayThanhLap: form.values.ngayThanhLap,
      };

      console.log("📤 [Frontend] Sending data:", dataToSend);
      const res = await sighInService(dataToSend);
      console.log("📥 [Frontend] Response:", res);

      if (res.success) {
        showSuccess("Đăng ký thành công! Vui lòng đăng nhập.");
        form.reset();
        router.push("/login");
      } else {
        showError(res.message || "Đăng ký thất bại!");
      }
    } catch (err: any) {
      // Xử lý lỗi từ backend
      if (err.message.includes("đã tồn tại")) {
        showError("Email này đã được đăng ký. Vui lòng sử dụng email khác!");
        setEmailExists(true);
        form.setError("tenDangNhap", "Email này đã được đăng ký");
      } else {
        showError(err.message || "Kết nối thất bại. Vui lòng kiểm tra kết nối mạng.");
      }
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

      {/* Form đăng ký */}
      <div className="flex-1 flex items-center justify-center p-4 z-10 mt-32 md:mt-20">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm border border-white/20">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Đăng ký</CardTitle>
            <CardDescription className="text-center">Tạo tài khoản mới</CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            {/* Email */}
            <div className="grid gap-2">
              <label className="text-sm font-medium">Email</label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Nhập email"
                  className={`h-12 text-base bg-white/90 ${
                    form.hasError("tenDangNhap") || emailExists ? "border-red-500" : ""
                  } ${checkingEmail ? "pr-10" : ""}`}
                  name="tenDangNhap"
                  value={form.values.tenDangNhap}
                  onChange={handleEmailChange}
                  onBlur={form.handleBlur}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
                {checkingEmail && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <div className="animate-spin h-5 w-5 border-2 border-gray-300 border-t-blue-600 rounded-full"></div>
                  </div>
                )}
              </div>
              {form.getError("tenDangNhap") && (
                <p className="text-sm text-red-500">{form.getError("tenDangNhap")}</p>
              )}
              {emailExists && !form.getError("tenDangNhap") && (
                <p className="text-sm text-red-500">Email này đã được đăng ký</p>
              )}
            </div>

            {/* Mật khẩu */}
            <div className="grid gap-2">
              <label className="text-sm font-medium">Mật khẩu</label>
              <Input
                type="password"
                placeholder="Nhập mật khẩu"
                className={`h-12 text-base bg-white/90 ${form.hasError("matKhau") ? "border-red-500" : ""}`}
                {...form.getFieldProps("matKhau")}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
              {form.getError("matKhau") && (
                <p className="text-sm text-red-500">{form.getError("matKhau")}</p>
              )}
            </div>

            {/* Nhập lại mật khẩu */}
            <div className="grid gap-2">
              <label className="text-sm font-medium">Nhập lại mật khẩu</label>
              <Input
                type="password"
                placeholder="Nhập lại mật khẩu"
                className={`h-12 text-base bg-white/90 ${form.hasError("nhapLaiMatKhau") ? "border-red-500" : ""}`}
                {...form.getFieldProps("nhapLaiMatKhau")}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
              {form.getError("nhapLaiMatKhau") && (
                <p className="text-sm text-red-500">{form.getError("nhapLaiMatKhau")}</p>
              )}
            </div>

            {/* Tên dòng họ */}
            <div className="grid gap-2">
              <label className="text-sm font-medium">
                Tên dòng họ <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                placeholder="VD: Dòng họ Nguyễn"
                className={`h-12 text-base bg-white/90 ${form.hasError("tenDongHo") ? "border-red-500" : ""}`}
                name="tenDongHo"
                value={form.values.tenDongHo}
                onChange={(e) => {
                  const value = e.target.value.replace(/\d/g, "");
                  form.setValue("tenDongHo", value);
                }}
                onBlur={form.handleBlur}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
              {form.getError("tenDongHo") && (
                <p className="text-sm text-red-500">{form.getError("tenDongHo")}</p>
              )}
            </div>

            {/* Quê quán gốc */}
            <div className="grid gap-2">
              <label className="text-sm font-medium">Quê quán gốc</label>
              <Input
                type="text"
                placeholder="VD: Hải Dương"
                className={`h-12 text-base bg-white/90 ${form.hasError("queQuanGoc") ? "border-red-500" : ""}`}
                {...form.getFieldProps("queQuanGoc")}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
              {form.getError("queQuanGoc") && (
                <p className="text-sm text-red-500">{form.getError("queQuanGoc")}</p>
              )}
            </div>

            {/* Ngày thành lập */}
            <div className="grid gap-2">
              <label className="text-sm font-medium">Ngày thành lập</label>
              <Input
                type="date"
                className={`h-12 text-base bg-white/90 ${form.hasError("ngayThanhLap") ? "border-red-500" : ""}`}
                {...form.getFieldProps("ngayThanhLap")}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              />
              {form.getError("ngayThanhLap") && (
                <p className="text-sm text-red-500">{form.getError("ngayThanhLap")}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              onClick={handleSubmit}
              disabled={loading || checkingEmail || emailExists}
              className="w-full h-12 text-base font-medium cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 bg-red-600"
              variant="destructive"
            >
              {loading ? "Đang xử lý..." : checkingEmail ? "Đang kiểm tra..." : "Đăng ký"}
            </Button>
            <p className="text-sm text-gray-600 text-center">
              Đã có tài khoản?{" "}
              <Link href="/login" className="text-blue-600 hover:underline font-medium">
                Đăng nhập
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
