import React from 'react';
import { motion } from 'motion/react';
import { getBandColor } from '../data';
import { ArrowRight, Star } from 'lucide-react';

interface ScoreOverviewProps {
  score: number;
  band: string;
  projectedImprovement?: number;
  baseScore?: number;
}

export const ScoreOverview: React.FC<ScoreOverviewProps> = ({ score, band, projectedImprovement, baseScore = 63.7 }) => {
  const healthyTarget = 70.0;
  const remaining = Math.max(0, healthyTarget - score);
  const isSuperstar = score >= 85;

  return (
    <div className="play-card bg-play-card border-play-border relative overflow-hidden group">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-play-purple/10 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-play-pink via-play-purple to-play-blue" />
      
      <div className="relative z-10 p-2">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="text-[10px] font-black text-play-muted uppercase tracking-[0.2em]">Potential Achievement</div>
              {isSuperstar && (
                <motion.div 
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  className="px-2 py-0.5 bg-play-mint/20 text-play-mint rounded-md text-[8px] font-black uppercase tracking-widest flex items-center gap-1"
                >
                  <Star size={8} fill="currentColor" /> Superstar
                </motion.div>
              )}
            </div>
            <div className="flex items-center gap-6">
              <span className="text-4xl font-black text-play-muted">{Math.round(baseScore)}</span>
              <ArrowRight className="text-play-muted" size={24} />
              <motion.span 
                key={score}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-6xl font-black gradient-text"
              >
                {Math.round(score)}
              </motion.span>
              <div className="ml-auto flex flex-col items-end gap-2">
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-3 py-1 bg-play-mint/10 text-play-mint rounded-full text-xs font-black animate-pulse"
                >
                  +{projectedImprovement?.toFixed(1) || '0.0'}
                </motion.div>
                <div className="text-[10px] font-black text-play-muted uppercase tracking-widest">Points Boost</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between text-[10px] font-black text-play-muted uppercase tracking-widest">
            <span>To Healthy</span>
            <span className={score >= healthyTarget ? 'text-play-mint' : ''}>
              {score >= healthyTarget ? '✓ Healthy!' : `${remaining.toFixed(1)} to go`}
            </span>
          </div>
          <div className="h-2 bg-play-elevated rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(score / 100) * 100}%` }}
              className="h-full bg-gradient-to-r from-play-pink to-play-blue"
            />
          </div>
          
          <div className="flex justify-between items-center pt-4">
            <div className="flex gap-1">
              {[0, 20, 40, 60, 80].map((val) => (
                <div 
                  key={val} 
                  className={`h-1 w-8 rounded-full ${score >= val ? 'bg-play-purple/50' : 'bg-play-elevated'}`} 
                />
              ))}
            </div>
            <div 
              className="px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest"
              style={{ backgroundColor: getBandColor(band) }}
            >
              {band}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
