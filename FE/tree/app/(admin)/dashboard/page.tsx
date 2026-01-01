"use client";
import React, { useState, useEffect } from "react";
import {
  Users,
  Calendar,
  TrendingUp,
  TrendingDown,
  UserPlus,
  GitBranch,
  Heart,
  Loader2,
  ChevronDown,
  Wallet,
  CalendarDays,
  ArrowDownCircle,
  ArrowUpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import {
  getDashboardStats,
  getThanhVienMoiNhat,
  getThongKeTheoDoi,
  getThongKeThuChi,
  getThongKeThuChiTheoThang,
  getThongKeSuKien,
  getSuKienSapToi,
  IThongKeTheoDoi,
} from "@/service/thongke.service";
import { getAllDongHo, getDongHoById, IDongHo } from "@/service/dongho.service";
import storage from "@/utils/storage";

const COLORS = ["#1e3a5f", "#d4af37", "#b91c1c", "#5d4037", "#2c5282", "#a16207"];

// Mini Calendar Component
const MiniCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const today = new Date();

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", 
                      "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = day === today.getDate() && 
                    currentDate.getMonth() === today.getMonth() && 
                    currentDate.getFullYear() === today.getFullYear();
    days.push(
      <div key={day} className={`w-8 h-8 flex items-center justify-center text-xs rounded-full cursor-pointer transition-all
        ${isToday ? "bg-[#d4af37] text-white font-bold" : "hover:bg-[#fdf6e3] text-[#5d4037]"}`}>
        {day}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-full"><ChevronLeft size={16} /></button>
        <span className="font-semibold text-[#5d4037] text-sm">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
        <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-full"><ChevronRight size={16} /></button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map(d => (
          <div key={d} className="w-8 h-6 flex items-center justify-center text-[10px] font-semibold text-[#8b5e3c]">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{days}</div>
    </div>
  );
};

// KPI Card Component
const KPICard = ({ title, value, trend, trendValue, icon: Icon, bgColor, iconBg }: any) => (
  <div className={`${bgColor} rounded-2xl p-5 shadow-lg relative overflow-hidden`}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-white/80 text-xs font-medium mb-1">{title}</p>
        <p className="text-white text-2xl font-bold">{value}</p>
        {trend && (
          <div className={`flex items-center gap-1 mt-2 text-xs ${trend === "up" ? "text-green-300" : "text-red-300"}`}>
            {trend === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      <div className={`${iconBg} p-3 rounded-xl`}>
        <Icon size={22} className="text-white" />
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const [selectedDongHoId, setSelectedDongHoId] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const currentYear = new Date().getFullYear();

  // Lấy thông tin user
  const [user, setUser] = useState<any>(null);
  const isAdmin = user?.roleCode === "sa";

  useEffect(() => {
    const userData = storage.getUser();
    setUser(userData);
    setIsReady(true);
    
    // Non-Admin: tự động set dongHoId của mình
    if (userData && userData.roleCode !== "sa" && userData.dongHoId) {
      setSelectedDongHoId(userData.dongHoId);
    }
  }, []);

  // Admin: fetch tất cả dòng họ
  const dongHoQuery = useQuery({ 
    queryKey: ["dongho-list"], 
    queryFn: getAllDongHo,
    enabled: isReady && isAdmin,
  });
  
  // Non-Admin: fetch dòng họ của mình
  const myDongHoQuery = useQuery({
    queryKey: ["my-dongho", user?.dongHoId],
    queryFn: () => getDongHoById(user?.dongHoId),
    enabled: isReady && !isAdmin && !!user?.dongHoId,
  });

  const dongHoList: IDongHo[] = isAdmin 
    ? (dongHoQuery.data?.data || [])
    : (myDongHoQuery.data?.data ? [myDongHoQuery.data.data] : []);

  useEffect(() => {
    // Admin: chọn dòng họ đầu tiên nếu chưa chọn
    if (isAdmin && dongHoList.length > 0 && !selectedDongHoId) {
      setSelectedDongHoId(dongHoList[0].dongHoId);
    }
  }, [dongHoList, selectedDongHoId, isAdmin]);

  const statsQuery = useQuery({
    queryKey: ["dashboard-stats", selectedDongHoId],
    queryFn: () => getDashboardStats(selectedDongHoId || undefined),
  });

  const theoDoiQuery = useQuery({
    queryKey: ["thongke-theodoi", selectedDongHoId],
    queryFn: () => getThongKeTheoDoi(selectedDongHoId),
    enabled: !!selectedDongHoId,
  });

  const moiNhatQuery = useQuery({
    queryKey: ["thanhvien-moinhat", selectedDongHoId],
    queryFn: () => getThanhVienMoiNhat(selectedDongHoId || undefined, 5),
  });

  const thuChiQuery = useQuery({
    queryKey: ["thongke-thuchi", selectedDongHoId, currentYear],
    queryFn: () => getThongKeThuChi(selectedDongHoId, currentYear),
    enabled: !!selectedDongHoId,
  });

  const thuChiTheoThangQuery = useQuery({
    queryKey: ["thongke-thuchi-theothang", selectedDongHoId, currentYear],
    queryFn: () => getThongKeThuChiTheoThang(selectedDongHoId, currentYear),
    enabled: !!selectedDongHoId,
  });

  const suKienQuery = useQuery({
    queryKey: ["thongke-sukien", selectedDongHoId, currentYear],
    queryFn: () => getThongKeSuKien(selectedDongHoId, currentYear),
    enabled: !!selectedDongHoId,
  });

  const suKienSapToiQuery = useQuery({
    queryKey: ["sukien-saptoi", selectedDongHoId],
    queryFn: () => getSuKienSapToi(selectedDongHoId || undefined, 5),
  });

  const stats = statsQuery.data?.data;
  const theoDoi: IThongKeTheoDoi[] = theoDoiQuery.data?.data || [];
  const moiNhat = moiNhatQuery.data?.data || [];
  const thuChi = thuChiQuery.data?.data;
  const thuChiTheoThang = thuChiTheoThangQuery.data?.data || [];
  const suKien = suKienQuery.data?.data;
  const suKienSapToi = suKienSapToiQuery.data?.data || [];
  const selectedDongHo = dongHoList.find(d => d.dongHoId === selectedDongHoId);

  const generationData = theoDoi.map((item) => ({
    name: `Đời ${item.doi}`,
    nam: item.soNam,
    nu: item.soNu,
  }));

  const thuChiChartData = thuChiTheoThang.map((item: any) => ({
    name: `T${item.thang}`,
    thu: item.tongThu || 0,
    chi: item.tongChi || 0,
  }));

  // Pie data for gender
  const genderData = [
    { name: "Nam", value: stats?.tongNam || 0 },
    { name: "Nữ", value: stats?.tongNu || 0 },
  ];

  const formatDate = (date: string) => date ? new Date(date).toLocaleDateString("vi-VN") : "";
  const formatMoney = (amount: number) => {
    if (!amount) return "0đ";
    if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}tr`;
    if (amount >= 1000) return `${(amount / 1000).toFixed(0)}k`;
    return `${amount}đ`;
  };

  const isLoading = statsQuery.isLoading;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1e3a5f]">Tổng Quan Gia Phả</h1>
          <p className="text-sm text-gray-500">
            {isAdmin ? "Thống kê và quản lý dòng họ" : `Dòng họ: ${selectedDongHo?.tenDongHo || ""}`}
          </p>
        </div>
        
        {/* Dropdown - Chỉ Admin mới thấy */}
        {isAdmin && (
          <div className="relative">
            <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow transition-all min-w-[200px]">
              <Users size={18} className="text-[#d4af37]" />
              <span className="flex-1 text-left font-medium text-[#1e3a5f] truncate text-sm">
                {selectedDongHoId ? selectedDongHo?.tenDongHo : "Tất cả dòng họ"}
              </span>
              <ChevronDown size={16} className={`text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto z-50">
                <button onClick={() => { setSelectedDongHoId(""); setIsDropdownOpen(false); }}
                  className={`w-full px-4 py-2.5 text-left hover:bg-gray-50 text-sm ${!selectedDongHoId ? "bg-[#fdf6e3] text-[#d4af37] font-semibold" : "text-gray-700"}`}>
                  Tất cả dòng họ
                </button>
                {dongHoList.map((dongHo) => (
                  <button key={dongHo.dongHoId} onClick={() => { setSelectedDongHoId(dongHo.dongHoId); setIsDropdownOpen(false); }}
                    className={`w-full px-4 py-2.5 text-left hover:bg-gray-50 text-sm ${selectedDongHoId === dongHo.dongHoId ? "bg-[#fdf6e3] text-[#d4af37] font-semibold" : "text-gray-700"}`}>
                    {dongHo.tenDongHo}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-96"><Loader2 className="animate-spin text-[#d4af37]" size={48} /></div>
      ) : (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <KPICard title="Tổng Thành Viên" value={stats?.tongThanhVien || 0} icon={Users} 
              bgColor="bg-gradient-to-br from-[#1e3a5f] to-[#2c5282]" iconBg="bg-white/20" />
            <KPICard title="Nam Giới" value={stats?.tongNam || 0} trend="up" trendValue={`${Math.round((stats?.tongNam / (stats?.tongThanhVien || 1)) * 100)}%`}
              icon={UserPlus} bgColor="bg-gradient-to-br from-[#d4af37] to-[#a16207]" iconBg="bg-white/20" />
            <KPICard title="Nữ Giới" value={stats?.tongNu || 0} icon={Heart}
              bgColor="bg-gradient-to-br from-[#b91c1c] to-[#991b1b]" iconBg="bg-white/20" />
            <KPICard title="Số Đời" value={stats?.doiCaoNhat || 0} icon={GitBranch}
              bgColor="bg-gradient-to-br from-[#5d4037] to-[#3e2723]" iconBg="bg-white/20" />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Bar Chart - Thống kê theo đời */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#1e3a5f]">Thống Kê Theo Đời</h3>
                <div className="flex gap-4 text-xs">
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#1e3a5f]"></span> Nam</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-[#d4af37]"></span> Nữ</span>
                </div>
              </div>
              {generationData.length > 0 ? (
                <div className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={generationData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                      <XAxis dataKey="name" stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }} />
                      <Bar dataKey="nam" fill="#1e3a5f" radius={[6, 6, 0, 0]} barSize={24} />
                      <Bar dataKey="nu" fill="#d4af37" radius={[6, 6, 0, 0]} barSize={24} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[280px] flex items-center justify-center text-gray-400">Chưa có dữ liệu</div>
              )}
            </div>

            {/* Right Column - Donut + Stats */}
            <div className="space-y-6">
              {/* Donut Chart */}
              <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
                <h3 className="font-bold text-[#1e3a5f] mb-4">Tỷ Lệ Giới Tính</h3>
                <div className="h-[160px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={genderData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                        <Cell fill="#1e3a5f" />
                        <Cell fill="#d4af37" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#1e3a5f]">{stats?.tongThanhVien || 0}</p>
                      <p className="text-[10px] text-gray-400 uppercase">Tổng</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-6 mt-2">
                  <span className="flex items-center gap-2 text-xs"><span className="w-3 h-3 rounded-full bg-[#1e3a5f]"></span> Nam</span>
                  <span className="flex items-center gap-2 text-xs"><span className="w-3 h-3 rounded-full bg-[#d4af37]"></span> Nữ</span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
                <h3 className="font-bold text-[#1e3a5f] mb-3">Thống Kê Nhanh</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                    <span className="text-xs text-gray-600 flex items-center gap-2"><ArrowDownCircle size={14} className="text-green-600" /> Tổng thu</span>
                    <span className="font-bold text-green-600 text-sm">{formatMoney(thuChi?.tongThu || 0)}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                    <span className="text-xs text-gray-600 flex items-center gap-2"><ArrowUpCircle size={14} className="text-red-600" /> Tổng chi</span>
                    <span className="font-bold text-red-600 text-sm">{formatMoney(thuChi?.tongChi || 0)}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                    <span className="text-xs text-gray-600 flex items-center gap-2"><Wallet size={14} className="text-blue-600" /> Số dư</span>
                    <span className="font-bold text-blue-600 text-sm">{formatMoney((thuChi?.tongThu || 0) - (thuChi?.tongChi || 0))}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-amber-50 rounded-lg">
                    <span className="text-xs text-gray-600 flex items-center gap-2"><Calendar size={14} className="text-amber-600" /> Sự kiện</span>
                    <span className="font-bold text-amber-600 text-sm">{suKien?.tongSuKien || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Area Chart - Thu Chi */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#1e3a5f]">Thu Chi Theo Tháng</h3>
                <span className="text-xs text-gray-400">Năm {currentYear}</span>
              </div>
              {thuChiChartData.length > 0 ? (
                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={thuChiChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorThu" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1e3a5f" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#1e3a5f" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorChi" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#d4af37" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                      <XAxis dataKey="name" stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => formatMoney(v)} />
                      <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }} 
                        formatter={(value: number) => formatMoney(value)} />
                      <Area type="monotone" dataKey="thu" stroke="#1e3a5f" strokeWidth={2} fillOpacity={1} fill="url(#colorThu)" />
                      <Area type="monotone" dataKey="chi" stroke="#d4af37" strokeWidth={2} fillOpacity={1} fill="url(#colorChi)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[220px] flex items-center justify-center text-gray-400">Chưa có dữ liệu</div>
              )}
              <div className="flex justify-center gap-6 mt-3">
                <span className="flex items-center gap-2 text-xs"><span className="w-3 h-3 rounded-full bg-[#1e3a5f]"></span> Thu</span>
                <span className="flex items-center gap-2 text-xs"><span className="w-3 h-3 rounded-full bg-[#d4af37]"></span> Chi</span>
              </div>
            </div>

            {/* Calendar + Events */}
            <div className="space-y-6">
              <MiniCalendar />
              
              {/* Upcoming Events */}
              <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
                <h3 className="font-bold text-[#1e3a5f] mb-3 text-sm">Sự Kiện Sắp Tới</h3>
                {suKienSapToi.length > 0 ? (
                  <div className="space-y-2">
                    {suKienSapToi.slice(0, 3).map((event: any, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-[#d4af37] rounded-lg flex items-center justify-center text-white">
                          <CalendarDays size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-[#1e3a5f] truncate">{event.tenSuKien}</p>
                          <p className="text-[10px] text-gray-400">{formatDate(event.ngayDienRa)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 text-center py-4">Không có sự kiện</p>
                )}
              </div>
            </div>
          </div>

          {/* Members List */}
          <div className="mt-6 bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
            <h3 className="font-bold text-[#1e3a5f] mb-4">Thành Viên Mới Thêm</h3>
            {moiNhat.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {moiNhat.map((member: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm
                      ${member.gioiTinh === 1 ? "bg-[#1e3a5f]" : "bg-[#d4af37]"}`}>
                      {member.hoTen?.charAt(0) || "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#1e3a5f] truncate">{member.hoTen}</p>
                      <p className="text-[10px] text-gray-400">Đời {member.doiThuoc || "?"}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">Chưa có thành viên nào</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
