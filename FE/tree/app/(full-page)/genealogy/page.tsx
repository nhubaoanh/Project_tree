"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/ui/HeaderSub";
import { MyFamilyTree } from "@/components/ui/tree";
import { ViewMode } from "@/types/familytree";
import { Settings, ChevronDown, Users } from "lucide-react";
import { NotificationPage } from "../events/page";
import TinTucPage from "../news/page";
import PhaKyPage from "../pen/page";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getMembersByDongHo } from "@/service/member.service";
import { getAllDongHo, IDongHo } from "@/service/dongho.service";
import { ITreeNode } from "@/types/tree";
import { buildTree } from "@/utils/treeUtils";

export default function App() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeView, setActiveView] = useState<ViewMode>(ViewMode.DIAGRAM);
  
  // Lấy dongHoId từ URL hoặc localStorage
  const urlDongHoId = searchParams.get("dongHoId");
  const [selectedDongHoId, setSelectedDongHoId] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Fetch danh sách dòng họ
  const dongHoQuery = useQuery({
    queryKey: ["dongho-list"],
    queryFn: () => getAllDongHo(),
    placeholderData: keepPreviousData,
  });
  const dongHoList: IDongHo[] = dongHoQuery.data?.data || [];

  // Set initial dongHoId từ URL hoặc localStorage
  useEffect(() => {
    if (urlDongHoId) {
      setSelectedDongHoId(urlDongHoId);
      localStorage.setItem("currentDongHoId", urlDongHoId);
    } else {
      const storedId = localStorage.getItem("currentDongHoId");
      if (storedId) {
        setSelectedDongHoId(storedId);
      } else if (dongHoList.length > 0) {
        setSelectedDongHoId(dongHoList[0].dongHoId);
      }
    }
  }, [urlDongHoId, dongHoList]);

  // Fetch members theo dongHoId đã chọn
  const membersQuery = useQuery({
    queryKey: ["member-tree", selectedDongHoId],
    queryFn: () => getMembersByDongHo(selectedDongHoId),
    placeholderData: keepPreviousData,
    enabled: !!selectedDongHoId,
  });

  // Đảm bảo data luôn là array
  const rawData = membersQuery?.data?.data;
  const data = Array.isArray(rawData) ? rawData : [];

  const treeData = useMemo<ITreeNode[]>(() => {
    if (!data || data.length === 0) return [];
    return buildTree(data);
  }, [data]);

  // Xử lý chọn dòng họ
  const handleSelectDongHo = (dongHoId: string) => {
    setSelectedDongHoId(dongHoId);
    localStorage.setItem("currentDongHoId", dongHoId);
    router.push(`/genealogy?dongHoId=${dongHoId}`);
    setIsDropdownOpen(false);
  };

  // Lấy tên dòng họ đang chọn
  const selectedDongHo = dongHoList.find(d => d.dongHoId === selectedDongHoId);

  return (
    <div className="flex flex-col h-screen w-full bg-stone-100 font-dancing overflow-hidden">
      {/* HEADER */}
      <div className="flex-none z-50 shadow-md relative">
        <Header activeView={activeView} onNavigate={setActiveView} />
      </div>

      {/* MAIN */}
      <main className="flex-1 relative w-full bg-stone-50 bg-[#ede5b7]">
        {/* Dropdown chọn dòng họ - chỉ hiện khi xem cây */}
        {activeView === ViewMode.DIAGRAM && (
          <div className="absolute top-4 left-67 z-20">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#d4af37] rounded-lg shadow-lg hover:bg-[#fdf6e3] transition-colors min-w-[200px]"
              >
                <Users size={18} className="text-[#b91c1c]" />
                <span className="flex-1 text-left font-semibold text-[#5d4037] truncate">
                  {selectedDongHo?.tenDongHo || "Chọn dòng họ"}
                </span>
                <ChevronDown size={18} className={`text-[#8b5e3c] transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border-2 border-[#d4af37] rounded-lg shadow-xl max-h-60 overflow-y-auto z-30">
                  {dongHoList.length > 0 ? (
                    dongHoList.map((dongHo) => (
                      <button
                        key={dongHo.dongHoId}
                        onClick={() => handleSelectDongHo(dongHo.dongHoId)}
                        className={`w-full px-4 py-2 text-left hover:bg-[#fdf6e3] transition-colors flex items-center gap-2 ${
                          selectedDongHoId === dongHo.dongHoId ? "bg-[#fdf6e3] text-[#b91c1c] font-bold" : "text-[#5d4037]"
                        }`}
                      >
                        <Users size={16} className="text-[#d4af37]" />
                        <span className="truncate">{dongHo.tenDongHo}</span>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-[#8b5e3c] italic text-center">
                      Chưa có dòng họ nào
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* CONTENT */}
        <div className="absolute inset-0 w-full h-full z-10 bg-[#ede5b7]">
          {activeView === ViewMode.DIAGRAM && (
            <div className="w-full h-full overflow-hidden">
              {!selectedDongHoId ? (
                <div className="flex flex-col items-center justify-center h-full text-[#8b5e3c]">
                  <Users size={64} className="mb-4 opacity-50" />
                  <p className="text-xl">Vui lòng chọn dòng họ để xem cây gia phả</p>
                </div>
              ) : membersQuery.isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-[#8b5e3c]">Đang tải cây gia phả...</div>
                </div>
              ) : treeData.length > 0 ? (
                <MyFamilyTree data={treeData} />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-[#8b5e3c]">
                  <Users size={64} className="mb-4 opacity-50" />
                  <p className="text-xl">Dòng họ này chưa có thành viên nào</p>
                  <p className="text-sm mt-2">Hãy thêm thành viên từ trang quản lý</p>
                </div>
              )}
            </div>
          )}

          {activeView === ViewMode.PHA_KY && (
            <div className="w-full h-full overflow-y-auto p-4 md:p-8">
              <PhaKyPage />
            </div>
          )}

          {activeView === ViewMode.HISTORY && (
            <div className="w-full h-full overflow-y-auto">
              <NotificationPage />
            </div>
          )}

          {activeView === ViewMode.NEWS && (
            <div className="w-full h-full overflow-y-auto mt-10">
              <TinTucPage />
            </div>
          )}

          {activeView === ViewMode.SETTINGS && (
            <div className="w-full h-full overflow-y-auto flex flex-col items-center justify-center text-stone-500">
              <Settings className="w-16 h-16 mb-4 text-red-800 opacity-50" />
              <h2 className="text-2xl font-display mb-2">Cài đặt hệ thống</h2>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
