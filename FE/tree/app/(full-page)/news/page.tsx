"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchTinTuc, ITinTuc } from "@/service/tintuc.service";
import storage from "@/utils/storage";
import { X } from "lucide-react";

export default function TinTucPage() {
  const [dongHoId, setDongHoId] = useState<string>("");
  const [selectedNews, setSelectedNews] = useState<ITinTuc | null>(null);

  useEffect(() => {
    const user = storage.getUser();
    if (user?.dongHoId) {
      setDongHoId(user.dongHoId);
    }
  }, []);

  const tinTucQuery = useQuery({
    queryKey: ["tintuc-public", dongHoId],
    queryFn: () => searchTinTuc({ pageIndex: 1, pageSize: 20, dongHoId }),
    enabled: !!dongHoId,
  });

  const allNewsItems: ITinTuc[] = tinTucQuery.data?.data || [];
  
  // Tin ghim làm tin nổi bật
  const featuredNews = allNewsItems.find((item) => item.ghim === 1) || allNewsItems[0];
  // Các tin còn lại chia 2 cột
  const otherNews = allNewsItems.filter((item) => item.tinTucId !== featuredNews?.tinTucId);
  const leftColumnNews = otherNews.filter((_, i) => i % 2 === 0).slice(0, 4);
  const rightColumnNews = otherNews.filter((_, i) => i % 2 === 1).slice(0, 4);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("vi-VN");
  };

  // Component tin tức nhỏ dạng row
  const NewsRow = ({ item }: { item: ITinTuc }) => (
    <div
      onClick={() => setSelectedNews(item)}
      className="flex gap-3 p-2 cursor-pointer hover:bg-[#f5e6c8]/50 rounded-lg transition-all duration-300 group"
    >
      <div className="w-24 h-16 flex-shrink-0 overflow-hidden rounded-md border border-[#d4af37]/30">
        <img
          src={item.anhDaiDien || "/images/xumvay.jpg"}
          alt={item.tieuDe}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-[#8b0000] text-sm leading-tight mb-1 line-clamp-1 group-hover:underline">
          {item.tieuDe}
        </h4>
        <p className="text-xs text-[#5d4037] line-clamp-1 mb-1">
          {item.tomTat || item.noiDung?.substring(0, 50)}
        </p>
        <p className="text-xs text-[#8b5e3c] italic">
          Ngày tạo: {formatDate(item.ngayDang)}
        </p>
      </div>
    </div>
  );

  // Modal chi tiết tin tức
  const NewsModal = () => {
    if (!selectedNews) return null;
    return (
      <div 
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn" 
        onClick={() => setSelectedNews(null)}
      >
        <div 
          className="bg-[#fdf6e3] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-[#d4af37] animate-scaleIn" 
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            {selectedNews.anhDaiDien && (
              <img 
                src={selectedNews.anhDaiDien} 
                alt={selectedNews.tieuDe} 
                className="w-full h-64 object-cover rounded-t-2xl" 
              />
            )}
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
            >
              <X size={20} className="text-[#8b0000]" />
            </button>
          </div>
          <div className="p-6 md:p-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#8b0000] mb-4 leading-tight">
              {selectedNews.tieuDe}
            </h2>
            <div className="flex items-center gap-4 text-sm text-[#8b5e3c] mb-6 pb-4 border-b border-[#d4af37]/30">
              <span>Ngày đăng: {formatDate(selectedNews.ngayDang)}</span>
              {selectedNews.tacGia && <span>Tác giả: {selectedNews.tacGia}</span>}
            </div>
            <div className="prose prose-stone max-w-none text-[#2d2d2d] leading-relaxed whitespace-pre-line font-serif">
              {selectedNews.noiDung}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (tinTucQuery.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdf6e3]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d4af37]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 font-serif text-[#4a4a4a] bg-[#fdf6e3]">
      {/* CSS Animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {allNewsItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-stone-500">Chưa có tin tức nào</p>
          </div>
        ) : (
          <>
            {/* Tin nổi bật */}
            {featuredNews && (
              <div 
                className="flex flex-col md:flex-row gap-6 mb-10 cursor-pointer group"
                onClick={() => setSelectedNews(featuredNews)}
              >
                {/* Hình ảnh bên trái */}
                <div className="md:w-1/2 relative overflow-hidden rounded-xl border-2 border-[#d4af37]/50 shadow-lg">
                  <img
                    src={featuredNews.anhDaiDien || "/images/xumvay.jpg"}
                    alt={featuredNews.tieuDe}
                    className="w-full h-72 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <p className="absolute bottom-4 left-4 right-4 text-center text-[#5d4037] italic text-sm bg-white/80 py-2 px-4 rounded-lg">
                    {featuredNews.tomTat || "Hình ảnh con cháu sum vầy ngày tết"}
                  </p>
                </div>

                {/* Nội dung bên phải */}
                <div className="md:w-1/2 bg-[#f5e6c8]/50 rounded-xl p-6 border border-[#d4af37]/30">
                  <div className="prose prose-stone max-w-none">
                    <p className="text-[#2d2d2d] leading-relaxed text-justify first-letter:text-3xl first-letter:font-bold first-letter:text-[#8b0000] first-letter:mr-1">
                      {featuredNews.noiDung?.substring(0, 500) || "Nội dung tin tức..."}
                      {(featuredNews.noiDung?.length || 0) > 500 && "..."}
                    </p>
                    
                    <div className="mt-4 pt-4 border-t border-[#d4af37]/30">
                      <h4 className="font-bold text-[#8b0000] mb-2">Ý nghĩa và giá trị:</h4>
                      <ul className="text-sm text-[#5d4037] space-y-1 list-disc list-inside">
                        <li>Đoàn tụ gia đình: Dịp để con cháu phương xa trở về với cội nguồn</li>
                        <li>Bày tỏ lòng thành kính: Con cháu dâng quà, chúc Tết ông bà, cha mẹ</li>
                        <li>Giữ gìn nét đẹp truyền thống: Các hoạt động như gói bánh chưng, trồng nêu</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2 cột tin tức */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Cột trái - Các tin tức mới nhất */}
              <div>
                <h3 className="font-serif text-xl text-[#8b0000] mb-4 pb-2 border-b-2 border-[#d4af37]/50 italic">
                  Các tin tức mới nhất
                </h3>
                <div className="space-y-3">
                  {leftColumnNews.map((item) => (
                    <NewsRow key={item.tinTucId} item={item} />
                  ))}
                  {leftColumnNews.length === 0 && (
                    <p className="text-sm text-stone-500 italic">Chưa có tin tức</p>
                  )}
                </div>
              </div>

              {/* Cột phải - Xem thêm */}
              <div>
                <h3 className="font-serif text-xl text-[#8b0000] mb-4 pb-2 border-b-2 border-[#d4af37]/50 italic">
                  Xem thêm
                </h3>
                <div className="space-y-3">
                  {rightColumnNews.map((item) => (
                    <NewsRow key={item.tinTucId} item={item} />
                  ))}
                  {rightColumnNews.length === 0 && (
                    <p className="text-sm text-stone-500 italic">Chưa có tin tức</p>
                  )}
                </div>
              </div>
            </div>

            {/* Họa tiết chân trang */}
            <div className="mt-16 flex justify-center opacity-60">
              <svg className="w-64 h-12" viewBox="0 0 256 48" fill="none">
                <path d="M 8 24 L 64 24 M 72 24 Q 88 16 104 24 Q 120 32 128 24 Q 136 16 152 24 Q 168 32 184 24 M 192 24 L 248 24" stroke="#c9a961" strokeWidth="2" />
                <circle cx="128" cy="24" r="6" fill="#c9a961" />
              </svg>
            </div>
          </>
        )}
      </div>

      <NewsModal />
    </div>
  );
}
