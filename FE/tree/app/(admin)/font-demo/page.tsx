"use client";

export default function FontDemoPage() {
  const sampleText = "Gia Phả Dòng Họ Nguyễn";
  const sampleVietnamese = "Cây có cội, nước có nguồn";

  const fonts = [
    { name: "Dancing Script", class: "font-dancing", desc: "Thư pháp mềm mại, bay bổng" },
    { name: "Great Vibes", class: "font-great-vibes", desc: "Thư pháp sang trọng (không hỗ trợ tiếng Việt đầy đủ)" },
    { name: "Playfair Display", class: "font-playfair", desc: "Sang trọng, cổ điển ⭐ Khuyên dùng" },
    { name: "Cormorant Garamond", class: "font-cormorant", desc: "Thanh lịch, quý phái ⭐ Khuyên dùng" },
    { name: "Cinzel", class: "font-cinzel", desc: "Phong cách La Mã cổ đại" },
    { name: "Cinzel Decorative", class: "font-cinzel-deco", desc: "Cinzel phiên bản trang trí" },
    { name: "Libre Baskerville", class: "font-libre", desc: "Cổ điển, dễ đọc" },
    { name: "EB Garamond", class: "font-garamond", desc: "Cổ điển châu Âu" },
    { name: "Crimson Text", class: "font-crimson", desc: "Truyền thống, trang nhã" },
    { name: "Noto Serif", class: "font-noto-serif", desc: "Hỗ trợ tiếng Việt tuyệt vời ⭐ Khuyên dùng" },
    { name: "Spectral", class: "font-spectral", desc: "Hiện đại pha truyền thống" },
    { name: "Lora", class: "font-lora", desc: "Cân bằng giữa hiện đại và cổ điển" },
    { name: "Be Vietnam Pro", class: "font-bevietnam", desc: "Font nội dung - Thiết kế riêng cho tiếng Việt" },
  ];

  return (
    <div className="p-8 bg-[#fdf6e3] min-h-screen">
      <h1 className="text-3xl font-bold text-[#5d4037] mb-2 font-playfair">
        🎨 Demo Font Chữ Truyền Thống
      </h1>
      <p className="text-[#8b5e3c] mb-8 font-bevietnam">
        Chọn font phù hợp cho gia phả của bạn. Các font có ⭐ được khuyên dùng.
      </p>

      <div className="space-y-6">
        {fonts.map((font, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-md border border-[#d4af37]/30 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-[#5d4037]">{font.name}</h3>
                <p className="text-sm text-[#8b5e3c]">{font.desc}</p>
                <code className="text-xs bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                  className="{font.class}"
                </code>
              </div>
            </div>

            <div className="space-y-3 border-t border-[#d4af37]/20 pt-4">
              {/* Tiêu đề lớn */}
              <div className={`${font.class} text-4xl text-[#b91c1c]`}>
                {sampleText}
              </div>

              {/* Tiêu đề vừa */}
              <div className={`${font.class} text-2xl text-[#5d4037]`}>
                {sampleVietnamese}
              </div>

              {/* Text thường */}
              <div className={`${font.class} text-lg text-[#5d4037]`}>
                Đây là đoạn văn bản mẫu để kiểm tra font chữ tiếng Việt có dấu: 
                ă â đ ê ô ơ ư - Ă Â Đ Ê Ô Ơ Ư
              </div>

              {/* Số và ký tự đặc biệt */}
              <div className={`${font.class} text-base text-[#8b5e3c]`}>
                Số: 0123456789 | Năm: 1945 - 2025 | Đời thứ: I II III IV V
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Hướng dẫn sử dụng */}
      <div className="mt-10 bg-white rounded-xl p-6 shadow-md border border-[#d4af37]">
        <h2 className="text-xl font-bold text-[#5d4037] mb-4 font-playfair">
          📖 Hướng Dẫn Sử Dụng
        </h2>
        <div className="space-y-4 font-bevietnam text-[#5d4037]">
          <div>
            <h4 className="font-bold">1. Font thư pháp (cho tên dòng họ, tiêu đề trang trọng):</h4>
            <code className="bg-gray-100 px-2 py-1 rounded text-sm">
              {`<h1 className="font-dancing">Gia Phả Dòng Họ Nguyễn</h1>`}
            </code>
          </div>
          <div>
            <h4 className="font-bold">2. Font truyền thống (cho heading, tiêu đề):</h4>
            <code className="bg-gray-100 px-2 py-1 rounded text-sm">
              {`<h2 className="font-playfair">Thế Hệ Thứ Nhất</h2>`}
            </code>
          </div>
          <div>
            <h4 className="font-bold">3. Font nội dung (cho text thông thường):</h4>
            <code className="bg-gray-100 px-2 py-1 rounded text-sm">
              {`<p className="font-bevietnam">Nội dung chi tiết...</p>`}
            </code>
          </div>
          <div>
            <h4 className="font-bold">4. Kết hợp nhiều font:</h4>
            <pre className="bg-gray-100 px-3 py-2 rounded text-sm overflow-x-auto">
{`<div>
  <h1 className="font-dancing text-4xl">Gia Phả Việt</h1>
  <h2 className="font-cormorant text-2xl">Dòng Họ Nguyễn</h2>
  <p className="font-bevietnam">Nội dung chi tiết về dòng họ...</p>
</div>`}
            </pre>
          </div>
        </div>
      </div>

      {/* Gợi ý kết hợp */}
      <div className="mt-6 bg-[#b91c1c] text-white rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold mb-4 font-playfair text-[#d4af37]">
          💡 Gợi Ý Kết Hợp Font
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/10 rounded-lg p-4">
            <h4 className="font-bold text-[#d4af37] mb-2">Phong cách Cổ điển:</h4>
            <ul className="text-sm space-y-1">
              <li>• Tiêu đề: <span className="font-dancing">font-dancing</span></li>
              <li>• Heading: <span className="font-playfair">font-playfair</span></li>
              <li>• Nội dung: <span className="font-bevietnam">font-bevietnam</span></li>
            </ul>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <h4 className="font-bold text-[#d4af37] mb-2">Phong cách Trang nhã:</h4>
            <ul className="text-sm space-y-1">
              <li>• Tiêu đề: <span className="font-cormorant">font-cormorant</span></li>
              <li>• Heading: <span className="font-crimson">font-crimson</span></li>
              <li>• Nội dung: <span className="font-noto-serif">font-noto-serif</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
