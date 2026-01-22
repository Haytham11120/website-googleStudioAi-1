import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";
import { MOCK_PRODUCTS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = "gemini-3-flash-preview";

// 1. Semantic Search Logic
export const searchProductsWithAI = async (query: string, allProducts: Product[]): Promise<string[]> => {
  try {
    // Simplify product list to save tokens, only sending necessary fields for matching
    const inventorySummary = allProducts.map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      tags: p.tags.join(", "),
      category: p.category
    }));

    const prompt = `
      You are a smart shopping assistant.
      The user is searching for: "${query}".
      
      Here is our inventory:
      ${JSON.stringify(inventorySummary)}
      
      Return a JSON object with a single property "productIds" which is an array of strings.
      Include only the IDs of products that match the user's intent.
      If the user asks for "something for a wedding", find formal or elegant items.
      If nothing matches, return an empty array.
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                productIds: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                }
            }
        }
      }
    });

    const jsonStr = response.text || "{}";
    const result = JSON.parse(jsonStr);
    return result.productIds || [];
  } catch (error) {
    console.error("AI Search Error:", error);
    return [];
  }
};

// 2. Chat/Stylist Logic
export const generateStylistResponse = async (history: {role: string, parts: {text: string}[]}[], userMessage: string): Promise<string> => {
    try {
        const systemInstruction = `
        You are "Luna", a high-end AI fashion stylist for Lumina Fashion.
        Your tone is chic, helpful, and knowledgeable about fashion trends.
        
        You have access to this general inventory context (do not list these unless asked specifically):
        We sell clothes for Men, Women, Kids, and Accessories.
        
        If the user asks for specific product recommendations, answer generally about styles, colors, and combinations, 
        and suggest they use the main search bar for specific items in our catalog.
        
        Keep responses concise (under 80 words) and conversational.
        `;

        const chat = ai.chats.create({
            model: MODEL_NAME,
            config: {
                systemInstruction: systemInstruction
            },
            history: history
        });

        const result = await chat.sendMessage({ message: userMessage });
        return result.text || "I'm having a moment of fashion indecision. Could you rephrase that?";
    } catch (e) {
        console.error("Chat Error", e);
        return "I'm having trouble connecting to the fashion mainframe right now.";
    }
}
