"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/service/useToas";
import {
  getAllRoles,
  getAllChucNang,
  getAllThaoTac,
  getRolePermissions,
  updateRolePermissions,
  createRole,
  updateRole,
  deleteRole,
  IRole,
  IChucNang,
  IThaoTac,
} from "@/service/role.service";
import { Search, Plus, ChevronDown, X, Loader2, Trash2, Edit } from "lucide-react";

interface ThaoTacWithCheck extends IThaoTac {
  checked: boolean;
  api?: string;
}

export default function RolesPage() {
  const { showSuccess, showError } = useToast();

  // Data states
  const [roles, setRoles] = useState<IRole[]>([]);
  const [chucNangs, setChucNangs] = useState<IChucNang[]>([]);
  const [thaoTacs, setThaoTacs] = useState<ThaoTacWithCheck[]>([]);

  // Selection states
  const [selectedRole, setSelectedRole] = useState<IRole | null>(null);
  const [selectedChucNang, setSelectedChucNang] = useState<string>("");
  
  // UI states
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchThaoTac, setSearchThaoTac] = useState("");
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  
  // Modal form data
  const [roleFormData, setRoleFormData] = useState({ roleName: "", roleCode: "", description: "" });
  const [savingRole, setSavingRole] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedRole && selectedChucNang) {
      loadThaoTacForChucNang();
    }
  }, [selectedRole, selectedChucNang]);

  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [rolesRes, chucNangRes, thaoTacRes] = await Promise.all([
        getAllRoles(),
        getAllChucNang(),
        getAllThaoTac(),
      ]);

      if (rolesRes.data) setRoles(rolesRes.data);
      if (chucNangRes.data) setChucNangs(chucNangRes.data);
      if (thaoTacRes.data) {
        setThaoTacs(thaoTacRes.data.map((t: IThaoTac) => ({ ...t, checked: false })));
      }
    } catch (error) {
      showError("Không thể tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  const loadThaoTacForChucNang = async () => {
    if (!selectedRole) return;
    try {
      const res = await getRolePermissions(selectedRole.roleId);
      const permissions = res.data || [];
      const chucNangPerms = permissions.find((p: any) => p.chucNangId === selectedChucNang);
      
      setThaoTacs((prev) =>
        prev.map((t) => ({
          ...t,
          checked: chucNangPerms?.thaoTac?.[t.thaoTacCode] === true,
        }))
      );
    } catch (error) {
      console.error("Load thao tac error:", error);
    }
  };

  const handleSelectRole = (role: IRole) => {
    setSelectedRole(role);
    setShowRoleDropdown(false);
  };

  const handleOpenRoleModal = () => {
    if (selectedRole) {
      setRoleFormData({
        roleName: selectedRole.roleName,
        roleCode: selectedRole.roleCode,
        description: selectedRole.description || "",
      });
      setShowRoleModal(true);
    }
  };

  const handleOpenAddRoleModal = () => {
    setRoleFormData({ roleName: "", roleCode: "", description: "" });
    setShowAddRoleModal(true);
  };

  const handleCreateRole = async () => {
    if (!roleFormData.roleName || !roleFormData.roleCode) {
      showError("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    setSavingRole(true);
    try {
      await createRole(roleFormData);
      showSuccess("Tạo nhóm quyền thành công");
      setShowAddRoleModal(false);
      loadInitialData();
    } catch (error: any) {
      showError(error.message || "Không thể tạo nhóm quyền");
    } finally {
      setSavingRole(false);
    }
  };

  const handleUpdateRole = async () => {
    if (!selectedRole) return;
    setSavingRole(true);
    try {
      await updateRole(selectedRole.roleId, {
        roleName: roleFormData.roleName,
        description: roleFormData.description,
      });
      showSuccess("Cập nhật thành công");
      setShowRoleModal(false);
      loadInitialData();
    } catch (error: any) {
      showError(error.message || "Không thể cập nhật");
    } finally {
      setSavingRole(false);
    }
  };

  const handleDeleteRole = async () => {
    if (!selectedRole) return;
    if (!confirm("Bạn có chắc muốn xóa nhóm quyền này?")) return;
    
    setSavingRole(true);
    try {
      await deleteRole(selectedRole.roleId);
      showSuccess("Xóa thành công");
      setShowRoleModal(false);
      setSelectedRole(null);
      loadInitialData();
    } catch (error: any) {
      showError(error.message || "Không thể xóa");
    } finally {
      setSavingRole(false);
    }
  };

  const handleToggleThaoTac = (thaoTacId: string, checked: boolean) => {
    setThaoTacs((prev) =>
      prev.map((t) => (t.thaoTacId === thaoTacId ? { ...t, checked } : t))
    );
  };

  const handleSavePermissions = async () => {
    if (!selectedRole || !selectedChucNang) {
      showError("Vui lòng chọn nhóm quyền và tính năng");
      return;
    }
    setSaving(true);
    try {
      const permissions = thaoTacs.map((t) => ({
        chucNangId: selectedChucNang,
        thaoTacId: t.thaoTacId,
        active: t.checked,
      }));
      await updateRolePermissions(selectedRole.roleId, permissions);
      showSuccess("Lưu thành công");
    } catch (error) {
      showError("Không thể lưu");
    } finally {
      setSaving(false);
    }
  };

  const filteredThaoTacs = thaoTacs.filter(
    (t) =>
      t.thaoTacCode?.toLowerCase().includes(searchThaoTac.toLowerCase()) ||
      t.tenThaoTac?.toLowerCase().includes(searchThaoTac.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="text-sm text-gray-500 mb-2">
        🏠 / Quản trị hệ thống / <span className="text-gray-800 font-medium">Quản lý nhóm quyền</span>
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">QUẢN LÝ NHÓM QUYỀN</h1>

      <div className="grid grid-cols-12 gap-4">
        {/* Left Panel */}
        <div className="col-span-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-gray-700">Nhóm quyền</span>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={handleOpenRoleModal} disabled={!selectedRole}>
                  Xem
                </Button>
              </div>

              {/* Dropdown */}
              <div className="relative mb-4">
                <button
                  onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                  className="w-full flex items-center justify-between p-2 border rounded-lg bg-white hover:bg-gray-50"
                >
                  <span className={selectedRole ? "text-gray-800" : "text-gray-400"}>
                    {selectedRole?.roleName || "Chọn nhóm quyền"}
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showRoleDropdown ? "rotate-180" : ""}`} />
                </button>

                {showRoleDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                    {roles.map((role) => (
                      <button
                        key={role.roleId}
                        onClick={() => handleSelectRole(role)}
                        className={`w-full text-left px-3 py-2 hover:bg-gray-100 ${
                          selectedRole?.roleId === role.roleId ? "bg-blue-50 text-blue-700" : ""
                        }`}
                      >
                        {role.roleName}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Danh sách tính năng */}
              <div className="border-t pt-4">
                <span className="font-medium text-gray-700 block mb-2">Danh sách tính năng</span>
                <div className="relative mb-3">
                  <Input placeholder="Tên tính năng" className="pr-8" />
                  <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>

                <div className="space-y-1 max-h-[300px] overflow-y-auto">
                  {chucNangs.map((cn) => (
                    <div
                      key={cn.chucNangId}
                      onClick={() => setSelectedChucNang(cn.chucNangId)}
                      className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors ${
                        selectedChucNang === cn.chucNangId ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100"
                      }`}
                    >
                      <span className="text-sm">▸</span>
                      <Checkbox checked={selectedChucNang === cn.chucNangId} onCheckedChange={() => setSelectedChucNang(cn.chucNangId)} />
                      <span className="text-sm">{cn.tenChucNang}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center mt-3">
                  <Button variant="outline" size="sm" className="rounded-full w-8 h-8 p-0 border-blue-500 text-blue-500" onClick={handleOpenAddRoleModal}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel */}
        <div className="col-span-9">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium text-gray-700">Chi tiết thao tác tính năng</span>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Input placeholder="Tên thao tác, mã thao tác..." value={searchThaoTac} onChange={(e) => setSearchThaoTac(e.target.value)} className="w-64 pr-8" />
                    <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                  <Button onClick={handleSavePermissions} disabled={saving} variant="outline">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Lưu"}
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="w-10 p-3 text-center"><Checkbox /></th>
                      <th className="w-16 p-3 text-center text-sm font-medium text-gray-600">STT</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-600">Mã thao tác ↕</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-600">Tên thao tác ↕</th>
                      <th className="p-3 text-left text-sm font-medium text-gray-600">Api ↕</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredThaoTacs.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-gray-400">
                          <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                              </svg>
                            </div>
                            <span>Trống</span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredThaoTacs.map((tt, index) => (
                        <tr key={tt.thaoTacId} className="border-t hover:bg-gray-50">
                          <td className="p-3 text-center">
                            <Checkbox checked={tt.checked} onCheckedChange={(checked) => handleToggleThaoTac(tt.thaoTacId, checked as boolean)} />
                          </td>
                          <td className="p-3 text-center text-sm">{index + 1}</td>
                          <td className="p-3 text-sm">{tt.thaoTacCode}</td>
                          <td className="p-3 text-sm">{tt.tenThaoTac}</td>
                          <td className="p-3 text-sm text-gray-500">{tt.api || "-"}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal xem/sửa nhóm quyền */}
      {showRoleModal && selectedRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Chi tiết nhóm quyền</h3>
              <button onClick={() => setShowRoleModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên nhóm quyền</label>
                <Input value={roleFormData.roleName} onChange={(e) => setRoleFormData({ ...roleFormData, roleName: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <Input value={roleFormData.description} onChange={(e) => setRoleFormData({ ...roleFormData, description: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mã quyền</label>
                <Input value={selectedRole.roleCode} disabled className="bg-gray-100" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border-t bg-gray-50">
              <Button variant="destructive" size="sm" onClick={handleDeleteRole} disabled={savingRole || selectedRole.roleCode === "sa"}>
                <Trash2 className="w-4 h-4 mr-1" /> Xóa
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowRoleModal(false)}>Đóng</Button>
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleUpdateRole} disabled={savingRole}>
                  {savingRole ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Edit className="w-4 h-4 mr-1" />} Cập nhật
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal thêm nhóm quyền */}
      {showAddRoleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Thêm nhóm quyền mới</h3>
              <button onClick={() => setShowAddRoleModal(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mã quyền <span className="text-red-500">*</span></label>
                <Input value={roleFormData.roleCode} onChange={(e) => setRoleFormData({ ...roleFormData, roleCode: e.target.value })} placeholder="VD: ketoan, nhansu..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên nhóm quyền <span className="text-red-500">*</span></label>
                <Input value={roleFormData.roleName} onChange={(e) => setRoleFormData({ ...roleFormData, roleName: e.target.value })} placeholder="VD: Kế toán, Nhân sự..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <Input value={roleFormData.description} onChange={(e) => setRoleFormData({ ...roleFormData, description: e.target.value })} />
              </div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t bg-gray-50">
              <Button variant="outline" onClick={() => setShowAddRoleModal(false)}>Hủy</Button>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleCreateRole} disabled={savingRole}>
                {savingRole ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Plus className="w-4 h-4 mr-1" />} Tạo mới
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
