'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Mail, Phone, Camera, UserCircle, Calendar, Loader2, Lock, ArrowLeft } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { UpdateMyProfile } from '@/service/user.service';
import { uploadFile } from '@/service/upload.service';
import { useToast } from '@/service/useToas';
import { useRouter } from 'next/navigation';
import storage from '@/utils/storage';
import { getAvatarUrl } from '@/utils/imageUtils';
import { IUserProfile } from '@/types/user';

export default function SettingsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showSuccess, showError } = useToast();
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState<Partial<IUserProfile>>({
    userId: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    tenDangNhap: '',
    matKhau: '',
    full_name: '',
    avatar: '',
    gender: 1,
    date_of_birthday: '',
    email: '',
    phone: '',
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Load user data từ localStorage
  useEffect(() => {
    const user = storage.getUser();
    if (user) {
      setFormData(prev => ({
        ...prev,
        userId: user.nguoiDungId,
        first_name: user.first_name || '',
        middle_name: user.middle_name || '',
        last_name: user.last_name || '',
        full_name: user.full_name || '',
        tenDangNhap: user.email || '',
        email: user.email || '',
        phone: user.phone || '',
        gender: user.gender ?? 1,
        date_of_birthday: user.date_of_birthday || '',
        avatar: user.avatar || '',
        lu_user_id: user.nguoiDungId,
      }));
    }
  }, []);

  // Mutation update profile
  const updateMutation = useMutation({
    mutationFn: (data: IUserProfile) => UpdateMyProfile(data),
    onSuccess: () => {
      showSuccess('Cập nhật thông tin thành công!');
      // Update localStorage
      const user = storage.getUser();
      if (user) {
        const updatedUser = {
          ...user,
          first_name: formData.first_name,
          middle_name: formData.middle_name,
          last_name: formData.last_name,
          full_name: `${formData.last_name} ${formData.middle_name} ${formData.first_name}`.trim(),
          email: formData.email || user.email,
          phone: formData.phone,
          gender: formData.gender,
          date_of_birthday: formData.date_of_birthday,
          avatar: formData.avatar,
        };
        storage.setUser(updatedUser);
        
        // Trigger event để header update
        window.dispatchEvent(new Event('userDataUpdated'));
      }
    },
    onError: () => {
      showError('Có lỗi xảy ra khi cập nhật thông tin.');
    },
  });

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle gender change
  const handleGenderChange = (value: string) => {
    setFormData(prev => ({ ...prev, gender: parseInt(value) }));
  };

  // Upload avatar
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showError('Vui lòng chọn file ảnh!');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showError('File không được vượt quá 5MB!');
      return;
    }

    // Preview local
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    setUploading(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);

      const result = await uploadFile(formDataUpload);

      if (result.success) {
        setFormData(prev => ({ ...prev, avatar: result.path }));
        showSuccess('Upload ảnh thành công!');
      } else {
        throw new Error(result.message || 'Upload thất bại');
      }
    } catch (error: any) {
      showError(error.message || 'Upload ảnh thất bại!');
      setPreviewUrl(null);
    } finally {
      setUploading(false);
    }
  };

  // Format date cho input
  const formatDateForInput = (date: Date | string | undefined): string => {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    return d.toISOString().split('T')[0];
  };

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.userId) {
      showError('Không tìm thấy thông tin người dùng!');
      return;
    }

    // Format date to YYYY-MM-DD for MySQL or null if empty
    const formatDateForDB = (date: Date | string | undefined): string | null => {
      if (!date || date === '') return null;
      if (typeof date === 'string') {
        // Nếu đã là format YYYY-MM-DD thì giữ nguyên
        if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
        // Nếu là ISO string thì lấy phần date
        const d = new Date(date);
        if (isNaN(d.getTime())) return null;
        return d.toISOString().split('T')[0];
      }
      return date.toISOString().split('T')[0];
    };

    const formattedDate = formatDateForDB(formData.date_of_birthday);
    
    const submitData: Partial<IUserProfile> = {
      userId: formData.userId,
      tenDangNhap: formData.tenDangNhap || '',
      first_name: formData.first_name || '',
      middle_name: formData.middle_name || '',
      last_name: formData.last_name || '',
      full_name: `${formData.last_name} ${formData.middle_name} ${formData.first_name}`.trim(),
      avatar: formData.avatar || '',
      gender: formData.gender ?? 1,
      email: formData.email || '',
      phone: formData.phone || '',
      active_flag: 1,
      created_by_user_id: formData.userId,
      create_date: new Date(),
      lu_updated: new Date(),
      lu_user_id: formData.userId,
    };

    // Chỉ thêm matKhau nếu có giá trị (không rỗng)
    if (formData.matKhau && formData.matKhau.trim() !== '') {
      submitData.matKhau = formData.matKhau;
    }

    // Chỉ thêm date_of_birthday nếu có giá trị hợp lệ
    if (formattedDate) {
      submitData.date_of_birthday = formattedDate;
    }

    updateMutation.mutate(submitData as IUserProfile);
  };

  // Get initials for avatar fallback
  const getInitials = () => {
    const first = formData.first_name?.[0] || '';
    const last = formData.last_name?.[0] || '';
    return (last + first).toUpperCase() || 'U';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-10 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-4 hover:bg-primary/10 hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>
        <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <CardHeader className="border-b pb-6 ">
            <CardTitle className="text-xl flex items-center gap-2 ">
              <UserCircle className="text-primary" size={24} />
              Thông tin cá nhân
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Avatar Section */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative group">
                  <Avatar className="w-28 h-28 border-4 border-primary/20 shadow-lg">
                    <AvatarImage 
                      src={previewUrl || getAvatarUrl(formData.avatar)} 
                      alt="Avatar"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/vangoc.jpg';
                      }}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-2xl font-semibold">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <label
                    htmlFor="avatar-upload"
                    className={`absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full cursor-pointer hover:bg-primary/90 transition-all shadow-md group-hover:scale-110 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {uploading ? <Loader2 size={18} className="animate-spin" /> : <Camera size={18} />}
                  </label>
                  <input
                    ref={fileInputRef}
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                    disabled={uploading}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Nhấn vào biểu tượng camera để thay đổi ảnh đại diện
                </p>
              </div>

              {/* Name Fields - 3 columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="last_name" className="flex items-center gap-2 text-sm font-medium">
                    <User size={16} className="text-primary" />
                    Họ
                  </Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    placeholder="Nhập họ"
                    value={formData.last_name || ''}
                    onChange={handleChange}
                    className="h-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="middle_name" className="flex items-center gap-2 text-sm font-medium">
                    <User size={16} className="text-primary" />
                    Tên đệm
                  </Label>
                  <Input
                    id="middle_name"
                    name="middle_name"
                    placeholder="Nhập tên đệm"
                    value={formData.middle_name || ''}
                    onChange={handleChange}
                    className="h-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="first_name" className="flex items-center gap-2 text-sm font-medium">
                    <User size={16} className="text-primary" />
                    Tên
                  </Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    placeholder="Nhập tên"
                    value={formData.first_name || ''}
                    onChange={handleChange}
                    className="h-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Username & Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="tenDangNhap" className="flex items-center gap-2 text-sm font-medium">
                    <User size={16} className="text-primary" />
                    Tên đăng nhập
                  </Label>
                  <Input
                    id="tenDangNhap"
                    name="tenDangNhap"
                    placeholder="Tên đăng nhập"
                    value={formData.tenDangNhap || ''}
                    onChange={handleChange}
                    disabled
                    className="h-11 bg-slate-100 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 opacity-70"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="matKhau" className="flex items-center gap-2 text-sm font-medium">
                    <Lock size={16} className="text-primary" />
                    Mật khẩu mới
                  </Label>
                  <Input
                    id="matKhau"
                    name="matKhau"
                    type="password"
                    placeholder="Để trống nếu không đổi"
                    value={formData.matKhau || ''}
                    onChange={handleChange}
                    className="h-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                    <Mail size={16} className="text-primary" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Nhập email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    className="h-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium">
                    <Phone size={16} className="text-primary" />
                    Số điện thoại
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Nhập số điện thoại"
                    value={formData.phone || ''}
                    onChange={handleChange}
                    className="h-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {/* Gender & Birthday */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="gender" className="flex items-center gap-2 text-sm font-medium">
                    <UserCircle size={16} className="text-primary" />
                    Giới tính
                  </Label>
                  <Select value={String(formData.gender ?? 1)} onValueChange={handleGenderChange}>
                    <SelectTrigger className="h-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary/20">
                      <SelectValue placeholder="Chọn giới tính" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Nam</SelectItem>
                      <SelectItem value="0">Nữ</SelectItem>
                      <SelectItem value="2">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date_of_birthday" className="flex items-center gap-2 text-sm font-medium">
                    <Calendar size={16} className="text-primary" />
                    Ngày sinh
                  </Label>
                  <Input
                    id="date_of_birthday"
                    name="date_of_birthday"
                    type="date"
                    value={formatDateForInput(formData.date_of_birthday)}
                    max={new Date().toISOString().split('T')[0]}
                    onChange={handleChange}
                    className="h-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
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
                  disabled={updateMutation.isPending || uploading}
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
