import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, ShieldAlert, ShieldCheck, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const Nazar = () => {
  // Mock User State
  const isPro = false;
  const [scansUsed, setScansUsed] = useState(2);
  const totalScans = isPro ? 7 : 3;
  const remaining = totalScans - scansUsed;
  const isVulnerable = remaining === 0;

  const handleScan = () => {
    if (remaining > 0) {
      setScansUsed(prev => prev + 1);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto pb-24">
      <header className="mb-8">
        <h1 className="text-3xl font-serif text-primary font-bold">Nazar Shield</h1>
        <p className="text-stone text-sm">Spiritual Protection Monitoring</p>
      </header>

      {/* Main Shield Meter */}
      <div className="card-natural p-8 flex flex-col items-center text-center relative overflow-hidden">
        {isVulnerable && (
          <div className="absolute inset-0 bg-red-500/5 animate-pulse rounded-[32px]"></div>
        )}

        <motion.div
          className="relative w-48 h-48 flex items-center justify-center"
          animate={{ scale: isVulnerable ? [1, 1.05, 1] : 1 }}
          transition={{ repeat: isVulnerable ? Infinity : 0, duration: 2 }}
        >
          {/* Animated rings */}
          <div className={`absolute inset-0 rounded-full border-4 ${isVulnerable ? 'border-red-200' : 'border-sage'} opacity-50`}></div>
          <motion.div
            className={`absolute inset-0 rounded-full border-t-4 border-l-4 ${isVulnerable ? 'border-red-500' : 'border-primary'}`}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          ></motion.div>

          <div className={`w-32 h-32 rounded-full ${isVulnerable ? 'bg-red-50 text-red-500' : 'bg-sand text-primary'} flex items-center justify-center shadow-inner`}>
            {isVulnerable ? <ShieldAlert size={48} /> : <ShieldCheck size={48} />}
          </div>
        </motion.div>

        <div className="mt-8 space-y-2">
          <h2 className={`text-2xl font-bold font-serif ${isVulnerable ? 'text-red-600' : 'text-primary'}`}>
            {isVulnerable ? 'Status: Vulnerable' : 'Status: Protected'}
          </h2>
          <p className="text-stone">
            {isVulnerable
              ? 'You have reached your free scan limit. Upgrade to Pro or wait until next week.'
              : 'Your spiritual shield is currently active.'}
          </p>
        </div>

        <div className="w-full mt-8 bg-sand rounded-full h-4 overflow-hidden">
          <motion.div
            className={`h-full ${isVulnerable ? 'bg-red-500' : 'bg-primary'}`}
            initial={{ width: 0 }}
            animate={{ width: `${(remaining / totalScans) * 100}%` }}
            transition={{ duration: 1 }}
          />
        </div>
        <p className="mt-3 text-sm font-bold text-stone">
          {remaining} of {totalScans} Scans Remaining This Week
        </p>

        <button
          onClick={handleScan}
          disabled={isVulnerable}
          className={`mt-8 px-8 py-4 rounded-2xl font-bold transition-all shadow-md active:scale-95 w-full md:w-auto ${
            isVulnerable
              ? 'bg-stone/20 text-stone cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary-dark'
          }`}
        >
          {isVulnerable ? 'Limit Reached' : 'Run Protection Scan'}
        </button>
      </div>

      {/* Upgrade Banner for Free Users */}
      {!isPro && (
        <div className="mt-6 bg-gradient-to-r from-primary to-primary-dark rounded-[24px] p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-start gap-3">
             <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm mt-1">
               <Shield size={24} />
             </div>
             <div>
               <h3 className="font-serif font-bold text-lg">Unlock Pro Protection</h3>
               <p className="text-white/80 text-sm">Get 7 scans per week and automated Adhkar reminders.</p>
             </div>
          </div>
          <Link to="/premium" className="bg-white text-primary px-6 py-2 rounded-xl font-bold text-sm whitespace-nowrap shadow-sm hover:bg-sand transition-colors">
            Upgrade Now
          </Link>
        </div>
      )}

      {/* Practitioners Teaser */}
      <div className="mt-8">
         <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif font-bold text-xl text-primary">Need Help?</h3>
         </div>
         <Link to="/practitioners" className="card-natural p-5 flex items-center justify-between hover:border-primary transition-colors">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-sand rounded-xl flex items-center justify-center text-primary">
                 <ShieldCheck size={24} />
               </div>
               <div>
                  <h4 className="font-bold text-charcoal">Find a Verified Practitioner</h4>
                  <p className="text-sm text-stone">Consult with trusted Ruqyah experts.</p>
               </div>
            </div>
            <div className="text-primary bg-sand p-2 rounded-full">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </div>
         </Link>
      </div>
    </div>
  );
};

export default Nazar;
