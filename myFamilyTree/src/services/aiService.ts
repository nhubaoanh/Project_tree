import { injectable } from "tsyringe";
import { GoogleGenAI } from "@google/genai";
import { thanhVienRespository } from "../repositories/thanhVienRespository";

@injectable()
export class AIService {
  private ai: GoogleGenAI;

  constructor(private thanhVienRepo: thanhVienRespository) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY chưa được cấu hình trong .env");
    }
    this.ai = new GoogleGenAI({ apiKey });
  }

  async chat(message: string, dongHoId?: string): Promise<string> {
    try {
      // Lấy dữ liệu thành viên từ database
      const members = await this.getMembersForAI();
      
      // Tạo system prompt với context gia phả
      const systemPrompt = this.buildSystemPrompt(members);
      
      // Gọi Gemini API với @google/genai mới
      const response = await this.ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [
          { role: "user", parts: [{ text: systemPrompt + "\n\nCâu hỏi: " + message }] }
        ],
      });

      return response.text || "Xin lỗi, tôi không thể trả lời lúc này.";
    } catch (error: any) {
      console.error("Gemini API error:", error);
      
      if (error.message?.includes("429") || error.message?.includes("quota")) {
        throw new Error("API đã hết quota. Vui lòng thử lại sau.");
      }
      
      throw new Error("Lỗi khi kết nối với AI: " + error.message);
    }
  }

  // Lấy dữ liệu thành viên từ database
  private async getMembersForAI(): Promise<any[]> {
    try {
      const result = await this.thanhVienRepo.getAllThanhVien();
      const members = result?.[0] || result || [];
      
      // Map sang format đơn giản cho AI
      return members.map((m: any) => ({
        id: m.thanhVienId,
        hoTen: m.hoTen,
        gioiTinh: m.gioiTinh === 1 ? "Nam" : "Nữ",
        ngaySinh: m.ngaySinh,
        ngayMat: m.ngayMat,
        noiSinh: m.noiSinh,
        ngheNghiep: m.ngheNghiep,
        doiThuoc: m.doiThuoc,
        chaId: m.chaId,
        meId: m.meId,
        voChongId: m.voId || m.chongId,
      }));
    } catch (error) {
      console.error("Error fetching members for AI:", error);
      return [];
    }
  }

  private buildSystemPrompt(members: any[]): string {
    const memberData = JSON.stringify(members);
    
    return `Bạn là một chuyên gia gia phả của dòng họ.
Nhiệm vụ của bạn là trả lời câu hỏi của thành viên dựa trên dữ liệu JSON sau đây:
${memberData}

Giải thích các trường dữ liệu:
- id: Mã thành viên
- hoTen: Họ và tên
- gioiTinh: Nam hoặc Nữ
- ngaySinh, ngayMat: Ngày sinh, ngày mất
- doiThuoc: Đời thứ mấy trong gia phả (1 là ông tổ)
- chaId: ID của cha
- meId: ID của mẹ
- voChongId: ID của vợ/chồng

Quy tắc:
1. Chỉ trả lời dựa trên dữ liệu được cung cấp.
2. Nếu người dùng hỏi về quan hệ (con ai, bố ai), hãy tra cứu chaId, meId.
3. Để tìm con của ai, tìm các thành viên có chaId hoặc meId = id của người đó.
4. Luôn xưng hô lịch sự, tôn trọng.
5. Nếu không tìm thấy thông tin, hãy nói rõ là không có trong dữ liệu.
6. Trả lời ngắn gọn, súc tích bằng tiếng Việt.`;
  }
}
