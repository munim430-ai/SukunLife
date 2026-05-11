import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Calculator, PlayCircle, Loader2 } from 'lucide-react';
import { api } from '../api/data';

const Knowledge = () => {
  const [activeTab, setActiveTab] = useState<'hadith' | 'zakat' | 'waz'>('hadith');

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto pb-24 space-y-8">
      <header>
        <h1 className="text-3xl font-serif text-primary font-bold">Knowledge Hub</h1>
        <p className="text-stone text-sm mt-1">Spiritual intelligence & guidance</p>
      </header>

      {/* Internal Navigation */}
      <div className="flex p-1 bg-sand rounded-xl">
        <button
          onClick={() => setActiveTab('hadith')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'hadith' ? 'bg-white text-primary shadow-sm' : 'text-stone hover:text-primary'}`}
        >
          Hadith Engine
        </button>
        <button
          onClick={() => setActiveTab('zakat')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'zakat' ? 'bg-white text-primary shadow-sm' : 'text-stone hover:text-primary'}`}
        >
          AI Zakat
        </button>
        <button
          onClick={() => setActiveTab('waz')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'waz' ? 'bg-white text-primary shadow-sm' : 'text-stone hover:text-primary'}`}
        >
          Waz Search
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'hadith' && <HadithEngine />}
          {activeTab === 'zakat' && <AIZakatCalculator />}
          {activeTab === 'waz' && <WazSearch />}
        </motion.div>
      </AnimatePresence>

    </div>
  );
};

const HadithEngine = () => {
  const topics = ['Anxiety', 'Protection', 'Patience', 'Wealth', 'Family'];
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [hadiths, setHadiths] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchHadiths = async (topic: string) => {
    setSelectedTopic(topic);
    setLoading(true);
    const data = await api.getHadithsByTopic(topic);
    setHadiths(data);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif font-bold text-lg mb-3">Life Topics</h3>
        <div className="flex flex-wrap gap-2">
          {topics.map(topic => (
            <button
              key={topic}
              onClick={() => fetchHadiths(topic)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedTopic === topic ? 'bg-primary text-white shadow-md' : 'bg-white border border-border text-stone hover:border-primary'}`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
           <div className="py-10 flex justify-center text-primary"><Loader2 className="animate-spin" size={32} /></div>
        ) : hadiths.length > 0 ? (
          hadiths.map(h => (
            <div key={h.id} className="card-natural p-6 space-y-4">
               <div className="w-8 h-8 bg-sand rounded-full flex items-center justify-center text-primary mb-2">
                 <BookOpen size={16} />
               </div>
               <p className="text-lg font-serif leading-relaxed text-charcoal">"{h.text}"</p>
               <div className="pt-4 border-t border-border flex justify-between items-center">
                 <span className="text-xs font-bold text-stone uppercase tracking-wider">{h.source}</span>
                 <button className="text-primary text-xs font-bold bg-sand px-3 py-1 rounded-full">Share</button>
               </div>
            </div>
          ))
        ) : selectedTopic ? (
           <div className="py-10 text-center text-stone">No hadiths found for this topic yet.</div>
        ) : null}
      </div>
    </div>
  );
};

const AIZakatCalculator = () => {
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    setCalculating(true);
    setResult(null);
    setTimeout(() => {
      setCalculating(false);
      setResult(2500); // Mock result
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <div className="card-natural p-6 bg-gradient-to-br from-white to-sand border-none shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-white rounded-xl text-primary shadow-sm"><Calculator size={24} /></div>
          <div>
            <h3 className="font-serif font-bold text-xl">AI-Powered Zakat</h3>
            <p className="text-xs text-stone">Smart asset analysis</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone uppercase tracking-wider mb-2">Total Savings (BDT)</label>
            <input type="number" placeholder="e.g. 100000" className="w-full bg-white border border-border rounded-xl py-3 px-4 focus:outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone uppercase tracking-wider mb-2">Gold Value (Current Market)</label>
            <input type="number" placeholder="e.g. 50000" className="w-full bg-white border border-border rounded-xl py-3 px-4 focus:outline-none focus:border-primary" />
          </div>

          <button
            onClick={handleCalculate}
            disabled={calculating}
            className="w-full btn-natural flex items-center justify-center gap-2 mt-4"
          >
            {calculating ? (
              <> <Loader2 size={18} className="animate-spin" /> Sukun AI is analyzing... </>
            ) : (
              'Calculate Zakat'
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary text-white p-6 rounded-2xl shadow-xl text-center"
          >
            <p className="text-white/80 text-sm mb-1 uppercase tracking-widest font-bold">Estimated Zakat</p>
            <p className="text-4xl font-serif font-bold">৳{result.toLocaleString()}</p>
            <p className="text-xs text-white/60 mt-4">Based on Nisab value for current year.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const WazSearch = () => {
  return (
    <div className="space-y-6">
       <div className="relative">
          <input
            type="text"
            placeholder="Search scholars, topics..."
            className="w-full bg-white border border-border rounded-2xl py-4 px-4 shadow-sm focus:outline-none focus:border-primary"
          />
       </div>

       <div className="space-y-4">
          {[1, 2].map((i) => (
             <div key={i} className="card-natural p-3 flex gap-4">
                <div className="w-32 h-24 bg-slate-200 rounded-xl relative flex items-center justify-center group cursor-pointer">
                   <PlayCircle size={32} className="text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                   <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">45:20</div>
                </div>
                <div className="flex-1 py-1">
                   <h4 className="font-bold text-sm line-clamp-2 leading-tight mb-1">Importance of Tawheed in Daily Life</h4>
                   <p className="text-xs text-stone">Sheikh Mufti Menk</p>
                   <p className="text-[10px] text-stone mt-2">1.2M views • 2 weeks ago</p>
                </div>
             </div>
          ))}
       </div>
    </div>
  )
}

export default Knowledge;
