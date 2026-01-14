"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useToast } from "@/service/useToas";
import { useFormValidation } from "@/lib/useFormValidation";
import { FormRules } from "@/lib/validator";
import { resetPasswordUser } from "@/service/user.service";

// ==================== CONFIG ====================

interface ForgotFormData {
  tenDangNhap: string;
}

const initialValues: ForgotFormData = {
  tenDangNhap: "",
};

const forgotRules: FormRules = {
  tenDangNhap: {
    label: "Email",
    rules: ["required", "email"],
  },
};

// ==================== COMPONENT ====================

const ForgotPassword = () => {
  const { showError, showSuccess } = useToast();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Sử dụng custom hook
  const form = useFormValidation<ForgotFormData>({
    initialValues,
    rules: forgotRules,
  });

  const handleSubmit = async () => {
    if (!form.validateAll()) {
      showError("Vui lòng nhập email hợp lệ!");
      return;
    }

    setIsLoading(true);
    try {
      // Backend expects "tenDangNhap" field (username or email)
      const response = await resetPasswordUser({
        tenDangNhap: form.values.tenDangNhap
      });

      if (response.success) {
        setMessage("✅ Email reset mật khẩu đã được gửi.");
        showSuccess("Vui lòng kiểm tra email.");
        form.reset();
      } else {
        showError(response.message || "Không thể gửi email reset mật khẩu.");
      }
    } catch (error: any) {
      showError(error.message || "Lỗi kết nối. Vui lòng thử lại sau.");
      console.error("reset:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative p-4">
      {/* Hình nền full màn hình */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/img_login.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Container chính - Form Quên Mật Khẩu */}
      <div className="flex-1 flex items-center justify-center p-4 z-10 mt-32 md:mt-20">
        <Card className="w-full max-w-md bg-black/30 backdrop-blur-sm border border-white/20 text-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">
              Quên Mật khẩu
            </CardTitle>
            <CardDescription className="text-center text-white/80">
              Vui lòng nhập email để nhận link đặt lại mật khẩu
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            {/* Hiển thị thông báo */}
            {message && (
              <p
                className={`text-sm text-center ${
                  message.startsWith("✅") ? "text-green-500" : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}

            <div className="grid gap-2">
              <label className="text-sm font-medium text-white/90">Email</label>
              <Input
                type="text"
                placeholder="Nhập email"
                className={`h-12 text-base bg-white/5 ${
                  form.hasError("tenDangNhap") ? "border-red-500" : ""
                }`}
                {...form.getFieldProps("tenDangNhap")}
                onKeyDown={(e) =>
                  e.key === "Enter" && !isLoading && handleSubmit()
                }
                disabled={isLoading}
              />
              {form.getError("tenDangNhap") && (
                <p className="text-sm text-red-500">
                  {form.getError("tenDangNhap")}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              onClick={handleSubmit}
              className="w-full h-12 text-base bg-red-600 hover:scale-105 active:scale-95 transition-transform duration-150"
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : "Gửi yêu cầu xác nhận"}
            </Button>
            <Link
              href="/login"
              className="text-sm text-blue-300 hover:underline font-medium"
            >
              Quay lại Đăng nhập
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
