"use client";
import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Sparkles, Loader2, Info, Zap, Cloud } from "lucide-react";
import { chatWithAI } from "@/service/ai.service";
import { chatWithOllama, checkOllamaHealth } from "@/service/ollama.service";
import { getDongHoById } from "@/service/dongho.service";
import storage from "@/utils/storage";

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

type AIEngine = "gemini" | "ollama";

export default function GenealogyChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      text: '🚀 Chào bạn! Tôi là trợ lý AI tra cứu gia phả (BFS Algorithm + Ollama).\n\nHãy hỏi tôi về quan hệ huyết thống:\n- "Nguyễn Văn A là con ai?"\n- "Con của Trần Thị B là ai?"\n- "Nguyễn Văn C có vợ/chồng là ai?"\n- "Anh chị em của Lê Văn D"\n\n💡 Hệ thống sử dụng thuật toán BFS để tìm quan hệ nhanh và chính xác!',
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dongHoInfo, setDongHoInfo] = useState<any>(null);
  const [selectedDongHo, setSelectedDongHo] = useState<string>("");
  const [aiEngine, setAiEngine] = useState<AIEngine>("gemini");
  const [ollamaStatus, setOllamaStatus] = useState<"checking" | "online" | "offline">("checking");

  const scrollRef = useRef<HTMLDivElement>(null);

  // Kiểm tra Ollama status
  useEffect(() => {
    const checkOllama = async () => {
      try {
        const result = await checkOllamaHealth();
        setOllamaStatus(result.success ? "online" : "offline");
      } catch (error) {
        setOllamaStatus("offline");
      }
    };
    checkOllama();
  }, []);

  // Load thông tin dòng họ của user hiện tại
  useEffect(() => {
    const loadUserDongHo = async () => {
      try {
        const user = storage.getUser();
        const userDongHoId = user?.dongHoId;
        
        if (userDongHoId) {
          setSelectedDongHo(userDongHoId);
          const res = await getDongHoById(userDongHoId);
          if (res.success && res.data) {
            setDongHoInfo(res.data);
            setMessages([{
              role: "model",
              text: `🚀 Chào bạn! Tôi là trợ lý AI tra cứu gia phả dòng họ "${res.data.tenDongHo}" (BFS Algorithm + Ollama).\n\nHãy hỏi tôi về quan hệ huyết thống:\n- "Nguyễn Văn A là con ai?"\n- "Con của Trần Thị B là ai?"\n- "Nguyễn Văn C có vợ/chồng là ai?"\n- "Anh chị em của Lê Văn D"\n\n💡 Hệ thống sử dụng thuật toán BFS để tìm quan hệ nhanh và chính xác!`
            }]);
          }
        }
      } catch (error) {
        console.error("Lỗi load thông tin dòng họ:", error);
      }
    };
    loadUserDongHo();
  }, []);

  // Scroll to bottom
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!selectedDongHo) {
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Không tìm thấy thông tin dòng họ của bạn." },
      ]);
      return;
    }

    const userMsg = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsLoading(true);

    try {
      let response;
      
      // Chọn AI engine
      if (aiEngine === "ollama") {
        response = await chatWithOllama(userMsg, selectedDongHo);
      } else {
        response = await chatWithAI(userMsg, selectedDongHo);
      }

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
        { role: "model", text: error.message || "Đã có lỗi xảy ra khi kết nối với máy chủ AI." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEngineChange = (engine: AIEngine) => {
    if (engine === "ollama" && ollamaStatus === "offline") {
      setMessages((prev) => [
        ...prev,
        { 
          role: "model", 
          text: "⚠️ Ollama chưa chạy. Vui lòng chạy lệnh: ollama serve" 
        },
      ]);
      return;
    }
    setAiEngine(engine);
    setMessages((prev) => [
      ...prev,
      { 
        role: "model", 
        text: `✅ Đã chuyển sang ${engine === "ollama" ? "Ollama (BFS + Local AI)" : "Google Gemini (Cloud AI)"}\n\n${engine === "ollama" ? "💡 Sử dụng thuật toán BFS để tìm quan hệ, Ollama chỉ diễn giải kết quả!" : ""}` 
      },
    ]);
  };

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
        
        {/* AI Engine Selector */}
        <div className="flex gap-2">
          <button
            onClick={() => handleEngineChange("gemini")}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              aiEngine === "gemini"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            title="Google Gemini - Cloud AI (Tiếng Việt tốt)"
          >
            <Cloud size={16} />
            Gemini
          </button>
          <button
            onClick={() => handleEngineChange("ollama")}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              aiEngine === "ollama"
                ? "bg-purple-600 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            title="DeepSeek-Coder - Local AI (Miễn phí, bảo mật)"
            disabled={ollamaStatus === "offline"}
          >
            <Zap size={16} />
            Ollama
            {ollamaStatus === "offline" && (
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            )}
            {ollamaStatus === "online" && (
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            )}
          </button>
        </div>

        {/* Hiển thị tên dòng họ */}
        <div className="px-3 py-2 bg-gray-50 border border-[#d4af37]/50 rounded-lg text-sm text-[#5d4037] font-medium">
          {dongHoInfo?.tenDongHo || "Đang tải..."}
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
              <span className="text-xs text-stone-500">
                {aiEngine === "ollama" ? "DeepSeek đang suy nghĩ..." : "Đang tra cứu..."}
              </span>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Quick Questions */}
      <div className="bg-[#fdfbf7] px-4 pb-2 border-x border-[#d4af37]/30">
        <div className="flex gap-2 flex-wrap">
          {[
            "Nguyễn Văn A là con ai?", 
            "Con của Trần Thị B", 
            "Anh chị em của Lê Văn C"
          ].map((q) => (
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
            placeholder={selectedDongHo ? "Hỏi về quan hệ gia đình, ví dụ: Con của ông A là ai?" : "Đang tải thông tin dòng họ..."}
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