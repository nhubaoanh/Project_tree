"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { hierarchicalData } from '@/app/genealogy/components/familyData';
import MyFamilyTree from "./components/tree";
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
    <div className="min-h-screen relative bg-[#FCF9E3]">
      <header className="sticky top-0 left-0 right-0 backdrop-blur-sm z-50 bg-[#FCF9E3]">
        <div className="grid grid-cols-3 gap-2 items-center p-2">
          <div className="flex justify-start">
            <Image src="/images/dao.png" alt="Dao" width={200} height={200} />
          </div>
          <div className="flex justify-center">
            <Image
              src="/images/logo1.png"
              alt="Logo"
              width={350}
              height={350}
            />
          </div>
          <div className="flex justify-end">
            <Image src="/images/mai.png" alt="Mai" width={200} height={200} />
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-2">
          {navButtons.map((btn) => (
            <button
              key={btn.key}
              onClick={() => setActiveSection(btn.key)}
              className={`py-2 px-6 rounded-full font-medium shadow-md transition-all duration-300 transform hover:scale-105 ${
                activeSection === btn.key
                  ? "bg-red-600 text-white"
                  : "bg-white text-red-600 border border-red-600 hover:bg-gray-100"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </header>

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
