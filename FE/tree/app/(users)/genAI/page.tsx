"use client";
import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Sparkles, Loader2, Info, ChevronDown } from "lucide-react";
import { chatWithAI } from "@/service/ai.service";
import { getAllDongHo, IDongHo } from "@/service/dongho.service";

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

export default function GenealogyChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      text: 'Chào bạn! Tôi là trợ lý AI tra cứu gia phả. Hãy chọn dòng họ và hỏi tôi về quan hệ huyết thống, ví dụ:\n- "Ông A là con ai?"\n- "Con của bà B là ai?"\n- "Liệt kê tất cả thành viên"\n- "Ai thuộc đời thứ 2?"',
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dongHoList, setDongHoList] = useState<IDongHo[]>([]);
  const [selectedDongHo, setSelectedDongHo] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load danh sách dòng họ
  useEffect(() => {
    const loadDongHo = async () => {
      try {
        const res = await getAllDongHo();
        if (res.data && Array.isArray(res.data)) {
          setDongHoList(res.data);
          // Tự động chọn dòng họ đầu tiên
          if (res.data.length > 0) {
            setSelectedDongHo(res.data[0].dongHoId);
          }
        }
      } catch (error) {
        console.error("Lỗi load dòng họ:", error);
      }
    };
    loadDongHo();
  }, []);

  // Scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Close dropdown when click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!selectedDongHo) {
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Vui lòng chọn dòng họ trước khi hỏi." },
      ]);
      return;
    }

    const userMsg = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await chatWithAI(userMsg, selectedDongHo);

      if (response.success && response.data) {
        setMessages((prev) => [...prev, { role: "model", text: response.data! }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "model", text: response.message || "Xin lỗi, tôi không thể trả lời lúc này." },
        ]);
      }
    } catch (error: any) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Đã có lỗi xảy ra khi kết nối với máy chủ AI." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedDongHoName = dongHoList.find(d => d.dongHoId === selectedDongHo)?.tenDongHo || "Chọn dòng họ";

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col font-sans animate-fadeIn">
      {/* Header */}
      <div className="bg-white p-4 border-b border-[#d4af37] flex items-center gap-3 shadow-sm rounded-t-lg">
        <div className="w-10 h-10 bg-gradient-to-br from-[#b91c1c] to-[#d4af37] rounded-full flex items-center justify-center text-white shadow">
          <Sparkles size={20} />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-[#5d4037] text-lg">Tra Cứu Gia Phả AI</h3>
          <p className="text-xs text-green-600">Sẵn sàng hỗ trợ</p>
        </div>
        
        {/* Dropdown chọn dòng họ */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 px-3 py-2 bg-[#fdf6e3] border border-[#d4af37] rounded-lg text-sm text-[#5d4037] hover:bg-[#f5ecd3] transition-colors"
          >
            <span className="max-w-[150px] truncate">{selectedDongHoName}</span>
            <ChevronDown size={16} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 top-full mt-1 w-64 bg-white border border-[#d4af37] rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
              {dongHoList.length === 0 ? (
                <div className="p-3 text-sm text-gray-500">Không có dòng họ nào</div>
              ) : (
                dongHoList.map((dh) => (
                  <button
                    key={dh.dongHoId}
                    onClick={() => {
                      setSelectedDongHo(dh.dongHoId);
                      setShowDropdown(false);
                      setMessages([{
                        role: "model",
                        text: `Đã chọn dòng họ "${dh.tenDongHo}". Bạn có thể hỏi tôi về quan hệ các thành viên trong dòng họ này.`
                      }]);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-[#fdf6e3] transition-colors ${
                      selectedDongHo === dh.dongHoId ? 'bg-[#fdf6e3] text-[#b91c1c] font-medium' : 'text-[#5d4037]'
                    }`}
                  >
                    {dh.tenDongHo}
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        <div
          className="text-stone-400 hover:text-[#b91c1c] cursor-pointer"
          title="AI tra cứu quan hệ gia đình dựa trên dữ liệu dòng họ"
        >
          <Info size={20} />
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-[#fdfbf7] p-4 overflow-y-auto custom-scrollbar space-y-4 border-x border-[#d4af37]/30">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === "user"
                  ? "bg-stone-200 text-stone-600"
                  : "bg-[#fdf6e3] text-[#b91c1c] border border-[#d4af37]"
              }`}
            >
              {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div
              className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-[#5d4037] text-white rounded-tr-none"
                  : "bg-white text-[#4a4a4a] border border-[#eaddcf] rounded-tl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[#fdf6e3] text-[#b91c1c] border border-[#d4af37] flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-[#eaddcf] flex items-center gap-2">
              <Loader2 className="animate-spin text-[#d4af37]" size={16} />
              <span className="text-xs text-stone-500">Đang tra cứu...</span>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Quick Questions */}
      <div className="bg-[#fdfbf7] px-4 pb-2 border-x border-[#d4af37]/30">
        <div className="flex gap-2 flex-wrap">
          {["Liệt kê thành viên", "Ai là tổ tiên?", "Thành viên đời 2"].map((q) => (
            <button
              key={q}
              onClick={() => setInput(q)}
              className="px-3 py-1 text-xs bg-white border border-[#d4af37]/50 rounded-full text-[#5d4037] hover:bg-[#fdf6e3] transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 border-t border-[#d4af37] rounded-b-lg shadow-lg">
        <form onSubmit={handleSend} className="flex gap-2 relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading || !selectedDongHo}
            placeholder={selectedDongHo ? "Hỏi về quan hệ gia đình, ví dụ: Con của ông A là ai?" : "Vui lòng chọn dòng họ trước..."}
            className="flex-1 pl-4 pr-12 py-3 bg-[#f9f9f9] border border-[#d4af37]/30 rounded-full focus:outline-none focus:border-[#b91c1c] focus:ring-1 focus:ring-[#b91c1c] transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim() || !selectedDongHo}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#b91c1c] text-white rounded-full flex items-center justify-center hover:bg-[#991b1b] disabled:opacity-50 disabled:hover:bg-[#b91c1c] transition-colors shadow-md"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
