"use client";

import FamilyTree from "@balkangraph/familytree.js";

interface Props {
  show: boolean;
  onToggle: () => void;
  maxGen: number;
  setMaxGen: (v: number) => void;
  gens: number[];
  orientation: number;
  setOrientation: (v: number) => void;
  template: string;
  setTemplate: (v: string) => void;
  search: string;
  onSearch: (v: string) => void;
  resultCount: number;
  totalNodes: number;
}

export const ControlPanel = ({
  show, onToggle, maxGen, setMaxGen, gens,
  orientation, setOrientation, template, setTemplate,
  search, onSearch, resultCount, totalNodes
}: Props) => {
  if (!show) {
    return (
      <button 
        onClick={onToggle} 
        className="absolute top-4 left-4 z-10 bg-white rounded-xl shadow-lg border-2 border-amber-400 w-12 h-12 flex items-center justify-center hover:bg-amber-50 hover:scale-110 active:scale-95 transition-all duration-200"
      >
        <span className="text-xl">⚙️</span>
      </button>
    );
  }

  return (
    <div className="absolute top-4 left-4 z-10 bg-white rounded-xl shadow-xl border-2 border-amber-400 p-4 w-[240px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-amber-200">
        <span className="font-bold text-amber-800">⚙️ Cài đặt</span>
        <button 
          onClick={onToggle} 
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-100 text-gray-400 hover:text-red-500 transition-all flex items-center justify-center text-lg"
        >
          ✕
        </button>
      </div>

      {/* Số đời */}
      <div className="mb-4">
        <label className="text-sm text-gray-600 font-medium block mb-2">📊 Số đời hiển thị</label>
        <select 
          value={maxGen} 
          onChange={e => setMaxGen(Number(e.target.value))}
          className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg text-sm font-medium bg-white hover:border-amber-400 focus:border-amber-500 focus:outline-none transition-colors cursor-pointer"
        >
          {gens.map(g => (
            <option key={g} value={g}>Đến đời thứ {g}</option>
          ))}
          <option value={Math.max(...gens, 1)}>📋 Tất cả ({Math.max(...gens, 1)} đời)</option>
        </select>
      </div>

      {/* Hướng */}
      <div className="mb-4">
        <label className="text-sm text-gray-600 font-medium block mb-2">🧭 Hướng hiển thị</label>
        <select 
          value={orientation} 
          onChange={e => setOrientation(Number(e.target.value))}
          className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg text-sm font-medium bg-white hover:border-amber-400 focus:border-amber-500 focus:outline-none transition-colors cursor-pointer"
        >
          <option value={FamilyTree.orientation.top}>⬇️ Trên xuống</option>
          <option value={FamilyTree.orientation.bottom}>⬆️ Dưới lên</option>
          <option value={FamilyTree.orientation.left}>➡️ Trái sang phải</option>
          <option value={FamilyTree.orientation.right}>⬅️ Phải sang trái</option>
        </select>
      </div>

      {/* Giao diện */}
      <div className="mb-4">
        <label className="text-sm text-gray-600 font-medium block mb-2">🎨 Giao diện</label>
        <select 
          value={template} 
          onChange={e => setTemplate(e.target.value)}
          className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg text-sm font-medium bg-white hover:border-amber-400 focus:border-amber-500 focus:outline-none transition-colors cursor-pointer"
        >
          <option value="custom">🎯 Tùy chỉnh (Nam/Nữ/Mất)</option>
          <option value="john">👤 John</option>
          <option value="hugo">👥 Hugo</option>
        </select>
      </div>

      {/* Tìm kiếm */}
      <div className="mb-4">
        <label className="text-sm text-gray-600 font-medium block mb-2">🔍 Tìm kiếm</label>
        <input 
          type="text" 
          value={search} 
          onChange={e => onSearch(e.target.value)}
          placeholder="Nhập tên thành viên..." 
          className="w-full h-10 px-3 border-2 border-gray-200 rounded-lg text-sm bg-white hover:border-amber-400 focus:border-amber-500 focus:outline-none transition-colors placeholder:text-gray-400"
        />
        {resultCount > 0 && (
          <div className="mt-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-lg">
            <span className="text-sm text-green-600 font-medium">✅ Tìm thấy {resultCount} kết quả</span>
          </div>
        )}
      </div>

      {/* Thống kê */}
      <div className="pt-3 border-t-2 border-amber-200">
        <div className="flex items-center justify-between bg-amber-50 rounded-lg px-3 py-2">
          <span className="text-sm text-gray-600">👥 Đang hiển thị:</span>
          <span className="text-sm font-bold text-amber-700">{totalNodes} người</span>
        </div>
      </div>
    </div>
  );
};
