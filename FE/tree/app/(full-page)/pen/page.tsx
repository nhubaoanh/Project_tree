"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchTaiLieu, ITaiLieu } from "@/service/tailieu.service";
import storage from "@/utils/storage";
import { FileText, BookOpen, Image, ScrollText, FolderOpen, ExternalLink } from "lucide-react";

export default function PhaKyPage() {
  const [dongHoId, setDongHoId] = useState<string>("");

  useEffect(() => {
    const user = storage.getUser();
    if (user?.dongHoId) {
      setDongHoId(user.dongHoId);
    }
  }, []);

  const taiLieuQuery = useQuery({
    queryKey: ["tailieu-public", dongHoId],
    queryFn: () => searchTaiLieu({ pageIndex: 1, pageSize: 100, dongHoId }),
    enabled: !!dongHoId,
  });

  const allTaiLieu: ITaiLieu[] = taiLieuQuery.data?.data || [];

  // Lọc tài liệu theo loại
  const giaPha = allTaiLieu.filter((t) => t.loaiTaiLieu === "Gia phả");
  const sacPhong = allTaiLieu.filter((t) => t.loaiTaiLieu === "Sắc phong");
  const hinhAnh = allTaiLieu.filter((t) => t.loaiTaiLieu === "Hình ảnh");
  const vanBanCo = allTaiLieu.filter((t) => t.loaiTaiLieu === "Văn bản cổ");
  const taiLieuKhac = allTaiLieu.filter(
    (t) => !["Gia phả", "Sắc phong", "Hình ảnh", "Văn bản cổ"].includes(t.loaiTaiLieu || "")
  );

  // Component card tài liệu
  const TaiLieuCard = ({ item, icon: Icon }: { item: ITaiLieu; icon: any }) => {
    // Decode URL nếu bị encode
    const getImageUrl = (url: string) => {
      if (!url) return '';
      try {
        // Decode URL nếu bị encode
        const decodedUrl = decodeURIComponent(url);
        return decodedUrl;
      } catch (error) {
        console.warn('Error decoding URL:', url, error);
        return url;
      }
    };

    const isImageFile = (url: string) => {
      if (!url) return false;
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
      const lowerUrl = url.toLowerCase();
      return imageExtensions.some(ext => lowerUrl.includes(ext));
    };

    const imageUrl = item.duongDan ? getImageUrl(item.duongDan) : '';
    const isImage = isImageFile(imageUrl);

    return (
      <div className="bg-white rounded-xl p-5 border-2 border-[#d4af37]/30 shadow-md hover:shadow-xl transition-all duration-300 group">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#d4af37]/20 to-[#8b5e3c]/20 flex items-center justify-center flex-shrink-0">
            <Icon className="text-[#8b5e3c]" size={24} />
          </div>
          <div className="flex-1">
            <h3 className="font-display text-lg font-bold text-[#2d2d2d] group-hover:text-[#8b0000] transition-colors mb-2">
              {item.tenTaiLieu}
            </h3>
            {item.moTa && (
              <p className="text-sm text-stone-600 mb-3 line-clamp-2">{item.moTa}</p>
            )}
            
            {/* Hiển thị hình ảnh nếu là file ảnh */}
            {isImage && imageUrl && (
              <div className="mb-3">
                <img
                  src={imageUrl}
                  alt={item.tenTaiLieu}
                  className="w-full h-32 object-cover rounded-lg border border-[#d4af37]/30"
                  onError={(e) => {
                    console.error('Image load error:', imageUrl);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}

            <div className="flex flex-wrap gap-2 text-xs">
              {item.tacGia && (
                <span className="px-2 py-1 bg-[#fdf6e3] text-[#8b5e3c] rounded-full">
                  ✍️ {item.tacGia}
                </span>
              )}
              {item.namSangTac && (
                <span className="px-2 py-1 bg-[#fdf6e3] text-[#8b5e3c] rounded-full">
                  📅 {item.namSangTac}
                </span>
              )}
              {item.nguonGoc && (
                <span className="px-2 py-1 bg-[#fdf6e3] text-[#8b5e3c] rounded-full">
                  📍 {item.nguonGoc}
                </span>
              )}
            </div>
            {item.duongDan && (
              <a
                href={imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-sm text-[#8b0000] hover:underline font-medium"
              >
                {isImage ? 'Xem hình ảnh' : 'Xem tài liệu'} <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Component danh sách tài liệu
  const TaiLieuSection = ({ items, title, icon: Icon }: { items: ITaiLieu[]; title: string; icon: any }) => (
    <div className="mb-12">
      <h2 className="font-display text-3xl text-[#8b5e3c] mb-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#8b0000] flex items-center justify-center">
          <Icon className="text-white" size={20} />
        </div>
        {title}
        <span className="text-lg font-normal text-stone-500">({items.length})</span>
      </h2>
      {items.length === 0 ? (
        <div className="bg-[#fdf6e3] rounded-xl p-8 text-center">
          <p className="text-stone-500 italic">Chưa có tài liệu nào trong mục này</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {items.map((item) => (
            <TaiLieuCard key={item.taiLieuId} item={item} icon={Icon} />
          ))}
        </div>
      )}
    </div>
  );

  if (taiLieuQuery.isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d4af37]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdf6e3]/30 to-white">
      <div className="max-w-7xl mx-auto px-4 py-10 font-serif text-[#2d2d2d]">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl md:text-5xl text-[#8b0000] mb-3">
            Phả Ký Dòng Họ
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto"></div>
          <p className="text-[#8b5e3c] italic text-lg mt-3">
            Lịch sử vinh quang của tổ tiên - Truyền thống ngàn đời
          </p>
        </div>

        {/* 📜 LƯỢC SỬ */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-[#d4af37]/20 mb-12">
          <h2 className="font-display text-3xl text-[#8b5e3c] mb-8 flex items-center gap-3">
            <span className="text-4xl">📜</span>
            <div className="w-2 h-8 bg-[#8b0000] rounded"></div>
            Lược Sử Dòng Họ
          </h2>
          
          {/* Hình ảnh + Đoạn văn đầu */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="relative">
              <div className="p-3 border-[6px] border-double border-[#8b5e3c] bg-[#fdf6e3] shadow-xl rounded-lg">
                <img
                  src="/images/vuahung.jpg"
                  alt="Hùng Vương"
                  className="w-full h-auto object-cover rounded grayscale-[10%] sepia-[30%]"
                />
              </div>
              <p className="text-center mt-3 font-display italic text-sm text-[#5d4037]">
                Hùng Vương (雄王) - Quốc Tổ Việt Nam
              </p>
            </div>

            <div className="text-justify leading-relaxed">
              <p className="first-letter:text-6xl first-letter:font-display first-letter:text-[#8b0000] first-letter:float-left first-letter:mr-3 first-letter:font-bold first-letter:leading-none text-base">
                Hùng Vương (雄王) là cách gọi dành cho các vị vua nước Văn Lang của
                người Lạc Việt. Theo sử Việt và truyền thuyết dân gian được truyền
                tụng qua nhiều thế hệ, các đời Hùng Vương được truyền nối qua 18
                đời, tồn tại từ khoảng thế kỷ 7 đến thế kỷ 2 Trước Công Nguyên.
              </p>
              <p className="text-base mt-4">
                Với người Việt Nam, các vua Hùng đại diện cho tổ tiên, cho truyền
                thống dựng nước và là niềm tự hào về nền văn minh đậm đà bản sắc
                riêng suốt nhiều nghìn năm.
              </p>
            </div>
          </div>

          {/* Các đời Hùng Vương */}
          <div className="mb-10">
            <h3 className="font-display text-2xl text-[#8b5e3c] mb-6 flex items-center gap-3">
              <div className="w-2 h-8 bg-[#8b0000] rounded"></div>
              Các đời Hùng Vương
            </h3>
            <div className="bg-gradient-to-br from-[#fffdf5] to-[#fdf6e3] p-6 rounded-xl border border-[#d4af37]/30">
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { num: 1, name: "Kinh Dương Vương", huy: "Lộc Tục", year: "2919 tr. TL" },
                  { num: 2, name: "Lạc Long Quân", huy: "Sùng Lãm", year: "2825 tr. TL" },
                  { num: 3, name: "Hùng Quốc Vương", huy: "Hùng Lân", year: "2570 tr. TL" },
                  { num: 4, name: "Hùng Hoa Vương", huy: "Bửu Lang", year: "2252 tr. TL" },
                ].map((king) => (
                  <div key={king.num} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <span className="w-8 h-8 rounded-full bg-[#8b0000] text-white flex items-center justify-center font-bold text-sm">
                      {king.num}
                    </span>
                    <div>
                      <p className="font-bold text-[#2d2d2d]">{king.name}</p>
                      <p className="text-xs text-stone-500">Húy {king.huy} • {king.year}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-center text-stone-500 italic mt-4 text-sm">
                ... và tiếp tục đến đời thứ 18
              </p>
            </div>
          </div>

          {/* Ý nghĩa lịch sử */}
          <div>
            <h3 className="font-display text-2xl text-[#8b5e3c] mb-6 flex items-center gap-3">
              <div className="w-2 h-8 bg-[#8b0000] rounded"></div>
              Ý nghĩa lịch sử
            </h3>
            <p className="text-base mb-6 leading-relaxed">
              Thời đại Hùng Vương là giai đoạn rất quan trọng trong lịch sử Việt
              Nam. Nó đã xây dựng nên nền tảng văn hóa, tín ngưỡng và truyền thống
              yêu nước, đoàn kết của dân tộc.
            </p>
            <blockquote className="bg-gradient-to-r from-[#fdf6e3] to-white p-6 rounded-xl border-l-4 border-[#d4af37] italic text-lg text-[#8b5e3c]">
              "Dù ai đi ngược về xuôi<br />
              Nhớ ngày giỗ tổ mười tháng ba"
            </blockquote>
          </div>
        </div>

        {/* 🌳 GIA PHẢ */}
        <TaiLieuSection items={giaPha} title="Gia Phả Dòng Họ" icon={BookOpen}  />

        {/* 🏛️ SẮC PHONG */}
        <TaiLieuSection items={sacPhong} title="Sắc Phong" icon={ScrollText} />

        {/* 🖼️ HÌNH ẢNH */}
        <TaiLieuSection items={hinhAnh} title="Hình Ảnh Lịch Sử" icon={Image} />

        {/* 📚 TÀI LIỆU KHÁC */}
        <div className="mb-12">
          <h2 className="font-display text-3xl text-[#8b5e3c] mb-6 flex items-center gap-3">
            <span className="text-4xl">📚</span>
            <div className="w-10 h-10 rounded-lg bg-[#8b0000] flex items-center justify-center">
              <FolderOpen className="text-white" size={20} />
            </div>
            Tài Liệu Khác
            <span className="text-lg font-normal text-stone-500">({vanBanCo.length + taiLieuKhac.length})</span>
          </h2>
          
          {/* Văn bản cổ */}
          {vanBanCo.length > 0 && (
            <div className="mb-8">
              <h3 className="font-display text-xl text-[#8b5e3c] mb-4 flex items-center gap-2">
                <FileText size={20} />
                Văn Bản Cổ ({vanBanCo.length})
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {vanBanCo.map((item) => (
                  <TaiLieuCard key={item.taiLieuId} item={item} icon={FileText} />
                ))}
              </div>
            </div>
          )}

          {/* Tài liệu khác */}
          {taiLieuKhac.length > 0 && (
            <div>
              <h3 className="font-display text-xl text-[#8b5e3c] mb-4 flex items-center gap-2">
                <FolderOpen size={20} />
                Tài Liệu Khác ({taiLieuKhac.length})
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {taiLieuKhac.map((item) => (
                  <TaiLieuCard key={item.taiLieuId} item={item} icon={FolderOpen} />
                ))}
              </div>
            </div>
          )}

          {vanBanCo.length === 0 && taiLieuKhac.length === 0 && (
            <div className="bg-[#fdf6e3] rounded-xl p-8 text-center">
              <p className="text-stone-500 italic">Chưa có tài liệu nào trong mục này</p>
            </div>
          )}
        </div>

        {/* Footer decoration */}
        <div className="mt-16 flex justify-center opacity-40">
          <svg className="w-64 h-12" viewBox="0 0 256 48" fill="none">
            <path d="M 8 24 L 64 24 M 72 24 Q 88 16 104 24 Q 120 32 128 24 Q 136 16 152 24 Q 168 32 184 24 M 192 24 L 248 24" stroke="#c9a961" strokeWidth="2" />
            <circle cx="128" cy="24" r="6" fill="#c9a961" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// Component nội dung Lược sử (không cần nữa vì đã gộp vào main component)
function PhaKyContent() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 border border-[#d4af37]/20">
      {/* Hình ảnh + Đoạn văn đầu */}
      <div className="grid md:grid-cols-2 gap-8 mb-10">
        <div className="relative">
          <div className="p-3 border-[6px] border-double border-[#8b5e3c] bg-[#fdf6e3] shadow-xl rounded-lg">
            <img
              src="/images/vuahung.jpg"
              alt="Hùng Vương"
              className="w-full h-auto object-cover rounded grayscale-[10%] sepia-[30%]"
            />
          </div>
          <p className="text-center mt-3 font-display italic text-sm text-[#5d4037]">
            Hùng Vương (雄王) - Quốc Tổ Việt Nam
          </p>
        </div>

        <div className="text-justify leading-relaxed">
          <p className="first-letter:text-6xl first-letter:font-display first-letter:text-[#8b0000] first-letter:float-left first-letter:mr-3 first-letter:font-bold first-letter:leading-none text-base">
            Hùng Vương (雄王) là cách gọi dành cho các vị vua nước Văn Lang của
            người Lạc Việt. Theo sử Việt và truyền thuyết dân gian được truyền
            tụng qua nhiều thế hệ, các đời Hùng Vương được truyền nối qua 18
            đời, tồn tại từ khoảng thế kỷ 7 đến thế kỷ 2 Trước Công Nguyên.
          </p>
          <p className="text-base mt-4">
            Với người Việt Nam, các vua Hùng đại diện cho tổ tiên, cho truyền
            thống dựng nước và là niềm tự hào về nền văn minh đậm đà bản sắc
            riêng suốt nhiều nghìn năm.
          </p>
        </div>
      </div>

      {/* Các đời Hùng Vương */}
      <div className="mb-10">
        <h2 className="font-display text-2xl text-[#8b5e3c] mb-6 flex items-center gap-3">
          <div className="w-2 h-8 bg-[#8b0000] rounded"></div>
          Các đời Hùng Vương
        </h2>
        <div className="bg-gradient-to-br from-[#fffdf5] to-[#fdf6e3] p-6 rounded-xl border border-[#d4af37]/30">
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { num: 1, name: "Kinh Dương Vương", huy: "Lộc Tục", year: "2919 tr. TL" },
              { num: 2, name: "Lạc Long Quân", huy: "Sùng Lãm", year: "2825 tr. TL" },
              { num: 3, name: "Hùng Quốc Vương", huy: "Hùng Lân", year: "2570 tr. TL" },
              { num: 4, name: "Hùng Hoa Vương", huy: "Bửu Lang", year: "2252 tr. TL" },
            ].map((king) => (
              <div key={king.num} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <span className="w-8 h-8 rounded-full bg-[#8b0000] text-white flex items-center justify-center font-bold text-sm">
                  {king.num}
                </span>
                <div>
                  <p className="font-bold text-[#2d2d2d]">{king.name}</p>
                  <p className="text-xs text-stone-500">Húy {king.huy} • {king.year}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-stone-500 italic mt-4 text-sm">
            ... và tiếp tục đến đời thứ 18
          </p>
        </div>
      </div>

      {/* Ý nghĩa */}
      <div>
        <h2 className="font-display text-2xl text-[#8b5e3c] mb-6 flex items-center gap-3">
          <div className="w-2 h-8 bg-[#8b0000] rounded"></div>
          Ý nghĩa lịch sử
        </h2>
        <p className="text-base mb-6 leading-relaxed">
          Thời đại Hùng Vương là giai đoạn rất quan trọng trong lịch sử Việt
          Nam. Nó đã xây dựng nên nền tảng văn hóa, tín ngưỡng và truyền thống
          yêu nước, đoàn kết của dân tộc.
        </p>
        <blockquote className="bg-gradient-to-r from-[#fdf6e3] to-white p-6 rounded-xl border-l-4 border-[#d4af37] italic text-lg text-[#8b5e3c]">
          "Dù ai đi ngược về xuôi<br />
          Nhớ ngày giỗ tổ mười tháng ba"
        </blockquote>
      </div>
    </div>
  );
}
