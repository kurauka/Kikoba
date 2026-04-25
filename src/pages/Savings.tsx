import React from 'react';
import { 
  PiggyBank, 
  Plus, 
  TrendingUp, 
  Target, 
  History, 
  ArrowUpRight, 
  ArrowDownRight,
  Smartphone,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { api } from '../lib/api';
import { useTranslation } from 'react-i18next';

export default function Savings() {
  const { t } = useTranslation();
  const [isDepositModalOpen, setIsDepositModalOpen] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const savingsGoals = [
    { name: 'Emergencies', target: 50000, current: 32500, color: 'indigo' },
    { name: 'Business Expansion', target: 200000, current: 142000, color: 'emerald' },
    { name: 'Holiday Fund', target: 30000, current: 4500, color: 'amber' },
  ];

  const recentTransactions = [
    { id: 'tx1', type: 'deposit', amount: 5000, date: '2 hours ago', goal: 'Business Expansion', status: 'completed' },
    { id: 'tx2', type: 'deposit', amount: 2000, date: 'Yesterday', goal: ' Emergencies', status: 'completed' },
    { id: 'tx3', type: 'withdrawal', amount: 1500, date: '3 days ago', goal: 'General', status: 'completed' },
    { id: 'tx4', type: 'deposit', amount: 1000, date: 'Last week', goal: 'Holiday Fund', status: 'completed' },
  ];

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.stkPush(Number(amount), phoneNumber, 'SAVINGS_DEPOSIT');
      console.log('Savings STK Push Response:', res);
      alert('STK Push sent! Please check your phone.');
      setIsDepositModalOpen(false);
      setAmount('');
    } catch (err) {
      console.error(err);
      alert('Failed to initiate deposit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{t('Personal Savings')}</h2>
          <p className="text-slate-500">{t('Manage goals')}</p>
        </div>
        <button 
          onClick={() => setIsDepositModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-slate-900 transition-all shadow-lg shadow-indigo-100 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          {t('Deposit Funds')}
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-100">
           <div className="relative z-10">
              <p className="text-indigo-100/80 text-sm font-medium mb-1">{t('Total Savings Balance')}</p>
              <h3 className="text-4xl font-black tracking-tight mb-6">KES 179,000</h3>
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                       <ArrowUpRight className="w-4 h-4" />
                    </div>
                    <div>
                       <p className="text-[10px] text-indigo-200 font-bold uppercase tracking-wider">{t('Interest Earned')}</p>
                       <p className="text-sm font-bold">KES 4,250</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                       <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                       <p className="text-[10px] text-indigo-200 font-bold uppercase tracking-wider">{t('Growth Rate')}</p>
                       <p className="text-sm font-bold">8.5% p.a.</p>
                    </div>
                 </div>
              </div>
           </div>
           <div className="absolute top-0 right-0 p-8 opacity-20">
              <PiggyBank size={120} />
           </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
           <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Savings Goal Count</p>
              <h4 className="text-2xl font-bold text-slate-800">3 Active</h4>
           </div>
           <div className="mt-4 p-3 bg-emerald-50 rounded-2xl flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                 <Target size={18} />
              </div>
              <p className="text-[10px] text-emerald-700 font-bold leading-tight">One goal is <br/> nearing completion!</p>
           </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
           <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Last Deposit</p>
              <h4 className="text-2xl font-bold text-slate-800">2h ago</h4>
           </div>
           <div className="mt-4 flex -space-x-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                   <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-50 flex items-center justify-center text-[10px] font-bold text-indigo-600">
                 +12
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Savings Goals */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
             <h3 className="font-bold text-slate-800">Savings Goals</h3>
             <button className="text-xs font-bold text-indigo-600 hover:underline">Manage Goals</button>
          </div>
          {savingsGoals.map((goal) => {
            const progress = (goal.current / goal.target) * 100;
            return (
              <div key={goal.name} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-slate-800">{goal.name}</h4>
                    <p className="text-xs text-slate-400">Target: KES {goal.target.toLocaleString()}</p>
                  </div>
                  <span className="text-sm font-black text-slate-900">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`h-full bg-${goal.color}-500`}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                  <span className="text-slate-400">Current: KES {goal.current.toLocaleString()}</span>
                  <span className={`text-${goal.color}-600`}>KES {(goal.target - goal.current).toLocaleString()} Left</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transactions */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center gap-2">
            <History size={20} className="text-slate-400" />
            <h3 className="font-bold text-slate-800">Savings History</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="p-5 border-b border-slate-50 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                     tx.type === 'deposit' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                   }`}>
                      {tx.type === 'deposit' ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                   </div>
                   <div>
                      <p className="text-sm font-bold text-slate-800 capitalize leading-tight">{tx.type} to {tx.goal}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{tx.date}</p>
                   </div>
                </div>
                <div className="text-right">
                   <p className={`text-sm font-black ${tx.type === 'deposit' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {tx.type === 'deposit' ? '+' : '-'}KES {tx.amount.toLocaleString()}
                   </p>
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Completed</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-4 text-[10px] font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-[0.2em] border-t border-slate-50">
            View All Transactions
          </button>
        </div>
      </div>

      {/* --- DEPOSIT MODAL --- */}
      <AnimatePresence>
        {isDepositModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDepositModalOpen(false)}
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
                    <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                      <Smartphone size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Deposit Funds</h3>
                      <p className="text-xs text-slate-500">Add money to your savings instantly</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsDepositModalOpen(false)}
                    className="p-2 text-slate-300 hover:text-slate-600 transition-colors"
                  >
                    <X />
                  </button>
                </div>

                <form onSubmit={handleDeposit} className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('M-Pesa Phone Number')}</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold border-r border-slate-200 pr-3">
                        +254
                      </div>
                      <input 
                        type="tel" 
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="712345678"
                        className="w-full pl-20 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 transition-all text-lg font-bold tracking-widest"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('Deposit Amount')}</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                        KES
                      </div>
                      <input 
                        type="number" 
                        required
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full pl-14 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none group-focus-within:border-indigo-500 transition-all text-lg font-bold"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={loading || !phoneNumber || !amount}
                    className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Smartphone size={20} />
                        {t('Confirm Deposit')}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
