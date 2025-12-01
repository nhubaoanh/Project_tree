"use client";

import { FamilyMember } from "@/types/familytree";

export const generateFamilyData = (): FamilyMember[] => {
  const members: FamilyMember[] = [];
  let id = 1;

  const randomGender = (): "male" | "female" =>
    Math.random() > 0.5 ? "male" : "female";

  // --- ROOT ---
  const rootMale: FamilyMember = {
    id: id++,
    name: "Ông Tổ",
    gender: "male",
    title: "Đời 1",
    birthDate: "1800",
  };
  const rootFemale: FamilyMember = {
    id: id++,
    name: "Bà Tổ",
    gender: "female",
    title: "Đời 1",
    birthDate: "1802",
    pids: [rootMale.id],
  };
  rootMale.pids = [rootFemale.id];

  members.push(rootMale, rootFemale);

  let currentGeneration: FamilyMember[] = [rootMale, rootFemale];

  // --- Tạo 7 đời tiếp theo ---
  for (let gen = 2; gen <= 8; gen++) {
    const nextGen: FamilyMember[] = [];

    for (const parent of currentGeneration) {
      // mỗi người có 1–2 con max
      const childCount = 1 + Math.floor(Math.random() * 2);

      for (let i = 0; i < childCount; i++) {
        const child: FamilyMember = {
          id: id++,
          name: `Đời ${gen} - Thành viên ${id}`,
          gender: randomGender(),
          title: `Đời ${gen}`,
          birthDate: `${1800 + gen * 20 + i}`,
          fid: parent.gender === "male" ? parent.id : undefined,
          mid: parent.gender === "female" ? parent.id : undefined,
        };
        members.push(child);
        nextGen.push(child);
      }
    }

    // Giới hạn số người mỗi đời
    if (nextGen.length > 50) nextGen.splice(50);

    currentGeneration = nextGen;
  }

  return members;
};
