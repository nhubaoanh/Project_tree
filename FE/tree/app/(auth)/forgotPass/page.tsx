"use client";
import { useCallback, useState } from "react";
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
import Link from "next/link"; // Giữ lại Link nếu bạn cần quay lại trang đăng nhập
import Image from "next/image";
import { useToast } from "@/service/useToas";
import { validateEmail } from "@/lib/validator";
import { resetPasswordUser } from "@/service/user.service";

interface FormData {
  tenDangNhap: string;
}

interface FormErrors { // Định nghĩa Type cho lỗi
    tenDangNhap?: string;
}
// Component Quên Mật Khẩu
const ForgotPassword = () => {
  const [formData, setFormData] = useState<FormData>({ tenDangNhap: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Thêm state loading
  const { showError, showSuccess } = useToast();

  const validateForgotPassword = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    const emailError = validateEmail(formData.tenDangNhap) ?? undefined;
    if (emailError) {
      newErrors.tenDangNhap = emailError;
    }

    setErrors(newErrors);

    // Trả về true nếu form hợp lệ
    return Object.keys(newErrors).length === 0;
  }, [formData]);


  const handleStep1 = async () => {

    setIsLoading(true);

    if (!validateForgotPassword()) {
      showError("Vui lòng nhập email hợp lệ!");
      setIsLoading(false);
      return;
    }

    try {
      const response = await resetPasswordUser(formData);
      const data = await response.json();
      setIsLoading(false);

      if (response.ok) {
        setMessage("✅ Email reset mật khẩu đã được gửi.");
        setFormData({ tenDangNhap: "" });
      } else {
        setMessage(`❌ Lỗi: ${data.message || "Không gửi được email."}`);
      }
    } catch (error) {
      setIsLoading(false);
      setMessage("❌ Lỗi kết nối. Vui lòng thử lại sau.");
    }
  };


  // Hàm thay đổi giá trị input và xóa lỗi tương ứng
  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      tenDangNhap: e.target.value,
    }));
    // Xóa lỗi khi người dùng bắt đầu gõ lại
    if (errors.tenDangNhap) {
      setErrors({});
    }
  };

  // Hàm renderCardContent đã được tối ưu hóa
  const renderCardContent = () => {
    return (
      <CardContent className="grid gap-4">
        {/* Hiển thị thông báo, thay đổi màu sắc dựa trên nội dung */}
        <p
          className={`text-sm text-center ${
            message.startsWith("✅") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>

        <div className="grid gap-2">
          <label className="text-sm font-medium text-white/90">
            Email hoặc Tên đăng nhập
          </label>
          <Input
            type="text"
            placeholder="Nhập email hoặc tên đăng nhập"
            value={formData.tenDangNhap}
            onChange={handleIdentifierChange}
            className="h-12 text-base bg-white/5"
            onKeyDown={(e) => e.key === "Enter" && !isLoading && handleStep1()}
            disabled={isLoading}
          />
        </div>
      </CardContent>
    );
  };

  // Hàm renderCardFooter đã được tối ưu hóa và sửa lỗi cú pháp gọi hàm
  const renderCardFooter = () => {
    return (
      <CardFooter className="flex flex-col space-y-4">
        <Button
          onClick={handleStep1} // Sửa lỗi: Gọi hàm không có dấu ()
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
    );
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
              Vui lòng nhập email hoặc tên đăng nhập
            </CardDescription>
          </CardHeader>
          {renderCardContent()}
          {renderCardFooter()}
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
