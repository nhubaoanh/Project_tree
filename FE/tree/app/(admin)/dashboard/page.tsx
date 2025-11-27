"use client";
import React from "react";
import {
  Users,
  Coins,
  Calendar,
  TrendingUp,
  ArrowUpRight,
  UserPlus,
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
  LineChart,
  Line,
} from "recharts";

// --- MOCK DATA ---
const contributionData = [
  { name: "Tháng 1", amount: 12000000 },
  { name: "Tháng 2", amount: 15000000 },
  { name: "Tháng 3", amount: 8000000 },
  { name: "Tháng 4", amount: 45000000 }, // Giỗ tổ
  { name: "Tháng 5", amount: 10000000 },
  { name: "Tháng 6", amount: 11000000 },
];

const generationData = [
  { name: "Đời thứ 1", value: 2 },
  { name: "Đời thứ 2", value: 12 },
  { name: "Đời thứ 3", value: 45 },
  { name: "Đời thứ 4", value: 32 },
];

const upcomingEvents = [
  { id: 1, title: "Lễ Giỗ Tổ Chi 3", date: "2024-04-15", type: "Giỗ Chạp" },
  { id: 2, title: "Họp Mặt Khuyến Học", date: "2024-05-20", type: "Họp Mặt" },
  {
    id: 3,
    title: "Mừng Thọ Cụ Ông Kính",
    date: "2024-06-10",
    type: "Mừng Thọ",
  },
];

const COLORS = ["#b91c1c", "#d4af37", "#5d4037", "#a16207"];

// --- COMPONENTS ---

const KPICard = ({ title, value, subtext, icon: Icon, colorClass }: any) => (
  <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-viet-gold relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
    <div
      className={`absolute -right-6 -top-6 p-8 rounded-full opacity-10 group-hover:opacity-20 transition-opacity ${colorClass}`}
    >
      <Icon size={64} />
    </div>
    <div className="flex items-center gap-4 mb-2">
      <div className={`p-3 rounded-lg ${colorClass} text-white shadow-sm`}>
        <Icon size={24} />
      </div>
      <h3 className="text-viet-text/70 font-serif uppercase text-sm tracking-wider font-bold">
        {title}
      </h3>
    </div>
    <div className="mt-2">
      <p className="text-4xl font-bold text-viet-red font-serif">{value}</p>
      <p className="text-sm text-viet-text/60 mt-1 italic flex items-center gap-1">
        {subtext.includes("+") ? (
          <TrendingUp size={14} className="text-green-600" />
        ) : null}
        {subtext}
      </p>
    </div>
  </div>
);

const SectionTitle = ({ children }: { children?: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-6 mt-2">
    <div className="w-8 h-1 bg-viet-red"></div>
    <h2 className="text-xl md:text-2xl font-serif font-bold text-viet-wood uppercase">
      {children}
    </h2>
    <div className="flex-1 h-[1px] bg-viet-gold/30"></div>
  </div>
);

export default function Dashboard() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-10">
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Tổng Thành Viên"
          value="91"
          subtext="+3 thành viên mới tháng này"
          icon={Users}
          colorClass="bg-viet-wood"
        />
        <KPICard
          title="Quỹ Dòng Họ"
          value="102.5 Tr"
          subtext="Đã thu 85% kế hoạch năm"
          icon={Coins}
          colorClass="bg-[#b91c1c]"
        />
        <KPICard
          title="Sự Kiện Sắp Tới"
          value="03"
          subtext="Sự kiện gần nhất: 5 ngày tới"
          icon={Calendar}
          colorClass="bg-[#a16207]"
        />
        <KPICard
          title="Trưởng Các Chi"
          value="04"
          subtext="Quản lý 4 nhánh gia phả"
          icon={UserPlus}
          colorClass="bg-[#2c5282]"
        />
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md border border-viet-gold/30">
          <SectionTitle>Biểu Đồ Đóng Góp Tài Chính 2024</SectionTitle>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={contributionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#5d4037" />
                <YAxis
                  stroke="#5d4037"
                  tickFormatter={(value) => `${value / 1000000}Tr`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderColor: "#d4af37",
                    fontFamily: "serif",
                  }}
                  formatter={(value: number) => [
                    formatCurrency(value),
                    "Số tiền",
                  ]}
                />
                <Legend />
                <Bar
                  dataKey="amount"
                  name="Số tiền đóng góp"
                  fill="#b91c1c"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Member Structure Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-viet-gold/30">
          <SectionTitle>Cấu Trúc Thế Hệ</SectionTitle>
          <div className="h-[300px] w-full flex flex-col items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={generationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {generationData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[70%] text-center pointer-events-none">
              <span className="text-3xl font-bold text-viet-wood block font-serif">
                4
              </span>
              <span className="text-xs text-viet-text/60 uppercase">
                Thế hệ
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Events & Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Events List */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-viet-gold/30 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-viet-red via-viet-gold to-viet-red rounded-t-xl"></div>
          <SectionTitle>Sự Kiện Sắp Diễn Ra</SectionTitle>
          <div className="space-y-4 mt-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center p-4 bg-viet-paper/30 rounded-lg border border-viet-gold/20 hover:border-viet-gold transition-colors"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-white border-2 border-viet-red rounded-lg flex flex-col items-center justify-center text-viet-red shadow-sm">
                  <span className="text-xs font-bold uppercase">
                    {new Date(event.date).toLocaleString("vi-VN", {
                      month: "short",
                    })}
                  </span>
                  <span className="text-2xl font-bold font-serif">
                    {new Date(event.date).getDate()}
                  </span>
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="font-bold text-viet-wood font-serif text-lg">
                    {event.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded text-xs bg-viet-gold text-white font-bold">
                      {event.type}
                    </span>
                    <span className="text-sm text-viet-text/60 italic">
                      Còn{" "}
                      {Math.floor(
                        (new Date(event.date).getTime() - Date.now()) /
                          (1000 * 3600 * 24)
                      )}{" "}
                      ngày
                    </span>
                  </div>
                </div>
                <button className="p-2 text-viet-text/50 hover:text-viet-red transition-colors">
                  <ArrowUpRight size={20} />
                </button>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-sm text-viet-red font-bold hover:bg-viet-red/5 rounded transition-colors uppercase border border-dashed border-viet-red/30">
            Xem tất cả sự kiện
          </button>
        </div>

        {/* Traditional/Cultural Note or Quote */}
        <div className="bg-viet-red text-viet-gold p-8 rounded-xl shadow-lg flex flex-col justify-center items-center text-center relative overflow-hidden border-2 border-viet-gold">
          {/* Overlay Patterns */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>

          <div className="relative z-10">
            <div className="mb-4 text-viet-gold/80">
              <Users size={48} className="mx-auto" />
            </div>
            <h3 className="font-serif text-2xl font-bold mb-4 uppercase tracking-widest border-b border-viet-gold/50 pb-4 inline-block">
              Gia Huấn
            </h3>
            <p className="font-serif italic text-lg leading-relaxed mb-6">
              "Cây có cội mới trổ cành xanh lá,
              <br />
              Nước có nguồn mới bủa khắp rạch sông.
              <br />
              Người ta nguồn gốc từ đâu?
              <br />
              Có tổ tiên trước rồi sau có mình."
            </p>
            <div className="text-sm uppercase tracking-widest opacity-80 font-bold">
              - Ca dao Việt Nam -
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
