import React, { useState } from 'react';
import { Search, ShieldAlert, Heart, ChevronDown, ChevronUp, Baby, Layers, Info, CheckCircle2 } from 'lucide-react';
import { INGREDIENT_GUIDES } from '../constants';
import { IngredientGuide } from '../types';
import { IngredientModal } from '../components/IngredientModal';

interface GuideCardProps {
  id: string;
  title: string;
  icon: React.ElementType;
  isOpen: boolean;
  onClick: () => void;
  children: React.ReactNode;
  color: string;
  bgColor: string;
}

const GuideCard: React.FC<GuideCardProps> = ({ id, title, icon: Icon, isOpen, onClick, children, color, bgColor }) => (
  <div className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'shadow-md border-stone-200' : 'shadow-sm border-stone-100'}`}>
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 bg-white hover:bg-stone-50/50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-xl ${bgColor} ${color}`}>
          <Icon size={20} />
        </div>
        <span className="font-serif text-lg text-stone-800">{title}</span>
      </div>
      {isOpen ? <ChevronUp size={20} className="text-stone-400" /> : <ChevronDown size={20} className="text-stone-400" />}
    </button>
    
    <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
      <div className="p-4 pt-0 text-stone-600 border-t border-stone-50">
        <div className="pt-4">
          {children}
        </div>
      </div>
    </div>
  </div>
);

interface ListItemProps {
  title: string;
  children: React.ReactNode;
}

const ListItem: React.FC<ListItemProps> = ({ title, children }) => (
  <li className="flex items-start gap-2 text-sm text-stone-600">
    <CheckCircle2 size={16} className="text-sage-500 mt-0.5 shrink-0" />
    <span className="leading-snug">
      <span className="font-bold text-stone-700">{title}:</span> {children}
    </span>
  </li>
);

interface StageRowProps {
  stage: string;
  age: string;
  texture: string;
  goal: string;
}

const StageRow: React.FC<StageRowProps> = ({ stage, age, texture, goal }) => (
  <div className="flex gap-3 items-center border-b border-stone-100 last:border-0 pb-3 last:pb-0">
    <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
      <span className="font-serif font-bold text-stone-500">{stage}</span>
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-center mb-0.5">
         <span className="text-xs font-bold uppercase text-stone-400 tracking-wide">{age}</span>
         <span className="text-xs font-semibold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">{texture}</span>
      </div>
      <p className="text-xs text-stone-600 leading-snug">{goal}</p>
    </div>
  </div>
);

interface TipsViewProps {
  onFindRecipes: (ingredientName: string) => void;
}

export const TipsView: React.FC<TipsViewProps> = ({ onFindRecipes }) => {
  const [activeTab, setActiveTab] = useState<'guides' | 'library'>('guides');
  const [search, setSearch] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState<IngredientGuide | null>(null);
  const [expandedGuide, setExpandedGuide] = useState<string | null>('readiness');

  const filteredIngredients = INGREDIENT_GUIDES.filter(ing => 
    ing.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleGuide = (id: string) => {
    setExpandedGuide(expandedGuide === id ? null : id);
  };

  return (
    <div className="pb-28 pt-4 px-4 h-full flex flex-col animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-serif text-3xl text-stone-900 mb-2">Tips & Tricks</h1>
        <p className="text-stone-500 text-sm">Everything you need to know about starting solids.</p>
      </div>

      {/* Segmented Control */}
      <div className="bg-stone-100 p-1 rounded-xl flex mb-6 shrink-0">
        <button
          onClick={() => setActiveTab('guides')}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'guides' 
              ? 'bg-white text-stone-900 shadow-sm' 
              : 'text-stone-400 hover:text-stone-600'
          }`}
        >
          Expert Guides
        </button>
        <button
          onClick={() => setActiveTab('library')}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'library' 
              ? 'bg-white text-stone-900 shadow-sm' 
              : 'text-stone-400 hover:text-stone-600'
          }`}
        >
          Food Library
        </button>
      </div>

      {activeTab === 'library' ? (
        <div className="animate-in slide-in-from-right-4 duration-300">
            {/* Search */}
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Look up an ingredient..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sage-500/20 text-stone-700"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-4 pb-4">
              {filteredIngredients.map(ing => (
                <button
                  key={ing.id}
                  onClick={() => setSelectedIngredient(ing)}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-md transition-all active:scale-[0.98]"
                >
                  <div className="h-32 w-full">
                    <img 
                      src={ing.imageUrl} 
                      alt={ing.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    {/* Category removed as requested */}
                    <h3 className="font-serif text-lg text-white leading-none mb-1">
                      {ing.name}
                    </h3>
                  </div>
                </button>
              ))}
            </div>
            
            {filteredIngredients.length === 0 && (
              <div className="text-center py-12 text-stone-400">
                  <p>No ingredients found.</p>
              </div>
            )}
        </div>
      ) : (
        <div className="space-y-4 pb-4 animate-in slide-in-from-left-4 duration-300 overflow-y-auto no-scrollbar">
            
            {/* Guide: Readiness */}
            <GuideCard 
              id="readiness"
              title="Signs of Readiness"
              icon={Baby}
              isOpen={expandedGuide === 'readiness'}
              onClick={() => toggleGuide('readiness')}
              color="text-blue-600"
              bgColor="bg-blue-50"
            >
              <p className="text-stone-600 mb-4 text-sm leading-relaxed">
                Most children are developmentally ready to begin solid foods at approximately six months of age. Wait until the child shows specific signs of readiness.
              </p>
              <ul className="space-y-3">
                <ListItem title="Physical Stability">
                  Sits upright with little support and has excellent head control.
                </ListItem>
                <ListItem title="Oral Development">
                  Lost the "tongue-thrust reflex" (pushing food out) and can move food to back of mouth.
                </ListItem>
                <ListItem title="Interest">
                  Watches you eat, reaches for food, and attempts to grasp small objects.
                </ListItem>
              </ul>
            </GuideCard>

             {/* Guide: Stages */}
             <GuideCard 
              id="stages"
              title="The 4 Stages of Eating"
              icon={Layers}
              isOpen={expandedGuide === 'stages'}
              onClick={() => toggleGuide('stages')}
              color="text-indigo-600"
              bgColor="bg-indigo-50"
            >
              <div className="space-y-4">
                <StageRow stage="1" age="6 Mo" texture="Smooth Purees" goal="Introduction to flavors" />
                <StageRow stage="2" age="7-9 Mo" texture="Thick & Lumpy" goal="Chewing & Pincer Grasp" />
                <StageRow stage="3" age="10-12 Mo" texture="Chopped & Soft" goal="Modified Family Meals" />
                <StageRow stage="4" age="12+ Mo" texture="Table Foods" goal="Eating same as parents" />
                
                <div className="bg-stone-50 p-3 rounded-lg mt-4 border border-stone-100">
                  <p className="text-xs text-stone-500 italic leading-relaxed">
                    <span className="font-bold not-italic text-stone-700 block mb-1">Cooking Tip:</span> 
                    Steam or roast veggies/fruits to preserve nutrients. Slow-cook proteins for tenderness.
                  </p>
                </div>
              </div>
            </GuideCard>

            {/* Guide: Safety */}
            <GuideCard 
              id="safety"
              title="Safety & Choking Hazards"
              icon={ShieldAlert}
              isOpen={expandedGuide === 'safety'}
              onClick={() => toggleGuide('safety')}
              color="text-terracotta-600"
              bgColor="bg-terracotta-50"
            >
               <div className="bg-red-50 border border-red-100 p-3 rounded-lg mb-4">
                  <p className="text-red-800 text-xs font-bold uppercase tracking-wide mb-1 flex items-center gap-1">
                    <ShieldAlert size={12} /> Critical Rule
                  </p>
                  <p className="text-red-700 text-sm font-medium">Never leave a child unattended while eating. They must sit upright.</p>
               </div>

               <h4 className="font-serif text-stone-800 text-lg mb-3">Modifying High-Risk Foods</h4>
               <ul className="space-y-3 mb-4">
                 <ListItem title="Round Foods">
                   Grapes/Tomatoes must be quartered lengthwise.
                 </ListItem>
                 <ListItem title="Cylindrical Foods">
                   Hot dogs/Cheese sticks must be cut into thin strips, never coins.
                 </ListItem>
                 <ListItem title="Hard Foods">
                   Raw carrots/apples must be cooked soft or grated finely. No whole nuts/popcorn.
                 </ListItem>
                 <ListItem title="Sticky Foods">
                   Thin out peanut butter or mix into purees. No globs.
                 </ListItem>
               </ul>
            </GuideCard>

            {/* Guide: Nutrition */}
            <GuideCard 
              id="nutrition"
              title="Nutritional Guidelines"
              icon={Heart}
              isOpen={expandedGuide === 'nutrition'}
              onClick={() => toggleGuide('nutrition')}
              color="text-emerald-600"
              bgColor="bg-emerald-50"
            >
               <p className="text-stone-600 mb-4 text-sm">
                 Solids provide essential micronutrients that milk may no longer provide in sufficient quantities after 6 months.
               </p>

               <div className="space-y-4">
                  <div>
                    <h4 className="font-serif text-stone-800 mb-2">Essential for Growth</h4>
                    <ul className="space-y-2">
                      <ListItem title="Iron & Zinc">Vital for brain development. Meat, beans, fortified cereals.</ListItem>
                      <ListItem title="Vitamin C">Serve with iron-rich foods to boost absorption.</ListItem>
                      <ListItem title="Healthy Fats">Need 30-40% calories from fat (Avocado, Oil, Dairy) for brain growth.</ListItem>
                    </ul>
                  </div>

                  <div className="border-t border-stone-100 pt-4">
                    <h4 className="font-serif text-stone-800 mb-2">What to Avoid</h4>
                     <ul className="space-y-2">
                      <ListItem title="Salt & Sugar">Kidneys can't process high salt. Sugar causes decay.</ListItem>
                      <ListItem title="Honey">Strictly avoid until 12mo (Botulism risk).</ListItem>
                      <ListItem title="Cow's Milk">Not as a main drink until 1 year.</ListItem>
                    </ul>
                  </div>
               </div>
            </GuideCard>
        </div>
      )}

      {selectedIngredient && (
        <IngredientModal 
          ingredient={selectedIngredient}
          onClose={() => setSelectedIngredient(null)}
          onFindRecipes={onFindRecipes}
        />
      )}

    </div>
  );
};