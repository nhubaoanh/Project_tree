import React from "react";

export default function TinTucPage() {
  const [showAll, setShowAll] = React.useState(false);
  
  // Dữ liệu giả lập cho danh sách tin tức
  const allNewsItems = [
    {
      id: 1,
      title: "Họp họ ngày tết vui vẻ",
      desc: "Chuẩn bị cho buổi họp họ đầu năm mới với nhiều hoạt động thú vị",
      date: "15/11/2025",
      image: "images/xumvay.jpg",
    },
    {
      id: 2,
      title: "Lễ giỗ tổ Hùng Vương",
      desc: "Thông báo lịch tổ chức lễ giỗ tổ Hùng Vương năm 2025",
      date: "10/11/2025",
      image: "images/den-hung.jpg",
    },
    {
      id: 3,
      title: "Hỗ trợ học bổng",
      desc: "Kế hoạch trao học bổng cho con em trong dòng họ năm học mới",
      date: "05/11/2025",
      image: "images/hoc-bong.jpg",
    },
    {
      id: 4,
      title: "Gặp mặt đầu xuân",
      desc: "Thông báo chương trình gặp mặt đầu xuân 2026",
      date: "01/11/2025",
      image: "images/tet.jpg",
    },
    {
      id: 5,
      title: "Tu bổ nhà thờ họ",
      desc: "Kế hoạch tu bổ, nâng cấp nhà thờ họ năm 2025",
      date: "25/10/2025",
      image: "images/nha-tho-ho.jpg",
    },
  ];
  
  // Hiển thị 3 tin mới nhất mặc định, hoặc tất cả nếu đã nhấn Xem thêm
  const displayedNews = showAll ? allNewsItems : allNewsItems.slice(0, 3);

  const NewsItem = ({ item }: { item: any }) => (
    <div className="flex gap-3 group cursor-pointer bg-white/60 p-3 rounded-lg transition-all border border-[#d4af37]/20">
      <div className="w-24 h-20 flex-shrink-0 overflow-hidden rounded border border-[#d4af37]/50">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h4 className="font-display text-base font-bold text-[#2d2d2d] group-hover:text-[#8b0000] transition-colors leading-tight mb-1">
          {item.title}
        </h4>
        <p className="text-xs text-stone-500 mb-1">{item.desc}</p>
        <span className="text-xs text-[#8b5e3c] font-semibold">
          Ngày tạo: {item.date}
        </span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-8 px-4 font-serif text-[#4a4a4a]">
      <div className="max-w-7xl mx-auto">
        {/* --- PHẦN TRÊN: BÀI VIẾT NỔI BẬT --- */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          {/* Cột trái: Hình ảnh */}
          <div className="lg:w-1/2">
            <div className="relative p-3 bg-white shadow-xl">
              <img
                src="\images\phuc.jpg"
                alt="Tết sum vầy"
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="text-center font-display italic text-lg mt-4 text-[#2d2d2d]">
              Hình ảnh con cháu sum vầy ngày tết
            </p>
          </div>

          {/* Cột phải: Nội dung văn bản */}
          <div className="lg:w-1/2 space-y-4 text-justify leading-relaxed text-[#2d2d2d]">
            <p className="text-base">
              Tết sum vầy con cháu là dịp để mọi thành viên trong gia đình quây
              quần, đoàn tụ bên nhau sau một năm làm việc vất vả, thể hiện
              truyền thống văn hóa Việt. Đây là thời điểm con cháu thể hiện lòng
              biết ơn, báo hiếu ông bà, cha mẹ và cùng nhau tạo nên những kỷ
              niệm ấm áp thông qua các hoạt động như gói bánh chưng, trang trí
              nhà cửa, chúc Tết đầu năm.
            </p>

            <div>
              <h3 className="font-bold text-[#8b0000] mb-3 text-lg">
                Ý nghĩa và giá trị
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#d4af37] mt-1">•</span>
                  <span>
                    <strong>Đoàn tụ gia đình:</strong> Tết là dịp để con cháu
                    phương xa trở về với cội nguồn, gác lại bộn bề cuộc sống để
                    sum họp bên gia đình.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d4af37] mt-1">•</span>
                  <span>
                    <strong>Bày tỏ lòng thành kính:</strong> Con cháu dâng quà,
                    chúc Tết ông bà, cha mẹ, thể hiện lòng biết ơn và mong ước
                    về sức khỏe, bình an cho cả gia đình.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d4af37] mt-1">•</span>
                  <span>
                    <strong>Giữ gìn nét đẹp truyền thống:</strong> Các hoạt động
                    như gói bánh chưng, trông nồi bánh, hái lộc đầu xuân không
                    chỉ là nghi lễ mà còn là cách gìn giữ hồn cốt văn hóa dân
                    tộc.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#d4af37] mt-1">•</span>
                  <span>
                    <strong>Tạo dựng kỷ niệm:</strong> Những khoảnh khắc quây
                    quần, trò chuyện, cùng nhau thưởng thức mứt Tết, nhấp một
                    chút rượu vang là những kỷ niệm quý giá và thiêng liêng
                    nhất.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* --- PHẦN DƯỚI: DANH SÁCH TIN TỨC --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative mt-16">
          {/* Đường kẻ dọc phân cách ở giữa (chỉ hiện trên màn hình lớn) */}
          <div className="hidden lg:block absolute left-1/2 top-12 bottom-0 w-px bg-[#d4af37]/40 -translate-x-1/2"></div>

          {/* Cột 1: Các tin tức mới nhất */}
          <div className="pr-0 lg:pr-6">
            <h3 className="font-display text-2xl text-[#2d2d2d] italic mb-6 pb-2 relative inline-block">
              Các tin tức mới nhất
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#d4af37] to-transparent"></div>
            </h3>
            <div className="space-y-4">
              {displayedNews.map((item) => (
                <NewsItem key={`news-${item.id}`} item={item} />
              ))}
              {!showAll && allNewsItems.length > 3 && (
                <div className="text-center mt-6">
                  <button 
                    onClick={() => setShowAll(true)}
                    className="px-6 py-2 bg-[#8b5e3c] text-white rounded-full hover:bg-[#8b0000] transition-colors duration-300 text-sm font-medium"
                  >
                    Xem thêm tin tức
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Cột 2: Sự kiện sắp diễn ra */}
          <div className="pl-0 lg:pl-6">
            <h3 className="font-display text-2xl text-[#2d2d2d] italic mb-6 pb-2 relative inline-block">
              Sự kiện sắp diễn ra
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#d4af37] to-transparent"></div>
            </h3>
            <div className="space-y-4">
              {allNewsItems.slice(0, 2).map((item) => (
                <NewsItem key={`event-${item.id}`} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Họa tiết trang trí chân trang */}
        <div className="mt-16 flex justify-center opacity-40">
          <svg className="w-64 h-12" viewBox="0 0 256 48" fill="none">
            <path
              d="M 8 24 L 64 24 M 72 24 Q 88 16 104 24 Q 120 32 128 24 Q 136 16 152 24 Q 168 32 184 24 M 192 24 L 248 24"
              stroke="#c9a961"
              strokeWidth="2"
            />
            <circle cx="128" cy="24" r="6" fill="#c9a961" />
            <path
              d="M 120 16 L 128 8 L 136 16"
              stroke="#c9a961"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M 120 32 L 128 40 L 136 32"
              stroke="#c9a961"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
