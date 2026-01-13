"use client";
import React from "react";
import { X, AlertCircle, AlertTriangle, CheckCircle, FileX } from "lucide-react";

interface ValidationError {
  row: number;
  field: string;
  message: string;
  value?: any;
}

interface ValidationErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  errors: ValidationError[];
  warnings?: ValidationError[];
  validCount?: number;
  totalCount?: number;
}

export const ValidationErrorModal: React.FC<ValidationErrorModalProps> = ({
  isOpen,
  onClose,
  title,
  errors,
  warnings = [],
  validCount = 0,
  totalCount = 0,
}) => {
  if (!isOpen) return null;

  const hasErrors = errors.length > 0;
  const hasWarnings = warnings.length > 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${hasErrors ? 'bg-red-50' : 'bg-yellow-50'}`}>
          <div className="flex items-center space-x-3">
            <FileX className={`w-6 h-6 ${hasErrors ? 'text-red-600' : 'text-yellow-600'}`} />
            <div>
              <h2 className={`text-xl font-semibold ${hasErrors ? 'text-red-900' : 'text-yellow-900'}`}>{title}</h2>
              <p className={`text-sm ${hasErrors ? 'text-red-700' : 'text-yellow-700'}`}>
                {hasErrors && `${errors.length} lỗi`}
                {hasErrors && hasWarnings && ", "}
                {hasWarnings && `${warnings.length} cảnh báo`}
                {totalCount > 0 && ` trong ${totalCount} dòng dữ liệu`}
                {totalCount === 0 && errors.length > 0 && errors[0].field === "Server Error" && " - Lỗi hệ thống"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Summary */}
        {totalCount > 0 && (
          <div className="p-4 bg-gray-50 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {validCount > 0 && (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">{validCount} dòng hợp lệ</span>
                  </div>
                )}
                {hasErrors && (
                  <div className="flex items-center space-x-2 text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">{errors.length} lỗi</span>
                  </div>
                )}
                {hasWarnings && (
                  <div className="flex items-center space-x-2 text-yellow-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm font-medium">{warnings.length} cảnh báo</span>
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-600">
                Tổng: {totalCount} dòng
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Errors */}
          {hasErrors && (
            <div className="mb-6">
              <div className="flex items-center space-x-2 mb-4">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-medium text-red-900">
                  Lỗi cần sửa ({errors.length})
                </h3>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <div className="space-y-3">
                  {errors.slice(0, 20).map((error, index) => (
                    <div key={index} className={`flex items-start space-x-3 p-3 bg-white rounded border-l-4 ${error.field === "Server Error" ? 'border-orange-400' : 'border-red-400'}`}>
                      <div className="flex-shrink-0">
                        {error.field === "Server Error" ? (
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                            !
                          </span>
                        ) : (
                          <span className="inline-flex items-center justify-center w-6 h-6 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                            {error.row}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`text-sm font-medium ${error.field === "Server Error" ? 'text-orange-900' : 'text-red-900'}`}>
                            {error.field === "Server Error" ? "Lỗi hệ thống" : `Dòng ${error.row}`}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded ${error.field === "Server Error" ? 'text-orange-600 bg-orange-100' : 'text-red-600 bg-red-100'}`}>
                            {error.field}
                          </span>
                        </div>
                        <p className={`text-sm ${error.field === "Server Error" ? 'text-orange-800' : 'text-red-800'}`}>{error.message}</p>
                        {error.value !== undefined && (
                          <p className={`text-xs mt-1 ${error.field === "Server Error" ? 'text-orange-600' : 'text-red-600'}`}>
                            Giá trị: <code className={`px-1 rounded ${error.field === "Server Error" ? 'bg-orange-100' : 'bg-red-100'}`}>{String(error.value)}</code>
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  {errors.length > 20 && (
                    <div className="text-center py-2 text-red-600 text-sm">
                      ... và {errors.length - 20} lỗi khác
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Warnings */}
          {hasWarnings && (
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <h3 className="text-lg font-medium text-yellow-900">
                  Cảnh báo ({warnings.length})
                </h3>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="space-y-3">
                  {warnings.slice(0, 10).map((warning, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded border-l-4 border-yellow-400">
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center justify-center w-6 h-6 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                          {warning.row}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-yellow-900">
                            Dòng {warning.row}
                          </span>
                          <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                            {warning.field}
                          </span>
                        </div>
                        <p className="text-sm text-yellow-800">{warning.message}</p>
                        {warning.value !== undefined && (
                          <p className="text-xs text-yellow-600 mt-1">
                            Giá trị: <code className="bg-yellow-100 px-1 rounded">{String(warning.value)}</code>
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                  {warnings.length > 10 && (
                    <div className="text-center py-2 text-yellow-600 text-sm">
                      ... và {warnings.length - 10} cảnh báo khác
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Hướng dẫn sửa lỗi:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              {errors.some(e => e.field === "Server Error") ? (
                <>
                  <li>• Kiểm tra kết nối mạng và thử lại</li>
                  <li>• Đảm bảo file Excel không bị hỏng hoặc có định dạng lạ</li>
                  <li>• Thử tải lại template mẫu và nhập dữ liệu vào template mới</li>
                  <li>• Liên hệ quản trị viên nếu lỗi vẫn tiếp tục</li>
                </>
              ) : (
                <>
                  <li>• Mở lại file Excel và sửa các lỗi theo thông báo trên</li>
                  <li>• Kiểm tra định dạng ngày (DD/MM/YYYY), số tiền (phải là số dương)</li>
                  <li>• Đảm bảo các trường bắt buộc không để trống</li>
                  <li>• Sử dụng đúng danh mục có sẵn trong hệ thống</li>
                  <li>• Lưu file và thử import lại</li>
                </>
              )}
            </ul>
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