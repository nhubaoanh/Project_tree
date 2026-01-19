"use client";
import React from "react";
import { X, AlertCircle, AlertTriangle, CheckCircle, FileX } from "lucide-react";

interface ErrorItem {
  row?: number;
  field: string;
  message: string;
  value?: any;
}

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  errors: ErrorItem[];
  warnings?: ErrorItem[];
  validCount?: number;
  totalCount?: number;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#fffdf5] rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl border border-[#d4af37] flex flex-col">
        {/* Header - Giống MemberModal */}
        <div className="bg-[#b91c1c] text-yellow-400 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileX className="w-6 h-6 text-yellow-400" />
            <div>
              <h2 className="text-xl font-bold uppercase tracking-wider text-yellow-400">
                {title}
              </h2>
              <p className="text-sm text-yellow-200">
                {hasErrors && `${errors.length} lỗi`}
                {hasErrors && hasWarnings && ", "}
                {hasWarnings && `${warnings.length} cảnh báo`}
                {totalCount > 0 && ` trong ${totalCount} dòng dữ liệu`}
                {" - Vui lòng sửa lỗi và thử lại"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-yellow-200 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Summary Bar */}
        {totalCount > 0 && (
          <div className="p-4 bg-[#fdf6e3] border-b border-[#d4af37]/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                {validCount > 0 && (
                  <div className="flex items-center space-x-2 text-green-700">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-bold">{validCount} dòng hợp lệ</span>
                  </div>
                )}
                {hasErrors && (
                  <div className="flex items-center space-x-2 text-[#b91c1c]">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm font-bold">{errors.length} lỗi cần sửa</span>
                  </div>
                )}
                {hasWarnings && (
                  <div className="flex items-center space-x-2 text-orange-600">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-sm font-bold">{warnings.length} cảnh báo</span>
                  </div>
                )}
              </div>
              <div className="text-sm font-bold text-[#8b5e3c]">
                Tổng: {totalCount} dòng
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-white">
          {/* Errors Section */}
          {hasErrors && (
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4 pb-2 border-b border-[#d4af37]/30">
                <AlertCircle className="w-5 h-5 text-[#b91c1c]" />
                <h3 className="text-lg font-bold text-[#b91c1c] uppercase tracking-wide">
                  Lỗi cần sửa ({errors.length})
                </h3>
              </div>
              
              <div className="space-y-4">
                {errors.slice(0, 50).map((error, index) => (
                  <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-start space-x-4">
                      {/* Row Number */}
                      <div className="flex-shrink-0">
                        {error.row ? (
                          <div className="w-10 h-10 bg-[#b91c1c] text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {error.row}
                          </div>
                        ) : (
                          <div className="w-10 h-10 bg-red-100 text-[#b91c1c] rounded-full flex items-center justify-center">
                            <AlertCircle className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                      
                      {/* Error Details */}
                      <div className="flex-1 min-w-0">
                        {/* Header */}
                        <div className="flex items-center flex-wrap gap-2 mb-2">
                          {error.row && (
                            <span className="text-sm font-bold text-[#b91c1c] bg-red-100 px-2 py-1 rounded">
                              Dòng {error.row}
                            </span>
                          )}
                          <span className="text-sm font-bold text-[#8b5e3c] bg-[#fdf6e3] px-2 py-1 rounded border border-[#d4af37]">
                            {error.field}
                          </span>
                        </div>
                        
                        {/* Error Message */}
                        <p className="text-sm text-[#b91c1c] font-medium mb-2 leading-relaxed">
                          {error.message}
                        </p>
                        
                        {/* Error Value */}
                        {error.value !== undefined && error.value !== null && error.value !== "" && (
                          <div className="bg-red-100 border border-red-200 rounded p-2 mt-2">
                            <p className="text-xs text-red-700 mb-1 font-medium">Giá trị hiện tại:</p>
                            <code className="text-sm text-red-800 bg-white px-2 py-1 rounded border">
                              {String(error.value)}
                            </code>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {errors.length > 50 && (
                  <div className="text-center py-4 text-[#b91c1c] font-medium bg-red-50 rounded-lg border border-red-200">
                    ... và {errors.length - 50} lỗi khác. Vui lòng sửa các lỗi trên trước.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Warnings Section */}
          {hasWarnings && (
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4 pb-2 border-b border-orange-200">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <h3 className="text-lg font-bold text-orange-700 uppercase tracking-wide">
                  Cảnh báo ({warnings.length})
                </h3>
              </div>
              
              <div className="space-y-4">
                {warnings.slice(0, 20).map((warning, index) => (
                  <div key={index} className="bg-orange-50 border border-orange-200 rounded-lg p-4 shadow-sm">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {warning.row ? (
                          <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {warning.row}
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center flex-wrap gap-2 mb-2">
                          {warning.row && (
                            <span className="text-sm font-bold text-orange-700 bg-orange-100 px-2 py-1 rounded">
                              Dòng {warning.row}
                            </span>
                          )}
                          <span className="text-sm font-bold text-orange-700 bg-orange-100 px-2 py-1 rounded">
                            {warning.field}
                          </span>
                        </div>
                        
                        <p className="text-sm text-orange-700 font-medium leading-relaxed">
                          {warning.message}
                        </p>
                        
                        {warning.value !== undefined && (
                          <div className="bg-orange-100 border border-orange-200 rounded p-2 mt-2">
                            <code className="text-sm text-orange-800 bg-white px-2 py-1 rounded border">
                              {String(warning.value)}
                            </code>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-[#fdf6e3] border border-[#d4af37] rounded-lg p-6">
            <h4 className="font-bold text-[#b91c1c] mb-4 uppercase tracking-wide flex items-center">
              <AlertCircle className="w-5 h-5 mr-2" />
              Hướng dẫn sửa lỗi:
            </h4>
            <ul className="text-sm text-[#8b5e3c] space-y-2 leading-relaxed">
              <li className="flex items-start">
                <span className="text-[#d4af37] mr-2 font-bold">•</span>
                <span>Kiểm tra và sửa các lỗi được liệt kê chi tiết ở trên</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#d4af37] mr-2 font-bold">•</span>
                <span>Đảm bảo dữ liệu đúng định dạng theo yêu cầu</span>
              </li>
              <li className="flex items-start">
                <span className="text-[#d4af37] mr-2 font-bold">•</span>
                <span>Lưu file và thử lại sau khi sửa tất cả các lỗi</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer - Giống MemberModal */}
        <div className="p-6 bg-[#fdf6e3] border-t border-[#d4af37]/30 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 text-[#5d4037] font-bold hover:text-[#b91c1c] transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};