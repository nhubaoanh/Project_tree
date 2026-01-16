import dagre from "dagre";
import { Node, Edge, Position } from "reactflow";

export interface LayoutOptions {
  direction?: "TB" | "BT" | "LR" | "RL";
  nodeWidth?: number;
  nodeHeight?: number;
  rankSep?: number;
  nodeSep?: number;
  algorithm?: "dagre" | "compact" | "spacious" | "balanced";
}

/**
 * Tính toán layout cho family tree sử dụng dagre
 */
export const getLayoutedElements = (
  nodes: Node[],
  edges: Edge[],
  options: LayoutOptions = {}
) => {
  const {
    direction = "TB",
    nodeWidth = 180,
    nodeHeight = 140,
    algorithm = "dagre",
  } = options;

  // Chọn spacing dựa trên algorithm
  let rankSep = options.rankSep || 100;
  let nodeSep = options.nodeSep || 50;

  switch (algorithm) {
    case "compact":
      rankSep = 60;
      nodeSep = 30;
      break;
    case "spacious":
      rankSep = 150;
      nodeSep = 80;
      break;
    case "balanced":
      rankSep = 100;
      nodeSep = 50;
      break;
    default:
      // dagre default
      break;
  }

  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({
    rankdir: direction,
    ranksep: rankSep,
    nodesep: nodeSep,
    align: "UL", // Align nodes to upper-left for better tree structure
  });

  // Thêm nodes
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  // Thêm edges
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  // Tính toán layout
  dagre.layout(dagreGraph);

  // Cập nhật vị trí nodes
  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
      sourcePosition: direction === "TB" || direction === "BT" ? Position.Bottom : Position.Right,
      targetPosition: direction === "TB" || direction === "BT" ? Position.Top : Position.Left,
    };
  });

  return { nodes: layoutedNodes, edges };
};

/**
 * Tạo edge style cho family tree
 */
export const getEdgeStyle = (type: "parent" | "spouse" = "parent") => {
  if (type === "spouse") {
    return {
      stroke: "#f59e0b",
      strokeWidth: 3,
      strokeDasharray: "5,5",
    };
  }
  return {
    stroke: "#78716c",
    strokeWidth: 2,
  };
};
