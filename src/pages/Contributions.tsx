import React from 'react';
import { 
  HandCoins, 
  Smartphone, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock,
  ArrowUpRight,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { api } from '../lib/api';

export default function Contributions() {
  const [isPayModalOpen, setIsPayModalOpen] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [amount, setAmount] = React.useState('1000');
  const [loading, setLoading] = React.useState(false);

  const contributions = [
    { id: 'ct1', user: 'Sarah Mutua', amount: 1000, date: 'Today, 10:30 AM', status: 'completed', method: 'M-Pesa' },
    { id: 'ct2', user: 'James Kimani', amount: 1000, date: 'Today, 09:15 AM', status: 'completed', method: 'M-Pesa' },
    { id: 'ct3', user: 'Self', amount: 1000, date: 'Scheduled', status: 'pending', method: 'STK Push' },
    { id: 'ct4', user: 'Mercy Wanjiku', amount: 1000, date: 'Yesterday', status: 'completed', method: 'M-Pesa' },
    { id: 'ct5', user: 'John Doe', amount: 1000, date: 'Due in 2 days', status: 'pending', method: 'Check' },
  ];

  const handleStkPush = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Triggering the STK Push API implemented in server.ts
      const res = await api.stkPush(Number(amount), phoneNumber, 'MONTHLY_CONTRIB');
      console.log('STK Push Response:', res);
      alert('STK Push initiated! Please check your phone for the PIN prompt.');
      setIsPayModalOpen(false);
    } catch (err) {
      console.error(err);
      alert('Failed to trigger payment. Please ensure your credentials are set in .env');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Contribution Tracker</h2>
          <p className="text-slate-500">View and record group membership contributions.</p>
        </div>
        <button 
          onClick={() => setIsPayModalOpen(true)}
          className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active:scale-95"
        >
          <Smartphone className="w-5 h-5" />
          Pay Monthly Contrib
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Total Collected (May)</p>
            <p className="text-2xl font-bold text-emerald-600">KES 18,000</p>
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-500">
               <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-emerald-500" />
               </div>
               <span>75% of target</span>
            </div>
         </div>
         <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Pending Amount</p>
            <p className="text-2xl font-bold text-amber-600">KES 4,000</p>
            <p className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-tight">4 members remaining</p>
         </div>
         <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Group Balance</p>
            <p className="text-2xl font-bold text-indigo-600">KES 142,500</p>
            <p className="mt-4 text-[10px] font-bold text-emerald-600 flex items-center gap-1">
              <ArrowUpRight size={12} /> +KES 12,000 this month
            </p>
         </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Monthly Contribution Ledger</h3>
          <div className="flex gap-2">
            <button className="p-2 border border-slate-200 rounded-xl text-slate-400 hover:text-slate-600">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 border border-slate-200 rounded-xl text-slate-400 hover:text-slate-600">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50">
              <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <th className="px-6 py-4">Member</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {contributions.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <span className="text-sm font-bold text-slate-800">{item.user}</span>
                  </td>
                  <td className="px-6 py-5 text-sm font-bold text-slate-900">KES {item.amount.toLocaleString()}</td>
                  <td className="px-6 py-5 text-xs text-slate-500 font-medium">{item.date}</td>
                  <td className="px-6 py-5 text-xs font-semibold text-slate-400">{item.method}</td>
                  <td className="px-6 py-5">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                      item.status === 'completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {item.status === 'completed' ? <CheckCircle size={10} /> : <Clock size={10} />}
                      {item.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- PAYMENT MODAL --- */}
      <AnimatePresence>
        {isPayModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPayModalOpen(false)}
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
                      <Smartphone size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">M-Pesa Contribution</h3>
                      <p className="text-xs text-slate-500">Fast & Secure STK Push Payment</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsPayModalOpen(false)}
                    className="p-2 text-slate-300 hover:text-slate-600 transition-colors"
                  >
                    <ArrowUpRight className="rotate-45" />
                  </button>
                </div>

                <form onSubmit={handleStkPush} className="space-y-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">M-Pesa Phone Number</label>
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
                        className="w-full pl-20 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 transition-all text-lg font-bold tracking-widest"
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium px-1 mt-1">Format: 7XXXXXXXX or 1XXXXXXXX</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contribution Amount</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                        KES
                      </div>
                      <input 
                        type="number" 
                        required
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full pl-14 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none group-focus-within:border-emerald-500 transition-all text-lg font-bold"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={loading || !phoneNumber}
                    className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Smartphone size={20} />
                        Request STK Push
                      </>
                    )}
                  </button>
                  
                  <div className="flex items-center justify-center gap-4 py-2 opacity-50 grayscale scale-90">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/1200px-M-PESA_LOGO-01.svg.png" className="h-6 object-contain" alt="MPesa" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Safaricom_Logo.svg/1200px-Safaricom_Logo.svg.png" className="h-4 object-contain" alt="Safaricom" />
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
