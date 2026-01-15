/**
 * BFS Graph Builder - Xây dựng đồ thị gia phả và thuật toán BFS
 * Theo nguyên tắc: Database → Graph → BFS → Relation Code
 */

export type EdgeType = "FATHER" | "MOTHER" | "CHILD" | "SPOUSE";

export interface ThanhVien {
  thanhVienId: number;
  dongHoId: string;
  hoTen: string;
  gioiTinh: number; // 0: Nữ, 1: Nam
  ngaySinh: string | null;
  ngayMat: string | null;
  doiThuoc: number;
  chaId: number | null;
  meId: number | null;
  voId: number | null;
  chongId: number | null;
  ngheNghiep: string | null;
  noiSinh: string | null;
}

export interface Neighbor {
  id: number;
  via: EdgeType;
}

export interface PathNode {
  id: number;
  via?: EdgeType;
}

export interface RelationshipPath {
  path: PathNode[];
  pattern: EdgeType[];
  relationCode: string;
  distance: number;
}

/**
 * Mapping quan hệ gia phả - Thay thế if-else
 * Pattern: FATHER>FATHER = Ông nội
 */
const RELATION_MAP: Record<string, string> = {
  // Trực tiếp
  "FATHER": "cha",
  "MOTHER": "mẹ",
  "CHILD": "con",
  "SPOUSE": "vợ/chồng",

  // Ông bà
  "FATHER>FATHER": "ông nội",
  "FATHER>MOTHER": "bà nội",
  "MOTHER>FATHER": "ông ngoại",
  "MOTHER>MOTHER": "bà ngoại",

  // Anh chị em
  "FATHER>CHILD": "anh chị em ruột",
  "MOTHER>CHILD": "anh chị em ruột",

  // Chú bác cô (bên cha)
  "FATHER>FATHER>CHILD": "chú/bác/cô",
  
  // Cậu dì (bên mẹ)
  "MOTHER>FATHER>CHILD": "cậu/dì",

  // Cháu
  "CHILD>CHILD": "cháu",

  // Anh em họ
  "FATHER>FATHER>CHILD>CHILD": "anh em họ",
  "MOTHER>FATHER>CHILD>CHILD": "anh em họ",
};

export class FamilyGraph {
  private memberMap = new Map<number, ThanhVien>();
  private childrenMap = new Map<number, number[]>(); // Pre-index children

  constructor(members: ThanhVien[]) {
    this.buildGraph(members);
  }

  /**
   * Xây dựng đồ thị + pre-index children (tối ưu)
   */
  private buildGraph(members: ThanhVien[]): void {
    // Bước 1: Build member map
    members.forEach(member => {
      this.memberMap.set(member.thanhVienId, member);
    });

    // Bước 2: Pre-index children (quan trọng!)
    members.forEach(member => {
      if (member.chaId) {
        this.addChild(member.chaId, member.thanhVienId);
      }
      if (member.meId) {
        this.addChild(member.meId, member.thanhVienId);
      }
    });
  }

  private addChild(parentId: number, childId: number): void {
    if (!this.childrenMap.has(parentId)) {
      this.childrenMap.set(parentId, []);
    }
    const children = this.childrenMap.get(parentId)!;
    if (!children.includes(childId)) {
      children.push(childId);
    }
  }

  /**
   * Lấy hàng xóm (neighbors) - Cốt lõi BFS
   */
  getNeighbors(id: number): Neighbor[] {
    const member = this.memberMap.get(id);
    if (!member) return [];

    const neighbors: Neighbor[] = [];

    // 👆 Cha
    if (member.chaId) {
      neighbors.push({ id: member.chaId, via: "FATHER" });
    }

    // 👆 Mẹ
    if (member.meId) {
      neighbors.push({ id: member.meId, via: "MOTHER" });
    }

    // ↔ Vợ/chồng
    if (member.gioiTinh === 1 && member.voId) {
      neighbors.push({ id: member.voId, via: "SPOUSE" });
    }
    if (member.gioiTinh === 0 && member.chongId) {
      neighbors.push({ id: member.chongId, via: "SPOUSE" });
    }

    // 👇 Con (dùng pre-indexed)
    const children = this.childrenMap.get(id) || [];
    children.forEach(childId => {
      neighbors.push({ id: childId, via: "CHILD" });
    });

    return neighbors;
  }

  /**
   * BFS tìm đường đi ngắn nhất
   */
  findPath(startId: number, targetId: number, maxDepth = 6): RelationshipPath | null {
    if (!this.memberMap.has(startId) || !this.memberMap.has(targetId)) {
      return null;
    }

    if (startId === targetId) {
      return {
        path: [{ id: startId }],
        pattern: [],
        relationCode: "self",
        distance: 0
      };
    }

    const queue: PathNode[][] = [[{ id: startId }]];
    const visited = new Set<number>([startId]);

    while (queue.length > 0) {
      const path = queue.shift()!;
      const last = path[path.length - 1];

      if (path.length > maxDepth) continue;

      for (const neighbor of this.getNeighbors(last.id)) {
        if (neighbor.id === targetId) {
          // Tìm thấy!
          const fullPath = [...path, { id: neighbor.id, via: neighbor.via }];
          const pattern = this.extractPattern(fullPath);
          const relationCode = this.resolveRelationCode(pattern);

          return {
            path: fullPath,
            pattern,
            relationCode,
            distance: fullPath.length - 1
          };
        }

        if (!visited.has(neighbor.id)) {
          visited.add(neighbor.id);
          queue.push([...path, { id: neighbor.id, via: neighbor.via }]);
        }
      }
    }

    return null;
  }

  /**
   * Trích xuất pattern từ path
   */
  private extractPattern(path: PathNode[]): EdgeType[] {
    return path.slice(1).map(p => p.via!);
  }

  /**
   * Chuẩn hóa pattern → relation code (dùng mapping)
   */
  private resolveRelationCode(pattern: EdgeType[]): string {
    const key = pattern.join(">");
    return RELATION_MAP[key] || "quan hệ phức tạp";
  }

  /**
   * Lấy tất cả người có quan hệ cụ thể (helper methods)
   */
  getRelatives(personId: number, relationType: string): ThanhVien[] {
    const member = this.memberMap.get(personId);
    if (!member) return [];

    switch (relationType) {
      case "father":
        return member.chaId ? [this.memberMap.get(member.chaId)!].filter(Boolean) : [];
      
      case "mother":
        return member.meId ? [this.memberMap.get(member.meId)!].filter(Boolean) : [];
      
      case "parents":
        const parents: ThanhVien[] = [];
        if (member.chaId) parents.push(this.memberMap.get(member.chaId)!);
        if (member.meId) parents.push(this.memberMap.get(member.meId)!);
        return parents.filter(Boolean);
      
      case "spouse":
        const spouseId = member.gioiTinh === 1 ? member.voId : member.chongId;
        return spouseId ? [this.memberMap.get(spouseId)!].filter(Boolean) : [];
      
      case "children":
        const childIds = this.childrenMap.get(personId) || [];
        return childIds.map(id => this.memberMap.get(id)!).filter(Boolean);
      
      case "siblings":
        return this.getSiblings(personId);
      
      case "grandparents_paternal":
        return this.getGrandparentsPaternal(personId);
      
      case "grandparents_maternal":
        return this.getGrandparentsMaternal(personId);
      
      default:
        return [];
    }
  }

  private getSiblings(personId: number): ThanhVien[] {
    const member = this.memberMap.get(personId);
    if (!member) return [];

    const siblings = new Set<number>();

    if (member.chaId) {
      const fatherChildren = this.childrenMap.get(member.chaId) || [];
      fatherChildren.forEach(id => siblings.add(id));
    }

    if (member.meId) {
      const motherChildren = this.childrenMap.get(member.meId) || [];
      motherChildren.forEach(id => siblings.add(id));
    }

    siblings.delete(personId);
    return Array.from(siblings).map(id => this.memberMap.get(id)!).filter(Boolean);
  }

  private getGrandparentsPaternal(personId: number): ThanhVien[] {
    const member = this.memberMap.get(personId);
    if (!member || !member.chaId) return [];

    const father = this.memberMap.get(member.chaId);
    if (!father) return [];

    const result: ThanhVien[] = [];
    if (father.chaId) result.push(this.memberMap.get(father.chaId)!);
    if (father.meId) result.push(this.memberMap.get(father.meId)!);

    return result.filter(Boolean);
  }

  private getGrandparentsMaternal(personId: number): ThanhVien[] {
    const member = this.memberMap.get(personId);
    if (!member || !member.meId) return [];

    const mother = this.memberMap.get(member.meId);
    if (!mother) return [];

    const result: ThanhVien[] = [];
    if (mother.chaId) result.push(this.memberMap.get(mother.chaId)!);
    if (mother.meId) result.push(this.memberMap.get(mother.meId)!);

    return result.filter(Boolean);
  }

  /**
   * Tìm thành viên theo tên (fuzzy search)
   */
  findMemberByName(name: string): ThanhVien | null {
    const normalized = this.normalizeVietnamese(name.toLowerCase());

    // Tìm chính xác
    for (const member of this.memberMap.values()) {
      const memberName = this.normalizeVietnamese(member.hoTen?.toLowerCase() || "");
      if (memberName === normalized) {
        return member;
      }
    }

    // Tìm gần đúng
    for (const member of this.memberMap.values()) {
      const memberName = this.normalizeVietnamese(member.hoTen?.toLowerCase() || "");
      if (memberName.includes(normalized) || normalized.includes(memberName)) {
        return member;
      }
    }

    return null;
  }

  private normalizeVietnamese(str: string): string {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  }

  getMember(id: number): ThanhVien | null {
    return this.memberMap.get(id) || null;
  }

  getAllMembers(): ThanhVien[] {
    return Array.from(this.memberMap.values());
  }
}
