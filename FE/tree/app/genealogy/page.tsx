"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { hierarchicalData } from '@/app/genealogy/components/familyData';
import MyFamilyTree from "./components/tree";
import { HeaderSub } from "@/components/ui/HeaderSub";
export default function GenealogyPage() {
  const [activeSection, setActiveSection] = useState("diagram");

  const navButtons = [
    { key: "add", label: "Thêm thành viên" },
    { key: "diagram", label: "Sơ đồ gia phả" },
    { key: "history", label: "Lịch sử" },
    { key: "settings", label: "Cài đặt" },
  ];

  const AddMemberForm = () => (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Thêm thành viên
      </h2>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Họ tên"
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        <input
          type="text"
          placeholder="Quan hệ (con, cháu,...)"
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        <button
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
        >
          Lưu
        </button>
      </form>
    </div>
  );

  const DiagramSection = () => {
    return (
      <div className="h-auto bg-white rounded-xl shadow-md flex items-center justify-center overflow-auto p-6">
        {/* <FamilyTreeChart data={hierarchicalData} />
         */}
         {/* <BestFamilyTree /> */}
         <MyFamilyTree/>
      </div>
    );
  };

  return (
    <div className="min-h-screen relative">
      <div className="z-0 fixed inset-0">
        <Image
          src="/images/backgroud.jpg"
          fill
          alt="backgroud"
          style={{ objectFit: "cover" }}
          quality={80} // Tối ưu hóa chất lượng ảnh
          priority
        />
      </div>
      <HeaderSub />

      <main className="">
        {activeSection === "diagram" && <DiagramSection />}
        {activeSection === "add" && <AddMemberForm />}
        {activeSection === "history" && (
          <div className="text-center text-xl text-gray-600 mt-8">
            📚 Lịch sử gia phả đang được cập nhật...
          </div>
        )}
        {activeSection === "settings" && (
          <div className="text-center text-xl text-gray-600 mt-8">
            ⚙️ Cài đặt hệ thống gia phả...
          </div>
        )}
      </main>
    </div>
  );
}
