import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, BookOpen, Lock, Share2, BarChart2, Book, User, LogIn } from "lucide-react"
import Image from "next/image"

export default function Home() {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-red-600" />,
      title: "Xây dựng cây gia phả",
      description: "Tạo và quản lý cây gia phả nhiều thế hệ một cách trực quan"
    },
    {
      icon: <Users className="w-8 h-8 text-red-600" />,
      title: "Quản lý thành viên",
      description: "Theo dõi thông tin chi tiết của từng thành viên trong gia đình"
    },
    {
      icon: <Book className="w-8 h-8 text-red-600" />,
      title: "Lưu trữ kỷ niệm",
      description: "Lưu giữ những khoảnh khắc đáng nhớ cùng người thân"
    }
  ]

  return (
    <div className="min-h-screen bg-[#FCF9E3] relative">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-[#FCF9E3] backdrop-blur-sm shadow-sm z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-red-600">GiaPhả</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white-700 hover:text-red-600 font-medium flex items-center space-x-1">
                <span>Trang chủ</span>
              </Link>
              <Link href="#features" className="text-gray-700 hover:text-red-600 font-medium flex items-center space-x-1">
                <Book className="w-5 h-5" />
                <span>Tính năng</span>
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-red-600 font-medium flex items-center space-x-1">
                <LogIn className="w-5 h-5" />
                <span>Đăng nhập</span>
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-md text-gray-700 hover:text-red-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Add padding top to account for fixed header */}
      <main className="pt-10">
        {/* Hero Section */}
        <section className="relative h-[600px] bg-[#FCF9E3 flex items-center justify-center text-center">
          {/* Background image */}
          <Image
            src="/images/trongdong.png" // thay bằng ảnh của bạn
            alt="Gia đình"
            fill
            className="object-cover"
            priority
          />

          {/* Overlay tối mờ để chữ nổi */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Content nổi lên */}
          <div className="relative z-10 max-w-4xl px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Kết nối gia đình qua nhiều thế hệ
            </h1>
            <p className="text-xl text-white/90 mb-10">
              Lưu trữ, quản lý và kết nối gia phả gia đình một cách dễ dàng và an toàn
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white" asChild>
                <Link href="/register">Bắt đầu ngay</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-red-600 text-red-600 hover:bg-red-50" asChild>
                <Link href="#features">Tìm hiểu thêm</Link>
              </Button>
            </div>
          </div>
        </section>


        {/* Features Section */}
        <section id="features" className="py-20 bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Tính năng nổi bật
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Khám phá những tính năng giúp bạn quản lý gia phả dễ dàng
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-8 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-red-50 rounded-lg flex items-center justify-center mb-6 mx-auto group-hover:bg-red-100 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-center text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-red-50">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Bắt đầu hành trình khám phá gia phả ngay hôm nay
              </h2>
              <p className="text-xl text-gray-700 mb-8">
                Đăng ký miễn phí và trải nghiệm cách quản lý gia phả hiện đại
              </p>
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white" asChild>
                <Link href="/register">Đăng ký ngay</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold text-red-600 mb-4 md:mb-0">GiaPhả</div>
            <div className="text-gray-500 text-sm">
              © {new Date().getFullYear()} GiaPhả. Tất cả quyền được bảo lưu.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}