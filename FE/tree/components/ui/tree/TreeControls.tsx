"use client";

import { memo, useState } from "react";
import { Panel, useReactFlow } from "reactflow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  RotateCw, 
  Search, 
  Download,
  Undo2,
  Redo2,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  Settings
} from "lucide-react";

interface TreeControlsProps {
  maxGen: number;
  setMaxGen: (gen: number) => void;
  gens: number[];
  direction: "TB" | "BT" | "LR" | "RL";
  setDirection: (dir: "TB" | "BT" | "LR" | "RL") => void;
  search: string;
  onSearch: (query: string) => void;
  onPerformSearch: () => void;
  onRelayout: () => void;
  onExportPng: () => void;
  onExportSvg: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  layoutAlgorithm: "dagre" | "compact" | "spacious" | "balanced";
  setLayoutAlgorithm: (algo: "dagre" | "compact" | "spacious" | "balanced") => void;
  nodeTemplate: "default" | "compact" | "photo";
  setNodeTemplate: (template: "default" | "compact" | "photo") => void;
  onAddMember: () => void;
  onRefresh?: () => void;
}

export const TreeControls = memo(({
  maxGen,
  setMaxGen,
  gens,
  direction,
  setDirection,
  search,
  onSearch,
  onPerformSearch,
  onRelayout,
  onExportPng,
  onExportSvg,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  darkMode,
  onToggleDarkMode,
  layoutAlgorithm,
  setLayoutAlgorithm,
  nodeTemplate,
  setNodeTemplate,
  onAddMember,
  onRefresh,
}: TreeControlsProps) => {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const [showLeftPanel, setShowLeftPanel] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);

  return (
    <>
      {/* Top Left - Search & Filters */}
      {showLeftPanel ? (
        <Panel position="top-left" className="space-y-2">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-lg shadow-lg border border-red-400 dark:border-red-600 p-3 space-y-2">
            {/* Close button */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1">
                <Settings className="h-3 w-3" />
                Điều khiển
              </span>
              <button
                onClick={() => setShowLeftPanel(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                title="Đóng"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400 dark:text-gray-500" />
              <Input
                type="text"
                placeholder="Tìm kiếm thành viên..."
                value={search}
                onChange={(e) => onSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onPerformSearch();
                  }
                }}
                className="pl-8 pr-9 h-9 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <button
                onClick={onPerformSearch}
                className="absolute right-2 top-2 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                title="Tìm kiếm (Enter)"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>

            {/* Generation Filter */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Hiển thị đến đời:</label>
              <Select value={maxGen.toString()} onValueChange={(v) => setMaxGen(Number(v))}>
                <SelectTrigger className="h-9 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-600 bg-white/95 backdrop-blur">
                  {gens.map((g) => (
                    <SelectItem 
                      key={g} 
                      value={g.toString()}
                      className="dark:text-white dark:focus:bg-gray-700 dark:hover:bg-gray-700"
                    >
                      Đời {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Direction */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Hướng hiển thị:</label>
              <Select value={direction} onValueChange={(v) => setDirection(v as any)}>
                <SelectTrigger className="h-9 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-600 bg-white/95 backdrop-blur">
                  <SelectItem value="TB" className="dark:text-white dark:focus:bg-gray-700 dark:hover:bg-gray-700">
                    Trên xuống dưới
                  </SelectItem>
                  <SelectItem value="BT" className="dark:text-white dark:focus:bg-gray-700 dark:hover:bg-gray-700">
                    Dưới lên trên
                  </SelectItem>
                  <SelectItem value="LR" className="dark:text-white dark:focus:bg-gray-700 dark:hover:bg-gray-700">
                    Trái sang phải
                  </SelectItem>
                  <SelectItem value="RL" className="dark:text-white dark:focus:bg-gray-700 dark:hover:bg-gray-700">
                    Phải sang trái
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Layout Algorithm */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Kiểu sắp xếp:</label>
              <Select value={layoutAlgorithm} onValueChange={(v) => setLayoutAlgorithm(v as any)}>
                <SelectTrigger className="h-9 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-600 bg-white/95 backdrop-blur">
                  <SelectItem value="dagre" className="dark:text-white dark:focus:bg-gray-700 dark:hover:bg-gray-700">
                    Mặc định
                  </SelectItem>
                  <SelectItem value="compact" className="dark:text-white dark:focus:bg-gray-700 dark:hover:bg-gray-700">
                    Gọn
                  </SelectItem>
                  <SelectItem value="spacious" className="dark:text-white dark:focus:bg-gray-700 dark:hover:bg-gray-700">
                    Rộng
                  </SelectItem>
                  <SelectItem value="balanced" className="dark:text-white dark:focus:bg-gray-700 dark:hover:bg-gray-700">
                    Cân bằng
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Node Template */}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Kiểu hiển thị:</label>
              <Select value={nodeTemplate} onValueChange={(v) => setNodeTemplate(v as any)}>
                <SelectTrigger className="h-9 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-800 dark:border-gray-600 bg-white/95 backdrop-blur">
                  <SelectItem value="default" className="dark:text-white dark:focus:bg-gray-700 dark:hover:bg-gray-700">
                    Mặc định
                  </SelectItem>
                  <SelectItem value="compact" className="dark:text-white dark:focus:bg-gray-700 dark:hover:bg-gray-700">
                    Gọn nhẹ
                  </SelectItem>
                  <SelectItem value="photo" className="dark:text-white dark:focus:bg-gray-700 dark:hover:bg-gray-700">
                    Ảnh lớn
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Relayout Button */}
            <Button
              onClick={onRelayout}
              variant="outline"
              size="sm"
              className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600"
            >
              <RotateCw className="h-4 w-4 mr-2" />
              Sắp xếp lại
            </Button>

            {/* Refresh Button */}
            {onRefresh && (
              <Button
                onClick={onRefresh}
                variant="outline"
                size="sm"
                className="w-full dark:bg-gray-700 dark:text-white dark:border-gray-600 border-green-500 text-green-700 hover:bg-green-50 dark:border-green-600 dark:text-green-400 dark:hover:bg-green-900/20"
              >
                <RotateCw className="h-4 w-4 mr-2" />
                Tải lại dữ liệu
              </Button>
            )}

            {/* Add Member Button */}
            <Button
              onClick={onAddMember}
              variant="default"
              size="sm"
              className="w-full bg-gradient-to-r from-red-800 to-red-600 hover:from-red-900 hover:to-red-700 text-white"
            >
              Thêm thành viên
            </Button>
          </div>
        </Panel>
      ) : (
        <Panel position="top-left">
          <button
            onClick={() => setShowLeftPanel(true)}
            className="bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-lg shadow-lg border border-red-400 dark:border-red-600 p-2 hover:shadow-xl transition-all"
            title="Mở điều khiển"
          >
            <ChevronRight className="h-4 w-4 text-red-600 dark:text-red-400" />
          </button>
        </Panel>
      )}

      {/* Top Right - Undo/Redo & Export */}
      {showRightPanel ? (
        <Panel position="top-right" className="space-y-2">
          <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-lg shadow-lg border border-red-400 dark:border-red-600 p-2 space-y-2">
            {/* Close button */}
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Công cụ</span>
              <button
                onClick={() => setShowRightPanel(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                title="Đóng"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Undo/Redo */}
            <div className="flex gap-2">
              <Button
                onClick={onUndo}
                disabled={!canUndo}
                variant="outline"
                size="sm"
                className="flex-1"
                title="Hoàn tác (Ctrl+Z)"
              >
                <Undo2 className="h-4 w-4" />
              </Button>
              <Button
                onClick={onRedo}
                disabled={!canRedo}
                variant="outline"
                size="sm"
                className="flex-1"
                title="Làm lại (Ctrl+Y)"
              >
                <Redo2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Dark Mode Toggle */}
            <Button
              onClick={onToggleDarkMode}
              variant="outline"
              size="sm"
              className="w-full"
              title="Chế độ tối"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* Export Buttons */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 space-y-2">
              <Button
                onClick={onExportPng}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                Export PNG
              </Button>
              <Button
                onClick={onExportSvg}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                Export SVG
              </Button>
            </div>
          </div>
        </Panel>
      ) : (
        <Panel position="top-right">
          <button
            onClick={() => setShowRightPanel(true)}
            className="bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-lg shadow-lg border border-red-400 dark:border-red-600 p-2 hover:shadow-xl transition-all"
            title="Mở công cụ"
          >
            <ChevronLeft className="h-4 w-4 text-red-600 dark:text-red-400" />
          </button>
        </Panel>
      )}

      {/* Bottom Right - Zoom Controls */}
      <Panel position="bottom-right" className="space-y-2">
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-lg shadow-lg border border-red-400 dark:border-red-600 p-2 flex flex-col gap-2">
          <Button
            onClick={() => zoomIn()}
            variant="outline"
            size="icon"
            className="h-9 w-9"
            title="Phóng to (Ctrl++)"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => zoomOut()}
            variant="outline"
            size="icon"
            className="h-9 w-9"
            title="Thu nhỏ (Ctrl+-)"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            onClick={() => fitView({ padding: 0.2, duration: 800 })}
            variant="outline"
            size="icon"
            className="h-9 w-9"
            title="Vừa màn hình (Ctrl+0)"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </Panel>

      {/* Legend */}
      <Panel position="bottom-left">
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur rounded-lg shadow-lg border border-red-400 dark:border-red-600 px-4 py-2">
          <div className="flex gap-4 text-xs dark:text-gray-300">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-100 border-2 border-blue-500"></span>
              Nam
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-pink-100 border-2 border-pink-500"></span>
              Nữ
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-gray-100 border-2 border-gray-400"></span>
              Đã mất
            </span>
          </div>
        </div>
      </Panel>
    </>
  );
});

TreeControls.displayName = "TreeControls";
