"use client";
import React, { useEffect, useRef } from "react";
import FamilyTree from "@balkangraph/familytree.js";
import { hierarchicalData } from "@/app/genealogy/components/familyData";

interface MyNode {
  id: number;
  name: string;
  fid?: number;
  mid?: number;
  gender?: "male" | "female";
  birthYear?: number;
  deathYear?: number;
  generation?: number; // số đời
}

// Convert hierarchical -> flat array
function hierarchicalToFlat(
  node: any,
  parentId?: number,
  gender: "male" | "female" = "male",
  generation: number = 1
): MyNode[] {
  const flat: MyNode[] = [];
  const nodeId = node.id === "root" ? 0 : Number(node.id);

  flat.push({
    id: nodeId,
    name: node.name,
    fid: gender === "male" ? parentId : undefined,
    mid: gender === "female" ? parentId : undefined,
    gender,
    birthYear: node.birth,
    deathYear: node.death,
    generation,
  });

  if (node.children?.length) {
    node.children.forEach((child: any, idx: any) => {
        const childGender: "male" | "female" =
          idx % 2 === 0 ? "male" : "female";
      flat.push(...hierarchicalToFlat(child, nodeId, childGender, generation + 1)); // mặc định con là nam
    });
  }

  return flat;
}

const MyFamilyTree: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const treeRef = useRef<any>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const nodes = hierarchicalToFlat(hierarchicalData).map((node) => ({
      ...node,
      life: node.birthYear
        ? node.deathYear
          ? `${node.birthYear} - ${node.deathYear}`
          : `sinh ${node.birthYear}`
        : node.deathYear
        ? `mất ${node.deathYear}`
        : "",
      generationText: `Đời ${node.generation}`,
    }));

    // Khởi tạo FamilyTree
    treeRef.current = new (FamilyTree as any)(containerRef.current, {
      nodes,
      orientation: FamilyTree.orientation.top,
      levelSeparation: 120,
      siblingSeparation: 80,
      nodeBinding: {
        field_0: "name",
        field_1: "life",
        field_2: "generationText",
      },
      template: "tommy",
      nodeMenu: null, // tắt menu chuột phải
      animate: false, // tắt animation → không rung
      mouseScrool: FamilyTree.scroll.chrome, // bật zoom bằng chuột
      control: true, // bật thanh control zoom/pan
      scaleInitial: 0.8, // thu nhỏ ban đầu
    });

    // Thêm button custom vào mỗi node
    nodes.forEach((node: any) => {
      treeRef.current.on("click", (sender: any, args: any) => {
        if (args.node.id === node.id) {
          alert(
            `Thông tin chi tiết:\nTên: ${node.name}\n${node.life}\nSố đời: ${node.generation}`
        );
        console.log("${node.name}\n${node.life}\nSố đời: ${node.generation}");
          // TODO: Gọi API ở đây nếu muốn
        }
      });
    });

    treeRef.current.load(nodes);

    return () => {
      treeRef.current.destroy();
    };
  }, []);
  

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "1000px",
        overflow: "auto",
        border: "1px solid #ccc",
        padding: "10px",
        backgroundColor: "#f9f9f9",
      }}
    />
  );
};

export default MyFamilyTree;
