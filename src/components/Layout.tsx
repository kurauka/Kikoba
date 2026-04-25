import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  HandCoins, 
  ArrowRightLeft, 
  RotateCw, 
  MessageSquare, 
  LogOut, 
  ChevronRight,
  Menu,
  X,
  PiggyBank,
  Languages,
  Globe
} from 'lucide-react';
import { auth } from '../firebase';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = React.useState(false);

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLangMenuOpen(false);
  };

  const navItems = [
    { name: t('Dashboard'), icon: LayoutDashboard, path: '/' },
    { name: t('My Chamas'), icon: Users, path: '/chamas' },
    { name: t('Contributions'), icon: HandCoins, path: '/contributions' },
    { name: t('Savings'), icon: PiggyBank, path: '/savings' },
    { name: t('Loans'), icon: ArrowRightLeft, path: '/loans' },
    { name: t('Merrigo'), icon: RotateCw, path: '/merrigo' },
    { name: t('AI Advisor'), icon: MessageSquare, path: '/advisor' },
  ];

  const currentPath = location.pathname;

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:bg-indigo-700 transition-colors">
              K
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">KIKOBA</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-700 font-medium shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                {item.name}
                {isActive && (
                  <motion.div 
                    layoutId="activeNav"
                    className="ml-auto w-1.5 h-1.5 bg-indigo-600 rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 mt-auto">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-slate-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {t('Logout')}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold text-slate-800 capitalize">
              {navItems.find(item => item.path === currentPath)?.name || 'Kikoba'}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
             {/* Language Switcher */}
             <div className="relative">
                <button 
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg flex items-center gap-2"
                >
                  <Globe className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase">{i18n.language.split('-')[0]}</span>
                </button>
                <AnimatePresence>
                  {isLangMenuOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-32 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden"
                    >
                      {[
                        { code: 'en', label: 'English' },
                        { code: 'fr', label: 'Français' },
                        { code: 'sw', label: 'Kiswahili' }
                      ].map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className={`w-full px-4 py-2 text-left text-xs font-bold hover:bg-indigo-50 hover:text-indigo-600 transition-colors ${
                            i18n.language.startsWith(lang.code) ? 'text-indigo-600 bg-indigo-50' : 'text-slate-600'
                          }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
             </div>

             <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-slate-600">Sync Active</span>
             </div>
             <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
               {auth.currentUser?.email?.[0].toUpperCase() || 'U'}
             </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-6xl mx-auto"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-white z-50 shadow-2xl md:hidden flex flex-col"
            >
              <div className="p-6 flex items-center justify-between">
                <span className="text-xl font-bold text-indigo-600">KIKOBA</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="p-4 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
                      currentPath === item.path 
                        ? 'bg-indigo-600 text-white shadow-lg' 
                        : 'text-slate-600 active:bg-slate-100'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
