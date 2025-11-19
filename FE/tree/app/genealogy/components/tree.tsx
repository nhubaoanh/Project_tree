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



// export default MyFamilyTree;

// // src/app/genealogy/components/FamilyTreeSVG.tsx
// import React, { useState, useRef } from "react";
// import { hierarchicalData } from "./familyData";
// import { getFlatNodes, NODE_WIDTH, NODE_HEIGHT } from "@/utils/layout";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// // @ts-ignore
// import * as svg2pdf from "svg2pdf.js";


// interface Node {
//   id: string;
//   name: string;
//   generation: number;
//   parentId: string | null;
//   x: number;
//   y: number;
//   birth?: string;
//   death?: string;
//   gender?: "male" | "female";
// }

// interface TreeNodeProps {
//   node: Node;
//   onDrag: (id: string, x: number, y: number) => void;
// }

// const TreeNodeSVG: React.FC<TreeNodeProps> = ({ node, onDrag }) => {
//   const isDeep = node.generation >= 4;
//   // Từ đời thứ 4 trở đi: ô dọc (cao hơn rộng)
//   const w = isDeep ? 40 : NODE_WIDTH;
//   const h = isDeep ? 60 : NODE_HEIGHT;

//   const [pos, setPos] = useState({ x: node.x, y: node.y });
//   const [dragging, setDragging] = useState(false);
//   const [start, setStart] = useState({ x: 0, y: 0 });
//   const [showMenu, setShowMenu] = useState(false);

//   const handleMouseDown = (e: React.MouseEvent) => {
//     setDragging(true);
//     setStart({ x: e.clientX - pos.x, y: e.clientY - pos.y });
//     e.stopPropagation();
//   };

//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!dragging) return;
//     const newX = e.clientX - start.x;
//     const newY = e.clientY - start.y;
//     setPos({ x: newX, y: newY });
//     onDrag(node.id, newX, newY);
//   };

//   const handleMouseUp = () => setDragging(false);

//   const toggleMenu = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setShowMenu(!showMenu);
//   };

//   return (
//     <g
//       transform={`translate(${pos.x},${pos.y})`}
//       onMouseDown={handleMouseDown}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//       style={{ cursor: dragging ? "grabbing" : "grab" }}
//     >
//       {/* Node */}
//       <rect
//         width={w}
//         height={h}
//         fill={node.gender === "male" ? "#ADD8E6" : "#FFB6C1"}
//         stroke="#333"
//         rx={5}
//         ry={5}
//       />
//       {/* Tên */}
//       <text
//         x={w / 2}
//         y={h / 2}
//         textAnchor="middle"
//         alignmentBaseline="middle"
//         style={{ fontSize: isDeep ? 9 : 14 }}
//       >
//         {isDeep ? 
//           // Ô dọc: chia tên thành các ký tự ngắn
//           node.name.length > 8 ? 
//             node.name.substring(0, 7) + '...' : 
//             node.name
//           : node.name
//         }
//       </text>
      
//       {/* Thêm năm sinh cho ô dọc */}
//       {isDeep && node.birth && (
//         <text
//           x={w / 2}
//           y={h / 2 + 12}
//           textAnchor="middle"
//           alignmentBaseline="middle"
//           style={{ fontSize: 7, fill: '#666' }}
//         >
//           {node.birth}
//         </text>
//       )}
//       {/* Icon chi tiết */}
//       <circle
//         cx={w - 8}
//         cy={isDeep ? 8 : 10}
//         r={isDeep ? 4 : 6}
//         fill="#666"
//         onClick={toggleMenu}
//         style={{ cursor: "pointer" }}
//       />
//       <text 
//         x={w - 8} 
//         cy={isDeep ? 8 : 10} 
//         fontSize={isDeep ? 6 : 8} 
//         textAnchor="middle" 
//         fill="#fff"
//         style={{ pointerEvents: 'none' }}
//       >
//         ...
//       </text>
//       {/* Dropdown menu */}
//       {showMenu && (
//         <foreignObject x={w + 5} y={0} width={120} height={100}>
//           <div
//             style={{
//               border: "1px solid #333",
//               background: "#fff",
//               padding: 5,
//               borderRadius: 5,
//               fontSize: 12,
//             }}
//           >
//             <button style={{ display: "block", marginBottom: 5 }}>
//               Xem chi tiết
//             </button>
//             {node.gender === "male" && (
//               <button style={{ display: "block", marginBottom: 5 }}>
//                 Thêm vợ
//               </button>
//             )}
//             {node.gender === "female" && (
//               <button style={{ display: "block", marginBottom: 5 }}>
//                 Thêm chồng
//               </button>
//             )}
//             <button style={{ display: "block" }}>Thêm con</button>
//           </div>
//         </foreignObject>
//       )}
//     </g>
//   );
// };

// const FamilyTreeSVG: React.FC = () => {
//   const flatNodes = getFlatNodes(hierarchicalData) as Node[];
//   const [nodes, setNodes] = useState<Node[]>(flatNodes);
//   const nodeMap = new Map(nodes.map((n) => [n.id, n]));

//   const svgRef = useRef<SVGSVGElement>(null);

//   // Drag node
//   const handleDrag = (id: string, x: number, y: number) => {
//     setNodes((prev) =>
//       prev.map((n) => (n.id === id ? { ...n, x, y } : n))
//     );
//   };

//   // Zoom / Pan
//   const [scale, setScale] = useState(1);
//   const [offset, setOffset] = useState({ x: 0, y: 0 });
//   const [isPanning, setIsPanning] = useState(false);
//   const [startPan, setStartPan] = useState({ x: 0, y: 0 });

//   const handleWheel = (e: React.WheelEvent) => {
//     e.preventDefault();
//     // More intuitive zoom - scroll down to zoom out, up to zoom in
//     const delta = e.deltaY > 0 ? 0.95 : 1.05;
//     const newScale = Math.min(Math.max(0.1, scale * delta), 5);
//     setScale(newScale);
//   };

//   const handleMouseDown = (e: React.MouseEvent) => {
//     // Only start panning if not clicking on a node
//     if ((e.target as SVGElement).tagName === 'svg' || (e.target as SVGElement).tagName === 'g') {
//       setIsPanning(true);
//       setStartPan({ x: e.clientX - offset.x, y: e.clientY - offset.y });
//       e.preventDefault();
//     }
//   };

//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!isPanning) return;
//     setOffset({ x: e.clientX - startPan.x, y: e.clientY - startPan.y });
//   };

//   const handleMouseUp = () => {
//     setIsPanning(false);
//   };

//   // Also handle mouse leave to stop panning
//   const handleMouseLeave = () => {
//     setIsPanning(false);
//   };

//   // Export functions
//   const exportToPNG = async () => {
//     console.log('Starting PNG export...');
//     const container = document.getElementById('tree-container');
//     const svgElement = svgRef.current;
    
//     if (!container || !svgElement) {
//       console.error('Container or SVG element not found');
//       return;
//     }
    
//     try {
//       console.log('Resetting transform for export...');
//       // Temporarily reset transform to get full tree
//       const gElement = svgElement.querySelector('g');
//       const originalTransform = gElement?.getAttribute('transform');
//       gElement?.setAttribute('transform', 'translate(0,0) scale(1)');
      
//       // Wait for DOM to update
//       await new Promise(resolve => setTimeout(resolve, 100));
      
//       console.log('Creating canvas...');
//       const canvas = await html2canvas(container, {
//         backgroundColor: '#f9f9f9',
//         scale: 1,
//         width: 2000,
//         height: 2000,
//         x: 0,
//         y: 0,
//         windowWidth: 2000,
//         windowHeight: 2000,
//         useCORS: true,
//         allowTaint: true
//       });
      
//       console.log('Canvas created, restoring transform...');
//       // Restore original transform
//       gElement?.setAttribute('transform', originalTransform || '');
      
//       console.log('Downloading PNG...');
//       const link = document.createElement('a');
//       link.download = 'family-tree.png';
//       link.href = canvas.toDataURL('image/png', 1.0);
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       console.log('PNG export completed');
//     } catch (error) {
//       console.error('Error exporting to PNG:', error);
//       // Restore transform on error
//       svgElement.querySelector('g')?.setAttribute('transform', `translate(${offset.x},${offset.y}) scale(${scale})`);
//     }
//   };



//  const exportToPDF = async () => {
//    const container = document.getElementById('tree-container');
//    const svgElement = svgRef.current;
   
//    if (!container || !svgElement) {
//      alert("Không tìm thấy cây gia phả. Vui lòng tải lại trang.");
//      return;
//    }

//    // Thêm loading state
//    const button = document.querySelector('button[onClick*="exportToPDF"]') as HTMLButtonElement;
//    const originalText = button?.textContent;
//    if (button) button.textContent = "Đang xuất PDF...";

//    try {
//      // Lưu transform gốc
//      const gElement = svgElement.querySelector('g');
//      const originalTransform = gElement?.getAttribute('transform');
     
//      // Reset transform để lấy full tree
//      gElement?.setAttribute('transform', 'translate(0,0) scale(1)');
     
//      // Đợi DOM cập nhật
//      await new Promise(resolve => setTimeout(resolve, 100));
     
//      // Dùng khổ A3 landscape cho chất lượng tốt
//      const pdf = new jsPDF({
//        orientation: "landscape",
//        unit: "mm",
//        format: "a3"
//      });

//      // Tạo canvas từ container - disable hoàn toàn CSS
//      const canvas = await html2canvas(container, {
//        backgroundColor: '#f9f9f9',
//        scale: 3, // Tăng chất lượng lên 3x
//        width: 2000,
//        height: 2000,
//        useCORS: true,
//        allowTaint: true,
//        logging: false,
//        windowWidth: 2000,
//        windowHeight: 2000,
//        ignoreElements: (element) => {
//          // Bỏ qua tất cả CSS và script tags
//          const tagName = element.tagName?.toLowerCase();
//          return tagName === 'style' || tagName === 'link' || tagName === 'script';
//        },
//        onclone: (clonedDoc) => {
//          // Xóa TẤT CẢ CSS và scripts
//          const elements = clonedDoc.querySelectorAll('style, link[rel="stylesheet"], script');
//          elements.forEach(el => el.remove());
         
//          // Xóa tất cả computed styles
//          const allElements = clonedDoc.querySelectorAll('*');
//          allElements.forEach(el => {
//            const htmlEl = el as HTMLElement;
//            htmlEl.style.cssText = '';
//            // Chỉ giữ lại inline styles quan trọng
//            if (htmlEl.style.display) htmlEl.style.display = htmlEl.style.display;
//            if (htmlEl.style.visibility) htmlEl.style.visibility = htmlEl.style.visibility;
//          });
//        }
//      });

//      // Restore transform
//      gElement?.setAttribute('transform', originalTransform || '');

//      const imgData = canvas.toDataURL('image/png', 1.0);
     
//      // Tính tỷ lệ để fit vào A3
//      const pdfWidth = pdf.internal.pageSize.getWidth();
//      const pdfHeight = pdf.internal.pageSize.getHeight();
//      const ratio = Math.min(pdfWidth / (canvas.width * 0.264583), pdfHeight / (canvas.height * 0.264583));
     
//      const imgWidth = canvas.width * 0.264583 * ratio;
//      const imgHeight = canvas.height * 0.264583 * ratio;
//      const x = (pdfWidth - imgWidth) / 2;
//      const y = 10;

//      // Thêm ảnh
//      pdf.addImage(imgData, 'PNG', x, y, imgWidth, imgHeight);
     
//      // Thêm watermark
//      pdf.setFontSize(8);
//      pdf.setTextColor(150, 150, 150);
//      pdf.text(`Xuất lúc: ${new Date().toLocaleString('vi-VN')}`, pdfWidth - 50, pdfHeight - 5);
     
//      pdf.save(`cay-gia-pha-${Date.now()}.pdf`);
//      alert("Xuất PDF thành công!");
//    } catch (error) {
//      console.error("Lỗi khi xuất PDF:", error);
//      // Restore transform on error
//      const gElement = svgElement.querySelector('g');
//      gElement?.setAttribute('transform', `translate(${offset.x},${offset.y}) scale(${scale})`);
//      alert("Không thể xuất PDF. Vui lòng thử lại.");
//    } finally {
//      // Restore button text
//      if (button) button.textContent = originalText || "Export PDF";
//    }
//  };


//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
//       <header style={{ 
//         height: '60px', 
//         background: '#667eea', 
//         padding: '10px 20px',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         boxShadow: '0 2px 10px #0000001a'
//       }}>
//         <h1 style={{ color: 'white', margin: 0, fontSize: '24px' }}>Cây Gia Phả</h1>
//         <div style={{ display: 'flex', gap: '10px' }}>
//           <button 
//             onClick={exportToPNG}
//             style={{
//               padding: '8px 16px',
//               backgroundColor: '#4CAF50',
//               color: 'white',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: 'pointer',
//               fontSize: '14px',
//               fontWeight: 'bold'
//             }}
//           >
//             Export PNG
//           </button>
//           <button 
//             onClick={exportToPDF}
//             style={{
//               padding: '8px 16px',
//               backgroundColor: '#2196F3',
//               color: 'white',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: 'pointer',
//               fontSize: '14px',
//               fontWeight: 'bold'
//             }}
//           >
//             Export PDF
//           </button>
//         </div>
//       </header>
//       <div id="tree-container" style={{ flex: 1, position: 'relative', overflow: 'auto', width: '100vw' }}>
//         <svg
//           ref={svgRef}
//           id="family-tree-svg"
//           width="2000"
//           height="2000"
//           onWheel={handleWheel}
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//           onMouseLeave={handleMouseLeave}
//           style={{ 
//             background: "#f9f9f9",
//             minWidth: '100%',
//             minHeight: '100%',
//             cursor: isPanning ? 'grabbing' : 'grab'
//           }}
//         >
//           <g transform={`translate(${offset.x},${offset.y}) scale(${scale})`}>
//             {/* Draw connection lines */}
//             {nodes.map((node) => {
//               if (!node.parentId) return null;
//               const parent = nodeMap.get(node.parentId);
//               if (!parent) return null;

//               const parentIsDeep = parent.generation >= 4;
//               const parentW = parentIsDeep ? 60 : NODE_WIDTH;
//               const parentH = parentIsDeep ? 30 : NODE_HEIGHT;

//               const nodeIsDeep = node.generation >= 4;
//               const nodeW = nodeIsDeep ? 60 : NODE_WIDTH;
//               const nodeH = nodeIsDeep ? 30 : NODE_HEIGHT;

//               const parentCX = parent.x + parentW / 2;
//               const parentBottom = parent.y + parentH;
//               const childCX = node.x + nodeW / 2;
//               const childTop = node.y;

//               return (
//                 <g key={`line-${parent.id}-${node.id}`}>
//                   <line
//                     x1={parentCX}
//                     y1={parentBottom}
//                     x2={parentCX}
//                     y2={parentBottom + 20}
//                     stroke="#666"
//                     strokeWidth="2"
//                   />
//                   <line
//                     x1={parentCX}
//                     y1={parentBottom + 20}
//                     x2={childCX}
//                     y2={parentBottom + 20}
//                     stroke="#666"
//                     strokeWidth="2"
//                   />
//                   <line
//                     x1={childCX}
//                     y1={parentBottom + 20}
//                     x2={childCX}
//                     y2={childTop}
//                     stroke="#666"
//                     strokeWidth="2"
//                   />
//                 </g>
//               );
//             })}
//             {/* Draw nodes */}
//             {nodes.map((node) => (
//               <TreeNodeSVG key={node.id} node={node} onDrag={handleDrag} />
//             ))}
//           </g>
//         </svg>
//       </div>
//     </div>
//   );
// };

// export default FamilyTreeSVG;
