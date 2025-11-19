"use client";

import { FamilyMember } from "@/types/familytree";

export const FAMILY_DATA: FamilyMember[] = [
  // Generation 1: Cao Tổ
  {
    id: 1,
    pids: [2],
    name: "Nguyễn Văn Tổ",
    title: "Cao Tổ Khảo",
    gender: "male",
    birthDate: "1850",
    deathDate: "1920",
    photo: "https://cdn.balkan.app/shared/m60/1.jpg",
  },
  {
    id: 2,
    pids: [1],
    name: "Lê Thị Mẫu",
    title: "Cao Tổ Tỷ",
    gender: "female",
    birthDate: "1855",
    deathDate: "1925",
    photo: "https://cdn.balkan.app/shared/w60/1.jpg",
  },

  // Generation 2: Ông Bà
  {
    id: 3,
    fid: 1,
    mid: 2,
    pids: [4],
    name: "Nguyễn Văn Cả",
    title: "Ông Nội",
    gender: "male",
    birthDate: "1880",
    deathDate: "1950",
  },
  {
    id: 4,
    pids: [3],
    name: "Trần Thị Nội",
    title: "Bà Nội",
    gender: "female",
  },
  {
    id: 5,
    fid: 1,
    mid: 2,
    name: "Nguyễn Thị Hai",
    title: "Bà Cô",
    gender: "female",
  },
  {
    id: 6,
    fid: 1,
    mid: 2,
    pids: [7],
    name: "Nguyễn Văn Ba",
    title: "Ông Trẻ",
    gender: "male",
  },
  {
    id: 7,
    pids: [6],
    name: "Phạm Thị Thím",
    title: "Bà Thím",
    gender: "female",
  },

  // Generation 3: Cha Mẹ
  {
    id: 8,
    fid: 3,
    mid: 4,
    pids: [9],
    name: "Nguyễn Văn Bố",
    title: "Cha",
    gender: "male",
    birthDate: "1910",
    deathDate: "1990",
  },
  {
    id: 9,
    pids: [8],
    name: "Lê Thị Mẹ",
    title: "Mẹ",
    gender: "female",
  },
  {
    id: 10,
    fid: 3,
    mid: 4,
    name: "Nguyễn Văn Chú",
    title: "Chú",
    gender: "male",
  },

  // Generation 3: Cousins
  {
    id: 11,
    fid: 6,
    mid: 7,
    name: "Nguyễn Văn Cô",
    title: "Cô Họ",
    gender: "female",
  },

  // Generation 4: Chúng ta
  {
    id: 12,
    fid: 8,
    mid: 9,
    name: "Nguyễn Văn Tôi",
    title: "Trưởng Nam",
    gender: "male",
    birthDate: "1940",
    photo: "https://cdn.balkan.app/shared/m60/2.jpg",
  },
  {
    id: 13,
    fid: 8,
    mid: 9,
    name: "Nguyễn Thị Em",
    title: "Con Gái",
    gender: "female",
    birthDate: "1945",
  },
];

export const THEME_COLORS = {
  primary: "#991b1b", // Red 800
  secondary: "#facc15", // Yellow 400
  background: "#f5f5f4", // Stone 100
  text: "#1c1917", // Stone 900
};
