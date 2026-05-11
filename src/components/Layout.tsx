import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Shield, ShoppingBag, BookOpen, MoreHorizontal, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import GlobalAudioPlayer from './AudioPlayer';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/nazar', icon: Shield, label: 'Nazar' },
  { path: '/shop', icon: ShoppingBag, label: 'Shop' },
  { path: '/knowledge', icon: BookOpen, label: 'Knowledge' },
  { path: '/more', icon: MoreHorizontal, label: 'More' },
];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background pb-20 md:pb-0 md:pl-64">
      {/* Desktop Sidebar (Modified to match the 5 tabs) */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-border flex-col">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center text-white font-serif text-xl italic shadow-md">S</div>
            <h1 className="text-xl font-bold tracking-tight text-primary font-serif">SukunLife</h1>
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
              <p className="text-sm font-serif italic">Unlock Full Protection</p>
            </div>
            <Link to="/premium" className="block text-center w-full bg-background text-primary text-[10px] font-black py-3 rounded-xl tracking-wider hover:bg-white transition-colors">UPGRADE NOW</Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative">
        {/* Desktop Top Bar */}
        <header className="hidden md:flex h-20 bg-white border-b border-border items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 text-stone">
             <span className="text-xs font-bold uppercase tracking-widest opacity-40 italic font-serif">Spiritual Super-App</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/shop/cart" className="relative p-2 text-stone hover:text-primary transition-colors">
              <ShoppingCart size={22} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">0</span>
            </Link>
          </div>
        </header>


        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Audio Player component handles its own positioning */}
      <GlobalAudioPlayer />

      {/* New 5-Tab Bottom Navigation for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-lg border-t border-border flex items-center justify-around px-2 z-50">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "relative flex flex-col items-center gap-1 p-2 transition-all w-16",
                isActive ? "text-primary" : "text-stone hover:text-primary/70"
              )}
            >
              <motion.div
                animate={{ y: isActive ? -4 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </motion.div>
              <span className="text-[10px] font-medium tracking-tight">
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute -top-3 w-1.5 h-1.5 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
