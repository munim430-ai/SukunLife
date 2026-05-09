import React, { useState } from 'react';
import { ASSESSMENT_QUESTIONS, Question } from '../constants/assessment';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, AlertTriangle } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

export default function AssessmentEngine() {
  const [step, setStep] = useState(-1); // -1 is intro, 0 is first question
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [complete, setComplete] = useState(false);

  const currentQuestion = ASSESSMENT_QUESTIONS[step];

  const handleSelect = (value: number) => {
    setResponses({ ...responses, [currentQuestion.id]: value });
    if (step < ASSESSMENT_QUESTIONS.length - 1) {
      setTimeout(() => setStep(step + 1), 200);
    } else {
      setComplete(true);
    }
  };

  const getResult = () => {
    const total = (Object.values(responses) as number[]).reduce((a, b) => a + b, 0);
    if (total > 15) return { 
      level: 'High Concern', 
      desc: 'Your symptoms suggest deep structural spiritual issues that may require direct Ruqyah intervention.',
      action: 'Book a Consultation',
      link: '/services'
    };
    if (total > 5) return { 
      level: 'Medium Concern', 
      desc: 'Some signs of spiritual imbalance detected. A self-care plan or protective Adhkar might be beneficial.',
      action: 'Start 7-Day Plan',
      link: '/'
    };
    return { 
      level: 'Low Concern', 
      desc: 'No major signs detected. Maintain your daily protection and Adhkar.',
      action: 'View Daily Duas',
      link: '/audio'
    };
  };

  if (complete) {
    const result = getResult();
    return (
      <div className="p-8 space-y-8 max-w-2xl mx-auto">
        <header className="text-center space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone">Your Analysis Result</p>
          <h1 className="text-4xl font-serif font-bold text-primary italic">{result.level}</h1>
        </header>

        <div className="card-natural p-10 space-y-8 shadow-xl shadow-primary/5">
          <p className="text-stone text-xl leading-relaxed text-center font-serif italic">"{result.desc}"</p>
          
          <div className="p-6 bg-sage/30 rounded-2xl border border-sage flex gap-4 items-start">
            <AlertTriangle className="text-primary shrink-0" size={24} />
            <p className="text-primary/80 text-sm leading-relaxed">
              <strong>Notice:</strong> This is a spiritual assessment based on common symptoms. For any persistent physical or mental illness, please consult a qualified medical professional.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 pt-4">
            <Link to={result.link} className="btn-natural py-4 text-lg text-center block">
              {result.action}
            </Link>
            <Link to="/" className="w-full py-4 bg-sand text-primary font-bold rounded-2xl text-center border border-border hover:bg-white transition-colors block">
              ড্যাশবোর্ডে ফিরে যান
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto overflow-hidden">
      <AnimatePresence mode="wait">
        {step === -1 ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8 py-12 text-center"
          >
            <div className="w-24 h-24 bg-sage text-primary rounded-[32px] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-sage/20">
              <ClipboardList size={48} />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold font-serif italic text-primary">Spiritual Health Check</h1>
              <p className="text-stone text-lg max-w-md mx-auto">
                Identify hidden spiritual blockages through a safe, Quranic-based questionnaire.
              </p>
            </div>
            <button 
              onClick={() => setStep(0)}
              className="px-12 py-4 bg-primary text-white rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all text-lg"
            >
              Begin Safe Assessment
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="space-y-10 py-8"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] font-bold text-stone uppercase tracking-widest">
                <span>Step {step + 1} of {ASSESSMENT_QUESTIONS.length}</span>
                <span className="text-primary">{Math.round(((step + 1) / ASSESSMENT_QUESTIONS.length) * 100)}%</span>
              </div>

              <div className="h-1.5 w-full bg-sand rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: `${((step + 1) / ASSESSMENT_QUESTIONS.length) * 100}%` }}
                  className="h-full bg-primary" 
                />
              </div>
            </div>

            <h2 className="text-3xl font-serif font-bold leading-tight text-primary italic">
              {currentQuestion.text}
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {currentQuestion.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(opt.value)}
                  className="group flex items-center justify-between p-6 rounded-[24px] border border-border bg-white hover:border-primary hover:bg-sand transition-all text-left"
                >
                  <span className="font-bold text-stone group-hover:text-primary transition-colors">{opt.text}</span>
                  <ChevronRight size={20} className="text-border group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>

            <button 
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-2 text-stone font-bold text-sm hover:text-primary transition-colors"
            >
              <ChevronLeft size={16} /> Back to Previous
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ClipboardList({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
      <path d="M9 12h6" />
      <path d="M9 16h6" />
      <path d="M12 8h.01" />
    </svg>
  );
}
