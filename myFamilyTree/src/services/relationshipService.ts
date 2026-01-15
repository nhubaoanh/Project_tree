/**
 * Relationship Service - Tầng Relation Engine
 * Database → Graph → BFS → Relation Code
 */

import { injectable } from "tsyringe";
import { thanhVienRespository } from "../repositories/thanhVienRespository";
import { FamilyGraph, ThanhVien, RelationshipPath } from "../ultis/bfsGraph";

export interface RelationshipResult {
  success: boolean;
  data?: {
    person: ThanhVien;
    relatives: ThanhVien[];
    relationshipType: string;
    path?: RelationshipPath;
  };
  message?: string;
}

@injectable()
export class RelationshipService {
  private graphCache = new Map<string, { graph: FamilyGraph; timestamp: number }>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 phút

  constructor(private thanhvienRepo: thanhVienRespository) {}

  /**
   * Lấy graph (cache 5 phút)
   */
  private async getGraph(dongHoId: string): Promise<FamilyGraph> {
    const now = Date.now();
    const cached = this.graphCache.get(dongHoId);

    if (cached && now - cached.timestamp < this.CACHE_DURATION) {
      console.log(`[BFS] ✓ Cache hit`);
      return cached.graph;
    }

    console.log(`[BFS] ⟳ Loading...`);
    const members = await this.thanhvienRepo.getAllByDongHo(dongHoId);
    
    if (!Array.isArray(members) || members.length === 0) {
      throw new Error("Không có thành viên");
    }

    const graph = new FamilyGraph(members);
    this.graphCache.set(dongHoId, { graph, timestamp: now });
    console.log(`[BFS] ✓ Cached ${members.length} members`);

    return graph;
  }

  /**
   * Phân tích câu hỏi → Gọi BFS
   */
  async analyzeQuestion(dongHoId: string, question: string): Promise<RelationshipResult> {
    try {
      const graph = await this.getGraph(dongHoId);
      const normalized = this.normalize(question);

      // Trích xuất tên
      const name = this.extractName(question);
      if (!name) {
        return { success: false, message: "Không xác định được tên" };
      }

      const person = graph.findMemberByName(name);
      if (!person) {
        return { success: false, message: `Không tìm thấy: ${name}` };
      }

      // Xác định loại câu hỏi
      let relationType = "";
      let relatives: ThanhVien[] = [];

      if (normalized.includes("la con ai") || normalized.includes("cha me")) {
        relationType = "parents";
        relatives = graph.getRelatives(person.thanhVienId, "parents");
      } else if (normalized.includes("con cua") || normalized.includes("co may con")) {
        relationType = "children";
        relatives = graph.getRelatives(person.thanhVienId, "children");
      } else if (normalized.includes("vo") || normalized.includes("chong")) {
        relationType = "spouse";
        relatives = graph.getRelatives(person.thanhVienId, "spouse");
      } else if (normalized.includes("anh chi em")) {
        relationType = "siblings";
        relatives = graph.getRelatives(person.thanhVienId, "siblings");
      } else if (normalized.includes("ong ba noi")) {
        relationType = "grandparents_paternal";
        relatives = graph.getRelatives(person.thanhVienId, "grandparents_paternal");
      } else if (normalized.includes("ong ba ngoai")) {
        relationType = "grandparents_maternal";
        relatives = graph.getRelatives(person.thanhVienId, "grandparents_maternal");
      } else {
        relationType = "overview";
      }

      return {
        success: true,
        data: { person, relatives, relationshipType: relationType }
      };
    } catch (error: any) {
      return { success: false, message: error.message };
    }
  }

  private extractName(question: string): string | null {
    const patterns = [
      /^([a-zA-ZÀ-ỹ\s]+?)(?:\s+đời)?\s+(?:con của ai|là con ai|cha mẹ|vợ|chồng|có mấy con)/i,
      /^([a-zA-ZÀ-ỹ\s]{2,30})\s+(?:con|cha|me|vo|chong|la)/i,
    ];

    for (const pattern of patterns) {
      const match = question.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }

    return null;
  }

  private normalize(str: string): string {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .toLowerCase();
  }

  clearCache(dongHoId?: string): void {
    if (dongHoId) {
      this.graphCache.delete(dongHoId);
    } else {
      this.graphCache.clear();
    }
  }
}
