"use client";

/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         TEXT-TO-SQL PAGE                                      ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Giao diện hỏi đáp AI về gia phả bằng tiếng Việt                            ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { queryText2SQL, getExamples, type Text2SQLExample } from "@/service/text2sql.service";
import { useAuth } from "@/context/AuthContext";
import { Loader2, Send, Sparkles, Database, AlertCircle } from "lucide-react";

interface QueryResult {
  question: string;
  sql: string;
  result: {
    type: "count" | "list" | "empty";
    count?: number;
    value?: number;
    data?: any[];
    message: string;
  };
  timestamp: string;
}

export default function Text2SQLPage() {
  const { user } = useAuth();
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QueryResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [examples, setExamples] = useState<Text2SQLExample[]>([]);
  const [showExamples, setShowExamples] = useState(true);

  // Load examples khi component mount
  useEffect(() => {
    loadExamples();
  }, []);

  const loadExamples = async () => {
    try {
      const response = await getExamples();
      if (response.success) {
        setExamples(response.data.fullExamples.slice(0, 15)); // Lấy 15 examples đầu
      }
    } catch (err) {
      console.error("Error loading examples:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!question.trim()) {
      setError("Vui lòng nhập câu hỏi");
      return;
    }

    if (!user?.dongHoId) {
      setError("Không tìm thấy thông tin dòng họ");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setShowExamples(false);

    try {
      const response = await queryText2SQL(question, user.dongHoId);
      
      if (response.success) {
        setResult(response.data);
      } else {
        setError(response.message || "Có lỗi xảy ra");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Không thể kết nối đến server");
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (exampleQuestion: string) => {
    setQuestion(exampleQuestion);
    setShowExamples(false);
  };

  const renderResult = () => {
    if (!result) return null;

    const { result: queryResult } = result;

    return (
      <div className="space-y-4">
        {/* SQL Query */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Database className="w-4 h-4" />
              SQL Query
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
              {result.sql}
            </pre>
          </CardContent>
        </Card>

        {/* Kết quả */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Kết quả</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold mb-4">{queryResult.message}</p>

            {queryResult.type === "count" && (
              <div className="text-4xl font-bold text-blue-600">
                {queryResult.value}
              </div>
            )}

            {queryResult.type === "list" && queryResult.data && queryResult.data.length > 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      {Object.keys(queryResult.data[0]).map((key) => (
                        <th key={key} className="border px-4 py-2 text-left text-sm font-semibold">
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {queryResult.data.map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        {Object.values(row).map((value: any, cellIdx) => (
                          <td key={cellIdx} className="border px-4 py-2 text-sm">
                            {value !== null && value !== undefined ? String(value) : "-"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {queryResult.type === "empty" && (
              <div className="text-gray-500 text-center py-8">
                <AlertCircle className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>Không tìm thấy kết quả nào</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-yellow-500" />
          Hỏi đáp AI về Gia phả
        </h1>
        <p className="text-gray-600">
          Đặt câu hỏi bằng tiếng Việt, AI sẽ tự động chuyển thành SQL và trả về kết quả
        </p>
      </div>

      {/* Form nhập câu hỏi */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="VD: Có bao nhiêu người trong gia phả?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                disabled={loading}
                className="flex-1"
              />
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Đang xử lý...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Gửi
                  </>
                )}
              </Button>
            </div>

            {!showExamples && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowExamples(!showExamples)}
              >
                {showExamples ? "Ẩn" : "Xem"} câu hỏi mẫu
              </Button>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Error */}
      {error && (
        <Card className="mb-6 border-red-300 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="w-5 h-5" />
              <p>{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Kết quả */}
      {result && renderResult()}

      {/* Câu hỏi mẫu */}
      {showExamples && examples.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Câu hỏi mẫu</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {examples.map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => handleExampleClick(example.question)}
                  className="text-left p-3 rounded border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-colors"
                >
                  <p className="text-sm text-gray-700">{example.question}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
