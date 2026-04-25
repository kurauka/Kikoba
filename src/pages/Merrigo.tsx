import React from 'react';
import { 
  RotateCw, 
  User, 
  Calendar, 
  ArrowRight,
  TrendingUp,
  CircleCheck,
  CircleDashed,
  X,
  Target,
  Users,
  Coins
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Merrigo() {
  const [activeTab, setActiveTab] = React.useState('active');
  const [isCycleModalOpen, setIsCycleModalOpen] = React.useState(false);
  const [groupName, setGroupName] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [memberCount, setMemberCount] = React.useState('10');
  const [frequency, setFrequency] = React.useState('Monthly');
  const [loading, setLoading] = React.useState(false);

  const handleStartCycle = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsCycleModalOpen(false);
      alert(`New Merrigo cycle for "${groupName}" has been initialized!`);
      setGroupName('');
      setAmount('');
    }, 1500);
  };

  const groups = [
    {
      id: 'm1',
      name: 'Family Support Group',
      amount: 10000,
      totalMembers: 10,
      cycle: '4/10',
      nextPayout: 'May 15, 2026',
      beneficiary: 'Mercy Wanjiku',
      progress: 40,
      members: [
        { name: 'John Doe', status: 'completed' },
        { name: 'Jane Smith', status: 'completed' },
        { name: 'Amara Okafor', status: 'completed' },
        { name: 'Mercy Wanjiku', status: 'current' },
        { name: 'David Kim', status: 'pending' },
        { name: 'Sarah M.', status: 'pending' },
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Merrigo Rotations</h2>
          <p className="text-slate-500">Track your merry-go-round cycles and payouts.</p>
        </div>
        <button 
          onClick={() => setIsCycleModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
        >
          <RotateCw className="w-5 h-5" />
          Start New Cycle
        </button>
      </div>

      <div className="flex bg-slate-100 p-1 rounded-xl w-fit">
        <button 
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'active' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Active Groups
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === 'history' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Past Cycles
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {groups.map((group) => (
          <motion.div 
            key={group.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
          >
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Info Section */}
                <div className="lg:col-span-4 border-r border-slate-50 lg:pr-8">
                  <div className="inline-flex px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
                    Cycle in progress
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{group.name}</h3>
                  <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                    <Calendar className="w-4 h-4" />
                    Next payout on {group.nextPayout}
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-5 space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Contribution Amount</span>
                      <span className="font-bold text-slate-900">KES {group.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Total Pool</span>
                      <span className="font-bold text-indigo-600">KES {(group.amount * group.totalMembers).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Current Payout</span>
                      <span className="font-bold text-slate-900">{group.cycle} Rounds</span>
                    </div>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="lg:col-span-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                       <h4 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Beneficiary Rotation</h4>
                       <span className="text-sm font-bold text-indigo-600">{group.progress}% Complete</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-8">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${group.progress}%` }}
                        className="h-full bg-indigo-500 rounded-full"
                      />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {group.members.map((member, i) => (
                        <div key={i} className={`p-4 rounded-2xl border ${
                          member.status === 'completed' ? 'bg-emerald-50 border-emerald-100' :
                          member.status === 'current' ? 'bg-indigo-600 border-indigo-600 text-white' :
                          'bg-white border-slate-100'
                        }`}>
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                              member.status === 'completed' ? 'bg-emerald-200 text-emerald-800' :
                              member.status === 'current' ? 'bg-white/20 text-white' :
                              'bg-slate-100 text-slate-500'
                            }`}>
                              {i + 1}
                            </div>
                            <div className="min-w-0">
                              <p className={`text-xs font-bold truncate ${member.status === 'current' ? 'text-white' : 'text-slate-800'}`}>
                                {member.name}
                              </p>
                              <div className="flex items-center gap-1 mt-0.5">
                                {member.status === 'completed' ? (
                                  <CircleCheck className="w-3 h-3 text-emerald-600" />
                                ) : member.status === 'current' ? (
                                  <TrendingUp className="w-3 h-3 text-white/70" />
                                ) : (
                                  <CircleDashed className="w-3 h-3 text-slate-300" />
                                )}
                                <span className={`text-[10px] font-bold uppercase tracking-tight ${
                                  member.status === 'current' ? 'text-white/70' : 'text-slate-400'
                                }`}>
                                  {member.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-700">
                         <User className="w-6 h-6" />
                       </div>
                       <div>
                         <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Beneficiary</p>
                         <p className="text-lg font-bold text-slate-900">{group.beneficiary}</p>
                       </div>
                    </div>
                    <button className="flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all group">
                      Manage contributions
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- START NEW CYCLE MODAL --- */}
      <AnimatePresence>
        {isCycleModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCycleModalOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="fixed inset-0 m-auto w-full max-w-lg h-fit bg-white rounded-3xl shadow-2xl z-[101] overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                      <RotateCw size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Start New Cycle</h3>
                      <p className="text-xs text-slate-500">Initialize a new merry-go-round rotation</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsCycleModalOpen(false)}
                    className="p-2 text-slate-300 hover:text-slate-600 transition-colors"
                  >
                    <X />
                  </button>
                </div>

                <form onSubmit={handleStartCycle} className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Group Name</label>
                    <input 
                      type="text" 
                      required
                      value={groupName}
                      onChange={(e) => setGroupName(e.target.value)}
                      placeholder="e.g. Riverside Family Merrigo"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Contribution Amount</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-[10px]">KES</span>
                        <input 
                          type="number" 
                          required
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0"
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all font-bold"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Members</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input 
                          type="number" 
                          required
                          value={memberCount}
                          onChange={(e) => setMemberCount(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Payout Frequency</label>
                    <div className="grid grid-cols-3 gap-2">
                       {['Weekly', 'Monthly', 'Quarterly'].map((freq) => (
                         <button
                           key={freq}
                           type="button"
                           onClick={() => setFrequency(freq)}
                           className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                             frequency === freq 
                               ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100' 
                               : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                           }`}
                         >
                           {freq}
                         </button>
                       ))}
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3">
                    <Target size={20} className="text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-amber-900 mb-1">Rotation Logic</p>
                      <p className="text-[10px] text-amber-700 leading-relaxed font-medium">
                        The payout order will be randomly generated or based on joining order. You can manually adjust the beneficiary list after creation.
                      </p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit"
                      disabled={loading || !groupName || !amount}
                      className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Coins size={20} />
                          Initialize Cycle
                        </>
                      )}
                    </button>
                    <p className="mt-4 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      Members will be notified to join the cycle
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
