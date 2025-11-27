"use client";

import { useRouter } from "next/navigation";

export default function ForbiddenPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FCF9E3]">
      <div className="text-center p-8">
        <div className="text-8xl mb-6">🚫</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          403 - Không có quyền truy cập
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Bạn không có quyền truy cập trang này.
        </p>
        <div className="space-x-4">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            ← Quay lại
          </button>
          <button
            onClick={() => router.push("/dashbrach")}
            className="px-6 py-3 bg-[#A20105] text-white rounded-lg hover:bg-[#8A0104] transition-colors"
          >
            🏠 Về Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
