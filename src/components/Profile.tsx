import React from 'react';
import { Package, Truck, CheckCircle2, Clock, MapPin, User, Settings, LogOut, ChevronRight, Share2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const ORDERS = [
  {
    id: 'SK-10024',
    date: 'May 8, 2026',
    status: 'In Transit',
    total: 3200,
    items: ['Sidr Oil Blend', 'Ajwa Dates (500g)'],
    steps: [
      { label: 'Order Placed', date: 'May 8, 09:00 AM', completed: true },
      { label: 'Packed', date: 'May 8, 02:30 PM', completed: true },
      { label: 'Shipped', date: 'May 9, 10:15 AM', completed: true },
      { label: 'Out for Delivery', date: '--', completed: false },
    ]
  },
  {
    id: 'SK-09882',
    date: 'April 24, 2026',
    status: 'Delivered',
    total: 1500,
    items: ['Ruqyah Water Spray'],
    steps: [
      { label: 'Order Placed', completed: true },
      { label: 'Packed', completed: true },
      { label: 'Shipped', completed: true },
      { label: 'Delivered', completed: true },
    ]
  }
];

export default function Profile() {
  const [activeTab, setActiveTab] = React.useState('Orders');

  const shareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Sukun Care Profile',
        text: 'Join me on Sukun Care for spiritual wellness and healing.',
        url: window.location.href,
      }).catch(console.error);
    }
  };

  return (
    <div className="p-8 space-y-12 max-w-5xl mx-auto">
      <header className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-[32px] bg-sage border-4 border-white shadow-xl flex items-center justify-center text-primary text-3xl font-serif italic">
            AY
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-serif font-bold text-primary italic">Ahmed Bin Yusuf</h1>
            <p className="text-stone font-medium">Premium Member since Oct 2025</p>
            <div className="flex gap-2 pt-2">
               <button onClick={shareProfile} className="flex items-center gap-2 px-3 py-1 bg-sand rounded-full text-[10px] font-bold text-primary hover:bg-sage transition-colors">
                 <Share2 size={12} /> Share Invite
               </button>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="p-3 bg-white border border-sand rounded-2xl text-stone hover:text-primary transition-colors shadow-sm" aria-label="Settings">
            <Settings size={20} />
          </button>
          <button className="p-3 bg-white border border-sand rounded-2xl text-red-500 hover:bg-red-50 transition-colors shadow-sm" aria-label="Log out">
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <div className="flex gap-2 bg-sand p-1.5 rounded-[24px] w-fit">
        {['Orders', 'Progress', 'Settings'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-8 py-3 rounded-[20px] text-xs font-bold transition-all",
              activeTab === tab ? "bg-white text-primary shadow-sm" : "text-stone hover:text-primary"
            )}
            aria-pressed={activeTab === tab}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8">
        {activeTab === 'Orders' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-primary italic">Track Your Healing Tools</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {ORDERS.map(order => (
                <div key={order.id} className="card-natural p-8 space-y-6 group border-2 border-transparent hover:border-sand transition-all">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-stone uppercase tracking-widest leading-none">Order #{order.id}</p>
                      <h3 className="text-lg font-serif font-bold text-primary italic">{order.date}</h3>
                    </div>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm",
                      order.status === 'Delivered' ? "bg-sage text-primary" : "bg-primary text-white"
                    )}>
                      {order.status}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex -space-x-2">
                       {order.items.map((item, i) => (
                         <div key={i} className="w-10 h-10 rounded-xl bg-sand border-2 border-white flex items-center justify-center text-[8px] text-center p-1 leading-tight font-bold text-stone">
                           {item.split(' ')[0]}
                         </div>
                       ))}
                    </div>
                    <p className="text-stone text-xs font-medium">Items: {order.items.join(', ')}</p>
                  </div>

                  <div className="pt-6 border-t border-sand space-y-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-stone">Tracking History</p>
                    <div className="relative pl-8 space-y-8">
                      <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-sand" />
                      {order.steps.map((step, i) => (
                        <div key={i} className="relative">
                          <div className={cn(
                            "absolute -left-[22px] w-3 h-3 rounded-full border-2 border-white transition-colors",
                            step.completed ? "bg-primary" : "bg-sand"
                          )} />
                          <div className="space-y-0.5">
                            <p className={cn("text-xs font-bold", step.completed ? "text-primary" : "text-stone opacity-50")}>
                                {step.label}
                            </p>
                            {step.date !== '--' && <p className="text-[10px] text-stone font-medium">{step.date}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-sand">
                    <span className="text-lg font-bold text-primary">৳{order.total}</span>
                    <button className="btn-natural py-2 px-6 text-[10px]">View Receipt</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Progress' && (
          <div className="py-20 text-center card-natural border-dashed border-2 border-sand bg-transparent">
             <Clock className="mx-auto mb-4 text-stone opacity-30" size={48} />
             <h3 className="text-xl font-serif font-bold text-primary italic">Healing Metrics Under Construction</h3>
             <p className="text-stone max-w-sm mx-auto">We are building a more comprehensive way to track your spiritual health progress.</p>
          </div>
        )}
      </div>
    </div>
  );
}
