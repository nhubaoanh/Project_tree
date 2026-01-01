// Service gọi các AI Provider (Groq, Gemini, etc.)

export class AIProviderService {
  // Gọi AI với fallback
  static async callAI(prompt: string): Promise<string> {
    // Thử Groq trước
    const groqKey = process.env.GROQ_API_KEY;
    if (groqKey) {
      const result = await this.callGroq(prompt, groqKey);
      if (result) return result;
    }

    // Fallback sang Gemini
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      const result = await this.callGemini(prompt, geminiKey);
      if (result) return result;
    }

    return "Xin lỗi, hệ thống AI đang bảo trì. Vui lòng thử lại sau!";
  }

  // Groq API (miễn phí, nhanh)
  private static async callGroq(prompt: string, apiKey: string): Promise<string | null> {
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 1024,
        }),
      });

      if (!response.ok) {
        console.error("[AI Provider] Groq error:", response.status);
        return null;
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content?.trim() || null;
    } catch (err: any) {
      console.error("[AI Provider] Groq error:", err.message);
      return null;
    }
  }

  // Gemini API
  private static async callGemini(prompt: string, apiKey: string): Promise<string | null> {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
        }),
      });

      if (!response.ok) {
        console.error("[AI Provider] Gemini error:", response.status);
        return null;
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;
    } catch (err: any) {
      console.error("[AI Provider] Gemini error:", err.message);
      return null;
    }
  }
}
