import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Recipe, DayPlan, BabyProfile, MealType } from './types';
import { RECIPES } from './constants';
import { startOfWeek, addDays, format, isSameDay } from 'date-fns';

interface State {
  baby: BabyProfile;
  weeklyPlan: DayPlan[];
  savedRecipes: string[];
  recipes: Recipe[];
}

type Action = 
  | { type: 'ADD_TO_MEAL_PLAN'; payload: { date: Date; mealType: MealType; recipe: Recipe } }
  | { type: 'REMOVE_FROM_MEAL_PLAN'; payload: { date: Date; mealType: MealType } }
  | { type: 'TOGGLE_MEAL_COMPLETION'; payload: { date: Date; mealType: MealType } }
  | { type: 'UPDATE_MEAL_TIME'; payload: { date: Date; mealType: MealType; time: string } }
  | { type: 'TOGGLE_FAVORITE'; payload: { recipeId: string } }
  | { type: 'ADD_RECIPE'; payload: { recipe: Recipe } };

// Initialize current week with empty slots
const today = new Date();
const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 }); // Monday start

const DEFAULT_TIMES: Record<MealType, string> = {
  Breakfast: '08:00',
  Lunch: '12:00',
  Dinner: '17:30',
  Snack: '10:00'
};

const initialWeek: DayPlan[] = Array.from({ length: 7 }).map((_, i) => ({
  date: addDays(startOfCurrentWeek, i),
  meals: {
    Breakfast: { time: DEFAULT_TIMES.Breakfast, isCompleted: false, recipe: undefined },
    Lunch: { time: DEFAULT_TIMES.Lunch, isCompleted: false, recipe: i === 0 ? RECIPES[0] : undefined },
    Dinner: { time: DEFAULT_TIMES.Dinner, isCompleted: false, recipe: i === 1 ? RECIPES[4] : undefined },
    Snack: { time: DEFAULT_TIMES.Snack, isCompleted: false, recipe: undefined },
  }
}));

const initialState: State = {
  baby: {
    name: "Leo",
    monthsOld: 7
  },
  weeklyPlan: initialWeek,
  savedRecipes: [],
  recipes: RECIPES,
};

const StoreContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD_TO_MEAL_PLAN': {
      const { date, mealType, recipe } = action.payload;
      return {
        ...state,
        weeklyPlan: state.weeklyPlan.map(day => {
          if (isSameDay(day.date, date)) {
            return {
              ...day,
              meals: { 
                ...day.meals, 
                [mealType]: {
                  ...day.meals[mealType],
                  recipe: recipe
                }
              }
            };
          }
          return day;
        })
      };
    }
    case 'REMOVE_FROM_MEAL_PLAN': {
      const { date, mealType } = action.payload;
      return {
        ...state,
        weeklyPlan: state.weeklyPlan.map(day => {
          if (isSameDay(day.date, date)) {
            return {
              ...day,
              meals: { 
                ...day.meals, 
                [mealType]: {
                  ...day.meals[mealType],
                  recipe: undefined
                }
              }
            };
          }
          return day;
        })
      };
    }
    case 'TOGGLE_MEAL_COMPLETION': {
      const { date, mealType } = action.payload;
      return {
        ...state,
        weeklyPlan: state.weeklyPlan.map(day => {
          if (isSameDay(day.date, date)) {
            return {
              ...day,
              meals: { 
                ...day.meals, 
                [mealType]: {
                  ...day.meals[mealType],
                  isCompleted: !day.meals[mealType].isCompleted
                }
              }
            };
          }
          return day;
        })
      };
    }
    case 'UPDATE_MEAL_TIME': {
      const { date, mealType, time } = action.payload;
      return {
        ...state,
        weeklyPlan: state.weeklyPlan.map(day => {
          if (isSameDay(day.date, date)) {
            return {
              ...day,
              meals: { 
                ...day.meals, 
                [mealType]: {
                  ...day.meals[mealType],
                  time: time
                }
              }
            };
          }
          return day;
        })
      };
    }
    case 'TOGGLE_FAVORITE': {
      const { recipeId } = action.payload;
      const isSaved = state.savedRecipes.includes(recipeId);
      return {
        ...state,
        savedRecipes: isSaved 
          ? state.savedRecipes.filter(id => id !== recipeId)
          : [...state.savedRecipes, recipeId]
      };
    }
    case 'ADD_RECIPE': {
      return {
        ...state,
        recipes: [...state.recipes, action.payload.recipe]
      };
    }
    default:
      return state;
  }
}

export const StoreProvider = ({ children }: { children?: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};