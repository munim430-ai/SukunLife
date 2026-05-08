import React, { useState } from 'react';
import { SERVICES, Service } from '../constants/services';
import { Calendar as CalendarIcon, Clock, MapPin, User, ChevronRight, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function BookingSystem() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [step, setStep] = useState(1); // 1: Service Select, 2: Date/Time, 3: Details, 4: Confirmation
  
  const [date, setDate] = useState('2026-05-10');
  const [time, setTime] = useState('10:00 AM');

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setStep(2);
  };

  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '06:00 PM'];

  if (step === 4) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center space-y-8 max-w-lg mx-auto py-24">
        <div className="w-24 h-24 bg-sage text-primary rounded-[32px] flex items-center justify-center shadow-lg shadow-sage/20 border-2 border-white">
          <CheckCircle2 size={48} />
        </div>
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone">Payment Required at Service</p>
          <h1 className="text-4xl font-serif font-bold text-primary italic">Booking Confirmed</h1>
          <p className="text-stone">BarakAllahu Feekum. Your session for <strong>{selectedService?.name}</strong> has been scheduled.</p>
        </div>
        <div className="card-natural p-8 w-full text-left space-y-4">
          <div className="flex items-center gap-4 text-stone font-medium">
            <CalendarIcon size={20} className="text-primary" />
            <span>Sunday, May 10th, 2026</span>
          </div>
          <div className="flex items-center gap-4 text-stone font-medium">
            <Clock size={20} className="text-primary" />
            <span>10:00 AM (Central Time)</span>
          </div>
          <div className="border-t border-sand pt-4 flex justify-between items-center pt-6">
            <span className="font-serif italic text-stone">Total Fee</span>
            <span className="text-2xl font-bold text-primary">${selectedService?.price}</span>
          </div>
        </div>
        <button onClick={() => setStep(1)} className="btn-natural w-full py-4">Return to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone">Professional Spiritual Care</p>
          <h1 className="text-4xl font-serif font-bold text-primary italic">Book a Session</h1>
        </div>
        
        {/* Step Indicator */}
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-sand shadow-sm">
          {[1, 2, 3].map(s => (
            <div 
              key={s} 
              className={cn(
                "h-2 rounded-full transition-all duration-500",
                step === s ? "w-10 bg-primary shadow-sm" : "w-2 bg-sand"
              )} 
            />
          ))}
        </div>
      </header>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {SERVICES.map(service => (
              <button
                key={service.id}
                onClick={() => handleServiceSelect(service)}
                className="group p-8 card-natural hover:border-primary transition-all text-left space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-sm border border-white/50",
                    service.category === 'ruqyah' ? "bg-sage text-primary" : 
                    service.category === 'hijama' ? "bg-[#fdf2f2] text-red-600" :
                    "bg-[#f0f7ff] text-blue-600"
                  )}>
                    {service.category === 'ruqyah' ? <User size={28} /> : <MapPin size={28} />}
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif font-bold text-primary italic">{service.name}</h3>
                    <p className="text-sm text-stone leading-relaxed line-clamp-3">{service.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-sand">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-stone uppercase tracking-wide">
                    <Clock size={14} className="text-primary" />
                    {service.duration} Session
                  </div>
                  <span className="text-2xl font-bold text-primary">${service.price}</span>
                </div>
              </button>
            ))}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card-natural p-10 space-y-10"
          >
            <div className="space-y-6">
              <h2 className="text-2xl font-serif font-bold text-primary italic flex items-center gap-3">
                <CalendarIcon size={24} />
                Preferred Date
              </h2>
              <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {['May 10', 'May 11', 'May 12', 'May 13', 'May 14'].map((d, i) => (
                  <button 
                    key={i}
                    onClick={() => setDate(`2026-05-${10+i}`)}
                    className={cn(
                      "flex flex-col items-center gap-2 min-w-[100px] p-6 rounded-[24px] border-2 transition-all",
                      date === `2026-05-${10+i}` 
                        ? "bg-primary border-primary text-white shadow-xl shadow-primary/20 scale-105" 
                        : "bg-sand border-transparent text-stone hover:bg-sage hover:text-primary"
                    )}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">{['Sun', 'Mon', 'Tue', 'Wed', 'Thu'][i]}</span>
                    <span className="text-2xl font-bold">{10+i}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-serif font-bold text-primary italic flex items-center gap-3">
                <Clock size={24} />
                Available Times
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {timeSlots.map(t => (
                  <button 
                    key={t}
                    onClick={() => setTime(t)}
                    className={cn(
                      "py-4 px-2 rounded-2xl border-2 text-xs font-bold transition-all",
                      time === t ? "bg-primary border-primary text-white shadow-lg" : "bg-white border-sand text-stone hover:border-primary"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-sand">
              <button onClick={() => setStep(1)} className="text-stone font-bold hover:text-primary transition-colors flex items-center gap-2">
                <ChevronRight size={20} className="rotate-180" /> Back
              </button>
              <button onClick={() => setStep(3)} className="btn-natural">Next: Patient Details</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card-natural p-10 space-y-10"
          >
            <div className="space-y-8">
              <h2 className="text-2xl font-serif font-bold text-primary italic">Patient Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone uppercase tracking-widest ml-4">Full Name</label>
                  <input type="text" placeholder="e.g. Abdullah Yusuf" className="w-full p-5 rounded-[24px] bg-sand border-2 border-transparent focus:bg-white focus:border-primary outline-none transition-all placeholder:text-stone/50 font-medium" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone uppercase tracking-widest ml-4">WhatsApp / Phone</label>
                  <input type="tel" placeholder="+880 1XXX-XXXXXX" className="w-full p-5 rounded-[24px] bg-sand border-2 border-transparent focus:bg-white focus:border-primary outline-none transition-all placeholder:text-stone/50 font-medium" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-stone uppercase tracking-widest ml-4">Spiritual Concerns (Optional)</label>
                <textarea placeholder="e.g. Feeling extreme fatigue, nightmares, blockages in life..." className="w-full p-5 rounded-[24px] bg-sand border-2 border-transparent focus:bg-white focus:border-primary outline-none transition-all h-40 placeholder:text-stone/50 font-medium" />
              </div>
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-sand">
              <button onClick={() => setStep(2)} className="text-stone font-bold hover:text-primary transition-colors flex items-center gap-2">
                <ChevronRight size={20} className="rotate-180" /> Back
              </button>
              <button onClick={() => setStep(4)} className="btn-natural px-12">Submit Booking Request</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
