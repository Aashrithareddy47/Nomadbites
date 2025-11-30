export interface SearchFilters {
  food: string;
  location: string;
  budget: 'Low' | 'Medium' | 'High';
  mealType: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snacks';
  diningStyle: 'Solo' | 'Friends' | 'Family';
  dietary: 'Vegetarian' | 'Vegan' | 'Jain' | 'Gluten-Free' | 'Non-Veg';
  stateCuisine: string;
}

export interface Restaurant {
  name: string;
  address: string;
  price: string;
  highlight: string;
}

export interface FoodTrail {
  breakfast: string;
  lunch: string;
  dinner: string;
}

export interface AIResponse {
  foodItem: string;
  location: string;
  budget: string;
  dietaryFilter: string;
  restaurants: Restaurant[];
  reviewSummary: string[];
  cuisineOrigin: string;
  foodTrail?: FoodTrail;
}
