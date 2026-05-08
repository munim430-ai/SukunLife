import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, ListOrdered, Heart, Search, Headphones } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

// Using a royalty-free placeholder audio file for functionality demo
const DEMO_AUDIO_URL = "https://actions.google.com/sounds/v1/water/rain_on_roof.ogg";

const AUDIO_TRACKS = [
  { id: 't1', title: 'Full Ruqyah for General Healing', artist: 'Sheikh Mishary Rashid', duration: '45:12', category: 'General Healing', src: DEMO_AUDIO_URL },
  { id: 't2', title: 'Protection from Evil Eye', artist: 'Sheikh Idris Abkar', duration: '12:30', category: 'Evil Eye', src: DEMO_AUDIO_URL },
  { id: 't3', title: 'Morning Adhkar (Shifah Focus)', artist: 'Sukun Care Exclusive', duration: '22:15', category: 'Protection', src: DEMO_AUDIO_URL },
  { id: 't4', title: 'Manzil Recitation (Speed 1.2x)', artist: 'Sheikh Muhammad Siddiq', duration: '08:45', category: 'Black Magic', src: DEMO_AUDIO_URL },
  { id: 't5', title: 'Surah Al-Baqarah (First 5 Ayah)', artist: 'Sheikh Sudais', duration: '05:20', category: 'Quran', src: DEMO_AUDIO_URL },
];

export default function AudioLibrary() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeCategory, setActiveCategory] = useState('All Audio');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, playingId]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const p = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(isNaN(p) ? 0 : p);
    }
  };

  const handleTrackSelect = (id: string) => {
    if (playingId === id) {
      setIsPlaying(!isPlaying);
    } else {
      setPlayingId(id);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    }
  };

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites(prev => {
      const newFavs = new Set(prev);
      if (newFavs.has(id)) newFavs.delete(id);
      else newFavs.add(id);
      return newFavs;
    });
  };

  const filteredTracks = AUDIO_TRACKS.filter(t => {
    const matchesCat = activeCategory === 'All Audio' || t.category === activeCategory;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.artist.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const activeTrack = AUDIO_TRACKS.find(t => t.id === playingId);
  
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search library..." 
              className="w-full pl-12 pr-4 py-4 bg-sand rounded-2xl text-sm outline-none focus:ring-2 ring-primary/10 transition-all font-medium border border-transparent focus:border-sand"
            />
          </div>
        </header>

        <nav className="space-y-3">
          <p className="text-[10px] font-bold text-stone uppercase tracking-widest ml-4 mb-2">Categories</p>
          {['All Audio', 'General Healing', 'Evil Eye', 'Black Magic', 'Protection', 'Quran'].map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "w-full text-left px-5 py-4 rounded-2xl text-sm font-bold transition-all flex items-center justify-between group",
                activeCategory === cat ? "bg-primary text-white shadow-xl shadow-primary/10" : "text-stone hover:bg-sand hover:text-primary"
              )}
            >
              <span>{cat}</span>
              <div className={cn("w-1.5 h-1.5 rounded-full transition-all", activeCategory === cat ? "bg-white" : "bg-sand group-hover:bg-primary")} />
            </button>
          ))}
        </nav>
      </div>

      {/* Track List */}
      <div className="flex-1 p-8 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-serif font-bold text-primary italic">Featured Tracks</h2>
          <button className="text-primary font-bold text-sm underline decoration-sand decoration-4 underline-offset-4 hover:decoration-primary transition-all">Play All</button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {filteredTracks.map(track => (
            <div 
              key={track.id}
              className={cn(
                "group flex items-center justify-between p-5 rounded-[28px] transition-all cursor-pointer border-2",
                playingId === track.id ? "bg-white border-primary shadow-2xl shadow-primary/5" : "bg-white border-transparent hover:border-sand hover:bg-sand/30"
              )}
              onClick={() => handleTrackSelect(track.id)}
            >
              <div className="flex items-center gap-5">
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center transition-all",
                  playingId === track.id ? "bg-primary text-white scale-110 shadow-lg shadow-primary/20" : "bg-sand text-stone group-hover:bg-white border border-transparent group-hover:border-sand"
                )}>
                  {playingId === track.id && isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} className="ml-1" fill="currentColor" />}
                </div>
                <div className="space-y-1">
                  <h3 className={cn("font-serif font-bold text-lg italic", playingId === track.id ? "text-primary" : "text-stone")}>{track.title}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-stone opacity-60">{track.artist}</span>
                    <span className="w-1 h-1 bg-sand rounded-full" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">{track.category}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-8">
                <span className="text-xs font-bold text-stone opacity-40 tabular-nums">{track.duration}</span>
                <button
                  onClick={(e) => toggleFavorite(e, track.id)}
                  className={cn("p-2 rounded-xl transition-all", favorites.has(track.id) ? "text-red-500 bg-red-50" : "text-stone/30 hover:text-red-400 hover:bg-white")}
                >
                  <Heart size={20} fill={favorites.has(track.id) ? "currentColor" : "none"} />
                </button>
              </div>
            </div>
          ))}
          {filteredTracks.length === 0 && (
            <div className="text-center py-10 text-stone">No tracks found.</div>
          )}
        </div>

        {/* Audio Element */}
        {activeTrack && (
          <audio
            ref={audioRef}
            src={activeTrack.src}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
          />
        )}

        {/* Mini Player */}
        {activeTrack && (
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
                  {activeTrack.title}
                </h3>
                <p className="text-[10px] uppercase font-bold tracking-widest opacity-60 truncate">
                  {activeTrack.artist}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-sage" 
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-black tracking-widest text-white/40">
                <span>{audioRef.current ? new Date(audioRef.current.currentTime * 1000).toISOString().substr(14, 5) : "00:00"}</span>
                <span>{activeTrack.duration}</span>
              </div>
            </div>

            <div className="flex items-center justify-between px-4">
              <button className="text-white/40 hover:text-white transition-colors transition-transform active:scale-90"><SkipBack size={32} /></button>
              <button onClick={() => setIsPlaying(!isPlaying)} className="w-20 h-20 bg-white text-primary rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl">
                {isPlaying ? <Pause size={36} fill="currentColor" /> : <Play size={36} className="ml-2" fill="currentColor" />}
              </button>
              <button className="text-white/40 hover:text-white transition-colors transition-transform active:scale-90"><SkipForward size={32} /></button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
