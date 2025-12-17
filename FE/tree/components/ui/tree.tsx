"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import FamilyTree from "@balkangraph/familytree.js";
import { ITreeNode } from "@/types/tree";
import { FamilyMemberModal } from "./FamilyMemberModal";

let initialized = false;

// URL backend để lấy ảnh
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:6001";
const DEFAULT_AVATAR = "/images/vangoc.jpg";

interface MyFamilyTreeProps {
  data: ITreeNode[];
}

type AppFamilyNode = FamilyTree.node & {
  pids?: (string | number)[];
  memberId?: number;
  field_0?: string;
  field_1?: string;
  field_2?: string;
  img_0?: string;
  tags?: string[];
  fid?: number | null;
  mid?: number | null;
};

// Helper function to get image URL
const getImageUrl = (anhChanDung: string | null | undefined): string => {
  if (!anhChanDung || anhChanDung.trim() === "") {
    return DEFAULT_AVATAR;
  }
  if (anhChanDung.startsWith("http")) {
    return anhChanDung;
  }
  const cleanPath = anhChanDung.startsWith("uploads/") 
    ? anhChanDung 
    : `uploads/${anhChanDung}`;
  return `${API_BASE_URL}/${cleanPath}`;
};

export const MyFamilyTree = ({ data }: MyFamilyTreeProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const familyRef = useRef<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<AppFamilyNode | null>(null);
  const [allNodes, setAllNodes] = useState<any[]>([]);
  const [family, setFamily] = useState<any>(null);

  useEffect(() => {
    if (!divRef.current || data.length === 0 || initialized) return;
    initialized = true;

    const toNumber = (v: unknown): number | undefined => {
      if (v === null || v === undefined) return undefined;
      const n = typeof v === "string" ? Number(v) : (v as number);
      return Number.isFinite(n) ? n : undefined;
    };

    // Initialize nodes
    const nodes = data.map((node) => ({
      id: toNumber(node.id)!,
      pids: (node.pids ?? []).map(toNumber).filter((x): x is number => typeof x === "number"),
      fid: toNumber(node.fid),
      mid: toNumber(node.mid),
      memberId: node.thanhVienId,
      field_0: node.hoTen || "Chưa rõ",
      field_1: node.ngayMat ? new Date(node.ngayMat).toLocaleDateString("vi-VN") : "Chưa rõ",
      field_2: node.ngheNghiep || "Chưa rõ",
      img_0: getImageUrl(node.anhChanDung),
      tags: [node.gioiTinh === 1 ? "male" : "female"],
    }));

    setAllNodes(nodes);

    const familyInstance = new FamilyTree(divRef.current!, {
      nodes,
      template: "john",
      scaleInitial: FamilyTree.match.boundary,
      enableSearch: true,
      miniMap: true,
      mouseScrool: FamilyTree.action.zoom,
      nodeBinding: {
        field_0: "field_0",
        field_1: "field_1",
        field_2: "field_2",
        img_0: "img_0",
      },
      
      nodeMenu: {
        details: {
          text: "📋 Xem chi tiết",
          onClick: (nodeId: string | number) => {
            const id = typeof nodeId === "string" ? Number(nodeId) : nodeId;
            if (!Number.isFinite(id)) return;
            const node = familyInstance.get(id) as unknown as AppFamilyNode;
            if (!node) return;
            setSelectedNode(node);
            setModalOpen(true);
          },
        },
        viewParents: {
          text: "👨‍👩‍👦 Xem cha mẹ",
          onClick: (nodeId: string | number) => {
            const id = typeof nodeId === "string" ? Number(nodeId) : nodeId;
            if (!Number.isFinite(id)) return;
            const node = familyInstance.get(id) as unknown as AppFamilyNode;
            if (!node) return;
            setSelectedNode(node);
            setModalOpen(true);
          },
        },
        viewSpouse: {
          text: "💑 Xem vợ/chồng",
          onClick: (nodeId: string | number) => {
            const id = typeof nodeId === "string" ? Number(nodeId) : nodeId;
            if (!Number.isFinite(id)) return;
            const node = familyInstance.get(id) as unknown as AppFamilyNode;
            if (!node) return;
            setSelectedNode(node);
            setModalOpen(true);
          },
        },
        viewChildren: {
          text: "👶 Xem con",
          onClick: (nodeId: string | number) => {
            const id = typeof nodeId === "string" ? Number(nodeId) : nodeId;
            if (!Number.isFinite(id)) return;
            const node = familyInstance.get(id) as unknown as AppFamilyNode;
            if (!node) return;
            setSelectedNode(node);
            setModalOpen(true);
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
    });

    familyRef.current = familyInstance;
    setFamily(familyInstance);

    // Cleanup
    return () => {
      if (divRef.current) divRef.current.innerHTML = "";
      initialized = false;
    };
  }, [data, router]);

  return (
    <>
      <div
        ref={divRef}
        className="w-full h-screen bg-gradient-to-b from-amber-50 to-stone-100 bg-[#ede5b7]"
      />
      {selectedNode && (
        <FamilyMemberModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          node={selectedNode}
          getNameById={(id) => {
            if (id === undefined || id === null) return "Không có";
            const numericId = typeof id === "string" ? Number(id) : id;
            if (!Number.isFinite(numericId)) return "Không có";
            const node = allNodes.find((n) => n.id === numericId);
            return node?.field_0 || "Không có";
          }}
          getChildren={(parentId) => {
            return allNodes
              .filter((n) => n.fid === parentId || n.mid === parentId)
              .map((n) => n.field_0 || "Chưa rõ");
          }}
        />
      )}
    </>
  );
};
