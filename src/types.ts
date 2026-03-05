export type ScoreBand = 'Compromised' | 'Fair' | 'Good' | 'Optimal' | 'Elite';

export interface Biomarker {
  id: string;
  name: string;
  category: string;
  value: number;
  unit: string;
  status: 'Critical' | 'Suboptimal' | 'Optimal';
  impact: number; // How much it contributes to the score
}

export interface Intervention {
  id: string;
  name: string;
  category: 'Supplement' | 'Diet' | 'Exercise' | 'Sleep' | 'Stress' | 'Lifestyle';
  impact: number; // Potential score increase
  biomarkersAffected: string[]; // IDs of biomarkers this action improves
  touchPoints?: {
    title: string;
    description: string;
  }[];
}

export interface BaselineState {
  currentScore: number;
  potentialScore: number;
  band: ScoreBand;
  biomarkers: Biomarker[];
  activeInterventions: string[];
}
