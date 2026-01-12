"use client";

import FamilyTree from "@balkangraph/familytree.js";
import { RefObject, useState, useEffect } from "react";

interface Props {
  show: boolean;
  onToggle: () => void;
  familyRef: RefObject<FamilyTree | null>;
}

export const ToolbarPanel = ({ show, onToggle, familyRef }: Props) => {
  const [zoomLevel, setZoomLevel] = useState(100);

  // Cập nhật zoom level khi tree thay đổi
  useEffect(() => {
    const interval = setInterval(() => {
      if (familyRef.current) {
        setZoomLevel(Math.round(familyRef.current.getScale() * 100));
      }
    }, 500);
    return () => clearInterval(interval);
  }, [familyRef]);

  const zoomIn = () => {
    if (!familyRef.current) return;
    const current = familyRef.current.getScale();
    familyRef.current.zoom(current * 1.25, undefined, true);
  };

  const zoomOut = () => {
    if (!familyRef.current) return;
    const current = familyRef.current.getScale();
    familyRef.current.zoom(current * 0.75, undefined, true);
  };

  const fit = () => {
    if (!familyRef.current) return;
    familyRef.current.fit();
  };

  const exportFile = (type: "pdf" | "png" | "svg") => {
    if (!familyRef.current) return;
    const opt = { filename: `gia-pha.${type}` };
    if (type === "pdf") {
      familyRef.current.exportPDF({ ...opt, header: "Gia Phả Dòng Họ", footer: "Trang {current-page}/{total-pages}", scale: "fit" });
    } else if (type === "png") {
      familyRef.current.exportPNG(opt);
    } else {
      familyRef.current.exportSVG(opt);
    }
  };

  if (!show) {
    return (
      <button 
        onClick={onToggle} 
        className="absolute top-20 right-4 z-10 bg-white rounded-xl shadow-lg border-2 border-amber-400 w-12 h-12 flex items-center justify-center hover:bg-amber-50 hover:scale-110 active:scale-95 transition-all duration-200"
      >
        <span className="text-xl">🛠️</span>
      </button>
    );
  }

  return (
    <div className="absolute top-18 right-4 z-10 bg-white rounded-xl shadow-xl border-2 border-amber-400 p-4 w-[220px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-amber-200">
        <span className="font-bold text-amber-800">🛠️ Công cụ</span>
        <button 
          onClick={onToggle} 
          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-100 text-gray-400 hover:text-red-500 transition-all flex items-center justify-center text-lg"
        >
          ✕
        </button>
      </div>

      {/* Zoom */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600 font-medium">🔍 Thu phóng</span>
          <span className="text-sm font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">{zoomLevel}%</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={zoomOut}
            className="flex-1 h-11 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-lg font-bold text-xl shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all"
          >
            −
          </button>
          <button 
            onClick={zoomIn}
            className="flex-1 h-11 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-lg font-bold text-xl shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all"
          >
            +
          </button>
          <button 
            onClick={fit}
            className="flex-1 h-11 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded-lg font-bold text-lg shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all"
          >
            📐
          </button>
        </div>
      </div>

      {/* Export */}
      <div className="pt-3 border-t-2 border-amber-200">
        <span className="text-sm text-gray-600 font-medium block mb-2">💾 Xuất file</span>
        <div className="flex gap-2">
          <button 
            onClick={() => exportFile("pdf")}
            className="flex-1 h-10 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-lg font-bold shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all"
          >
            PDF
          </button>
          <button 
            onClick={() => exportFile("png")}
            className="flex-1 h-10 bg-teal-500 hover:bg-teal-600 active:bg-teal-700 text-white rounded-lg font-bold shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all"
          >
            PNG
          </button>
          <button 
            onClick={() => exportFile("svg")}
            className="flex-1 h-10 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white rounded-lg font-bold shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 transition-all"
          >
            SVG
          </button>
        </div>
      </div>
    </div>
  );
};
