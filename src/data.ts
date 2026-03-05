import { Biomarker, Intervention } from './types';

export const MOCK_BIOMARKERS: Biomarker[] = [
  { id: 'b12', name: 'Vitamin B12', category: 'Nutrients', value: 148, unit: 'pg/mL', status: 'Suboptimal', impact: 15 },
  { id: 'vitd', name: 'Vitamin D', category: 'Nutrients', value: 28.84, unit: 'ng/mL', status: 'Critical', impact: 18 },
  { id: 'bmi', name: 'BMI', category: 'Composition', value: 24, unit: 'kg/m²', status: 'Suboptimal', impact: 10 },
  { id: 'crp', name: 'hs-CRP', category: 'Inflammation', value: 1, unit: 'mg/L', status: 'Suboptimal', impact: 12 },
  { id: 'testo', name: 'Free Testosterone', category: 'Hormones', value: 4.22, unit: 'ng/mL', status: 'Suboptimal', impact: 14 },
  { id: 'homo', name: 'Homocysteine', category: 'Metabolic', value: 12.89, unit: 'umol/L', status: 'Suboptimal', impact: 10 },
  { id: 'vo2max', name: 'VO2 Max', category: 'Fitness', value: 35, unit: 'ml/kg/min', status: 'Suboptimal', impact: 20 },
  { id: 'hdl', name: 'HDL Cholesterol', category: 'Lipids', value: 42, unit: 'mg/dL', status: 'Suboptimal', impact: 8 },
];

export const MOCK_INTERVENTIONS: Intervention[] = [
  { 
    id: 'strength', 
    name: 'Strength Training', 
    category: 'Exercise', 
    impact: 3.2, 
    biomarkersAffected: ['bmi', 'testo', 'hdl'],
    touchPoints: [
      { title: 'TOUCH POINT 1', description: 'Start this action and follow it consistently.' },
      { title: 'TOUCH POINT 2', description: 'Track score lift and related biomarkers weekly.' }
    ]
  },
  { 
    id: 'endurance', 
    name: 'Endurance', 
    category: 'Exercise', 
    impact: 3.0, 
    biomarkersAffected: ['vo2max', 'hdl'],
    touchPoints: [
      { title: 'TOUCH POINT 1', description: 'Start this action and follow it consistently.' },
      { title: 'TOUCH POINT 2', description: 'Track score lift and related biomarkers weekly.' }
    ]
  },
  { 
    id: 'anti_inflammatory', 
    name: 'Anti inflammatory', 
    category: 'Diet', 
    impact: 2.5, 
    biomarkersAffected: ['hdl', 'crp', 'homo'],
    touchPoints: [
      { title: 'TOUCH POINT 1', description: 'Start this action and follow it consistently.' },
      { title: 'TOUCH POINT 2', description: 'Track score lift and related biomarkers weekly.' }
    ]
  },
  { 
    id: 'high_protein', 
    name: 'High protein', 
    category: 'Diet', 
    impact: 2.2, 
    biomarkersAffected: ['bmi', 'homo'],
    touchPoints: [
      { title: 'TOUCH POINT 1', description: 'Start this action and follow it consistently.' },
      { title: 'TOUCH POINT 2', description: 'Track score lift and related biomarkers weekly.' }
    ]
  },
  { id: 'vitamin_d', name: 'Vitamin D', category: 'Supplement', impact: 3.5, biomarkersAffected: ['vitd'] },
  { id: 'vitamin_b12', name: 'Vitamin B12', category: 'Supplement', impact: 2.8, biomarkersAffected: ['b12'] },
  { id: 'sleep_protocol', name: 'Sleep protocol', category: 'Sleep', impact: 3.0, biomarkersAffected: ['crp', 'testo'] },
  { id: 'fix_stress', name: 'Fix stress', category: 'Stress', impact: 2.8, biomarkersAffected: ['crp', 'testo'] },
  { id: 'stop_alcohol', name: 'Stop Alcohol', category: 'Lifestyle', impact: 2.8, biomarkersAffected: ['crp', 'bmi'] },
  { id: 'stop_smoking', name: 'Stop Smoking', category: 'Lifestyle', impact: 4.5, biomarkersAffected: ['vo2max', 'crp', 'hdl'] },
];

export const getBand = (score: number): string => {
  if (score >= 85) return 'Elite';
  if (score >= 70) return 'Healthy';
  if (score >= 55) return 'Stable';
  if (score >= 40) return 'Struggling';
  return 'Compromised';
};

export const getBandColor = (band: string): string => {
  if (band === 'Elite') return '#A78BFA'; // Purple
  if (band === 'Healthy') return '#71F0FF'; // Mint
  if (band === 'Stable') return '#F4C764'; // Yellow
  if (band === 'Struggling') return '#FB923C'; // Orange
  if (band === 'Compromised') return '#F17968'; // Red
  return '#94A3B8';
};
