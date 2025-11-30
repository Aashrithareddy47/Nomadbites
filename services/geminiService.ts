import { GoogleGenAI, Type } from "@google/genai";
import { SearchFilters, AIResponse } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    foodItem: { type: Type.STRING, description: "The specific food item searched for." },
    location: { type: Type.STRING, description: "The location of the search." },
    budget: { type: Type.STRING, description: "The user's budget preference." },
    dietaryFilter: { type: Type.STRING, description: "The user's dietary preference." },
    restaurants: {
      type: Type.ARRAY,
      description: "A list of 3-5 recommended restaurants.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          address: { type: Type.STRING },
          price: { type: Type.STRING, description: "Price range, e.g., '$$', 'Low', 'High'." },
          highlight: { type: Type.STRING, description: "A standout feature or signature dish." },
        },
        required: ['name', 'address', 'price', 'highlight']
      },
    },
    reviewSummary: {
      type: Type.ARRAY,
      description: "A 3-bullet point summary of reviews covering taste, service, and hygiene.",
      items: { type: Type.STRING }
    },
    cuisineOrigin: {
      type: Type.STRING,
      description: "A brief note on the state or cultural origin of the cuisine."
    },
    foodTrail: {
      type: Type.OBJECT,
      description: "An optional one-day food trail plan for the user.",
      properties: {
        breakfast: { type: Type.STRING, description: "Breakfast recommendation." },
        lunch: { type: Type.STRING, description: "Lunch recommendation." },
        dinner: { type: Type.STRING, description: "Dinner recommendation." },
      },
      required: ['breakfast', 'lunch', 'dinner']
    }
  },
  required: ['foodItem', 'location', 'budget', 'dietaryFilter', 'restaurants', 'reviewSummary', 'cuisineOrigin']
};


export const getAIRecommendations = async (filters: SearchFilters): Promise<AIResponse> => {
  const { food, location, budget, mealType, diningStyle, dietary, stateCuisine } = filters;

  const prompt = `
    You are an expert food and travel guide named 'nomadbites'. 
    Your goal is to help a user discover authentic local cuisine and the best restaurants based on their preferences.
    Please provide recommendations for a user looking for '${food}' in '${location}'.

    User Preferences:
    - Budget: ${budget}
    - Meal Type: ${mealType}
    - Dining Style: ${diningStyle}
    - Dietary Needs: ${dietary}
    - Seeking cuisine from their home state: ${stateCuisine} (Prioritize dishes and restaurants related to this state's culinary traditions if available in the searched location).

    Based on these preferences, provide a detailed and structured recommendation.
    Ensure the response is in a valid JSON format that adheres to the provided schema.
    If a food trail is not applicable, provide general suggestions for each meal.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });
    
    const jsonText = response.text.trim();
    return JSON.parse(jsonText);

  } catch (error) {
    console.error("Error fetching AI recommendations:", error);
    throw new Error("Failed to get recommendations from AI service.");
  }
};