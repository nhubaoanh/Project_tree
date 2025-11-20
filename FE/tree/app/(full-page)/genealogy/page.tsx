// "use client";
// import React, { useState } from "react";
// import { Header } from "@/components/ui/HeaderSub"; // Giả sử đây là đường dẫn đúng cho Header của bạn
// import { MyFamilyTree } from "@/components/ui/tree";
// import { FAMILY_DATA } from "@/utils/familyData";
// import { ViewMode } from "@/types/familytree";
// import { BookOpen, Clock, Settings } from "lucide-react";

// import Image from "next/image"; 
// import { SuKienPage } from "../events/page";
// import { TinTucPage } from "../news/page";
// import { PhaKyPage } from "../pen/page";
// import { BaoCaoPage } from "../reports/page";
// import { GenealogyChatPage } from "../../(users)/genAI/page";
// import NotificationPage from "@/app/(admin)/notifications/page";

// function App() {
//   const [activeView, setActiveView] = useState<ViewMode>(ViewMode.DIAGRAM);

//   return (
//     <div className="flex flex-col h-screen w-full bg-stone-100 font-serif overflow-hidden">
//       {/* FIXED HEADER STRATEGY:
//         flex-none: Forces the header to respect its intrinsic height and not shrink.
//         z-50: Ensures it stays on top of the scrolling content.
//       */}
//       <div className="flex-none z-50 shadow-md relative">
//         <Header activeView={activeView} onNavigate={setActiveView} />
//       </div>

//       {/* SCROLLABLE MAIN AREA:
//         flex-1: Takes up all remaining vertical space after the header.
//         relative: Establishes a positioning context for children.
//       */}
//       <main className="flex-1 relative w-full bg-stone-50">
//         {/* <Image
//           src="/images/backgroud.jpg" // Đảm bảo đường dẫn này đúng
//           fill
//           alt="Họa tiết nền truyền thống"
//           style={{ objectFit: "cover" }}
//           quality={80} // Tối ưu hóa chất lượng ảnh
//           priority // Ưu tiên tải ảnh này sớm
//           className="z-0 opacity-5" // Giữ nguyên opacity và z-index
//         /> */}

//         {/* Content Container - Đảm bảo z-index của nó cao hơn Image */}
//         <div className="absolute inset-0 w-full h-full z-10 bg-[#ede5b7]">
//           {" "}
//           {/* Thêm z-10 */}
//           {activeView === ViewMode.DIAGRAM && (
//             <div className="w-full h-full">
//               <MyFamilyTree data={FAMILY_DATA} />
//               {/* <GenealogyChatPage /> */}
//             </div>
//           )}
//           {activeView === ViewMode.PHA_KY && (
//             <div className="w-full h-full overflow-y-auto p-4 md:p-8">
//               {/* <div className="max-w-4xl mx-auto bg-white p-8 rounded-sm shadow-lg border-t-4 border-red-900 mb-12">
//                 <h1 className="text-3xl font-display text-red-900 mb-6 border-b pb-4 flex items-center gap-3">
//                   <BookOpen className="w-8 h-8 text-yellow-600" />
//                   Lời Nói Đầu
//                 </h1>
//                 <div className="prose prose-stone lg:prose-xl text-justify text-gray-700">
//                   <p className="indent-8 mb-4">
//                     Nước có nguồn, cây có cội. Chim tìm tổ, người tìm tông. Phàm
//                     là con người, ai cũng có tổ tiên, ông bà, cha mẹ. Việc ghi
//                     chép gia phả không chỉ là để lưu giữ danh tính các bậc tiền
//                     nhân mà còn để giáo dục con cháu về truyền thống tốt đẹp của
//                     dòng họ.
//                   </p>
//                   <p className="indent-8 mb-4">
//                     Cuốn phả ký này được lập nên với tâm nguyện kết nối các
//                     thành viên trong dòng tộc, dù ở gần hay ở xa, để cùng nhau
//                     hướng về nguồn cội, phát huy những đức tính quý báu mà cha
//                     ông đã dày công vun đắp.
//                   </p>
//                   <p className="italic text-right mt-8 text-red-800 font-bold">
//                     — Trưởng tộc Nguyễn Văn Tôi, Kính bút.
//                   </p>
//                 </div>
//               </div> */}
//               <PhaKyPage />
//             </div>
//           )}
//           {activeView === ViewMode.HISTORY && (
//             <div className="w-full h-full overflow-y-auto">
//               {/* <SuKienPage /> */}
//               <NotificationPage />
//             </div>
//           )}
//           {activeView === ViewMode.NEWS && (
//             <div className="w-full h-full overflow-y-auto mt-10">
//               <TinTucPage />
//             </div>
//           )}
//           {activeView === ViewMode.SETTINGS && (
//             <div className="w-full h-full overflow-y-auto flex flex-col items-center justify-center text-stone-500">
//               <Settings className="w-16 h-16 mb-4 text-red-800 opacity-50" />
//               <h2 className="text-2xl font-display mb-2">Cài đặt hệ thống</h2>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default App;

"use client";
import React, { useEffect, useState } from "react";
import { Header } from "@/components/ui/HeaderSub";
import { MyFamilyTree } from "@/components/ui/tree";
import { generateFamilyData } from "@/utils/familyData"; // Sử dụng hàm generate
import { ViewMode } from "@/types/familytree";
import { BookOpen, Settings } from "lucide-react";
import { FamilyMember } from "@/types/familytree";
import { SuKienPage } from "../events/page";
import { TinTucPage } from "../news/page";
import { PhaKyPage } from "../pen/page";
import NotificationPage from "@/app/(admin)/notifications/page";

export default function App() {
  const [activeView, setActiveView] = useState<ViewMode>(ViewMode.DIAGRAM);
   const [familyData, setFamilyData] = useState<FamilyMember[]>([]);

  // Sinh dữ liệu trên client để tránh Turbopack crash
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
