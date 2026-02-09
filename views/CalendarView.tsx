import React, { useState } from 'react';
import { useStore } from '../store';
import { format, isSameDay } from 'date-fns';
import { ShoppingCart, Calendar as CalendarIcon, CheckCircle2, Plus } from 'lucide-react';
import { RecipeCard } from '../components/RecipeCard';
import { Recipe, Ingredient, MealSlot, MealType } from '../types';

interface CalendarViewProps {
  onRecipeClick: (recipe: Recipe) => void;
  onNavigateToRecipes: () => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ onRecipeClick, onNavigateToRecipes }) => {
  const { state } = useStore();
  const [activeTab, setActiveTab] = useState<'Plan' | 'Shop'>('Plan');
  const mealTypes: MealType[] = ['Breakfast', 'Lunch', 'Snack', 'Dinner'];

  // Logic for shopping list aggregation
  const shoppingList = React.useMemo(() => {
    const list: Record<string, Ingredient[]> = {
      'Produce': [],
      'Dairy': [],
      'Protein': [],
      'Pantry': [],
      'Other': []
    };

    state.weeklyPlan.forEach(day => {
      (Object.values(day.meals) as MealSlot[]).forEach((slot) => {
        if (slot.recipe) {
          slot.recipe.ingredients.forEach(ing => {
            if (list[ing.category]) {
              list[ing.category].push(ing);
            } else {
              list['Other'].push(ing);
            }
          });
        }
      });
    });
    return list;
  }, [state.weeklyPlan]);

  return (
    <div className="pb-28 pt-4 px-4 h-full flex flex-col animate-in fade-in duration-500">
      
      {/* Header & Toggle */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="font-serif text-3xl text-stone-900">Weekly Plan</h1>
        <div className="bg-stone-100 p-1 rounded-lg flex">
          <button
            onClick={() => setActiveTab('Plan')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'Plan' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'}`}
          >
            <CalendarIcon size={16} />
          </button>
          <button
            onClick={() => setActiveTab('Shop')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'Shop' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'}`}
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>

      {activeTab === 'Plan' ? (
        <div className="space-y-8">
          {state.weeklyPlan.map((day, idx) => {
            const isToday = isSameDay(day.date, new Date());
            
            return (
              <div key={idx} className={`relative ${isToday ? 'bg-sage-50/50 -mx-4 px-4 py-6 border-y border-sage-100' : ''}`}>
                <div className="flex items-baseline gap-2 mb-4">
                  <h3 className={`font-serif text-xl ${isToday ? 'text-sage-800' : 'text-stone-800'}`}>
                    {format(day.date, 'EEEE')}
                  </h3>
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-wide">
                    {format(day.date, 'MMM d')}
                  </span>
                  {isToday && <span className="ml-auto text-xs font-semibold text-sage-600 bg-sage-100 px-2 py-0.5 rounded-full">Today</span>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {mealTypes.map((type) => {
                    const slot = day.meals[type];
                    return (
                      <div key={type} className="flex flex-col gap-1.5">
                        <div className="flex justify-between items-end px-1">
                           <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">{type}</span>
                        </div>
                        
                        {slot.recipe ? (
                          <RecipeCard 
                            recipe={slot.recipe} 
                            onClick={onRecipeClick} 
                            compact 
                            hideMealType 
                          />
                        ) : (
                          <button 
                            onClick={onNavigateToRecipes}
                            className="w-full h-24 border-2 border-dashed border-stone-200 bg-white/50 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-white hover:border-sage-300 transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-full bg-stone-50 group-hover:bg-sage-100 flex items-center justify-center text-stone-400 group-hover:text-sage-600 transition-colors">
                              <Plus size={16} />
                            </div>
                            <span className="text-[10px] font-medium text-stone-400 group-hover:text-sage-600">Add</span>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-terracotta-50 p-4 rounded-xl mb-4">
             <p className="text-terracotta-800 text-sm font-medium">
               Items are organized by category to help you breeze through the aisles!
             </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(shoppingList).map(([category, ingredients]) => {
              if ((ingredients as Ingredient[]).length === 0) return null;
              
              const getColors = (cat: string) => {
                switch(cat) {
                  case 'Produce': return 'bg-emerald-50 border-emerald-100 text-emerald-800';
                  case 'Dairy': return 'bg-blue-50 border-blue-100 text-blue-800';
                  case 'Pantry': return 'bg-orange-50 border-orange-100 text-orange-800';
                  case 'Protein': return 'bg-rose-50 border-rose-100 text-rose-800';
                  default: return 'bg-stone-50 border-stone-100 text-stone-800';
                }
              };

              return (
                <div key={category} className={`p-4 rounded-2xl border ${getColors(category)}`}>
                  <h3 className="font-serif text-lg mb-3 opacity-90">{category}</h3>
                  <ul className="space-y-2">
                    {(ingredients as Ingredient[]).map((ing, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm opacity-80 group cursor-pointer">
                        <CheckCircle2 size={16} className="shrink-0 mt-0.5 group-hover:opacity-100 opacity-40 transition-opacity" />
                        <span className="leading-tight">
                          <span className="font-semibold">{ing.amount}</span> {ing.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          
          {Object.values(shoppingList).every((l: Ingredient[]) => l.length === 0) && (
            <div className="text-center py-12 text-stone-400">
              <ShoppingCart size={48} className="mx-auto mb-4 opacity-20" />
              <p>Your list is empty.</p>
              <p className="text-sm">Add meals to your calendar to populate it!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};