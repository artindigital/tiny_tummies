export type AgeGroup = '4-6 months' | '6-8 months' | '8-10 months' | '10-12 months' | '12-18 months' | '18-24 months' | '24+ months';

export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';

export interface Ingredient {
  name: string;
  amount: string;
  category: 'Produce' | 'Dairy' | 'Pantry' | 'Protein' | 'Other';
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  fullDescription: string; // The long form text
  imageUrl: string;
  ageGroups: AgeGroup[];
  mealType: MealType;
  ingredients: Ingredient[];
  prepTime: string;
  nutritionHighlight?: string;
}

export interface MealSlot {
  recipe?: Recipe;
  time: string;
  isCompleted: boolean;
}

export interface DayPlan {
  date: Date;
  meals: {
    Breakfast: MealSlot;
    Lunch: MealSlot;
    Dinner: MealSlot;
    Snack: MealSlot;
  };
}

export interface BabyProfile {
  name: string;
  monthsOld: number;
}

export interface Milestone {
  month: number;
  title: string;
  description: string;
  unlocked: boolean;
}

export interface DevelopmentStageInfo {
  title: string;
  foodsToTry: string[];
  foodsToAvoid: string[];
  skills: string[];
  tips: string;
}

export interface IngredientGuide {
  id: string;
  name: string;
  category: 'Produce' | 'Protein' | 'Grain' | 'Dairy' | 'Pantry';
  imageUrl: string;
  // Map simplified age ranges or use exact AgeGroup. 
  // Using AgeGroup for consistency.
  preparation: Partial<Record<AgeGroup, string>>; 
  chokingHazards: string;
  nutrition: string;
}