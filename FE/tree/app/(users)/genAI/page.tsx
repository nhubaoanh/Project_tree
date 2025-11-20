
"use client";


import React, { useState, useEffect, useRef } from "react";
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Send, Bot, User, Sparkles, Loader2, Info } from "lucide-react";
import { getAllUsersForAI } from "@/service/user.service";
import { toast } from "react-hot-toast";

interface ChatMessage {
  role: "user" | "model";
  text: string;
}

export const GenealogyChatPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "model",
      text: 'Chào bạn! Tôi là trợ lý AI của dòng họ Nguyễn. Bạn có thể hỏi tôi về quan hệ huyết thống, ví dụ: "Ông A là con ai?", "Bác B thuộc đời thứ mấy?".',
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  const chatSessionRef = useRef<Chat | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize Gemini Chat with Context
  useEffect(() => {
    const initChat = async () => {
      try {
        // 1. Fetch Family Data
        const users = await getAllUsersForAI();
        const userContext = JSON.stringify(
          users.map((u) => ({
            id: u.nguoiDungId,
            name: u.hoTen,
            // parentId: u.parentId,
            // generation: u.doiThu,
            info: `Sinh năm: ${
              u.ngayTao ? new Date(u.ngayTao).getFullYear() : "N/A"
            }`,
          }))
        );

        // 2. Init Gemini
        // IMPORTANT: Using process.env.API_KEY as requested
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        chatSessionRef.current = ai.chats.create({
          model: "gemini-2.5-flash",
          config: {
            systemInstruction: `Bạn là một chuyên gia gia phả của dòng họ Nguyễn.
            Nhiệm vụ của bạn là trả lời câu hỏi của thành viên dựa trên dữ liệu JSON sau đây:
            ${userContext}
            
            Quy tắc:
            1. Chỉ trả lời dựa trên dữ liệu được cung cấp.
            2. Nếu người dùng hỏi về quan hệ (con ai, bố ai), hãy tra cứu parentId.
            3. Luôn xưng hô lịch sự, tôn trọng.
            4. Nếu không tìm thấy thông tin, hãy nói rõ là không có trong dữ liệu.
            5. Trả lời ngắn gọn, súc tích.
            `,
          },
        });

        setIsInitializing(false);
      } catch (error) {
        console.error("Failed to init AI", error);
        toast.error(
          "Không thể khởi động trợ lý AI. Vui lòng kiểm tra API Key."
        );
      }
    };

    initChat();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !chatSessionRef.current) return;

    const userMsg = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsLoading(true);

    try {
      const response: GenerateContentResponse =
        await chatSessionRef.current.sendMessage({ message: userMsg });
      const text = response.text || "Xin lỗi, tôi không thể trả lời lúc này.";
      setMessages((prev) => [...prev, { role: "model", text: text }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "Đã có lỗi xảy ra khi kết nối với máy chủ AI." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-140px)] flex flex-col font-sans animate-fadeIn">
      {/* Header */}
      <div className="bg-white p-4 border-b border-[#d4af37] flex items-center gap-3 shadow-sm rounded-t-lg">
        <div className="w-10 h-10 bg-gradient-to-br from-[#b91c1c] to-[#d4af37] rounded-full flex items-center justify-center text-white shadow">
          <Sparkles size={20} />
        </div>
        <div>
          <h3 className="font-bold text-[#5d4037] text-lg">
            Tra Cứu Gia Phả AI
          </h3>
          <p className="text-xs text-stone-500 flex items-center gap-1">
            {isInitializing ? (
              <span className="text-orange-500">Đang nạp dữ liệu...</span>
            ) : (
              <span className="text-green-600">Sẵn sàng hỗ trợ</span>
            )}
          </p>
        </div>
        <div
          className="ml-auto text-stone-400 hover:text-[#b91c1c] cursor-pointer"
          title="AI sử dụng Gemini 2.5 Flash"
        >
          <Info size={20} />
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-[#fdfbf7] p-4 overflow-y-auto custom-scrollbar space-y-4 border-x border-[#d4af37]/30">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 ${
              msg.role === "user" ? "flex-row-reverse" : ""
            }`}
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
              className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
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
              <span className="text-xs text-stone-500">Đang suy nghĩ...</span>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 border-t border-[#d4af37] rounded-b-lg shadow-lg">
        <form onSubmit={handleSend} className="flex gap-2 relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading || isInitializing}
            placeholder={
              isInitializing
                ? "Đang khởi tạo..."
                : "Hỏi về ông tổ, hoặc quan hệ giữa các thành viên..."
            }
            className="flex-1 pl-4 pr-12 py-3 bg-[#f9f9f9] border border-[#d4af37]/30 rounded-full focus:outline-none focus:border-[#b91c1c] focus:ring-1 focus:ring-[#b91c1c] transition-all"
          />
          <button
            type="submit"
            disabled={isLoading || isInitializing || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#b91c1c] text-white rounded-full flex items-center justify-center hover:bg-[#991b1b] disabled:opacity-50 disabled:hover:bg-[#b91c1c] transition-colors shadow-md"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};
