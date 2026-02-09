import React from 'react';
import { X, AlertTriangle, ChefHat, Info } from 'lucide-react';
import { IngredientGuide, AgeGroup } from '../types';
import { useStore } from '../store';

interface IngredientModalProps {
  ingredient: IngredientGuide;
  onClose: () => void;
  onFindRecipes: (ingredientName: string) => void;
}

export const IngredientModal: React.FC<IngredientModalProps> = ({ ingredient, onClose, onFindRecipes }) => {
  const { state } = useStore();
  const currentAge = state.baby.monthsOld;

  // Determine current age group key
  // This logic maps the number to the string keys in the object
  let ageKey: AgeGroup = '4-6 months';
  if (currentAge >= 4 && currentAge < 6) ageKey = '4-6 months';
  else if (currentAge >= 6 && currentAge < 8) ageKey = '6-8 months';
  else if (currentAge >= 8 && currentAge < 10) ageKey = '8-10 months';
  else if (currentAge >= 10 && currentAge < 12) ageKey = '10-12 months';
  else if (currentAge >= 12 && currentAge < 18) ageKey = '12-18 months';
  else if (currentAge >= 18) ageKey = '18-24 months';

  // Fallback if specific age key missing, try to find closest previous or just show general info
  const prepAdvice = ingredient.preparation[ageKey] || 
                     Object.values(ingredient.preparation)[0] || 
                     "No specific advice for this age.";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header Image */}
        <div className="relative h-48">
          <img 
            src={ingredient.imageUrl} 
            alt={ingredient.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/20 text-white backdrop-blur-md rounded-full hover:bg-black/30 transition-colors"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-4 left-6">
            <span className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold text-white uppercase tracking-wider mb-2 inline-block">
              {ingredient.category}
            </span>
            <h2 className="font-serif text-3xl text-white">{ingredient.name}</h2>
          </div>
        </div>

        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto no-scrollbar">
          
          {/* Prep Advice */}
          <div className="bg-sage-50 p-5 rounded-2xl border border-sage-100">
            <div className="flex items-center gap-2 mb-3">
              <ChefHat className="text-sage-600" size={20} />
              <h3 className="font-serif text-lg text-sage-800">How to Prepare</h3>
              <span className="ml-auto text-xs font-bold text-sage-600 bg-sage-200 px-2 py-1 rounded-full">
                {currentAge} months
              </span>
            </div>
            <p className="text-stone-700 leading-relaxed font-medium">
              {prepAdvice}
            </p>
          </div>

          {/* Choking Hazards */}
          <div className="flex gap-4">
             <div className="bg-terracotta-50 p-4 rounded-xl flex-1 border border-terracotta-100">
                <div className="flex items-center gap-2 mb-2 text-terracotta-700">
                  <AlertTriangle size={18} />
                  <span className="text-xs font-bold uppercase tracking-wide">Hazards</span>
                </div>
                <p className="text-sm text-stone-600 leading-snug">
                  {ingredient.chokingHazards}
                </p>
             </div>
             
             <div className="bg-blue-50 p-4 rounded-xl flex-1 border border-blue-100">
                <div className="flex items-center gap-2 mb-2 text-blue-700">
                  <Info size={18} />
                  <span className="text-xs font-bold uppercase tracking-wide">Nutrition</span>
                </div>
                <p className="text-sm text-stone-600 leading-snug">
                  {ingredient.nutrition}
                </p>
             </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-6 pt-0">
          <button 
            onClick={() => {
              onFindRecipes(ingredient.name);
              onClose();
            }}
            className="w-full py-4 bg-stone-900 text-white rounded-xl font-bold tracking-wide hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
          >
            Find Recipes with {ingredient.name}
          </button>
        </div>

      </div>
    </div>
  );
};