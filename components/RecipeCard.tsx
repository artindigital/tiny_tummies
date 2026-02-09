import React from 'react';
import { Recipe } from '../types';
import { Clock, Star } from 'lucide-react';
import { useStore } from '../store';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
  compact?: boolean;
  hideMealType?: boolean;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick, compact = false, hideMealType = false }) => {
  const { state, dispatch } = useStore();
  const isFavorite = state.savedRecipes.includes(recipe.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'TOGGLE_FAVORITE', payload: { recipeId: recipe.id } });
  };

  return (
    <div 
      onClick={() => onClick(recipe)}
      className={`group bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${compact ? 'flex flex-row' : 'flex flex-col'}`}
    >
      <div className={`relative overflow-hidden ${compact ? 'w-20 h-20 shrink-0' : 'w-full h-48'}`}>
        <img 
          src={recipe.imageUrl} 
          alt={recipe.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {!hideMealType && (
          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-stone-600 uppercase tracking-wider">
            {recipe.mealType}
          </div>
        )}
        
        {/* Favorite Button Overlay */}
        <button
          onClick={handleToggleFavorite}
          className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-sm transition-colors ${
            isFavorite ? 'bg-amber-100 text-amber-500' : 'bg-black/20 text-white hover:bg-black/30'
          }`}
        >
          <Star size={14} fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </div>
      
      <div className={`flex flex-col justify-center flex-grow ${compact ? 'px-4 py-2' : 'p-4'}`}>
        <div>
          {!compact && (
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 text-xs text-sage-700 bg-sage-50 px-2 py-0.5 rounded-full font-medium">
                <Clock size={12} /> {recipe.prepTime}
              </span>
              {recipe.ageGroups[0] && (
                <span className="inline-flex items-center gap-1 text-xs text-terracotta-700 bg-terracotta-50 px-2 py-0.5 rounded-full font-medium">
                  {recipe.ageGroups[0].split(' ')[0]}m+
                </span>
              )}
            </div>
          )}
          <h3 className={`font-serif font-semibold text-stone-800 leading-tight ${compact ? 'text-sm' : 'text-xl mb-2'}`}>
            {recipe.title}
          </h3>
          {!compact && (
            <p className="text-stone-500 text-sm line-clamp-2">{recipe.description}</p>
          )}
        </div>
        
        {compact && (
           <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1 text-[10px] text-stone-500 font-medium">
                 <Clock size={10} /> {recipe.prepTime}
              </span>
              {recipe.nutritionHighlight && (
                <span className="text-[10px] text-emerald-600 font-medium truncate max-w-[120px]">
                  • {recipe.nutritionHighlight}
                </span>
              )}
           </div>
        )}

        {!compact && recipe.nutritionHighlight && (
           <div className="mt-3 text-xs text-emerald-600 font-medium flex items-center gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
             {recipe.nutritionHighlight}
           </div>
        )}
      </div>
    </div>
  );
};