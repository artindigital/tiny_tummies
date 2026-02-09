import React, { useState } from 'react';
import { X, Plus, Trash2, ChefHat, Clock, Image as ImageIcon } from 'lucide-react';
import { useStore } from '../store';
import { Recipe, Ingredient, AgeGroup, MealType } from '../types';

interface AddRecipeModalProps {
  onClose: () => void;
}

export const AddRecipeModal: React.FC<AddRecipeModalProps> = ({ onClose }) => {
  const { dispatch } = useStore();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [mealType, setMealType] = useState<MealType>('Lunch');
  const [ageGroups, setAgeGroups] = useState<AgeGroup[]>(['6-8 months']);
  
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: '', amount: '', category: 'Produce' }
  ]);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '', category: 'Produce' }]);
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (index: number, field: keyof Ingredient, value: string) => {
    const newIngredients = [...ingredients];
    // @ts-ignore
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRecipe: Recipe = {
      id: Date.now().toString(),
      title,
      description,
      fullDescription: fullDescription || description,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=400',
      ageGroups,
      mealType,
      ingredients: ingredients.filter(i => i.name.trim() !== ''),
      prepTime: prepTime || '15 mins',
    };

    dispatch({ type: 'ADD_RECIPE', payload: { recipe: newRecipe } });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-stone-50 w-full max-w-lg h-[90vh] md:h-auto md:max-h-[90vh] md:rounded-3xl rounded-t-3xl shadow-2xl overflow-y-auto no-scrollbar flex flex-col animate-in slide-in-from-bottom-10 duration-300">
        
        {/* Header */}
        <div className="sticky top-0 bg-stone-50/95 backdrop-blur-md z-10 px-6 py-4 border-b border-stone-200 flex justify-between items-center">
          <h2 className="font-serif text-2xl text-stone-900">Add Recipe</h2>
          <button onClick={onClose} className="p-2 bg-stone-200 rounded-full hover:bg-stone-300">
            <X size={20} className="text-stone-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Basic Info */}
          <div className="space-y-4">
             <div>
               <label className="block text-sm font-bold text-stone-500 uppercase tracking-wide mb-1">Recipe Title</label>
               <input 
                 required
                 type="text" 
                 value={title}
                 onChange={e => setTitle(e.target.value)}
                 className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-sage-500/20 outline-none text-stone-800 placeholder-stone-300"
                 placeholder="e.g., Mom's Special Pasta"
               />
             </div>

             <div>
               <label className="block text-sm font-bold text-stone-500 uppercase tracking-wide mb-1">Short Description</label>
               <input 
                 required
                 type="text" 
                 value={description}
                 onChange={e => setDescription(e.target.value)}
                 className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-sage-500/20 outline-none text-stone-800 placeholder-stone-300"
                 placeholder="Quick and tasty for lunch"
               />
             </div>
             
             <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-bold text-stone-500 uppercase tracking-wide mb-1">Prep Time</label>
                  <div className="relative">
                    <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"/>
                    <input 
                      type="text" 
                      value={prepTime}
                      onChange={e => setPrepTime(e.target.value)}
                      className="w-full pl-9 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-sage-500/20 outline-none text-stone-800"
                      placeholder="15 mins"
                    />
                  </div>
                </div>
                <div className="flex-1">
                   <label className="block text-sm font-bold text-stone-500 uppercase tracking-wide mb-1">Meal Type</label>
                   <select 
                     value={mealType}
                     onChange={e => setMealType(e.target.value as MealType)}
                     className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-sage-500/20 outline-none text-stone-800"
                   >
                     {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map(t => (
                       <option key={t} value={t}>{t}</option>
                     ))}
                   </select>
                </div>
             </div>
             
             <div>
               <label className="block text-sm font-bold text-stone-500 uppercase tracking-wide mb-1">Image URL</label>
               <div className="relative">
                  <ImageIcon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"/>
                  <input 
                    type="url" 
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-sage-500/20 outline-none text-stone-800 placeholder-stone-300"
                    placeholder="https://..."
                  />
               </div>
               <p className="text-xs text-stone-400 mt-1">Leave empty for random food image.</p>
             </div>
          </div>

          {/* Ingredients */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200">
             <div className="flex justify-between items-center mb-3">
               <h3 className="font-serif text-lg text-stone-800">Ingredients</h3>
               <button 
                 type="button" 
                 onClick={handleAddIngredient}
                 className="text-xs font-bold text-sage-600 bg-sage-50 px-2 py-1 rounded-lg hover:bg-sage-100 transition-colors"
               >
                 + Add Item
               </button>
             </div>
             
             <div className="space-y-3">
               {ingredients.map((ing, idx) => (
                 <div key={idx} className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Amount"
                      value={ing.amount}
                      onChange={e => handleIngredientChange(idx, 'amount', e.target.value)}
                      className="w-20 px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm"
                    />
                    <input 
                      type="text" 
                      placeholder="Ingredient Name"
                      value={ing.name}
                      onChange={e => handleIngredientChange(idx, 'name', e.target.value)}
                      className="flex-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm"
                    />
                    {ingredients.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => handleRemoveIngredient(idx)}
                        className="p-2 text-stone-400 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                 </div>
               ))}
             </div>
          </div>

          {/* Steps */}
          <div>
            <label className="block text-sm font-bold text-stone-500 uppercase tracking-wide mb-1">Steps & Details</label>
            <textarea 
              value={fullDescription}
              onChange={e => setFullDescription(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-sage-500/20 outline-none text-stone-800 placeholder-stone-300 min-h-[120px]"
              placeholder="1. Chop vegetables..."
            />
          </div>

          <div className="pt-4 pb-8">
            <button 
              type="submit"
              className="w-full py-4 bg-stone-900 text-white rounded-xl font-bold tracking-wide hover:bg-stone-800 transition-all flex items-center justify-center gap-2"
            >
              <ChefHat size={20} />
              Save Recipe
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};