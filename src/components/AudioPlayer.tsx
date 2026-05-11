import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, X, Headphones, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { mcpAudio, AudioTrack } from '../lib/mcp_audio';

// Global Player State Component (Ideally this would use Zustand or Context for true persistence across routes)
// For this sprint, we'll place it in Layout.tsx to keep it persistent.

export const GlobalAudioPlayer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tracks, setTracks] = useState<AudioTrack[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Real implementation would use a ref to an HTMLAudioElement
  // const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    mcpAudio.getProtectionPlaylist().then(setTracks);
  }, []);

  // Mock progress simulation
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setProgress(0);
    setIsPlaying(true);
  };

  if (tracks.length === 0) return null;
  const track = tracks[currentTrackIndex];

  return (
    <>
      {/* Minimized Floating Player */}
      {!isOpen && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-24 right-4 md:right-8 z-50 bg-primary text-white p-3 rounded-2xl shadow-lg flex items-center gap-3 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            {isPlaying ? (
              <div className="flex items-end gap-1 h-4">
                <motion.div animate={{ height: [8, 16, 8] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-white rounded-t-sm" />
                <motion.div animate={{ height: [12, 6, 12] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-white rounded-t-sm" />
                <motion.div animate={{ height: [6, 14, 6] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-1 bg-white rounded-t-sm" />
              </div>
            ) : (
              <Headphones size={20} />
            )}
          </div>
          <div className="hidden md:block">
             <p className="text-xs font-bold truncate max-w-[120px]">{track.title}</p>
             <p className="text-[10px] text-white/60 uppercase tracking-wider">{track.type}</p>
          </div>
        </motion.div>
      )}

      {/* Expanded Player */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 z-[60] bg-white rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-t border-border overflow-hidden md:max-w-sm md:left-auto md:right-8 md:bottom-8 md:rounded-[32px] md:border"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-sand px-3 py-1 rounded-full flex items-center gap-2">
                  <Volume2 size={12} /> Background Protection Loop
                </span>
                <button onClick={() => setIsOpen(false)} className="p-2 text-stone hover:bg-sand rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-32 h-32 bg-primary rounded-2xl shadow-xl flex items-center justify-center text-white/50 relative overflow-hidden">
                  <Headphones size={48} />
                  {isPlaying && (
                     <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                  )}
                </div>

                <div>
                  <h3 className="font-serif font-bold text-xl text-charcoal">{track.title}</h3>
                  <p className="text-sm text-stone uppercase tracking-wider mt-1">{track.type}</p>
                </div>

                <div className="w-full space-y-2">
                  <div className="h-2 w-full bg-sand rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-1000 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-stone font-bold">
                    <span>{Math.floor((progress / 100 * track.duration) / 60)}:{(Math.floor(progress / 100 * track.duration) % 60).toString().padStart(2, '0')}</span>
                    <span>{Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-6 w-full">
                  <button className="p-3 text-stone hover:text-primary transition-colors"><SkipBack size={24} /></button>
                  <button
                    onClick={togglePlay}
                    className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-dark transition-colors active:scale-95"
                  >
                    {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
                  </button>
                  <button onClick={nextTrack} className="p-3 text-stone hover:text-primary transition-colors"><SkipForward size={24} /></button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalAudioPlayer;
