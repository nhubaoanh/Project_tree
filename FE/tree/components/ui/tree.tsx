"use client";

import React, { useEffect, useRef } from "react";
import FamilyTree from "@balkangraph/familytree.js";
import { ITreeNode } from "@/types/tree";

let initialized = false;

export const MyFamilyTree = ({ data }: { data: ITreeNode[] }) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!divRef.current || data.length === 0 || initialized) return;
    initialized = true;

    // Chuyển dữ liệu thành flat array chuẩn cho FamilyTree
    const allNodes = data.map((node) => ({
      id: node.id,
      pids: node.pids ?? [],
      fid: node.fid,
      mid: node.mid,
    //   id: node.thanhVienId,
    //   pids: node.voId || node.chongId 
    // ? [node.voId || node.chongId] 
    // : [],
    //   fid: node.chaId,
    //   mid: node.meId,

      // Dữ liệu hiển thị
      field_0: node.hoTen || "Chưa rõ",
      field_1: node.ngayMat
        ? new Date(node.ngayMat).toLocaleDateString("vi-VN")
        : "Chưa rõ",
      field_2: node.ngheNghiep || "Chưa rõ",
      img_0: node.anhChanDung
        ? `/uploads/${node.anhChanDung}`
        : `https://via.placeholder.com/120?text=${node.hoTen?.[0] || "?"}`,

      tags: [node.gioiTinh === 1 ? "male" : "female"],
    }));

    // Khởi tạo tree với template john (FREE, nhiều field)
    new FamilyTree(divRef.current!, {
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
          text: "Chi tiết",
          onClick: (sender :any , args: any) => {
            const node = sender.get(args.node.id);
            alert(
              `Họ tên: ${node.field_0}\nNgày sinh: ${node.field_1}\nNghề nghiệp: ${node.field_2}`
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
  }, [data]);

  return (
    <div
      ref={divRef}
      className="w-full h-screen bg-gradient-to-b from-amber-50 to-stone-100"
    />
  );
};
