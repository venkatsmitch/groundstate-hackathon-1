import React from 'react';
import { motion } from 'motion/react';
import { Clock } from 'lucide-react';

interface TargetSetterProps {
  currentScore: number;
  targetScore: number;
  onTargetChange: (val: number) => void;
  priority: string[];
  onPriorityChange: (priority: string[]) => void;
  timeframe: 'weeks' | 'months';
  onTimeframeChange: (timeframe: 'weeks' | 'months') => void;
}

export const TargetSetter: React.FC<TargetSetterProps> = ({ 
  currentScore, 
  targetScore, 
  onTargetChange,
  priority,
  onPriorityChange,
  timeframe,
  onTimeframeChange
}) => {
  const categories = [
    { id: 'Diet', emoji: '🥗', label: 'Diet' },
    { id: 'Exercise', emoji: '⚡', label: 'Exercise' },
    { id: 'Sleep', emoji: '🌙', label: 'Sleep' },
    { id: 'Supplement', emoji: '💊', label: 'Supps' },
  ];

  const togglePriority = (id: string) => {
    if (priority.includes(id)) {
      onPriorityChange(priority.filter(p => p !== id));
    } else {
      onPriorityChange([...priority, id]);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return '#34d399'; // play-mint
    if (score >= 70) return '#60a5fa'; // play-blue
    if (score >= 55) return '#fbbf24'; // play-yellow
    return '#f472b6'; // play-pink
  };

  const activeColor = getScoreColor(targetScore);

  return (
    <div className="space-y-8">
      {/* Playful Target Card */}
      <div className="play-card p-10 relative overflow-hidden group bg-play-card border-play-border">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-play-purple/10 rounded-full blur-3xl" />
        
        <div className="flex justify-between items-start mb-10 relative z-10">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-play-purple mb-2">Set Your Target</h3>
            <p className="text-sm text-play-muted font-bold">Dream big! Where do you want to be?</p>
          </div>
          <div className="text-right">
            <motion.span 
              key={targetScore}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-7xl font-black tracking-tighter text-play-ink block leading-none"
            >
              {targetScore}
            </motion.span>
            <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 bg-play-mint/10 text-play-mint rounded-full text-[10px] font-black uppercase tracking-widest">
              <span>+{Math.round(targetScore - currentScore)} pts</span>
            </div>
          </div>
        </div>

        <div className="relative h-12 flex items-center group">
          <div className="absolute w-full h-4 bg-play-elevated rounded-full overflow-hidden border-2 border-play-border shadow-inner">
            <motion.div 
              className="h-full"
              initial={false}
              animate={{ 
                width: `${((targetScore - currentScore) / (99 - currentScore)) * 100}%`,
                backgroundColor: activeColor 
              }}
            />
          </div>
          <input
            type="range"
            min={currentScore}
            max={99}
            value={targetScore}
            onChange={(e) => onTargetChange(parseInt(e.target.value))}
            className="absolute w-full h-full opacity-0 cursor-pointer z-10"
          />
          <motion.div 
            className="absolute w-10 h-10 bg-play-ink rounded-2xl shadow-2xl border-4 pointer-events-none flex items-center justify-center text-xl"
            style={{ borderColor: activeColor }}
            animate={{ 
              left: `calc(${((targetScore - currentScore) / (99 - currentScore)) * 100}% - 20px)` 
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            🎯
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="play-card p-8 bg-play-card border-play-border">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-play-muted mb-6">Focus Areas</h3>
          <div className="grid grid-cols-4 gap-3">
            {categories.map((cat) => {
              const isActive = priority.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => togglePriority(cat.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                    isActive 
                      ? 'bg-play-purple border-play-purple text-white shadow-lg shadow-play-purple/20' 
                      : 'bg-play-elevated border-play-border text-play-muted hover:border-play-purple/20'
                  }`}
                >
                  <span className="text-xl">{cat.emoji}</span>
                  <span className="text-[8px] font-black uppercase tracking-widest">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="play-card p-8 bg-play-card border-play-border">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-play-muted mb-6">Pace</h3>
          <div className="flex p-2 bg-play-elevated rounded-2xl border-2 border-play-border shadow-inner">
            <button
              onClick={() => onTimeframeChange('weeks')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                timeframe === 'weeks' ? 'bg-play-card text-play-purple shadow-md' : 'text-play-muted hover:text-play-ink'
              }`}
            >
              <Clock size={14} />
              Sprint
            </button>
            <button
              onClick={() => onTimeframeChange('months')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                timeframe === 'months' ? 'bg-play-card text-play-purple shadow-md' : 'text-play-muted hover:text-play-ink'
              }`}
            >
              <Clock size={14} />
              Steady
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
