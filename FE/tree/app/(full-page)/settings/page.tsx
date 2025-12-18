// d:\Programming_Center\Project_tree\code\FE\tree\app\settings\page.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, MapPin, Calendar } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Cài đặt tài khoản</h1>
      
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">Thông tin cá nhân</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User size={16} />
                Họ và tên
              </Label>
              <Input id="name" defaultValue="Nguyễn Văn A" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail size={16} />
                Email
              </Label>
              <Input id="email" type="email" defaultValue="admin@giaphaviet.vn" disabled />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone size={16} />
                  Số điện thoại
                </Label>
                <Input id="phone" type="tel" placeholder="Nhập số điện thoại" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthday" className="flex items-center gap-2">
                  <Calendar size={16} />
                  Ngày sinh
                </Label>
                <Input id="birthday" type="date" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-2">
                <MapPin size={16} />
                Địa chỉ
              </Label>
              <Input id="address" placeholder="Nhập địa chỉ" />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline">
                Hủy
              </Button>
              <Button type="submit">Lưu thay đổi</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}