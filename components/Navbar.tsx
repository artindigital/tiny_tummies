import React from 'react';
import { CalendarDays, ChefHat, Home, Lightbulb } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onChange: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onChange }) => {
  const tabs = [
    { id: 'today', icon: Home, label: 'Today' },
    { id: 'recipes', icon: ChefHat, label: 'Recipes' },
    { id: 'tips', icon: Lightbulb, label: 'Tips' },
    { id: 'calendar', icon: CalendarDays, label: 'Plan' },
  ];

  return (
    <div className="fixed bottom-6 left-6 right-6 z-40">
      <div className="bg-stone-900/90 backdrop-blur-xl rounded-full px-4 py-3 shadow-2xl border border-stone-700/50 max-w-sm mx-auto flex justify-between items-center">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'bg-white text-stone-900 shadow-md' 
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              {isActive && (
                <span className="text-xs font-bold tracking-wide animate-in fade-in duration-300 hidden sm:inline-block">
                  {tab.label}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};