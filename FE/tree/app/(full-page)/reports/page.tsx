import React from "react";
import {
  Users,
  DollarSign,
  Calendar,
  PieChart,
  TrendingUp,
  User,
} from "lucide-react";

export const BaoCaoPage: React.FC = () => {
  // --- Dữ liệu giả lập (Mock Data) ---
  const memberStats = {
    total: 452,
    male: 240,
    female: 212,
    alive: 380,
    deceased: 72,
    generations: 12,
  };

  const financeStats = {
    totalRaised: 250000000, // 250 triệu
    totalSpent: 180000000, // 180 triệu
    balance: 70000000, // 70 triệu
    recentDonations: [
      {
        name: "Ông Nguyễn Văn A",
        amount: "5.000.000 VNĐ",
        desc: "Cúng tiến xây từ đường",
      },
      { name: "Bà Lê Thị B", amount: "2.000.000 VNĐ", desc: "Quỹ khuyến học" },
      {
        name: "Gia đình chú C",
        amount: "3.000.000 VNĐ",
        desc: "Hậu cần giỗ tổ",
      },
    ],
  };

  const eventStats = {
    totalEvents: 12,
    upcoming: 2,
    participants: 1250,
  };

  // --- Components con (Sub-components) cho style ---

  // Card tiêu chuẩn với viền cổ điển
  const StatCard = ({ title, icon: Icon, children, className = "" }: any) => (
    <div
      className={`bg-[#fffdf5] rounded-lg border border-[#d4af37] shadow-[4px_4px_0px_rgba(212,175,55,0.2)] relative overflow-hidden ${className}`}
    >
      {/* Góc trang trí */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#b91c1c] rounded-tl-lg opacity-50"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#b91c1c] rounded-tr-lg opacity-50"></div>

      <div className="p-4 border-b border-[#d4af37]/30 flex items-center gap-3 bg-[#fdf6e3]">
        <div className="p-2 bg-[#b91c1c] rounded-full text-yellow-400 shadow-inner">
          <Icon size={20} />
        </div>
        <h3 className="font-display font-bold text-lg text-[#5d4037] uppercase tracking-wide">
          {title}
        </h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );

  // Thanh tiến độ (Progress bar)
  const ProgressBar = ({
    label,
    value,
    max,
    colorClass = "bg-[#b91c1c]",
  }: any) => {
    const percentage = Math.round((value / max) * 100);
    return (
      <div className="mb-4">
        <div className="flex justify-between mb-1 text-sm font-bold text-[#5d4037]">
          <span>{label}</span>
          <span>
            {value} ({percentage}%)
          </span>
        </div>
        <div className="w-full bg-[#eaddcf] rounded-full h-3 border border-[#d4af37]/30">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${colorClass}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="max-w-6xl mx-auto animate-fadeIn font-serif text-[#4a4a4a] pb-12">
      {/* Header Trang */}
      <div className="text-center mb-10 relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-1 bg-[#d4af37] opacity-50"></div>
        <h2 className="relative inline-block bg-[#fdf6e3] px-6 font-display text-3xl font-bold text-[#b91c1c] uppercase border-y-4 border-double border-[#b91c1c] py-2">
          Sổ Bộ Thống Kê
        </h2>
        <p className="text-sm italic mt-2 text-[#8b5e3c]">
          Cập nhật đến ngày 20 tháng 11 năm 2025
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* --- CỘT 1: THỐNG KÊ NHÂN ĐINH (MEMBERS) --- */}
        <div className="space-y-6">
          <StatCard title="Tổng Quan Nhân Đinh" icon={Users}>
            <div className="flex items-center justify-between mb-6">
              <div className="text-center w-full">
                <span className="text-5xl font-display font-bold text-[#b91c1c] block">
                  {memberStats.total}
                </span>
                <span className="text-sm uppercase tracking-widest text-[#8b5e3c]">
                  Tổng thành viên
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-[#f5ebe0] rounded border-l-4 border-[#8b5e3c]">
                <span>Đã qua đời</span>
                <span className="font-bold">{memberStats.deceased}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-[#f5ebe0] rounded border-l-4 border-[#d4af37]">
                <span>Còn sống</span>
                <span className="font-bold">{memberStats.alive}</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-[#f5ebe0] rounded border-l-4 border-[#b91c1c]">
                <span>Số thế hệ (Đời)</span>
                <span className="font-bold">{memberStats.generations}</span>
              </div>
            </div>
          </StatCard>

          <StatCard title="Cơ Cấu Giới Tính" icon={PieChart}>
            <ProgressBar
              label="Nam (Đinh)"
              value={memberStats.male}
              max={memberStats.total}
              colorClass="bg-[#2c5282]"
            />
            <ProgressBar
              label="Nữ"
              value={memberStats.female}
              max={memberStats.total}
              colorClass="bg-[#c53030]"
            />
            <p className="text-xs italic text-center mt-4 text-stone-500">
              * Số liệu bao gồm cả dâu, rể và con cháu ngoại.
            </p>
          </StatCard>
        </div>

        {/* --- CỘT 2: THỐNG KÊ TÀI CHÍNH (FINANCE) --- */}
        <div className="space-y-6">
          <StatCard
            title="Quỹ Dòng Họ"
            icon={DollarSign}
            className="bg-yellow-50/50"
          >
            <div className="space-y-4">
              <div className="p-4 bg-white border border-[#d4af37] rounded shadow-inner">
                <p className="text-xs text-stone-500 uppercase">
                  Tổng quỹ hiện có
                </p>
                <p className="text-3xl font-bold text-[#166534] font-display">
                  {formatMoney(financeStats.balance)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="p-2 bg-green-50 rounded border border-green-200">
                  <p className="text-green-800">Tổng thu năm nay</p>
                  <p className="font-bold text-green-700">
                    +{formatMoney(financeStats.totalRaised)}
                  </p>
                </div>
                <div className="p-2 bg-red-50 rounded border border-red-200">
                  <p className="text-red-800">Tổng chi năm nay</p>
                  <p className="font-bold text-red-700">
                    -{formatMoney(financeStats.totalSpent)}
                  </p>
                </div>
              </div>
            </div>
          </StatCard>

          <StatCard title="Bảng Vàng Công Đức" icon={TrendingUp}>
            <div className="overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-[#8b5e3c] uppercase bg-[#eaddcf]">
                  <tr>
                    <th className="px-2 py-2">Người góp</th>
                    <th className="px-2 py-2 text-right">Số tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {financeStats.recentDonations.map((d, i) => (
                    <tr
                      key={i}
                      className="border-b border-[#d4af37]/20 hover:bg-[#fff8e1]"
                    >
                      <td className="px-2 py-3">
                        <div className="font-bold text-[#5d4037]">{d.name}</div>
                        <div className="text-xs text-stone-500 italic">
                          {d.desc}
                        </div>
                      </td>
                      <td className="px-2 py-3 text-right font-bold text-[#b91c1c]">
                        {d.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="w-full text-center text-xs text-[#b91c1c] mt-4 hover:underline font-bold uppercase">
                Xem toàn bộ danh sách
              </button>
            </div>
          </StatCard>
        </div>

        {/* --- CỘT 3: THỐNG KÊ SỰ KIỆN (EVENTS) --- */}
        <div className="space-y-6">
          <StatCard title="Sự Kiện Trong Năm" icon={Calendar}>
            <div className="flex justify-center gap-8 mb-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full border-4 border-[#b91c1c] flex items-center justify-center text-2xl font-bold text-[#b91c1c] bg-white shadow-md mx-auto mb-2">
                  {eventStats.totalEvents}
                </div>
                <span className="text-xs font-bold text-[#5d4037] uppercase">
                  Đã tổ chức
                </span>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full border-4 border-[#d97706] flex items-center justify-center text-2xl font-bold text-[#d97706] bg-white shadow-md mx-auto mb-2">
                  {eventStats.upcoming}
                </div>
                <span className="text-xs font-bold text-[#5d4037] uppercase">
                  Sắp tới
                </span>
              </div>
            </div>
            <div className="bg-[#f5ebe0] p-4 rounded border border-[#d4af37]/30">
              <div className="flex items-center gap-3 mb-2">
                <Users size={16} className="text-[#8b5e3c]" />
                <span className="font-bold text-[#5d4037]">
                  {eventStats.participants} lượt người
                </span>
              </div>
              <p className="text-sm text-stone-600">
                Đã tham gia các hoạt động dòng họ (Giỗ tổ, Khuyến học, Tảo
                mộ...)
              </p>
            </div>
          </StatCard>

          {/* Widget phụ: Sắp tới */}
          <div className="bg-[#b91c1c] text-yellow-400 rounded-lg p-4 shadow-lg border-2 border-[#d4af37] relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 text-white opacity-10">
              <Calendar size={100} />
            </div>
            <h4 className="font-display font-bold text-lg uppercase mb-2 border-b border-yellow-400/30 pb-1">
              Sự kiện sắp tới
            </h4>
            <div className="space-y-3 relative z-10">
              <div className="bg-black/20 p-2 rounded">
                <span className="block text-xs text-yellow-200">
                  15/12/2025
                </span>
                <span className="font-bold">Lễ trao thưởng Khuyến Học</span>
              </div>
              <div className="bg-black/20 p-2 rounded">
                <span className="block text-xs text-yellow-200">
                  20/01/2026
                </span>
                <span className="font-bold">Tất niên dòng họ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
