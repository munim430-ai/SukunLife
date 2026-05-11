import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Stethoscope, Users, HeartPulse, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SadaqahButton } from '../components/SadaqahButton';
import { CommunityFeed } from '../components/CommunityFeed';
import { SukunAIChat } from '../components/SukunAIChat';

const Home = () => {
  return (
    <div className="pb-24">
      {/* Top Navbar for Booking (Mobile + Desktop) */}
      <header className="bg-white px-4 py-3 md:hidden flex items-center justify-between sticky top-0 z-40 border-b border-border">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-serif text-lg italic">S</div>
            <span className="font-serif font-bold text-primary text-xl">SukunLife</span>
        </div>
        <div className="flex gap-2">
          <Link to="/booking/ruqyah" className="p-2 bg-sage/30 text-primary rounded-full hover:bg-sage/50 transition-colors">
             <HeartPulse size={20} />
          </Link>
          <Link to="/booking/hijama" className="p-2 bg-sage/30 text-primary rounded-full hover:bg-sage/50 transition-colors">
            <Stethoscope size={20} />
          </Link>
          <Link to="/booking/counseling" className="p-2 bg-sage/30 text-primary rounded-full hover:bg-sage/50 transition-colors">
            <Users size={20} />
          </Link>
        </div>
      </header>

      {/* Desktop Specific Top Area (Optional if we want to show it there too) */}
      <div className="hidden md:flex bg-white px-8 py-4 items-center justify-between border-b border-border">
         <h2 className="text-2xl font-serif font-bold text-primary">Dashboard</h2>
         <div className="flex gap-3">
            <Link to="/booking/ruqyah" className="flex items-center gap-2 px-4 py-2 bg-sand text-primary rounded-xl font-medium hover:bg-sage/50 transition-colors">
              <HeartPulse size={18} /> Book Ruqyah
            </Link>
            <Link to="/booking/hijama" className="flex items-center gap-2 px-4 py-2 bg-sand text-primary rounded-xl font-medium hover:bg-sage/50 transition-colors">
              <Stethoscope size={18} /> Book Hijama
            </Link>
         </div>
      </div>

      <div className="p-4 md:p-8 space-y-6 max-w-3xl mx-auto">

        {/* Profile Card (bKash style with Glassmorphism) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-[32px] p-6 text-white shadow-xl bg-gradient-to-br from-primary to-primary-dark"
        >
          {/* Glassmorphic Background Element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>

          <div className="relative z-10 flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-2xl font-serif italic shadow-inner">
                AY
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Ahmed Yusuf</h2>
                <div className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-medium">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  Pro Member
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div className="text-center">
              <p className="text-white/60 text-[10px] uppercase tracking-wider font-bold mb-1">Nazar Scans</p>
              <p className="text-xl font-bold">5<span className="text-sm font-normal text-white/60">/7</span></p>
            </div>
            <div className="text-center border-x border-white/10">
              <p className="text-white/60 text-[10px] uppercase tracking-wider font-bold mb-1">Points</p>
              <p className="text-xl font-bold">1,240</p>
            </div>
            <div className="text-center">
              <p className="text-white/60 text-[10px] uppercase tracking-wider font-bold mb-1">Status</p>
              <p className="text-sm font-bold text-green-300 mt-1">Protected</p>
            </div>
          </div>
        </motion.div>

        {/* Spiritual Health Check */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-serif font-bold text-primary">Spiritual Health Check</h3>
            <span className="text-xs font-bold text-stone uppercase tracking-wider">Daily</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="card-natural p-5 text-left hover:border-primary transition-colors group">
              <div className="w-10 h-10 bg-sand rounded-full flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                <Activity size={20} />
              </div>
              <h4 className="font-bold text-charcoal mb-1">Quick Assessment</h4>
              <p className="text-xs text-stone leading-relaxed">2-min check for symptoms of affliction.</p>
            </button>

            <button className="card-natural p-5 text-left hover:border-primary transition-colors group">
              <div className="w-10 h-10 bg-sand rounded-full flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                <Calendar size={20} />
              </div>
              <h4 className="font-bold text-charcoal mb-1">Daily Tracker</h4>
              <p className="text-xs text-stone leading-relaxed">Log your Adhkar and prayers.</p>
            </button>
          </div>
        </div>

        {/* Sadaqah Section */}
        <div className="pt-2">
           <SadaqahButton />
        </div>

        {/* Community Feed */}
        <div className="space-y-4 pt-6">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xl font-serif font-bold text-primary">Community</h3>
          </div>

          <CommunityFeed />
        </div>

      </div>

      {/* AI Chat Bot */}
      <SukunAIChat />
    </div>
  );
};

export default Home;
