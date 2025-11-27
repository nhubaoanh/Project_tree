
"use client"

import { useState, useCallback } from "react" 
import { useRouter } from "next/navigation"
import storage from "@/utils/storage"
import { useToast } from "@/service/useToas" 
import { validateEmail, validatePassword } from "@/lib/validator"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { autherization, loginService } from "@/service/user.service"

interface FormData {
  tenDangNhap: string;
  matKhau: string;
}

interface FormErrors {
    tenDangNhap?: string;
    matKhau?: string;
}

export default function LoginPage() {
  const [formData, setFormData] = useState<FormData>({ tenDangNhap: "", matKhau: ""});
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showError, showSuccess } = useToast();

  // --- HÀM XỬ LÝ NHẬP LIỆU CHUNG ---
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name as keyof FormData]: value }));
    
    // Xóa lỗi ngay khi người dùng bắt đầu nhập
    if (errors[name as keyof FormErrors]) {
        setErrors(prev => ({ ...prev, [name as keyof FormErrors]: undefined }));
    }
  };

  // --- HÀM XÁC THỰC (VALIDATION) ---
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    
    // Kiểm tra tên đăng nhập (Giả sử tên đăng nhập phải là định dạng Email)
    newErrors.tenDangNhap = validateEmail(formData.tenDangNhap) ?? undefined; 
    
    // Kiểm tra mật khẩu (Sử dụng hàm mạnh hơn)
    newErrors.matKhau = validatePassword(formData.matKhau) ?? undefined;

    console.log("newErrors", newErrors);
    setErrors(newErrors);

    // Kiểm tra xem có lỗi nào không
    return Object.values(newErrors).every(error => !error);
  }, [formData]);

  // --- HÀM XỬ LÝ ĐĂNG NHẬP CHÍNH ---
  const handleButton = async () => {
    setLoading(true);
    if (!validateForm()) {
        setLoading(false);
        showError("Vui lòng kiểm tra lại định dạng thông tin đăng nhập!");
        return; 
    }
    try {
      const result = await loginService(formData); 

      if (result && result.token) {
        storage.setToken(result.token);
        showSuccess("Đăng nhập thành công!");

        const userData = await autherization(result.token);

        if(userData) {
          storage.setUser({
            nguoiDungId: userData.nguoiDungId,
            hoTen: userData.hoTen,
            email: userData.email,
            dongHoId: userData.dongHoId,
            roleId: userData.roleId,
            roleCode: userData.roleCode,
            functions: userData.functions, // Cây menu
            actions: userData.actions,
          });
        }
        showSuccess("Đăng nhập thanh cong!");
        router.push("/dashbrach");
      } else {
        showError(result.message || "Đăng nhập thất bại. Vui lòng thử lại.");
      }

    } catch(err: any) {
      showError("Kết nối thất bại. Vui lòng kiểm tra kết nối mạng.");
    } finally {
      setLoading(false);
    }
  }

  // --- JSX (GIAO DIỆN) ---
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
             <CardTitle className="text-2xl text-center">Đăng nhập</CardTitle>
             <CardDescription className="text-center">
               Vui lòng đăng nhập để tiếp tục
             </CardDescription>
           </CardHeader>
           <CardContent className="grid gap-4">
             <div className="grid gap-2">
               <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                 Tên đăng nhập
               </label>
               <Input
                 type="text"
                 name="tenDangNhap"
                 placeholder="Nhập tên đăng nhập"
                 className="h-12 text-base bg-white/90"
                 value={formData.tenDangNhap}
                 onChange={handleChange}
                 onKeyDown={(e) => e.key === "Enter" && handleButton()}
               />
             </div>
             <div className="grid gap-2">
               <div className="flex items-center justify-between">
                 <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                   Mật khẩu
                 </label>
                 <Link
                   href="/forgotPass"
                   className="text-sm text-blue-600 hover:underline"
                 >
                   Quên mật khẩu?
                 </Link>
               </div>
               <Input
                 type="password"
                 name="matKhau"
                 placeholder="Nhập mật khẩu"
                 className="h-12 text-base bg-white/90"
                 value={formData.matKhau}
                 onChange={handleChange}
                 onKeyDown={(e) => e.key === "Enter" && handleButton()}
               />
             </div>
           </CardContent>
           <CardFooter className="flex flex-col space-y-4">
             <Button
               onClick={handleButton}
               className="w-full h-12 text-base font-medium cursor-pointe cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 bg-red-600"
               variant="destructive"
             >
               Đăng nhập
             </Button>
             <p className="text-sm text-gray-600 text-center">
               Chưa có tài khoản?{" "}
               <Link
                 href="/register"
                 className="text-blue-600 hover:underline font-medium"
               >
                 Đăng ký ngay
               </Link>
             </p>
           </CardFooter>
         </Card>
       </div>
     </div>
   );
}
