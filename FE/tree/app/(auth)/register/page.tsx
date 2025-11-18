"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/service/useToas";
import { validateEmail, validatePassword, validateName } from "@/lib/validator";
import { ChangeEvent, useCallback, useState } from "react";
import { sighInService } from "@/service/user.service";
import { useRouter } from "next/navigation";
// import { Route } from "lucide-react";

interface FormData {
  tenDangNhap: string;
  matKhau: string;
  nhapLaiMatKhau: string;
}

interface FormErrors {
  tenDangNhap?: string;
  matKhau?: string;
  nhapLaiMatKhau?: string;
}

export default function SignInPage() {
  const { showError, showSuccess, showInfo, showWarning } = useToast();
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    tenDangNhap: "",
    matKhau: "",
    nhapLaiMatKhau: "",
  });

  const route = useRouter();

  // function change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name as keyof FormData]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name as keyof FormErrors]: undefined }));
    }
  };

  // function submit
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    newErrors.tenDangNhap = validateEmail(formData.tenDangNhap) ?? undefined;
    newErrors.matKhau = validatePassword(formData.matKhau) ?? undefined;

    if(!formData.nhapLaiMatKhau) {
      newErrors.nhapLaiMatKhau = "Vui lòng nhập lại mật kháu!";
    }
    if(formData.matKhau && formData.nhapLaiMatKhau && formData.matKhau !== formData.nhapLaiMatKhau){
      newErrors.nhapLaiMatKhau = "Mật khẩu không khớp!";
    }
    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  }, [formData]);

  const handleButton = async () => {
    console.log("Form Data:", formData);
    if (!validateForm()) {
      showError("Vui lòng kiểm tra lại thông tin nhập!");
      return;
    }

    // Dữ liệu gửi đi chỉ bao gồm tenDangNhap và matKhau
    const dataToSend = {
      tenDangNhap: formData.tenDangNhap,
      matKhau: formData.matKhau,
    };
    console.log("Data to send:", dataToSend);
    try {
      const res = await sighInService(dataToSend);

      if (res.success) {
        showSuccess("Đăng ký thành công! Vui lòng đăng nhập.");
        setFormData({
          tenDangNhap: "",
          matKhau: "",
          nhapLaiMatKhau: "",
        });
        // window.location.href = "/login";
        route.push("/login");
        return;
      } else {
        showError(res.message || "Đăng ký thất bại!");
      }
    } catch (err: any) {
      showError("Kết nối thất bại. Vui lòng kiểm tra kết nối mạng.");
      console.error("SignIn error:", err);
    }
  };

  const renderErr = (key: keyof FormErrors) => {
    if (errors[key]) {
      // Dùng text-red-500 và margin top nhỏ
      return <p className="text-red-500 text-xs mt-1">{errors[key]}</p>;
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 3 hình ảnh trên cùng */}
      <div className="fixed top-2 left-0 right-0 z-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
          {/* Logo trái - ẩn trên mobile */}
          <div className="relative -mt-20 hidden md:block">
            <Image
              src="/images/rong.png"
              alt="Logo trái"
              className="object-contain"
              priority
              width={300}
              height={300}
            />
          </div>

          {/* Logo giữa - điều chỉnh cho responsive */}
          <div className="relative mt-8 md:-mt-50 mx-auto md:mx-0">
            <Image
              src="/images/logo1.png"
              alt="Logo giữa"
              className="object-contain"
              priority
              width={350}
              height={350}
              sizes="(max-width: 768px) 250px, 350px"
            />
          </div>

          {/* Logo phải - ẩn trên mobile */}
          <div className="relative hidden md:block">
            <Image
              src="/images/rong2.png"
              alt="Logo phải"
              className="object-contain"
              priority
              width={300}
              height={300}
            />
          </div>
        </div>
      </div>

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

      {/* Container chính - Form đăng nhập */}
      <div className="flex-1 flex items-center justify-center p-4 z-10 mt-32 md:mt-20">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-sm border border-white/20">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Đăng ký</CardTitle>
            <CardDescription className="text-center">
              Vui lòng đăng nhập để tiếp tục
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Tên đăng ký
              </label>
              <Input
                type="text"
                name="tenDangNhap"
                placeholder="Nhập tên đăng nhập"
                value={formData.tenDangNhap}
                className="h-12 text-base bg-white/90"
                onChange={handleChange}
                onKeyDown={(e) => e.key === "Enter" && handleButton()}
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Mật khẩu
              </label>
              <Input
                name="matKhau"
                value={formData.matKhau}
                onChange={handleChange}
                onKeyDown={(e) => e.key === "Enter" && handleButton()}
                type="password"
                placeholder="Nhập mật khẩu"
                className="h-12 text-base bg-white/90"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Nhập lại mật khẩu
              </label>
              <Input
                name="nhapLaiMatKhau"
                value={formData.nhapLaiMatKhau}
                onChange={handleChange}
                onKeyDown={(e) => e.key === "Enter" && handleButton()}
                type="password"
                placeholder="Nhập lại mật khẩu"
                className="h-12 text-base bg-white/90"
              />
              {renderErr("nhapLaiMatKhau")}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              className="w-full h-12 text-base font-medium cursor-pointe cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 bg-red-600"
              onClick={handleButton}
              variant="destructive"
            >
              Đăng ký
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
