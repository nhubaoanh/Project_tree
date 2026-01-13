"use client";
import React from "react";
import { X, FileSpreadsheet, CheckCircle, AlertTriangle, Info } from "lucide-react";

interface ImportGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "thu" | "chi";
}

export const ImportGuideModal: React.FC<ImportGuideModalProps> = ({
  isOpen,
  onClose,
  type,
}) => {
  if (!isOpen) return null;

  const title = type === "thu" ? "Hướng dẫn Import Tài Chính Thu" : "Hướng dẫn Import Tài Chính Chi";
  
  const thuFields = [
    { field: "STT", description: "Số thứ tự (bắt buộc)", example: "1, 2, 3..." },
    { field: "Họ tên người đóng", description: "Tên người đóng góp (bắt buộc)", example: "Nguyễn Văn A" },
    { field: "Ngày đóng", description: "Ngày đóng góp (DD/MM/YYYY)", example: "01/01/2025" },
    { field: "Danh mục", description: "Tên danh mục có sẵn (bắt buộc)", example: "Đóng góp tổ chức sự kiện" },
    { field: "Số tiền", description: "Số tiền đóng góp (bắt buộc)", example: "500000" },
    { field: "Phương thức thanh toán", description: "Tiền mặt hoặc Chuyển khoản", example: "Tiền mặt" },
    { field: "Nội dung", description: "Mô tả chi tiết", example: "Đóng góp cho lễ giỗ tổ" },
    { field: "Ghi chú", description: "Ghi chú thêm", example: "Đã thanh toán" },
  ];

  const chiFields = [
    { field: "STT", description: "Số thứ tự (bắt buộc)", example: "1, 2, 3..." },
    { field: "Ngày chi", description: "Ngày chi tiền (DD/MM/YYYY)", example: "01/01/2025" },
    { field: "Danh mục", description: "Tên danh mục có sẵn (bắt buộc)", example: "Chi giỗ tổ" },
    { field: "Số tiền", description: "Số tiền chi (bắt buộc)", example: "800000" },
    { field: "Phương thức thanh toán", description: "Tiền mặt hoặc Chuyển khoản", example: "Chuyển khoản" },
    { field: "Nội dung", description: "Mô tả chi tiết", example: "Chi tổ chức giỗ tổ" },
    { field: "Người nhận", description: "Tên người nhận", example: "Nhà hàng ABC" },
    { field: "Ghi chú", description: "Ghi chú thêm", example: "Đã thanh toán" },
  ];

  const fields = type === "thu" ? thuFields : chiFields;
  const categories = type === "thu" 
    ? ["Đóng góp tổ chức sự kiện", "Đóng góp xây dựng", "Đóng góp từ thiện", "Thu khác"]
    : ["Chi giỗ tổ", "Chi sửa mộ", "Chi họp họ", "Chi khác"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Overview */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-900 mb-2">Tổng quan</h3>
                <p className="text-blue-800 text-sm">
                  Hệ thống import cho phép bạn nhập hàng loạt dữ liệu {type === "thu" ? "thu" : "chi"} từ file Excel. 
                  Vui lòng tải template và điền dữ liệu theo đúng định dạng để đảm bảo import thành công.
                </p>
              </div>
            </div>
          </div>

          {/* Field Descriptions */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Mô tả các trường dữ liệu</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tên trường
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Mô tả
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ví dụ
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {fields.map((field, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {field.field}
                        {field.description.includes("bắt buộc") && (
                          <span className="text-red-500 ml-1">*</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {field.description}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                        {field.example}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Danh mục có sẵn</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {categories.map((category, index) => (
                  <div key={index} className="bg-white rounded px-3 py-2 text-sm text-gray-700 border">
                    {category}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rules */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quy tắc import</h3>
            <div className="space-y-4">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-900 mb-2">Điều kiện thành công</h4>
                    <ul className="text-green-800 text-sm space-y-1">
                      <li>• File Excel đúng định dạng (.xlsx, .xls)</li>
                      <li>• Header khớp với template</li>
                      <li>• Các trường bắt buộc không được để trống</li>
                      <li>• Danh mục phải tồn tại trong hệ thống</li>
                      <li>• Số tiền phải là số dương</li>
                      <li>• Ngày đúng định dạng DD/MM/YYYY</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-900 mb-2">Lỗi thường gặp</h4>
                    <ul className="text-red-800 text-sm space-y-1">
                      <li>• File không đúng định dạng Excel</li>
                      <li>• Header không khớp với template</li>
                      <li>• Danh mục không tồn tại</li>
                      <li>• Số tiền không hợp lệ (âm hoặc không phải số)</li>
                      <li>• Ngày không đúng định dạng</li>
                      <li>• File quá lớn (&gt;10MB)</li>
                      <li>• Chọn nhiều file cùng lúc</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Các bước thực hiện</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Tải template Excel</p>
                  <p className="text-gray-600 text-sm">Click "Tải Template" để tải file mẫu có sẵn định dạng và hướng dẫn</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Điền dữ liệu</p>
                  <p className="text-gray-600 text-sm">Xóa dữ liệu mẫu và điền dữ liệu thật theo đúng định dạng</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Import file</p>
                  <p className="text-gray-600 text-sm">Chọn file Excel đã điền và upload để import vào hệ thống</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-600 font-semibold text-sm">4</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Kiểm tra kết quả</p>
                  <p className="text-gray-600 text-sm">Xem thông báo kết quả và kiểm tra dữ liệu đã được import</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};