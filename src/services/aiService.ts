import { GoogleGenAI } from "@google/genai";

export const getYogaAdvice = async (prompt: string, userContext?: any) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY || '';
    if (!apiKey) {
      console.error("GEMINI_API_KEY is missing in environment variables.");
      return "I'm sorry, my AI wisdom is currently unavailable because the API key is missing. Please check your settings.";
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User Context: ${JSON.stringify(userContext || {})}
          
          User Question: ${prompt}`,
      config: {
        systemInstruction: `You are ZenFlow AI, a professional yoga and wellness assistant. 
          Your goal is to provide helpful, safe, and encouraging yoga advice.
          Keep your responses concise, friendly, and formatted in Markdown. 
          If the user asks about a specific pose, explain its benefits and how to do it safely.
          If they ask for a routine, suggest a few poses from our library (Vinyasa, Hatha, etc.).`,
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from Gemini API");
    }
    return text;
  } catch (error: any) {
    console.error("AI Advice Error:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    if (errorMessage.includes('quota')) {
      return "I've shared so much wisdom today that I've reached my limit! Please try again tomorrow.";
    }
    if (errorMessage.includes('API key not valid') || errorMessage.includes('invalid')) {
      return "There seems to be an issue with my API key. Please ensure it's correctly configured in the settings.";
    }
    return "I'm sorry, I'm having trouble connecting to my yoga wisdom right now. Please try again in a moment.";
  }
};
