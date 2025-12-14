// "use client";
// import React, { useState } from "react";
// import { Clock } from "lucide-react";
// import { IEvent, IsearchEvent } from "@/types/event";
// import { keepPreviousData, useQuery } from "@tanstack/react-query";
// import { searchEvent } from "@/service/event.service";
// import { Search, Plus, Download, Upload, X, Loader2 } from "lucide-react";

// export default function SuKienPage (){
//     // --- STATE FOR API QUERY PARAMETERS ---
//     const [pageIndex, setPageIndex] = useState(1);
//     const [pageSize, setPageSize] = useState(5);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [debouncedSearch, setDebouncedSearch] = useState("");

//     React.useEffect(() => {
//         const timer = setTimeout(() => {
//           setDebouncedSearch(searchTerm);
//           setPageIndex(1); // Reset to page 1 on new search
//         }, 500);
//         return () => clearTimeout(timer);
//       }, [searchTerm]);

//   const searchParams: IsearchEvent = {
//     pageIndex,
//     pageSize,
//     search_content: debouncedSearch,
//   };
  

//   const eventQuery = useQuery({
//     queryKey: ["event", searchParams],
//     queryFn: () => searchEvent(searchParams),
//     placeholderData: keepPreviousData,
//   });


//   // const handlePageSizeChange = (newSize: number) => {
//   //   setPageSize(newSize);
//   //   setPageIndex(1);
//   // };
//   const eventData = eventQuery.data?.data || [];
//   const totalRecords = eventQuery.data?.totalItems || 0;
//   const totalPages = eventQuery.data?.pageCount || 0;
//   const isLoading = eventQuery.isLoading;
//   return (
//     <div className="max-w-4xl mx-auto">
//       <h2 className="font-display text-3xl text-[#8b0000] text-center mb-10 border-b-2 border-[#d4af37] pb-4 inline-block w-full">
//         Sự Kiện Dòng Tộc
//       </h2>
//       {/* Search Bar */}
//       <div className="mb-6 flex items-center bg-white border border-[#d4af37] rounded-lg p-1 shadow-sm w-full md:w-1/2 transition-all focus-within:ring-2 ring-[#d4af37]/50">
//         <div className="p-2 text-stone-400">
//           {isLoading ? (
//             <Loader2 className="animate-spin" size={20} />
//           ) : (
//             <Search size={20} />
//           )}
//         </div>
//         <input
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Tìm kiếm theo họ tên, tài khoản..."
//           className="w-full p-2 outline-none bg-transparent text-[#5d4037] placeholder-stone-400"
//         />
//         {searchTerm && (
//           <button
//             onClick={() => setSearchTerm("")}
//             className="p-2 text-stone-400 hover:text-[#b91c1c]"
//           >
//             <X size={16} />
//           </button>
//         )}
//       </div>
//       <div className="relative border-l-4 border-[#d4af37]/50 ml-4 md:ml-10 space-y-10 pl-8 md:pl-12 py-4">
//         {eventData.map((event: IEvent, index: number) => (
//           <div key={index} className="relative group">
//             <div className="absolute -left-[46px] md:-left-[62px] top-1 flex items-center justify-center">
//               <div className="w-6 h-6 rounded-full bg-[#8b0000] border-4 border-[#fdf6e3] shadow-md z-10"></div>
//             </div>

//             <div className="bg-[#fffdf5] p-6 rounded-lg border border-[#d4af37]/30 shadow-[4px_4px_0px_rgba(139,94,60,0.1)] hover:shadow-[4px_4px_0px_rgba(139,94,60,0.3)] transition-all border-l-4 border-l-[#8b0000]">
//               {/* YEAR */}
//               <div className="flex items-center gap-2 text-[#8b5e3c] font-bold font-display text-xl mb-2">
//                 <Clock size={20} />
//                 <span>{new Date(event.ngayDienRa).getDate()}</span>
//               </div>

//               {/* TITLE */}
//               <h3 className="text-xl font-bold text-[#2d2d2d] mb-2">
//                 {event.tenSuKien}
//               </h3>

//               {/* DESCRIPTION */}
//               <p className="text-stone-600 leading-relaxed">
//                 {event.moTa || "Không có mô tả"}
//               </p>

//               {/* LOCATION */}
//               <div className="text-sm mt-2 text-[#8b5e3c]">
//                 📍 {event.diaDiem}
//               </div>

//               {/* TIME */}
//               <div className="text-sm text-[#8b5e3c]">
//                 🕒 {new Date(event.gioDienRa).toLocaleTimeString("vi-VN")}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


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
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IEvent | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [debouncedSearch, setDebouncedSearch] = useState("");

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPageIndex(1); // Reset to page 1 on new search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const searchParams: IsearchEvent = {
    pageIndex,
    pageSize,
    search_content: debouncedSearch,
  };

  const eventQuery = useQuery({
    queryKey: ["event", searchParams],
    queryFn: () => searchEvent(searchParams),
    placeholderData: keepPreviousData,
  });

  const eventData = eventQuery.data?.data || [];
  const totalRecords = eventQuery.data?.totalItems || 0;
  const totalPages = eventQuery.data?.pageCount || 0;
  const isLoading = eventQuery.isLoading;

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          <div className="col-span-full text-center py-10 text-[#8b5e3c] flex flex-col items-center">
            <Loader2 className="animate-spin mb-2" /> Đang tải thông báo...
          </div>
        ) : eventData.length === 0 ? (
          <div className="col-span-full text-center py-10 text-stone-400 italic">
            Chưa có thông báo nào.
          </div>
        ) : (
          eventData.map((item: IEvent, index: number) => (
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
        )}
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
