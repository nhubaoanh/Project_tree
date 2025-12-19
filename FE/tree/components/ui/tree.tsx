"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import FamilyTree from "@balkangraph/familytree.js";
import { ITreeNode } from "@/types/tree";
import { FamilyMemberModal } from "./FamilyMemberModal";
import { ControlPanel } from "./tree/ControlPanel";
import { ToolbarPanel } from "./tree/ToolbarPanel";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:6001";
const DEFAULT_AVATAR = "/images/vangoc.jpg";

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
  doiThuoc?: number;
};

// Helpers
const getImageUrl = (img: string | null | undefined): string => {
  if (!img?.trim()) return DEFAULT_AVATAR;
  if (img.startsWith("http")) return img;
  return `${API_BASE_URL}/${img.startsWith("uploads/") ? img : `uploads/${img}`}`;
};

const toNum = (v: unknown): number | undefined => {
  if (v == null) return undefined;
  const n = typeof v === "string" ? Number(v) : (v as number);
  return Number.isFinite(n) ? n : undefined;
};

// Custom Templates - Fix hình ảnh không bị méo
const initTemplates = () => {
  const create = (name: string, bg: string, border: string, opacity = 1) => {
    FamilyTree.templates[name] = Object.assign({}, FamilyTree.templates.john);
    FamilyTree.templates[name].size = [180, 120];
    FamilyTree.templates[name].node = `
      <rect x="0" y="0" width="180" height="120" fill="${bg}" stroke="${border}" stroke-width="2" rx="10" ry="10" opacity="${opacity}"/>
      <rect x="0" y="0" width="180" height="35" fill="${border}" rx="10" ry="10"/>
      <rect x="0" y="25" width="180" height="10" fill="${border}"/>
    `;
    FamilyTree.templates[name].field_0 = '<text x="90" y="24" text-anchor="middle" fill="#fff" font-weight="bold" font-size="12">{val}</text>';
    FamilyTree.templates[name].field_1 = '<text x="90" y="95" text-anchor="middle" fill="#555" font-size="10">{val}</text>';
    FamilyTree.templates[name].field_2 = '<text x="90" y="108" text-anchor="middle" fill="#777" font-size="9">{val}</text>';
    // Ảnh tròn, không méo
    FamilyTree.templates[name].img_0 = `
      <defs><clipPath id="${name}_clip"><circle cx="90" cy="62" r="18"/></clipPath></defs>
      <circle cx="90" cy="62" r="20" fill="#fff" stroke="${border}" stroke-width="2"/>
      <image x="72" y="44" width="36" height="36" clip-path="url(#${name}_clip)" href="{val}" preserveAspectRatio="xMidYMid slice"/>
    `;
  };
  create("male_tpl", "#e3f2fd", "#1976d2");
  create("female_tpl", "#fce4ec", "#d81b60");
  create("dead_tpl", "#eeeeee", "#757575", 0.85);
};

interface Props {
  data: ITreeNode[];
}

export const MyFamilyTree = ({ data }: Props) => {
  const divRef = useRef<HTMLDivElement>(null);
  const familyRef = useRef<FamilyTree | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<AppFamilyNode | null>(null);
  const [allNodes, setAllNodes] = useState<any[]>([]);

  // Config
  const [maxGen, setMaxGen] = useState(3);
  const [gens, setGens] = useState<number[]>([]);
  const [orientation, setOrientation] = useState(FamilyTree.orientation.top);
  const [template, setTemplate] = useState("custom");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<number[]>([]);

  // Panel visibility
  const [showLeft, setShowLeft] = useState(true);
  const [showRight, setShowRight] = useState(true);

  // Calc generations
  useEffect(() => {
    if (!data.length) return;
    const g = [...new Set(data.map((n) => n.doiThuoc || 1))].sort((a, b) => a - b);
    setGens(g);
    setMaxGen(Math.min(3, Math.max(...g)));
  }, [data]);

  // Search
  const doSearch = useCallback(
    (q: string) => {
      setSearch(q);
      if (!q.trim()) {
        setResults([]);
        return;
      }
      const r = allNodes
        .filter(
          (n) =>
            n.field_0?.toLowerCase().includes(q.toLowerCase()) ||
            n.field_2?.toLowerCase().includes(q.toLowerCase())
        )
        .map((n) => n.id);
      setResults(r);
      if (r.length && familyRef.current) familyRef.current.center(r[0]);
    },
    [allNodes]
  );

  // Init tree
  useEffect(() => {
    if (!divRef.current || !data.length) return;
    initTemplates();

    const filtered = data.filter((n) => (n.doiThuoc || 1) <= maxGen);
    const getTags = (n: ITreeNode) => {
      if (template !== "custom") return [n.gioiTinh === 1 ? "male" : "female"];
      if (n.ngayMat) return ["dead"];
      return [n.gioiTinh === 1 ? "male" : "female"];
    };

    const nodes = filtered.map((n) => ({
      id: toNum(n.id)!,
      pids: (n.pids ?? []).map(toNum).filter((x): x is number => typeof x === "number"),
      fid: toNum(n.fid),
      mid: toNum(n.mid),
      memberId: n.thanhVienId,
      doiThuoc: n.doiThuoc || 1,
      field_0: n.hoTen || "Chưa rõ",
      field_1: n.ngayMat ? `Mất: ${new Date(n.ngayMat).toLocaleDateString("vi-VN")}` : "Còn sống",
      field_2: n.ngheNghiep || "Chưa rõ",
      img_0: getImageUrl(n.anhChanDung),
      tags: getTags(n),
    }));
    setAllNodes(nodes);

    if (familyRef.current) divRef.current.innerHTML = "";

    const openModal = (nodeId: string | number) => {
      const id = typeof nodeId === "string" ? Number(nodeId) : nodeId;
      if (!Number.isFinite(id)) return;
      const node = tree.get(id) as unknown as AppFamilyNode;
      if (node) {
        setSelectedNode(node);
        setModalOpen(true);
      }
    };

    const tree = new FamilyTree(divRef.current!, {
      nodes,
      template: template === "custom" ? "john" : template,
      scaleInitial: FamilyTree.match.boundary,
      scaleMin: 0.2,
      scaleMax: 5,
      enableSearch: true,
      miniMap: true,
      mouseScrool: FamilyTree.action.zoom,
      orientation,
      // Bật kéo thả node
      movable: FamilyTree.movable.node,
      nodeMouseClick: FamilyTree.action.none, // Cho phép kéo thả mà không trigger click
      levelSeparation: 100,
      siblingSeparation: 50,
      subtreeSeparation: 70,
      lazyLoading: true,
      undoRedoStorageName: "ft_history",
      anim: { func: FamilyTree.anim.outPow, duration: 200 },
      zoom: { speed: 100, smooth: 10 },
      nodeBinding: { field_0: "field_0", field_1: "field_1", field_2: "field_2", img_0: "img_0" },
      nodeMenu: {
        details: { text: "Chi tiết", onClick: openModal },
        edit: { text: "Sửa" },
        center: {
          text: "🎯 Căn giữa",
          onClick: (id: string | number) => tree.center(typeof id === "string" ? Number(id) : id),
        },
      },
      menu: { pdf: { text: "📄 PDF" }, png: { text: "🖼️ PNG" }, svg: { text: "📐 SVG" } },
      tags:
        template === "custom"
          ? { male: { template: "male_tpl" }, female: { template: "female_tpl" }, dead: { template: "dead_tpl" } }
          : { male: { template: template }, female: { template: template } },
      toolbar: { layout: true, zoom: true, fit: true, expandAll: true, fullScreen: true },
    });

    tree.onNodeDoubleClick(function (args) {
      const d = (args as any).node || args.data;
      if (d) openModal(d.id);
    });

    familyRef.current = tree;
    return () => {
      if (divRef.current) divRef.current.innerHTML = "";
    };
  }, [data, maxGen, orientation, template]);

  return (
    <div className="relative w-full h-screen">
      {/* LEFT - Control Panel */}
      <ControlPanel
        show={showLeft}
        onToggle={() => setShowLeft(!showLeft)}
        maxGen={maxGen}
        setMaxGen={setMaxGen}
        gens={gens}
        orientation={orientation}
        setOrientation={setOrientation}
        template={template}
        setTemplate={setTemplate}
        search={search}
        onSearch={doSearch}
        resultCount={results.length}
        totalNodes={allNodes.length}
      />

      {/* RIGHT - Toolbar Panel */}
      <ToolbarPanel show={showRight} onToggle={() => setShowRight(!showRight)} familyRef={familyRef} />

      {/* LEGEND */}
      {template === "custom" && (
        <div className="absolute bottom-4 right-4 z-10 bg-white/95 rounded-lg shadow border border-amber-400 px-3 py-2 text-xs">
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-blue-100 border-2 border-blue-600"></span>Nam
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-pink-100 border-2 border-pink-600"></span>Nữ
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-gray-200 border-2 border-gray-500"></span>Đã mất
            </span>
          </div>
        </div>
      )}

      {/* SEARCH RESULTS */}
      {results.length > 0 && (
        <div className="absolute bottom-4 left-4 z-10 bg-white rounded-lg shadow border border-amber-400 p-2 max-h-36 overflow-y-auto">
          <p className="text-xs font-bold text-amber-800 mb-1">🎯 Kết quả ({results.length}):</p>
          {results.slice(0, 6).map((id) => {
            const n = allNodes.find((x) => x.id === id);
            return (
              <button
                key={id}
                onClick={() => familyRef.current?.center(id)}
                className="block w-full text-left px-2 py-1 text-xs bg-amber-50 hover:bg-amber-100 rounded mb-0.5"
              >
                {n?.field_0}
              </button>
            );
          })}
          {results.length > 6 && <p className="text-xs text-gray-400 mt-1">...và {results.length - 6} khác</p>}
        </div>
      )}

      {/* TREE */}
      <div ref={divRef} className="w-full h-full bg-gradient-to-b from-amber-50 to-stone-100" />

      {/* MODAL */}
      {selectedNode && (
        <FamilyMemberModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          node={selectedNode}
          getNameById={(id) => {
            if (id == null) return "Không có";
            const nid = typeof id === "string" ? Number(id) : id;
            return allNodes.find((n) => n.id === nid)?.field_0 || "Không có";
          }}
          getChildren={(pid) =>
            allNodes.filter((n) => n.fid === pid || n.mid === pid).map((n) => n.field_0 || "Chưa rõ")
          }
        />
      )}
    </div>
  );
};
