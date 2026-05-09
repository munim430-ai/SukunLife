import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, ListOrdered, Heart, Search, Headphones, Book, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const AUDIO_TRACKS = [
  { id: 't1', title: 'Full Ruqyah for General Healing', artist: 'Sheikh Mishary Rashid', duration: '45:12', category: 'General' },
  { id: 't2', title: 'Protection from Evil Eye', artist: 'Sheikh Idris Abkar', duration: '12:30', category: 'Evil Eye' },
  { id: 't3', title: 'Morning Adhkar (Shifah Focus)', artist: 'Sukun Care Exclusive', duration: '22:15', category: 'Protection' },
  { id: 't4', title: 'Manzil Recitation (Speed 1.2x)', artist: 'Sheikh Muhammad Siddiq', duration: '08:45', category: 'Sihr' },
  { id: 't5', title: 'Surah Al-Baqarah (First 5 Ayah)', artist: 'Sheikh Sudais', duration: '05:20', category: 'Quran' },
];

export default function AudioLibrary() {
  const [playing, setPlaying] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Audio');

  const filteredTracks = AUDIO_TRACKS.filter(track => {
    const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         track.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Audio' || track.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar Controls (Desktop) or Header (Mobile) */}
      <div className="w-full md:w-80 bg-white border-r border-border p-8 space-y-10 flex-shrink-0">
        <header className="space-y-6">
          <div className="w-14 h-14 bg-sage text-primary rounded-[20px] flex items-center justify-center shadow-lg shadow-sage/20 border-2 border-white">
            <Headphones size={28} />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-serif font-bold text-primary italic">Resources</h1>
            <p className="text-xs font-bold text-stone uppercase tracking-widest">Audio Ruqyah & Adhkar</p>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone/50" size={18} />
            <input 
              type="text" 
              placeholder="Search library..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-sand rounded-2xl text-sm outline-none focus:ring-2 ring-primary/10 transition-all font-medium border border-transparent focus:border-sand"
              aria-label="Search audio library"
            />
          </div>
        </header>

        <nav className="space-y-3">
          <p className="text-[10px] font-bold text-stone uppercase tracking-widest ml-4 mb-2">Categories</p>
          {['All Audio', 'General Healing', 'Protection', 'Quran'].map((cat) => (
            <button 
              key={cat} 
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "w-full text-left px-5 py-4 rounded-2xl text-sm font-bold transition-all flex items-center justify-between group",
                selectedCategory === cat ? "bg-primary text-white shadow-xl shadow-primary/10" : "text-stone hover:bg-sand hover:text-primary"
              )}
              aria-pressed={selectedCategory === cat}
            >
              <span>{cat}</span>
              <div className={cn("w-1.5 h-1.5 rounded-full transition-all", selectedCategory === cat ? "bg-white" : "bg-sand group-hover:bg-primary")} />
            </button>
          ))}
        </nav>

        <div className="pt-6 border-t border-sand">
           <Link to="/quran" className="flex items-center gap-4 p-4 bg-sage rounded-2xl text-primary hover:scale-[1.02] transition-all group">
             <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
               <Book size={20} />
             </div>
             <div className="space-y-0.5">
                <p className="text-xs font-black uppercase tracking-widest">Full Quran</p>
                <p className="text-[10px] opacity-60 font-medium">Interactive Reader</p>
             </div>
             <ChevronRight size={14} className="ml-auto opacity-30 group-hover:opacity-100 transition-all" />
           </Link>
        </div>
      </div>

      {/* Track List */}
      <div className="flex-1 p-8 space-y-10">
        <header className="space-y-8">
           <div className="flex items-center justify-between">
              <h2 className="text-xl font-serif font-bold text-primary italic">Featured Tracks</h2>
              <span className="text-[10px] font-bold text-stone uppercase tracking-widest">{filteredTracks.length} tracks found</span>
           </div>

           {/* Hero Entry to Quran */}
           <motion.div 
            whileHover={{ scale: 1.01 }}
            className="card-natural p-1 rounded-[40px] border-2 border-sage group bg-gradient-to-br from-white to-sage/20"
           >
              <div className="p-10 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="space-y-6 flex-1 text-center md:text-left">
                  <div className="flex flex-col items-center md:items-start gap-3">
                    <span className="px-4 py-2 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20">Miraculous Word</span>
                    <h3 className="text-4xl font-serif font-bold text-primary italic leading-tight">The Glorious Qur'an</h3>
                  </div>
                  <p className="text-stone font-medium leading-relaxed max-w-sm">Access the complete interactive text and heart-soothing recitations of the final revelation.</p>
                  <Link to="/quran" className="btn-natural py-4 px-12 group-hover:px-14 transition-all">Open Sacred Reader</Link>
                </div>
                <div className="w-full md:w-48 aspect-square rounded-[32px] bg-white border-2 border-sage flex items-center justify-center text-primary shadow-2xl group-hover:rotate-6 transition-transform">
                  <Book size={80} strokeWidth={1} />
                </div>
              </div>
           </motion.div>
        </header>

        <div className="grid grid-cols-1 gap-3">
          {filteredTracks.map(track => (
            <div 
              key={track.id}
              className={cn(
                "group flex items-center justify-between p-5 rounded-[28px] transition-all cursor-pointer border-2",
                playing === track.id ? "bg-white border-primary shadow-2xl shadow-primary/5" : "bg-white border-transparent hover:border-sand hover:bg-sand/30"
              )}
              onClick={() => setPlaying(track.id)}
            >
              <div className="flex items-center gap-5">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center transition-all",
                  playing === track.id ? "bg-primary text-white scale-110 shadow-lg shadow-primary/20" : "bg-sand text-stone group-hover:bg-white border border-transparent group-hover:border-sand"
                )}>
                  {playing === track.id ? <Pause size={24} fill="currentColor" /> : <Play size={24} className="ml-1" fill="currentColor" />}
                </div>
                <div className="space-y-1">
                  <h3 className={cn("font-serif font-bold text-lg italic", playing === track.id ? "text-primary" : "text-stone")}>{track.title}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-stone opacity-60">{track.artist}</span>
                    <span className="w-1 h-1 bg-sand rounded-full" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">{track.category}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-8">
                <span className="text-xs font-bold text-stone opacity-40 tabular-nums">{track.duration}</span>
                <button className={cn("p-2 rounded-xl transition-all", playing === track.id ? "text-primary bg-sand" : "text-stone/30 hover:text-red-400 hover:bg-white")}>
                  <Heart size={20} fill={playing === track.id ? "currentColor" : "none"} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mini Player */}
        {playing && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }}
            className="fixed bottom-24 md:bottom-8 left-6 md:left-auto right-6 md:right-8 lg:w-[400px] bg-primary text-white p-8 rounded-[40px] shadow-2xl z-30 space-y-8 border-4 border-white/10 backdrop-blur-xl"
          >
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white/10 rounded-[24px] flex items-center justify-center shrink-0 border border-white/10 relative group">
                <Headphones size={36} className="text-white group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-white/5 animate-pulse rounded-[24px]" />
              </div>
              <div className="flex-1 space-y-2 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3].map(i => <div key={i} className="w-1 h-3 bg-sage animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />)}
                  </div>
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-sage">Now Healing</span>
                </div>
                <h3 className="font-serif font-bold text-lg italic truncate leading-tight">
                  {AUDIO_TRACKS.find(t => t.id === playing)?.title}
                </h3>
                <p className="text-[10px] uppercase font-bold tracking-widest opacity-60 truncate">
                  {AUDIO_TRACKS.find(t => t.id === playing)?.artist}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "35%" }}
                  className="h-full bg-sage" 
                />
              </div>
              <div className="flex justify-between text-[10px] font-black tracking-widest text-white/40">
                <span>04:12</span>
                <span>{AUDIO_TRACKS.find(t => t.id === playing)?.duration}</span>
              </div>
            </div>

            <div className="flex items-center justify-between px-4">
              <button className="text-white/40 hover:text-white transition-colors transition-transform active:scale-90"><SkipBack size={32} /></button>
              <button onClick={() => setPlaying(null)} className="w-20 h-20 bg-white text-primary rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl">
                <Pause size={36} fill="currentColor" />
              </button>
              <button className="text-white/40 hover:text-white transition-colors transition-transform active:scale-90"><SkipForward size={32} /></button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
