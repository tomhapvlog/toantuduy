
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from '../types';

// IMPORTANT: Do not expose the API key in the frontend.
// This is for demonstration purposes. In a real app, this logic
// should be on a backend server.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY is not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getDailyTip = async (): Promise<string> => {
  if (!API_KEY) return "Hãy nhớ ôn bài mỗi ngày để không quên kiến thức nhé!";
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: 'Hãy tạo một mẹo học toán tư duy ngắn gọn, vui vẻ và đầy cảm hứng cho học sinh lớp 1-5 bằng tiếng Việt.',
        config: {
            temperature: 0.8,
            maxOutputTokens: 100,
        }
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching daily tip:", error);
    return "Đừng sợ những bài toán khó, chúng giúp bộ não của bé khỏe mạnh hơn mỗi ngày!";
  }
};

export const getParentsTip = async (topics: string[]): Promise<string> => {
  if (!API_KEY) return "Cùng con học qua các trò chơi là một cách tuyệt vời để giúp con hứng thú hơn với môn toán.";
  const learnedTopics = topics.length > 0 ? topics.join(', ') : 'các chủ đề toán tư duy';
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Hãy đưa ra một gợi ý ngắn gọn cho phụ huynh Việt Nam để giúp con học tốt các chủ đề sau trong tuần này: ${learnedTopics}. Gợi ý cần thực tế và dễ áp dụng tại nhà.`,
        config: {
            temperature: 0.7,
            maxOutputTokens: 200,
        }
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching parents' tip:", error);
    return "Hãy kiên nhẫn và khuyến khích con, đừng quá tập trung vào điểm số. Quan trọng là con hiểu và yêu thích môn học.";
  }
};

export const getAiTeacherResponse = async (history: ChatMessage[]): Promise<string> => {
  if (!API_KEY) return "Thầy AI đang bận một chút, bé thử lại sau nhé!";
  try {
    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: 'Bạn là "Thầy AI", một giáo viên dạy toán tiểu học người Việt Nam, thân thiện và kiên nhẫn. Hãy trả lời các câu hỏi của học sinh một cách đơn giản, dễ hiểu, sử dụng ví dụ gần gũi và khuyến khích các em. Luôn trả lời bằng tiếng Việt.',
        },
        history,
    });
    const lastMessage = history[history.length - 1].parts[0].text;
    const result = await chat.sendMessage({ message: lastMessage });
    return result.text;
  } catch (error) {
    console.error("Error getting AI teacher response:", error);
    return "Ôi, thầy AI bị rối một chút rồi. Bé có thể hỏi câu khác đơn giản hơn không?";
  }
};
