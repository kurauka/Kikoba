import React from 'react';
import { Send, User, Bot, Sparkles, AlertCircle, Plus, ChevronRight, Eraser } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

// Initialize Gemini directly on the frontend as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export default function Advisor() {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = React.useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Auto-focus input on mount
  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async (customMsg?: string) => {
    const textToSend = customMsg || input.trim();
    if (!textToSend || loading) return;
    
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ role: 'user', parts: [{ text: textToSend }] }],
        config: {
          systemInstruction: `You are KIKOBA AI, a professional financial advisor for Kenyan savings groups (chamas). Provide helpful, safe, practical, and culturally relevant advice regarding savings, loans, and merry-go-rounds. Respond strictly in the ${i18n.language} language. Keep responses concise and focused on the Kenyan context. Use markdown formatting for clarity.`
        }
      });

      const aiText = response.text || "I'm sorry, I couldn't generate a response.";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error('Gemini error:', error);
      setMessages(prev => [...prev, { role: 'ai', text: "I'm sorry, I encountered an error. Please check your internet connection and try again." }]);
    } finally {
      setLoading(false);
      // Refocus input after response
      inputRef.current?.focus();
    }
  };

  const quickTips = [
    { label: t('Savings Tips'), prompt: 'Give me some tips on how to improve my chama savings.', icon: Plus },
    { label: t('Loan Risk'), prompt: 'How can our group minimize loan default risks?', icon: AlertCircle },
    { label: t('Merrigo Rules'), prompt: 'What are the best rules for a successful merry-go-round?', icon: ChevronRight },
    { label: t('Investment'), prompt: 'Where can a chama invest its idle funds in Kenya?', icon: Sparkles }
  ];

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-10rem)] flex flex-col relative">
      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-8 space-y-12 no-scrollbar scroll-smooth"
      >
        {messages.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full flex flex-col items-center justify-center text-center mt-8"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center text-white shadow-2xl mb-6 animate-pulse">
              <Bot size={32} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">
              {i18n.language.startsWith('sw') ? 'Jambo! Mimi ni KIKOBA AI' : i18n.language.startsWith('fr') ? 'Bonjour! Je suis KIKOBA AI' : 'Hello! I am KIKOBA AI'}
            </h2>
            <p className="text-slate-500 max-w-md mb-12">
              {t('Happening in your Chamas')} {i18n.language.startsWith('sw') ? 'Naweza kukusaidia vipi leo?' : i18n.language.startsWith('fr') ? 'Comment puis-je vous aider?' : 'How can I help you today?'}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl px-6">
              {quickTips.map((tip, i) => (
                <motion.button
                  key={tip.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleSend(tip.prompt)}
                  className="p-4 bg-white border border-slate-100 rounded-2xl text-left hover:border-indigo-300 hover:bg-slate-50 transition-all group"
                >
                  <p className="font-bold text-slate-800 mb-1 flex items-center justify-between">
                    {tip.label}
                    <tip.icon size={14} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                  </p>
                  <p className="text-xs text-slate-400">Ask about this topic</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="space-y-12">
            {messages.map((msg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 md:gap-6 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'ai' && (
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shrink-0 flex items-center justify-center text-white mt-1 shadow-lg shadow-indigo-100">
                    <Bot size={18} />
                  </div>
                )}
                <div className={`max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'bg-indigo-600 text-white p-4 rounded-3xl rounded-tr-none shadow-xl shadow-indigo-100' : 'text-slate-800'}`}>
                  {msg.role === 'ai' ? (
                    <div className="markdown-body prose prose-slate prose-sm max-w-none">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm md:text-base leading-relaxed">{msg.text}</p>
                  )}
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-100 shrink-0 flex items-center justify-center text-slate-400 mt-1">
                    <User size={18} />
                  </div>
                )}
              </motion.div>
            ))}
            {loading && (
              <div className="flex gap-4 md:gap-6">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 shrink-0 flex items-center justify-center text-white mt-1 animate-pulse">
                  <Bot size={18} />
                </div>
                <div className="flex-1 space-y-3 pt-2">
                   <div className="h-4 bg-slate-100 rounded-full w-3/4 animate-pulse" />
                   <div className="h-4 bg-slate-100 rounded-full w-1/2 animate-pulse" />
                   <div className="h-4 bg-slate-100 rounded-full w-2/3 animate-pulse" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Input area */}
      <div className="sticky bottom-0 pb-6 pt-2 bg-gradient-to-t from-slate-50 to-transparent">
        <div className="max-w-3xl mx-auto px-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-white/40 blur-xl group-focus-within:bg-indigo-100/40 transition-all rounded-full" />
            <div className="relative flex items-center bg-white border border-slate-200 rounded-[2rem] p-2 pl-6 shadow-2xl focus-within:border-indigo-400 transition-all">
              <input 
                ref={inputRef}
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={t('Ask about savings')}
                className="flex-1 bg-transparent border-none outline-none text-slate-800 py-3 md:py-4 text-sm md:text-base disabled:opacity-50"
                disabled={loading}
              />
              <div className="flex items-center gap-2 pr-2">
                {messages.length > 0 && (
                  <button 
                    onClick={() => setMessages([])}
                    title={t('Clear Chat')}
                    className="p-3 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Eraser size={20} />
                  </button>
                )}
                <button 
                  onClick={() => handleSend()}
                  disabled={loading || !input.trim()}
                  className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white hover:bg-slate-900 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-xl shadow-indigo-200 active:scale-90"
                >
                  <Send className="w-5 h-5 ml-0.5" />
                </button>
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest justify-center">
            <AlertCircle size={12} />
            <span>{t('Verify AI suggestions')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

