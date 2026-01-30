"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Loader2, Sparkles, MessageCircle, Minimize2, Code } from "lucide-react";
import { queryText2SQL } from "@/service/text2sql.service";

interface Message {
  id: string;
  type: "user" | "ai";
  text: string;
  sql?: string;
  result?: any;
  timestamp: Date;
}

interface AIChatBoxProps {
  onClose: () => void;
  dongHoId: string;
}

const QUICK_QUESTIONS = [
  "Có bao nhiêu người trong gia phả?",
  "Gia phả có bao nhiêu nam giới?",
  "Danh sách người còn sống",
  "Đời thứ 3 có bao nhiêu người?",
  "Có bao nhiêu người đã kết hôn?",
];

export function AIChatBox({ onClose, dongHoId }: AIChatBoxProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "ai",
      text: "Xin chào! Tôi có thể giúp bạn tìm hiểu về gia phả. Hãy hỏi tôi bất cứ điều gì!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const [showSqlMap, setShowSqlMap] = useState<{ [key: string]: boolean }>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!isMinimized) {
      inputRef.current?.focus();
    }
  }, [isMinimized]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    setShowQuickQuestions(false);

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await queryText2SQL(input, dongHoId);
      if (response.success) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "ai",
          text: response.data.result.message,
          sql: response.data.sql,
          result: response.data.result,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        text: `Xin lỗi, có lỗi xảy ra: ${error.message || "Không thể kết nối đến server"}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    setShowQuickQuestions(false);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleSql = (messageId: string) => {
    setShowSqlMap((prev) => ({ ...prev, [messageId]: !prev[messageId] }));
  };

  const renderResult = (result: any, messageId: string, sql?: string) => {
    if (!result) return null;

    return (
      <div className="mt-3">
        {result.type === "count" && (
          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border-2 border-blue-200">
            <div className="text-5xl font-bold text-blue-600 text-center">{result.value}</div>
            <div className="text-sm text-blue-700 text-center mt-2">người</div>
          </div>
        )}

        {result.type === "list" && result.data && result.data.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="max-h-64 overflow-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0">
                  <tr>
                    {Object.keys(result.data[0]).map((key) => (
                      <th key={key} className="px-4 py-2 text-left font-semibold text-gray-700 border-b">
                        {key === "hoTen" ? "Họ tên" : key === "thanhVienId" ? "ID" : key === "ngaySinh" ? "Ngày sinh" : key === "ngayMat" ? "Ngày mất" : key === "gioiTinh" ? "Giới tính" : key === "doiThuoc" ? "Đời" : key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.data.slice(0, 10).map((row: any, idx: number) => (
                    <tr key={idx} className="hover:bg-blue-50 transition-colors">
                      {Object.values(row).map((value: any, cellIdx) => (
                        <td key={cellIdx} className="px-4 py-2 border-b border-gray-100">
                          {value !== null && value !== undefined ? String(value) : "-"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {result.data.length > 10 && (
              <div className="px-4 py-2 bg-gray-50 text-xs text-gray-600 text-center border-t">
                Hiển thị 10/{result.data.length} kết quả
              </div>
            )}
          </div>
        )}

        {result.type === "empty" && (
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center text-gray-500">
            Không tìm thấy kết quả nào
          </div>
        )}

        {sql && (
          <div className="mt-2">
            <button onClick={() => toggleSql(messageId)} className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1">
              <Code size={12} />
              {showSqlMap[messageId] ? "Ẩn SQL" : "Xem SQL"}
            </button>
            {showSqlMap[messageId] && (
              <div className="mt-1 p-2 bg-gray-900 rounded text-xs text-green-400 overflow-x-auto">
                <code>{sql}</code>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button onClick={() => setIsMinimized(false)} className="bg-gradient-to-r from-[#b91c1c] to-[#991b1b] text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
          <MessageCircle size={20} />
          <span className="font-semibold">AI Chat</span>
          {messages.length > 1 && (
            <span className="bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full font-bold">{messages.length - 1}</span>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border-2 border-[#b91c1c]">
      <div className="bg-gradient-to-r from-[#b91c1c] to-[#991b1b] text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={24} className="animate-pulse" />
          <div>
            <h3 className="font-bold text-lg">AI Gia Phả</h3>
            <p className="text-xs opacity-90">Hỏi đáp thông minh</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsMinimized(true)} className="hover:bg-white/20 p-1.5 rounded-lg transition-colors" title="Thu nhỏ">
            <Minimize2 size={18} />
          </button>
          <button onClick={onClose} className="hover:bg-white/20 p-1.5 rounded-lg transition-colors" title="Đóng">
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${message.type === "user" ? "bg-[#b91c1c] text-white" : "bg-white border border-gray-200 text-gray-800 shadow-sm"}`}>
              <p className="text-sm whitespace-pre-wrap font-medium">{message.text}</p>
              {message.result && renderResult(message.result, message.id, message.sql)}
              <p className="text-xs opacity-70 mt-2">{message.timestamp.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 flex items-center gap-2 shadow-sm">
              <Loader2 size={16} className="animate-spin text-[#b91c1c]" />
              <span className="text-sm text-gray-600">AI đang suy nghĩ...</span>
            </div>
          </div>
        )}

        {showQuickQuestions && messages.length === 1 && (
          <div className="space-y-2">
            <p className="text-xs text-gray-500 font-semibold">💡 Câu hỏi gợi ý:</p>
            {QUICK_QUESTIONS.map((question, idx) => (
              <button key={idx} onClick={() => handleQuickQuestion(question)} className="w-full text-left p-3 text-sm bg-white border border-gray-200 rounded-xl hover:border-[#b91c1c] hover:bg-red-50 transition-all shadow-sm hover:shadow">
                {question}
              </button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={handleKeyPress} placeholder="Hỏi về gia phả..." disabled={loading} className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#b91c1c] focus:border-transparent text-sm" />
          <button onClick={handleSend} disabled={loading || !input.trim()} className="bg-[#b91c1c] text-white p-2 rounded-full hover:bg-[#991b1b] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-xl">
            {loading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">VD: &quot;Có bao nhiêu người trong gia phả?&quot;</p>
      </div>
    </div>
  );
}
