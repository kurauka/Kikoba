import React from 'react';
import { 
  TrendingUp, 
  Users, 
  ArrowUpRight, 
  ArrowDownLeft, 
  History,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
import { Chama, Contribution } from '../types';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

export default function Dashboard() {
  const { t } = useTranslation();
  const { profile } = useAuth();
  const [chamas, setChamas] = React.useState<Chama[]>([]);
  const [recentContributions, setRecentContributions] = React.useState<Contribution[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      if (!profile) return;
      try {
        // Mocking some data for the first load
        setLoading(true);
        // Realistic fetching would happen here
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [profile]);

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Section */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">{t('Habari')}, {profile?.displayName}!</h2>
        <p className="text-slate-500">{t('Happening in your Chamas')}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: t('Total Savings'), value: 'KES 45,200', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100', trend: '+12% this month' },
          { label: t('Active Loans'), value: 'KES 12,000', icon: ArrowUpRight, color: 'text-amber-600', bg: 'bg-amber-100', trend: '2 loans pending' },
          { label: t('Group Members'), value: '18 Total', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-100', trend: 'Across 3 Chamas' },
          { label: t('Next Merrigo'), value: '3 Days', icon: history ? History : AlertCircle, color: 'text-blue-600', bg: 'bg-blue-100', trend: 'May 1st, 2026' },
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">overview</span>
            </div>
            <div className="space-y-1">
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
            <p className="mt-4 text-xs font-semibold text-slate-400 flex items-center gap-1">
              {stat.trend}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Charts and Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Savings Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-slate-800">{t('Savings Growth')}</h3>
              <p className="text-xs text-slate-400">{t('Consolidated growth')}</p>
            </div>
            <select className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 outline-none text-slate-600">
              <option>Last 6 Months</option>
              <option>Year to Date</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                  itemStyle={{fontFamily: 'Inter', fontWeight: 600, fontSize: '12px'}}
                />
                <Area type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-6">{t('Recent Activity')}</h3>
          <div className="space-y-6">
            {[
              { type: 'contribution', user: 'Sarah M.', amount: 'KES 1,000', date: '2h ago', status: 'completed' },
              { type: 'loan', user: 'James K.', amount: 'KES 5,000', date: '5h ago', status: 'requested' },
              { type: 'merrigo', user: 'Amara O.', amount: 'KES 10,000', date: '1d ago', status: 'received' },
              { type: 'contribution', user: 'John D.', amount: 'KES 2,000', date: '2d ago', status: 'completed' },
            ].map((activity, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                  activity.type === 'contribution' ? 'bg-emerald-500' :
                  activity.type === 'loan' ? 'bg-amber-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate">{activity.user}</p>
                  <p className="text-xs text-slate-500">{activity.type === 'loan' ? 'Requested a loan' : 'Sent contribution'}</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tight">{activity.amount} • {activity.date}</p>
                </div>
                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                  activity.status === 'completed' ? 'bg-emerald-50 text-emerald-700' :
                  activity.status === 'requested' ? 'bg-amber-50 text-amber-700' :
                  'bg-indigo-50 text-indigo-700'
                }`}>
                  {activity.status}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
            {t('View All Activity')}
          </button>
        </div>
      </div>
    </div>
  );
}
