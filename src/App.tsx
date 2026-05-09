import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, ClipboardList, ShoppingBag, BookOpen, User, Phone, ShoppingCart, ArrowRight, AlertCircle, Headphones } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';

// Placeholder Pages
const Dashboard = () => (
  <div className="p-8 space-y-8 max-w-7xl mx-auto">
    <header className="flex items-center justify-between">
      <section className="space-y-1">
        <p className="text-xs text-stone uppercase tracking-wide font-bold">Assalamu Alaikum,</p>
        <h1 className="text-3xl font-serif italic text-primary">
          Ahmed Bin Yusuf
        </h1>
      </section>
      <div className="flex items-center gap-4">
        <div className="flex gap-2 bg-sand p-1 rounded-full">
          <button className="px-3 py-1 text-xs font-bold rounded-full bg-white shadow-sm">EN</button>
          <button className="px-3 py-1 text-xs font-bold text-stone">BN</button>
        </div>
        <div className="w-10 h-10 rounded-full bg-sage border-2 border-white shadow-sm"></div>
      </div>
    </header>

    {/* Guided Journey Card - Active Plan */}
    <div className="relative card-natural p-8 overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
        <svg className="w-32 h-32" fill="#5A5A40" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
      </div>
      
      <div className="relative z-10 space-y-6">
        <div className="w-fit px-3 py-1 bg-sand rounded-xl text-[10px] font-bold uppercase tracking-widest text-primary">
          Active Journey: 30-Day Spiritual Detox
        </div>
        <div className="space-y-2">
          <h2 className="text-4xl font-serif text-primary leading-tight">Your Day 4 Task</h2>
          <p className="text-stone max-w-sm">Recite Surah Al-Baqarah (First 5 Verses) and listen to the Evening Adhkar audio.</p>
        </div>
        
        <div className="space-y-2 max-w-md">
          <div className="flex justify-between text-[11px] font-bold text-stone">
            <span>Day 4 of 30</span>
            <span>12% Complete</span>
          </div>
          <div className="h-2 w-full bg-sand rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "12%" }}
              className="h-full bg-primary rounded-full" 
            />
          </div>
        </div>

        <button className="btn-natural">
          Submit Today's Task
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Self Assessment */}
      <div className="bg-sage p-8 rounded-[32px] flex flex-col justify-between space-y-6 hover:translate-y-[-4px] transition-transform shadow-lg shadow-sage/10">
        <div className="space-y-2">
          <h3 className="text-xl font-serif italic text-primary">Spiritual Health Check</h3>
          <p className="text-sm text-primary/80 leading-relaxed">Identify potential spiritual blockages or signs of evil eye with our safe tool.</p>
        </div>
        <Link to="/assessment" className="w-full bg-white/50 backdrop-blur-sm border border-primary/10 py-4 rounded-2xl text-center text-sm font-bold text-primary hover:bg-white transition-colors">
          Start Assessment
        </Link>
      </div>

      <div className="card-natural p-8 space-y-4 hover:border-primary transition-colors group">
        <div className="w-12 h-12 bg-sand text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
          <Phone size={24} />
        </div>
        <h3 className="text-xl font-serif font-bold">Book Service</h3>
        <p className="text-sm text-stone leading-relaxed">Schedule a session for Ruqyah, Hijama, or Counseling with our experts.</p>
        <Link to="/services" className="inline-flex items-center gap-2 font-bold text-sm text-primary">View Calendar <ArrowRight size={14} /></Link>
      </div>

      <div className="card-natural p-8 space-y-4 hover:border-primary transition-colors group">
        <div className="w-12 h-12 bg-sand text-primary rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
          <ShoppingBag size={24} />
        </div>
        <h3 className="text-xl font-serif font-bold">Healing Shop</h3>
        <p className="text-sm text-stone leading-relaxed">High-quality oils, honey, and herbs prepared with spiritual care.</p>
        <Link to="/shop" className="inline-flex items-center gap-2 font-bold text-sm text-primary">Explore Store <ArrowRight size={14} /></Link>
      </div>
    </div>

    {/* Emergency Trigger */}
    <div className="bg-[#fdfdf7] border border-sand p-8 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex gap-4 items-start">
        <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center shrink-0 border border-red-100 shadow-sm">
          <AlertCircle size={32} />
        </div>
        <div className="space-y-1">
          <h3 className="text-red-700 font-serif font-bold text-xl flex items-center gap-2 italic">
            Emergency Ruqyah
          </h3>
          <p className="text-stone text-sm leading-relaxed max-w-md">Immediate spiritual assistance for severe possession symptoms or extreme distress.</p>
        </div>
      </div>
      <button className="px-10 py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200/50 whitespace-nowrap">Request Help Now</button>
    </div>
  </div>
);


const AssessmentPage = () => (
  <div className="p-6 max-w-2xl mx-auto space-y-6">
    <h1 className="text-3xl font-bold">Self-Assessment</h1>
    <div className="bg-white p-8 rounded-2xl border border-slate-100 space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold italic text-slate-500">Notice</h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          This assessment is for spiritual guidance only. It is not a medical diagnosis. 
          For physical or psychological emergencies, please contact a healthcare professional.
        </p>
      </div>
      <button className="w-full py-4 bg-primary text-white rounded-xl font-semibold">I Understand, Let's Begin</button>
    </div>
  </div>
);

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/services', icon: Phone, label: 'Appointments' },
    { path: '/shop', icon: ShoppingBag, label: 'Healing Shop' },
    { path: '/courses', icon: BookOpen, label: 'Academy' },
    { path: '/audio', icon: Headphones, label: 'Resources' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background pb-20 md:pb-0 md:pl-64">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-border flex-col">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white font-serif text-xl italic shadow-md">S</div>
            <h1 className="text-xl font-bold tracking-tight text-primary font-serif">Sukun Care</h1>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium",
                location.pathname === item.path 
                  ? "bg-sand text-primary shadow-sm" 
                  : "text-stone hover:bg-slate-50 hover:text-primary"
              )}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-6">
          <div className="bg-primary text-white p-6 rounded-[24px] shadow-xl shadow-primary/20 space-y-4">
            <div className="space-y-1">
              <p className="text-[10px] opacity-70 uppercase tracking-widest font-bold">Premium</p>
              <p className="text-sm font-serif italic">Guided Ruqyah Journeys</p>
            </div>
            <button className="w-full bg-background text-primary text-[10px] font-black py-3 rounded-xl tracking-wider hover:bg-white transition-colors">UPGRADE NOW</button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <header className="h-20 bg-white border-b border-border flex items-center justify-between px-8 sticky top-0 z-10 md:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-serif text-lg italic">S</div>
            <span className="font-serif font-bold text-primary">Sukun Care</span>
          </div>
          <button className="relative p-2 text-stone">
            <ShoppingCart size={22} />
            <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">0</span>
          </button>
        </header>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-border flex items-center justify-around px-2 z-20">
        {navItems.slice(0, 5).map((item) => (
          <Link 
            key={item.path} 
            to={item.path} 
            className={cn(
              "flex flex-col items-center gap-1 p-2 transition-all",
              location.pathname === item.path ? "text-primary scale-110" : "text-stone"
            )}
          >
            <item.icon size={22} />
            <span className="text-[9px] font-bold uppercase tracking-tighter">{item.label.split(' ')[0]}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

import AssessmentEngine from './components/AssessmentEngine';
import Shop from './components/Shop';
import BookingSystem from './components/BookingSystem';
import Courses from './components/Courses';
import AudioLibrary from './components/AudioLibrary';
import Profile from './components/Profile';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/assessment" element={<AssessmentEngine />} />
          <Route path="/services" element={<BookingSystem />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/audio" element={<AudioLibrary />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
