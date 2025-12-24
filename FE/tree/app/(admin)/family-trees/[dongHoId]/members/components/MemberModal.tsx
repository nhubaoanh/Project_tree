"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Upload, Loader2, Image as ImageIcon, Trash2, Plus } from "lucide-react";
import { uploadFile, uploadFiles } from "@/service/upload.service";
import { IMember } from "@/types/member";
import { API_DOWNLOAD } from "@/constant/config";
import { FormRules, validateForm, validateField } from "@/lib/validator";
import storage from "@/utils/storage";

// Validation rules - bỏ dongHoId vì sẽ tự động lấy từ URL
const memberRules: FormRules = {
  hoTen: { label: "Họ tên", rules: ["required", "fullName"] },
  gioiTinh: { label: "Giới tính", rules: ["required", "gender"] },
  ngaySinh: { label: "Ngày sinh", rules: ["required", "date", "notFuture"] },
  doiThuoc: { label: "Đời thứ", rules: ["integer", "positive"] },
};

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: Partial<IMember>) => void;
  member?: IMember | null;
  isLoading?: boolean;
  dongHoId: string; // Thêm prop dongHoId
}

export const MemberModal: React.FC<MemberModalProps> = ({
  isOpen,
  onClose,
  onSave,
  member,
  isLoading = false,
  dongHoId, // Nhận dongHoId từ props
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const multiFileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Partial<IMember>>({});
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadingMulti, setUploadingMulti] = useState(false);
  const [extraImages, setExtraImages] = useState<string[]>([]);

  // Reset form khi modal mở - tự động gán dongHoId
  useEffect(() => {
    if (isOpen) {
      setFormData({
        hoTen: member?.hoTen || "",
        dongHoId: dongHoId, // Tự động gán dongHoId từ URL
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
      setPreviewUrl(member?.anhChanDung ? `${API_DOWNLOAD}/${member.anhChanDung}` : null);
      setExtraImages([]);
      setErrors({});
      setTouched({});
    }
  }, [isOpen, member, dongHoId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let newValue: any = type === "number" ? (value ? Number(value) : undefined) : value;
    if (name === "hoTen" && typeof newValue === "string") {
      newValue = newValue.replace(/\d/g, "");
    }
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    if (touched[name]) {
      const error = validateField(name, newValue, memberRules, formData);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value, memberRules, formData);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSingleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { alert("Vui lòng chọn file ảnh!"); return; }
    if (file.size > 5 * 1024 * 1024) { alert("File không được vượt quá 5MB!"); return; }

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

  const handleMultiUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (!files[i].type.startsWith("image/")) { alert(`File "${files[i].name}" không phải ảnh!`); return; }
      if (files[i].size > 5 * 1024 * 1024) { alert(`File "${files[i].name}" vượt quá 5MB!`); return; }
    }
    setUploadingMulti(true);
    try {
      const formDataUpload = new FormData();
      Array.from(files).forEach((file) => formDataUpload.append("files", file));
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

  const handleRemoveMainImage = () => {
    setPreviewUrl(null);
    setFormData((prev) => ({ ...prev, anhChanDung: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveExtraImage = (index: number) => {
    setExtraImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const { isValid, errors: formErrors } = validateForm(formData, memberRules);
    setErrors(formErrors);
    setTouched(Object.keys(memberRules).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    if (!isValid) { alert("Vui lòng kiểm tra lại thông tin!"); return; }
    const user = storage.getUser();
    const dataToSave = { ...formData, dongHoId, lu_user_id: user?.nguoiDungId || undefined };
    onSave(dataToSave);
  };

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
        <div className="flex items-center justify-between p-4 border-b border-[#d4af37] sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-[#5d4037]">
            {member ? "Sửa thành viên" : "Thêm thành viên"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded"><X size={20} /></button>
        </div>

        <div className="p-4 space-y-4">
          {/* Upload Ảnh Chân Dung */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#5d4037]">Ảnh chân dung</label>
            <div className="flex items-start gap-4">
              <div className="w-32 h-32 border-2 border-dashed border-[#d4af37] rounded-lg overflow-hidden flex items-center justify-center bg-[#fdf6e3]">
                {uploading ? <Loader2 className="w-8 h-8 animate-spin text-[#d4af37]" /> : previewUrl ? <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" /> : <ImageIcon className="w-12 h-12 text-[#d4af37] opacity-50" />}
              </div>
              <div className="flex flex-col gap-2">
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleSingleUpload} className="hidden" />
                <button type="button" onClick={() => fileInputRef.current?.click()} disabled={uploading} className="flex items-center gap-2 px-4 py-2 bg-[#d4af37] text-white rounded hover:bg-[#b8962f] disabled:opacity-50">
                  <Upload size={16} />{uploading ? "Đang tải..." : "Chọn ảnh"}
                </button>
                {previewUrl && <button type="button" onClick={handleRemoveMainImage} className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50"><Trash2 size={16} />Xóa ảnh</button>}
              </div>
            </div>
          </div>

          {/* Upload Nhiều Ảnh Phụ */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[#5d4037]">Ảnh bổ sung</label>
            <div className="flex flex-wrap gap-3">
              {extraImages.map((path, index) => (
                <div key={index} className="relative w-24 h-24 group">
                  <img src={`${API_DOWNLOAD}/${path}`} alt={`Extra ${index + 1}`} className="w-full h-full object-cover rounded-lg border border-[#d4af37]" />
                  <button type="button" onClick={() => handleRemoveExtraImage(index)} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X size={14} /></button>
                </div>
              ))}
              <div onClick={() => !uploadingMulti && multiFileInputRef.current?.click()} className={`w-24 h-24 border-2 border-dashed border-[#d4af37] rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-[#fdf6e3] ${uploadingMulti ? "opacity-50 cursor-not-allowed" : ""}`}>
                {uploadingMulti ? <Loader2 className="w-6 h-6 animate-spin text-[#d4af37]" /> : <><Plus size={24} className="text-[#d4af37]" /><span className="text-xs text-[#d4af37] mt-1">Thêm ảnh</span></>}
              </div>
              <input ref={multiFileInputRef} type="file" accept="image/*" multiple onChange={handleMultiUpload} className="hidden" />
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">Họ và tên <span className="text-red-500">*</span></label>
              <input type="text" name="hoTen" value={formData.hoTen || ""} onChange={handleChange} onBlur={handleBlur} className={`w-full px-3 py-2 border rounded focus:outline-none ${touched.hoTen && errors.hoTen ? "border-red-500" : "border-[#d4af37] focus:border-[#b91c1c]"}`} />
              {touched.hoTen && errors.hoTen && <p className="text-red-500 text-xs mt-1">{errors.hoTen}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">Giới tính</label>
              <select name="gioiTinh" value={formData.gioiTinh ?? 1} onChange={handleChange} className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:border-[#b91c1c]">
                <option value={1}>Nam</option>
                <option value={0}>Nữ</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">Ngày sinh <span className="text-red-500">*</span></label>
              <input type="date" name="ngaySinh" value={formatDateForInput(formData.ngaySinh)} max={new Date().toISOString().split("T")[0]} onChange={(e) => { setFormData({ ...formData, ngaySinh: e.target.value ? new Date(e.target.value) : undefined }); }} className={`w-full px-3 py-2 border rounded focus:outline-none ${touched.ngaySinh && errors.ngaySinh ? "border-red-500" : "border-[#d4af37] focus:border-[#b91c1c]"}`} />
              {touched.ngaySinh && errors.ngaySinh && <p className="text-red-500 text-xs mt-1">{errors.ngaySinh}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">Ngày mất</label>
              <input type="date" value={formatDateForInput(formData.ngayMat)} onChange={(e) => setFormData({ ...formData, ngayMat: e.target.value ? new Date(e.target.value) : undefined })} className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:border-[#b91c1c]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">Nơi sinh</label>
              <input type="text" value={formData.noiSinh || ""} onChange={(e) => setFormData({ ...formData, noiSinh: e.target.value })} className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:border-[#b91c1c]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">Nơi mất</label>
              <input type="text" value={formData.noiMat || ""} onChange={(e) => setFormData({ ...formData, noiMat: e.target.value })} className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:border-[#b91c1c]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">Nghề nghiệp</label>
              <input type="text" value={formData.ngheNghiep || ""} onChange={(e) => setFormData({ ...formData, ngheNghiep: e.target.value })} className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:border-[#b91c1c]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">Trình độ học vấn</label>
              <input type="text" value={formData.trinhDoHocVan || ""} onChange={(e) => setFormData({ ...formData, trinhDoHocVan: e.target.value })} className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:border-[#b91c1c]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">Đời thứ</label>
              <input type="number" name="doiThuoc" min={1} value={formData.doiThuoc ?? 1} onChange={handleChange} className={`w-full px-3 py-2 border rounded focus:outline-none ${touched.doiThuoc && errors.doiThuoc ? "border-red-500" : "border-[#d4af37] focus:border-[#b91c1c]"}`} />
              {touched.doiThuoc && errors.doiThuoc && <p className="text-red-500 text-xs mt-1">{errors.doiThuoc}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#5d4037] mb-1">Địa chỉ hiện tại</label>
              <input type="text" value={formData.diaChiHienTai || ""} onChange={(e) => setFormData({ ...formData, diaChiHienTai: e.target.value })} className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:border-[#b91c1c]" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#5d4037] mb-1">Tiểu sử</label>
              <textarea rows={3} value={formData.tieuSu || ""} onChange={(e) => setFormData({ ...formData, tieuSu: e.target.value })} className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:border-[#b91c1c] resize-none" />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 p-4 border-t border-[#d4af37] sticky bottom-0 bg-white">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">Hủy</button>
          <button onClick={handleSubmit} disabled={isLoading || uploading || uploadingMulti} className="px-4 py-2 bg-[#b91c1c] text-white rounded hover:bg-[#991b1b] disabled:opacity-50">
            {isLoading ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
};
