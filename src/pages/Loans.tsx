import React from 'react';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Search,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  X,
  Target,
  Calendar,
  Wallet,
  Info,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Loans() {
  const [activeTab, setActiveTab] = React.useState('all');
  const [isApplyModalOpen, setIsApplyModalOpen] = React.useState(false);
  const [loanAmount, setLoanAmount] = React.useState('');
  const [loanPurpose, setLoanPurpose] = React.useState('');
  const [loanDuration, setLoanDuration] = React.useState('3'); // Months
  const [loading, setLoading] = React.useState(false);

  // Interest calculation (example: 5% flat for simplicity)
  const interestRate = 0.05;
  const calculatedInterest = Number(loanAmount) * (interestRate * (Number(loanDuration) / 3));
  const totalRepayable = Number(loanAmount) + calculatedInterest;
  const monthlyInstallment = totalRepayable / Math.max(1, Number(loanDuration));

  const loans = [
    { id: 'l1', user: 'James Kimani', amount: 5000, status: 'active', dueDate: 'May 10', interest: 250 },
    { id: 'l2', user: 'Sarah Mutua', amount: 2000, status: 'repaid', dueDate: 'Apr 20', interest: 100 },
    { id: 'l3', user: 'Self', amount: 1500, status: 'requested', dueDate: 'Pending', interest: 75 },
    { id: 'l4', user: 'John Doe', amount: 8000, status: 'defaulted', dueDate: 'Mar 15', interest: 400 },
  ];

  const filteredLoans = activeTab === 'all' ? loans : loans.filter(l => l.status === activeTab);

  const handleApplyLoan = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsApplyModalOpen(false);
      alert(`Loan application of KES ${loanAmount} submitted for review!`);
      setLoanAmount('');
      setLoanPurpose('');
      setLoanDuration('3');
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Loan Management</h2>
          <p className="text-slate-500">Apply for and track loans within your Chamas.</p>
        </div>
        <button 
          onClick={() => setIsApplyModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Apply for Loan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[
           { label: 'Owed to Groups', value: 'KES 25,400', icon: ArrowUpRight, color: 'text-red-600', bg: 'bg-red-50' },
           { label: 'Available Fund', value: 'KES 150,000', icon: Plus, color: 'text-emerald-600', bg: 'bg-emerald-50' },
           { label: 'Repayment Rate', value: '94.2%', icon: CheckCircle2, color: 'text-indigo-600', bg: 'bg-indigo-50' },
         ].map((stat, i) => (
           <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
             <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
               <stat.icon size={24} />
             </div>
             <div>
               <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
               <p className="text-xl font-bold text-slate-900">{stat.value}</p>
             </div>
           </div>
         ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {['all', 'active', 'requested', 'repaid'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500" />
              <input type="text" placeholder="Search members..." className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-400 transition-all" />
            </div>
            <button className="p-2 border border-slate-200 rounded-xl text-slate-400 hover:text-slate-600">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="px-6 py-4">Beneficiary</th>
                <th className="px-6 py-4">Principal</th>
                <th className="px-6 py-4">Interest</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredLoans.map((loan) => (
                <tr key={loan.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                        {loan.user[0]}
                      </div>
                      <span className="text-sm font-bold text-slate-800">{loan.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-semibold text-slate-900">KES {loan.amount.toLocaleString()}</td>
                  <td className="px-6 py-5 text-sm font-medium text-slate-500">KES {loan.interest}</td>
                  <td className="px-6 py-5 text-sm font-medium text-slate-500">{loan.dueDate}</td>
                  <td className="px-6 py-5">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                      loan.status === 'active' ? 'bg-amber-50 text-amber-700' :
                      loan.status === 'repaid' ? 'bg-emerald-50 text-emerald-700' :
                      loan.status === 'requested' ? 'bg-blue-50 text-blue-700' :
                      'bg-red-50 text-red-700'
                    }`}>
                      {loan.status === 'active' ? <Clock size={12} /> : 
                       loan.status === 'repaid' ? <CheckCircle2 size={12} /> :
                       loan.status === 'requested' ? <Clock size={12} /> :
                       <AlertTriangle size={12} />}
                      <span className="capitalize">{loan.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- LOAN APPLICATION MODAL --- */}
      <AnimatePresence>
        {isApplyModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsApplyModalOpen(false)}
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
                      <Wallet size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Apply for Loan</h3>
                      <p className="text-xs text-slate-500">Quick credit from your group funds</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsApplyModalOpen(false)}
                    className="p-2 text-slate-300 hover:text-slate-600 transition-colors"
                  >
                    <X />
                  </button>
                </div>

                <form onSubmit={handleApplyLoan} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Loan Amount</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs tracking-tighter invisible sm:visible">KES</span>
                        <input 
                          type="number" 
                          required
                          value={loanAmount}
                          onChange={(e) => setLoanAmount(e.target.value)}
                          placeholder="0.00"
                          className="w-full sm:pl-10 pl-4 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all font-bold"
                        />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Duration</label>
                      <select 
                        value={loanDuration}
                        onChange={(e) => setLoanDuration(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all font-bold appearance-none cursor-pointer"
                      >
                        <option value="1">1 Month</option>
                        <option value="3">3 Months</option>
                        <option value="6">6 Months</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Purpose of Loan</label>
                    <textarea 
                      required
                      value={loanPurpose}
                      onChange={(e) => setLoanPurpose(e.target.value)}
                      placeholder="Why do you need this loan?"
                      rows={2}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all"
                    />
                  </div>

                  {loanAmount && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-slate-50 border border-slate-100 rounded-2xl p-5"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <Info size={16} className="text-indigo-500" />
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest">Application Estimate</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-y-3 text-xs font-medium text-slate-600">
                        <span>Interest (5%):</span>
                        <span className="text-right font-bold text-slate-900">KES {calculatedInterest.toLocaleString()}</span>
                        <span>Monthly Payment:</span>
                        <span className="text-right font-bold text-slate-900">KES {monthlyInstallment.toLocaleString()}</span>
                        <div className="col-span-2 border-t border-slate-200 pt-3 flex justify-between">
                           <span className="font-bold text-indigo-600 uppercase">Total Due:</span>
                           <span className="font-bold text-indigo-600">KES {totalRepayable.toLocaleString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="pt-4">
                    <button 
                      type="submit"
                      disabled={loading || !loanAmount || !loanPurpose}
                      className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-slate-900 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Submit Application
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                    <p className="mt-4 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      Subject to group approval and savings limit
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
