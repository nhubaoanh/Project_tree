"use client";
import React, { useEffect, useState } from "react";
import { Header } from "@/components/ui/HeaderSub";
import { MyFamilyTree } from "@/components/ui/tree";
import { generateFamilyData } from "@/utils/familyData"; // Sử dụng hàm generate
import { ViewMode } from "@/types/familytree";
import { BookOpen, Settings } from "lucide-react";
import { FamilyMember } from "@/types/familytree";
import  SuKienPage  from "../events/page";
import  TinTucPage  from "../news/page";
import  PhaKyPage  from "../pen/page";
import NotificationPage from "@/app/(admin)/notifications/page";

export default function App() {
  const [activeView, setActiveView] = useState<ViewMode>(ViewMode.DIAGRAM);
   const [familyData, setFamilyData] = useState<FamilyMember[]>([]);


  useEffect(() => {
    setFamilyData(generateFamilyData());
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-stone-100 font-serif overflow-hidden">
      {/* HEADER */}
      <div className="flex-none z-50 shadow-md relative">
        <Header activeView={activeView} onNavigate={setActiveView} />
      </div>

      {/* MAIN */}
      <main className="flex-1 relative w-full bg-stone-50">
        {/* BACKGROUND IMAGE */}
        {/* <Image
          src="/images/background.jpg"
          fill
          alt="Background"
          style={{ objectFit: "cover" }}
          quality={80}
          priority
          className="z-0 opacity-5"
        /> */}

        {/* CONTENT */}
        <div className="absolute inset-0 w-full h-full z-10 bg-[#ede5b7]">
          {activeView === ViewMode.DIAGRAM && (
            <div className="w-full h-full overflow-auto">
              {familyData.length > 0 ? (
                <MyFamilyTree data={familyData} />
              ) : (
                <div className="flex items-center justify-center h-full">
                  Đang tải cây gia phả...
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
              <SuKienPage />
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
