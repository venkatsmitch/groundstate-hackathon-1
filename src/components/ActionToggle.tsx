import React from 'react';
import { Intervention } from '../types';
import { Check, Plus } from 'lucide-react';

interface ActionToggleProps {
  action: Intervention;
  isActive: boolean;
  onToggle: () => void;
}

export const ActionToggle: React.FC<ActionToggleProps> = ({ action, isActive, onToggle }) => {
  const getEmoji = () => {
    switch (action.category) {
      case 'Supplement': return '💊';
      case 'Diet': return '🥗';
      case 'Exercise': return '⚡';
      case 'Sleep': return '🌙';
      default: return '✨';
    }
  };

  return (
    <button 
      onClick={onToggle}
      className={`w-full flex items-center justify-between p-5 rounded-3xl border-2 transition-all active:scale-[0.98] ${
        isActive 
          ? 'bg-play-purple border-play-purple text-white shadow-xl shadow-play-purple/20' 
          : 'bg-white border-slate-100 text-play-ink hover:border-play-purple/20'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${isActive ? 'bg-white/20' : 'bg-play-bg'}`}>
          {getEmoji()}
        </div>
        <div className="text-left">
          <h4 className="font-black text-sm">{action.name}</h4>
          <p className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'text-white/60' : 'text-slate-400'}`}>
            {action.category} • +{action.impact} Points
          </p>
        </div>
      </div>
      
      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
        isActive ? 'bg-white text-play-purple rotate-0' : 'bg-slate-50 text-slate-300 rotate-45'
      }`}>
        {isActive ? <Check size={16} strokeWidth={4} /> : <Plus size={16} strokeWidth={4} />}
      </div>
    </button>
  );
};
