"use client";
import React, { useState, useEffect, useRef } from "react";
import { X, Loader2, Upload, Trash2, Info } from "lucide-react";
import { ITaiLieu, LOAI_TAI_LIEU } from "@/service/tailieu.service";
import { uploadFile } from "@/service/upload.service";
import { getImageUrl } from "@/utils/imageUtils";
import { useToast } from "@/service/useToas";
import {
  prepareFileForUpload,
  formatFileSize,
  getFileIcon,
  FILE_SIZE_LIMITS,
} from "@/utils/fileCompression";

interface TaiLieuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<ITaiLieu>) => void;
  initialData: ITaiLieu | null;
  isLoading: boolean;
}

export function TaiLieuModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}: TaiLieuModalProps) {
  const [formData, setFormData] = useState<Partial<ITaiLieu>>({
    tenTaiLieu: "",
    moTa: "",
    loaiTaiLieu: "",
    namSangTac: undefined,
    tacGia: "",
    nguonGoc: "",
    ghiChu: "",
    duongDan: "",
  });

  const [uploading, setUploading] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string>("");
  const [compressionInfo, setCompressionInfo] = useState<{
    compressed: boolean;
    originalSize: number;
    newSize: number;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showError, showSuccess } = useToast();

  useEffect(() => {
    if (initialData) {
      setFormData({
        tenTaiLieu: initialData.tenTaiLieu || "",
        moTa: initialData.moTa || "",
        loaiTaiLieu: initialData.loaiTaiLieu || "",
        namSangTac: initialData.namSangTac,
        tacGia: initialData.tacGia || "",
        nguonGoc: initialData.nguonGoc || "",
        ghiChu: initialData.ghiChu || "",
        duongDan: initialData.duongDan || "",
      });
      // Extract filename from path if exists
      if (initialData.duongDan) {
        const fileName = initialData.duongDan.split('/').pop() || "";
        setUploadedFileName(fileName);
      }
    } else {
      setFormData({
        tenTaiLieu: "",
        moTa: "",
        loaiTaiLieu: "",
        namSangTac: undefined,
        tacGia: "",
        nguonGoc: "",
        ghiChu: "",
        duongDan: "",
      });
      setUploadedFileName("");
    }
  }, [initialData, isOpen]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Chuẩn bị file: validate và nén nếu cần
      const { file: preparedFile, compressed, originalSize, newSize } = 
        await prepareFileForUpload(file, {
          autoCompress: true,
          maxWidth: 1920,
          maxHeight: 1080,
          quality: 0.8,
        });

      // Lưu thông tin nén
      setCompressionInfo({ compressed, originalSize, newSize });

      // Upload file đã được xử lý
      const formDataUpload = new FormData();
      formDataUpload.append("file", preparedFile);
      const result = await uploadFile(formDataUpload);

      if (result.success) {
        setFormData((prev) => ({ ...prev, duongDan: result.path }));
        setUploadedFileName(file.name);
        
        if (compressed) {
          const savedPercent = ((originalSize - newSize) / originalSize * 100).toFixed(1);
          showSuccess(`Upload thành công! Đã nén ${savedPercent}% (${formatFileSize(originalSize)} → ${formatFileSize(newSize)})`);
        } else {
          showSuccess("Upload file thành công!");
        }
      } else {
        showError(result.message || "Upload thất bại");
      }
    } catch (error: any) {
      showError(error.message || "Có lỗi xảy ra khi upload");
      setCompressionInfo(null);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveFile = () => {
    setFormData((prev) => ({ ...prev, duongDan: "" }));
    setUploadedFileName("");
    setCompressionInfo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.tenTaiLieu?.trim()) {
      showError("Vui lòng nhập tên tài liệu");
      return;
    }
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#fffdf5] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl border border-[#d4af37]">
        <div className="bg-[#b91c1c] text-yellow-400 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-[#5d4037]">
            {initialData ? "Chỉnh sửa tài liệu" : "Thêm tài liệu mới"}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-white/50 rounded">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#5d4037] mb-1">
              Tên tài liệu <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.tenTaiLieu}
              onChange={(e) =>
                setFormData({ ...formData, tenTaiLieu: e.target.value })
              }
              className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50"
              placeholder="Nhập tên tài liệu"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">
                Loại tài liệu
              </label>
              <select
                value={formData.loaiTaiLieu}
                onChange={(e) =>
                  setFormData({ ...formData, loaiTaiLieu: e.target.value })
                }
                className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50"
              >
                <option value="">-- Chọn loại --</option>
                {LOAI_TAI_LIEU.map((loai) => (
                  <option key={loai} value={loai}>
                    {loai}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">
                Năm sáng tác
              </label>
              <input
                type="number"
                value={formData.namSangTac || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    namSangTac: e.target.value
                      ? parseInt(e.target.value)
                      : undefined,
                  })
                }
                className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50"
                placeholder="VD: 1920"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">
                Tác giả
              </label>
              <input
                type="text"
                value={formData.tacGia}
                onChange={(e) =>
                  setFormData({ ...formData, tacGia: e.target.value })
                }
                className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50"
                placeholder="Tên tác giả"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">
                Nguồn gốc
              </label>
              <input
                type="text"
                value={formData.nguonGoc}
                onChange={(e) =>
                  setFormData({ ...formData, nguonGoc: e.target.value })
                }
                className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50"
                placeholder="VD: Lưu trữ tại nhà thờ họ"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5d4037] mb-1">
              Mô tả
            </label>
            <textarea
              value={formData.moTa}
              onChange={(e) =>
                setFormData({ ...formData, moTa: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50"
              placeholder="Mô tả chi tiết về tài liệu"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5d4037] mb-2">
              Tài liệu / File đính kèm
            </label>
            
            {/* Upload Button */}
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-2 px-4 py-2 bg-[#d4af37] text-white rounded hover:bg-[#b8962f] disabled:opacity-50 transition-colors"
              >
                <Upload size={16} />
                {uploading ? "Đang tải lên..." : "Chọn file"}
              </button>

              {/* Display uploaded file */}
              {formData.duongDan && (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-3 bg-[#fdf6e3] border border-[#d4af37] rounded">
                    <span className="text-2xl">{getFileIcon(uploadedFileName)}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#5d4037] truncate">
                        {uploadedFileName || "File đã tải lên"}
                      </p>
                      <a
                        href={getImageUrl(formData.duongDan)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline"
                      >
                        Xem file
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="p-1 hover:bg-red-100 rounded text-red-600"
                      title="Xóa file"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  {/* Compression info */}
                  {compressionInfo?.compressed && (
                    <div className="flex items-start gap-2 p-2 bg-green-50 border border-green-200 rounded text-xs">
                      <Info size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <div className="text-green-700">
                        <p className="font-medium">Đã tự động nén file</p>
                        <p>
                          {formatFileSize(compressionInfo.originalSize)} → {formatFileSize(compressionInfo.newSize)}
                          {' '}(Tiết kiệm {((compressionInfo.originalSize - compressionInfo.newSize) / compressionInfo.originalSize * 100).toFixed(1)}%)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Manual URL input */}
              <div className="pt-2 border-t border-[#d4af37]/30">
                <label className="block text-xs text-[#8b5e3c] mb-1">
                  Hoặc nhập URL trực tiếp:
                </label>
                <input
                  type="text"
                  value={formData.duongDan}
                  onChange={(e) =>
                    setFormData({ ...formData, duongDan: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 text-sm"
                  placeholder="https://example.com/file.pdf"
                />
              </div>

              <div className="flex items-start gap-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
                <Info size={14} className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-blue-700">
                  <p className="font-medium mb-1">Giới hạn kích thước:</p>
                  <ul className="space-y-0.5">
                    <li>• Hình ảnh: tối đa {FILE_SIZE_LIMITS.IMAGE}MB (tự động nén)</li>
                    <li>• Tài liệu (PDF, Word, Excel): tối đa {FILE_SIZE_LIMITS.DOCUMENT}MB</li>
                    <li>• File khác: tối đa {FILE_SIZE_LIMITS.MAX}MB</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5d4037] mb-1">
              Ghi chú
            </label>
            <textarea
              value={formData.ghiChu}
              onChange={(e) =>
                setFormData({ ...formData, ghiChu: e.target.value })
              }
              rows={2}
              className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50"
              placeholder="Ghi chú thêm"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-[#b91c1c] text-white rounded hover:bg-[#991b1b] disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading && <Loader2 className="animate-spin" size={16} />}
              {isLoading
                ? "Đang lưu..."
                : initialData
                ? "Cập nhật"
                : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
