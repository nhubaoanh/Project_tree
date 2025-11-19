import React from "react";
import { Clock } from "lucide-react";

export const SuKienPage: React.FC = () => {
  const events = [
    {
      year: "2024",
      title: "Lễ Giỗ Tổ Hùng Vương",
      desc: "Dòng họ tổ chức lễ dâng hương tại Đền Hùng, Phú Thọ với sự tham gia của 500 con cháu.",
    },
    {
      year: "2023",
      title: "Khánh thành Từ Đường mới",
      desc: "Hoàn thành việc tu bổ và xây dựng mới Từ Đường tại quê gốc sau 2 năm thi công.",
    },
    {
      year: "2020",
      title: "Thành lập Quỹ Khuyến Học",
      desc: "Ra mắt quỹ khuyến học dòng họ để hỗ trợ con cháu đỗ đạt cao.",
    },
    {
      year: "1990",
      title: "Tìm lại cuốn Phả Ký gốc",
      desc: "May mắn tìm thấy cuốn gia phả cổ viết bằng chữ Hán Nôm bị thất lạc trong chiến tranh.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="font-display text-3xl text-[#8b0000] text-center mb-10 border-b-2 border-[#d4af37] pb-4 inline-block w-full">
        Sự Kiện Dòng Tộc
      </h2>

      <div className="relative border-l-4 border-[#d4af37]/50 ml-4 md:ml-10 space-y-10 pl-8 md:pl-12 py-4">
        {events.map((event, index) => (
          <div key={index} className="relative group">
            {/* Dot on timeline */}
            <div className="absolute -left-[46px] md:-left-[62px] top-1 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-[#8b0000] border-4 border-[#fdf6e3] shadow-md z-10"></div>
            </div>

            {/* Card Content */}
            <div className="bg-[#fffdf5] p-6 rounded-lg border border-[#d4af37]/30 shadow-[4px_4px_0px_rgba(139,94,60,0.1)] hover:shadow-[4px_4px_0px_rgba(139,94,60,0.3)] transition-all border-l-4 border-l-[#8b0000]">
              <div className="flex items-center gap-2 text-[#8b5e3c] font-bold font-display text-xl mb-2">
                <Clock size={20} />
                <span>{event.year}</span>
              </div>
              <h3 className="text-xl font-bold text-[#2d2d2d] mb-2">
                {event.title}
              </h3>
              <p className="text-stone-600 leading-relaxed">{event.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
