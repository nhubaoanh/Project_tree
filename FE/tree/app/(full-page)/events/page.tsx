"use client";
import React, { useState } from "react";
import { Clock } from "lucide-react";
import { IEvent, IsearchEvent } from "@/types/event";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { searchEvent } from "@/service/event.service";
import { Search, Plus, Download, Upload, X, Loader2 } from "lucide-react";

export default function SuKienPage (){
    // --- STATE FOR API QUERY PARAMETERS ---
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(5);
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


  // const handlePageSizeChange = (newSize: number) => {
  //   setPageSize(newSize);
  //   setPageIndex(1);
  // };
  const eventData = eventQuery.data?.data || [];
  const totalRecords = eventQuery.data?.totalItems || 0;
  const totalPages = eventQuery.data?.pageCount || 0;
  const isLoading = eventQuery.isLoading;
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="font-display text-3xl text-[#8b0000] text-center mb-10 border-b-2 border-[#d4af37] pb-4 inline-block w-full">
        Sự Kiện Dòng Tộc
      </h2>
      {/* Search Bar */}
      <div className="mb-6 flex items-center bg-white border border-[#d4af37] rounded-lg p-1 shadow-sm w-full md:w-1/2 transition-all focus-within:ring-2 ring-[#d4af37]/50">
        <div className="p-2 text-stone-400">
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Search size={20} />
          )}
        </div>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm theo họ tên, tài khoản..."
          className="w-full p-2 outline-none bg-transparent text-[#5d4037] placeholder-stone-400"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="p-2 text-stone-400 hover:text-[#b91c1c]"
          >
            <X size={16} />
          </button>
        )}
      </div>
      <div className="relative border-l-4 border-[#d4af37]/50 ml-4 md:ml-10 space-y-10 pl-8 md:pl-12 py-4">
        {eventData.map((event: IEvent, index: number) => (
          <div key={index} className="relative group">
            <div className="absolute -left-[46px] md:-left-[62px] top-1 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-[#8b0000] border-4 border-[#fdf6e3] shadow-md z-10"></div>
            </div>

            <div className="bg-[#fffdf5] p-6 rounded-lg border border-[#d4af37]/30 shadow-[4px_4px_0px_rgba(139,94,60,0.1)] hover:shadow-[4px_4px_0px_rgba(139,94,60,0.3)] transition-all border-l-4 border-l-[#8b0000]">
              {/* YEAR */}
              <div className="flex items-center gap-2 text-[#8b5e3c] font-bold font-display text-xl mb-2">
                <Clock size={20} />
                <span>{new Date(event.ngayDienRa).getDate()}</span>
              </div>

              {/* TITLE */}
              <h3 className="text-xl font-bold text-[#2d2d2d] mb-2">
                {event.tenSuKien}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-stone-600 leading-relaxed">
                {event.moTa || "Không có mô tả"}
              </p>

              {/* LOCATION */}
              <div className="text-sm mt-2 text-[#8b5e3c]">
                📍 {event.diaDiem}
              </div>

              {/* TIME */}
              <div className="text-sm text-[#8b5e3c]">
                🕒 {new Date(event.gioDienRa).toLocaleTimeString("vi-VN")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
