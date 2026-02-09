import React, { useState } from 'react';
import { useStore } from '../store';
import { MILESTONES, DEVELOPMENT_INFO } from '../constants';
import { isSameDay } from 'date-fns';
import { Lock, Unlock, ChefHat, ArrowRight, Check, Plus } from 'lucide-react';
import { RecipeCard } from '../components/RecipeCard';
import { DevelopmentModal } from '../components/DevelopmentModal';
import { Recipe, MealType } from '../types';

interface TodayViewProps {
  onRecipeClick: (recipe: Recipe) => void;
  onNavigateToPlan: () => void;
  onNavigateToRecipes: () => void;
}

export const TodayView: React.FC<TodayViewProps> = ({ onRecipeClick, onNavigateToPlan, onNavigateToRecipes }) => {
  const { state, dispatch } = useStore();
  const [showDevModal, setShowDevModal] = useState(false);
  const today = new Date();
  
  // Find current milestone info
  const currentAge = state.baby.monthsOld;
  const nextMilestone = MILESTONES.find(m => m.month > currentAge) || MILESTONES[MILESTONES.length - 1];
  const progressPercent = Math.min(100, (currentAge / nextMilestone.month) * 100);

  // Get developmental info key (approximate logic for demo)
  let devStageKey = '4-6 months';
  if (currentAge >= 6 && currentAge < 8) devStageKey = '6-8 months';
  else if (currentAge >= 8 && currentAge < 10) devStageKey = '8-10 months';
  else if (currentAge >= 10 && currentAge < 12) devStageKey = '10-12 months';
  else if (currentAge >= 12) devStageKey = '10-12 months'; // Demo fallback

  const devInfo = DEVELOPMENT_INFO[devStageKey];

  // Get today's plan
  const todaysPlan = state.weeklyPlan.find(p => isSameDay(p.date, today));
  const mealTypes: MealType[] = ['Breakfast', 'Lunch', 'Snack', 'Dinner'];

  const handleToggle = (type: MealType) => {
    dispatch({
      type: 'TOGGLE_MEAL_COMPLETION',
      payload: { date: today, mealType: type }
    });
  };

  const handleTimeChange = (type: MealType, newTime: string) => {
    dispatch({
      type: 'UPDATE_MEAL_TIME',
      payload: { date: today, mealType: type, time: newTime }
    });
  };

  return (
    <div className="pb-28 pt-4 px-4 space-y-8 animate-in fade-in duration-500">
      
      {/* Header & Greeting */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-stone-500 font-medium">Good Morning, Mama</h2>
          <h1 className="font-serif text-3xl text-stone-900 mt-1">
            Let's feed <span className="text-sage-700 italic">{state.baby.name}</span>
          </h1>
        </div>
        <div className="w-12 h-12 rounded-full bg-stone-200 overflow-hidden border-2 border-white shadow-sm">
           <img src="https://picsum.photos/100/100?baby" alt="Baby" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Progress Tracker (Clickable) */}
      <button 
        onClick={() => setShowDevModal(true)}
        className="w-full text-left bg-gradient-to-br from-stone-900 to-stone-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden group transition-transform active:scale-[0.98]"
      >
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-sage-500/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
        
        {/* Hint icon */}
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
           <ArrowRight className="text-stone-400" />
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <span className="text-stone-300 text-sm font-medium tracking-wide uppercase">Development</span>
            <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md">
              {currentAge} Months
            </span>
          </div>

          <div className="mb-6">
            <h3 className="font-serif text-xl mb-1">Next: {nextMilestone.title}</h3>
            <p className="text-stone-400 text-sm">{nextMilestone.description}</p>
          </div>

          {/* Custom Progress Bar */}
          <div className="space-y-2">
            <div className="h-2 w-full bg-stone-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-sage-300 to-emerald-400 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-stone-500 font-medium">
              <span>{currentAge}m</span>
              <span>{nextMilestone.month}m</span>
            </div>
          </div>
        </div>
      </button>

      {/* Today's Menu */}
      <div>
        <div className="flex items-center justify-between mb-4">
           <h3 className="font-serif text-2xl text-stone-800">Today's Menu</h3>
           <button onClick={onNavigateToPlan} className="text-sm font-medium text-sage-700 hover:text-sage-800 flex items-center gap-1">
             Full Schedule <ArrowRight size={14} />
           </button>
        </div>

        <div className="space-y-5">
          {todaysPlan && mealTypes.map((type) => {
            const slot = todaysPlan.meals[type];
            if (!slot) return null;

            return (
              <div key={type} className="flex gap-4">
                {/* Checkbox Column */}
                <div className="pt-2 shrink-0">
                  <button
                    onClick={() => handleToggle(type)}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      slot.isCompleted 
                        ? 'bg-sage-500 border-sage-500 text-white' 
                        : 'bg-white border-stone-200 text-transparent hover:border-sage-400'
                    }`}
                  >
                    <Check size={16} strokeWidth={3} />
                  </button>
                </div>

                {/* Content Column */}
                <div className="flex-grow flex flex-col gap-2">
                  {/* Header Row: Time & Title */}
                  <div className="flex items-center gap-3">
                    <input
                      type="time"
                      value={slot.time}
                      onChange={(e) => handleTimeChange(type, e.target.value)}
                      className="bg-stone-100 text-stone-600 text-xs font-bold px-2 py-1 rounded hover:bg-stone-200 focus:bg-white focus:ring-2 focus:ring-sage-500/20 focus:outline-none transition-colors cursor-pointer"
                    />
                    <h4 className={`text-sm font-bold uppercase tracking-wider ${slot.isCompleted ? 'text-stone-400 line-through' : 'text-stone-700'}`}>
                      {type}
                    </h4>
                  </div>

                  {/* Recipe Card or Empty State */}
                  <div className={`transition-opacity duration-300 ${slot.isCompleted ? 'opacity-50 grayscale' : 'opacity-100'}`}>
                    {slot.recipe ? (
                      <RecipeCard 
                        recipe={slot.recipe} 
                        onClick={onRecipeClick} 
                        compact={true} 
                        hideMealType={true}
                      />
                    ) : (
                      <button 
                        onClick={onNavigateToRecipes}
                        className="w-full h-16 border-2 border-dashed border-sage-200 bg-sage-50/50 rounded-xl flex items-center gap-3 px-4 hover:bg-sage-50 hover:border-sage-300 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-sage-100 flex items-center justify-center text-sage-400 group-hover:text-sage-600 group-hover:border-sage-200 transition-colors">
                          <Plus size={16} />
                        </div>
                        <span className="text-sm text-sage-600 font-medium">Add a recipe</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dev Modal */}
      {showDevModal && devInfo && (
        <DevelopmentModal 
          info={devInfo}
          age={devStageKey}
          onClose={() => setShowDevModal(false)}
        />
      )}

    </div>
  );
};