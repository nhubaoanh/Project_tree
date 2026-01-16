"use client";

import { memo, useState, useMemo } from "react";
import { Node, Edge } from "reactflow";
import { FamilyNodeData } from "./FamilyNode";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GitBranch, X, ArrowRight } from "lucide-react";

interface RelationshipFinderProps {
  nodes: Node<FamilyNodeData>[];
  edges: Edge[];
  onHighlightPath: (nodeIds: string[]) => void;
  show: boolean;
  onToggle: () => void;
}

export const RelationshipFinder = memo(({ 
  nodes, 
  edges, 
  onHighlightPath, 
  show, 
  onToggle 
}: RelationshipFinderProps) => {
  const [person1, setPerson1] = useState<string>("");
  const [person2, setPerson2] = useState<string>("");
  const [path, setPath] = useState<string[]>([]);
  const [relationship, setRelationship] = useState<string>("");

  // Build adjacency list for BFS
  const buildGraph = useMemo(() => {
    const graph = new Map<string, string[]>();
    
    nodes.forEach((node) => {
      graph.set(node.id, []);
    });

    edges.forEach((edge) => {
      const neighbors = graph.get(edge.source) || [];
      neighbors.push(edge.target);
      graph.set(edge.source, neighbors);

      // Bidirectional
      const reverseNeighbors = graph.get(edge.target) || [];
      reverseNeighbors.push(edge.source);
      graph.set(edge.target, reverseNeighbors);
    });

    return graph;
  }, [nodes, edges]);

  // BFS to find shortest path
  const findPath = (start: string, end: string): string[] => {
    if (start === end) return [start];

    const queue: [string, string[]][] = [[start, [start]]];
    const visited = new Set<string>([start]);

    while (queue.length > 0) {
      const [current, currentPath] = queue.shift()!;

      const neighbors = buildGraph.get(current) || [];
      for (const neighbor of neighbors) {
        if (neighbor === end) {
          return [...currentPath, neighbor];
        }

        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([neighbor, [...currentPath, neighbor]]);
        }
      }
    }

    return [];
  };

  // Calculate relationship based on path
  const calculateRelationship = (pathNodes: string[]): string => {
    if (pathNodes.length === 0) return "Không có quan hệ";
    if (pathNodes.length === 1) return "Cùng một người";
    if (pathNodes.length === 2) return "Quan hệ trực tiếp";

    const distance = pathNodes.length - 1;
    
    if (distance === 2) return "Anh/chị/em hoặc Cha/mẹ - Con";
    if (distance === 3) return "Cô/dì/chú/bác hoặc Cháu";
    if (distance === 4) return "Anh/em họ";
    if (distance >= 5) return `Họ hàng xa (${distance} bước)`;

    return `Quan hệ ${distance} bước`;
  };

  const handleFind = () => {
    if (!person1 || !person2) {
      alert("Vui lòng chọn 2 người");
      return;
    }

    const foundPath = findPath(person1, person2);
    setPath(foundPath);
    setRelationship(calculateRelationship(foundPath));
    onHighlightPath(foundPath);
  };

  const handleReset = () => {
    setPerson1("");
    setPerson2("");
    setPath([]);
    setRelationship("");
    onHighlightPath([]);
  };

  const sortedNodes = useMemo(() => {
    return [...nodes].sort((a, b) => 
      (a.data.hoTen || "").localeCompare(b.data.hoTen || "")
    );
  }, [nodes]);

  if (!show) {
    return (
      <button
        onClick={onToggle}
        className="fixed bottom-20 left-4 bg-white dark:bg-gray-800 shadow-lg border border-amber-400 dark:border-amber-600 rounded-lg px-3 py-2 hover:shadow-xl transition-all z-10 flex items-center gap-2"
        title="Tìm mối quan hệ"
      >
        <GitBranch className="h-4 w-4 text-amber-600 dark:text-amber-400" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tìm mối quan hệ</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-20 left-4 w-96 bg-white dark:bg-gray-800 shadow-xl border border-amber-400 dark:border-amber-600 rounded-lg z-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white p-3 flex items-center justify-between rounded-t-lg">
        <div className="flex items-center gap-2">
          <GitBranch className="h-4 w-4" />
          <h3 className="font-bold text-sm">Tìm mối quan hệ</h3>
        </div>
        <button
          onClick={onToggle}
          className="hover:bg-white/20 rounded p-1 transition-colors"
          title="Đóng"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Person 1 */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Người thứ nhất</label>
          <Select value={person1} onValueChange={setPerson1}>
            <SelectTrigger className="h-9 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600">
              <SelectValue placeholder="Chọn người..." />
            </SelectTrigger>
            <SelectContent className="max-h-60 dark:bg-gray-800 dark:border-gray-600">
              {sortedNodes.map((node) => (
                <SelectItem 
                  key={node.id} 
                  value={node.id}
                  className="dark:text-white dark:focus:bg-gray-700 dark:hover:bg-gray-700"
                >
                  {node.data.hoTen}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Person 2 */}
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-700 dark:text-gray-300">Người thứ hai</label>
          <Select value={person2} onValueChange={setPerson2}>
            <SelectTrigger className="h-9 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600">
              <SelectValue placeholder="Chọn người..." />
            </SelectTrigger>
            <SelectContent className="max-h-60 dark:bg-gray-800 dark:border-gray-600">
              {sortedNodes.map((node) => (
                <SelectItem 
                  key={node.id} 
                  value={node.id}
                  className="dark:text-white dark:focus:bg-gray-700 dark:hover:bg-gray-700"
                >
                  {node.data.hoTen}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handleFind}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
            size="sm"
            disabled={!person1 || !person2}
          >
            <GitBranch className="h-4 w-4 mr-2" />
            Tìm
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            size="sm"
            className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
          >
            <X className="h-4 w-4 mr-2" />
            Xóa
          </Button>
        </div>

        {/* Results */}
        {path.length > 0 && (
          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
            <p className="text-sm font-semibold text-amber-900 dark:text-amber-300 mb-2">
              Mối quan hệ: {relationship}
            </p>
            <div className="space-y-2">
              <p className="text-xs text-gray-600 dark:text-gray-400">Đường đi ({path.length} người):</p>
              <div className="flex flex-wrap items-center gap-2">
                {path.map((nodeId, index) => {
                  const node = nodes.find((n) => n.id === nodeId);
                  return (
                    <div key={nodeId} className="flex items-center gap-2">
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 px-2 py-1 rounded">
                        {node?.data.hoTen}
                      </span>
                      {index < path.length - 1 && (
                        <ArrowRight className="h-3 w-3 text-gray-400" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {path.length === 0 && person1 && person2 && relationship && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700">
            <p className="text-sm text-red-700 dark:text-red-300">
              Không tìm thấy mối quan hệ giữa 2 người này
            </p>
          </div>
        )}
      </div>
    </div>
  );
});

RelationshipFinder.displayName = "RelationshipFinder";
