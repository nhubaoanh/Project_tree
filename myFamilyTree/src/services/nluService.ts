/**
 * NLU Service - Natural Language Understanding
 * Parse câu hỏi tự nhiên → Structured intent
 */

import { OllamaService } from "./ollamaService";

export type IntentType = "find_relative" | "list_members" | "count" | "complex_query";

export interface Intent {
  type: IntentType;
  person?: string;
  relation?: string;
  filters?: {
    generation?: number;
    gender?: "M" | "F";
    alive?: boolean;
    childOrder?: number;
  };
  confidence?: number;
}

export class NLUService {
  private ollama: OllamaService;
  private intentCache = new Map<string, Intent>();

  constructor() {
    this.ollama = new OllamaService();
  }

  /**
   * Parse câu hỏi → Intent
   */
  async parseIntent(question: string, useCache = true): Promise<Intent> {
    // Check cache
    if (useCache && this.intentCache.has(question)) {
      console.log("[NLU] Cache hit");
      return this.intentCache.get(question)!;
    }

    try {
      // Thử dùng LLM
      const intent = await this.parseLLM(question);
      this.intentCache.set(question, intent);
      return intent;
    } catch (error) {
      console.warn("[NLU] LLM failed, using fallback");
      // Fallback: Regex
      return this.parseFallback(question);
    }
  }

  /**
   * Parse bằng LLM (Ollama)
   */
  private async parseLLM(question: string): Promise<Intent> {
    const prompt = this.buildPrompt(question);
    const response = await this.ollama.chat(prompt);
    const json = this.extractJSON(response);
    
    return {
      ...json,
      confidence: 0.9
    } as Intent;
  }

  /**
   * Build prompt cho Ollama
   */
  private buildPrompt(question: string): string {
    return `Bạn là NLU parser cho hệ thống gia phả. Phân tích câu hỏi và trả về JSON.

RELATION TYPES:
- father, mother, parents (cha, mẹ, cha mẹ)
- children (con)
- siblings (anh chị em ruột)
- spouse (vợ/chồng)
- paternal_grandfather, paternal_grandmother (ông nội, bà nội)
- maternal_grandfather, maternal_grandmother (ông ngoại, bà ngoại)
- paternal_uncle, paternal_aunt (chú/bác, cô)
- maternal_uncle, maternal_aunt (cậu, dì)

OUTPUT FORMAT:
{
  "type": "find_relative" | "list_members" | "count",
  "person": "tên người (nếu có)",
  "relation": "loại quan hệ (nếu có)",
  "filters": {
    "generation": số đời (nếu có),
    "gender": "M" hoặc "F" (nếu có),
    "childOrder": thứ tự con (nếu có)
  }
}

EXAMPLES:

Q: "Nguyễn Văn A là con ai?"
A: {"type":"find_relative","person":"Nguyễn Văn A","relation":"parents"}

Q: "Ông nội của Trần Thị B"
A: {"type":"find_relative","person":"Trần Thị B","relation":"paternal_grandfather"}

Q: "Con trai của Lê Văn C"
A: {"type":"find_relative","person":"Lê Văn C","relation":"children","filters":{"gender":"M"}}

Q: "Liệt kê thành viên đời 3"
A: {"type":"list_members","filters":{"generation":3}}

Q: "Có bao nhiêu người đời 2?"
A: {"type":"count","filters":{"generation":2}}

QUESTION: "${question}"

Chỉ trả về JSON, không giải thích:`;
  }

  /**
   * Extract JSON từ response
   */
  private extractJSON(text: string): any {
    // Tìm JSON trong text
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch (error) {
        throw new Error("Invalid JSON");
      }
    }
    throw new Error("No JSON found");
  }

  /**
   * Fallback: Parse bằng regex
   */
  private parseFallback(question: string): Intent {
    const normalized = this.normalize(question);

    // Detect type
    if (normalized.includes("co bao nhieu") || normalized.includes("dem")) {
      return this.parseCount(question, normalized);
    }

    if (normalized.includes("liet ke") || normalized.includes("danh sach")) {
      return this.parseList(question, normalized);
    }

    // Default: find_relative
    return this.parseFindRelative(question, normalized);
  }

  private parseCount(question: string, normalized: string): Intent {
    const intent: Intent = { type: "count", confidence: 0.7 };

    // Extract generation
    const genMatch = question.match(/đời\s*(?:thứ)?\s*(\d+)|doi\s*(?:thu)?\s*(\d+)/i);
    if (genMatch) {
      intent.filters = { generation: parseInt(genMatch[1] || genMatch[2]) };
    }

    return intent;
  }

  private parseList(question: string, normalized: string): Intent {
    const intent: Intent = { type: "list_members", confidence: 0.7 };

    // Extract generation
    const genMatch = question.match(/đời\s*(?:thứ)?\s*(\d+)|doi\s*(?:thu)?\s*(\d+)/i);
    if (genMatch) {
      intent.filters = { generation: parseInt(genMatch[1] || genMatch[2]) };
    }

    // Extract gender
    if (normalized.includes("con trai") || normalized.includes("nam")) {
      intent.filters = { ...intent.filters, gender: "M" };
    }
    if (normalized.includes("con gai") || normalized.includes("nu")) {
      intent.filters = { ...intent.filters, gender: "F" };
    }

    return intent;
  }

  private parseFindRelative(question: string, normalized: string): Intent {
    const intent: Intent = { 
      type: "find_relative", 
      confidence: 0.6 
    };

    // Extract person name
    intent.person = this.extractName(question);

    // Detect relation
    if (normalized.includes("la con ai") || normalized.includes("cha me")) {
      intent.relation = "parents";
    } else if (normalized.includes("con cua") || normalized.includes("co may con")) {
      intent.relation = "children";
    } else if (normalized.includes("vo") || normalized.includes("chong")) {
      intent.relation = "spouse";
    } else if (normalized.includes("anh chi em")) {
      intent.relation = "siblings";
    } else if (normalized.includes("ong noi")) {
      intent.relation = "paternal_grandfather";
    } else if (normalized.includes("ba noi")) {
      intent.relation = "paternal_grandmother";
    } else if (normalized.includes("ong ngoai")) {
      intent.relation = "maternal_grandfather";
    } else if (normalized.includes("ba ngoai")) {
      intent.relation = "maternal_grandmother";
    }

    // Extract gender filter
    if (normalized.includes("con trai")) {
      intent.filters = { gender: "M" };
    } else if (normalized.includes("con gai")) {
      intent.filters = { gender: "F" };
    }

    return intent;
  }

  /**
   * Extract name từ câu hỏi
   */
  private extractName(question: string): string | undefined {
    const patterns = [
      /^([a-zA-ZÀ-ỹ\s]+?)(?:\s+đời)?\s+(?:là con ai|con của ai|có vợ|có chồng|có mấy con)/i,
      /(?:của|cua)\s+([a-zA-ZÀ-ỹ\s]+?)(?:\s+là|\?|$)/i,
      /^([a-zA-ZÀ-ỹ\s]{2,30})\s+(?:con|cha|me|vo|chong|la)/i,
    ];

    for (const pattern of patterns) {
      const match = question.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }

    return undefined;
  }

  /**
   * Normalize Vietnamese
   */
  private normalize(str: string): string {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.intentCache.clear();
  }
}
