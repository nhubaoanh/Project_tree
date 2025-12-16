"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Upload, Loader2, Image as ImageIcon, Trash2, Plus } from "lucide-react";
import { uploadFile, uploadFiles } from "@/service/upload.service";
import { IMember } from "@/types/member";
import { API_DOWNLOAD } from "@/constant/config";

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: Partial<IMember>) => void;
  member?: IMember | null;
  isLoading?: boolean;
}

export const MemberModal: React.FC<MemberModalProps> = ({
  isOpen,
  onClose,
  onSave,
  member,
  isLoading = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const multiFileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<IMember>>({});
  
  // Upload state - ảnh chân dung (1 ảnh)
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // Upload state - ảnh phụ (nhiều ảnh)
  const [uploadingMulti, setUploadingMulti] = useState(false);
  const [extraImages, setExtraImages] = useState<string[]>([]);

  // Reset form khi modal mở hoặc member thay đổi
  useEffect(() => {
    if (isOpen) {
      setFormData({
        hoTen: member?.hoTen || "",
        dongHoId: member?.dongHoId || "",
        gioiTinh: member?.gioiTinh ?? 1,
        ngaySinh: member?.ngaySinh,
        ngayMat: member?.ngayMat,
        noiSinh: member?.noiSinh || "",
        noiMat: member?.noiMat || "",
        ngheNghiep: member?.ngheNghiep || "",
        trinhDoHocVan: member?.trinhDoHocVan || "",
        diaChiHienTai: member?.diaChiHienTai || "",
        tieuSu: member?.tieuSu || "",
        anhChanDung: member?.anhChanDung || "",
        doiThuoc: member?.doiThuoc ?? 1,
        chaId: member?.chaId,
        meId: member?.meId,
        voId: member?.voId,
        chongId: member?.chongId,
      });
      setPreviewUrl(
        member?.anhChanDung ? `${API_DOWNLOAD}/${member.anhChanDung}` : null
      );
      setExtraImages([]);
    }
  }, [isOpen, member]);

  // Upload 1 ảnh chân dung
  const handleSingleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn file ảnh!");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("File không được vượt quá 5MB!");
      return;
    }

    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    setUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);

      const result = await uploadFile(formDataUpload);

      if (result.success) {
        setFormData((prev) => ({ ...prev, anhChanDung: result.path }));
      } else {
        throw new Error(result.message || "Upload thất bại");
      }
    } catch (error: any) {
      console.error("Upload failed:", error);
      alert(error.message || "Upload ảnh thất bại!");
      setPreviewUrl(null);
    } finally {
      setUploading(false);
    }
  };

  // Upload nhiều ảnh phụ
  const handleMultiUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Validate tất cả files
    for (let i = 0; i < files.length; i++) {
      if (!files[i].type.startsWith("image/")) {
        alert(`File "${files[i].name}" không phải ảnh!`);
        return;
      }
      if (files[i].size > 5 * 1024 * 1024) {
        alert(`File "${files[i].name}" vượt quá 5MB!`);
        return;
      }
    }

    setUploadingMulti(true);
    try {
      const formDataUpload = new FormData();
      Array.from(files).forEach((file) => {
        formDataUpload.append("files", file);
      });

      const result = await uploadFiles(formDataUpload);

      if (result.success && result.paths) {
        setExtraImages((prev) => [...prev, ...result.paths]);
      } else {
        throw new Error(result.message || "Upload thất bại");
      }
    } catch (error: any) {
      console.error("Multi upload failed:", error);
      alert(error.message || "Upload ảnh thất bại!");
    } finally {
      setUploadingMulti(false);
      if (multiFileInputRef.current) multiFileInputRef.current.value = "";
    }
  };

  // Xóa ảnh chân dung
  const handleRemoveMainImage = () => {
    setPreviewUrl(null);
    setFormData((prev) => ({ ...prev, anhChanDung: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Xóa 1 ảnh phụ
  const handleRemoveExtraImage = (index: number) => {
    setExtraImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit form
  const handleSubmit = () => {
    if (!formData.hoTen?.trim()) {
      alert("Vui lòng nhập họ tên!");
      return;
    }
    // Gửi cả ảnh chính và ảnh phụ
    onSave({
      ...formData,
      // Nếu cần lưu ảnh phụ, có thể thêm field mới hoặc join thành string
      // extraImages: extraImages.join(","),
    });
  };

  // Format date cho input
  const formatDateForInput = (date: Date | string | undefined): string => {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().split("T")[0];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#d4af37] sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-[#5d4037]">
            {member ? "Sửa thành viên" : "Thêm thành viên"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4">
          {/* Upload Ảnh Chân Dung (1 ảnh) */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#5d4037]">
              Ảnh chân dung (1 ảnh)
            </label>
            <div className="flex items-start gap-4">
              <div className="w-32 h-32 border-2 border-dashed border-[#d4af37] rounded-lg overflow-hidden flex items-center justify-center bg-[#fdf6e3]">
                {uploading ? (
                  <Loader2 className="w-8 h-8 animate-spin text-[#d4af37]" />
                ) : previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="w-12 h-12 text-[#d4af37] opacity-50" />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleSingleUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="flex items-center gap-2 px-4 py-2 bg-[#d4af37] text-white rounded hover:bg-[#b8962f] disabled:opacity-50"
                >
                  <Upload size={16} />
                  {uploading ? "Đang tải..." : "Chọn ảnh"}
                </button>
                {previewUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveMainImage}
                    className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                    Xóa ảnh
                  </button>
                )}
                <p className="text-xs text-gray-500">PNG, JPG tối đa 5MB</p>
              </div>
            </div>
          </div>

          {/* Upload Nhiều Ảnh Phụ */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#5d4037]">
              Ảnh bổ sung (nhiều ảnh)
            </label>
            <div className="flex flex-wrap gap-3">
              {/* Hiển thị ảnh đã upload */}
              {extraImages.map((path, index) => (
                <div key={index} className="relative w-24 h-24 group">
                  <img
                    src={`${API_DOWNLOAD}/${path}`}
                    alt={`Extra ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg border border-[#d4af37]"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveExtraImage(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}

              {/* Nút thêm ảnh */}
              <div
                onClick={() =>
                  !uploadingMulti && multiFileInputRef.current?.click()
                }
                className={`w-24 h-24 border-2 border-dashed border-[#d4af37] rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-[#fdf6e3] transition-colors ${
                  uploadingMulti ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {uploadingMulti ? (
                  <Loader2 className="w-6 h-6 animate-spin text-[#d4af37]" />
                ) : (
                  <>
                    <Plus size={24} className="text-[#d4af37]" />
                    <span className="text-xs text-[#d4af37] mt-1">
                      Thêm ảnh
                    </span>
                  </>
                )}
              </div>
              <input
                ref={multiFileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleMultiUpload}
                className="hidden"
              />
            </div>
            <p className="text-xs text-gray-500">
              Có thể chọn nhiều ảnh cùng lúc
            </p>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Họ tên */}
            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.hoTen || ""}
                onChange={(e) =>
                  setFormData({ ...formData, hoTen: e.target.value })
                }
                className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:border-[#b91c1c]"
              />
            </div>
            {/* Dòng họ */}
            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">
                Dòng họ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.dongHoId || ""}
                onChange={(e) =>
                  setFormData({ ...formData, dongHoId: e.target.value })
                }
                className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:border-[#b91c1c]"
              />
            </div>

            {/* Giới tính */}
            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">
                Giới tính
              </label>
              <select
                value={formData.gioiTinh ?? 1}
                onChange={(e) =>
                  setFormData({ ...formData, gioiTinh: Number(e.target.value) })
                }
                className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:border-[#b91c1c]"
              >
                <option value={1}>Nam</option>
                <option value={0}>Nữ</option>
              </select>
            </div>

            {/* Ngày sinh */}
            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">
                Ngày sinh
              </label>
              <input
                type="date"
                value={formatDateForInput(formData.ngaySinh)}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ngaySinh: e.target.value
                      ? new Date(e.target.value)
                      : undefined,
                  })
                }
                className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:border-[#b91c1c]"
              />
            </div>

            {/* Ngày mất */}
            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">
                Ngày mất
              </label>
              <input
                type="date"
                value={formatDateForInput(formData.ngayMat)}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    ngayMat: e.target.value
                      ? new Date(e.target.value)
                      : undefined,
                  })
                }
                className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:border-[#b91c1c]"
              />
            </div>

            {/* Nơi sinh */}
            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">
                Nơi sinh
              </label>
              <input
                type="text"
                value={formData.noiSinh || ""}
                onChange={(e) =>
                  setFormData({ ...formData, noiSinh: e.target.value })
                }
                className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:border-[#b91c1c]"
              />
            </div>

            {/* Nơi mất */}
            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">
                Nơi mất
              </label>
              <input
                type="text"
                value={formData.noiMat || ""}
                onChange={(e) =>
                  setFormData({ ...formData, noiMat: e.target.value })
                }
                className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:border-[#b91c1c]"
              />
            </div>

            {/* Nghề nghiệp */}
            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">
                Nghề nghiệp
              </label>
              <input
                type="text"
                value={formData.ngheNghiep || ""}
                onChange={(e) =>
                  setFormData({ ...formData, ngheNghiep: e.target.value })
                }
                className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:border-[#b91c1c]"
              />
            </div>

            {/* Trình độ học vấn */}
            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">
                Trình độ học vấn
              </label>
              <input
                type="text"
                value={formData.trinhDoHocVan || ""}
                onChange={(e) =>
                  setFormData({ ...formData, trinhDoHocVan: e.target.value })
                }
                className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:border-[#b91c1c]"
              />
            </div>

            {/* Đời thuộc */}
            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">
                Đời thứ
              </label>
              <input
                type="number"
                min={1}
                value={formData.doiThuoc ?? 1}
                onChange={(e) =>
                  setFormData({ ...formData, doiThuoc: Number(e.target.value) })
                }
                className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:border-[#b91c1c]"
              />
            </div>

            {/* Địa chỉ hiện tại */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#5d4037] mb-1">
                Địa chỉ hiện tại
              </label>
              <input
                type="text"
                value={formData.diaChiHienTai || ""}
                onChange={(e) =>
                  setFormData({ ...formData, diaChiHienTai: e.target.value })
                }
                className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:border-[#b91c1c]"
              />
            </div>

            {/* Tiểu sử */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#5d4037] mb-1">
                Tiểu sử
              </label>
              <textarea
                rows={3}
                value={formData.tieuSu || ""}
                onChange={(e) =>
                  setFormData({ ...formData, tieuSu: e.target.value })
                }
                className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:border-[#b91c1c] resize-none"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 p-4 border-t border-[#d4af37] sticky bottom-0 bg-white">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading || uploading || uploadingMulti}
            className="px-4 py-2 bg-[#b91c1c] text-white rounded hover:bg-[#991b1b] disabled:opacity-50"
          >
            {isLoading ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
};
