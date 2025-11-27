import React from "react";

export default function TinTucPage(){
  // Dữ liệu giả lập cho danh sách tin tức
  const newsItems = Array(4).fill({
    title: "Họp họ ngày tết vui vẻ",
    desc: "Mô tả ngắn gọn về sự kiện",
    date: "15/11/2025",
    image: "https://cdn.balkan.app/shared/m60/1.jpg", // Placeholder ảnh
  });

  const NewsItem = ({ item }: { item: any }) => (
    <div className="flex gap-4 group cursor-pointer">
      <div className="w-32 h-24 flex-shrink-0 overflow-hidden rounded border border-[#d4af37]/50">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h4 className="font-display text-lg font-bold text-[#2d2d2d] group-hover:text-[#8b0000] transition-colors">
          {item.title}
        </h4>
        <p className="text-sm text-stone-500 italic mb-1">{item.desc}</p>
        <span className="text-xs text-[#8b5e3c] font-semibold">
          Ngày tạo: {item.date}
        </span>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto pb-12 font-serif text-[#4a4a4a]">
      {/* --- PHẦN TRÊN: BÀI VIẾT NỔI BẬT --- */}
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* Cột trái: Hình ảnh */}
        <div className="lg:w-1/2">
          <div className="relative p-2 border border-[#d4af37] bg-white/50 shadow-md rotate-[-1deg] hover:rotate-0 transition-transform duration-500">
            <img
              src="https://img.freepik.com/premium-vector/vietnamese-traditional-family-reunion-tet-holiday-lunar-new-year-vector-flat-illustration_1068304-19.jpg"
              alt="Tết sum vầy"
              className="w-full h-auto object-cover"
            />
          </div>
          <p className="text-center font-display italic text-xl mt-3 text-[#2d2d2d]">
            Hình ảnh con cháu sum vầy ngày tết
          </p>
        </div>

        {/* Cột phải: Nội dung văn bản */}
        <div className="lg:w-1/2 space-y-4 text-justify leading-relaxed">
          <p>
            Tết sum vầy con cháu là dịp để mọi thành viên trong gia đình quây
            quần, đoàn tụ bên nhau sau một năm làm việc vất vả, thể hiện truyền
            thống văn hóa Việt. Đây là thời điểm con cháu thể hiện lòng biết ơn,
            báo hiếu ông bà, cha mẹ và cùng nhau tạo nên những kỷ niệm ấm áp
            thông qua các hoạt động như gói bánh chưng, trang trí nhà cửa, chúc
            Tết đầu năm.
          </p>

          <div>
            <h3 className="font-bold text-[#2d2d2d] mb-2">
              Ý nghĩa và giá trị
            </h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Đoàn tụ gia đình: Tết là dịp để con cháu phương xa trở về với
                cội nguồn, gác lại bộn bề cuộc sống để sum họp bên gia đình.
              </li>
              <li>
                Bày tỏ lòng thành kính: Con cháu dâng quà, chúc Tết ông bà, cha
                mẹ, thể hiện lòng biết ơn và mong ước về sức khỏe, bình an cho
                cả gia đình.
              </li>
              <li>
                Giữ gìn nét đẹp truyền thống: Các hoạt động như gói bánh chưng,
                trông nồi bánh, hái lộc đầu xuân không chỉ là nghi lễ mà còn là
                cách gìn giữ hồn cốt văn hóa dân tộc.
              </li>
              <li>
                Tạo dựng kỷ niệm: Những khoảnh khắc quây quần, trò chuyện, cùng
                nhau thưởng thức mứt Tết, nhấp một chút rượu vang là những kỷ
                niệm quý giá và thiêng liêng nhất.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* --- PHẦN DƯỚI: DANH SÁCH TIN TỨC --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative mt-16">
        {/* Đường kẻ dọc phân cách ở giữa (chỉ hiện trên màn hình lớn) */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-[#d4af37]/50 -translate-x-1/2"></div>

        {/* Cột 1: Các tin tức mới nhất */}
        <div className="pr-0 lg:pr-8">
          <h3 className="font-display text-2xl text-[#2d2d2d] italic border-b-2 border-[#d4af37] inline-block mb-8 pb-1">
            Các tin tức mới nhất
          </h3>
          <div className="space-y-6">
            {newsItems.map((item, idx) => (
              <NewsItem key={`latest-${idx}`} item={item} />
            ))}
          </div>
        </div>

        {/* Cột 2: Xem thêm */}
        <div className="pl-0 lg:pl-8">
          <h3 className="font-display text-2xl text-[#2d2d2d] italic border-b-2 border-[#d4af37] inline-block mb-8 pb-1">
            Xem thêm
          </h3>
          <div className="space-y-6">
            {newsItems.map((item, idx) => (
              <NewsItem key={`more-${idx}`} item={item} />
            ))}
          </div>
        </div>
      </div>

      {/* Họa tiết trang trí chân trang */}
      <div className="mt-16 flex justify-center opacity-50">
        <img
          src="https://cdn.balkan.app/shared/f1.png"
          alt="decoration"
          className="w-64"
        />
      </div>
    </div>
  );
};
