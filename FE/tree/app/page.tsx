"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Users,
  BookOpen,
  Lock,
  ChevronRight,
  Scroll,
  Feather,
  Heart,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <Users className="w-10 h-10 text-[#b91c1c]" />,
      title: "Gia Phả Vạn Đại",
      description:
        "Xây dựng cây gia phả trực quan, kết nối các thế hệ từ Cao Tổ đến con cháu mai sau.",
    },
    {
      icon: <Scroll className="w-10 h-10 text-[#b91c1c]" />,
      title: "Phả Ký Lưu Truyền",
      description:
        "Lưu giữ tiểu sử, bút tích và những câu chuyện hào hùng của cha ông làm bài học cho con cháu.",
    },
    {
      icon: <Heart className="w-10 h-10 text-[#b91c1c]" />,
      title: "Hương Hỏa Phụng Thờ",
      description:
        "Nhắc nhở ngày giỗ chạp, sự kiện dòng họ để con cháu dù ở xa vẫn hướng về cội nguồn.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fdf6e3] font-italianno  text-[#4a4a4a] relative selection:bg-[#b91c1c] selection:text-white">
      {/* Họa tiết nền chìm */}
      <div
        className="fixed inset-0 pointer-events-none opacity-10 z-0"
        style={{
          backgroundImage:
            'url("https://www.transparenttextures.com/patterns/aged-paper.png")',
        }}
      ></div>

      {/* Fixed Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-[#fdf6e3]/95 backdrop-blur-md shadow-md border-b border-[#d4af37] py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 border-2 border-[#b91c1c] rounded-full flex items-center justify-center bg-[#b91c1c] text-white font-bold text-xl shadow-lg group-hover:scale-110 transition-transform">
                GP
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-2xl font-bold uppercase tracking-wide transition-colors ${
                    isScrolled ? "text-[#b91c1c]" : "text-white drop-shadow-md"
                  }`}
                >
                  Gia Phả Số
                </span>
                <span
                  className={`text-xs italic font-light ${
                    isScrolled ? "text-[#8b5e3c]" : "text-yellow-200"
                  }`}
                >
                  Giữ gìn muôn đời
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {["Trang chủ", "Giới thiệu", "Tính năng"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className={`font-medium text-lg transition-colors hover:text-[#ffcd05] relative group ${
                    isScrolled ? "text-[#5d4037]" : "text-white"
                  }`}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#b91c1c] transition-all group-hover:w-full"></span>
                </Link>
              ))}
              <Link
                href="/login"
                className={`px-6 py-2 rounded-full font-bold border transition-all ${
                  isScrolled
                    ? "border-[#b91c1c] text-[#b91c1c] hover:bg-[#b91c1c] hover:text-white"
                    : "border-white text-white hover:bg-white hover:text-[#b91c1c]"
                }`}
              >
                Đăng nhập
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/trongdong.png"
              alt="Văn hóa Việt"
              fill
              className="object-cover animate-slow-zoom"
              quality={90}
              priority
            />
            {/* Lớp phủ gradient màu trầm mặc */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#fdf6e3]"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 container mx-auto px-6 text-center mt-10">
            <div className="mb-6 inline-block animate-fade-in-down">
              <div className="flex items-center justify-center gap-4 text-yellow-400/90 text-lg md:text-2xl font-display italic border-y border-yellow-400/50 py-2">
                <span>Cây có cội mới nở cành xanh ngọn</span>
              </div>
              <div className="flex items-center justify-center gap-4 text-yellow-400/90 text-lg md:text-2xl font-display italic border-b border-yellow-400/50 py-2 mt-1">
                <span>Nước có nguồn mới bể rộng sông sâu</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] font-display tracking-wide uppercase">
              Hồn Thiêng <br /> <span className="text-[#ffcd05]">Dòng Tộc</span>
            </h1>

            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Nơi lưu giữ những giá trị thiêng liêng nhất của gia đình. Kết nối
              quá khứ, hiện tại và tương lai trong một không gian số đậm đà bản
              sắc.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                className="bg-[#b91c1c] hover:bg-[#991b1b] text-white text-lg px-8 py-6 rounded-none border-2 border-[#b91c1c] hover:border-[#d4af37] shadow-[0_0_15px_rgba(185,28,28,0.5)] transition-all duration-300"
                asChild
              >
                <Link href="/register" className="flex items-center gap-2">
                  <Feather className="w-5 h-5" />
                  Tạo Gia Phả Ngay
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#b91c1c] text-lg px-8 py-6 rounded-none"
                asChild
              >
                <Link href="#features">Tìm hiểu thêm</Link>
              </Button>
            </div>
          </div>

          {/* Họa tiết mây chân trang */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#fdf6e3] to-transparent z-10"></div>
        </section>

        {/* Philosophy Section (Triết lý) */}
        <section className="py-20 relative">
          <div className="container mx-auto px-6 text-center">
            <div className="w-24 h-1 bg-[#b91c1c] mx-auto mb-8"></div>
            <h2 className="text-3xl md:text-5xl font-bold text-[#5d4037] mb-6 font-display">
              Tinh Hoa Tộc Việt
            </h2>
            <p className="text-xl text-[#8b5e3c] max-w-3xl mx-auto italic leading-loose">
              "Người ta có cố thì mới có ông cha, như cây có cội, như sông có
              nguồn." <br />
              Gia phả không chỉ là danh sách những cái tên, mà là dòng chảy lịch
              sử, là mạch máu thiêng liêng nối liền huyết thống. Chúng tôi tạo
              ra công cụ này để mỗi người con đất Việt đều có thể tự hào kể lại
              câu chuyện của dòng họ mình.
            </p>
            <div className="mt-10 flex justify-center">
              <img
                src="https://cdn.balkan.app/shared/f1.png"
                alt="Họa tiết"
                className="w-48 opacity-60"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-20 bg-[#f5ebe0] relative overflow-hidden"
        >
          {/* Họa tiết trang trí góc */}
          <div className="absolute top-0 left-0 w-64 h-64 border-t-4 border-l-4 border-[#d4af37]/20 rounded-tl-[100px]"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 border-b-4 border-r-4 border-[#d4af37]/20 rounded-br-[100px]"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#b91c1c] mb-4 font-display uppercase">
                Công Năng Vượt Trội
              </h2>
              <p className="text-lg text-stone-600">
                Kết hợp công nghệ hiện đại với tư duy truyền thống
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative p-8 bg-[#fdf6e3] border border-[#d4af37] hover:border-[#b91c1c] transition-all duration-500 shadow-[8px_8px_0px_rgba(212,175,55,0.2)] hover:shadow-[8px_8px_0px_rgba(185,28,28,0.2)] hover:-translate-y-2"
                >
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#fdf6e3] p-3 border border-[#d4af37] rounded-full group-hover:border-[#b91c1c] transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-center text-[#5d4037] mt-6 mb-4 font-display group-hover:text-[#b91c1c] transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-stone-600 text-center leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Góc trang trí */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#d4af37] group-hover:border-[#b91c1c]"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#d4af37] group-hover:border-[#b91c1c]"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#d4af37] group-hover:border-[#b91c1c]"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#d4af37] group-hover:border-[#b91c1c]"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Scroll Banner Section */}
        <section className="py-24 relative bg-[#5d4037] text-[#fdf6e3] overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
          <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-4xl font-bold font-display mb-6 text-[#ffcd05]">
                Cuốn Thư Số Hóa
              </h2>
              <p className="text-lg leading-loose opacity-90 mb-8">
                Không còn lo ngại mối mọt hay thất lạc. Gia phả của dòng họ được
                lưu trữ vĩnh viễn trên nền tảng đám mây an toàn, bảo mật, dễ
                dàng chia sẻ cho con cháu khắp năm châu.
              </p>
              <Button className="bg-[#fdf6e3] text-[#5d4037] hover:bg-[#ffcd05] hover:text-[#b91c1c] font-bold px-8 py-4 h-auto text-lg">
                Khám Phá Ngay
              </Button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              {/* Minh họa cuốn thư cách điệu */}
              <div className="relative w-80 h-96 border-8 border-[#ffcd05] p-4 bg-[#fdf6e3] text-[#4a4a4a] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="border-2 border-[#b91c1c] h-full p-4 flex flex-col items-center justify-center text-center">
                  <div className="text-6xl font-display text-[#b91c1c] mb-4">
                    福
                  </div>
                  <h3 className="text-2xl font-bold uppercase mb-2">
                    Gia Tộc <br /> Nhữ Văn
                  </h3>
                  <div className="w-16 h-0.5 bg-[#b91c1c] my-4"></div>
                  <p className="italic text-sm">"Phúc ấm ngàn đời"</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#2c1810] text-[#eaddcf] border-t-4 border-[#d4af37] pt-16 pb-8">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              <div className="text-center md:text-left">
                <div className="text-3xl font-bold text-[#ffcd05] mb-6 font-display uppercase">
                  Gia Phả Số
                </div>
                <p className="text-sm opacity-70 leading-relaxed">
                  Nền tảng công nghệ gìn giữ văn hóa gia đình Việt. <br />
                  Kết nối cội nguồn - Vững bước tương lai.
                </p>
              </div>

              <div className="text-center">
                <h4 className="text-lg font-bold text-[#d4af37] mb-6 uppercase tracking-widest">
                  Liên Kết
                </h4>
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="#"
                      className="hover:text-[#ffcd05] transition-colors"
                    >
                      Về chúng tôi
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-[#ffcd05] transition-colors"
                    >
                      Hướng dẫn sử dụng
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-[#ffcd05] transition-colors"
                    >
                      Điều khoản bảo mật
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="text-center md:text-right">
                <h4 className="text-lg font-bold text-[#d4af37] mb-6 uppercase tracking-widest">
                  Liên Hệ
                </h4>
                <p className="text-sm opacity-70 mb-2">
                  Email: lienhe@giaphaso.vn
                </p>
                <p className="text-sm opacity-70">Hotline: 1900 1000</p>
                <div className="flex justify-center md:justify-end gap-4 mt-6">
                  {/* Social Icons placeholders */}
                  <div className="w-10 h-10 rounded-full bg-[#3d2b24] flex items-center justify-center hover:bg-[#b91c1c] transition-colors cursor-pointer">
                    <Users size={18} />
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#3d2b24] flex items-center justify-center hover:bg-[#b91c1c] transition-colors cursor-pointer">
                    <Heart size={18} />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-[#8b5e3c] pt-8 text-center text-xs opacity-50 flex flex-col items-center">
              <p>
                © {new Date().getFullYear()} Gia Phả Số. Bản quyền thuộc về cội
                nguồn dân tộc.
              </p>
              <div className="mt-4 w-24 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
