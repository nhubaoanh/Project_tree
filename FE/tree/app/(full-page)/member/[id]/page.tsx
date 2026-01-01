"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getMemberById, getMembersByDongHo } from "@/service/member.service";
import storage from "@/utils/storage";
import { ArrowLeft, User, Calendar, MapPin, Briefcase, GraduationCap, Users } from "lucide-react";
import Image from "next/image";

export default function MemberDetailPage() {
  const params = useParams();
  const router = useRouter();
  const memberId = Number(params.id);
  const [dongHoId, setDongHoId] = useState<string>("");

  useEffect(() => {
    const user = storage.getUser();
    if (user?.dongHoId) {
      setDongHoId(user.dongHoId);
    }
  }, []);

  const { data: memberRes, isLoading } = useQuery({
    queryKey: ["member", dongHoId, memberId],
    queryFn: () => getMemberById(dongHoId, memberId),
    enabled: !!memberId && !!dongHoId,
  });

  const { data: allMembersRes } = useQuery({
    queryKey: ["members-dongho", dongHoId],
    queryFn: () => getMembersByDongHo(dongHoId),
    enabled: !!dongHoId,
  });

  const member = memberRes?.data;
  const allMembers = allMembersRes?.data || [];

  const getNameById = (id: number | null) => {
    if (!id) return null;
    const found = allMembers.find((m: any) => m.thanhVienId === id);
    return found?.hoTen || null;
  };

  const formatDate = (date: string | Date | null) => {
    if (!date) return "Chưa rõ";
    return new Date(date).toLocaleDateString("vi-VN");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ede5b7] flex items-center justify-center">
        <div className="text-xl text-stone-600">Đang tải thông tin...</div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-[#ede5b7] flex flex-col items-center justify-center gap-4">
        <div className="text-xl text-stone-600">Không tìm thấy thành viên</div>
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-700"
        >
          <ArrowLeft size={20} /> Quay lại
        </button>
      </div>
    );
  }

  const fatherName = getNameById(member.chaId);
  const motherName = getNameById(member.meId);
  const spouseName = getNameById(member.voId || member.chongId);

  return (
    <div className="min-h-screen bg-[#ede5b7] p-4 md:p-8 font-dancing">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-6 text-red-800 hover:text-red-600 transition-colors"
        >
          <ArrowLeft size={24} />
          <span className="text-lg">Quay lại cây gia phả</span>
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Banner */}
          <div className="h-32 bg-gradient-to-r from-red-800 to-red-600" />

          {/* Avatar & Name */}
          <div className="relative px-6 pb-6">
            <div className="absolute -top-16 left-6">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-stone-200">
                {member.anhChanDung ? (
                  <Image
                    src={`/uploads/${member.anhChanDung}`}
                    alt={member.hoTen}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-stone-300">
                    <User size={48} className="text-stone-500" />
                  </div>
                )}
              </div>
            </div>

            <div className="pt-20">
              <h1 className="text-3xl font-bold text-stone-800">{member.hoTen}</h1>
              <p className="text-stone-500 mt-1">
                Đời thứ {member.doiThuoc || "?"} • {member.gioiTinh === 1 ? "Nam" : "Nữ"}
              </p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="px-6 pb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Thông tin cá nhân */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-800 border-b border-red-200 pb-2">
                Thông tin cá nhân
              </h2>
              
              <InfoRow icon={<Calendar size={18} />} label="Ngày sinh" value={formatDate(member.ngaySinh)} />
              <InfoRow icon={<Calendar size={18} />} label="Ngày mất" value={formatDate(member.ngayMat)} />
              <InfoRow icon={<MapPin size={18} />} label="Nơi sinh" value={member.noiSinh || "Chưa rõ"} />
              <InfoRow icon={<MapPin size={18} />} label="Nơi mất" value={member.noiMat || "Chưa rõ"} />
              <InfoRow icon={<Briefcase size={18} />} label="Nghề nghiệp" value={member.ngheNghiep || "Chưa rõ"} />
              <InfoRow icon={<GraduationCap size={18} />} label="Trình độ" value={member.trinhDoHocVan || "Chưa rõ"} />
              <InfoRow icon={<MapPin size={18} />} label="Địa chỉ hiện tại" value={member.diaChiHienTai || "Chưa rõ"} />
            </div>

            {/* Quan hệ gia đình */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-red-800 border-b border-red-200 pb-2">
                Quan hệ gia đình
              </h2>
              
              <InfoRow icon={<Users size={18} />} label="Cha" value={fatherName || "Chưa rõ"} />
              <InfoRow icon={<Users size={18} />} label="Mẹ" value={motherName || "Chưa rõ"} />
              <InfoRow 
                icon={<Users size={18} />} 
                label={member.gioiTinh === 1 ? "Vợ" : "Chồng"} 
                value={spouseName || "Chưa rõ"} 
              />
            </div>
          </div>

          {/* Tiểu sử */}
          {member.tieuSu && (
            <div className="px-6 pb-8">
              <h2 className="text-xl font-semibold text-red-800 border-b border-red-200 pb-2 mb-4">
                Tiểu sử
              </h2>
              <p className="text-stone-700 whitespace-pre-wrap leading-relaxed">
                {member.tieuSu}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-red-700 mt-0.5">{icon}</span>
      <div>
        <span className="text-stone-500 text-sm">{label}</span>
        <p className="text-stone-800">{value}</p>
      </div>
    </div>
  );
}
