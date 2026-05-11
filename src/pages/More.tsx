import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, User, Settings, Clock, Bell, LogOut, ChevronRight, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

const PRAYER_TIMES = [
  { name: 'Fajr', time: '04:30 AM', current: false },
  { name: 'Sunrise', time: '05:45 AM', current: false },
  { name: 'Dhuhr', time: '12:15 PM', current: true },
  { name: 'Asr', time: '04:45 PM', current: false },
  { name: 'Maghrib', time: '06:30 PM', current: false },
  { name: 'Isha', time: '08:00 PM', current: false },
];

const More = () => {
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto pb-24 space-y-8">
      <header>
        <h1 className="text-3xl font-serif text-primary font-bold">More</h1>
      </header>

      {/* Namaz Time Table */}
      <div className="card-natural p-6 bg-gradient-to-br from-primary to-primary-dark text-white relative overflow-hidden">
         {/* Decorative pattern */}
         <div className="absolute top-0 right-0 opacity-10">
           <svg width="150" height="150" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16z"/>
              <path d="M12 6a6 6 0 100 12 6 6 0 000-12z"/>
           </svg>
         </div>

         <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <Clock size={20} className="text-sand" />
              <h2 className="text-xl font-serif font-bold">Prayer Times</h2>
              <span className="text-[10px] ml-auto uppercase tracking-widest font-bold bg-white/20 px-2 py-1 rounded-full">Dhaka</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
               {PRAYER_TIMES.map((prayer) => (
                 <div key={prayer.name} className={`p-3 rounded-2xl flex flex-col items-center justify-center text-center transition-all ${prayer.current ? 'bg-white text-primary shadow-lg scale-105 border-2 border-white/20' : 'bg-white/10 text-white border border-white/10'}`}>
                    <span className={`text-[10px] uppercase tracking-widest font-bold ${prayer.current ? 'text-stone' : 'text-white/60'}`}>{prayer.name}</span>
                    <span className={`font-bold mt-1 ${prayer.current ? 'text-lg' : 'text-sm'}`}>{prayer.time}</span>
                 </div>
               ))}
            </div>
         </div>
      </div>

      {/* Navigation Menu */}
      <div className="space-y-4">
         <h3 className="text-xs font-bold text-stone uppercase tracking-widest px-2">Spiritual</h3>
         <div className="card-natural overflow-hidden">
            <Link to="/quran" className="flex items-center justify-between p-4 hover:bg-sand transition-colors border-b border-border">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-sage text-primary rounded-xl flex items-center justify-center"><BookOpen size={20} /></div>
                  <div className="font-medium text-charcoal">The Noble Quran</div>
               </div>
               <ChevronRight size={18} className="text-stone" />
            </Link>
            <Link to="/bookmarks" className="flex items-center justify-between p-4 hover:bg-sand transition-colors">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-sage text-primary rounded-xl flex items-center justify-center"><Bookmark size={20} /></div>
                  <div className="font-medium text-charcoal">Saved Verses & Hadiths</div>
               </div>
               <ChevronRight size={18} className="text-stone" />
            </Link>
         </div>

         <h3 className="text-xs font-bold text-stone uppercase tracking-widest px-2 pt-4">Account</h3>
         <div className="card-natural overflow-hidden">
            <Link to="/profile" className="flex items-center justify-between p-4 hover:bg-sand transition-colors border-b border-border">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-sand text-primary rounded-xl flex items-center justify-center"><User size={20} /></div>
                  <div className="font-medium text-charcoal">Profile & Membership</div>
               </div>
               <ChevronRight size={18} className="text-stone" />
            </Link>
            <Link to="/settings" className="flex items-center justify-between p-4 hover:bg-sand transition-colors border-b border-border">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-sand text-primary rounded-xl flex items-center justify-center"><Settings size={20} /></div>
                  <div className="font-medium text-charcoal">Settings</div>
               </div>
               <ChevronRight size={18} className="text-stone" />
            </Link>
            <Link to="/notifications" className="flex items-center justify-between p-4 hover:bg-sand transition-colors border-b border-border">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-sand text-primary rounded-xl flex items-center justify-center"><Bell size={20} /></div>
                  <div className="font-medium text-charcoal">Notifications</div>
               </div>
               <ChevronRight size={18} className="text-stone" />
            </Link>
            <button className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-colors text-red-600">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center"><LogOut size={20} /></div>
                  <div className="font-medium">Sign Out</div>
               </div>
            </button>
         </div>
      </div>
    </div>
  );
};

export default More;
