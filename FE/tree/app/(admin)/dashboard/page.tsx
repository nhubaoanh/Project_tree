"use client";
import { useState, useEffect } from "react";
import {
  Users, Calendar, UserPlus, GitBranch, Heart, Loader2,
  ChevronDown, Wallet, CalendarDays, ArrowDownCircle, ArrowUpCircle,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import {
  getDashboardStats, getThanhVienMoiNhat, getThongKeTheoDoi, getThongKeThuChi,
  getThongKeThuChiTheoThang, getThongKeSuKien, getSuKienSapToi,
} from "@/service/thongke.service";
import { getDongHoById } from "@/service/dongho.service";
import storage from "@/utils/storage";

const KPICard = ({
  title,
  value,
  ratio,
  percentage,
  icon: Icon,
  bgColor,
}: any) => (
  <div className={`${bgColor} rounded-2xl p-3 shadow-lg`}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-white/80 text-xxs font-medium mb-1">{title}</p>
        <p className="text-white text-2xl font-bold">{value}</p>
        {ratio && percentage && (
          <div className="flex items-center gap-2 mt-2">
            <span className="text-white/70 text-sm">{ratio}</span>
            <span className="text-white/70 text-sm">|</span>
            <span className="text-white/70 text-sm">{percentage}</span>
          </div>
        )}
      </div>
      <div className="bg-white/20 p-3 rounded-xl">
        <Icon size={22} className="text-white" />
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const [selectedDongHoId, setSelectedDongHoId] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

  useEffect(() => {
    const userData = storage.getUser();
    setUser(userData);
    if (userData?.dongHoId) setSelectedDongHoId(userData.dongHoId);
  }, []);

  const { data: dongHoData } = useQuery({
    queryKey: ["my-dongho", user?.dongHoId],
    queryFn: () => getDongHoById(user?.dongHoId),
    enabled: !!user?.dongHoId,
  });

  const { data: statsData, isLoading } = useQuery({
    queryKey: ["dashboard-stats", selectedDongHoId],
    queryFn: () => getDashboardStats(selectedDongHoId || undefined),
  });

  const { data: theoDoiData } = useQuery({
    queryKey: ["thongke-theodoi", selectedDongHoId],
    queryFn: () => getThongKeTheoDoi(selectedDongHoId),
    enabled: !!selectedDongHoId,
  });

  const { data: moiNhatData } = useQuery({
    queryKey: ["thanhvien-moinhat", selectedDongHoId],
    queryFn: () => getThanhVienMoiNhat(selectedDongHoId || undefined, 5),
  });

  const { data: thuChiData } = useQuery({
    queryKey: ["thongke-thuchi", selectedDongHoId, selectedYear],
    queryFn: () => getThongKeThuChi(selectedDongHoId, selectedYear),
    enabled: !!selectedDongHoId,
  });

  const { data: thuChiThangData } = useQuery({
    queryKey: ["thongke-thuchi-theothang", selectedDongHoId, selectedYear],
    queryFn: () => getThongKeThuChiTheoThang(selectedDongHoId, selectedYear),
    enabled: !!selectedDongHoId,
  });

  const { data: suKienData } = useQuery({
    queryKey: ["thongke-sukien", selectedDongHoId, selectedYear],
    queryFn: () => getThongKeSuKien(selectedDongHoId, selectedYear),
    enabled: !!selectedDongHoId,
  });

  const { data: suKienSapToiData } = useQuery({
    queryKey: ["sukien-saptoi", selectedDongHoId],
    queryFn: () => getSuKienSapToi(selectedDongHoId || undefined, 5),
  });

  const stats = statsData?.data;
  const theoDoi = theoDoiData?.data || [];
  const moiNhat = moiNhatData?.data || [];
  const thuChi = thuChiData?.data;
  const thuChiTheoThang = thuChiThangData?.data || [];
  const suKien = suKienData?.data;
  const suKienSapToi = suKienSapToiData?.data || [];
  const selectedDongHo = dongHoData?.data;

  const generationData = theoDoi.map((item: any) => ({
    name: `Đời ${item.doi}`,
    nam: item.soNam,
    nu: item.soNu,
  }));

  const thuChiChartData = thuChiTheoThang.map((item: any) => ({
    name: `T${item.thang}`,
    thu: item.tongThu || 0,
    chi: item.tongChi || 0,
  }));

  const formatDate = (date: string) => date ? new Date(date).toLocaleDateString("vi-VN") : "";
  const formatMoney = (amount: number) => {
    if (!amount) return "0đ";
    if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}tr`;
    if (amount >= 1000) return `${(amount / 1000).toFixed(0)}k`;
    return `${amount}đ`;
  };

  return (
    <div className="min-h-screen p-2">
      {/* Header với bộ lọc */}
      <div className="flex flex-col gap-4 mb-4">
        {/* Tiêu đề */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-xl font-bold text-[#1e3a5f]">
              Tổng Quan Gia Phả - {selectedDongHo?.tenDongHo ? `${selectedDongHo.tenDongHo}` : ""}
            </h3>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <Loader2 className="animate-spin text-[#d4af37]" size={48} />
        </div>
      ) : (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            <KPICard
              title="Tổng Thành Viên"
              value={stats?.tongThanhVien || 0}
              icon={Users}
              bgColor="bg-gradient-to-br from-[#1e3a5f] to-[#2c5282]"
            />
            <KPICard
              title="Nam Giới"
              value={stats?.tongNam || 0}
              ratio={`${stats?.tongNam || 0}/${stats?.tongThanhVien || 0}`}
              percentage={`${Math.round(
                (stats?.tongNam / (stats?.tongThanhVien || 1)) * 100
              )}%`}
              icon={UserPlus}
              bgColor="bg-gradient-to-br from-[#d4af37] to-[#a16207]"
            />
            <KPICard
              title="Nữ Giới"
              value={stats?.tongNu || 0}
              ratio={`${stats?.tongNu || 0}/${stats?.tongThanhVien || 0}`}
              percentage={`${Math.round(
                (stats?.tongNu / (stats?.tongThanhVien || 1)) * 100
              )}%`}
              icon={Heart}
              bgColor="bg-gradient-to-br from-[#b91c1c] to-[#991b1b]"
            />
            <KPICard
              title="Số Đời"
              value={stats?.doiCaoNhat || 0}
              icon={GitBranch}
              bgColor="bg-gradient-to-br from-[#5d4037] to-[#3e2723]"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-5">
            {/* Bar Chart - Thống kê theo đời - 2 cột BÊN TRÁI */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-[#1e3a5f]">Thống Kê Theo Đời</h3>
                <div className="flex gap-4 text-xs">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded bg-[#1e3a5f]"></span> Nam
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded bg-[#d4af37]"></span> Nữ
                  </span>
                </div>
              </div>
              {generationData.length > 0 ? (
                <div className="h-[400px]">
                  <ResponsiveContainer>
                    <BarChart
                      data={generationData}
                      margin={{ top: 10, right: 10, left: -10, bottom: 5 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#f0f0f0"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="name"
                        stroke="#9ca3af"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#9ca3af"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: 12,
                          border: "none",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Bar
                        dataKey="nam"
                        fill="#1e3a5f"
                        radius={[6, 6, 0, 0]}
                        barSize={24}
                      />
                      <Bar
                        dataKey="nu"
                        fill="#d4af37"
                        radius={[6, 6, 0, 0]}
                        barSize={24}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[400px] flex items-center justify-center text-gray-400">
                  Chưa có dữ liệu
                </div>
              )}
            </div>

            {/* Quick Stats - 1 cột BÊN PHẢI */}
            <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
              <h2 className="font-bold text-[#1e3a5f] mb-3 text-xxs">
                Sự Kiện Sắp Tới
              </h2>
              {suKienSapToi.length > 0 ? (
                <div className="space-y-2">
                  {suKienSapToi.slice(0, 5).map((event: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                    >
                      <div className="w-10 h-10 bg-[#d4af37] rounded-lg flex items-center justify-center text-white">
                        <CalendarDays size={16} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xl font-semibold text-[#1e3a5f] truncate">
                          {event.tenSuKien}
                        </p>
                        <p className="text-[15px] text-gray-400">
                          {formatDate(event.ngayDienRa)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-400 text-center py-4">
                  Không có sự kiện
                </p>
              )}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Area Chart - Thu Chi - 3 phần */}
            <div className="lg:col-span-3 bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#1e3a5f]">Thu Chi Theo Tháng</h3>

                {/* Bộ lọc năm */}
                <div className="relative">
                  <button
                    onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-all"
                  >
                    <CalendarDays size={14} className="text-[#d4af37]" />
                    <span className="text-sm font-medium text-[#1e3a5f]">
                      {selectedYear}
                    </span>
                    <ChevronDown
                      size={12}
                      className={`text-gray-400 transition-transform ${
                        isYearDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isYearDropdownOpen && (
                    <div className="absolute top-full right-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto z-50">
                      {years.map((year) => (
                        <button
                          key={year}
                          onClick={() => {
                            setSelectedYear(year);
                            setIsYearDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-2 text-left hover:bg-gray-50 text-sm ${
                            selectedYear === year
                              ? "bg-[#fdf6e3] text-[#d4af37] font-semibold"
                              : "text-gray-700"
                          }`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {thuChiChartData.length > 0 ? (
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={thuChiChartData}
                      margin={{ top: 10, right: 10, left: -10, bottom: 5 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorThu"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#1e3a5f"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#1e3a5f"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorChi"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#d4af37"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#d4af37"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#f0f0f0"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="name"
                        stroke="#9ca3af"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#9ca3af"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(v) => formatMoney(v)}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: 12,
                          border: "none",
                          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        }}
                        formatter={(value: number) => formatMoney(value)}
                      />
                      <Area
                        type="monotone"
                        dataKey="thu"
                        stroke="#1e3a5f"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorThu)"
                      />
                      <Area
                        type="monotone"
                        dataKey="chi"
                        stroke="#d4af37"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorChi)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-gray-400">
                  Chưa có dữ liệu
                </div>
              )}
              <div className="flex justify-center gap-6 mt-3">
                <span className="flex items-center gap-2 text-xs">
                  <span className="w-3 h-3 rounded-full bg-[#1e3a5f]"></span>{" "}
                  Thu
                </span>
                <span className="flex items-center gap-2 text-xs">
                  <span className="w-3 h-3 rounded-full bg-[#d4af37]"></span>{" "}
                  Chi
                </span>
              </div>
            </div>

            {/* Upcoming Events - 2 phần */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
              <h2 className="font-bold text-[#1e3a5f] mb-3">Thống Kê Nhanh</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                  <span className="text-xxs text-gray-600 flex items-center gap-2">
                    <ArrowDownCircle size={14} className="text-green-600" />{" "}
                    Tổng thu
                  </span>
                  <span className="font-bold text-green-600 text-sm">
                    {formatMoney(thuChi?.tongThu || 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                  <span className="text-xxs text-gray-600 flex items-center gap-2">
                    <ArrowUpCircle size={14} className="text-red-600" /> Tổng
                    chi
                  </span>
                  <span className="font-bold text-red-600 text-sm">
                    {formatMoney(thuChi?.tongChi || 0)}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                  <span className="text-xxs text-gray-600 flex items-center gap-2">
                    <Wallet size={14} className="text-blue-600" /> Số dư
                  </span>
                  <span className="font-bold text-blue-600 text-sm">
                    {formatMoney(
                      (thuChi?.tongThu || 0) - (thuChi?.tongChi || 0)
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 bg-amber-50 rounded-lg">
                  <span className="text-xxs text-gray-600 flex items-center gap-2">
                    <Calendar size={14} className="text-amber-600" /> Sự kiện
                  </span>
                  <span className="font-bold text-amber-600 text-sm">
                    {suKien?.tongSuKien || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Members List */}
          <div className="mt-6 bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
            <h3 className="font-bold text-[#1e3a5f] mb-4">
              Thành Viên Mới Thêm
            </h3>
            {moiNhat.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {moiNhat.map((member: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm
                      ${
                        member.gioiTinh === 1 ? "bg-[#1e3a5f]" : "bg-[#d4af37]"
                      }`}
                    >
                      {member.hoTen?.charAt(0) || "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xl font-semibold text-[#1e3a5f] truncate">
                        {member.hoTen}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        Đời {member.doiThuoc || "?"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">
                Chưa có thành viên nào
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
