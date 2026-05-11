import React, { useState } from 'react';
import { CheckCircle2, Shield, Heart, Crown, Loader2, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Premium = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [processing, setProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const price = billingCycle === 'monthly' ? 500 : 4500;
  const savings = billingCycle === 'yearly' ? 'Save ৳1500' : '';

  const handleSubscribe = () => {
    setProcessing(true);
    // Simulate bKash/Nagad payment gateway delay
    setTimeout(() => {
      setProcessing(false);
      setShowSuccess(true);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="p-8 max-w-lg mx-auto pb-32 pt-20 text-center space-y-6">
         <motion.div
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
         >
           <CheckCircle2 size={48} />
         </motion.div>
         <h1 className="text-3xl font-serif font-bold text-primary">Alhamdulillah!</h1>
         <p className="text-stone">Your Sukun Premium subscription is now active. May Allah put Barakah in your healing journey.</p>
         <button onClick={() => window.location.href = '/'} className="btn-natural w-full mt-8">Return to Dashboard</button>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto pb-32">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Crown size={32} />
        </div>
        <h1 className="text-4xl font-serif text-primary font-bold mb-3">Sukun Premium</h1>
        <p className="text-stone max-w-md mx-auto">Elevate your spiritual protection with unlimited scans, guided journeys, and expert priority access.</p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-sand p-1 rounded-2xl flex items-center gap-1 relative">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all z-10 ${billingCycle === 'monthly' ? 'text-charcoal' : 'text-stone hover:text-charcoal'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all z-10 flex items-center gap-2 ${billingCycle === 'yearly' ? 'text-charcoal' : 'text-stone hover:text-charcoal'}`}
          >
            Yearly
            <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">Save 25%</span>
          </button>

          <motion.div
             className="absolute top-1 bottom-1 w-[100px] bg-white rounded-xl shadow-sm border border-border"
             animate={{ x: billingCycle === 'monthly' ? 4 : 108, width: billingCycle === 'monthly' ? 85 : 120 }}
             transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>
      </div>

      <div className="card-natural p-8 md:p-10 border-2 border-primary relative overflow-hidden bg-white/50 backdrop-blur-xl shadow-2xl shadow-primary/10">
        {/* Decorative BG */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row gap-8 justify-between">
           <div className="flex-1 space-y-6">
              <h3 className="text-xl font-bold uppercase tracking-widest text-primary/80">Pro Plan</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-serif font-bold text-charcoal">৳{price}</span>
                <span className="text-stone font-medium">/ {billingCycle === 'monthly' ? 'month' : 'year'}</span>
              </div>

              <ul className="space-y-4 pt-4">
                 {[
                   { icon: Shield, text: 'Unlimited Nazar Protection Scans' },
                   { icon: Heart, text: 'Full Access to Guided Audio Journeys' },
                   { icon: CheckCircle2, text: 'Priority Booking for Top Practitioners' },
                   { icon: Crown, text: 'Exclusive Masterclass Video Library' }
                 ].map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-charcoal">
                       <feature.icon size={20} className="text-primary shrink-0 mt-0.5" />
                       <span className="font-medium">{feature.text}</span>
                    </li>
                 ))}
              </ul>
           </div>

           <div className="flex-1 bg-sand/50 p-6 rounded-3xl border border-border flex flex-col justify-center">
              <p className="text-sm font-bold text-stone uppercase tracking-wider mb-4 text-center">Select Payment Method</p>

              <div className="space-y-3">
                 <button className="w-full bg-pink-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-pink-700 transition-colors shadow-md">
                    <span className="text-xl italic font-serif">bKash</span> Pay
                 </button>
                 <button className="w-full bg-orange-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 hover:bg-orange-600 transition-colors shadow-md">
                    <span className="text-xl italic font-serif">Nagad</span> Pay
                 </button>
                 <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border"></div></div>
                    <div className="relative flex justify-center"><span className="bg-sand/50 px-2 text-xs text-stone font-bold uppercase tracking-widest">Or</span></div>
                 </div>
                 <button className="w-full bg-white border-2 border-border text-charcoal font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:border-primary transition-colors">
                    <CreditCard size={20} /> Card Payment
                 </button>
              </div>

              <button
                onClick={handleSubscribe}
                disabled={processing}
                className="mt-6 w-full btn-natural flex items-center justify-center h-14"
              >
                {processing ? <Loader2 size={24} className="animate-spin" /> : 'Confirm Subscription'}
              </button>
              <p className="text-[10px] text-center text-stone mt-3">By subscribing, you agree to our Terms of Service.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
