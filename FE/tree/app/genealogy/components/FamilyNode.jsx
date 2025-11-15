// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import Tree from "react-d3-tree";
// import { useRouter } from "next/router";

// export interface FamilyNode {
//   id: string;
//   name: string;
//   avatar?: string;
//   children?: FamilyNode[];
// }

// interface Props {
//   data: FamilyNode;
// }

// const nodeSize = { x: 200, y: 150 };

// export default function FamilyTreeChart({ data }: Props) {
//   const treeContainer = useRef<HTMLDivElement>(null);
//   const [translate, setTranslate] = useState({ x: 0, y: 0 });
//   const router = useRouter();

//   useEffect(() => {
//     if (treeContainer.current) {
//       const { width } = treeContainer.current.getBoundingClientRect();
//       setTranslate({ x: width / 2, y: 50 });
//     }
//   }, []);

//   const renderCustomNode = ({ nodeDatum }: { nodeDatum: FamilyNode }) => (
//     <g>
//       <circle
//         r={30}
//         fill="#6495ED"
//         stroke="#000"
//         strokeWidth={2}
//         onClick={() => router.push(`/chi-tiet-thanh-vien/${nodeDatum.id}`)}
//       />
//       {nodeDatum.avatar && (
//         <image
//           href={nodeDatum.avatar}
//           x={-20}
//           y={-20}
//           width={40}
//           height={40}
//           clipPath="circle(20px at 20px 20px)"
//         />
//       )}
//       <text
//         fill="#000"
//         x={0}
//         y={50}
//         textAnchor="middle"
//         style={{ fontWeight: "bold" }}
//       >
//         {nodeDatum.name}
//       </text>
//     </g>
//   );

//   return (
//     <div style={{ width: "100%", height: "600px" }} ref={treeContainer}>
//       <Tree
//         data={data}
//         translate={translate}
//         orientation="vertical"
//         pathFunc="elbow"
//         collapsible
//         nodeSize={nodeSize}
//         renderCustomNodeElement={renderCustomNode}
//       />
//     </div>
//   );
// }
