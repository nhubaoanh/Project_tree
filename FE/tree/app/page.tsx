"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Users,
  Crown,
  Check,
  ChevronRight,
  Star,
  Shield,
  Clock,
  Calendar,
  Share2,
  Database,
  Zap,
  Smartphone,
  Globe,
  Heart,
  Award,
  MessageCircle,
  Gift,
  Sparkles,
  ArrowRight,
  PlayCircle,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { useState, useEffect } from "react";

// Constants
const NAVIGATION_ITEMS = [
  { id: "home", label: "Trang chủ" },
  { id: "features", label: "Tính năng" },
  { id: "pricing", label: "Bảng giá" },
  { id: "testimonials", label: "Đánh giá" },
];

const STATS = [
  { number: "10K+", label: "Gia đình", icon: Users, color: "from-blue-500 to-blue-600" },
  { number: "500K+", label: "Thành viên", icon: Database, color: "from-green-500 to-green-600" },
  { number: "99.9%", label: "Uptime", icon: Zap, color: "from-yellow-500 to-orange-500" },
  { number: "24/7", label: "Hỗ trợ", icon: Clock, color: "from-purple-500 to-purple-600" },
];

const FEATURES = [
  {
    icon: Users,
    title: "Cây Gia Phả Trực Quan",
    description:
      "Xây dựng cây gia phả với giao diện đồ họa sinh động, kết nối mọi thế hệ dễ dàng.",
  },
  {
    icon: Calendar,
    title: "Lịch Nhắc Nhở Thông Minh",
    description:
      "Tự động nhắc nhở ngày giỗ, sinh nhật, sự kiện quan trọng qua nhiều kênh.",
  },
  {
    icon: Shield,
    title: "Bảo Mật Cấp Ngân Hàng",
    description:
      "Mã hóa 256-bit, xác thực 2 lớp, sao lưu tự động đảm bảo an toàn tuyệt đối.",
  },
  {
    icon: Share2,
    title: "Chia Sẻ & Cộng Tác",
    description:
      "Chia sẻ thông tin với họ hàng khắp nơi, quản lý quyền truy cập chi tiết.",
  },
  {
    icon: Smartphone,
    title: "Đa Nền Tảng",
    description:
      "Truy cập mượt mà từ mọi thiết bị với đồng bộ realtime và offline mode.",
  },
  {
    icon: Globe,
    title: "Đa Ngôn Ngữ",
    description:
      "Hỗ trợ Tiếng Việt, English, 中文 để kết nối con cháu toàn cầu.",
  },
];

const PRICING_PLANS = [
  {
    name: "Cơ Bản",
    subtitle: "Cho gia đình nhỏ",
    price: "0đ",
    period: "Miễn phí mãi mãi",
    features: [
      "Tối đa 50 thành viên",
      "500MB lưu trữ đám mây",
      "Cây gia phả cơ bản",
      "Nhắc nhở ngày giỗ, sinh nhật",
      "Truy cập mobile app",
      "Hỗ trợ email",
    ],
    notIncluded: [
      "Sao lưu tự động hàng tuần",
      "Xuất báo cáo PDF/Excel",
      "Hỗ trợ ưu tiên 24/7",
    ],
    popular: false,
    cta: "Bắt đầu miễn phí",
  },
  {
    name: "Cao Cấp",
    subtitle: "Được yêu thích nhất",
    price: "299.000đ",
    period: "/ năm",
    saveAmount: "Tiết kiệm 40%",
    features: [
      "Không giới hạn thành viên",
      "10GB lưu trữ đám mây",
      "Cây gia phả nâng cao + AI",
      "Lịch thông minh đa kênh",
      "Truy cập mọi thiết bị",
      "Sao lưu tự động hàng ngày",
      "Xuất báo cáo chuyên nghiệp",
      "Hỗ trợ ưu tiên 24/7",
      "Theme tùy chỉnh",
    ],
    notIncluded: [],
    popular: true,
    cta: "Nâng cấp ngay",
  },
  {
    name: "Dòng Họ",
    subtitle: "Cho tổ chức lớn",
    price: "Liên hệ",
    period: "Tùy chỉnh",
    features: [
      "Không giới hạn mọi thứ",
      "Lưu trữ không giới hạn",
      "Quản lý đa chi nhánh",
      "Tích hợp CRM & API",
      "Đào tạo & onboarding",
      "Thiết kế giao diện riêng",
      "Tên miền tùy chỉnh",
      "Quản lý viên chuyên trách",
      "SLA 99.99%",
    ],
    notIncluded: [],
    popular: false,
    cta: "Liên hệ tư vấn",
  },
];

const TESTIMONIALS = [
  {
    name: "Ông Nguyễn Văn Minh",
    role: "Trưởng họ Nguyễn",
    location: "Hà Nội",
    avatar: "👴",
    content:
      "Nhờ Gia Phả Số mà dòng họ chúng tôi với hơn 800 thành viên đã kết nối được con cháu ở khắp năm châu. Các cháu ở Mỹ, Úc, Pháp giờ vẫn biết về nguồn cội.",
    highlight: "800+ thành viên toàn cầu",
  },
  {
    name: "Bà Trần Thị Hoa",
    role: "Quản lý họ Trần",
    location: "TP. Hồ Chí Minh",
    avatar: "👵",
    content:
      "Công cụ rất dễ sử dụng, tôi 68 tuổi vẫn tự quản lý được gia phả 300 người không cần hỏi con cháu. Đội ngũ hỗ trợ nhiệt tình 24/7.",
    highlight: "Dễ dùng cho mọi lứa tuổi",
  },
  {
    name: "Anh Lê Hoàng Nam",
    role: "IT Manager",
    location: "Đà Nẵng",
    avatar: "👨‍💼",
    content:
      "Là người làm IT, tôi đánh giá cao về kỹ thuật và bảo mật. Giao diện đẹp, UX tốt. Tôi đã giới thiệu cho 5 dòng họ khác.",
    highlight: "Công nghệ hiện đại",
  },
];

const FAQ_ITEMS = [
  {
    q: "Tôi có thể dùng thử miễn phí không?",
    a: "Có! Gói Cơ Bản miễn phí mãi mãi. Gói Cao Cấp có 30 ngày dùng thử, không cần thẻ tín dụng.",
  },
  {
    q: "Dữ liệu của tôi có an toàn không?",
    a: "Tuyệt đối! Chúng tôi sử dụng mã hóa 256-bit, xác thực 2 lớp, sao lưu tự động hàng ngày.",
  },
  {
    q: "Tôi có thể hủy gói bất cứ lúc nào không?",
    a: "Có, bạn có thể nâng cấp, hạ cấp hoặc hủy bất cứ lúc nào. Hoàn tiền 100% trong 30 ngày.",
  },
  {
    q: "Có hỗ trợ tiếng Việt không?",
    a: "Có! Toàn bộ giao diện, tài liệu và đội ngũ hỗ trợ đều bằng tiếng Việt.",
  },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const item of NAVIGATION_ITEMS) {
        const element = document.getElementById(item.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F2EBC6] via-[#F5F0D0] to-[#F8F4D8]">
      {/* Header */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b border-[#A20105]/20 shadow-lg"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(242, 235, 198, 0.95) 0%, rgba(248, 244, 216, 0.9) 100%),
            url('/images/giapha.jpg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#A20105] to-[#8B0104] rounded-2xl flex items-center justify-center text-[#F2EBC6] font-bold shadow-lg">
                <span className="text-xl">GP</span>
              </div>
              <div>
                <div className="text-xl font-bold text-[#A20105]">
                  Gia Phả Số
                </div>
                <div className="text-xs text-gray-600">Kết nối dòng tộc</div>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              {NAVIGATION_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-medium transition-all relative ${
                    activeSection === item.id
                      ? "text-[#A20105]"
                      : "text-gray-600 hover:text-[#A20105]"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#A20105] rounded-full"></span>
                  )}
                </button>
              ))}
              <Link
                href="/login"
                className="px-6 py-2.5 bg-gradient-to-r from-[#A20105] to-[#8B0104] text-[#F2EBC6] rounded-xl font-medium hover:shadow-xl hover:scale-105 transition-all"
              >
                Đăng nhập
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(242, 235, 198, 0.85) 0%, rgba(248, 244, 216, 0.75) 50%, rgba(255, 255, 255, 0.8) 100%),
            url('/images/giapha.jpg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#A20105]/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#A20105]/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          
          {/* Floating particles */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#A20105]/20 rounded-full animate-float-particle"></div>
            <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-[#A20105]/15 rounded-full animate-float-particle-delayed"></div>
            <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-[#A20105]/25 rounded-full animate-float-particle-slow"></div>
            <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-[#A20105]/20 rounded-full animate-float-particle"></div>
            <div className="absolute top-2/3 left-2/3 w-3 h-3 bg-[#A20105]/15 rounded-full animate-float-particle-delayed"></div>
          </div>
        </div>

        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-56 md:w-80 animate-float">
          <img
            src="/images/phuong.png"
            alt="Phượng"
            className="w-full h-auto drop-shadow-2xl"
          />
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-56 md:w-80 animate-float-delayed">
          <img src="/images/rong2.png" alt="Rồng" className="w-full h-auto drop-shadow-2xl" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="text-[#A20105] drop-shadow-lg">Lưu Giữ Dòng Họ</span>
            <br />
            <span className="text-[#A20105] drop-shadow-lg">Vạn Đại Trường Tồn</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto drop-shadow-sm">
            Số hóa gia phả, kết nối thế hệ, gìn giữ truyền thống.
            <br />
            <strong className="text-[#A20105]">Hơn 10,000 gia đình</strong> đã
            chọn chúng tôi
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#A20105] to-[#8B0104] hover:from-[#8B0104] hover:to-[#A20105] text-[#F2EBC6] px-10 py-7 text-lg rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all"
              asChild
            >
              <Link href="/register">
                <Sparkles className="w-5 h-5 mr-2" />
                Tạo gia phả miễn phí
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-[#A20105] text-[#A20105] hover:bg-[#A20105]/10 px-10 py-7 text-lg rounded-2xl backdrop-blur-sm bg-white/80"
              onClick={() => scrollToSection("features")}
            >
              <PlayCircle className="w-5 h-5 mr-2" />
              Xem Demo
            </Button>
          </div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-20px) translateX(10px); }
          }
          @keyframes float-delayed {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-15px) translateX(-10px); }
          }
          @keyframes float-particle {
            0%, 100% { transform: translateY(0px) scale(1); opacity: 0.3; }
            50% { transform: translateY(-30px) scale(1.2); opacity: 0.7; }
          }
          @keyframes float-particle-delayed {
            0%, 100% { transform: translateY(0px) scale(1); opacity: 0.2; }
            50% { transform: translateY(-25px) scale(1.1); opacity: 0.6; }
          }
          @keyframes float-particle-slow {
            0%, 100% { transform: translateY(0px) scale(1); opacity: 0.4; }
            50% { transform: translateY(-20px) scale(1.3); opacity: 0.8; }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: float-delayed 6s ease-in-out infinite 1s;
          }
          .animate-float-particle {
            animation: float-particle 8s ease-in-out infinite;
          }
          .animate-float-particle-delayed {
            animation: float-particle-delayed 10s ease-in-out infinite 2s;
          }
          .animate-float-particle-slow {
            animation: float-particle-slow 12s ease-in-out infinite 4s;
          }
        `}</style>
      </section>

      {/* Features Section */}
      <section 
        id="features" 
        className="py-32 relative"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(248, 250, 252, 0.88) 100%),
            url('/images/giapha.jpg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F2EBC6] rounded-full mb-6">
              <Award className="w-4 h-4 text-[#A20105]" />
              <span className="text-sm font-semibold text-[#A20105]">
                Tính năng vượt trội
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-[#A20105]">
              Giải Pháp Toàn Diện
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mọi công cụ bạn cần để xây dựng và quản lý gia phả hiện đại
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, idx) => (
              <div
                key={idx}
                className="group p-8 bg-gradient-to-br from-[#F2EBC6]/50 to-white rounded-3xl border-2 border-[#A20105]/20 hover:border-[#A20105] hover:shadow-2xl hover:-translate-y-2 transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#A20105] to-[#8B0104] rounded-2xl flex items-center justify-center text-[#F2EBC6] mb-6 group-hover:scale-110 transition-all shadow-lg">
                  <feature.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-[#A20105] mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section 
        id="pricing" 
        className="py-32 relative"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(242, 235, 198, 0.95) 0%, rgba(248, 244, 216, 0.9) 100%),
            url('/images/backgroudleft.png'), url('/images/backgroudrignt.png')
          `,
          backgroundSize: 'cover, 30% auto, 30% auto',
          backgroundPosition: 'center, left center, right center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6">
              <Crown className="w-4 h-4 text-[#A20105]" />
              <span className="text-sm font-semibold text-[#A20105]">
                Bảng giá minh bạch
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-[#A20105]">
              Chọn Gói Phù Hợp
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Linh hoạt theo nhu cầu, minh bạch chi phí
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {PRICING_PLANS.map((plan, idx) => (
              <div
                key={idx}
                className={`relative rounded-3xl ${plan.popular ? "bg-gradient-to-br from-[#A20105] to-[#8B0104] text-[#F2EBC6] scale-105 md:scale-110 shadow-2xl z-10" : "bg-white border-2 border-[#A20105]/20 shadow-xl"}`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg">
                      <Crown className="w-4 h-4" /> PHỔ BIẾN NHẤT
                    </div>
                  </div>
                )}

                <div className="p-8">
                  <h3
                    className={`text-3xl font-bold mb-2 ${plan.popular ? "text-[#F2EBC6]" : "text-[#A20105]"}`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-sm mb-6 ${plan.popular ? "text-[#F2EBC6]/80" : "text-gray-500"}`}
                  >
                    {plan.subtitle}
                  </p>

                  <div className="mb-6">
                    <span
                      className={`text-5xl font-bold ${plan.popular ? "text-[#F2EBC6]" : "text-[#A20105]"}`}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`text-sm ml-2 ${plan.popular ? "text-[#F2EBC6]/80" : "text-gray-500"}`}
                    >
                      {plan.period}
                    </span>
                  </div>

                  {plan.saveAmount && (
                    <div className="inline-block bg-amber-400 text-slate-900 px-3 py-1 rounded-full text-xs font-bold mb-6">
                      {plan.saveAmount}
                    </div>
                  )}

                  <Button
                    className={`w-full mb-8 py-6 text-lg rounded-xl font-semibold ${plan.popular ? "bg-[#F2EBC6] text-[#A20105] hover:bg-white" : "bg-gradient-to-r from-[#A20105] to-[#8B0104] text-[#F2EBC6] hover:from-[#8B0104] hover:to-[#A20105]"}`}
                  >
                    {plan.cta}
                  </Button>

                  <div className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2
                          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? "text-[#F2EBC6]" : "text-[#A20105]"}`}
                        />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    {plan.notIncluded.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 opacity-50"
                      >
                        <div className="w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5"></div>
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-white border-2 border-[#A20105]/30 rounded-2xl">
              <Shield className="w-6 h-6 text-[#A20105]" />
              <span className="text-[#A20105] font-semibold">
                Đảm bảo hoàn tiền 100% trong 30 ngày
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section 
        id="testimonials" 
        className="py-32 relative"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(248, 250, 252, 0.88) 100%),
            url('/images/giapha.jpg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F2EBC6] rounded-full mb-6">
              <Heart className="w-4 h-4 text-[#A20105]" />
              <span className="text-sm font-semibold text-[#A20105]">
                Khách hàng hài lòng
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-[#A20105]">
              Câu Chuyện Thành Công
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hàng ngàn gia đình đã tin tưởng
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, idx) => (
              <div
                key={idx}
                className="p-8 bg-gradient-to-br from-[#F2EBC6]/50 to-white rounded-3xl border-2 border-[#A20105]/20 hover:shadow-2xl hover:-translate-y-2 transition-all"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="inline-block bg-[#A20105]/10 text-[#A20105] px-4 py-2 rounded-full text-sm font-medium mb-6">
                  ✨ {testimonial.highlight}
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#A20105]/20 to-[#A20105]/10 rounded-full flex items-center justify-center text-3xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-[#A20105] text-lg">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                    <div className="text-xs text-gray-500">
                      📍 {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section 
        className="py-32 relative"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(242, 235, 198, 0.95) 0%, rgba(248, 244, 216, 0.9) 100%),
            url('/images/backgrouNotifi.png')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6">
              <MessageCircle className="w-4 h-4 text-[#A20105]" />
              <span className="text-sm font-semibold text-[#A20105]">
                Câu hỏi thường gặp
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-[#A20105]">
              Giải Đáp Thắc Mắc
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {FAQ_ITEMS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border-2 border-[#A20105]/20 hover:border-[#A20105] hover:shadow-xl transition-all p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#A20105] rounded-xl flex items-center justify-center text-[#F2EBC6] font-bold">
                    Q
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#A20105] mb-3">
                      {faq.q}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-gradient-to-br from-[#A20105] to-[#8B0104] text-[#F2EBC6]">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm rounded-full mb-8">
            <Gift className="w-5 h-5" />
            <span className="font-semibold">
              Ưu đãi: Miễn phí 2 tháng khi đăng ký năm
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Sẵn Sàng Bắt Đầu?
          </h2>
          <p className="text-xl md:text-2xl mb-12 opacity-95 max-w-3xl mx-auto">
            Tham gia cùng <strong>hơn 10,000 gia đình Việt</strong> đang gìn giữ
            và phát triển gia phả số
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button
              size="lg"
              className="bg-[#F2EBC6] text-[#A20105] hover:bg-white px-12 py-8 text-xl rounded-2xl shadow-2xl"
              asChild
            >
              <Link href="/register">
                <Sparkles className="w-6 h-6 mr-2" />
                Đăng ký miễn phí
                <ArrowRight className="w-6 h-6 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-3 border-[#F2EBC6] text-[#F2EBC6] hover:bg-white/10 px-12 py-8 text-xl rounded-2xl"
            >
              <PlayCircle className="w-6 h-6 mr-2" />
              Xem demo
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            {[
              "Không cần thẻ tín dụng",
              "Dùng thử 30 ngày",
              "Hủy bất cứ lúc nào",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>✓ {item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="text-slate-200 py-16 relative overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(135deg, rgba(51, 65, 85, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(162, 1, 5, 0.15) 100%),
            url('/images/giapha.jpg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-800/20 to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#A20105] to-[#8B0104] rounded-2xl flex items-center justify-center text-[#F2EBC6] font-bold text-xl shadow-lg">
                  GP
                </div>
                <div>
                  <div className="font-bold text-white text-xl">GIA PHẢ SỐ</div>
                  <div className="text-xs text-slate-300">Kết nối dòng tộc</div>
                </div>
              </div>
              <p className="text-sm opacity-80 mb-6 leading-relaxed">
                Nền tảng số hóa gia phả hàng đầu Việt Nam. Gìn giữ và phát triển
                di sản văn hóa qua các thế hệ.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#A20105]/20 transition-colors cursor-pointer">
                  <span className="text-sm">📧</span>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#A20105]/20 transition-colors cursor-pointer">
                  <span className="text-sm">📞</span>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#A20105]/20 transition-colors cursor-pointer">
                  <span className="text-sm">🌐</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 text-lg">Sản Phẩm</h4>
              <ul className="space-y-3 text-sm">
                {["Tính năng", "Bảng giá", "Ứng dụng Mobile"].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="hover:text-[#A20105] transition-colors flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-6 text-lg">Liên Hệ</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3 hover:text-[#A20105] transition-colors">
                  <span className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">📧</span>
                  lienhe@giaphaso.vn
                </li>
                <li className="flex items-center gap-3 hover:text-[#A20105] transition-colors">
                  <span className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">📞</span>
                  1900 1000
                </li>
                <li className="flex items-center gap-3 hover:text-[#A20105] transition-colors">
                  <span className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">📍</span>
                  Hà Nội, Việt Nam
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-600/50 pt-8 text-center text-sm opacity-70">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>© {new Date().getFullYear()} Gia Phả Số. All rights reserved.</div>
              <div className="flex gap-6 text-xs">
                <Link href="#" className="hover:text-[#A20105] transition-colors">Điều khoản</Link>
                <Link href="#" className="hover:text-[#A20105] transition-colors">Bảo mật</Link>
                <Link href="#" className="hover:text-[#A20105] transition-colors">Hỗ trợ</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
