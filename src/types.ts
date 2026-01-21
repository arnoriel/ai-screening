// src/types.ts

export type Stage = 'applied' | 'screening' | 'interview' | 'hired' | 'rejected';

export interface AIAnalysis {
  score: number; // 0-100
  summary: string;
  pros: string[];
  cons: string[];
  matchReasoning: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  roleApplied: string;
  resumeText: string; // Dalam real app, ini hasil parsing PDF
  stage: Stage;
  aiAnalysis?: AIAnalysis; // Optional, ada jika sudah discreening
  appliedAt: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  description: string;
  requirements: string[];
}