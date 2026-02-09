import React, { useState, useMemo, useEffect } from 'react';
import { Recipe, AgeGroup, MealType } from '../types';
import { RecipeCard } from '../components/RecipeCard';
import { Search, Filter, Star, X, Plus } from 'lucide-react';
import { useStore } from '../store';
import { AddRecipeModal } from '../components/AddRecipeModal';

interface RecipesViewProps {
  onRecipeClick: (recipe: Recipe) => void;
  initialSearch?: string;
}

const AGE_FILTERS: AgeGroup[] = ['4-6 months', '6-8 months', '8-10 months', '10-12 months', '12-18 months'];
const TYPE_FILTERS: MealType[] = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
const ALLERGENS = ['Dairy', 'Egg', 'Nuts', 'Soy', 'Wheat', 'Fish'];

export const RecipesView: React.FC<RecipesViewProps> = ({ onRecipeClick, initialSearch = '' }) => {
  const { state } = useStore();
  const [search, setSearch] = useState(initialSearch);
  const [selectedAge, setSelectedAge] = useState<AgeGroup | 'All'>('All');
  const [selectedType, setSelectedType] = useState<MealType | 'All'>('All');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [excludedAllergens, setExcludedAllergens] = useState<string[]>([]);

  // Update search if initialSearch prop changes (e.g. navigation from Tips)
  useEffect(() => {
    if (initialSearch) {
      setSearch(initialSearch);
    }
  }, [initialSearch]);

  const filteredRecipes = useMemo(() => {
    return state.recipes.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(search.toLowerCase()) || 
                            recipe.ingredients.some(i => i.name.toLowerCase().includes(search.toLowerCase()));
      const matchesAge = selectedAge === 'All' || recipe.ageGroups.includes(selectedAge);
      const matchesType = selectedType === 'All' || recipe.mealType === selectedType;
      const matchesFavorite = !showFavoritesOnly || state.savedRecipes.includes(recipe.id);
      
      const hasAllergens = excludedAllergens.some(allergen => 
        recipe.ingredients.some(i => i.name.toLowerCase().includes(allergen.toLowerCase())) ||
        recipe.fullDescription.toLowerCase().includes(allergen.toLowerCase())
      );
      
      return matchesSearch && matchesAge && matchesType && matchesFavorite && !hasAllergens;
    });
  }, [search, selectedAge, selectedType, showFavoritesOnly, excludedAllergens, state.savedRecipes, state.recipes]);

  const toggleAllergen = (allergen: string) => {
    setExcludedAllergens(prev => 
      prev.includes(allergen) ? prev.filter(a => a !== allergen) : [...prev, allergen]
    );
  };

  return (
    <div className="pb-28 pt-4 px-4 h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Header */}
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="font-serif text-3xl text-stone-900 mb-2">Recipe Bank</h1>
          <p className="text-stone-500 text-sm">Expert-approved meals for every stage.</p>
        </div>
        
        <div className="flex gap-2">
           <button
             onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
             className={`p-2.5 rounded-xl border transition-colors ${
               showFavoritesOnly 
                 ? 'bg-amber-50 border-amber-200 text-amber-500' 
                 : 'bg-white border-stone-200 text-stone-400 hover:border-stone-300'
             }`}
           >
             <Star size={20} fill={showFavoritesOnly ? "currentColor" : "none"} />
           </button>
           <button
             onClick={() => setShowFilterModal(true)}
             className={`p-2.5 rounded-xl border transition-colors ${
               excludedAllergens.length > 0
                 ? 'bg-sage-50 border-sage-200 text-sage-600'
                 : 'bg-white border-stone-200 text-stone-400 hover:border-stone-300'
             }`}
           >
             <Filter size={20} />
             {excludedAllergens.length > 0 && (
               <span className="absolute top-4 right-4 w-2 h-2 bg-sage-500 rounded-full" />
             )}
           </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search ingredients or recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-500/20 text-stone-700"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
        {search && (
          <button 
            onClick={() => setSearch('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Filters ScrollView */}
      <div className="space-y-3 mb-6">
        {/* Type Filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
           <button
             onClick={() => setSelectedType('All')}
             className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
               selectedType === 'All' 
               ? 'bg-stone-800 text-white border-stone-800' 
               : 'bg-white text-stone-600 border-stone-200'
             }`}
           >
             All Meals
           </button>
           {TYPE_FILTERS.map(type => (
             <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                selectedType === type 
                ? 'bg-stone-800 text-white border-stone-800' 
                : 'bg-white text-stone-600 border-stone-200'
              }`}
             >
               {type}
             </button>
           ))}
        </div>

        {/* Age Filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
           <button
             onClick={() => setSelectedAge('All')}
             className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
               selectedAge === 'All' 
               ? 'bg-sage-600 text-white border-sage-600' 
               : 'bg-white text-stone-600 border-stone-200'
             }`}
           >
             All Ages
           </button>
           {AGE_FILTERS.map(age => (
             <button
              key={age}
              onClick={() => setSelectedAge(age)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                selectedAge === age 
                ? 'bg-sage-600 text-white border-sage-600' 
                : 'bg-white text-stone-600 border-stone-200'
              }`}
             >
               {age}
             </button>
           ))}
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} onClick={onRecipeClick} />
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-stone-400">
            <p className="font-serif text-lg">No yummy matches found.</p>
            <p className="text-sm">Try adjusting your filters.</p>
          </div>
        )}
      </div>
      
      {/* Floating Add Button */}
      <button 
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-stone-900 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform z-30"
      >
        <Plus size={28} />
      </button>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
           <div 
             className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
             onClick={() => setShowFilterModal(false)}
           />
           <div className="relative bg-white w-full max-w-md md:rounded-3xl rounded-t-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-10 duration-300">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-2xl text-stone-900">Advanced Filters</h3>
                <button onClick={() => setShowFilterModal(false)} className="p-2 bg-stone-50 rounded-full">
                  <X size={20} className="text-stone-500" />
                </button>
              </div>

              <div className="mb-8">
                <h4 className="text-sm font-bold text-stone-400 uppercase tracking-wide mb-3">Exclude Allergens</h4>
                <div className="flex flex-wrap gap-2">
                  {ALLERGENS.map(allergen => {
                    const isSelected = excludedAllergens.includes(allergen);
                    return (
                      <button
                        key={allergen}
                        onClick={() => toggleAllergen(allergen)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          isSelected 
                            ? 'bg-terracotta-500 text-white shadow-md' 
                            : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
                        }`}
                      >
                         {allergen}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              <button 
                onClick={() => setShowFilterModal(false)}
                className="w-full py-4 bg-stone-900 text-white rounded-xl font-bold tracking-wide"
              >
                Apply Filters
              </button>
           </div>
        </div>
      )}

      {/* Add Recipe Modal */}
      {showAddModal && (
        <AddRecipeModal onClose={() => setShowAddModal(false)} />
      )}

    </div>
  );
};