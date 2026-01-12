"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/service/useToas";
import { useFormValidation } from "@/lib/useFormValidation";
import { FormRules } from "@/lib/validator";
import { sighInService } from "@/service/user.service";

// ==================== CONFIG ====================

interface RegisterFormData {
  tenDangNhap: string;
  matKhau: string;
  nhapLaiMatKhau: string;
}

const initialValues: RegisterFormData = {
  tenDangNhap: "",
  matKhau: "",
  nhapLaiMatKhau: "",
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
};

// ==================== COMPONENT ====================

export default function RegisterPage() {
  const router = useRouter();
  const { showError, showSuccess } = useToast();
  const [loading, setLoading] = useState(false);

  // Sử dụng custom hook
  const form = useFormValidation<RegisterFormData>({
    initialValues,
    rules: registerRules,
  });

  const handleSubmit = async () => {
    if (!form.validateAll()) {
      showError("Vui lòng kiểm tra lại thông tin!");
      return;
    }

    setLoading(true);
    try {
      const dataToSend = {
        tenDangNhap: form.values.tenDangNhap,
        matKhau: form.values.matKhau,
      };

      const res = await sighInService(dataToSend);

      if (res.success) {
        showSuccess("Đăng ký thành công! Vui lòng đăng nhập.");
        form.reset();
        router.push("/login");
      } else {
        showError(res.message || "Đăng ký thất bại!");
      }
    } catch (err: any) {
      showError("Kết nối thất bại. Vui lòng kiểm tra kết nối mạng.");
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
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full h-12 text-base font-medium cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 bg-red-600"
              variant="destructive"
            >
              {loading ? "Đang xử lý..." : "Đăng ký"}
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
