import React, { useState, useEffect, useRef } from 'react';
import { Book, Search, Play, Pause, ChevronRight, X, Headphones, BookOpen, Volume2, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

// Types for Quran API
interface Chapter {
  id: number;
  revelation_place: string;
  revelation_order: number;
  bismillah_pre: boolean;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  pages: number[];
  translated_name: {
    language_name: string;
    name: string;
  };
}

interface Verse {
  id: number;
  verse_number: number;
  verse_key: string;
  text_uthmani: string;
  translations?: {
    id: number;
    resource_id: number;
    text: string;
  }[];
}

export default function QuranReader() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [versesLoading, setVersesLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recitationId, setRecitationId] = useState(7); // Mishary Rashid Alafasy by default
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fetch chapters on load
  useEffect(() => {
    async function fetchChapters() {
      try {
        const res = await fetch('https://api.quran.com/api/v4/chapters?language=en');
        const data = await res.json();
        setChapters(data.chapters);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch chapters", err);
        setLoading(false);
      }
    }
    fetchChapters();
  }, []);

  // Fetch verses when chapter is selected
  useEffect(() => {
    if (!selectedChapter) return;

    async function fetchVerses() {
      setVersesLoading(true);
      try {
        // Fetching verses with Uthmani text and Saheeh International translation (ID 131)
        const res = await fetch(`https://api.quran.com/api/v4/verses/by_chapter/${selectedChapter.id}?language=en&words=false&translations=131&fields=text_uthmani&per_page=1000`);
        const data = await res.json();
        setVerses(data.verses);
        
        // Setup audio
        const audioRes = await fetch(`https://api.quran.com/api/v4/chapter_recitations/${recitationId}/${selectedChapter.id}`);
        const audioData = await audioRes.json();
        setAudioUrl(audioData.audio_file.audio_url);
      } catch (err) {
        console.error("Failed to fetch verses", err);
      } finally {
        setVersesLoading(false);
      }
    }
    fetchVerses();
    // Reset audio state
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [selectedChapter, recitationId]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const filteredChapters = chapters.filter(c => 
    c.name_simple.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.translated_name.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.id.toString() === searchQuery
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 border-4 border-sand border-t-primary rounded-full animate-spin mx-auto" />
          <p className="font-serif italic text-primary animate-pulse">Illuminating the Quran...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row gap-8">
        
        {/* Left: Chapter Sidebar */}
        <aside className={cn(
          "w-full md:w-80 flex-shrink-0 space-y-6",
          selectedChapter ? "hidden md:block" : "block"
        )}>
          <Link to="/audio" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-stone hover:text-primary transition-colors group">
            <ArrowRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" /> Back to Resources
          </Link>
          
          <header className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/20">
                <Book size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold text-primary italic">Al-Qur'an</h1>
                <p className="text-[10px] font-black uppercase tracking-widest text-stone">The Final Revelation</p>
              </div>
            </div>
            
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone/50" size={18} />
              <input 
                type="text" 
                placeholder="Search Sura..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border border-sand rounded-2xl text-sm focus:ring-2 ring-primary/10 outline-none transition-all placeholder:text-stone/30 font-bold"
              />
            </div>
          </header>

          <div className="h-[60vh] md:h-[calc(100vh-280px)] overflow-y-auto pr-2 space-y-2 scrollbar-hide">
            {filteredChapters.map(chapter => (
              <button
                key={chapter.id}
                onClick={() => setSelectedChapter(chapter)}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-2xl transition-all group",
                  selectedChapter?.id === chapter.id 
                    ? "bg-primary text-white shadow-lg shadow-primary/10" 
                    : "bg-white border border-sand hover:border-primary/20 hover:bg-sand/30"
                )}
              >
                <div className="flex items-center gap-4 text-left">
                  <span className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black border",
                    selectedChapter?.id === chapter.id ? "bg-white/20 border-white/20" : "bg-sand border-sand text-stone"
                  )}>
                    {chapter.id}
                  </span>
                  <div>
                    <p className="font-serif font-bold italic">{chapter.name_simple}</p>
                    <p className={cn("text-[8px] font-bold uppercase tracking-widest", selectedChapter?.id === chapter.id ? "text-white/60" : "text-stone/40")}>
                      {chapter.translated_name.name}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-arabic text-xl leading-none">{chapter.name_arabic}</p>
                  <p className={cn("text-[8px] font-bold mt-1", selectedChapter?.id === chapter.id ? "text-white/60" : "text-stone/40")}>
                    {chapter.verses_count} Ayah
                  </p>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Right: Reading Pane */}
        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {selectedChapter ? (
              <motion.div 
                key={selectedChapter.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                {/* Chapter Header */}
                <header className="bg-white p-8 md:p-12 rounded-[48px] border-2 border-sand shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                    <BookOpen size={160} className="text-primary" />
                  </div>
                  
                  <div className="relative z-10 space-y-6">
                    <div className="flex items-center justify-between">
                      <button 
                        onClick={() => setSelectedChapter(null)}
                        className="md:hidden p-3 bg-sand rounded-xl text-primary"
                      >
                        <X size={20} />
                      </button>
                      <div className="flex gap-3">
                         <button 
                          onClick={toggleAudio}
                          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                         >
                           {isPlaying ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
                           {isPlaying ? 'Pause' : 'Play Audio'}
                         </button>
                         <button className="p-2 bg-sand rounded-xl text-primary hover:bg-sage transition-colors">
                           <Globe size={20} />
                         </button>
                      </div>
                    </div>

                    <div className="text-center space-y-2">
                       <h2 className="text-5xl font-serif font-bold text-primary italic leading-none">{selectedChapter.name_simple}</h2>
                       <p className="text-sm font-bold text-stone uppercase tracking-[0.3em] opacity-40">{selectedChapter.translated_name.name}</p>
                    </div>

                    <div className="flex items-center justify-center gap-8 pt-4">
                       <div className="text-center">
                         <p className="text-[10px] font-black text-stone uppercase tracking-widest opacity-40">Place</p>
                         <p className="text-sm font-bold text-primary capitalize italic font-serif">{selectedChapter.revelation_place}</p>
                       </div>
                       <div className="h-8 w-px bg-sand" />
                       <div className="text-center">
                         <p className="text-[10px] font-black text-stone uppercase tracking-widest opacity-40">Verses</p>
                         <p className="text-sm font-bold text-primary italic font-serif">{selectedChapter.verses_count}</p>
                       </div>
                    </div>
                  </div>
                </header>

                {/* Bismillah */}
                {selectedChapter.bismillah_pre && (
                   <div className="text-center py-12">
                     <p className="text-5xl font-arabic text-primary">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                     <p className="text-[10px] font-bold text-stone opacity-30 mt-4 uppercase tracking-[0.4em]">In the name of Allah, the Most Gracious, the Most Merciful</p>
                   </div>
                )}

                {/* Verses */}
                <div className="space-y-12">
                  {versesLoading ? (
                    <div className="py-20 flex flex-col items-center justify-center gap-4 text-stone/40">
                       <div className="w-10 h-10 border-2 border-sand border-t-primary rounded-full animate-spin" />
                       <p className="text-xs font-bold uppercase tracking-widest">Loading Verses...</p>
                    </div>
                  ) : (
                    verses.map((verse, idx) => (
                      <div key={verse.id} className="group relative space-y-6 px-4">
                        <div className="flex flex-col md:flex-row-reverse items-start gap-8">
                           {/* Numbers & Controls */}
                           <div className="flex md:flex-col items-center gap-3 shrink-0">
                             <div className="w-10 h-10 rounded-full border-2 border-sand flex items-center justify-center text-[10px] font-black text-primary bg-white shadow-sm group-hover:border-primary/20 group-hover:bg-sand/30 transition-all">
                               {verse.verse_number}
                             </div>
                             <button className="p-2 text-stone/20 hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                               <Play size={16} fill="currentColor" />
                             </button>
                           </div>

                           {/* Content */}
                           <div className="flex-1 space-y-8 text-right md:text-right">
                              <p className="text-4xl md:text-5xl font-arabic text-primary leading-[2.2] text-right" dir="rtl">
                                {verse.text_uthmani}
                              </p>
                              <div className="text-left space-y-2">
                                 {verse.translations?.map(t => (
                                   <p key={t.id} className="text-lg text-stone leading-relaxed font-medium">
                                     {t.text.replace(/<\/?[^>]+(>|$)/g, "")}
                                   </p>
                                 ))}
                              </div>
                           </div>
                        </div>
                        {idx !== verses.length - 1 && <div className="h-px w-full bg-sand/50" />}
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="h-[70vh] flex flex-col items-center justify-center text-center space-y-8 p-12 bg-sand/20 rounded-[64px] border-2 border-dashed border-sand">
                <div className="w-32 h-32 bg-white rounded-[40px] flex items-center justify-center text-primary shadow-xl border border-sand">
                  <BookOpen size={64} className="opacity-20" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-4xl font-serif font-bold text-primary italic leading-tight">Select a Sura to Begin</h2>
                  <p className="text-stone max-w-sm mx-auto leading-relaxed">Explore the miraculous word of Allah. Choose a chapter from the list to start reading and listening.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  {['Al-Fatihah', 'Al-Baqarah', 'Yaseen', 'Al-Mulk', 'Al-Waqi\'ah'].map(fav => (
                    <button 
                      key={fav}
                      onClick={() => setSelectedChapter(chapters.find(c => c.name_simple === fav) || null)}
                      className="px-6 py-3 bg-white text-primary rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:scale-105 transition-all border border-sand"
                    >
                      {fav}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Audio Element */}
      {audioUrl && (
        <audio 
          ref={audioRef} 
          src={audioUrl} 
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* Floating Audio Progress (if playing) */}
      <AnimatePresence>
        {isPlaying && selectedChapter && (
           <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-24 md:bottom-8 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[400px] bg-primary text-white p-6 rounded-3xl shadow-2xl z-50 flex items-center gap-4 border border-white/10"
           >
             <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
               <Volume2 size={24} />
             </div>
             <div className="flex-1 min-w-0">
               <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Listening to Recitation</p>
               <h4 className="font-serif italic text-lg truncate">{selectedChapter.name_simple}</h4>
             </div>
             <button 
              onClick={toggleAudio}
              className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
             >
               <Pause size={20} fill="currentColor" />
             </button>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
