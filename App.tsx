import React, { useState } from 'react';
import { StoreProvider } from './store';
import { Navbar } from './components/Navbar';
import { TodayView } from './views/TodayView';
import { RecipesView } from './views/RecipesView';
import { CalendarView } from './views/CalendarView';
import { TipsView } from './views/TipsView';
import { RecipeModal } from './components/RecipeModal';
import { Recipe } from './types';

const AppContent = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipeSearchQuery, setRecipeSearchQuery] = useState('');

  const handleNavigateToRecipes = (initialSearch: string = '') => {
    setRecipeSearchQuery(initialSearch);
    setActiveTab('recipes');
  };

  const renderView = () => {
    switch (activeTab) {
      case 'today':
        return (
          <TodayView 
            onRecipeClick={setSelectedRecipe} 
            onNavigateToPlan={() => setActiveTab('calendar')} 
            onNavigateToRecipes={() => handleNavigateToRecipes()}
          />
        );
      case 'recipes':
        return (
          <RecipesView 
            onRecipeClick={setSelectedRecipe} 
            initialSearch={recipeSearchQuery}
          />
        );
      case 'tips':
        return (
          <TipsView 
            onFindRecipes={(ingredient) => handleNavigateToRecipes(ingredient)}
          />
        );
      case 'calendar':
        return (
          <CalendarView 
            onRecipeClick={setSelectedRecipe} 
            onNavigateToRecipes={() => handleNavigateToRecipes()}
          />
        );
      default:
        return (
          <TodayView 
            onRecipeClick={setSelectedRecipe} 
            onNavigateToPlan={() => setActiveTab('calendar')}
            onNavigateToRecipes={() => handleNavigateToRecipes()}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 mx-auto max-w-md relative shadow-2xl overflow-hidden md:my-8 md:rounded-[40px] md:border-8 md:border-stone-900 md:h-[850px] md:overflow-y-auto no-scrollbar">
      
      {/* Content Area */}
      <main className="min-h-screen md:min-h-full pb-20">
        {renderView()}
      </main>

      {/* Navigation */}
      <Navbar activeTab={activeTab} onChange={setActiveTab} />

      {/* Modal Overlay */}
      {selectedRecipe && (
        <RecipeModal 
          recipe={selectedRecipe} 
          onClose={() => setSelectedRecipe(null)} 
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <div className="w-full min-h-screen bg-stone-200 flex justify-center items-center">
      <StoreProvider>
        <AppContent />
      </StoreProvider>
    </div>
  );
}