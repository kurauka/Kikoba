import React from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  ShieldCheck, 
  ArrowRight, 
  Coins,
  LayoutGrid,
  List,
  X,
  CreditCard,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, setDoc, doc, serverTimestamp } from 'firebase/firestore';

export default function Chamas() {
  const { profile, user } = useAuth();
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = React.useState(false);
  
  // Create Chama Form State
  const [chamaName, setChamaName] = React.useState('');
  const [chamaDesc, setChamaDesc] = React.useState('');
  const [contribAmount, setContribAmount] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  // Join Chama Form State
  const [joinCode, setJoinCode] = React.useState('');

  const myChamas = [
    {
      id: 'c1',
      name: 'Nairobi Tech Savings',
      description: 'Professional group for techies in Nairobi.',
      memberCount: 15,
      totalSavings: 250000,
      role: 'Treasurer',
      status: 'active'
    },
    {
      id: 'c2',
      name: 'Family Support Group',
      description: 'Merry-go-round and emergency fund for family.',
      memberCount: 8,
      totalSavings: 45000,
      role: 'Member',
      status: 'active'
    }
  ];

  const handleCreateChama = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile) return;
    setLoading(true);
    try {
      const chamaRef = await addDoc(collection(db, 'chamas'), {
        name: chamaName,
        description: chamaDesc,
        treasurerId: user.uid,
        createdAt: serverTimestamp(),
        totalSavings: 0,
        memberCount: 1,
        monthlyContribution: Number(contribAmount)
      });

      // Add self as member
      await setDoc(doc(db, 'chamas', chamaRef.id, 'members', user.uid), {
        userId: user.uid,
        displayName: profile.displayName,
        role: 'treasurer',
        joinedAt: serverTimestamp(),
        totalContributed: 0
      });

      setIsCreateModalOpen(false);
      // Reset form
      setChamaName('');
      setChamaDesc('');
      setContribAmount('');
      alert('Chama created successfully!');
    } catch (err) {
      console.error(err);
      alert('Error creating chama. Please check your rules.');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinChama = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Searching for chama with code: ${joinCode}. This feature is partially implemented (Logic for Invitations).`);
    setIsJoinModalOpen(false);
    setJoinCode('');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Your Chamas</h2>
          <p className="text-slate-500">Manage your savings groups and group memberships.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsJoinModalOpen(true)}
            className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-bold hover:bg-slate-50 transition-all active:scale-95"
          >
            Join Group
          </button>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Create New Chama
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search your groups..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-indigo-400 outline-none transition-all"
          />
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <LayoutGrid size={20} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Chamas Grid */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {myChamas.map((chama, i) => (
          <motion.div
            key={chama.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all group overflow-hidden ${
              viewMode === 'grid' ? 'rounded-3xl p-8 flex flex-col' : 'rounded-2xl p-6 flex items-center justify-between'
            }`}
          >
            <div className={viewMode === 'grid' ? 'flex-1' : 'flex items-center gap-6 flex-1'}>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 font-bold text-xl">
                  {chama.name[0]}
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  chama.role === 'Treasurer' ? 'bg-amber-50 text-amber-700' : 'bg-blue-50 text-blue-700'
                }`}>
                  <ShieldCheck size={12} />
                  {chama.role}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">
                    {chama.name}
                  </h3>
                  <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                    {chama.description}
                  </p>
                </div>

                <div className="flex items-center gap-6 pt-2">
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight flex items-center gap-1">
                      <Users size={10} /> Members
                    </p>
                    <p className="text-sm font-bold text-slate-700">{chama.memberCount} members</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight flex items-center gap-1">
                      <Coins size={10} /> Total Savings
                    </p>
                    <p className="text-sm font-bold text-emerald-600">KES {chama.totalSavings.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={viewMode === 'grid' ? 'mt-8 pt-6 border-t border-slate-50 flex items-center justify-between' : 'ml-8'}>
              <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 group/btn">
                View Details
                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
              {viewMode === 'grid' && (
                 <div className="flex -space-x-2">
                   {[1,2,3].map(n => (
                     <div key={n} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">
                        U
                     </div>
                   ))}
                   <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-50 flex items-center justify-center text-[10px] font-bold text-indigo-600">
                     +12
                   </div>
                 </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- MODALS --- */}
      <AnimatePresence>
        {/* Create Chama Modal */}
        {isCreateModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateModalOpen(false)}
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
                      <Plus size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Create New Chama</h3>
                      <p className="text-xs text-slate-500">Start your own savings group</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsCreateModalOpen(false)}
                    className="p-2 text-slate-300 hover:text-slate-600 transition-colors"
                  >
                    <X />
                  </button>
                </div>

                <form onSubmit={handleCreateChama} className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Chama Name</label>
                    <input 
                      type="text" 
                      required
                      value={chamaName}
                      onChange={(e) => setChamaName(e.target.value)}
                      placeholder="e.g. Riverside Investment Group"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Description</label>
                    <textarea 
                      rows={2}
                      value={chamaDesc}
                      onChange={(e) => setChamaDesc(e.target.value)}
                      placeholder="What is this group for?"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                        <CreditCard size={10} /> Monthly Contrib.
                      </label>
                      <input 
                        type="number" 
                        required
                        value={contribAmount}
                        onChange={(e) => setContribAmount(e.target.value)}
                        placeholder="KES 1,000"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                        <Target size={10} /> Frequency
                      </label>
                      <select className="w-full px-4 text-sm py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-colors">
                        <option>Monthly</option>
                        <option>Weekly</option>
                        <option>Fortnightly</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50"
                    >
                      {loading ? 'Processing...' : 'Create Chama'}
                    </button>
                    <p className="mt-4 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      You will be assigned as the Treasurer
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}

        {/* Join Chama Modal */}
        {isJoinModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsJoinModalOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="fixed inset-0 m-auto w-full max-w-md h-fit bg-white rounded-3xl shadow-2xl z-[101] overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                      <Users size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Join a Chama</h3>
                      <p className="text-xs text-slate-500">Enter your invitation code</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsJoinModalOpen(false)}
                    className="p-2 text-slate-300 hover:text-slate-600 transition-colors"
                  >
                    <X />
                  </button>
                </div>

                <form onSubmit={handleJoinChama} className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Invitation Code</label>
                    <input 
                      type="text" 
                      required
                      value={joinCode}
                      onChange={(e) => setJoinCode(e.target.value)}
                      placeholder="e.g. CHM-123-ABC"
                      className="w-full px-4 py-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl outline-none focus:border-indigo-500 focus:border-solid transition-all text-center text-lg font-mono tracking-widest uppercase"
                    />
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit"
                      className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                    >
                      Search & Join
                    </button>
                  </div>
                </form>

                <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                   <p className="text-[10px] text-blue-700 font-bold uppercase tracking-tight leading-relaxed">
                     Tip: Ask your group treasurer for the unique invitation code to join their private Chama.
                   </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
