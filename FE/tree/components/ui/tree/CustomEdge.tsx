"use client";

import { memo } from "react";
import { EdgeProps, getBezierPath, EdgeLabelRenderer, BaseEdge } from "reactflow";

export const CustomEdge = memo(({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}: EdgeProps) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const edgeLabel = data?.label || "";
  const edgeType = data?.type || "parent";

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      {edgeLabel && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              fontSize: 10,
              pointerEvents: "all",
            }}
            className={`
              px-2 py-0.5 rounded-full text-white font-medium shadow-sm
              ${edgeType === "spouse" ? "bg-amber-500" : "bg-stone-500"}
            `}
          >
            {edgeLabel}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
});

CustomEdge.displayName = "CustomEdge";
