"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/ui/HeaderSub";
import { MyFamilyTree } from "@/components/ui/tree";
import { ViewMode } from "@/types/familytree";
import { Users, MessageCircle } from "lucide-react";
import TinTucPage from "../news/page";
import PhaKyPage from "../pen/page";
import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMembersByDongHo } from "@/service/member.service";
import { ITreeNode } from "@/types/tree";
import { buildTree } from "@/utils/treeUtils";
import SuKienPage from "../events/page";
import storage from "@/utils/storage";
import { AIChatBox } from "@/components/shared/AIChatBox";

// Loading component
function GenealogyLoading() {
  return (
    <div className="flex flex-col h-screen w-full bg-[#ede5b7] items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d4af37]"></div>
      <p className="mt-4 text-[#8b5e3c]">Đang tải...</p>
    </div>
  );
}

// Main content component that uses useSearchParams
function GenealogyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [activeView, setActiveView] = useState<ViewMode>(ViewMode.PHA_KY);
  const [showAIChat, setShowAIChat] = useState(false);
  
  // Lấy dongHoId từ URL
  const urlDongHoId = searchParams.get("dongHoId");
  const [selectedDongHoId, setSelectedDongHoId] = useState<string>("");
  
  // State để tránh hydration mismatch - chỉ set sau khi mount
  const [userDongHoId, setUserDongHoId] = useState<string | undefined>(undefined);
  const [mounted, setMounted] = useState(false);

  // Đọc user từ localStorage sau khi mount (client-side only)
  useEffect(() => {
    const user = storage.getUser();
    setUserDongHoId(user?.dongHoId);
    setMounted(true);
  }, []);

  // Set initial dongHoId - luôn dùng dongHoId của user
  useEffect(() => {
    if (!mounted) return;
    
    // Lấy từ URL hoặc từ user
    if (urlDongHoId) {
      setSelectedDongHoId(urlDongHoId);
    } else if (userDongHoId) {
      setSelectedDongHoId(userDongHoId);
    }
  }, [urlDongHoId, userDongHoId, mounted]);

  // Fetch members theo dongHoId đã chọn
  const membersQuery = useQuery({
    queryKey: ["member-tree", selectedDongHoId],
    queryFn: () => getMembersByDongHo(selectedDongHoId),
    placeholderData: keepPreviousData,
    enabled: !!selectedDongHoId,
  });

  // Đảm bảo data luôn là array và clean
  const rawData = membersQuery?.data?.data;
  const data = Array.isArray(rawData) ? rawData.filter(member => {
    // Lọc ra những member có dữ liệu hợp lệ
    if (!member || typeof member !== 'object') return false;
    if (!member.thanhVienId || typeof member.thanhVienId !== 'number' || Number.isNaN(member.thanhVienId)) return false;
    return true;
  }) : [];

  const treeData = useMemo<ITreeNode[]>(() => {
    if (!data || data.length === 0) return [];
    
    try {
      const result = buildTree(data);
      console.log('Tree data built successfully:', result.length, 'nodes');
      return result;
    } catch (error) {
      console.error('Error building tree:', error);
      console.error('Raw data:', data);
      return [];
    }
  }, [data]);

  // Không cần xử lý chọn dòng họ nữa

  // Handle toggle AI chat
  const handleToggleAIChat = () => {
    setShowAIChat(!showAIChat);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-stone-100 font-dancing overflow-hidden">
      {/* HEADER */}
      <div className="flex-none z-50 shadow-md relative">
        <Header activeView={activeView} onNavigate={setActiveView} />
      </div>

      {/* MAIN */}
      <main className="flex-1 relative w-full bg-stone-50 bg-[#ede5b7]">
        {/* CONTENT */}
        <div className="absolute inset-0 w-full h-full z-10 bg-[#ede5b7]">

          {activeView === ViewMode.PHA_KY && (
            <div className="w-full h-full overflow-y-auto p-4 md:p-8">
              <PhaKyPage />
            </div>
          )}
          {activeView === ViewMode.DIAGRAM && (
            <div className="w-full h-full overflow-hidden">
              {!selectedDongHoId ? (
                <div className="flex flex-col items-center justify-center h-full text-[#8b5e3c]">
                  <Users size={64} className="mb-4 opacity-50" />
                  <p className="text-xl">
                    Vui lòng chọn dòng họ để xem cây gia phả
                  </p>
                </div>
              ) : membersQuery.isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-[#8b5e3c]">Đang tải cây gia phả...</div>
                </div>
              ) : treeData.length > 0 ? (
                <MyFamilyTree 
                  data={treeData} 
                  dongHoId={selectedDongHoId}
                  queryClient={queryClient}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-[#8b5e3c]">
                  <Users size={64} className="mb-4 opacity-50" />
                  <p className="text-xl">Dòng họ này chưa có thành viên nào</p>
                  <p className="text-sm mt-2">
                    Hãy thêm thành viên từ trang quản lý
                  </p>
                </div>
              )}
            </div>
          )}

          {activeView === ViewMode.NEWS && (
            <div className="w-full h-full overflow-y-auto mt-10">
              <TinTucPage />
            </div>
          )}

          {activeView === ViewMode.EVENT && (
            <div className="w-full h-full overflow-y-auto mt-10">
              <SuKienPage />
            </div>
          )}
        </div>

        {/* Floating AI Chat Button */}
        {!showAIChat && (
          <button
            onClick={handleToggleAIChat}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-[#b91c1c] to-[#991b1b] text-white p-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 group"
            title="Hỏi đáp AI về gia phả"
          >
            <MessageCircle size={28} className="group-hover:animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
            </span>
          </button>
        )}

        {/* AI Chat Box */}
        {showAIChat && selectedDongHoId && (
          <AIChatBox 
            onClose={() => setShowAIChat(false)} 
            dongHoId={selectedDongHoId}
          />
        )}
      </main>
    </div>
  );
}

// Main export with Suspense wrapper
export default function GenealogyPage() {
  return (
    <Suspense fallback={<GenealogyLoading />}>
      <GenealogyContent />
    </Suspense>
  );
}
