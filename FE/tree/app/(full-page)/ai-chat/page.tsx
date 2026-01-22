"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { askAIQuestion, checkAIHealth } from "@/service/aiQuery.service";
import { useAuth } from "@/context/AuthContext";

export default function AIChatPage() {
  const { user } = useAuth();
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [aiHealthy, setAiHealthy] = useState<boolean | null>(null);

  // Sample questions
  const sampleQuestions = [
    "Có bao nhiêu người trong gia phả?",
    "Ai là người lớn tuổi nhất?",
    "Có bao nhiêu người làm nông dân?",
    "Nguyễn Văn A là con của ai?",
    "Nguyễn Văn A có mấy con?",
  ];

  useEffect(() => {
    // Check AI health on mount
    checkHealth();
  }, []);

  const checkHealth = async () => {
    try {
      const health = await checkAIHealth();
      setAiHealthy(health.healthy);
    } catch (error) {
      setAiHealthy(false);
    }
  };

  const handleAsk = async () => {
    if (!question.trim()) return;
    if (!user?.dongHoId) {
      alert("Không tìm thấy dongHoId");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await askAIQuestion(question, user.dongHoId);
      setResult(response.data);
    } catch (error: any) {
      console.error("Error:", error);
      setResult({
        error: error.response?.data?.message || error.message || "Có lỗi xảy ra",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSampleClick = (q: string) => {
    setQuestion(q);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">🤖 AI Chat - Hỏi về Gia Phả</h1>
        <p className="text-gray-600">
          Hỏi câu hỏi bằng tiếng Việt về gia phả của bạn
        </p>

        {/* AI Health Status */}
        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm font-medium">AI Service:</span>
          {aiHealthy === null ? (
            <span className="text-gray-500">Đang kiểm tra...</span>
          ) : aiHealthy ? (
            <span className="text-green-600 flex items-center gap-1">
              ✅ Đang hoạt động
            </span>
          ) : (
            <span className="text-red-600 flex items-center gap-1">
              ❌ Không khả dụng
              <Button
                size="sm"
                variant="outline"
                onClick={checkHealth}
                className="ml-2"
              >
                Thử lại
              </Button>
            </span>
          )}
        </div>
      </div>

      {/* Sample Questions */}
      <Card className="p-4 mb-6">
        <h3 className="font-semibold mb-3">💡 Câu hỏi mẫu:</h3>
        <div className="flex flex-wrap gap-2">
          {sampleQuestions.map((q, idx) => (
            <Button
              key={idx}
              variant="outline"
              size="sm"
              onClick={() => handleSampleClick(q)}
              disabled={loading}
            >
              {q}
            </Button>
          ))}
        </div>
      </Card>

      {/* Input */}
      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Nhập câu hỏi của bạn..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAsk()}
          disabled={loading || !aiHealthy}
          className="flex-1"
        />
        <Button
          onClick={handleAsk}
          disabled={loading || !question.trim() || !aiHealthy}
        >
          {loading ? "Đang xử lý..." : "Hỏi"}
        </Button>
      </div>

      {/* Result */}
      {result && (
        <Card className="p-6">
          {result.error ? (
            <div className="text-red-600">
              <h3 className="font-semibold mb-2">❌ Lỗi:</h3>
              <p>{result.error}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Question */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-1">
                  ❓ Câu hỏi:
                </h3>
                <p className="text-lg">{result.question}</p>
              </div>

              {/* SQL */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-1">
                  📝 SQL Query:
                </h3>
                <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                  {result.sql}
                </pre>
              </div>

              {/* Confidence */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-1">
                  📊 Độ tin cậy:
                </h3>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full ${
                        result.confidence > 0.7
                          ? "bg-green-500"
                          : result.confidence > 0.5
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${result.confidence * 100}%` }}
                    />
                  </div>
                  <span className="font-semibold">
                    {(result.confidence * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Results */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">
                  📦 Kết quả: ({result.row_count} dòng)
                </h3>
                {result.results && result.results.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300">
                      <thead className="bg-gray-100">
                        <tr>
                          {result.columns.map((col: string) => (
                            <th
                              key={col}
                              className="border border-gray-300 px-4 py-2 text-left"
                            >
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {result.results.map((row: any, idx: number) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            {result.columns.map((col: string) => (
                              <td
                                key={col}
                                className="border border-gray-300 px-4 py-2"
                              >
                                {row[col] !== null && row[col] !== undefined
                                  ? String(row[col])
                                  : "-"}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500">Không có kết quả</p>
                )}
              </div>
            </div>
          )}
        </Card>
      )}

      {/* Instructions */}
      <Card className="p-4 mt-6 bg-blue-50">
        <h3 className="font-semibold mb-2">📖 Hướng dẫn:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          <li>Hỏi câu hỏi bằng tiếng Việt tự nhiên</li>
          <li>AI sẽ chuyển câu hỏi thành SQL và thực thi</li>
          <li>Kết quả sẽ hiển thị dưới dạng bảng</li>
          <li>Độ tin cậy cho biết AI có chắc chắn về SQL không</li>
        </ul>
      </Card>
    </div>
  );
}
