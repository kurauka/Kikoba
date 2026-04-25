import React from 'react';
import { Send, User, Bot, Sparkles, AlertCircle, Plus, ChevronRight, Eraser, MessageSquare, X, Minimize2, Maximize2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';

export default function FloatingAdvisor() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
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

  // Ref: https://ai.google.dev/gemini-api/docs/api-key
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  const ai = React.useMemo(() => apiKey ? new GoogleGenAI({ apiKey }) : null, [apiKey]);

  const handleSend = async (customMsg?: string) => {
    const textToSend = customMsg || input.trim();
    if (!textToSend || loading || !ai) return;
    
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
      setMessages(prev => [...prev, { role: 'ai', text: "I'm sorry, I encountered an error. Please try again." }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const quickTips = [
    { label: t('Savings Tips'), prompt: 'Give me some tips on how to improve my chama savings.', icon: Plus },
    { label: t('Loan Risk'), prompt: 'How can our group minimize loan default risks?', icon: AlertCircle },
    { label: t('Merrigo Rules'), prompt: 'What are the best rules for a successful merry-go-round?', icon: ChevronRight },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="mb-4 w-full max-w-[400px] sm:w-[400px] h-[500px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200"
          >
            {/* Header */}
            <div className="p-4 bg-indigo-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">KIKOBA Smart Advisor</h4>
                  <p className="text-[10px] text-white/70">Powered by Gemini 3 Flash</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                 {messages.length > 0 && (
                   <button 
                     onClick={() => setMessages([])}
                     className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                     title="Clear chat"
                   >
                     <Eraser size={16} />
                   </button>
                 )}
                 <button 
                   onClick={() => setIsOpen(false)}
                   className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                 >
                   <X size={20} />
                 </button>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-6 no-scrollbar"
            >
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                    <Sparkles size={24} />
                  </div>
                  <h5 className="font-bold text-slate-900 mb-1">
                    {i18n.language.startsWith('sw') ? 'Jambo! Nisaidie na nini?' : i18n.language.startsWith('fr') ? 'Bonjour! Comment puis-je aider?' : 'Hi! How can I help today?'}
                  </h5>
                  <p className="text-xs text-slate-500 mb-6">Ask me anything about your Chama finances</p>
                  
                  <div className="space-y-2 w-full">
                    {quickTips.map(tip => (
                      <button 
                        key={tip.label}
                        onClick={() => handleSend(tip.prompt)}
                        className="w-full p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-left text-[11px] font-semibold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all flex items-center justify-between group"
                      >
                        {tip.label}
                        <tip.icon size={12} className="text-slate-300 group-hover:text-indigo-500" />
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg, i) => (
                  <div 
                    key={i}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] ${
                      msg.role === 'user' 
                        ? 'bg-indigo-600 text-white p-3 rounded-2xl rounded-tr-none shadow-md' 
                        : 'bg-slate-50 text-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-100'
                    }`}>
                      {msg.role === 'ai' ? (
                        <div className="markdown-body max-w-none text-xs">
                          <ReactMarkdown>{msg.text}</ReactMarkdown>
                        </div>
                      ) : (
                        <p className="text-xs leading-relaxed">{msg.text}</p>
                      )}
                    </div>
                  </div>
                ))
              )}
              {loading && (
                <div className="flex justify-start">
                   <div className="bg-slate-50 p-3 rounded-2xl rounded-tl-none border border-slate-100">
                     <span className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" />
                     </span>
                   </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-slate-100">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-1 group focus-within:border-indigo-400 focus-within:bg-white transition-all">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t('Ask about savings')}
                  className="flex-1 bg-transparent border-none outline-none text-xs py-2 text-slate-800"
                  disabled={loading}
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={loading || !input.trim()}
                  className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-30"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isOpen ? 'bg-slate-900 text-white rotate-90' : 'bg-indigo-600 text-white'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full border-2 border-slate-50" />
        )}
      </motion.button>
    </div>
  );
}
