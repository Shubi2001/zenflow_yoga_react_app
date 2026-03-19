import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const getYogaAdvice = async (prompt: string, userContext?: any) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          text: `You are ZenFlow AI, a professional yoga and wellness assistant. 
          Your goal is to provide helpful, safe, and encouraging yoga advice.
          
          User Context: ${JSON.stringify(userContext || {})}
          
          User Question: ${prompt}
          
          Keep your responses concise, friendly, and formatted in Markdown. 
          If the user asks about a specific pose, explain its benefits and how to do it safely.
          If they ask for a routine, suggest a few poses from our library (Vinyasa, Hatha, etc.).`
        }
      ],
      config: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });

    return response.text;
  } catch (error) {
    console.error("AI Advice Error:", error);
    return "I'm sorry, I'm having trouble connecting to my yoga wisdom right now. Please try again in a moment.";
  }
};
