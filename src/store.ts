// src/store.ts
import { create } from 'zustand';
import type { Candidate, Job } from './types';

interface RecruitmentStore {
  candidates: Candidate[];
  jobs: Job[];
  activeTab: 'dashboard' | 'candidates' | 'organization';
  setActiveTab: (tab: 'dashboard' | 'candidates' | 'organization') => void;
  addCandidate: (candidate: Candidate) => void;
  generateRandomCandidate: () => void;
  updateCandidateStage: (id: string, stage: Candidate['stage']) => void;
  updateCandidateAnalysis: (id: string, analysis: Candidate['aiAnalysis']) => void;
}

const initialJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    description: 'We are looking for a React expert with TypeScript experience and solid UI/UX sense.',
    requirements: ['React', 'TypeScript', 'Tailwind', '3+ Years Experience']
  }
];

const names = ["Sarah Wijaya", "Alex Rivera", "Taufik Hidayat", "Jessica Chen", "Michael Scott"];
const resumes = [
  "Senior Web Dev with 5 years in React and Next.js. I love building clean UI with Tailwind and managing state with Zustand.",
  "Frontend enthusiast focused on Vue and React. 2 years experience, looking for a senior role to grow further.",
  "Fullstack developer transition to Frontend. Strong Logic in Node.js but loves CSS and Framer Motion.",
  "Creative Developer with a background in UI Design. Expert in React, Figma, and responsive web design.",
  "Lead Engineer with 10 years experience. Expert in everything JS, architectural patterns, and mentoring teams."
];

export const useRecruitmentStore = create<RecruitmentStore>((set) => ({
  candidates: [
    {
      id: 'c1',
      name: 'Budi Santoso',
      email: 'budi@example.com',
      roleApplied: 'Senior Frontend Engineer',
      stage: 'applied',
      resumeText: "Experienced React Developer with 4 years of experience using Redux, TypeScript, and Node.js. Built 5 enterprise dashboards.",
      appliedAt: new Date().toISOString()
    }
  ],
  jobs: initialJobs,
  activeTab: 'dashboard',
  setActiveTab: (activeTab) => set({ activeTab }),
  
  addCandidate: (c) => set((state) => ({ candidates: [c, ...state.candidates] })),

  generateRandomCandidate: () => {
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomResume = resumes[Math.floor(Math.random() * resumes.length)];
    const newCandidate: Candidate = {
      id: Math.random().toString(36).substr(2, 9),
      name: randomName,
      email: `${randomName.toLowerCase().replace(' ', '.')}@example.com`,
      roleApplied: 'Senior Frontend Engineer',
      stage: 'applied',
      resumeText: randomResume,
      appliedAt: new Date().toISOString()
    };
    set((state) => ({ candidates: [newCandidate, ...state.candidates] }));
  },

  updateCandidateStage: (id, stage) =>
    set((state) => ({
      candidates: state.candidates.map((c) => (c.id === id ? { ...c, stage } : c)),
    })),
    
  updateCandidateAnalysis: (id, analysis) =>
    set((state) => ({
      candidates: state.candidates.map((c) => (c.id === id ? { ...c, aiAnalysis: analysis } : c)),
    })),
}));