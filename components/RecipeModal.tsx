import React, { useState } from 'react';
import { Recipe, MealType } from '../types';
import { useStore } from '../store';
import { X, CalendarPlus, ChevronRight, Check } from 'lucide-react';
import { format, addDays, startOfToday } from 'date-fns';

interface RecipeModalProps {
  recipe: Recipe;
  onClose: () => void;
}

export const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, onClose }) => {
  const { dispatch } = useStore();
  const [isPlanning, setIsPlanning] = useState(false);
  const [selectedDayOffset, setSelectedDayOffset] = useState(0);
  const [selectedMealType, setSelectedMealType] = useState<MealType>('Lunch');

  const handleAddToPlan = () => {
    const targetDate = addDays(startOfToday(), selectedDayOffset);
    dispatch({
      type: 'ADD_TO_MEAL_PLAN',
      payload: {
        date: targetDate,
        mealType: selectedMealType,
        recipe: recipe
      }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg max-h-[90vh] rounded-3xl overflow-y-auto shadow-2xl flex flex-col no-scrollbar">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full shadow-sm hover:bg-white transition-colors"
        >
          <X size={20} className="text-stone-600" />
        </button>

        {/* Hero Image */}
        <div className="h-64 w-full shrink-0 relative">
          <img 
            src={recipe.imageUrl} 
            alt={recipe.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent h-24" />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex flex-col gap-6">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {recipe.ageGroups.map(age => (
                <span key={age} className="px-3 py-1 bg-stone-100 text-stone-600 rounded-full text-xs font-semibold">
                  {age}
                </span>
              ))}
              <span className="px-3 py-1 bg-sage-100 text-sage-800 rounded-full text-xs font-semibold">
                {recipe.mealType}
              </span>
            </div>
            <h2 className="font-serif text-3xl text-stone-900 mb-2">{recipe.title}</h2>
            <p className="text-stone-500 leading-relaxed">{recipe.fullDescription}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
              <h4 className="text-terracotta-700 font-semibold mb-2 text-sm uppercase tracking-wide">Ingredients</h4>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="text-stone-700 text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-terracotta-300" />
                    <span><span className="font-medium">{ing.amount}</span> {ing.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-sage-50 p-4 rounded-xl border border-sage-100">
               <h4 className="text-sage-800 font-semibold mb-2 text-sm uppercase tracking-wide">Instructions</h4>
               <p className="text-sm text-stone-600 italic">
                 1. Prep ingredients.<br/>
                 2. Cook according to method.<br/>
                 3. Cool to safe temp.<br/>
                 4. Serve with love!
               </p>
               <div className="mt-4 pt-4 border-t border-sage-200">
                 <p className="text-xs text-sage-700 font-medium">Highlight: {recipe.nutritionHighlight}</p>
               </div>
            </div>
          </div>

          {/* Action Area */}
          <div className="mt-4">
            {!isPlanning ? (
              <button 
                onClick={() => setIsPlanning(true)}
                className="w-full py-4 bg-stone-900 text-white rounded-xl font-medium shadow-lg hover:bg-stone-800 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <CalendarPlus size={20} />
                Add to Meal Plan
              </button>
            ) : (
              <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <h4 className="font-serif text-lg mb-4 text-stone-800">When are we eating this?</h4>
                
                {/* Day Selector */}
                <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
                  {Array.from({ length: 7 }).map((_, i) => {
                    const date = addDays(startOfToday(), i);
                    const isSelected = selectedDayOffset === i;
                    return (
                      <button
                        key={i}
                        onClick={() => setSelectedDayOffset(i)}
                        className={`flex flex-col items-center min-w-[3.5rem] p-2 rounded-lg border transition-all ${
                          isSelected 
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-800' 
                            : 'border-stone-200 bg-white text-stone-400 hover:border-stone-300'
                        }`}
                      >
                        <span className="text-xs font-bold uppercase">{format(date, 'EEE')}</span>
                        <span className="text-lg font-serif">{format(date, 'd')}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Meal Type Selector */}
                <div className="flex gap-2 mb-6">
                  {(['Breakfast', 'Lunch', 'Dinner', 'Snack'] as MealType[]).map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedMealType(type)}
                      className={`flex-1 py-2 text-sm rounded-lg font-medium transition-colors ${
                        selectedMealType === type
                          ? 'bg-stone-800 text-white'
                          : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button 
                    onClick={() => setIsPlanning(false)}
                    className="flex-1 py-3 text-stone-500 font-medium hover:text-stone-800"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleAddToPlan}
                    className="flex-[2] py-3 bg-emerald-600 text-white rounded-lg font-medium shadow-md hover:bg-emerald-700 flex items-center justify-center gap-2"
                  >
                    <Check size={18} />
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};