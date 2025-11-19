import React from "react";

export const PhaKyPage: React.FC = () => {
  return (
    <div className="prose prose-stone prose-lg text-justify leading-relaxed text-[#2d2d2d] max-w-none animate-fadeIn">
      {/* Container hình ảnh dùng Float Left để chữ chảy bao quanh */}
      <div className="float-none lg:float-left lg:w-[45%] lg:mr-8 mb-6 not-prose flex flex-col items-center relative z-10">
        <div className="relative p-3 border-[6px] border-double border-[#8b5e3c] bg-[#fdf6e3] shadow-[4px_4px_15px_rgba(0,0,0,0.2)] transform -rotate-1 hover:rotate-0 transition-all duration-500">
          {/* Viền trang trí bên trong */}
          <div className="absolute inset-0 border border-[#d4af37] m-1 pointer-events-none z-20"></div>

          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Hung_King_Temple_Painting.jpg/640px-Hung_King_Temple_Painting.jpg"
            alt="Hùng Vương"
            className="w-full h-auto object-cover grayscale-[10%] sepia-[40%] rounded-sm block"
          />
          <p className="text-center mt-3 font-display italic text-base text-[#5d4037] bg-[#eaddcf]/40 py-1 px-4 rounded">
            Tranh minh họa: Quốc Tổ Hùng Vương
          </p>
        </div>
      </div>

      {/* Nội dung văn bản */}
      <div className="relative">
        <h2 className="font-display text-4xl text-[#8b0000] border-b-4 border-double border-[#d4af37] pb-2 mb-6 inline-block mt-0">
          Lược Sử Dòng Họ
        </h2>

        <p className="first-letter:text-6xl first-letter:font-display first-letter:text-[#8b0000] first-letter:float-left first-letter:mr-3 first-letter:font-bold first-letter:leading-none">
          Hùng Vương (chữ Hán: 雄王) là cách gọi dành cho các vị vua nước Văn
          Lang của người Lạc Việt, tồn tại vào khoảng thế kỷ 7 tới thế kỷ 2 TCN.
          Câu chuyện các vua Hùng không có trong chính sử mà nằm trong các
          truyền thuyết dân gian của người Việt được kể lại qua nhiều đời.
        </p>
        <p>
          Với người Việt Nam, các vua Hùng đại diện cho tổ tiên, cho truyền
          thống dựng nước và là niềm tự hào về nền văn minh đậm đà bản sắc riêng
          suốt nhiều nghìn năm.
        </p>

        <h3 className="font-display text-2xl text-[#8b5e3c] mt-8 mb-4 flex items-center">
          <span className="inline-block w-2 h-8 bg-[#8b0000] mr-3"></span>
          Các đời Hùng Vương
        </h3>
        <p>
          Theo Đại Việt sử lược và nhiều tài liệu khác, triều đại Hùng Vương
          được truyền qua 18 đời, gồm những vị sau:
        </p>
        <ul className="list-none pl-2 space-y-3 mt-4 text-lg bg-[#fffdf5] p-6 rounded-lg border border-[#d4af37]/30 shadow-inner">
          <li className="flex items-start">
            <span className="text-[#8b0000] font-bold mr-2 min-w-[24px]">
              1.
            </span>
            <span>
              <strong>Kinh Dương Vương</strong>, húy Lộc Tục, sinh năm Nhâm Ngọ
              (2919 tr. TL).
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-[#8b0000] font-bold mr-2 min-w-[24px]">
              2.
            </span>
            <span>
              <strong>Lạc Long Quân</strong>, húy Sùng Lãm, sinh năm Bính Thìn
              (2825 tr. TL).
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-[#8b0000] font-bold mr-2 min-w-[24px]">
              3.
            </span>
            <span>
              <strong>Hùng Quốc Vương</strong>, húy Hùng Lân, sinh năm Canh Ngọ
              (2570 tr. TL).
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-[#8b0000] font-bold mr-2 min-w-[24px]">
              4.
            </span>
            <span>
              <strong>Hùng Hoa Vương</strong>, húy Bửu Lang, lên ngôi năm Đinh
              Hợi (2252 tr. TL).
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-[#8b0000] font-bold mr-2 min-w-[24px]">
              5.
            </span>
            <span>
              <strong>Hùng Hy Vương</strong>, húy Bảo Lang, sinh năm Tân Mùi
              (2030 tr. TL).
            </span>
          </li>
          <li className="italic text-stone-500 ml-8">
            ... (Danh sách còn tiếp đến đời thứ 18)
          </li>
        </ul>

        <h3 className="font-display text-2xl text-[#8b5e3c] mt-8 mb-4 flex items-center">
          <span className="inline-block w-2 h-8 bg-[#8b0000] mr-3"></span>Ý
          nghĩa lịch sử
        </h3>
        <p>
          Thời đại Hùng Vương là giai đoạn rất quan trọng trong lịch sử Việt
          Nam. Nó đã xây dựng nên nền tảng văn hóa, tín ngưỡng và truyền thống
          yêu nước, đoàn kết của dân tộc. Những di tích lịch sử như Đền Hùng
          (Phú Thọ) là minh chứng sống động cho thời kỳ này.
        </p>
      </div>
    </div>
  );
};
