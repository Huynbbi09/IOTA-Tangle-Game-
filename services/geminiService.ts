import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY; // Ensure this is set in your environment
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const getGameCommentary = async (won: boolean, guess: number, actual: number): Promise<string> => {
  if (!ai) return "Kết nối AI chưa sẵn sàng.";

  try {
    const prompt = `
      Người chơi vừa chơi trò đoán số trên Blockchain.
      Dự đoán: ${guess}.
      Kết quả thực tế: ${actual}.
      Trạng thái: ${won ? "Thắng" : "Thua"}.
      
      Hãy đưa ra một câu bình luận ngắn gọn (dưới 20 từ), hài hước hoặc châm biếm bằng tiếng Việt về kết quả này.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Gemini API error:", error);
    return won ? "Thắng lớn! Chúc mừng bạn." : "Vận may chưa đến, thử lại nhé!";
  }
};
