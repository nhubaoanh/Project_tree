"use client";

import { useState, useEffect, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { User, Users, Heart, Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ITreeNode } from "@/types/tree";
import { useQueryClient } from "@tanstack/react-query";
import { createMemberWithDongHo, updateMember } from "@/service/member.service";
import { useToast } from "@/service/useToas";
import storage from "@/utils/storage";

interface MemberCRUDModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  member?: ITreeNode | null;
  allMembers: ITreeNode[];
  dongHoId?: string;
}

export function MemberCRUDModal({
  open,
  onOpenChange,
  mode,
  member,
  allMembers,
  dongHoId,
}: MemberCRUDModalProps) {
  console.log("🔄 [MemberCRUDModal] Render with props:", {
    open,
    mode,
    member: member?.hoTen,
    dongHoId,
    allMembersCount: allMembers.length
  });
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();
  
  const [formData, setFormData] = useState<Partial<ITreeNode>>({
    hoTen: "",
    gioiTinh: 1,
    ngheNghiep: "",
    doiThuoc: 1,
    fid: undefined,
    mid: undefined,
    pids: [],
    ngaySinh: undefined,
    ngayMat: undefined,
    noiSinh: "",
    noiMat: "",
    trinhDoHocVan: "",
    diaChiHienTai: "",
    tieuSu: "",
  });
  const [loading, setLoading] = useState(false);
  
  // Combobox states
  const [fatherOpen, setFatherOpen] = useState(false);
  const [motherOpen, setMotherOpen] = useState(false);
  const [spouseOpen, setSpouseOpen] = useState(false);
  const [fatherSearch, setFatherSearch] = useState("");
  const [motherSearch, setMotherSearch] = useState("");
  const [spouseSearch, setSpouseSearch] = useState("");

  // Filter members
  const maleMembers = useMemo(() => 
    allMembers.filter((m) => m.gioiTinh === 1),
    [allMembers]
  );
  
  const femaleMembers = useMemo(() => 
    allMembers.filter((m) => m.gioiTinh === 2),
    [allMembers]
  );

  const getSpouseOptions = useMemo(() => {
    // Opposite gender for spouse
    return formData.gioiTinh === 1 ? femaleMembers : maleMembers;
  }, [formData.gioiTinh, maleMembers, femaleMembers]);

  useEffect(() => {
    if (mode === "edit" && member) {
      setFormData({
        hoTen: member.hoTen || "",
        gioiTinh: member.gioiTinh || 1,
        ngheNghiep: member.ngheNghiep || "",
        doiThuoc: member.doiThuoc || 1,
        fid: member.fid,
        mid: member.mid,
        pids: member.pids || [],
        ngaySinh: member.ngaySinh,
        ngayMat: member.ngayMat,
        noiSinh: member.noiSinh || "",
        noiMat: member.noiMat || "",
        trinhDoHocVan: member.trinhDoHocVan || "",
        diaChiHienTai: member.diaChiHienTai || "",
        tieuSu: member.tieuSu || "",
      });
    } else {
      setFormData({
        hoTen: "",
        gioiTinh: 1,
        ngheNghiep: "",
        doiThuoc: 1,
        fid: undefined,
        mid: undefined,
        pids: [],
        ngaySinh: undefined,
        ngayMat: undefined,
        noiSinh: "",
        noiMat: "",
        trinhDoHocVan: "",
        diaChiHienTai: "",
        tieuSu: "",
      });
    }
  }, [mode, member, open]);

  const getMemberName = (id: number | undefined) => {
    if (!id) return "Chọn...";
    const m = allMembers.find((mem) => mem.id === id);
    return m ? `${m.hoTen} (Đời ${m.doiThuoc})` : "Chọn...";
  };

  const addSpouse = (spouseId: number) => {
    if (!formData.pids?.includes(spouseId)) {
      setFormData({ ...formData, pids: [...(formData.pids || []), spouseId] });
    }
    setSpouseOpen(false);
  };

  const removeSpouse = (spouseId: number) => {
    setFormData({ 
      ...formData, 
      pids: (formData.pids || []).filter((id) => id !== spouseId) 
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Lấy user và dongHoId
      const user = storage.getUser();
      const userDongHoId = user?.dongHoId;
      const finalDongHoId = dongHoId || userDongHoId;
      
      if (!finalDongHoId) {
        throw new Error("Không tìm thấy thông tin dòng họ");
      }
      
      const userId = user?.nguoiDungId || "";

      // Format date cho API
      const formatDateForAPI = (date: Date | string | undefined): string | undefined => {
        if (!date) return undefined;
        if (typeof date === 'string') return date;
        return date.toISOString().split('T')[0];
      };

      // Chuẩn bị payload
      const payload = {
        hoTen: formData.hoTen,
        gioiTinh: formData.gioiTinh,
        ngheNghiep: formData.ngheNghiep || "",
        doiThuoc: formData.doiThuoc,
        chaId: formData.fid || null,
        meId: formData.mid || null,
        lu_user_id: userId,
        nguoiTaoId: userId,
        ngaySinh: formatDateForAPI(formData.ngaySinh),
        ngayMat: formatDateForAPI(formData.ngayMat),
        noiSinh: formData.noiSinh || "",
        noiMat: formData.noiMat || "",
        trinhDoHocVan: formData.trinhDoHocVan || "",
        diaChiHienTai: formData.diaChiHienTai || "",
        tieuSu: formData.tieuSu || "",
        // Xử lý vợ/chồng
        voId: formData.gioiTinh === 1 && formData.pids && formData.pids.length > 0 ? formData.pids[0] : null,
        chongId: formData.gioiTinh === 2 && formData.pids && formData.pids.length > 0 ? formData.pids[0] : null,
      };

      // Xóa các field undefined/empty string
      Object.keys(payload).forEach(key => {
        const value = payload[key as keyof typeof payload];
        if (value === undefined || value === '') {
          delete payload[key as keyof typeof payload];
        }
      });
      let result;
      if (mode === "add") {
        // Sử dụng createMemberWithDongHo thay vì createMember
        result = await createMemberWithDongHo(payload, finalDongHoId);
      } else {
        if (!member?.thanhVienId) {
          throw new Error("Không tìm thấy ID thành viên");
        }
        // Thêm dongHoId vào payload cho update
        const updatePayload = {
          ...payload,
          dongHoId: finalDongHoId
        };
        result = await updateMember(member.thanhVienId, updatePayload);
      }

      if (result.success) {
        showSuccess(mode === "add" ? "Thêm thành viên thành công!" : "Cập nhật thành viên thành công!");
        
        // Invalidate queries để refresh data
        queryClient.invalidateQueries({ queryKey: ["member-tree", finalDongHoId] });
        
        // Đóng modal
        onOpenChange(false);
      } else {
        throw new Error(result.message || "Không thể lưu thành viên");
      }
    } catch (error: any) {
      console.error("Error saving member:", error);
      showError(error.message || "Có lỗi xảy ra khi lưu thành viên");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden p-0 bg-gradient-to-br from-red-50 via-orange-50 to-amber-50">
        <div className="max-h-[90vh] overflow-y-auto">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-red-800 to-red-600 p-6 text-white sticky top-0 z-10 shadow-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <User className="w-6 h-6" />
                {mode === "add" ? "Thêm thành viên mới" : "Chỉnh sửa thành viên"}
              </DialogTitle>
            </DialogHeader>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Thông tin cơ bản */}
          <div className="space-y-4 p-4 bg-white/80 backdrop-blur rounded-lg border border-red-200 shadow-sm">
            <h3 className="font-semibold text-red-900 flex items-center gap-2">
              <User className="w-4 h-4" />
              Thông tin cơ bản
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Họ tên */}
              <div className="col-span-2 space-y-2">
                <Label htmlFor="hoTen" className="text-gray-700">Họ tên *</Label>
                <Input
                  id="hoTen"
                  value={formData.hoTen}
                  onChange={(e) => setFormData({ ...formData, hoTen: e.target.value })}
                  required
                  placeholder="Nhập họ tên..."
                  className="border-gray-300 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>

              {/* Giới tính */}
              <div className="space-y-2">
                <Label htmlFor="gioiTinh" className="text-gray-700">Giới tính</Label>
                <Select
                  value={formData.gioiTinh?.toString()}
                  onValueChange={(v) => setFormData({ ...formData, gioiTinh: Number(v), pids: [] })}
                >
                  <SelectTrigger className="border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 backdrop-blur">
                    <SelectItem value="1">👨 Nam</SelectItem>
                    <SelectItem value="2">👩 Nữ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Thế hệ */}
              <div className="space-y-2">
                <Label htmlFor="doiThuoc" className="text-gray-700">Thế hệ</Label>
                <Input
                  id="doiThuoc"
                  type="number"
                  min="1"
                  value={formData.doiThuoc}
                  onChange={(e) => setFormData({ ...formData, doiThuoc: Number(e.target.value) })}
                  className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>

              {/* Nghề nghiệp */}
              <div className="col-span-2 space-y-2">
                <Label htmlFor="ngheNghiep" className="text-gray-700">Nghề nghiệp</Label>
                <Input
                  id="ngheNghiep"
                  value={formData.ngheNghiep}
                  onChange={(e) => setFormData({ ...formData, ngheNghiep: e.target.value })}
                  placeholder="Nhập nghề nghiệp..."
                  className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>

              {/* Ngày sinh */}
              <div className="space-y-2">
                <Label htmlFor="ngaySinh" className="text-gray-700">Ngày sinh</Label>
                <Input
                  id="ngaySinh"
                  type="date"
                  value={formData.ngaySinh ? new Date(formData.ngaySinh).toISOString().split('T')[0] : ""}
                  onChange={(e) => setFormData({ ...formData, ngaySinh: e.target.value ? new Date(e.target.value) : undefined })}
                  max={new Date().toISOString().split('T')[0]}
                  className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>

              {/* Ngày mất */}
              <div className="space-y-2">
                <Label htmlFor="ngayMat" className="text-gray-700">Ngày mất</Label>
                <Input
                  id="ngayMat"
                  type="date"
                  value={formData.ngayMat ? new Date(formData.ngayMat).toISOString().split('T')[0] : ""}
                  onChange={(e) => setFormData({ ...formData, ngayMat: e.target.value ? new Date(e.target.value) : undefined })}
                  className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>

              {/* Nơi sinh */}
              <div className="space-y-2">
                <Label htmlFor="noiSinh" className="text-gray-700">Nơi sinh</Label>
                <Input
                  id="noiSinh"
                  value={formData.noiSinh}
                  onChange={(e) => setFormData({ ...formData, noiSinh: e.target.value })}
                  placeholder="Nhập nơi sinh..."
                  className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>

              {/* Nơi mất */}
              <div className="space-y-2">
                <Label htmlFor="noiMat" className="text-gray-700">Nơi mất</Label>
                <Input
                  id="noiMat"
                  value={formData.noiMat}
                  onChange={(e) => setFormData({ ...formData, noiMat: e.target.value })}
                  placeholder="Nhập nơi mất..."
                  className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>

              {/* Trình độ học vấn */}
              <div className="space-y-2">
                <Label htmlFor="trinhDoHocVan" className="text-gray-700">Trình độ học vấn</Label>
                <Input
                  id="trinhDoHocVan"
                  value={formData.trinhDoHocVan}
                  onChange={(e) => setFormData({ ...formData, trinhDoHocVan: e.target.value })}
                  placeholder="Nhập trình độ học vấn..."
                  className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>

              {/* Địa chỉ hiện tại */}
              <div className="col-span-2 space-y-2">
                <Label htmlFor="diaChiHienTai" className="text-gray-700">Địa chỉ hiện tại</Label>
                <Input
                  id="diaChiHienTai"
                  value={formData.diaChiHienTai}
                  onChange={(e) => setFormData({ ...formData, diaChiHienTai: e.target.value })}
                  placeholder="Nhập địa chỉ hiện tại..."
                  className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>

              {/* Tiểu sử */}
              <div className="col-span-2 space-y-2">
                <Label htmlFor="tieuSu" className="text-gray-700">Tiểu sử</Label>
                <textarea
                  id="tieuSu"
                  rows={3}
                  value={formData.tieuSu}
                  onChange={(e) => setFormData({ ...formData, tieuSu: e.target.value })}
                  placeholder="Nhập tiểu sử..."
                  className="w-full p-3 border border-gray-300 rounded focus:border-red-500 focus:ring-red-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Cha mẹ */}
          <div className="space-y-4 p-4 bg-white/80 backdrop-blur rounded-lg border border-blue-300 shadow-sm">
            <h3 className="font-semibold text-blue-900 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Cha mẹ
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Cha - Combobox */}
              <div className="space-y-2">
                <Label className="text-gray-700">Cha</Label>
                <Popover open={fatherOpen} onOpenChange={setFatherOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={fatherOpen}
                      className="w-full justify-between border-gray-300"
                    >
                      {getMemberName(formData.fid)}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0 bg-white/95 backdrop-blur">
                    <Command>
                      <CommandInput 
                        placeholder="Tìm kiếm cha..." 
                        value={fatherSearch}
                        onValueChange={setFatherSearch}
                      />
                      <CommandEmpty>Không tìm thấy.</CommandEmpty>
                      <CommandGroup className="max-h-60 overflow-auto">
                        <CommandItem
                          onSelect={() => {
                            setFormData({ ...formData, fid: undefined });
                            setFatherOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              !formData.fid ? "opacity-100" : "opacity-0"
                            )}
                          />
                          Không có
                        </CommandItem>
                        {maleMembers.map((m) => (
                          <CommandItem
                            key={m.id}
                            onSelect={() => {
                              setFormData({ ...formData, fid: m.id });
                              setFatherOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                formData.fid === m.id ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {m.hoTen} (Đời {m.doiThuoc})
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Mẹ - Combobox */}
              <div className="space-y-2">
                <Label className="text-gray-700">Mẹ</Label>
                <Popover open={motherOpen} onOpenChange={setMotherOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={motherOpen}
                      className="w-full justify-between border-gray-300"
                    >
                      {getMemberName(formData.mid)}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[300px] p-0 bg-white/95 backdrop-blur">
                    <Command>
                      <CommandInput 
                        placeholder="Tìm kiếm mẹ..." 
                        value={motherSearch}
                        onValueChange={setMotherSearch}
                      />
                      <CommandEmpty>Không tìm thấy.</CommandEmpty>
                      <CommandGroup className="max-h-60 overflow-auto">
                        <CommandItem
                          onSelect={() => {
                            setFormData({ ...formData, mid: undefined });
                            setMotherOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              !formData.mid ? "opacity-100" : "opacity-0"
                            )}
                          />
                          Không có
                        </CommandItem>
                        {femaleMembers.map((m) => (
                          <CommandItem
                            key={m.id}
                            onSelect={() => {
                              setFormData({ ...formData, mid: m.id });
                              setMotherOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                formData.mid === m.id ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {m.hoTen} (Đời {m.doiThuoc})
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Vợ/Chồng */}
          <div className="space-y-4 p-4 bg-white/80 backdrop-blur rounded-lg border border-pink-300 shadow-sm">
            <h3 className="font-semibold text-pink-900 flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Vợ/Chồng
            </h3>
            
            {/* Danh sách vợ/chồng hiện tại */}
            {formData.pids && formData.pids.length > 0 && (
              <div className="space-y-2">
                {formData.pids.map((spouseId) => {
                  const spouse = allMembers.find((m) => m.id === spouseId);
                  return spouse ? (
                    <div
                      key={spouseId}
                      className="flex items-center justify-between p-2 bg-white/90 rounded border border-pink-300 shadow-sm"
                    >
                      <span className="text-sm">
                        {spouse.hoTen} (Đời {spouse.doiThuoc})
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSpouse(spouseId)}
                        className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : null;
                })}
              </div>
            )}

            {/* Thêm vợ/chồng */}
            <Popover open={spouseOpen} onOpenChange={setSpouseOpen}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-pink-300 hover:bg-pink-100 bg-white/90"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Thêm vợ/chồng
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0 bg-white/95 backdrop-blur">
                <Command>
                  <CommandInput 
                    placeholder="Tìm kiếm..." 
                    value={spouseSearch}
                    onValueChange={setSpouseSearch}
                  />
                  <CommandEmpty>Không tìm thấy.</CommandEmpty>
                  <CommandGroup className="max-h-60 overflow-auto">
                    {getSpouseOptions
                      .filter((m) => !formData.pids?.includes(m.id!))
                      .map((m) => (
                        <CommandItem
                          key={m.id}
                          onSelect={() => addSpouse(m.id!)}
                        >
                          {m.hoTen} (Đời {m.doiThuoc})
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-6 border-t border-red-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-red-300 hover:bg-red-100 text-red-900"
              disabled={loading}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-red-800 to-red-600 hover:from-red-900 hover:to-red-700 text-white shadow-lg"
              disabled={loading}
            >
              {loading ? "Đang lưu..." : mode === "add" ? "✓ Thêm thành viên" : "✓ Lưu thay đổi"}
            </Button>
          </div>
        </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
