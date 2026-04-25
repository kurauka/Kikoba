import React from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  ShieldCheck, 
  Zap, 
  Globe, 
  PhoneCall, 
  MessageSquare,
  ArrowRight,
  Target,
  TrendingUp,
  RotateCw
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Landing() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const features = [
    {
      icon: Users,
      title: t('Chama Focused'),
      description: t('Designed specifically for Kenyan savings groups and community circles.'),
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      icon: MessageSquare,
      title: t('AI Advisor'),
      description: t('Get financial advice in English, Swahili, or French from our smart assistant.'),
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      icon: ShieldCheck,
      title: t('Secure Savings'),
      description: t('Bank-level security for your group contributions and personal goals.'),
      color: 'bg-amber-50 text-amber-600'
    },
    {
      icon: Zap,
      title: t('M-Pesa Ready'),
      description: t('Seamless integration with Kenya\'s favorite mobile money platform.'),
      color: 'bg-rose-50 text-rose-600'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFCF9] font-sans selection:bg-indigo-100 italic-serif">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <Target className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">KIKOBA</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
            <a href="#features" className="hover:text-indigo-600 transition-colors uppercase text-xs tracking-widest">{t('Features')}</a>
            <a href="#about" className="hover:text-indigo-600 transition-colors uppercase text-xs tracking-widest">{t('About')}</a>
            
            <div className="flex items-center gap-2 border-l border-slate-200 pl-8">
              <button onClick={() => changeLanguage('en')} className={`text-xs uppercase tracking-widest ${i18n.language === 'en' ? 'text-indigo-600 font-bold' : 'text-slate-400'}`}>EN</button>
              <button onClick={() => changeLanguage('sw')} className={`text-xs uppercase tracking-widest ${i18n.language === 'sw' ? 'text-indigo-600 font-bold' : 'text-slate-400'}`}>SW</button>
              <button onClick={() => changeLanguage('fr')} className={`text-xs uppercase tracking-widest ${i18n.language === 'fr' ? 'text-indigo-600 font-bold' : 'text-slate-400'}`}>FR</button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              to="/login"
              className="px-6 py-2.5 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 flex items-center gap-2 group"
            >
              {t('Get Started')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold mb-6">
              <Globe className="w-4 h-4" />
              {t('Now available in Swahili, English & French')}
            </div>
            <h1 className="text-6xl md:text-7xl font-bold text-slate-900 leading-[1.1] mb-8 tracking-tighter">
              {t('Grow Your Wealth,')}<br />
              <span className="text-indigo-600 italic-serif font-medium">{t('Together.')}</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
              {t('KIKOBA brings the tradition of Chamas into the digital age. Manage contributions, loans, and get AI-driven financial advice for your circle.')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/login"
                className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center gap-3 shadow-xl"
              >
                {t('Join a Chama')}
                <Users className="w-5 h-5" />
              </Link>
              <button className="px-8 py-4 bg-white text-slate-900 border-2 border-slate-200 rounded-2xl font-bold text-lg hover:border-indigo-600 hover:text-indigo-600 transition-all flex items-center gap-3">
                {t('How it works')}
                <PhoneCall className="w-5 h-5" />
              </button>
            </div>

            {/* Social Proof */}
            <div className="mt-12 flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-slate-500">
                <span className="text-slate-900 font-bold">2,000+</span> {t('active chamas in East Africa')}
              </p>
            </div>
          </motion.div>

          {/* Abstract Image/UI Component */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:block hidden"
          >
            <div className="relative z-10 bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 p-8 overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Umoja Savings Group</h3>
                  <p className="text-sm text-slate-500">Active since Jan 2024</p>
                </div>
                <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold uppercase tracking-wider">
                  Healthy
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-500">{t('Total Pot')}</span>
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="text-3xl font-bold text-slate-900">Kes 450,000</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="p-4 rounded-3xl border border-slate-100 bg-white shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                      <RotateCw className="w-4 h-4" />
                    </div>
                    <div className="text-xs text-slate-500 mb-1">{t('Next Merrigo')}</div>
                    <div className="font-bold text-slate-900">Jane Doe</div>
                  </div>
                   <div className="p-4 rounded-3xl border border-slate-100 bg-white shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="text-xs text-slate-500 mb-1">{t('Contribution Rate')}</div>
                    <div className="font-bold text-slate-900">98.5%</div>
                  </div>
                </div>
              </div>

              {/* AI Hint bubble */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-2 -right-2 p-6 bg-indigo-600 text-white rounded-[2rem] shadow-2xl max-w-[240px]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 opacity-70" />
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-70 uppercase">{t('Advisor')}</span>
                </div>
                <p className="text-sm font-medium leading-relaxed italic">
                  "{t('Your chama is 15% more efficient than average. Consider increasing rotation amount next month.')}"
                </p>
              </motion.div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-50 rounded-full blur-[100px] -z-10 opacity-60"></div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">{t('Built for Modern Chamas')}</h2>
            <p className="text-lg text-slate-500">
              {t('A comprehensive platform to manage your savings groups with transparency, speed, and intelligence.')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[2rem] border border-slate-100 hover:border-indigo-100 hover:bg-slate-50/50 transition-all group"
              >
                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-bold text-slate-900 mb-2">350M+</div>
              <div className="text-slate-500 font-medium uppercase text-xs tracking-widest">{t('Kes Contributions Tracked')}</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-slate-900 mb-2">15k</div>
              <div className="text-slate-500 font-medium uppercase text-xs tracking-widest">{t('Individual Members')}</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-slate-900 mb-2">99%</div>
              <div className="text-slate-500 font-medium uppercase text-xs tracking-widest">{t('Reporting Accuracy')}</div>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-slate-900 text-white px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                <Target className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight">KIKOBA</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-8">
              {t('Empowering community savings groups with digital intelligence and financial transparency.')}
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 cursor-pointer transition-colors">
                <Users className="w-5 h-5 text-slate-400" />
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 cursor-pointer transition-colors">
                <PhoneCall className="w-5 h-5 text-slate-400" />
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 cursor-pointer transition-colors">
                <MessageSquare className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          </div>

          <div className="flex gap-16">
            <div className="space-y-4">
              <h4 className="font-bold uppercase text-xs tracking-widest text-slate-500">{t('Product')}</h4>
              <ul className="space-y-2 font-medium">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">{t('Features')}</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">{t('Security')}</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">{t('Mobile App')}</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold uppercase text-xs tracking-widest text-slate-500">{t('Company')}</h4>
              <ul className="space-y-2 font-medium">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">{t('About')}</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">{t('Careers')}</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">{t('Privacy')}</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-20 mt-20 border-t border-slate-800 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} KIKOBA Financial. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
