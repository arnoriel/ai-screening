// src/App.tsx
import { useRecruitmentStore } from './store';
import { CandidateCard } from './components/CandidateCard';
import { 
  LayoutDashboard, Users, Settings, Plus, Search, 
  Filter, Sparkles, Building2, ShieldCheck, Mail 
} from 'lucide-react';

function App() {
  const { candidates, jobs, activeTab, setActiveTab, generateRandomCandidate } = useRecruitmentStore();
  const activeJob = jobs[0];

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                <div>
                  <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm mb-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                    Active Campaign
                  </div>
                  <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">{activeJob.title}</h2>
                  <p className="text-slate-500 mt-2 font-medium">{activeJob.department} Team • 24 days remaining</p>
                </div>
                
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                    <Filter size={18}/> Filter
                  </button>
                  <button 
                    onClick={generateRandomCandidate}
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                  >
                    <Plus size={18}/> New Applicant
                  </button>
                </div>
              </div>

              <section>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold flex items-center gap-2 text-slate-800">
                    Recent Applications 
                    <span className="bg-indigo-100 text-indigo-600 text-xs py-0.5 px-2 rounded-full font-bold">{candidates.length}</span>
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-6">
                  {candidates.map((candidate) => (
                    <CandidateCard key={candidate.id} candidate={candidate} job={activeJob} />
                  ))}
                </div>
              </section>
          </div>
        );

      case 'candidates':
        return (
          <div className="animate-in fade-in duration-500">
            <h2 className="text-3xl font-bold mb-6">Candidate Database</h2>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase">Name</th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase">Role</th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase">Stage</th>
                    <th className="px-6 py-4 text-sm font-bold text-slate-500 uppercase">AI Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {candidates.map(c => (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-900">{c.name}</td>
                      <td className="px-6 py-4 text-slate-500">{c.roleApplied}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">{c.stage}</span>
                      </td>
                      <td className="px-6 py-4 font-bold text-indigo-600">{c.aiAnalysis?.score || '-'}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'organization':
        return (
          <div className="animate-in fade-in duration-500 space-y-6">
            <h2 className="text-3xl font-bold mb-2">Organization Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <OrgCard icon={<Building2 className="text-indigo-600"/>} title="Company Profile" desc="Manage your brand identity and recruitment pages." />
              <OrgCard icon={<Users className="text-emerald-600"/>} title="Team Access" desc="Invite and manage recruiters or hiring managers." />
              <OrgCard icon={<ShieldCheck className="text-amber-600"/>} title="AI Governance" desc="Configure screening strictness and API limits." />
              <OrgCard icon={<Mail className="text-rose-600"/>} title="Email Templates" desc="Automate rejection or interview invitation emails." />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900">
      <aside className="w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-8">
          <div className="flex items-center gap-3 px-2 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
               <Sparkles className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black tracking-tight">Recruit<span className="text-indigo-600">AI</span></h1>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1.5">
          <NavItem 
            icon={<LayoutDashboard size={20}/>} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')}
          />
          <NavItem 
            icon={<Users size={20}/>} 
            label="All Candidates" 
            active={activeTab === 'candidates'} 
            onClick={() => setActiveTab('candidates')}
          />
          <NavItem 
            icon={<Settings size={20}/>} 
            label="Organization" 
            active={activeTab === 'organization'} 
            onClick={() => setActiveTab('organization')}
          />
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-5 text-white shadow-xl shadow-indigo-100">
            <p className="text-sm font-medium opacity-80">AI Credits</p>
            <p className="text-2xl font-bold mt-1">1,240</p>
            <div className="w-full bg-white/20 h-1.5 rounded-full mt-3">
               <div className="bg-white h-full w-3/4 rounded-full" />
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0 flex flex-col">
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-400 transition-all text-sm"
            />
          </div>
          <div className="flex items-center gap-3">
             <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900">Recruiter</p>
                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Admin Role</p>
             </div>
             <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-slate-200 to-slate-100 border border-slate-200 shadow-sm flex items-center justify-center font-bold text-slate-500">A</div>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto w-full">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={`
      w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all
      ${active 
        ? 'bg-indigo-50 text-indigo-600' 
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
    `}>
      {icon}
      {label}
    </button>
  );
}

function OrgCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-200 hover:shadow-lg transition-all cursor-pointer group">
      <div className="h-12 w-12 bg-slate-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

export default App;