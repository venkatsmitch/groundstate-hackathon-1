import React from 'react';
import { motion } from 'motion/react';

interface ScoreDialProps {
  score: number;
  potentialScore?: number;
  band: string;
}

export const ScoreDial: React.FC<ScoreDialProps> = ({ score, potentialScore, band }) => {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const potentialOffset = potentialScore ? circumference - (potentialScore / 100) * circumference : offset;

  return (
    <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-royal-purple/10 blur-[60px] rounded-full" />
      
      <svg className="w-full h-full -rotate-90 transform">
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#CA0F88" />
            <stop offset="50%" stopColor="#5C05A5" />
            <stop offset="100%" stopColor="#4900FF" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Background Track */}
        <circle
          cx="128"
          cy="128"
          r={radius}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="12"
          fill="transparent"
          className="translate-x-[-128px] translate-y-[-128px]"
        />

        {/* Potential Score (Ghost) */}
        {potentialScore && potentialScore > score && (
          <motion.circle
            cx="128"
            cy="128"
            r={radius}
            stroke="url(#scoreGradient)"
            strokeWidth="12"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: potentialOffset }}
            fill="transparent"
            strokeOpacity="0.2"
            strokeLinecap="round"
            className="translate-x-[-128px] translate-y-[-128px]"
          />
        )}

        {/* Main Score */}
        <motion.circle
          cx="128"
          cy="128"
          r={radius}
          stroke="url(#scoreGradient)"
          strokeWidth="12"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          fill="transparent"
          strokeLinecap="round"
          filter="url(#glow)"
          className="translate-x-[-128px] translate-y-[-128px]"
        />
      </svg>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <motion.span 
          key={score}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-6xl font-black tracking-tighter bg-gradient-to-br from-red-violet via-royal-purple to-electric-blue bg-clip-text text-transparent leading-none"
        >
          {score.toFixed(1)}
        </motion.span>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mt-2">Baseline Score</span>
        <div className="mt-3 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/60">
          {band}
        </div>
      </div>
    </div>
  );
};
