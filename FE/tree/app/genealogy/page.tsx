// "use client";
// import { useState } from "react";
// import Image from "next/image";
// // import FamilyTree from "react-family-tree";
// import type { Gender, RelType, Node } from "react-family-tree";

// import FamilyNode from "./components/FamilyNode"; // import component node

// // Dữ liệu mẫu cho sơ đồ gia phả
// type Gender = "male" | "female" | "other";

// type RelationType = "father" | "mother" | "child" | "spouse";

// interface Relation {
//   id: string;
//   type: RelationType;
// }

// interface FamilyNodeData {
//   readonly id: string;
//   readonly name: string;
//   readonly gender: Gender;
//   readonly parents: readonly Relation[];
//   readonly children: readonly Relation[];
//   readonly siblings: readonly { id: string }[];
//   readonly spouses: readonly { id: string }[];
// }

// const familyData: readonly FamilyNodeData[] = [
//   {
//     id: "1",
//     name: "Ông A",
//     gender: "male",
//     parents: [],
//     children: [{ id: "3", type: "child" }],
//     siblings: [],
//     spouses: [{ id: "2" }],
//   },
//   {
//     id: "2",
//     name: "Bà B",
//     gender: "female",
//     parents: [],
//     children: [{ id: "3", type: "child" }],
//     siblings: [],
//     spouses: [{ id: "1" }],
//   },
//   {
//     id: "3",
//     name: "Con trai C",
//     gender: "male",
//     parents: [
//       { id: "1", type: "father" },
//       { id: "2", type: "mother" },
//     ],
//     children: [{ id: "5", type: "child" }],
//     siblings: [],
//     spouses: [{ id: "4" }]
//   },
//   {
//     id: "4",
//     name: "Vợ C",
//     gender: "female",
//     parents: [],
//     children: [{ id: "5", type: "child" }],
//     siblings: [],
//     spouses: [{ id: "3" }]
//   },
//   {
//     id: "5",
//     name: "Cháu D",
//     gender: "male",
//     parents: [
//       { id: "3", type: "father" },
//       { id: "4", type: "mother" },
//     ],
//     children: [],
//     siblings: [],
//     spouses: []
//   },
// ] as const;



// // Component hiển thị sơ đồ gia phả
// function DiagramSection() {
//   return (
//     <div className="h-[600px] bg-white rounded-xl shadow-md flex items-center justify-center overflow-auto p-6">
//       <FamilyTree
//         nodes={familyData}
//         rootId="1"
//         width={140}
//         height={110}
//         renderNode={(node) => <FamilyNode node={node} />}
//       />
//     </div>
//   );
// }

// // Component form thêm thành viên
// function AddMemberForm() {
//   return (
//     <div className="bg-white rounded-xl shadow-md p-6 max-w-lg mx-auto">
//       <h2 className="text-2xl font-semibold mb-4 text-center">Thêm thành viên</h2>
//       <form className="space-y-4">
//         <input
//           type="text"
//           placeholder="Họ tên"
//           className="w-full border border-gray-300 rounded-lg p-2"
//         />
//         <input
//           type="text"
//           placeholder="Quan hệ (con, cháu,...)"
//           className="w-full border border-gray-300 rounded-lg p-2"
//         />
//         <button
//           type="submit"
//           className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
//         >
//           Lưu
//         </button>
//       </form>
//     </div>
//   );
// }

// // Component chính
// export default function GenealogyPage() {
//   const [activeSection, setActiveSection] = useState("diagram");

//   const navButtons = [
//     { key: "add", label: "Thêm thành viên" },
//     { key: "diagram", label: "Sơ đồ gia phả" },
//     { key: "history", label: "Lịch sử" },
//     { key: "settings", label: "Cài đặt" },
//   ];

//   return (
//     <div className="min-h-screen relative bg-[#FCF9E3]">
//       {/* HEADER */}
//       <header className="sticky top-0 left-0 right-0 backdrop-blur-sm z-50 bg-[#FCF9E3]">
//         <div className="grid grid-cols-3 gap-4 items-center p-4">
//           <div className="flex justify-start">
//             <Image src="/images/dao.png" alt="Dao" width={200} height={200} className="object-contain" />
//           </div>
//           <div className="flex justify-center">
//             <Image src="/images/logo1.png" alt="Logo" width={300} height={300} className="object-contain" />
//           </div>
//           <div className="flex justify-end">
//             <Image src="/images/mai.png" alt="Mai" width={200} height={200} className="object-contain" />
//           </div>
//         </div>

//         {/* Navigation Buttons */}
//         <div className="flex flex-wrap justify-center gap-4 mb-6">
//           {navButtons.map((btn) => (
//             <button
//               key={btn.key}
//               onClick={() => setActiveSection(btn.key)}
//               className={`py-2 px-6 rounded-full font-medium shadow-md transition-all duration-300 transform hover:scale-105 ${
//                 activeSection === btn.key
//                   ? "bg-red-600 text-white"
//                   : "bg-white text-red-600 border border-red-600 hover:bg-gray-100"
//               }`}
//             >
//               {btn.label}
//             </button>
//           ))}
//         </div>
//       </header>

//       {/* MAIN CONTENT */}
//       <main className="p-6">
//         {activeSection === "diagram" && <DiagramSection />}
//         {activeSection === "add" && <AddMemberForm />}
//         {activeSection === "history" && (
//           <div className="text-center text-xl text-gray-600 mt-8">
//             📚 Lịch sử gia phả đang được cập nhật...
//           </div>
//         )}
//         {activeSection === "settings" && (
//           <div className="text-center text-xl text-gray-600 mt-8">
//             ⚙️ Cài đặt hệ thống gia phả...
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }
