import React from 'react';
import { X, CheckCircle, AlertTriangle, Lightbulb, Baby } from 'lucide-react';
import { DevelopmentStageInfo } from '../types';

interface DevelopmentModalProps {
  info: DevelopmentStageInfo;
  age: string;
  onClose: () => void;
}

export const DevelopmentModal: React.FC<DevelopmentModalProps> = ({ info, age, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg max-h-[90vh] rounded-3xl overflow-y-auto shadow-2xl flex flex-col animate-in zoom-in-95 duration-200 no-scrollbar">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md z-10 px-6 py-4 border-b border-stone-100 flex justify-between items-center">
           <div>
             <span className="text-xs font-bold text-sage-600 uppercase tracking-wider">{age}</span>
             <h2 className="font-serif text-2xl text-stone-800">{info.title}</h2>
           </div>
           <button 
             onClick={onClose}
             className="p-2 bg-stone-50 rounded-full hover:bg-stone-100 transition-colors"
           >
             <X size={20} className="text-stone-500" />
           </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Main Tip */}
          <div className="bg-sage-50 p-4 rounded-xl flex gap-3 border border-sage-100">
             <Lightbulb className="text-sage-600 shrink-0" size={24} />
             <p className="text-sage-800 text-sm leading-relaxed font-medium">
               {info.tips}
             </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-lg text-stone-800 flex items-center gap-2">
              <Baby size={18} className="text-stone-400" /> Skills Developing
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {info.skills.map((skill, i) => (
                <div key={i} className="bg-stone-50 p-3 rounded-lg text-sm text-stone-600 border border-stone-100">
                  {skill}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
             <h3 className="font-serif text-lg text-stone-800 flex items-center gap-2">
                <CheckCircle size={18} className="text-emerald-500" /> Foods to Try
             </h3>
             <ul className="space-y-2">
               {info.foodsToTry.map((food, i) => (
                 <li key={i} className="flex items-center gap-2 text-stone-600 text-sm">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                   {food}
                 </li>
               ))}
             </ul>
          </div>

          <div className="space-y-4">
             <h3 className="font-serif text-lg text-stone-800 flex items-center gap-2">
                <AlertTriangle size={18} className="text-terracotta-500" /> Foods to Avoid
             </h3>
             <ul className="space-y-2">
               {info.foodsToAvoid.map((food, i) => (
                 <li key={i} className="flex items-center gap-2 text-stone-600 text-sm">
                   <div className="w-1.5 h-1.5 rounded-full bg-terracotta-400" />
                   {food}
                 </li>
               ))}
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
};