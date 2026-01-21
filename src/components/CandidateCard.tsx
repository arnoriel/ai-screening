import React, { useState } from 'react';
import type { Candidate, Job } from '../types';
import { screenCandidateWithAI } from '../services/ai';
import { useRecruitmentStore } from '../store';
import { BrainCircuit, CheckCircle2, XCircle, Loader2, Mail, Briefcase, Sparkles, ChevronRight } from 'lucide-react';

interface Props {
  candidate: Candidate;
  job: Job;
}

export const CandidateCard: React.FC<Props> = ({ candidate, job }) => {
  const { updateCandidateAnalysis } = useRecruitmentStore();
  const [loading, setLoading] = useState(false);

  const handleScreening = async () => {
    setLoading(true);
    try {
      const analysis = await screenCandidateWithAI(candidate.resumeText, job.description, job.requirements);
      updateCandidateAnalysis(candidate.id, analysis);
    } catch (err) {
      alert("AI Screening Failed.");
    } finally {
      setLoading(false);
    }
  };

  const score = candidate.aiAnalysis?.score || 0;
  const getScoreStatus = (s: number) => {
    if (s >= 80) return { color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', bar: 'bg-emerald-500' };
    if (s >= 60) return { color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', bar: 'bg-amber-500' };
    return { color: 'text-slate-500', bg: 'bg-slate-50', border: 'border-slate-100', bar: 'bg-slate-400' };
  };

  const status = getScoreStatus(score);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-100">
              {candidate.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{candidate.name}</h3>
              <div className="flex items-center gap-3 mt-1 text-slate-500 text-sm">
                <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5"/> {candidate.email}</span>
                <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5"/> {candidate.roleApplied}</span>
              </div>
            </div>
          </div>

          {!candidate.aiAnalysis ? (
            <button 
              onClick={handleScreening}
              disabled={loading}
              className="relative inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-semibold overflow-hidden hover:bg-indigo-600 disabled:opacity-70 transition-all active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin w-4 h-4"/> : <Sparkles className="w-4 h-4"/>}
              Analyze with AI
            </button>
          ) : (
            <div className={`flex flex-col items-end`}>
               <div className={`px-4 py-1.5 rounded-full text-sm font-bold border ${status.bg} ${status.color} ${status.border} flex items-center gap-2`}>
                <BrainCircuit className="w-4 h-4" /> Match Score: {score}%
              </div>
            </div>
          )}
        </div>

        {/* AI Analysis Result Section */}
        {candidate.aiAnalysis ? (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="md:col-span-2 space-y-4">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">AI Executive Summary</h4>
                <p className="text-slate-700 leading-relaxed text-sm">{candidate.aiAnalysis.summary}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-emerald-600 uppercase flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Strengths</h4>
                  {candidate.aiAnalysis.pros.map((p, i) => (
                    <div key={i} className="text-sm text-slate-600 flex items-start gap-2 bg-emerald-50/50 p-2 rounded-lg">
                      <div className="w-1 h-1 rounded-full bg-emerald-400 mt-2" /> {p}
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-rose-500 uppercase flex items-center gap-1"><XCircle className="w-3 h-3"/> Gaps</h4>
                  {candidate.aiAnalysis.cons.map((c, i) => (
                    <div key={i} className="text-sm text-slate-600 flex items-start gap-2 bg-rose-50/50 p-2 rounded-lg">
                      <div className="w-1 h-1 rounded-full bg-rose-400 mt-2" /> {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-indigo-50/30 rounded-2xl p-5 border border-indigo-100/50 flex flex-col justify-center text-center">
              <div className="relative w-24 h-24 mx-auto mb-3">
                 <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path className="text-indigo-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="text-indigo-600" strokeWidth="3" strokeDasharray={`${score}, 100`} strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl text-indigo-700">{score}%</div>
              </div>
              <p className="text-xs font-medium text-indigo-600 uppercase tracking-tighter">Match Probability</p>
              <button className="mt-4 text-xs font-bold text-slate-900 flex items-center justify-center gap-1 hover:underline">
                View Full Analysis <ChevronRight className="w-3 h-3"/>
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6 flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-dashed border-slate-200">
            <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center shadow-sm text-slate-400">
               <BrainCircuit className="w-5 h-5"/>
            </div>
            <p className="text-sm text-slate-500">AI screening has not been performed for this candidate yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};