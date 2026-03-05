import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Target, 
  ChevronLeft, 
  ChevronRight,
  Info, 
  TrendingUp, 
  LayoutDashboard,
  Bell,
  Pill,
  Utensils,
  Zap,
  Moon,
  CheckCircle2,
  ArrowRight,
  Search,
  User,
  Menu,
  Sparkles,
  Wand2,
  Trophy,
  Heart,
  Gift,
  PartyPopper,
  Star
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ScoreOverview } from './components/ScoreOverview';
import { BiomarkerCard } from './components/BiomarkerCard';
import { ActionToggle } from './components/ActionToggle';
import { TargetSetter } from './components/TargetSetter';
import { TrendGraph } from './components/TrendGraph';
import { MOCK_BIOMARKERS, MOCK_INTERVENTIONS, getBand } from './data';
import { Intervention } from './types';

type Mode = 'dashboard' | 'modeling' | 'target' | 'actionDetail' | 'biomarkerDetail';

export default function App() {
  const [mode, setMode] = useState<Mode>('dashboard');
  const [activeInterventions, setActiveInterventions] = useState<string[]>([]);
  const [targetScore, setTargetScore] = useState(85);
  const [selectedAction, setSelectedAction] = useState<Intervention | null>(null);
  const [selectedBiomarker, setSelectedBiomarker] = useState<any | null>(null);
  const [priority, setPriority] = useState<string[]>([]);
  const [timeframe, setTimeframe] = useState<'weeks' | 'months'>('weeks');
  const [showTargetSetter, setShowTargetSetter] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('Exercise');
  const [committedToday, setCommittedToday] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [xp, setXp] = useState(1250);
  const [streak, setStreak] = useState(3);
  const [praiseMessage, setPraiseMessage] = useState('');

  const baseScore = 63.7;

  const PRAISE_MESSAGES = [
    "You're in the top 5% of health-conscious users today!",
    "Your cellular resilience is trending towards Elite status.",
    "A billion-dollar body starts with this single decision.",
    "You've unlocked a hidden metabolic advantage!",
    "Your consistency is outperforming 92% of your peer group."
  ];

  const handleSurpraise = () => {
    const unselected = MOCK_INTERVENTIONS.filter(i => !activeInterventions.includes(i.id));
    if (unselected.length > 0) {
      const random = unselected[Math.floor(Math.random() * unselected.length)];
      toggleIntervention(random.id);
      setPraiseMessage(PRAISE_MESSAGES[Math.floor(Math.random() * PRAISE_MESSAGES.length)]);
      setXp(prev => prev + 50);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#CA0F88', '#5C05A5', '#FBBF24']
      });
    }
  };
  
  const currentScore = useMemo(() => {
    const boost = activeInterventions.reduce((acc, id) => {
      const action = MOCK_INTERVENTIONS.find(a => a.id === id);
      return acc + (action?.impact || 0);
    }, 0);
    return Math.min(99, baseScore + boost);
  }, [activeInterventions]);

  const toggleIntervention = (id: string) => {
    setActiveInterventions(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const requiredActions = useMemo(() => {
    if (mode !== 'target') return [];
    const needed = targetScore - baseScore;
    let accumulated = 0;
    const actions = [];
    
    const sorted = [...MOCK_INTERVENTIONS].sort((a, b) => {
      const aPriority = priority.includes(a.category) ? 1 : 0;
      const bPriority = priority.includes(b.category) ? 1 : 0;
      if (aPriority !== bPriority) return bPriority - aPriority;
      return b.impact - a.impact;
    });
    
    for (const action of sorted) {
      if (accumulated < needed) {
        actions.push(action);
        accumulated += action.impact;
      }
    }
    return actions;
  }, [targetScore, mode, priority]);

  const handleCommit = () => {
    setCommittedToday(true);
    setShowCelebration(true);
    setXp(prev => prev + 250);
    setStreak(prev => prev + 1);
    setPraiseMessage("Legendary consistency! You've just secured your spot in the Gold League.");
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#CA0F88', '#5C05A5', '#4900FF']
    });
  };

  return (
    <div className="min-h-screen bg-play-bg flex flex-col font-sans selection:bg-play-pink selection:text-white">
      {/* Playground Widget Container */}
      <div className="flex-1 flex flex-col max-w-6xl w-full mx-auto md:p-8 pb-24 md:pb-8">
        <div className="playground-widget flex-1 flex flex-col overflow-hidden bg-play-bg md:rounded-[2.5rem] border border-play-border">
          
          {/* Header */}
          <header className="p-4 md:p-6 flex items-center justify-between border-b border-play-border bg-play-bg sticky top-0 z-50">
            <div className="flex items-center gap-4">
              {mode !== 'dashboard' && (
                <button 
                  onClick={() => setMode('dashboard')}
                  className="w-10 h-10 flex items-center justify-center bg-play-elevated rounded-xl border border-play-border text-play-pink hover:scale-110 transition-transform"
                >
                  <ChevronLeft size={20} />
                </button>
              )}
              <div className="flex flex-col">
                <h1 className="text-sm font-black tracking-tight text-play-ink uppercase">
                  {mode === 'dashboard' ? 'Deep Holistics' : mode === 'modeling' ? 'Action Modeler' : 'Score Journey'}
                </h1>
                <div className="flex items-center gap-2">
                  <div className="h-1 w-24 bg-play-elevated rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(xp % 1000) / 10}%` }}
                      className="h-full bg-play-pink"
                    />
                  </div>
                  <span className="text-[8px] font-black text-play-muted uppercase">LVL {Math.floor(xp / 1000)}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 bg-play-elevated border border-play-border rounded-full flex items-center gap-2">
                <span className="text-lg">🔥</span>
                <span className="text-xs font-black text-play-ink">{streak} DAYS</span>
              </div>
              <div className="hidden md:flex px-3 py-1.5 bg-play-yellow/10 border border-play-yellow/20 rounded-full items-center gap-2">
                <Trophy size={14} className="text-play-yellow" />
                <span className="text-[10px] font-black text-play-yellow uppercase">Gold League</span>
              </div>
            </div>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 p-6 md:p-12 overflow-y-auto">
            <AnimatePresence mode="wait">
              {mode === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-10"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 bg-play-pink/10 text-play-pink rounded text-[8px] font-black uppercase tracking-widest">Elite Access</span>
                          <span className="text-[10px] font-bold text-play-muted uppercase tracking-widest">Global Rank: #1,284</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-play-ink tracking-tight mb-2">The Playground</h1>
                        <p className="text-play-muted font-bold uppercase tracking-widest text-[10px] md:text-xs italic">"Your future self is thanking you for today's decisions."</p>
                      </div>
                      <div className="flex gap-3">
                        <button 
                          onClick={handleSurpraise}
                          className="play-btn bg-gradient-to-r from-play-yellow to-orange-500 text-play-bg hover:scale-105 transition-transform shadow-lg shadow-play-yellow/20 group"
                        >
                          <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                          Mystery Reveal
                        </button>
                        <button 
                          onClick={() => setMode('modeling')}
                          className="play-btn play-btn-primary w-full md:w-auto justify-center group"
                        >
                          <Wand2 size={18} className="group-hover:translate-x-1 transition-transform" />
                          Action Modeler
                        </button>
                      </div>
                    </div>

                    {praiseMessage && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 bg-play-pink/10 border border-play-pink/20 rounded-2xl flex items-center gap-4"
                      >
                        <div className="w-10 h-10 rounded-full bg-play-pink flex items-center justify-center text-white shadow-lg shadow-play-pink/20">
                          <Star size={20} fill="currentColor" />
                        </div>
                        <div>
                          <div className="text-[8px] font-black text-play-pink uppercase tracking-widest mb-1">Praise Received</div>
                          <p className="text-sm font-black text-play-ink">{praiseMessage}</p>
                        </div>
                      </motion.div>
                    )}

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-12">
                      <ScoreOverview 
                        score={currentScore} 
                        band={getBand(currentScore)} 
                        projectedImprovement={currentScore - baseScore}
                        baseScore={baseScore}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      <TrendGraph currentScore={currentScore} />
                      
                      <div className="space-y-8">
                        {/* AI Coach Card */}
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className="play-card p-6 bg-play-ink border-play-purple/30 relative overflow-hidden group"
                        >
                          <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Activity size={60} className="text-play-pink" />
                          </div>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-play-pink/20 flex items-center justify-center">
                              <Zap size={16} className="text-play-pink" />
                            </div>
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">Coach Insight</span>
                          </div>
                          <p className="text-sm font-bold text-white/80 leading-relaxed">
                            "Your Vitamin D levels are the biggest bottleneck to your next 5-point jump. Focus on that today."
                          </p>
                        </motion.div>

                        {/* Daily Quest Card */}
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className="play-card p-8 bg-play-elevated border-play-border relative overflow-hidden group cursor-pointer"
                        >
                          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Trophy size={80} />
                          </div>
                          <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-4">
                              <span className="px-2 py-1 bg-play-yellow/10 text-play-yellow rounded-md text-[8px] font-black uppercase tracking-widest">Active Quest</span>
                              <span className="text-[10px] font-black text-play-muted uppercase tracking-widest">4h 12m Left</span>
                            </div>
                            <h3 className="text-xl font-black text-play-ink mb-2">The Power of Three</h3>
                            <p className="text-xs text-play-muted font-medium mb-6">Activate 3 actions today to secure your Gold League position.</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-play-bg flex items-center justify-center text-play-yellow border border-play-border">
                                  <Zap size={16} />
                                </div>
                                <span className="text-xs font-black text-play-ink">+250 XP</span>
                              </div>
                              <button 
                                onClick={() => setMode('modeling')}
                                className="text-[10px] font-black text-play-pink uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all"
                              >
                                Enter Modeler <ArrowRight size={12} />
                              </button>
                            </div>
                          </div>
                        </motion.div>

                        {/* Surpraise Insight Card */}
                        <motion.div 
                          whileHover={{ scale: 1.02 }}
                          className="play-card p-8 bg-gradient-to-br from-play-purple/20 to-play-pink/20 border-play-purple/20 relative overflow-hidden cursor-pointer group"
                          onClick={handleSurpraise}
                        >
                          <div className="flex items-center gap-6 relative z-10">
                            <div className="w-16 h-16 bg-play-bg rounded-3xl flex items-center justify-center text-3xl shadow-2xl border border-play-border group-hover:rotate-12 transition-transform">
                              ✨
                            </div>
                            <div>
                              <h3 className="text-lg font-black text-play-ink">Mystery Boost</h3>
                              <p className="text-[10px] font-bold text-play-muted uppercase tracking-widest">Tap to reveal your daily praise</p>
                            </div>
                          </div>
                          <div className="absolute top-0 right-0 p-4">
                            <Sparkles className="text-play-yellow animate-pulse" />
                          </div>
                          
                          {praiseMessage && (
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/10"
                            >
                              <p className="text-xs font-bold text-play-ink italic">"{praiseMessage}"</p>
                            </motion.div>
                          )}
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  <section className="space-y-8">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-black text-play-ink flex items-center gap-2">
                        Global Leaderboard 🏆
                      </h2>
                      <span className="text-[10px] font-black text-play-pink uppercase tracking-widest">Season 4</span>
                    </div>
                    <div className="play-card bg-play-card border-play-border overflow-hidden">
                      {[
                        { name: 'Alex M.', score: 98.4, rank: 1, avatar: '👤' },
                        { name: 'Sarah J.', score: 96.2, rank: 2, avatar: '👤' },
                        { name: 'You', score: currentScore, rank: 1284, avatar: '👤', isUser: true },
                        { name: 'Mike R.', score: 94.1, rank: 4, avatar: '👤' },
                      ].sort((a, b) => b.score - a.score).map((entry, i) => (
                        <div key={i} className={`flex items-center justify-between p-4 border-b border-play-border last:border-0 ${entry.isUser ? 'bg-play-pink/5' : ''}`}>
                          <div className="flex items-center gap-4">
                            <span className={`text-xs font-black ${entry.rank <= 3 ? 'text-play-yellow' : 'text-play-muted'}`}>#{entry.rank}</span>
                            <div className="w-8 h-8 rounded-full bg-play-elevated flex items-center justify-center border border-play-border">
                              {entry.avatar}
                            </div>
                            <span className={`text-sm font-black ${entry.isUser ? 'text-play-pink' : 'text-play-ink'}`}>{entry.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-black text-play-ink">{entry.score.toFixed(1)}</span>
                            <TrendingUp size={12} className="text-play-mint" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-8">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-black text-play-ink flex items-center gap-2">
                        Your Markers 🧪
                      </h2>
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">6 Active Markers</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {MOCK_BIOMARKERS.slice(0, 6).map(bm => (
                        <BiomarkerCard 
                          key={bm.id} 
                          biomarker={bm as any} 
                          onClick={() => {
                            setSelectedBiomarker(bm);
                            setMode('biomarkerDetail');
                          }}
                        />
                      ))}
                    </div>
                  </section>
                </motion.div>
              )}

              {mode === 'biomarkerDetail' && selectedBiomarker && (
                <motion.div
                  key="biomarkerDetail"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-8"
                >
                  <div className="flex items-center gap-4">
                    <button onClick={() => setMode('dashboard')} className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-play-purple hover:scale-110 transition-transform">
                      <ChevronLeft size={20} />
                    </button>
                    <h2 className="text-2xl font-black text-play-ink tracking-tight">Marker Details</h2>
                  </div>

                  <div className="play-card p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-40 h-40 bg-play-purple/5 rounded-full blur-3xl" />
                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
                      <div className="w-24 h-24 md:w-32 md:h-32 bg-play-bg rounded-[2rem] flex items-center justify-center text-5xl md:text-6xl shadow-inner border-4 border-white">
                        {(() => {
                          const n = selectedBiomarker.name.toLowerCase();
                          if (n.includes('b12')) return '💊';
                          if (n.includes('vitd')) return '☀️';
                          if (n.includes('bmi')) return '⚖️';
                          if (n.includes('crp')) return '🔥';
                          if (n.includes('testo')) return '💪';
                          if (n.includes('homo')) return '🧬';
                          return '🧪';
                        })()}
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <div className="inline-block px-4 py-1.5 bg-play-purple/10 rounded-full text-[10px] font-black uppercase tracking-widest text-play-purple mb-4">
                          {selectedBiomarker.category}
                        </div>
                        <h3 className="text-3xl md:text-4xl font-black text-play-ink mb-2">{selectedBiomarker.name}</h3>
                        <div className="flex items-baseline justify-center md:justify-start gap-2 mb-6">
                          <span className="text-5xl font-black text-play-purple">{selectedBiomarker.value}</span>
                          <span className="text-lg font-bold text-slate-300 uppercase">{selectedBiomarker.unit}</span>
                        </div>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4">
                          <div className="px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</div>
                            <div className="text-sm font-black text-play-ink">{selectedBiomarker.status}</div>
                          </div>
                          <div className="px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Score Impact</div>
                            <div className="text-sm font-black text-play-ink">{selectedBiomarker.impact} pts</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <section className="space-y-6">
                    <h3 className="text-xl font-black text-play-ink">Recommended Actions ⚡</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {MOCK_INTERVENTIONS.filter(i => i.biomarkersAffected.includes(selectedBiomarker.id)).map(action => (
                        <ActionToggle 
                          key={action.id} 
                          action={action} 
                          isActive={activeInterventions.includes(action.id)}
                          onToggle={() => toggleIntervention(action.id)}
                        />
                      ))}
                    </div>
                  </section>
                </motion.div>
              )}

              {mode === 'modeling' && (
                <motion.div
                  key="modeling"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  <div className="sticky top-0 z-30 -mx-6 px-6 pb-4 bg-play-bg/80 backdrop-blur-md">
                    <div className="play-card bg-play-card border-play-border relative overflow-hidden shadow-2xl">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-play-pink via-play-purple to-play-blue" />
                      <div className="p-4">
                        <div className="text-[10px] font-black text-play-muted uppercase tracking-[0.2em] mb-4">Potential Achievement</div>
                        <div className="flex items-center gap-8">
                          <div className="flex flex-col">
                            <span className="text-4xl font-black text-play-muted">{Math.round(baseScore)}</span>
                            <span className="text-[8px] font-black text-play-muted uppercase tracking-widest">Current</span>
                          </div>
                          <ArrowRight className="text-play-muted" size={24} />
                          <div className="flex flex-col">
                            <span className="text-6xl font-black gradient-text">{Math.round(currentScore)}</span>
                            <span className="text-[8px] font-black text-play-pink uppercase tracking-widest">Projected</span>
                          </div>
                          <div className="ml-auto flex flex-col items-end gap-2">
                            <motion.div 
                              key={currentScore}
                              initial={{ scale: 1.2 }}
                              animate={{ scale: 1 }}
                              className="px-4 py-2 bg-play-mint/10 text-play-mint rounded-full text-sm font-black"
                            >
                              +{(currentScore - baseScore).toFixed(1)}
                            </motion.div>
                            <div className="text-[10px] font-black text-play-muted uppercase tracking-widest">Points Boost</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <section className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-black text-play-ink">Choose Your Actions</h2>
                      <button 
                        onClick={() => setActiveInterventions([])}
                        className="text-[10px] font-black text-play-muted uppercase tracking-widest hover:text-play-pink transition-colors flex items-center gap-1"
                      >
                        ↺ Reset all
                      </button>
                    </div>

                    <div className="flex flex-col gap-8">
                      {/* Category Tabs */}
                      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-play-border">
                        {['Exercise', 'Diet', 'Sleep', 'Stress', 'Supplement', 'Lifestyle'].map(cat => {
                          const count = MOCK_INTERVENTIONS.filter(i => i.category === cat && activeInterventions.includes(i.id)).length;
                          return (
                            <button
                              key={cat}
                              onClick={() => setActiveCategory(cat)}
                              className={`px-4 py-3 text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border-b-2 flex items-center gap-2 ${activeCategory === cat ? 'text-play-ink border-play-pink' : 'text-play-muted border-transparent'}`}
                            >
                              {cat}
                              {count > 0 && <span className="w-4 h-4 rounded-full bg-play-pink text-white text-[8px] flex items-center justify-center">{count}</span>}
                            </button>
                          );
                        })}
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        {MOCK_INTERVENTIONS.filter(i => i.category === activeCategory).map(action => {
                          const isActive = activeInterventions.includes(action.id);
                          return (
                            <div key={action.id} className={`play-card border transition-all ${isActive ? 'border-play-pink/50 bg-play-pink/5' : 'border-play-border bg-play-elevated/50'}`}>
                              <button 
                                onClick={() => toggleIntervention(action.id)}
                                className="w-full flex items-center justify-between text-left p-2"
                              >
                                <div className="flex items-center gap-4">
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl border ${isActive ? 'bg-play-pink/20 border-play-pink/30' : 'bg-play-bg border-play-border'}`}>
                                    {(() => {
                                      switch (action.category) {
                                        case 'Exercise': return '⚡';
                                        case 'Diet': return '🥗';
                                        case 'Sleep': return '🌙';
                                        case 'Stress': return '🧘';
                                        case 'Supplement': return '💊';
                                        case 'Lifestyle': return '🌟';
                                        default: return '✨';
                                      }
                                    })()}
                                  </div>
                                  <div>
                                    <h4 className="text-base font-black text-play-ink">{action.name}</h4>
                                    <span className="text-[10px] font-black text-play-mint uppercase tracking-widest">+{action.impact} pts</span>
                                  </div>
                                </div>
                                <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${isActive ? 'bg-gradient-to-r from-play-pink to-play-blue border-transparent text-white shadow-lg shadow-play-pink/20' : 'border-play-border text-play-muted'}`}>
                                  {isActive ? <CheckCircle2 size={16} /> : <ArrowRight size={16} />}
                                </div>
                              </button>
                              
                              <AnimatePresence>
                                {isActive && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="pt-6 mt-4 border-t border-play-border/50 space-y-6 px-2 pb-2">
                                      <div>
                                        <div className="text-[8px] font-black text-play-muted uppercase tracking-widest mb-3">Daily Protocol</div>
                                        <ul className="text-xs text-play-muted space-y-2">
                                          {action.touchPoints?.map((tp, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                              <span className="w-1.5 h-1.5 rounded-full bg-play-pink mt-1.5 flex-shrink-0" />
                                              <span className="font-medium">{tp.description}</span>
                                            </li>
                                          )) || <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-play-pink mt-1.5 flex-shrink-0" />Follow your daily protocol consistently.</li>}
                                        </ul>
                                      </div>
                                      <div>
                                        <div className="text-[8px] font-black text-play-muted uppercase tracking-widest mb-3">Biomarkers Improving</div>
                                        <div className="flex flex-wrap gap-2">
                                          {action.biomarkersAffected.map(id => (
                                            <span key={id} className="px-3 py-1.5 bg-play-elevated border border-play-border rounded-lg text-[10px] font-black text-play-ink flex items-center gap-2">
                                              <div className="w-1.5 h-1.5 rounded-full bg-play-mint" />
                                              {MOCK_BIOMARKERS.find(b => b.id === id)?.name}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </section>

                  <div className="pt-8">
                    <button 
                      onClick={handleCommit}
                      disabled={activeInterventions.length === 0 || committedToday}
                      className="w-full play-btn play-btn-primary py-6 text-xl shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      {committedToday ? (
                        <span className="flex items-center gap-2 justify-center">
                          <CheckCircle2 size={24} /> Plan Committed!
                        </span>
                      ) : (
                        <span className="flex items-center gap-3 justify-center">
                          Commit to Today's Plan 
                          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">+ {75 + activeInterventions.length * 10} XP</span>
                        </span>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}

              {mode === 'target' && (
                <motion.div
                  key="target"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <button onClick={() => setMode('dashboard')} className="w-10 h-10 flex items-center justify-center bg-white rounded-xl shadow-sm text-play-purple hover:scale-110 transition-transform">
                        <ChevronLeft size={20} />
                      </button>
                      <div>
                        <h2 className="text-2xl md:text-3xl font-black text-play-ink tracking-tight">Score Journey 🗺️</h2>
                        <p className="text-slate-400 font-bold uppercase tracking-tighter text-[10px] md:text-xs">Your personalized path to optimal health</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowTargetSetter(!showTargetSetter)}
                      className="play-btn bg-white text-play-purple border border-play-purple/10 shadow-sm"
                    >
                      <Target size={18} />
                      {showTargetSetter ? 'View Journey' : 'Refine Goal'}
                    </button>
                  </div>

                  <AnimatePresence>
                    {showTargetSetter && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <TargetSetter 
                          currentScore={baseScore} 
                          targetScore={targetScore} 
                          onTargetChange={setTargetScore}
                          priority={priority}
                          onPriorityChange={setPriority}
                          timeframe={timeframe}
                          onTimeframeChange={setTimeframe}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="play-card p-8 bg-play-ink text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <TrendingUp size={120} />
                    </div>
                    <div className="flex items-center justify-around relative z-10">
                      <div className="text-center">
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Current Score</div>
                        <div className="text-4xl md:text-5xl font-black text-play-yellow">{baseScore.toFixed(1)}</div>
                      </div>
                      <ArrowRight size={32} className="text-white/20" />
                      <div className="text-center">
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Target Score</div>
                        <div className="text-4xl md:text-5xl font-black text-play-pink">{targetScore.toFixed(1)}</div>
                      </div>
                    </div>
                    <div className="mt-6 text-center text-[10px] font-black uppercase tracking-widest text-white/60">
                      +{ (targetScore - baseScore).toFixed(1) } projected improvement
                    </div>
                  </div>

                  <section className="relative py-10">
                    {/* Zigzag Line Background */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-play-yellow via-play-purple to-play-pink opacity-20 -translate-x-1/2 hidden md:block" />
                    
                    <div className="space-y-20 relative z-10">
                      {requiredActions.map((action, index) => {
                        const isEven = index % 2 === 0;
                        return (
                          <motion.div 
                            key={action.id}
                            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                          >
                            {/* Phase Card */}
                            <div className={`flex-1 w-full ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                              <div className={`play-card p-6 md:p-8 relative group hover:scale-[1.02] transition-transform cursor-pointer ${isEven ? 'md:mr-4' : 'md:ml-4'}`}
                                onClick={() => {
                                  setSelectedAction(action);
                                  setMode('actionDetail');
                                }}
                              >
                                <div className="flex items-center justify-between mb-4">
                                  <span className="text-[10px] font-black text-play-purple uppercase tracking-widest">PHASE {String(index + 1).padStart(2, '0')}</span>
                                  <span className="text-sm font-black text-play-yellow">+{action.impact.toFixed(1)} pts</span>
                                </div>
                                <h4 className="text-xl font-black text-play-ink mb-2">{action.name}</h4>
                                <div className="inline-block px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-bold text-slate-500 uppercase mb-6">
                                  {action.category}
                                </div>
                                
                                {action.touchPoints && (
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                                    {action.touchPoints.map((tp, i) => (
                                      <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-left">
                                        <div className="text-[9px] font-black text-play-purple uppercase tracking-tighter mb-1">{tp.title}</div>
                                        <p className="text-[10px] font-bold text-slate-500 leading-tight">{tp.description}</p>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Center Node */}
                            <div className="relative flex items-center justify-center">
                              <motion.div 
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 2, delay: index * 0.5 }}
                                className="w-12 h-12 rounded-full bg-white shadow-xl border-4 border-play-bg flex items-center justify-center z-20"
                              >
                                <div className={`w-4 h-4 rounded-full ${index === 0 ? 'bg-play-yellow' : index === 1 ? 'bg-play-purple' : 'bg-play-pink'}`} />
                              </motion.div>
                              {/* Connector for mobile */}
                              <div className="absolute top-12 bottom-0 w-1 bg-slate-100 md:hidden" />
                            </div>

                            <div className="flex-1 hidden md:block" />
                          </motion.div>
                        );
                      })}
                    </div>
                  </section>

                  <div className="p-10 bg-gradient-to-br from-play-purple/5 to-play-pink/5 rounded-[3rem] text-center border-2 border-dashed border-play-purple/20">
                    <PartyPopper size={48} className="mx-auto text-play-purple mb-4" />
                    <h3 className="text-xl font-black text-play-ink mb-2">Ready to start your journey?</h3>
                    <p className="text-sm font-bold text-slate-400 mb-8 max-w-sm mx-auto">Follow this roadmap to reach your target score of {targetScore} and unlock your elite health potential.</p>
                    <button 
                      onClick={() => {
                        confetti({
                          particleCount: 150,
                          spread: 100,
                          origin: { y: 0.6 }
                        });
                      }}
                      className="play-btn play-btn-primary px-12"
                    >
                      Activate Roadmap 🚀
                    </button>
                  </div>
                </motion.div>
              )}

              {mode === 'actionDetail' && selectedAction && (
                <motion.div
                  key="actionDetail"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12 pb-12"
                >
                  <div className="play-card p-10 md:p-12 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-play-purple/5 to-transparent" />
                    <div className="relative z-10">
                      <div className="w-24 h-24 md:w-28 md:h-28 bg-white border-2 border-slate-50 rounded-[2.5rem] flex items-center justify-center text-4xl md:text-5xl mx-auto mb-8 shadow-xl shadow-play-purple/10">
                        {(() => {
                          switch (selectedAction.category) {
                            case 'Supplement': return '💊';
                            case 'Diet': return '🥗';
                            case 'Exercise': return '⚡';
                            case 'Sleep': return '🌙';
                            case 'Stress': return '🧘';
                            case 'Lifestyle': return '🌟';
                            default: return '✨';
                          }
                        })()}
                      </div>
                      <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3 text-play-ink">{selectedAction.name}</h2>
                      <div className="inline-block px-6 py-2 bg-play-purple/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-play-purple mb-10">
                        {selectedAction.category} Power-up
                      </div>
                      
                      <div className="grid grid-cols-2 gap-8 border-t border-slate-50 pt-10">
                        <div className="text-center">
                          <div className="text-5xl md:text-6xl font-black text-play-purple tracking-tighter">+{selectedAction.impact}</div>
                          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-2">Score Boost</div>
                        </div>
                        <div className="text-center border-l border-slate-50">
                          <div className="text-5xl md:text-6xl font-black tracking-tighter text-play-ink">{Math.min(99, Math.round(baseScore + selectedAction.impact))}</div>
                          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-2">New Score</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <section className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-black text-play-ink">Impact Analysis 📊</h3>
                      <span className="text-[10px] font-black text-play-purple uppercase tracking-widest">{selectedAction.biomarkersAffected.length} Markers Optimized</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {selectedAction.biomarkersAffected.map(id => {
                        const bm = MOCK_BIOMARKERS.find(b => b.id === id);
                        if (!bm) return null;
                        return (
                          <div key={bm.id} className="play-card p-6 flex items-center justify-between group hover:border-play-purple/30 transition-colors">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-2xl bg-play-bg flex items-center justify-center text-2xl group-hover:scale-110 transition-all">
                                📈
                              </div>
                              <div>
                                <h4 className="text-base font-black text-play-ink">{bm.name}</h4>
                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.1em]">{bm.category}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-[10px] font-black text-play-purple uppercase tracking-[0.2em] mb-1">Target</div>
                              <div className="text-sm font-black text-play-ink">Optimal</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  <section className="p-8 md:p-10 bg-play-ink text-white rounded-[2.5rem] md:rounded-[3rem] relative overflow-hidden shadow-2xl">
                    <div className="relative z-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                          <Heart size={24} className="text-play-pink fill-play-pink" />
                        </div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Why it works</h3>
                      </div>
                      <p className="text-lg md:text-xl leading-relaxed text-white/90 font-bold italic">
                        "Implementing this {selectedAction.category.toLowerCase()} strategy will supercharge your {selectedAction.biomarkersAffected.map(id => MOCK_BIOMARKERS.find(b => b.id === id)?.name).join(', ')} levels. It's one of the most effective ways to hit your goals!"
                      </p>
                    </div>
                    <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-play-purple/10 blur-[100px] rounded-full"></div>
                  </section>

                  <button 
                    onClick={() => setMode('target')}
                    className="w-full py-6 play-card text-play-purple font-black text-xs tracking-[0.2em] uppercase hover:bg-play-purple hover:text-white transition-all flex items-center justify-center gap-3"
                  >
                    <ChevronLeft size={20} />
                    Back to Roadmap
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Celebration Modal */}
          <AnimatePresence>
            {showCelebration && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-play-bg/90 backdrop-blur-xl"
              >
                <motion.div 
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  className="play-card max-w-sm w-full p-10 text-center relative overflow-hidden border-play-purple/50 shadow-[0_0_50px_rgba(92,5,165,0.3)]"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-play-pink via-play-purple to-play-blue" />
                  <div className="text-6xl mb-6 animate-bounce">🏆</div>
                  <h2 className="text-3xl font-black text-play-ink mb-2">Legendary Move!</h2>
                  <p className="text-sm text-play-muted font-medium mb-6">"{praiseMessage || "You're outperforming 92% of users in your age group."}"</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-play-yellow/10 border border-play-yellow/20 rounded-2xl p-4">
                      <div className="text-2xl font-black text-play-yellow mb-1">+{75 + activeInterventions.length * 10}</div>
                      <div className="text-[8px] font-black text-play-yellow uppercase tracking-widest">XP Gained</div>
                    </div>
                    <div className="bg-play-pink/10 border border-play-pink/20 rounded-2xl p-4">
                      <div className="text-2xl font-black text-play-pink mb-1">{streak}</div>
                      <div className="text-[8px] font-black text-play-pink uppercase tracking-widest">Day Streak</div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setShowCelebration(false)}
                    className="w-full play-btn play-btn-primary py-4 justify-center"
                  >
                    Back to Dashboard →
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Navigation */}
          <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 flex items-center justify-around p-4 z-50 md:relative md:border-t-0 md:bg-play-ink md:text-white md:p-6">
            <button 
              onClick={() => setMode('dashboard')}
              className={`flex flex-col items-center gap-1 transition-all ${mode === 'dashboard' || mode === 'biomarkerDetail' ? 'text-play-purple scale-110 md:text-white' : 'text-slate-300 md:text-white/20'}`}
            >
              <LayoutDashboard size={24} />
              <span className="text-[10px] font-black uppercase tracking-widest">Home</span>
            </button>
            <button 
              onClick={() => setMode('modeling')}
              className={`flex flex-col items-center gap-1 transition-all ${mode === 'modeling' ? 'text-play-purple scale-110 md:text-white' : 'text-slate-300 md:text-white/20'}`}
            >
              <Wand2 size={24} />
              <span className="text-[10px] font-black uppercase tracking-widest">Play</span>
            </button>
            <button 
              onClick={() => setMode('target')}
              className={`flex flex-col items-center gap-1 transition-all ${mode === 'target' || mode === 'actionDetail' ? 'text-play-purple scale-110 md:text-white' : 'text-slate-300 md:text-white/20'}`}
            >
              <Trophy size={24} />
              <span className="text-[10px] font-black uppercase tracking-widest">Goal</span>
            </button>
          </nav>

        </div>
      </div>
    </div>
  );
}


