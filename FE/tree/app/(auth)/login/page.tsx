"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { loginService } from "@/src/service/user.service"
import { useState } from "react"
import { useRouter } from "next/navigation"
import storage from "@/src/utils/storage"

export default function LoginPage() {

  const [tenDangNhap, setTenDangNhap] = useState("");
  const [matKhau, setMatKhau] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleButton = async () => {
    try{
      setLoading(true);
      console.log(tenDangNhap, matKhau);
      const data = await loginService({
        tenDangNhap: tenDangNhap,
        matKhau: matKhau})
        console.log("Sending login request:", {
          user_name: tenDangNhap,
          password: matKhau,
        });

      
        if(data) {
          storage.setToken(data.token);
          alert("Đăng nhập thành công!");
          router.push("/dashbrach");
        }
    }catch(err){
      console.error("Login failed:", err);
    }
  }

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
                placeholder="Nhập tên đăng nhập" 
                className="h-12 text-base bg-white/90"
                value={tenDangNhap}
                onChange={(e) => setTenDangNhap(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Mật khẩu
                </label>
                <Link href="#" className="text-sm text-blue-600 hover:underline">
                  Quên mật khẩu?
                </Link>
              </div>
              <Input 
                type="password" 
                placeholder="Nhập mật khẩu" 
                className="h-12 text-base bg-white/90"
                value={matKhau}
                onChange={(e) => setMatKhau(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              disabled={loading}
              onClick = {handleButton}
              className="w-full h-12 text-base font-medium cursor-pointe cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-150 bg-red-600" variant="destructive">
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
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
  )
}