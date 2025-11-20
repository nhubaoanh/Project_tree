// "use client";

// import { FamilyMember } from "@/types/familytree";

// export const FAMILY_DATA: FamilyMember[] = [
//   // Generation 1: Cao Tổ
//   {
//     id: 1,
//     pids: [2],
//     name: "Nguyễn Văn Tổ",
//     title: "Cao Tổ Khảo",
//     gender: "male",
//     birthDate: "1850",
//     deathDate: "1920",
//     photo: "https://cdn.balkan.app/shared/m60/1.jpg",
//   },
//   {
//     id: 2,
//     pids: [1],
//     name: "Lê Thị Mẫu",
//     title: "Cao Tổ Tỷ",
//     gender: "female",
//     birthDate: "1855",
//     deathDate: "1925",
//     photo: "https://cdn.balkan.app/shared/w60/1.jpg",
//   },

//   // Generation 2: Ông Bà
//   {
//     id: 3,
//     fid: 1,
//     mid: 2,
//     pids: [4],
//     name: "Nguyễn Văn Cả",
//     title: "Ông Nội",
//     gender: "male",
//     birthDate: "1880",
//     deathDate: "1950",
//   },
//   {
//     id: 4,
//     pids: [3],
//     name: "Trần Thị Nội",
//     title: "Bà Nội",
//     gender: "female",
//   },
//   {
//     id: 5,
//     fid: 1,
//     mid: 2,
//     name: "Nguyễn Thị Hai",
//     title: "Bà Cô",
//     gender: "female",
//   },
//   {
//     id: 6,
//     fid: 1,
//     mid: 2,
//     pids: [7],
//     name: "Nguyễn Văn Ba",
//     title: "Ông Trẻ",
//     gender: "male",
//   },
//   {
//     id: 7,
//     pids: [6],
//     name: "Phạm Thị Thím",
//     title: "Bà Thím",
//     gender: "female",
//   },

//   // Generation 3: Cha Mẹ
//   {
//     id: 8,
//     fid: 3,
//     mid: 4,
//     pids: [9],
//     name: "Nguyễn Văn Bố",
//     title: "Cha",
//     gender: "male",
//     birthDate: "1910",
//     deathDate: "1990",
//   },
//   {
//     id: 9,
//     pids: [8],
//     name: "Lê Thị Mẹ",
//     title: "Mẹ",
//     gender: "female",
//   },
//   {
//     id: 10,
//     fid: 3,
//     mid: 4,
//     name: "Nguyễn Văn Chú",
//     title: "Chú",
//     gender: "male",
//   },

//   // Generation 3: Cousins
//   {
//     id: 11,
//     fid: 6,
//     mid: 7,
//     name: "Nguyễn Văn Cô",
//     title: "Cô Họ",
//     gender: "female",
//   },

//   // Generation 4: Chúng ta
//   {
//     id: 12,
//     fid: 8,
//     mid: 9,
//     name: "Nguyễn Văn Tôi",
//     title: "Trưởng Nam",
//     gender: "male",
//     birthDate: "1940",
//     photo: "https://cdn.balkan.app/shared/m60/2.jpg",
//   },
//   {
//     id: 13,
//     fid: 8,
//     mid: 9,
//     name: "Nguyễn Thị Em",
//     title: "Con Gái",
//     gender: "female",
//     birthDate: "1945",
//   },
// ];

// export const THEME_COLORS = {
//   primary: "#991b1b", // Red 800
//   secondary: "#facc15", // Yellow 400
//   background: "#f5f5f4", // Stone 100
//   text: "#1c1917", // Stone 900
// };

// "use client";

// import { FamilyMember } from "@/types/familytree";

// const randomGender = (): "male" | "female" =>
//   Math.random() > 0.5 ? "male" : "female";

// export const FAMILY_DATA: FamilyMember[] = (() => {
//   const members: FamilyMember[] = [];
//   const TOTAL = 300;

//   // -------------------------------
//   // 1. Tạo 20 cặp vợ chồng đời 1
//   // -------------------------------
//   for (let i = 1; i <= 20; i++) {
//     const male: FamilyMember = {
//       id: members.length + 1,
//       name: `Ông ${i}`,
//       gender: "male",
//       title: "Tổ đời 1",
//       birthDate: `${1800 + i}`,
//       pids: [members.length + 2], // vợ
//     };

//     const female: FamilyMember = {
//       id: members.length + 2,
//       name: `Bà ${i}`,
//       gender: "female",
//       title: "Tổ đời 1",
//       birthDate: `${1805 + i}`,
//       pids: [members.length + 1], // chồng
//     };

//     members.push(male, female);
//   }

//   // -------------------------------
//   // 2. Sinh con cháu ngẫu nhiên
//   // -------------------------------
//   while (members.length < TOTAL) {
//     // chọn ngẫu nhiên 1 ông trong 20 ông đầu tiên
//     const fathers = members.filter((x) => x.gender === "male").slice(0, 20);

//     const father = fathers[Math.floor(Math.random() * fathers.length)];

//     const motherId = father.pids?.[0] ?? undefined;

//     const child: FamilyMember = {
//       id: members.length + 1,
//       name: `Thành viên ${members.length + 1}`,
//       gender: randomGender(),
//       title: "Hậu duệ",
//       fid: father.id,
//       mid: motherId,
//       birthDate: `${1900 + Math.floor(Math.random() * 100)}`,
//     };

//     members.push(child);
//   }

//   return members;
// })();


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
