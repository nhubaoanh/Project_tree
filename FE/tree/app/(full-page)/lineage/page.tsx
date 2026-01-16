'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Users, MapPin, Calendar, Loader2, FileText, ArrowLeft } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getDongHoById, updateDongHo, IDongHo } from '@/service/dongho.service';
import { useToast } from '@/service/useToas';
import { useRouter } from 'next/navigation';
import storage from '@/utils/storage';

export default function LineagePage() {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();
  const router = useRouter();

  // Get user's dongHoId
  const user = storage.getUser();
  const dongHoId = user?.dongHoId;

  // Form state
  const [formData, setFormData] = useState<Partial<IDongHo>>({
    tenDongHo: '',
    queQuanGoc: '',
    ngayThanhLap: '',
    nguoiQuanLy: '',
    ghiChu: '',
  });

  // Fetch dòng họ data
  const { data: dongHoData, isLoading } = useQuery({
    queryKey: ['dongho', dongHoId],
    queryFn: () => getDongHoById(dongHoId!),
    enabled: !!dongHoId,
  });

  // Load data vào form
  useEffect(() => {
    if (dongHoData?.data) {
      const lineage = dongHoData.data;
      setFormData({
        tenDongHo: lineage.tenDongHo || '',
        queQuanGoc: lineage.queQuanGoc || '',
        ngayThanhLap: lineage.ngayThanhLap || '',
        nguoiQuanLy: lineage.nguoiQuanLy || '',
        ghiChu: lineage.ghiChu || '',
      });
    }
  }, [dongHoData]);

  // Mutation update
  const updateMutation = useMutation({
    mutationFn: (data: any) => updateDongHo(dongHoId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dongho', dongHoId] });
      showSuccess('Cập nhật thông tin dòng họ thành công!');
    },
    onError: (error: any) => {
      showError(error.message || 'Có lỗi xảy ra khi cập nhật.');
    },
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Format date cho input
  const formatDateForInput = (date: Date | string | undefined): string => {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().split('T')[0];
  };

  // Format date to YYYY-MM-DD for MySQL
  const formatDateForDB = (date: Date | string | undefined): string | undefined => {
    if (!date) return undefined;
    if (typeof date === 'string') {
      // Nếu đã là format YYYY-MM-DD thì giữ nguyên
      if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
      // Nếu là ISO string thì lấy phần date
      const d = new Date(date);
      if (isNaN(d.getTime())) return undefined;
      return d.toISOString().split('T')[0];
    }
    const d = new Date(date);
    if (isNaN(d.getTime())) return undefined;
    return d.toISOString().split('T')[0];
  };

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!dongHoId) {
      showError('Không tìm thấy thông tin dòng họ!');
      return;
    }

    const submitData: any = {
      tenDongHo: formData.tenDongHo,
      queQuanGoc: formData.queQuanGoc,
      nguoiQuanLy: formData.nguoiQuanLy,
      ghiChu: formData.ghiChu,
      nguoiCapNhatId: user?.nguoiDungId || '',
    };

    // Format date properly
    const formattedDate = formatDateForDB(formData.ngayThanhLap);
    if (formattedDate) {
      submitData.ngayThanhLap = formattedDate;
    }

    // Xóa các field undefined hoặc empty
    Object.keys(submitData).forEach(key => {
      const value = submitData[key];
      if (value === undefined || value === '') {
        delete submitData[key];
      }
    });

    console.log('📤 [Lineage] Submitting data:', submitData);

    updateMutation.mutate(submitData);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-12 w-12 text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Đang tải thông tin dòng họ...</p>
        </div>
      </div>
    );
  }

  // No lineage found
  if (!dongHoId || !dongHoData?.data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Chưa có dòng họ</h3>
            <p className="text-muted-foreground">
              Bạn chưa được gán vào dòng họ nào. Vui lòng liên hệ quản trị viên.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-10 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-2 hover:bg-primary/10 hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>
        <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <CardHeader className="border-b pb-6">
            <CardTitle className="text-xl flex items-center gap-2">
              <Users className="text-primary" size={24} />
              Quản lý dòng họ của bạn
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tên dòng họ */}
              <div className="space-y-2">
                <Label htmlFor="tenDongHo" className="flex items-center gap-2 text-sm font-medium">
                  <Users size={16} className="text-primary" />
                  Tên dòng họ <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="tenDongHo"
                  name="tenDongHo"
                  placeholder="VD: Dòng họ Nguyễn Văn"
                  value={formData.tenDongHo || ''}
                  onChange={handleChange}
                  required
                  className="h-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Quê quán gốc */}
              <div className="space-y-2">
                <Label htmlFor="queQuanGoc" className="flex items-center gap-2 text-sm font-medium">
                  <MapPin size={16} className="text-primary" />
                  Quê quán gốc
                </Label>
                <Input
                  id="queQuanGoc"
                  name="queQuanGoc"
                  placeholder="VD: Xã ABC, Huyện XYZ, Tỉnh DEF"
                  value={formData.queQuanGoc || ''}
                  onChange={handleChange}
                  className="h-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {/* Ngày thành lập & Người quản lý */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="ngayThanhLap" className="flex items-center gap-2 text-sm font-medium">
                    <Calendar size={16} className="text-primary" />
                    Ngày thành lập
                  </Label>
                  <Input
                    id="ngayThanhLap"
                    name="ngayThanhLap"
                    type="date"
                    value={formatDateForInput(formData.ngayThanhLap)}
                    onChange={handleChange}
                    className="h-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nguoiQuanLy" className="flex items-center gap-2 text-sm font-medium">
                    <Users size={16} className="text-primary" />
                    Người quản lý
                  </Label>
                  <Input
                    id="nguoiQuanLy"
                    name="nguoiQuanLy"
                    placeholder="VD: Nguyễn Văn A"
                    value={formData.nguoiQuanLy || ''}
                    onChange={handleChange}
                    className="h-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Ghi chú */}
              <div className="space-y-2">
                <Label htmlFor="ghiChu" className="flex items-center gap-2 text-sm font-medium">
                  <FileText size={16} className="text-primary" />
                  Ghi chú
                </Label>
                <textarea
                  id="ghiChu"
                  name="ghiChu"
                  rows={4}
                  placeholder="Ghi chú thêm về dòng họ..."
                  value={formData.ghiChu || ''}
                  onChange={handleChange}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-md focus:ring-2 focus:ring-primary/20 focus:outline-none resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => router.back()}
                  className="px-6 h-11 hover:bg-slate-100 hover:border-slate-400 dark:hover:bg-slate-800 transition-all"
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="px-8 h-11 bg-gradient-to-r from-[#A20105] to-[#8B0104] hover:from-[#8B0104] hover:to-[#6B0103] hover:shadow-lg hover:scale-105 transition-all duration-200 shadow-md text-white"
                >
                  {updateMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Đang lưu...
                    </>
                  ) : (
                    'Lưu thay đổi'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
