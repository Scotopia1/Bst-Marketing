import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY || '');

export const generateMarketingHeadline = async (product: string): Promise<string> => {
  if (!import.meta.env.VITE_API_KEY) {
    console.warn("API Key is missing. Returning mock data.");
    return `Warning: Your ${product} Strategy Is Burning Cash. Fix It Now.`;
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(
      `You are a world-class direct response copywriter like David Ogilvy or Gary Halbert. Write a short, punchy, controversial, or curiosity-inducing "Hook" (under 12 words) for an ad selling "${product}". The goal is to stop the scroll. Do not use quotes.`
    );

    return result.response.text() || "They laughed when I sat down, but then I started selling.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating hook. Please try again.";
  }
};