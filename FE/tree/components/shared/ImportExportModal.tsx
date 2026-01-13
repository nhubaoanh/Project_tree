"use client";
import React, { useRef, useState } from "react";
import { X, Download, Upload, FileSpreadsheet, AlertCircle, CheckCircle, Info } from "lucide-react";
import { toast } from "react-hot-toast";

interface ImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onDownloadTemplate: () => Promise<void>;
  onImportExcel: (file: File) => Promise<any>;
  templateFileName: string;
  isLoading?: boolean;
}

export const ImportExportModal: React.FC<ImportExportModalProps> = ({
  isOpen,
  onClose,
  title,
  onDownloadTemplate,
  onImportExcel,
  templateFileName,
  isLoading = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [importing, setImporting] = useState(false);

  if (!isOpen) return null;

  const handleDownloadTemplate = async () => {
    try {
      await onDownloadTemplate();
    } catch (error) {
      toast.error("Không thể tải template");
    }
  };

  const handleFileSelect = async (file: File) => {
    // Validate file type
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      toast.error("Chỉ chấp nhận file Excel (.xlsx, .xls)");
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File quá lớn. Kích thước tối đa 10MB");
      return;
    }

    setImporting(true);
    try {
      const result = await onImportExcel(file);
      if (result.success) {
        toast.success(result.message || "Import thành công!");
        onClose();
      } else {
        toast.error(result.message || "Import thất bại");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Có lỗi xảy ra khi import");
    } finally {
      setImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={importing}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Step 1: Download Template */}
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">1</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-blue-900 mb-2">
                  Tải Template Excel
                </h3>
                <p className="text-blue-700 mb-3">
                  Tải file template mẫu để nhập dữ liệu theo đúng định dạng
                </p>
                <button
                  onClick={handleDownloadTemplate}
                  disabled={isLoading}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Tải Template
                </button>
              </div>
            </div>
          </div>

          {/* Step 2: Import Excel */}
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-semibold text-sm">2</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-green-900 mb-2">
                  Import File Excel
                </h3>
                <p className="text-green-700 mb-3">
                  Chọn file Excel đã điền dữ liệu để import vào hệ thống
                </p>

                {/* Drag & Drop Area */}
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive
                      ? "border-green-400 bg-green-50"
                      : "border-gray-300 hover:border-green-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <FileSpreadsheet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    Kéo thả file Excel vào đây hoặc
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={importing}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {importing ? "Đang xử lý..." : "Chọn File"}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleFileInput}
                    className="hidden"
                    disabled={importing}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-yellow-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-900 mb-2">Lưu ý quan trọng:</h4>
                <ul className="text-yellow-800 text-sm space-y-1">
                  <li>• Chỉ chấp nhận file Excel (.xlsx, .xls)</li>
                  <li>• Kích thước file tối đa 10MB</li>
                  <li>• Chỉ được chọn 1 file tại một thời điểm</li>
                  <li>• Vui lòng sử dụng template để đảm bảo định dạng đúng</li>
                  <li>• Xóa dữ liệu mẫu trước khi nhập dữ liệu thật</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            disabled={importing}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};