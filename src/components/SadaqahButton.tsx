import React, { useState } from 'react';
import { HeartHandshake, Loader2, CheckCircle2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SadaqahButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState<number | ''>('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const predefinedAmounts = [100, 500, 1000, 5000];

  const handleDonate = () => {
    if (!amount || amount < 10) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
        setAmount('');
      }, 3000);
    }, 2000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full card-natural p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-100 hover:border-emerald-300 transition-colors flex items-center justify-between group"
      >
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
             <HeartHandshake size={24} />
           </div>
           <div className="text-left">
             <h3 className="font-serif font-bold text-lg text-emerald-900">Sadaqah for Shifa</h3>
             <p className="text-xs text-emerald-700">"Charity extinguishes bad endings."</p>
           </div>
        </div>
        <div className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm">
          Donate
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl relative"
            >
              <button
                onClick={() => !processing && setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-stone hover:bg-sand rounded-full transition-colors z-10"
              >
                <X size={20} />
              </button>

              {success ? (
                <div className="p-10 text-center space-y-4">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={32} />
                  </motion.div>
                  <h3 className="text-2xl font-serif font-bold text-emerald-900">May Allah Accept</h3>
                  <p className="text-stone text-sm">Your Sadaqah of ৳{amount} has been processed successfully.</p>
                </div>
              ) : (
                <div className="p-8">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3">
                      <HeartHandshake size={32} />
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-charcoal mb-2">Give Sadaqah</h2>
                    <p className="text-stone text-sm">Your charity helps fund free Ruqyah sessions for those who cannot afford them.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-4 gap-2">
                      {predefinedAmounts.map(preset => (
                        <button
                          key={preset}
                          onClick={() => setAmount(preset)}
                          className={`py-3 rounded-xl font-bold text-sm transition-all ${amount === preset ? 'bg-emerald-600 text-white shadow-md' : 'bg-sand text-charcoal hover:bg-emerald-50 hover:text-emerald-700'}`}
                        >
                          ৳{preset}
                        </button>
                      ))}
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-xl font-bold text-stone">৳</span>
                      </div>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : '')}
                        placeholder="Custom amount"
                        className="w-full bg-white border-2 border-border rounded-xl py-4 pl-10 pr-4 text-xl font-bold focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>

                    <button
                      onClick={handleDonate}
                      disabled={processing || !amount || amount < 10}
                      className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 text-white transition-all shadow-md ${(!amount || amount < 10) ? 'bg-stone bg-opacity-50 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 active:scale-95'}`}
                    >
                      {processing ? <Loader2 size={20} className="animate-spin" /> : `Donate ${amount ? `৳${amount}` : ''} via bKash`}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
