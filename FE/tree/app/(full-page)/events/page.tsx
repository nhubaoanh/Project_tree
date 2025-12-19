"use client";

import React, { useState } from "react";
import { Calendar, MapPin, ChevronDown, ArrowUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { searchEvent } from "@/service/event.service";
import { IEvent, IsearchEvent } from "@/types/event";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const getBadgeColor = (type: string) => {
  switch (type) {
    case "TIN_VUI":
      return "bg-pink-100 text-pink-800 hover:bg-pink-100";
    case "TIN_BUON":
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    case "SU_KIEN":
      return "bg-orange-100 text-orange-800 hover:bg-orange-100";
    default:
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
  }
};

export const NotificationPage: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const searchParams: IsearchEvent = {
    pageIndex: 1,
    pageSize: 100,
  };

  const eventQuery = useQuery({
    queryKey: ["events", searchParams],
    queryFn: () => searchEvent(searchParams),
  });

  // Sắp xếp sự kiện mới nhất lên đầu
  const sortedEvents = React.useMemo(
    () =>
      [...(eventQuery.data?.data || [])].sort(
        (a, b) =>
          new Date(b.ngayDienRa + "T" + b.gioDienRa).getTime() -
          new Date(a.ngayDienRa + "T" + a.gioDienRa).getTime()
      ),
    [eventQuery.data?.data]
  );

  // Chỉ hiển thị số lượng sự kiện theo visibleCount
  const displayedEvents = sortedEvents.slice(0, visibleCount);

  // Hàm tải thêm sự kiện
  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 3, sortedEvents.length));
  };

  // Hàm cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Tiêu đề trang */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#b91c1c] mb-2">
          Bảng Tin Dòng Họ
        </h1>
        <p className="text-[#8b5e3c]">
          Cập nhật thông tin mới nhất về dòng họ
        </p>
      </div>

      {/* Danh sách sự kiện */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventQuery.isLoading ? (
          // Hiển thị skeleton khi đang tải
          Array(3)
            .fill(0)
            .map((_, i) => (
              <Card key={i} className="overflow-hidden transition-all hover:shadow-lg">
                <Skeleton className="h-48 w-full" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </Card>
            ))
        ) : displayedEvents.length > 0 ? (
          // Hiển thị danh sách sự kiện
          displayedEvents.map((item) => (
            <Card
              key={item.suKienId}
              className="relative overflow-hidden group aspect-[2/3] min-h-[500px]"
            >
              {/* Hình nền */}
              <div className="absolute inset-0 z-0">
                <img
                  src="/images/backgrouNotifi.png"
                  alt="Background"
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Nội dung */}
              <div className="relative z-10 h-full flex flex-col justify-between p-6">
                {/* Header với badge */}
                <div className="flex justify-between items-start">
                  {item.uuTien === 0 && (
                    <Badge className="bg-[#d4af37] text-white">
                      <span className="mr-1">⭐</span> Đã ghim
                    </Badge>
                  )}
                  <Badge className={getBadgeColor(item.tenLoaiSuKien)}>
                    {item.tenLoaiSuKien}
                  </Badge>
                </div>

                {/* Nội dung sự kiện */}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-[#5d4037] font-serif italic leading-tight mb-6">
                    {item.tenSuKien}
                  </h3>

                  {/* Thời gian và ngày tháng */}
                  <div className="mb-6">
                    <div className="flex items-center justify-center gap-2 text-sm text-[#5d4037] font-bold mb-2">
                      <Calendar size={16} />
                      <span>
                        {new Date(item.ngayDienRa).toLocaleDateString("vi-VN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="text-base font-bold text-[#5d4037]">
                      {item.gioDienRa?.substring(0, 5) || "Chưa cập nhật"}
                    </div>
                  </div>

                  {/* Đường kẻ trang trí */}
                  <div className="my-4 flex justify-center">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#c9a961]" />
                      <div className="w-2 h-2 bg-[#c9a961] rotate-45" />
                      <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#c9a961]" />
                    </div>
                  </div>

                  {/* Mô tả */}
                  <p className="text-sm text-stone-700 whitespace-pre-wrap leading-relaxed max-w-xs mx-auto mb-6">
                    {item.moTa || "Không có mô tả"}
                  </p>

                  {/* Địa điểm */}
                  <div className="flex items-center justify-center gap-2 text-sm text-[#5d4037]">
                    <MapPin size={16} />
                    <span>{item.diaDiem || "Chưa cập nhật địa điểm"}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center">
                  <p className="text-xs text-[#8b5e3c] italic">Người tạo</p>
                  <p className="text-sm font-bold text-[#5d4037] italic">
                    {item.hoTen || "Không rõ"}
                  </p>
                </div>
              </div>
            </Card>
          ))
        ) : (
          // Hiển thị khi không có sự kiện
          <div className="col-span-full text-center py-12">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
              <Calendar className="h-6 w-6 text-amber-600" />
            </div>
            <h3 className="mt-4 text-lg font-medium">Chưa có sự kiện nào</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Hãy quay lại sau để xem các sự kiện mới nhất
            </p>
          </div>
        )}
      </div>

      {/* Nút Xem thêm / Quay lại đầu trang */}
      <div className="mt-12 text-center">
        {visibleCount < sortedEvents.length ? (
          // Nút Xem thêm khi còn sự kiện
          <Button onClick={loadMore} className="px-8 py-6 text-base">
            Xem thêm 3 sự kiện
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        ) : sortedEvents.length > 3 ? (
          // Nút Quay lại đầu trang khi đã xem hết sự kiện
          <Button
            variant="outline"
            onClick={scrollToTop}
            className="px-6 py-4 text-base"
          >
            <ArrowUp className="mr-2 h-4 w-4" />
            Quay lại đầu trang
          </Button>
        ) : null}

        {/* Hiển thị số lượng sự kiện */}
        {sortedEvents.length > 0 && (
          <p className="mt-2 text-sm text-muted-foreground">
            Đang hiển thị {Math.min(visibleCount, sortedEvents.length)} trong tổng số{" "}
            {sortedEvents.length} sự kiện
          </p>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;