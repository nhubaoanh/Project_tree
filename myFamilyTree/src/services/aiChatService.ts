import { injectable } from "tsyringe";
import { thanhVienRespository } from "../repositories/thanhVienRespository";
import { dongHoResponsitory } from "../repositories/dongHoRespository";

interface ThanhVien {
  thanhVienId: number;
  dongHoId: string;
  hoTen: string;
  gioiTinh: number;
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

@injectable()
export class AIChatService {
  private cachedMembers: ThanhVien[] = [];
  private cachedDongHoId: string = "";
  private cacheTimestamp = 0;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 phút

  constructor(
    private thanhvienRepo: thanhVienRespository,
    private donghoRepo: dongHoResponsitory
  ) {}

  // Load dữ liệu theo dongHoId
  async loadData(dongHoId: string): Promise<void> {
    const now = Date.now();
    if (
      now - this.cacheTimestamp <= this.CACHE_DURATION &&
      this.cachedDongHoId === dongHoId &&
      this.cachedMembers.length > 0
    ) {
      console.log("[AI Chat] Sử dụng cache");
      return;
    }

    console.log(`[AI Chat] Load dữ liệu dòng họ: ${dongHoId}`);
    try {
      const members = await this.thanhvienRepo.getAllByDongHo(dongHoId);
      this.cachedMembers = Array.isArray(members) ? members : [];
      this.cachedDongHoId = dongHoId;
      this.cacheTimestamp = now;
      console.log(`[AI Chat] Đã cache: ${this.cachedMembers.length} thành viên`);
    } catch (error: any) {
      console.error("[AI Chat] Lỗi load dữ liệu:", error.message);
    }
  }

  // Tìm thành viên theo tên (fuzzy search)
  findMemberByName(name: string): ThanhVien | null {
    const normalizedName = this.normalizeVietnamese(name.toLowerCase());
    
    // Tìm chính xác trước
    let found = this.cachedMembers.find(m => 
      this.normalizeVietnamese(m.hoTen?.toLowerCase() || "") === normalizedName
    );
    if (found) return found;

    // Tìm gần đúng
    found = this.cachedMembers.find(m => 
      this.normalizeVietnamese(m.hoTen?.toLowerCase() || "").includes(normalizedName) ||
      normalizedName.includes(this.normalizeVietnamese(m.hoTen?.toLowerCase() || ""))
    );
    return found || null;
  }

  // Lấy thành viên theo ID
  getMemberById(id: number): ThanhVien | null {
    return this.cachedMembers.find(m => m.thanhVienId === id) || null;
  }

  // Lấy cha của một người
  getFather(member: ThanhVien): ThanhVien | null {
    if (!member.chaId) return null;
    return this.getMemberById(member.chaId);
  }

  // Lấy mẹ của một người
  getMother(member: ThanhVien): ThanhVien | null {
    if (!member.meId) return null;
    return this.getMemberById(member.meId);
  }

  // Lấy vợ/chồng
  getSpouse(member: ThanhVien): ThanhVien | null {
    if (member.gioiTinh === 1 && member.voId) {
      return this.getMemberById(member.voId);
    }
    if (member.gioiTinh === 0 && member.chongId) {
      return this.getMemberById(member.chongId);
    }
    return null;
  }

  // Lấy tất cả con
  getChildren(member: ThanhVien): ThanhVien[] {
    return this.cachedMembers.filter(m => 
      m.chaId === member.thanhVienId || m.meId === member.thanhVienId
    );
  }

  // Lấy anh chị em ruột
  getSiblings(member: ThanhVien): ThanhVien[] {
    return this.cachedMembers.filter(m => 
      m.thanhVienId !== member.thanhVienId &&
      ((member.chaId && m.chaId === member.chaId) || (member.meId && m.meId === member.meId))
    );
  }

  // Lấy ông bà nội
  getPaternalGrandparents(member: ThanhVien): { grandfather: ThanhVien | null; grandmother: ThanhVien | null } {
    const father = this.getFather(member);
    if (!father) return { grandfather: null, grandmother: null };
    return {
      grandfather: this.getFather(father),
      grandmother: this.getMother(father)
    };
  }

  // Lấy ông bà ngoại
  getMaternalGrandparents(member: ThanhVien): { grandfather: ThanhVien | null; grandmother: ThanhVien | null } {
    const mother = this.getMother(member);
    if (!mother) return { grandfather: null, grandmother: null };
    return {
      grandfather: this.getFather(mother),
      grandmother: this.getMother(mother)
    };
  }

  // Lấy chú bác (anh em của cha)
  getUnclesFromFather(member: ThanhVien): ThanhVien[] {
    const father = this.getFather(member);
    if (!father) return [];
    return this.getSiblings(father).filter(s => s.gioiTinh === 1);
  }

  // Lấy cô (chị em của cha)
  getAuntsFromFather(member: ThanhVien): ThanhVien[] {
    const father = this.getFather(member);
    if (!father) return [];
    return this.getSiblings(father).filter(s => s.gioiTinh === 0);
  }

  // Lấy cậu (anh em của mẹ)
  getUnclesFromMother(member: ThanhVien): ThanhVien[] {
    const mother = this.getMother(member);
    if (!mother) return [];
    return this.getSiblings(mother).filter(s => s.gioiTinh === 1);
  }

  // Lấy dì (chị em của mẹ)
  getAuntsFromMother(member: ThanhVien): ThanhVien[] {
    const mother = this.getMother(member);
    if (!mother) return [];
    return this.getSiblings(mother).filter(s => s.gioiTinh === 0);
  }

  // Lấy cháu (con của con)
  getGrandchildren(member: ThanhVien): ThanhVien[] {
    const children = this.getChildren(member);
    const grandchildren: ThanhVien[] = [];
    children.forEach(child => {
      grandchildren.push(...this.getChildren(child));
    });
    return grandchildren;
  }

  // Lấy thành viên theo đời
  getMembersByGeneration(generation: number): ThanhVien[] {
    return this.cachedMembers.filter(m => m.doiThuoc === generation);
  }

  // Lấy tổ tiên (đời 1)
  getAncestors(): ThanhVien[] {
    return this.getMembersByGeneration(1);
  }

  // Phân tích câu hỏi và trả lời
  analyzeQuestion(message: string): string {
    const lowerMsg = message.toLowerCase();
    const normalizedMsg = this.normalizeVietnamese(lowerMsg);

    // Trích xuất tên từ câu hỏi - cải thiện pattern matching
    const namePatterns = [
      // Pattern cho câu hỏi phức tạp: "Nguyễn Văn Quyết đời thứ 8 con của ai..."
      /^([a-zA-ZÀ-ỹ\s]+?)(?:\s+đời\s*(?:thứ)?\s*\d+)?\s+(?:con của ai|là con ai|cha mẹ|vợ|chồng|có mấy con|có bao nhiêu con)/i,
      // Pattern cơ bản
      /(?:của|cua)\s+(.+?)(?:\s+là|\s+la|\?|$)/i,
      /(.+?)\s+(?:là con|la con|là ai|la ai|có bao nhiêu|co bao nhieu)/i,
      /(?:ai là|ai la)\s+(.+?)(?:\?|$)/i,
      /(?:ông|bà|cha|mẹ|con|cháu|chú|bác|cô|dì|cậu)\s+(.+?)(?:\s+là|\?|$)/i,
      // Pattern tìm tên ở đầu câu
      /^([a-zA-ZÀ-ỹ\s]{2,30})\s+(?:đời|doi|con|cha|me|vo|chong|la)/i,
    ];

    let extractedName = "";
    for (const pattern of namePatterns) {
      const match = message.match(pattern);
      if (match && match[1]) {
        extractedName = match[1].trim();
        // Loại bỏ các từ không phải tên
        extractedName = extractedName.replace(/^(ông|bà|anh|chị|em|cô|chú|bác|dì|cậu)\s+/i, '');
        break;
      }
    }

    // Xử lý các loại câu hỏi chung
    if (normalizedMsg.includes("tat ca thanh vien") || normalizedMsg.includes("liet ke") || normalizedMsg.includes("danh sach")) {
      return this.listAllMembers();
    }

    if (normalizedMsg.includes("to tien") || normalizedMsg.includes("nguoi dau tien") || normalizedMsg.includes("doi 1")) {
      return this.describeAncestors();
    }

    // Hỏi về đời thứ mấy có bao nhiêu người
    if (normalizedMsg.match(/doi\s*(?:thu)?\s*\d+.*(?:co bao nhieu|bao nhieu nguoi|may nguoi)/)) {
      const genMatch = message.match(/đời\s*(?:thứ)?\s*(\d+)|doi\s*(?:thu)?\s*(\d+)/i);
      if (genMatch) {
        const gen = parseInt(genMatch[1] || genMatch[2]);
        return this.describeMembersByGeneration(gen);
      }
    }

    if (normalizedMsg.includes("doi thu") || normalizedMsg.match(/doi\s*\d+/)) {
      const genMatch = message.match(/đời\s*(?:thứ)?\s*(\d+)|doi\s*(?:thu)?\s*(\d+)/i);
      if (genMatch) {
        const gen = parseInt(genMatch[1] || genMatch[2]);
        return this.describeMembersByGeneration(gen);
      }
    }

    // Tìm thành viên được hỏi
    let member = extractedName ? this.findMemberByName(extractedName) : null;

    // Nếu không tìm thấy bằng pattern, thử tìm tên trong toàn bộ câu
    if (!member) {
      for (const m of this.cachedMembers) {
        const memberNameNorm = this.normalizeVietnamese(m.hoTen?.toLowerCase() || "");
        if (memberNameNorm && normalizedMsg.includes(memberNameNorm)) {
          member = m;
          break;
        }
      }
    }

    if (!member) {
      return `Xin lỗi, tôi không tìm thấy thông tin về "${extractedName || 'người này'}". Bạn có thể hỏi:\n- Liệt kê tất cả thành viên\n- Ai là tổ tiên?\n- [Tên] là con ai?\n- Con của [Tên] là ai?\n- [Tên] có vợ/chồng là ai?`;
    }

    // Kiểm tra xem câu hỏi có nhiều phần không (câu hỏi phức tạp)
    const isComplexQuestion = this.isComplexQuestion(normalizedMsg);
    
    if (isComplexQuestion) {
      return this.answerComplexQuestion(member, normalizedMsg);
    }

    return this.answerAboutMember(member, normalizedMsg);
  }

  // Kiểm tra câu hỏi phức tạp (hỏi nhiều thông tin cùng lúc)
  private isComplexQuestion(normalizedMsg: string): boolean {
    const keywords = ['con cua ai', 'la con ai', 'vo', 'chong', 'co may con', 'bao nhieu con', 'cha me'];
    let count = 0;
    for (const kw of keywords) {
      if (normalizedMsg.includes(kw)) count++;
    }
    return count >= 2;
  }

  // Trả lời câu hỏi phức tạp (nhiều thông tin)
  private answerComplexQuestion(member: ThanhVien, normalizedMsg: string): string {
    const name = member.hoTen;
    let answer = `📌 Thông tin về ${name}:\n\n`;

    // Thông tin cơ bản
    answer += `• Giới tính: ${member.gioiTinh === 1 ? 'Nam' : 'Nữ'}\n`;
    answer += `• Đời thứ: ${member.doiThuoc || 'Chưa rõ'}\n\n`;

    // Cha mẹ
    if (normalizedMsg.includes('con cua ai') || normalizedMsg.includes('la con ai') || normalizedMsg.includes('cha') || normalizedMsg.includes('me')) {
      const father = this.getFather(member);
      const mother = this.getMother(member);
      answer += `👨‍👩‍👧 Cha mẹ:\n`;
      answer += father ? `  - Cha: ${father.hoTen}\n` : `  - Cha: Không có thông tin\n`;
      answer += mother ? `  - Mẹ: ${mother.hoTen}\n` : `  - Mẹ: Không có thông tin\n`;
      answer += '\n';
    }

    // Vợ/chồng
    if (normalizedMsg.includes('vo') || normalizedMsg.includes('chong')) {
      const spouse = this.getSpouse(member);
      if (spouse) {
        answer += `💑 ${member.gioiTinh === 1 ? 'Vợ' : 'Chồng'}: ${spouse.hoTen}\n\n`;
      } else {
        answer += `💑 ${member.gioiTinh === 1 ? 'Vợ' : 'Chồng'}: Chưa có thông tin\n\n`;
      }
    }

    // Con cái
    if (normalizedMsg.includes('con') || normalizedMsg.includes('may con') || normalizedMsg.includes('bao nhieu con')) {
      const children = this.getChildren(member);
      if (children.length > 0) {
        answer += `👶 Con cái (${children.length} người):\n`;
        children.forEach(c => {
          answer += `  - ${c.hoTen} (${c.gioiTinh === 1 ? 'Nam' : 'Nữ'})\n`;
        });
      } else {
        answer += `👶 Con cái: Chưa có thông tin\n`;
      }
    }

    return answer.trim();
  }

  // Trả lời về một thành viên cụ thể
  private answerAboutMember(member: ThanhVien, normalizedMsg: string): string {
    const name = member.hoTen;

    // Hỏi về cha mẹ
    if (normalizedMsg.includes("la con ai") || normalizedMsg.includes("cha me") || normalizedMsg.includes("bo me")) {
      const father = this.getFather(member);
      const mother = this.getMother(member);
      let answer = `${name} là con của:\n`;
      answer += father ? `- Cha: ${father.hoTen}\n` : "- Cha: Không có thông tin\n";
      answer += mother ? `- Mẹ: ${mother.hoTen}` : "- Mẹ: Không có thông tin";
      return answer;
    }

    // Hỏi về con
    if (normalizedMsg.includes("con cua") || normalizedMsg.includes("co bao nhieu con") || normalizedMsg.includes("nhung nguoi con")) {
      const children = this.getChildren(member);
      if (children.length === 0) return `${name} chưa có thông tin về con cái.`;
      return `${name} có ${children.length} người con:\n${children.map(c => `- ${c.hoTen} (${c.gioiTinh === 1 ? 'Nam' : 'Nữ'})`).join('\n')}`;
    }

    // Hỏi về vợ/chồng
    if (normalizedMsg.includes("vo") || normalizedMsg.includes("chong") || normalizedMsg.includes("ket hon")) {
      const spouse = this.getSpouse(member);
      if (!spouse) return `${name} chưa có thông tin về vợ/chồng.`;
      return `${member.gioiTinh === 1 ? 'Vợ' : 'Chồng'} của ${name} là ${spouse.hoTen}.`;
    }

    // Hỏi về anh chị em
    if (normalizedMsg.includes("anh chi em") || normalizedMsg.includes("anh em")) {
      const siblings = this.getSiblings(member);
      if (siblings.length === 0) return `${name} không có anh chị em ruột trong hệ thống.`;
      return `Anh chị em của ${name}:\n${siblings.map(s => `- ${s.hoTen} (${s.gioiTinh === 1 ? 'Nam' : 'Nữ'})`).join('\n')}`;
    }

    // Hỏi về chú bác
    if (normalizedMsg.includes("chu") || normalizedMsg.includes("bac")) {
      const uncles = this.getUnclesFromFather(member);
      if (uncles.length === 0) return `${name} không có chú/bác (anh em trai của cha) trong hệ thống.`;
      return `Chú/Bác của ${name}:\n${uncles.map(u => `- ${u.hoTen}`).join('\n')}`;
    }

    // Hỏi về cô
    if (normalizedMsg.includes("co ") && !normalizedMsg.includes("co bao")) {
      const aunts = this.getAuntsFromFather(member);
      if (aunts.length === 0) return `${name} không có cô (chị em gái của cha) trong hệ thống.`;
      return `Cô của ${name}:\n${aunts.map(a => `- ${a.hoTen}`).join('\n')}`;
    }

    // Hỏi về cậu
    if (normalizedMsg.includes("cau")) {
      const uncles = this.getUnclesFromMother(member);
      if (uncles.length === 0) return `${name} không có cậu (anh em trai của mẹ) trong hệ thống.`;
      return `Cậu của ${name}:\n${uncles.map(u => `- ${u.hoTen}`).join('\n')}`;
    }

    // Hỏi về dì
    if (normalizedMsg.includes("di ")) {
      const aunts = this.getAuntsFromMother(member);
      if (aunts.length === 0) return `${name} không có dì (chị em gái của mẹ) trong hệ thống.`;
      return `Dì của ${name}:\n${aunts.map(a => `- ${a.hoTen}`).join('\n')}`;
    }

    // Hỏi về ông bà
    if (normalizedMsg.includes("ong ba") || normalizedMsg.includes("ong noi") || normalizedMsg.includes("ba noi")) {
      const { grandfather, grandmother } = this.getPaternalGrandparents(member);
      let answer = `Ông bà nội của ${name}:\n`;
      answer += grandfather ? `- Ông nội: ${grandfather.hoTen}\n` : "- Ông nội: Không có thông tin\n";
      answer += grandmother ? `- Bà nội: ${grandmother.hoTen}` : "- Bà nội: Không có thông tin";
      return answer;
    }

    if (normalizedMsg.includes("ong ngoai") || normalizedMsg.includes("ba ngoai")) {
      const { grandfather, grandmother } = this.getMaternalGrandparents(member);
      let answer = `Ông bà ngoại của ${name}:\n`;
      answer += grandfather ? `- Ông ngoại: ${grandfather.hoTen}\n` : "- Ông ngoại: Không có thông tin\n";
      answer += grandmother ? `- Bà ngoại: ${grandmother.hoTen}` : "- Bà ngoại: Không có thông tin";
      return answer;
    }

    // Hỏi về cháu
    if (normalizedMsg.includes("chau") && !normalizedMsg.includes("chau noi") && !normalizedMsg.includes("chau ngoai")) {
      const grandchildren = this.getGrandchildren(member);
      if (grandchildren.length === 0) return `${name} chưa có cháu trong hệ thống.`;
      return `Cháu của ${name} (${grandchildren.length} người):\n${grandchildren.map(g => `- ${g.hoTen}`).join('\n')}`;
    }

    // Mặc định: thông tin tổng quan
    return this.describeMember(member);
  }

  // Mô tả thông tin một thành viên
  private describeMember(member: ThanhVien): string {
    const father = this.getFather(member);
    const mother = this.getMother(member);
    const spouse = this.getSpouse(member);
    const children = this.getChildren(member);

    let info = `📌 ${member.hoTen}\n`;
    info += `- Giới tính: ${member.gioiTinh === 1 ? 'Nam' : 'Nữ'}\n`;
    info += `- Đời thứ: ${member.doiThuoc || 'Chưa rõ'}\n`;
    if (father) info += `- Cha: ${father.hoTen}\n`;
    if (mother) info += `- Mẹ: ${mother.hoTen}\n`;
    if (spouse) info += `- ${member.gioiTinh === 1 ? 'Vợ' : 'Chồng'}: ${spouse.hoTen}\n`;
    if (children.length > 0) info += `- Con: ${children.map(c => c.hoTen).join(', ')}`;
    
    return info;
  }

  // Liệt kê tất cả thành viên
  private listAllMembers(): string {
    if (this.cachedMembers.length === 0) return "Chưa có thành viên nào trong dòng họ.";
    
    const byGen = new Map<number, ThanhVien[]>();
    this.cachedMembers.forEach(m => {
      const gen = m.doiThuoc || 0;
      if (!byGen.has(gen)) byGen.set(gen, []);
      byGen.get(gen)!.push(m);
    });

    let result = `Dòng họ có ${this.cachedMembers.length} thành viên:\n\n`;
    const sortedGens = [...byGen.keys()].sort((a, b) => a - b);
    
    for (const gen of sortedGens.slice(0, 5)) { // Chỉ hiện 5 đời đầu
      const members = byGen.get(gen)!;
      result += `📍 Đời ${gen} (${members.length} người):\n`;
      result += members.slice(0, 5).map(m => `  - ${m.hoTen}`).join('\n');
      if (members.length > 5) result += `\n  ... và ${members.length - 5} người khác`;
      result += '\n\n';
    }

    return result.trim();
  }

  // Mô tả tổ tiên
  private describeAncestors(): string {
    const ancestors = this.getAncestors();
    if (ancestors.length === 0) return "Chưa có thông tin về tổ tiên (đời 1).";
    
    let result = `🏛️ Tổ tiên dòng họ (Đời 1):\n\n`;
    ancestors.forEach(a => {
      result += this.describeMember(a) + '\n\n';
    });
    return result.trim();
  }

  // Mô tả thành viên theo đời
  private describeMembersByGeneration(gen: number): string {
    const members = this.getMembersByGeneration(gen);
    if (members.length === 0) return `Không có thành viên nào thuộc đời ${gen}.`;
    
    let result = `📍 Đời ${gen} có ${members.length} thành viên:\n\n`;
    members.slice(0, 10).forEach(m => {
      result += `- ${m.hoTen} (${m.gioiTinh === 1 ? 'Nam' : 'Nữ'})\n`;
    });
    if (members.length > 10) result += `... và ${members.length - 10} người khác`;
    return result;
  }

  // Chuẩn hóa tiếng Việt (bỏ dấu)
  private normalizeVietnamese(str: string): string {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  }

  // Build prompt cho AI (khi cần AI hỗ trợ)
  buildPrompt(userMessage: string): string {
    // Thử trả lời trực tiếp trước
    const directAnswer = this.analyzeQuestion(userMessage);
    
    // Nếu có câu trả lời trực tiếp, không cần gọi AI
    if (!directAnswer.includes("Xin lỗi")) {
      return `DIRECT_ANSWER:${directAnswer}`;
    }

    // Nếu không tìm được, build prompt cho AI
    const memberList = this.cachedMembers.slice(0, 50).map(m => {
      const father = this.getFather(m);
      const mother = this.getMother(m);
      return `${m.hoTen} (ID:${m.thanhVienId}, Đời:${m.doiThuoc}, ${m.gioiTinh === 1 ? 'Nam' : 'Nữ'}, Cha:${father?.hoTen || 'N/A'}, Mẹ:${mother?.hoTen || 'N/A'})`;
    }).join('\n');

    return `Bạn là trợ lý AI tra cứu gia phả. Trả lời ngắn gọn, chính xác.

DANH SÁCH THÀNH VIÊN:
${memberList}

CÂU HỎI: "${userMessage}"

QUY TẮC:
1. Chỉ trả lời dựa trên dữ liệu có sẵn
2. Nếu không tìm thấy, nói rõ
3. Trả lời bằng tiếng Việt
4. Không dùng emoji, markdown
5. Tối đa 200 từ

Trả lời:`;
  }

  getDebugInfo() {
    return {
      totalMembers: this.cachedMembers.length,
      dongHoId: this.cachedDongHoId,
    };
  }
}
