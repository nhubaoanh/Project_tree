import React, { useState } from "react";
import {
  Search,
  Plus,
  Trash2,
  Bell,
  Calendar,
  Megaphone,
  Heart,
  Frown,
  Smile,
  Loader2,
  X,
} from "lucide-react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  getNotifications,
  createNotification,
  deleteNotification,
} from "@/service/notifiCation.service";
import { ConfirmDeleteModal } from "@/components/ui/ConfirmDeleteModal";
import Image from "next/image";
import { searchEvent } from "@/service/event.service";
import { IEvent, IsearchEvent } from "@/types/event";

// --- SUB-COMPONENT: MODAL ---
const NotificationModal = ({ isOpen, onClose, onSubmit, isLoading }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#fffdf5] w-full max-w-lg rounded-lg shadow-2xl border border-[#d4af37] overflow-hidden">
        <div className="bg-[#b91c1c] text-yellow-400 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold font-display uppercase">
            Tạo Thông Báo Mới
          </h3>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            onSubmit({
              tieuDe: formData.get("tieuDe"),
              noiDung: formData.get("noiDung"),
              loaiThongBao: formData.get("loaiThongBao"),
              nguoiTao: "Admin", // Hardcoded for demo
              uuTien: formData.get("uuTien") === "on",
            });
          }}
          className="p-6 space-y-4"
        >
          <div>
            <label className="block text-sm font-bold text-[#8b5e3c] mb-1">
              Tiêu đề
            </label>
            <input
              required
              name="tieuDe"
              className="w-full p-2 border border-[#d4af37]/50 rounded"
              placeholder="Nhập tiêu đề..."
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#8b5e3c] mb-1">
              Loại thông báo
            </label>
            <select
              name="loaiThongBao"
              className="w-full p-2 border border-[#d4af37]/50 rounded"
            >
              <option value="TIN_CHUNG">Tin chung</option>
              <option value="SU_KIEN">Sự kiện / Họp mặt</option>
              <option value="TIN_VUI">Tin vui (Hỷ, Đỗ đạt)</option>
              <option value="TIN_BUON">Tin buồn (Hiếu)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-[#8b5e3c] mb-1">
              Nội dung
            </label>
            <textarea
              required
              name="noiDung"
              rows={4}
              className="w-full p-2 border border-[#d4af37]/50 rounded"
              placeholder="Nội dung chi tiết..."
            ></textarea>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="uuTien"
              id="uuTien"
              className="w-4 h-4 text-[#b91c1c]"
            />
            <label
              htmlFor="uuTien"
              className="text-sm font-bold text-[#8b5e3c]"
            >
              Đánh dấu ưu tiên (Ghim)
            </label>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[#5d4037] font-bold"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-[#b91c1c] text-white font-bold rounded shadow hover:bg-[#991b1b] disabled:opacity-50"
            >
              {isLoading ? "Đang lưu..." : "Đăng Thông Báo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const NotificationPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [showAll, setShowAll] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IEvent | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      // Removed setPageIndex as we're not using pagination anymore
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const searchParams: IsearchEvent = {
    pageIndex: 1,
    pageSize: 100, // Lấy nhiều bản ghi để xử lý phía client
    search_content: debouncedSearch,
  };

  const eventQuery = useQuery({
    queryKey: ["event", searchParams],
    queryFn: () => searchEvent(searchParams),
    placeholderData: keepPreviousData,
  });

  // Sắp xếp sự kiện mới nhất lên đầu
  const sortedEvents = React.useMemo(() =>
    [...(eventQuery.data?.data || [])].sort((a, b) =>
      new Date(b.ngayDienRa + 'T' + b.gioDienRa).getTime() - new Date(a.ngayDienRa + 'T' + a.gioDienRa).getTime()
    ),
    [eventQuery.data?.data]
  );

  // Chỉ hiển thị 3 sự kiện nếu chưa bấm xem thêm
  const displayedEvents = React.useMemo(() =>
    showAll ? sortedEvents : sortedEvents.slice(0, 3),
    [showAll, sortedEvents]
  );
  const totalRecords = eventQuery.data?.totalItems || 0;
  const isLoading = eventQuery.isLoading;

  console.log("Event Data:", displayedEvents);

  const createMutation = useMutation({
    mutationFn: createNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Đăng thông báo thành công");
      setIsModalOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Đã xóa thông báo");
      setIsDeleteModalOpen(false);
    },
  });

  const getIcon = (type: string) => {
    switch (type) {
      case "TIN_VUI":
        return <Smile className="text-pink-600" />;
      case "TIN_BUON":
        return <Frown className="text-gray-600" />;
      case "SU_KIEN":
        return <Calendar className="text-orange-600" />;
      default:
        return <Megaphone className="text-blue-600" />;
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "TIN_VUI":
        return "bg-[#d4af37]  text-pink-800 border-pink-500";
      case "TIN_BUON":
        return "bg-[#d4af37]  text-gray-800 border-gray-500";
      case "SU_KIEN":
        return "bg-[#d4af37]  text-orange-800 border-orange-500";
      default:
        return "bg-[#d4af37]  text-blue-800 border-blue-500";
    }
  };

  return (
    <div className="max-w-5xl mx-auto font-serif pb-20 mt-7 animate-fadeIn">
      <div className="flex justify-between items-center mb-8 border-b border-[#d4af37] pb-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-[#b91c1c] uppercase">
            Bảng Tin Dòng Họ
          </h2>
          <p className="text-[#8b5e3c] italic text-sm">
            Thông báo sự kiện, hiếu hỉ và tin tức chung
          </p>
        </div>
        {/* <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#b91c1c] text-white rounded shadow hover:bg-[#991b1b] font-bold"
        >
          <Plus size={16} /> Đăng Tin Mới
        </button> */}
      </div>

      {/* GRID 3 CỘT */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500">
        {isLoading ? (
          <div className="col-span-full text-center py-10 text-[#8b5e3c] flex flex-col items-center">
            <Loader2 className="animate-spin mb-2" /> Đang tải thông báo...
          </div>
        ) : (
          displayedEvents.length === 0 ? (
            <div className="col-span-full text-center py-10 text-stone-400 italic">
              Chưa có thông báo nào.
            </div>
          ) : (
            displayedEvents.map((item: IEvent, index: number) => (
              <div
                key={item.suKienId}
                className="relative shadow-2xl hover:shadow-3xl transition-all group overflow-hidden aspect-[2/3] min-h-[500px] rounded-xl"
              >
                {/* ẢNH NỀN */}
                <Image
                  src="/images/backgrouNotifi.png"
                  alt="Background"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Nút xóa */}
                {/* <button
                onClick={() => {
                  setSelectedItem(item.suKienId);
                  setIsDeleteModalOpen(true);
                }}
                className="absolute top-4 right-4 p-2 text-stone-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full shadow z-20"
              >
                <Trash2 size={16} />
              </button>  */}

                {item.uuTien === 0 ? (
                  <div className="absolute top-0 -right-12 transform -translate-x-1/2 bg-[#d4af37] text-white text-xs px-3 py-1 rounded-full font-bold shadow-md z-20">
                    📌 Đã Ghim
                  </div>
                ) : null}

                {/* Badge loại thông báo */}
                <div className="absolute top-4 left-14 z-20">
                  <span
                    className={`inline-block text-xs font-bold px-2 py-1 rounded ${getBadgeColor(
                      item.tenLoaiSuKien
                    )}`}
                  >
                    {item.tenLoaiSuKien === "Tin Chung"
                      ? "Tin Chung"
                      : item.tenLoaiSuKien === "Sự Kiện"
                        ? "Sự Kiện"
                        : item.tenLoaiSuKien === "Tin Vui"
                          ? "Tin Vui"
                          : "Tin Buồn"}
                  </span>
                </div>

                {/* NỘI DUNG */}
                <div className="relative z-10 top-4 h-full flex flex-col justify-between px-10 py-12 text-center">
                  {/* TIÊU ĐỀ */}
                  <h3 className="text-2xl font-bold text-[#5d4037] font-serif italic leading-tight">
                    {item.tenSuKien}
                  </h3>

                  {/* THỜI GIAN */}
                  <div className="mt-4">
                    <div className="text-xs text-[#8b5e3c] uppercase font-semibold">
                      Thời Gian
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-[#5d4037] font-bold">
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
                      {new Date(item.gioDienRa).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>

                  {/* ĐƯỜNG KẺ */}
                  <div className="my-4 flex justify-center">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#c9a961]" />
                      <div className="w-2 h-2 bg-[#c9a961] rotate-45" />
                      <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#c9a961]" />
                    </div>
                  </div>

                  {/* NỘI DUNG THÔNG BÁO */}
                  <p className="text-sm text-stone-700 whitespace-pre-wrap leading-relaxed max-w-xs mx-auto">
                    {item.moTa}
                  </p>

                  {/* NGƯỜI TẠO */}
                  <div className="">
                    <div className="text-xs text-[#8b5e3c] italic">Người Tạo</div>
                    <div className="text-sm font-bold text-[#5d4037] italic">
                      {item.hoTen}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className="group transition-all duration-300 hover:opacity-90 active:scale-95"
        >
          <div className="relative inline-block">
            <Image
              src="/images/next.png"
              alt="Xem thêm sự kiện"
              width={300}
              height={100}
              className="h-auto w-[150px] mx-auto transition-transform duration-300 group-hover:scale-105"
              priority
            />

            {/* Text nằm trong ảnh */}
            <span
              className="
                absolute inset-0
                flex items-center justify-center
                text-[#AC8537] font-semibold
                text-sm md:text-base
                pointer-events-none
              "
            >
               {showAll ? "Thu gọn" : "Xem thêm"}
            </span>
          </div>
        </button>
      </div>


      <NotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data: any) => createMutation.mutate(data)}
        isLoading={createMutation.isPending}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() =>
          selectedItem && deleteMutation.mutate(selectedItem.suKienId)
        }
        itemName={selectedItem?.tenSuKien || ""}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};
