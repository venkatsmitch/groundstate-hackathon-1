import React from 'react';
import { Biomarker } from '../types';
import { ChevronRight } from 'lucide-react';

interface BiomarkerCardProps {
  biomarker: Biomarker;
  onClick?: () => void;
}

export const BiomarkerCard: React.FC<BiomarkerCardProps> = ({ biomarker, onClick }) => {
  const getEmoji = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('b12')) return '💊';
    if (n.includes('vitd')) return '☀️';
    if (n.includes('bmi')) return '⚖️';
    if (n.includes('crp')) return '🔥';
    if (n.includes('testo')) return '💪';
    if (n.includes('homo')) return '🧬';
    return '🧪';
  };

  const getStatusStyles = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes('low') || s.includes('critical') || s.includes('high') && !s.includes('mildly')) {
      return { pill: 'bg-rose-500/10 text-rose-400 border-rose-500/20', emoji: '🔴' };
    }
    if (s.includes('elevated') || s.includes('mildly') || s.includes('borderline') || s.includes('overweight')) {
      return { pill: 'bg-amber-500/10 text-amber-400 border-amber-500/20', emoji: '🟡' };
    }
    return { pill: 'bg-play-mint/10 text-play-mint border-play-mint/20', emoji: '🟢' };
  };

  const styles = getStatusStyles(biomarker.status);

  return (
    <div 
      onClick={onClick}
      className="play-card group cursor-pointer hover:-translate-y-1 bg-play-card border-play-border"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-2xl bg-play-elevated flex items-center justify-center text-2xl group-hover:scale-110 transition-transform border border-play-border">
          {getEmoji(biomarker.name)}
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className={`status-pill ${styles.pill}`}>
            {styles.emoji} {biomarker.status}
          </div>
          <div className="text-[8px] font-black text-play-pink uppercase tracking-widest bg-play-pink/5 px-2 py-0.5 rounded-full">
            +{biomarker.impact} pts
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-xs font-black text-play-muted uppercase tracking-widest mb-1">{biomarker.name}</h3>
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-play-ink">{biomarker.value}</span>
            <span className="text-[10px] font-bold text-play-muted uppercase tracking-wider">{biomarker.unit}</span>
          </div>
          <ChevronRight size={16} className="text-play-muted group-hover:text-play-pink transition-colors" />
        </div>
      </div>
    </div>
  );
};
