export interface FamilyMember {
  id: string | number;
  mid?: string | number; // Mother ID
  fid?: string | number; // Father ID
  pids?: (string | number)[]; // Partner IDs
  name: string;
  title?: string; // Role/Title
  gender: "male" | "female";
  photo?: string;
  birthDate?: string;
  deathDate?: string;
  [key: string]: any;
}

export enum ViewMode {
  DIAGRAM = "diagram",
  ADD_MEMBER = "add",
  HISTORY = "history",
  SETTINGS = "settings",
  PHA_KY = "phaky",
  NEWS = "news",
}



// "use client";
// import React, { useEffect, useRef } from "react";
// import FamilyTree from "@balkangraph/familytree.js";
// import { FamilyMember } from "@/types/familytree";

// interface FamilyTreeProps {
//   data: FamilyMember[];
// }

// export const MyFamilyTree: React.FC<FamilyTreeProps> = ({ data }) => {
//   const divRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (divRef.current) {
//       // Initialize Balkan FamilyTree
//       const tree = new FamilyTree(divRef.current, {
//         nodes: data,
//         template: "hugo", // Traditional look
//         enableSearch: true,
//         mode: "light",
//         mouseScrool: FamilyTree.action.ctrlZoom, // Zoom with ctrl+scroll, pan with drag
//         nodeBinding: {
//           field_0: "name",
//           field_1: "title",
//           img_0: "photo",
//         },
//         menu: {
//           pdf: { text: "Export PDF" },
//           png: { text: "Export PNG" },
//         },
//         // Customizing to match the red/yellow theme slightly via generic tags if needed
//         tags: {
//           male: {
//             template: "hugo",
//           },
//           female: {
//             template: "hugo",
//           },
//         },
//       });

//       // Clean up on unmount (if supported/needed)
//       return () => {
//         // FamilyTree.js doesn't strictly require destroy for simple SPAs,
//         // but cleaning innerHTML avoids duplication on re-renders
//         if (divRef.current) {
//           divRef.current.innerHTML = "";
//         }
//       };
//     }
//   }, [data]);

//   return <div id="tree" ref={divRef} className="w-full h-full bg-stone-50" />;
// };