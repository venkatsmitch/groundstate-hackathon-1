import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

const data = [
  { date: "Jan", score: 58 },
  { date: "Feb", score: 62 },
  { date: "Mar", score: 60 },
  { date: "Apr", score: 65 },
  { date: "May", score: 61 },
];

interface TrendGraphProps {
  currentScore?: number;
}

export const TrendGraph: React.FC<TrendGraphProps> = ({ currentScore }) => {
  const chartData = [...data];
  if (currentScore !== undefined) {
    chartData.push({ date: "Jun", score: currentScore });
  }
  return (
    <div className="play-card h-full min-h-[400px] bg-play-card border-play-border">
      <div className="flex justify-between items-center mb-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-black uppercase tracking-widest text-play-pink">Baseline Trend</span>
            <span className="text-sm">📈</span>
          </div>
          <p className="text-[11px] text-play-muted font-bold uppercase tracking-tighter">Wellness Index History</p>
        </div>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="rgba(241, 243, 246, 0.05)" strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(241, 243, 246, 0.3)', fontSize: 10, fontWeight: 800 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(241, 243, 246, 0.3)', fontSize: 10, fontWeight: 800 }}
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0C0C0C', 
                border: '1px solid rgba(241, 243, 246, 0.1)',
                borderRadius: '16px',
                boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.5)',
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#F1F3F6'
              }}
              itemStyle={{ color: '#CA0F88' }}
              cursor={{ stroke: '#CA0F88', strokeWidth: 2, strokeDasharray: '5 5' }}
            />
            
            <ReferenceLine y={85} stroke="#71F0FF" strokeDasharray="5 5" strokeOpacity={0.3} label={{ value: 'Elite', position: 'insideRight', fill: '#71F0FF', fontSize: 10, fontWeight: 'bold' }} />
            
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="#FBBF24" 
              strokeWidth={4}
              dot={{ r: 6, fill: '#0C0C0C', stroke: '#FBBF24', strokeWidth: 3 }}
              activeDot={{ r: 8, fill: '#FBBF24', stroke: '#0C0C0C', strokeWidth: 3 }}
              animationDuration={2000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-6 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-play-yellow" />
          <span className="text-[9px] font-black text-play-muted uppercase tracking-widest">Score</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full border-2 border-play-mint border-dashed" />
          <span className="text-[9px] font-black text-play-muted uppercase tracking-widest">Target</span>
        </div>
      </div>
    </div>
  );
};
