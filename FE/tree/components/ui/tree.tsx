"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import FamilyTree from "@balkangraph/familytree.js";
import { ITreeNode } from "@/types/tree";

let initialized = false;

interface MyFamilyTreeProps {
  data: ITreeNode[];
}

export const MyFamilyTree = ({ data }: MyFamilyTreeProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!divRef.current || data.length === 0 || initialized) return;
    initialized = true;

    // Chuyển dữ liệu thành flat array chuẩn cho FamilyTree
    const allNodes = data.map((node) => ({
      id: node.id,
      pids: node.pids ?? [],
      fid: node.fid,
      mid: node.mid,
      // Lưu thêm thanhVienId để dùng cho navigation
      thanhVienId: node.thanhVienId,

      // Dữ liệu hiển thị
      field_0: node.hoTen || "Chưa rõ",
      field_1: node.ngayMat
        ? new Date(node.ngayMat).toLocaleDateString("vi-VN")
        : "Chưa rõ",
      field_2: node.ngheNghiep || "Chưa rõ",
      img_0: node.anhChanDung
        ? `/uploads/${node.anhChanDung}`
        : `/images/vangoc.jpg`,

      tags: [node.gioiTinh === 1 ? "male" : "female"],
    }));

    // Helper function để tìm tên theo ID
    const getNameById = (id: number | undefined): string => {
      if (!id) return "Không có";
      const node = allNodes.find((n) => n.id === id);
      return node?.field_0 || "Không có";
    };

    // Helper function để tìm danh sách con
    const getChildren = (parentId: number): string[] => {
      return allNodes
        .filter((n) => n.fid === parentId || n.mid === parentId)
        .map((n) => n.field_0);
    };

    // Khởi tạo tree với template john (FREE, nhiều field)
    const family = new FamilyTree(divRef.current!, {
      nodes: allNodes,
      template: "john",
      scaleInitial: FamilyTree.match.boundary,
      enableSearch: true,
      miniMap: true,
      mouseScrool: FamilyTree.action.zoom,
      nodeBinding: {
        field_0: "field_0", // tên
        field_1: "field_1", // ngày sinh
        field_2: "field_2", // nghề nghiệp
        img_0: "img_0", // ảnh
      },
      nodeMenu: {
        details: {
          text: "📋 Xem chi tiết",
          onClick: (sender: any, args: any) => {
            const nodeId = args?.node?.id ?? args;
            const node = sender.get(nodeId);
            if (!node) return;
            const memberId = node.thanhVienId || node.id;
            router.push(`/member/${memberId}`);
          },
        },
        viewParents: {
          text: "👨‍👩‍👦 Xem cha mẹ",
          onClick: (sender: any, args: any) => {
            const nodeId = args?.node?.id ?? args;
            const node = sender.get(nodeId);
            if (!node) return;
            const fatherName = getNameById(node.fid);
            const motherName = getNameById(node.mid);
            alert(`👨 Cha: ${fatherName}\n👩 Mẹ: ${motherName}`);
          },
        },
        viewSpouse: {
          text: "💑 Xem vợ/chồng",
          onClick: (sender: any, args: any) => {
            const nodeId = args?.node?.id ?? args;
            const node = sender.get(nodeId);
            if (!node) return;
            const spouseIds: number[] = node.pids || [];
            if (spouseIds.length === 0) {
              alert("Chưa có thông tin vợ/chồng");
              return;
            }
            const spouseNames = spouseIds
              .map((id: number) => getNameById(id))
              .join(", ");
            alert(`💑 Vợ/Chồng: ${spouseNames}`);
          },
        },
        viewChildren: {
          text: "👶 Xem con",
          onClick: (sender: any, args: any) => {
            const nodeId = args?.node?.id ?? args;
            const node = sender.get(nodeId);
            if (!node) return;
            const children = getChildren(node.id);
            if (children.length === 0) {
              alert("Chưa có thông tin con cái");
              return;
            }
            alert(
              `👶 Các con:\n${children.map((name, i) => `${i + 1}. ${name}`).join("\n")}`
            );
          },
        },
      },
      menu: {
        pdf: { text: "Xuất PDF" },
        png: { text: "Xuất PNG" },
        svg: { text: "Xuất SVG" },
      },
      tags: {
        male: { template: "john" },
        female: { template: "john" },
      },
    }).load(allNodes);

    return () => {
      if (divRef.current) divRef.current.innerHTML = "";
      initialized = false;
    };
  }, [data, router]);

  return (
    <div
      ref={divRef}
      className="w-full h-screen bg-gradient-to-b from-amber-50 to-stone-100 bg-[#ede5b7]"
    />
  );
};
