import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Using Gemini 2.5 Flash for Maps Grounding support
const MODEL_NAME = "gemini-2.5-flash";

export const getHikeAdvice = async (
  query: string,
  locationContext: { lat: number; lng: number }
): Promise<string> => {
  if (!apiKey) {
    return "Demo Mode: API Key missing. Please configure your API Key to use AI features.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [
        {
          role: 'user',
          parts: [
            { text: `I am currently hiking the Dragon's Back to Cape D'Aguilar trail in Hong Kong. My current coordinates are approximately Lat: ${locationContext.lat}, Lng: ${locationContext.lng}.` },
            { text: query }
          ]
        }
      ],
      config: {
        systemInstruction: "You are HikePal's expert hiking guide. Keep answers concise, safety-focused, and helpful for a hiker on the move. Provide structured answers.",
        tools: [{ googleMaps: {} }],
        toolConfig: {
            retrievalConfig: {
                latLng: {
                    latitude: locationContext.lat,
                    longitude: locationContext.lng
                }
            }
        }
      }
    });

    return response.text || "I couldn't find specific information for that right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the hiking network (API Error).";
  }
};
