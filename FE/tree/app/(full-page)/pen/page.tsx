import React, { useState } from "react";

export default function PhaKyPage() {
  const [activePage, setActivePage] = useState("pha-ky");

  // Danh sách các trang
  const pages = [
    { id: "pha-ky", label: "Lược sử", icon: "📜" },
    { id: "lich-su", label: "Lịch Sử", icon: "🏛️" },
    { id: "gia-pha", label: "Gia Phả", icon: "🌳" },
    { id: "truyen-thong", label: "Tín dưỡng", icon: "⛩️" },
    { id: "nhan-vat", label: "Tổ phần", icon: "👤" },
    { id: "tai-lieu", label: "Truyền thống", icon: "📚" },
  ];

  // Render nội dung theo trang
  const renderContent = () => {
    switch (activePage) {
      case "pha-ky":
        return <PhaKyContent />;
      case "lich-su":
        return <div className="text-center py-20 text-2xl text-[#8b5e3c]">Nội dung Lịch Sử</div>;
      case "gia-pha":
        return <div className="text-center py-20 text-2xl text-[#8b5e3c]">Nội dung Gia Phả</div>;
      case "truyen-thong":
        return <div className="text-center py-20 text-2xl text-[#8b5e3c]">Nội dung Truyền Thống</div>;
      case "nhan-vat":
        return <div className="text-center py-20 text-2xl text-[#8b5e3c]">Nội dung Nhân Vật</div>;
      case "tai-lieu":
        return <div className="text-center py-20 text-2xl text-[#8b5e3c]">Nội dung Tài Liệu</div>;
      default:
        return <PhaKyContent />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 font-serif text-[#2d2d2d] animate-fadeIn">
      {/* Header trang */}
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl md:text-5xl text-[#8b0000] border-b-4 border-double border-[#d4af37] pb-3 mb-3 inline-block">
          Dòng Họ Hùng Vương
        </h1>
        <p className="text-[#8b5e3c] italic text-lg">
          Lịch sử vinh quang của tổ tiên - Truyền thống ngàn đời
        </p>
      </div>

      {/* HÀNG ĐẦU: 3 CỘT - Buttons | Hình ảnh | Nội dung đoạn 1 */}
      <div className="grid grid-cols-12 gap-4 mb-6">
        {/* CỘT 1: Buttons bên trái - nhỏ gọn hơn */}
        <div className="col-span-2">
          <div className="space-y-2 sticky top-4">
            {pages.map((page, index) => (
              <button
                key={page.id}
                onClick={() => setActivePage(page.id)}
                className={`w-full relative transition-all duration-300 ${
                  activePage === page.id ? "scale-105" : "hover:scale-102"
                }`}
                style={{
                  backgroundImage: `url('/images/khung.png')`, // Chỉ 1 file ảnh duy nhất
                  backgroundSize: "100% 100%",
                  backgroundRepeat: "no-repeat",
                  height: "60px",
                }}
              >
                <div
                  className={`absolute inset-0 transition-all ${
                    activePage === page.id
                      ? "bg-[#fdf6e3]/50"
                      : "bg-white/10 hover:bg-[#fdf6e3]/30"
                  }`}
                />
                <div className="relative z-10 h-full flex flex-col items-center justify-center gap-0.5">
                  <span className="text-base">{page.icon}</span>
                  <span
                    className={`font-display text-[10px] font-bold leading-tight ${
                      activePage === page.id
                        ? "text-[#8b0000]"
                        : "text-[#8b5e3c]"
                    }`}
                  >
                    {page.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* CỘT 2: Hình ảnh giữa - thu nhỏ */}
        <div className="col-span-5">
          <div className="relative p-2 border-[6px] border-double border-[#8b5e3c] bg-[#fdf6e3] shadow-[4px_4px_15px_rgba(0,0,0,0.2)]">
            <div className="absolute inset-0 border border-[#d4af37] m-1 pointer-events-none"></div>
            <img
              src="\images\vuahung.jpg"
              alt="Hùng Vương"
              className="w-full h-auto object-cover grayscale-[10%] sepia-[40%]"
            />
            <p className="text-center mt-2 font-display italic text-[10px] text-[#5d4037] bg-[#eaddcf]/40 py-1 px-2 rounded">
              Hùng Vương (雄王)
            </p>
          </div>
        </div>

        {/* CỘT 3: Đoạn văn đầu tiên */}
        <div className="col-span-5 text-justify leading-relaxed">
          <p className="first-letter:text-6xl first-letter:font-display first-letter:text-[#8b0000] first-letter:float-left first-letter:mr-3 first-letter:font-bold first-letter:leading-none text-base mb-4">
            Hùng Vương (雄王) là cách gọi dành cho các vị vua nước Văn Lang của
            người Lạc Việt. Theo sử Việt và truyền thuyết dân gian được truyền
            tụng qua nhiều thế hệ, các đời Hùng Vương được truyền nối qua 18
            đời, tồn tại từ khoảng thế kỷ 7 đến thế kỷ 2 Trước Công Nguyên. Câu
            chuyện các vua Hùng không có trong chính sử mà nằm trong các truyền
            thuyết dân gian của người Việt được kể lại qua nhiều đời.
          </p>
        </div>
      </div>

      {/* DÒNG THỨ 2 TRỞ ĐI: NỘI DUNG FULL WIDTH */}
      <div className="animate-fadeIn">
        <div className="text-justify leading-relaxed">
          <p className="text-lg mb-4">
            Với người Việt Nam, các vua Hùng đại diện cho tổ tiên, cho truyền
            thống dựng nước và là niềm tự hào về nền văn minh đậm đà bản sắc
            riêng suốt nhiều nghìn năm.
          </p>

          <h2 className="font-display text-2xl text-[#8b5e3c] mt-8 mb-4 flex items-center">
            <span className="inline-block w-2 h-8 bg-[#8b0000] mr-3"></span>
            Các đời Hùng Vương
          </h2>

          <p className="text-lg mb-4">
            Theo Đại Việt sử lược và nhiều tài liệu khác, triều đại Hùng Vương
            được truyền qua 18 đời, gồm những vị sau:
          </p>

          <div className="bg-[#fffdf5] p-6 rounded-lg border-2 border-[#d4af37]/40 shadow-inner mb-6">
            <ol className="space-y-3 text-base">
              <li className="flex items-start">
                <span className="text-[#8b0000] font-bold mr-3 min-w-[28px]">
                  1.
                </span>
                <span>
                  <strong>Kinh Dương Vương</strong>, húy Lộc Tục, sinh năm Nhâm
                  Ngọ (2919 tr. TL).
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#8b0000] font-bold mr-3 min-w-[28px]">
                  2.
                </span>
                <span>
                  <strong>Lạc Long Quân</strong>, húy Sùng Lãm, sinh năm Bính
                  Thìn (2825 tr. TL).
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#8b0000] font-bold mr-3 min-w-[28px]">
                  3.
                </span>
                <span>
                  <strong>Hùng Quốc Vương</strong>, húy Hùng Lân, sinh năm Canh
                  Ngọ (2570 tr. TL).
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#8b0000] font-bold mr-3 min-w-[28px]">
                  4.
                </span>
                <span>
                  <strong>Hùng Hoa Vương</strong>, húy Bửu Lang, lên ngôi năm
                  Đinh Hợi (2252 tr. TL).
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-[#8b0000] font-bold mr-3 min-w-[28px]">
                  5.
                </span>
                <span>
                  <strong>Hùng Hy Vương</strong>, húy Bảo Lang, sinh năm Tân Mùi
                  (2030 tr. TL).
                </span>
              </li>
              <li className="italic text-stone-500 ml-8 text-sm">
                ... (Danh sách tiếp tục đến đời thứ 18)
              </li>
            </ol>
          </div>

          <h2 className="font-display text-2xl text-[#8b5e3c] mt-8 mb-4 flex items-center">
            <span className="inline-block w-2 h-8 bg-[#8b0000] mr-3"></span>Ý
            nghĩa lịch sử
          </h2>

          <p className="text-lg mb-4">
            Thời đại Hùng Vương là giai đoạn rất quan trọng trong lịch sử Việt
            Nam. Nó đã xây dựng nên nền tảng văn hóa, tín ngưỡng và truyền thống
            yêu nước, đoàn kết của dân tộc. Những di tích lịch sử như Đền Hùng
            (Phú Thọ) là minh chứng sống động cho thời kỳ này.
          </p>

          <p className="text-lg italic text-[#8b5e3c] bg-[#fdf6e3] p-4 rounded border-l-4 border-[#d4af37]">
            "Dù ai đi ngược về xuôi
            <br />
            Nhớ ngày giỗ tổ mười tháng ba"
          </p>
        </div>
      </div>
    </div>
  );
}

// Component nội dung Pha Ký
function PhaKyContent() {
  return null; // Nội dung đã được render trực tiếp ở trên
}