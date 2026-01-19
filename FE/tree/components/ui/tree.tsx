"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  NodeTypes,
  MarkerType,
  ConnectionMode,
  ReactFlowProvider,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { QueryClient } from "@tanstack/react-query";

import { ITreeNode } from "@/types/tree";
import { FamilyNode, FamilyNodeData } from "./tree/FamilyNode";
import { CompactNode } from "./tree/CompactNode";
import { PhotoNode } from "./tree/PhotoNode";
import { FamilyMemberModal } from "./FamilyMemberModal";
import { MemberCRUDModal } from "./tree/MemberCRUDModal";
import { TreeControls } from "./tree/TreeControls";
import { ContextMenu, CanvasContextMenu } from "./tree/ContextMenu";
import { AdvancedSearch } from "./tree/AdvancedSearch";
import { getLayoutedElements } from "./tree/layoutUtils";
import { exportToPng, exportToSvg } from "./tree/exportUtils";
import { useUndoRedo } from "@/hooks/useUndoRedo";
import { createMemberWithDongHo, updateMember, deleteMember } from "@/service/member.service";
import { useToast } from "@/service/useToas";
import storage from "@/utils/storage";

interface Props {
  data: ITreeNode[];
  dongHoId?: string;
  queryClient?: QueryClient; // Thêm queryClient để invalidate queries
  onDataChange?: () => void; // Giữ lại để backward compatible
}

const toNum = (v: unknown): number | undefined => {
  if (v == null) return undefined;
  const n = typeof v === "string" ? Number(v) : (v as number);
  return Number.isFinite(n) ? n : undefined;
};

const MyFamilyTreeInner = ({ data, dongHoId, queryClient, onDataChange }: Props) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { fitView } = useReactFlow();
  const { showSuccess, showError } = useToast();
  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNodeData, setSelectedNodeData] = useState<any>(null);
  
  const [maxGen, setMaxGen] = useState(3);
  const [gens, setGens] = useState<number[]>([]);
  const [direction, setDirection] = useState<"TB" | "BT" | "LR" | "RL">("TB");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [layoutAlgorithm, setLayoutAlgorithm] = useState<"dagre" | "compact" | "spacious" | "balanced">("dagre");
  const [nodeTemplate, setNodeTemplate] = useState<"default" | "compact" | "photo">("default");

  // CRUD Modal state
  const [crudModalOpen, setCrudModalOpen] = useState(false);
  const [crudMode, setCrudMode] = useState<"add" | "edit">("add");
  const [selectedMember, setSelectedMember] = useState<ITreeNode | null>(null);

  // Panel visibility
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  // Context menu state
  const [contextMenu, setContextMenu] = useState<{
    id: string;
    top: number;
    left: number;
  } | null>(null);
  const [canvasContextMenu, setCanvasContextMenu] = useState<{
    top: number;
    left: number;
  } | null>(null);

  // Highlighted nodes for search/relationship
  const [highlightedNodes, setHighlightedNodes] = useState<string[]>([]);

  // Undo/Redo
  const { undo, redo, canUndo, canRedo, takeSnapshot } = useUndoRedo();

  // Dynamic node types based on template
  const nodeTypes: NodeTypes = useMemo(() => {
    const nodeType = nodeTemplate === "compact" ? CompactNode : nodeTemplate === "photo" ? PhotoNode : FamilyNode;
    return {
      familyNode: nodeType,
    };
  }, [nodeTemplate]);

  // Tính toán generations
  useEffect(() => {
    if (!data.length) return;
    const g = [...new Set(data.map((n) => n.doiThuoc || 1))].sort((a, b) => a - b);
    setGens(g);
    setMaxGen(Math.min(3, Math.max(...g)));
  }, [data]);

  // Chuyển đổi data thành nodes và edges
  const buildGraph = useCallback(() => {
    const filtered = data.filter((n) => (n.doiThuoc || 1) <= maxGen);
    
    // Tạo nodes
    const newNodes: Node<FamilyNodeData>[] = filtered.map((n) => ({
      id: String(n.id),
      type: "familyNode",
      position: { x: 0, y: 0 }, // Sẽ được tính lại bởi layout
      data: {
        memberId: n.thanhVienId,
        hoTen: n.hoTen || "Chưa rõ",
        gioiTinh: n.gioiTinh || 1,
        ngayMat: n.ngayMat ? String(n.ngayMat) : undefined,
        ngheNghiep: n.ngheNghiep || undefined,
        anhChanDung: n.anhChanDung || undefined,
        doiThuoc: n.doiThuoc || undefined,
      },
      draggable: true,
      style: highlightedNodes.length > 0 
        ? { opacity: highlightedNodes.includes(String(n.id)) ? 1 : 0.3 }
        : {},
    }));

    // Tạo edges (quan hệ cha-mẹ -> con)
    const newEdges: Edge[] = [];
    filtered.forEach((n) => {
      const childId = String(n.id);
      
      // Edge từ cha
      if (n.fid) {
        const fatherId = String(n.fid);
        if (filtered.some((x) => String(x.id) === fatherId)) {
          newEdges.push({
            id: `f-${fatherId}-${childId}`,
            source: fatherId,
            target: childId,
            type: "smoothstep",
            animated: false,
            style: { 
              stroke: darkMode ? "#6b7280" : "#9ca3af", 
              strokeWidth: 1.5
            },
            markerEnd: { 
              type: MarkerType.ArrowClosed, 
              color: darkMode ? "#6b7280" : "#9ca3af"
            },
          });
        }
      }
      
      // Edge từ mẹ
      if (n.mid) {
        const motherId = String(n.mid);
        if (filtered.some((x) => String(x.id) === motherId)) {
          newEdges.push({
            id: `m-${motherId}-${childId}`,
            source: motherId,
            target: childId,
            type: "smoothstep",
            animated: false,
            style: { 
              stroke: darkMode ? "#6b7280" : "#9ca3af", 
              strokeWidth: 1.5
            },
            markerEnd: { 
              type: MarkerType.ArrowClosed, 
              color: darkMode ? "#6b7280" : "#9ca3af"
            },
          });
        }
      }
    });

    // Tạo edges cho vợ chồng (pids)
    filtered.forEach((n) => {
      if (n.pids && n.pids.length > 0) {
        n.pids.forEach((pid) => {
          const partnerId = String(pid);
          const nodeId = String(n.id);
          if (filtered.some((x) => String(x.id) === partnerId)) {
            // Tránh duplicate edge (chỉ tạo 1 chiều)
            if (nodeId < partnerId) {
              newEdges.push({
                id: `spouse-${nodeId}-${partnerId}`,
                source: nodeId,
                target: partnerId,
                type: "straight",
                animated: false,
                style: { 
                  stroke: darkMode ? "#f59e0b" : "#fbbf24", 
                  strokeWidth: 2,
                  strokeDasharray: "5,5"
                },
              });
            }
          }
        });
      }
    });

    return { nodes: newNodes, edges: newEdges };
  }, [data, maxGen, highlightedNodes]);

  // Apply layout khi data thay đổi
  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = buildGraph();
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      newNodes,
      newEdges,
      { direction, algorithm: layoutAlgorithm }
    );
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [buildGraph, direction, layoutAlgorithm, setNodes, setEdges]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Z: Undo
      if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }
      // Ctrl+Y or Ctrl+Shift+Z: Redo
      if ((e.ctrlKey && e.key === 'y') || (e.ctrlKey && e.shiftKey && e.key === 'z')) {
        e.preventDefault();
        handleRedo();
      }
      // Ctrl+0: Fit view
      if (e.ctrlKey && e.key === '0') {
        e.preventDefault();
        fitView({ padding: 0.2, duration: 800 });
      }
      // Ctrl+F: Focus search
      if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        searchInput?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nodes, edges, fitView]);

  // Undo handler
  const handleUndo = useCallback(() => {
    const previous = undo(nodes, edges);
    if (previous) {
      setNodes(previous.nodes);
      setEdges(previous.edges);
    }
  }, [undo, nodes, edges, setNodes, setEdges]);

  // Redo handler
  const handleRedo = useCallback(() => {
    const next = redo();
    if (next) {
      setNodes(next.nodes);
      setEdges(next.edges);
    }
  }, [redo, setNodes, setEdges]);

  // Relayout manually
  const handleRelayout = useCallback(() => {
    takeSnapshot(nodes, edges);
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges,
      { direction, algorithm: layoutAlgorithm }
    );
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [nodes, edges, direction, layoutAlgorithm, setNodes, setEdges, takeSnapshot]);

  // Export handlers
  const handleExportPng = useCallback(async () => {
    try {
      await exportToPng(nodes);
    } catch (error) {
      console.error('Export PNG failed:', error);
      alert('Không thể export PNG. Vui lòng thử lại.');
    }
  }, [nodes]);

  const handleExportSvg = useCallback(async () => {
    try {
      await exportToSvg(nodes);
    } catch (error) {
      console.error('Export SVG failed:', error);
      alert('Không thể export SVG. Vui lòng thử lại.');
    }
  }, [nodes]);

  // Search
  const handleSearch = useCallback((query: string) => {
    setSearch(query);
    // Không tìm real-time nữa, chỉ update state
  }, []);

  // Thực hiện tìm kiếm khi nhấn Enter hoặc button
  const performSearch = useCallback(() => {
    if (!search.trim()) {
      setHighlightedNodes([]);
      return;
    }

    // Find matching nodes
    const matches = nodes.filter((n) =>
      n.data.hoTen?.toLowerCase().includes(search.toLowerCase()) ||
      n.data.ngheNghiep?.toLowerCase().includes(search.toLowerCase())
    );
    
    const matchIds = matches.map((n) => n.id);
    setHighlightedNodes(matchIds);

    // Jump to first result
    if (matches.length > 0 && fitView) {
      setTimeout(() => {
        fitView({ 
          nodes: [matches[0]], 
          duration: 800, 
          padding: 0.5,
          maxZoom: 1.5
        });
      }, 100);
    }
  }, [search, nodes, fitView]);

  // Advanced search handler
  const handleAdvancedSearch = useCallback((resultIds: string[]) => {
    setHighlightedNodes(resultIds);
    
    // Jump to first result
    if (resultIds.length > 0 && fitView) {
      const firstNode = nodes.find((n) => n.id === resultIds[0]);
      if (firstNode) {
        setTimeout(() => {
          fitView({ 
            nodes: [firstNode], 
            duration: 800, 
            padding: 0.5,
            maxZoom: 1.5
          });
        }, 100);
      }
    }
  }, [nodes, fitView]);

  // Double click to open modal
  const onNodeDoubleClick = useCallback((_: any, node: Node<FamilyNodeData>) => {
    setSelectedNodeData(node.data);
    setModalOpen(true);
  }, []);

  // CRUD handlers
  const handleAddMember = useCallback(() => {
    console.log("➕ [Tree] handleAddMember called");
    setCrudMode("add");
    setSelectedMember(null);
    setCrudModalOpen(true);
    console.log("✅ [Tree] CRUD modal should open now");
  }, []);

  const handleEditMember = useCallback((nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;
    
    // Find the original member data
    const member = data.find((m) => m.thanhVienId === node.data.memberId);
    if (!member) return;
    
    setCrudMode("edit");
    setSelectedMember(member);
    setCrudModalOpen(true);
  }, [nodes, data]);

  const handleDeleteMember = useCallback(async (nodeId: string) => {
    console.log("🗑️ [Tree] handleDeleteMember called with nodeId:", nodeId);
    
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) {
      console.error("❌ [Tree] Node not found:", nodeId);
      return;
    }
    
    console.log("🔍 [Tree] Found node:", node.data);
    
    const confirmed = window.confirm(`Bạn có chắc muốn xóa thành viên "${node.data.hoTen}"?`);
    if (!confirmed) {
      console.log("❌ [Tree] User cancelled delete");
      return;
    }
    
    try {
      if (!node.data.memberId) {
        throw new Error("Không tìm thấy ID thành viên");
      }
      
      // Lấy user ID và dongHoId từ storage
      const user = storage.getUser();
      const userId = user?.nguoiDungId || "";
      const userDongHoId = user?.dongHoId;
      const finalDongHoId = dongHoId || userDongHoId;
      
      console.log("📋 [Tree] Delete params:", {
        memberId: node.data.memberId,
        dongHoId: finalDongHoId,
        userId
      });
      
      // Kiểm tra dongHoId bắt buộc
      if (!finalDongHoId) {
        throw new Error("Không tìm thấy thông tin dòng họ");
      }
      
      console.log("🚀 [Tree] Calling deleteMember API...");
      
      const result = await deleteMember(
        [{ thanhVienId: node.data.memberId, dongHoId: finalDongHoId }],
        userId
      );
      
      console.log("📥 [Tree] Delete result:", result);
      
      if (result.success) {
        showSuccess("Xóa thành viên thành công!");
        
        // Invalidate queries nếu có queryClient
        if (queryClient && finalDongHoId) {
          queryClient.invalidateQueries({ queryKey: ["member-tree", finalDongHoId] });
        }
        // Fallback: gọi callback nếu có
        if (onDataChange) {
          onDataChange();
        }
      } else {
        throw new Error(result.message || "Không thể xóa thành viên");
      }
    } catch (error: any) {
      console.error("❌ [Tree] Error deleting member:", error);
      showError(error.message || "Có lỗi xảy ra khi xóa thành viên");
    }
  }, [nodes, showSuccess, showError, dongHoId, queryClient, onDataChange]);

  const handleSaveMember = useCallback(async (formData: Partial<ITreeNode>) => {
    try {
      // Lấy dongHoId từ user hiện tại thay vì props
      const user = storage.getUser();
      const userDongHoId = user?.dongHoId;
      
      // Fallback: lấy từ props hoặc từ data
      let finalDongHoId = userDongHoId || dongHoId;
      
      if (!finalDongHoId && data.length > 0) {
        // Thử lấy từ data có sẵn
        finalDongHoId = data[0]?.dongHoId;
      }
      
      if (!finalDongHoId) {
        throw new Error("Không tìm thấy thông tin dòng họ");
      }

      // Lấy userId từ storage
      const userId = user?.nguoiDungId || "";

      // Format date cho API
      const formatDateForAPI = (date: Date | string | undefined): string | undefined => {
        if (!date) return undefined;
        if (typeof date === 'string') return date;
        return date.toISOString().split('T')[0];
      };

      if (crudMode === "add") {
        // Tạo mới thành viên - format giống MemberModal
        const payload = {
          hoTen: formData.hoTen,
          gioiTinh: formData.gioiTinh,
          ngheNghiep: formData.ngheNghiep || "",
          doiThuoc: formData.doiThuoc,
          chaId: formData.chaId || null,
          meId: formData.meId || null,
          lu_user_id: userId,
          nguoiTaoId: userId,
          // Thêm các trường mới
          ngaySinh: formatDateForAPI(formData.ngaySinh),
          ngayMat: formatDateForAPI(formData.ngayMat),
          noiSinh: formData.noiSinh || "",
          noiMat: formData.noiMat || "",
          trinhDoHocVan: formData.trinhDoHocVan || "",
          diaChiHienTai: formData.diaChiHienTai || "",
          tieuSu: formData.tieuSu || "",
          // Chuyển pids thành voId hoặc chongId
          voId: formData.gioiTinh === 1 && formData.pids && formData.pids.length > 0 ? formData.pids[0] : null,
          chongId: formData.gioiTinh === 2 && formData.pids && formData.pids.length > 0 ? formData.pids[0] : null,
        };
        
        // Xóa các field undefined/empty string
        Object.keys(payload).forEach(key => {
          const value = payload[key as keyof typeof payload];
          if (value === undefined || value === '') {
            delete payload[key as keyof typeof payload];
          }
        });
        
        console.log('📤 [Tree CRUD] Creating member:', payload);
        
        const result = await createMemberWithDongHo(payload, finalDongHoId);
        
        if (result.success) {
          showSuccess("Thêm thành viên thành công!");
          setCrudModalOpen(false);
          setSelectedMember(null);
          
          // Invalidate queries nếu có queryClient
          if (queryClient && finalDongHoId) {
            queryClient.invalidateQueries({ queryKey: ["member-tree", finalDongHoId] });
          }
          // Fallback: gọi callback nếu có
          if (onDataChange) {
            onDataChange();
          }
        } else {
          throw new Error(result.message || "Không thể thêm thành viên");
        }
      } else {
        // Cập nhật thành viên
        if (!selectedMember?.thanhVienId) {
          throw new Error("Không tìm thấy ID thành viên");
        }
        
        const payload = {
          hoTen: formData.hoTen,
          gioiTinh: formData.gioiTinh,
          ngheNghiep: formData.ngheNghiep || "",
          doiThuoc: formData.doiThuoc,
          chaId: formData.chaId || null,
          meId: formData.meId || null,
          dongHoId: finalDongHoId, // Thêm dongHoId cho update
          lu_user_id: userId,
          // Thêm các trường mới
          ngaySinh: formatDateForAPI(formData.ngaySinh),
          ngayMat: formatDateForAPI(formData.ngayMat),
          noiSinh: formData.noiSinh || "",
          noiMat: formData.noiMat || "",
          trinhDoHocVan: formData.trinhDoHocVan || "",
          diaChiHienTai: formData.diaChiHienTai || "",
          tieuSu: formData.tieuSu || "",
          // Chuyển pids thành voId hoặc chongId
          voId: formData.gioiTinh === 1 && formData.pids && formData.pids.length > 0 ? formData.pids[0] : null,
          chongId: formData.gioiTinh === 2 && formData.pids && formData.pids.length > 0 ? formData.pids[0] : null,
        };
        
        // Xóa các field undefined/empty string
        Object.keys(payload).forEach(key => {
          const value = payload[key as keyof typeof payload];
          if (value === undefined || value === '') {
            delete payload[key as keyof typeof payload];
          }
        });
        
        console.log('📤 [Tree CRUD] Updating member:', payload);
        
        const result = await updateMember(selectedMember.thanhVienId, payload);
        
        if (result.success) {
          showSuccess("Cập nhật thành viên thành công!");
          setCrudModalOpen(false);
          setSelectedMember(null);
          
          // Invalidate queries nếu có queryClient
          if (queryClient && finalDongHoId) {
            queryClient.invalidateQueries({ queryKey: ["member-tree", finalDongHoId] });
          }
          // Fallback: gọi callback nếu có
          if (onDataChange) {
            onDataChange();
          }
        } else {
          throw new Error(result.message || "Không thể cập nhật thành viên");
        }
      }
    } catch (error: any) {
      console.error("Error saving member:", error);
      showError(error.message || "Có lỗi xảy ra khi lưu thành viên");
      throw error;
    }
  }, [crudMode, selectedMember, showSuccess, showError, dongHoId, data, queryClient, onDataChange]);

  // Context menu handlers
  const onNodeContextMenu = useCallback((event: React.MouseEvent, node: Node) => {
    event.preventDefault();
    setContextMenu({
      id: node.id,
      top: event.clientY,
      left: event.clientX,
    });
    setCanvasContextMenu(null);
  }, []);

  const onPaneContextMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    setCanvasContextMenu({
      top: event.clientY,
      left: event.clientX,
    });
    setContextMenu(null);
  }, []);

  const closeContextMenu = useCallback(() => {
    setContextMenu(null);
    setCanvasContextMenu(null);
  }, []);

  // Node changes with snapshot
  const handleNodesChange = useCallback((changes: any) => {
    // Take snapshot before drag
    if (changes.some((c: any) => c.type === 'position' && c.dragging)) {
      takeSnapshot(nodes, edges);
    }
    onNodesChange(changes);
  }, [onNodesChange, nodes, edges, takeSnapshot]);

  // Helper functions for modal
  const getNameById = useCallback((id: string | number | null | undefined) => {
    if (id == null) return "Không có";
    const numId = typeof id === "string" ? Number(id) : id;
    // Tìm trong data gốc theo fid/mid
    const person = data.find((n) => n.id === numId);
    return person?.hoTen || "Không có";
  }, [data]);

  const getChildren = useCallback((memberId: number | undefined) => {
    if (!memberId) return [];
    // Tìm trong data gốc theo thanhVienId
    const parent = data.find((n) => n.thanhVienId === memberId);
    if (!parent) return [];
    
    return data
      .filter((n) => n.fid === parent.id || n.mid === parent.id)
      .map((n) => n.hoTen || "Chưa rõ");
  }, [data]);

  return (
    <div className={`w-full h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-b from-amber-50 to-stone-100'}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDoubleClick={onNodeDoubleClick}
        onNodeContextMenu={onNodeContextMenu}
        onPaneContextMenu={onPaneContextMenu}
        nodeTypes={nodeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.1}
        maxZoom={4}
        defaultEdgeOptions={{
          type: "smoothstep",
          animated: false,
        }}
      >
        <Background color={darkMode ? "#374151" : "#d4a574"} gap={16} />
        <MiniMap
          nodeColor={(node) => {
            const data = node.data as FamilyNodeData;
            if (data.ngayMat) return "#9ca3af";
            return data.gioiTinh === 1 ? "#3b82f6" : "#ec4899";
          }}
          maskColor={darkMode ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.1)"}
        />
        
        <TreeControls
          maxGen={maxGen}
          setMaxGen={setMaxGen}
          gens={gens}
          direction={direction}
          setDirection={setDirection}
          search={search}
          onSearch={handleSearch}
          onPerformSearch={performSearch}
          onRelayout={handleRelayout}
          onExportPng={handleExportPng}
          onExportSvg={handleExportSvg}
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={canUndo}
          canRedo={canRedo}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          layoutAlgorithm={layoutAlgorithm}
          setLayoutAlgorithm={setLayoutAlgorithm}
          nodeTemplate={nodeTemplate}
          setNodeTemplate={setNodeTemplate}
          onAddMember={handleAddMember}
          onRefresh={onDataChange}
        />
      </ReactFlow>
      {/* Advanced Search */}
      <AdvancedSearch
        nodes={nodes}
        onSearch={handleAdvancedSearch}
        show={showAdvancedSearch}
        onToggle={() => setShowAdvancedSearch(!showAdvancedSearch)}
      />
      {/* Context Menus */}
      {contextMenu && (
        <ContextMenu
          id={contextMenu.id}
          top={contextMenu.top}
          left={contextMenu.left}
          onClose={closeContextMenu}
          onViewDetail={() => {
            const node = nodes.find((n) => n.id === contextMenu.id);
            if (node) {
              setSelectedNodeData(node.data);
              setModalOpen(true);
            }
          }}
          onEdit={() => {
            handleEditMember(contextMenu.id);
          }}
          onDelete={() => {
            handleDeleteMember(contextMenu.id);
            setContextMenu(null); // Đóng context menu sau khi xóa
          }}
          onCenter={() => {
            const node = nodes.find((n) => n.id === contextMenu.id);
            if (node) {
              fitView({ nodes: [node], duration: 800, padding: 0.5 });
            }
          }}
        />
      )}

      {canvasContextMenu && (
        <CanvasContextMenu
          top={canvasContextMenu.top}
          left={canvasContextMenu.left}
          onClose={closeContextMenu}
          onFitView={() => fitView({ padding: 0.2, duration: 800 })}
          onExportPng={handleExportPng}
          onExportSvg={handleExportSvg}
        />
      )}

      {/* Detail Modal */}
      {selectedNodeData && (
        <FamilyMemberModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          node={{
            id: selectedNodeData.memberId,
            memberId: selectedNodeData.memberId,
            field_0: selectedNodeData.hoTen,
            field_1: selectedNodeData.ngayMat
              ? `Mất: ${new Date(selectedNodeData.ngayMat).toLocaleDateString("vi-VN")}`
              : "Còn sống",
            field_2: selectedNodeData.ngheNghiep || "Chưa rõ",
            img_0: selectedNodeData.anhChanDung,
            // Thêm thông tin cha mẹ, vợ chồng từ data gốc
            fid: data.find((n) => n.thanhVienId === selectedNodeData.memberId)?.fid,
            mid: data.find((n) => n.thanhVienId === selectedNodeData.memberId)?.mid,
            pids: data.find((n) => n.thanhVienId === selectedNodeData.memberId)?.pids || [],
          }}
          getNameById={getNameById}
          getChildren={getChildren}
        />
      )}

      {/* CRUD Modal */}
      <MemberCRUDModal
        open={crudModalOpen}
        onOpenChange={setCrudModalOpen}
        mode={crudMode}
        member={selectedMember}
        allMembers={data}
        dongHoId={dongHoId}
      />
    </div>
  );
};

export const MyFamilyTree = (props: Props) => (
  <ReactFlowProvider>
    <MyFamilyTreeInner {...props} />
  </ReactFlowProvider>
);
