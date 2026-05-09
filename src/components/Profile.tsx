import React, { useEffect, useState } from 'react';
import { 
  Package, Truck, CheckCircle2, Clock, MapPin, User, Settings, 
  LogOut, ChevronRight, Share2, CreditCard, Receipt, Bell, 
  ShieldCheck, Moon, ArrowRight, PlayCircle
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { auth } from '../lib/firebase';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  User as FirebaseUser 
} from 'firebase/auth';

const ORDERS = [
  {
    id: 'SK-10024',
    date: 'May 8, 2026',
    status: 'In Transit',
    total: 3200,
    items: ['Sidr Oil Blend', 'Ajwa Dates (500g)'],
    payment: 'Visa •••• 4242',
    address: '123 Healing Lane, Dhaka, Bangladesh',
    fees: { subtotal: 3100, shipping: 100, tax: 0 },
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
    payment: 'Cash on Delivery',
    address: '45 Sukun Plaza, Chittagong, Bangladesh',
    fees: { subtotal: 1450, shipping: 50, tax: 0 },
    steps: [
      { label: 'Order Placed', completed: true },
      { label: 'Packed', completed: true },
      { label: 'Shipped', completed: true },
      { label: 'Delivered', completed: true },
    ]
  }
];

export default function Profile() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Orders');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = () => signOut(auth);

  const shareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Sukun Care Profile',
        text: 'Join me on Sukun Care for spiritual wellness and healing.',
        url: window.location.href,
      }).catch(console.error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-sage border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8 max-w-xl mx-auto flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8">
        <div className="w-32 h-32 bg-sand rounded-[48px] flex items-center justify-center text-primary shadow-inner">
          <User size={64} className="opacity-20" />
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl font-serif font-bold text-primary italic">Welcome Back</h1>
          <p className="text-stone leading-relaxed">
            Sign in to access your healing tools, track your spiritual progress, and manage your academy enrollments.
          </p>
        </div>
        <button 
          onClick={handleLogin}
          className="w-full bg-primary text-white py-5 rounded-[24px] font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-6 h-6" alt="Google" />
          Continue with Google
        </button>
        <p className="text-[10px] text-stone/50 uppercase font-black tracking-widest">
          By continuing, you agree to our spiritual community guidelines
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-12 max-w-5xl mx-auto pb-32">
      <header className="flex flex-col md:flex-row items-center justify-between gap-8 group">
        <div className="flex items-center gap-8">
          <div className="relative">
            <div className="w-28 h-28 rounded-[40px] bg-sage border-4 border-white shadow-2xl overflow-hidden group-hover:rotate-3 transition-transform duration-500">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-primary text-4xl font-serif italic">
                  {user.displayName?.[0] || 'S'}
                </div>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-2xl shadow-lg border-2 border-sage flex items-center justify-center text-primary">
              <ShieldCheck size={20} />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-serif font-bold text-primary italic">{user.displayName}</h1>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest">Verified</span>
            </div>
            <p className="text-stone font-medium">{user.email}</p>
            <div className="flex gap-3 pt-2">
               <button onClick={shareProfile} className="flex items-center gap-2 px-4 py-2 bg-sand rounded-xl text-[10px] font-bold text-primary hover:bg-sage transition-colors border border-transparent hover:border-sand">
                 <Share2 size={12} /> Invite Family
               </button>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <button 
            className="p-4 bg-white border border-sand rounded-2xl text-stone hover:text-primary transition-all shadow-sm hover:shadow-md active:scale-90" 
            aria-label="Settings"
            onClick={() => setActiveTab('Settings')}
          >
            <Settings size={24} />
          </button>
          <button 
            onClick={handleLogout}
            className="p-4 bg-white border border-sand rounded-2xl text-red-500 hover:bg-red-50 transition-all shadow-sm hover:shadow-md active:scale-90" 
            aria-label="Log out"
          >
            <LogOut size={24} />
          </button>
        </div>
      </header>

      <div className="flex gap-2 bg-sand/50 backdrop-blur-md p-1.5 rounded-[30px] w-fit sticky top-24 z-10 border border-sand shadow-sm">
        {['Orders', 'Academy', 'Settings'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-10 py-4 rounded-[24px] text-xs font-black uppercase tracking-widest transition-all",
              activeTab === tab ? "bg-white text-primary shadow-xl shadow-primary/5" : "text-stone hover:text-primary"
            )}
            aria-pressed={activeTab === tab}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-12">
        {activeTab === 'Orders' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-serif font-bold text-primary italic">Healing Tools Orders</h2>
              <p className="text-xs font-bold text-stone opacity-50 uppercase tracking-widest">{ORDERS.length} Orders Total</p>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              {ORDERS.map(order => (
                <div 
                  key={order.id} 
                  className={cn(
                    "card-natural p-0 overflow-hidden group transition-all duration-500",
                    expandedOrder === order.id ? "ring-2 ring-primary bg-white" : "hover:border-sand"
                  )}
                >
                  <div className="p-8 space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                           <p className="text-[10px] font-black text-stone uppercase tracking-[0.2em] leading-none">ID: {order.id}</p>
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-primary italic leading-tight">{order.date}</h3>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={cn(
                          "px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] shadow-sm flex items-center gap-2",
                          order.status === 'Delivered' ? "bg-sage text-primary" : "bg-primary text-white"
                        )}>
                          {order.status === 'Delivered' ? <CheckCircle2 size={12} /> : <Truck size={12} />}
                          {order.status}
                        </span>
                        <p className="text-xs font-bold text-stone opacity-50">Est. Arrival: May 12</p>
                      </div>
                    </div>

                    <div className="flex items-end justify-between">
                      <div className="space-y-4">
                        <div className="flex -space-x-4">
                           {order.items.map((item, i) => (
                             <div key={i} className="w-14 h-14 rounded-[18px] bg-sand border-4 border-white flex items-center justify-center text-[9px] text-center p-2 leading-tight font-black text-primary shadow-sm hover:z-10 hover:scale-110 transition-all">
                               {item.split(' ').map(w => w[0]).join('')}
                             </div>
                           ))}
                        </div>
                        <p className="text-stone text-xs font-bold tracking-tight">Products: {order.items.join(' + ')}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                         <p className="text-xs font-bold text-stone opacity-40 uppercase tracking-widest">Total Paid</p>
                         <span className="text-3xl font-bold text-primary">৳{order.total}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    className="w-full py-4 bg-sand/50 text-[10px] font-black uppercase tracking-[0.3em] text-primary hover:bg-sand transition-colors flex items-center justify-center gap-2"
                  >
                    {expandedOrder === order.id ? 'Hide Details' : 'View Full Summary'}
                    <ChevronRight size={14} className={cn("transition-transform duration-500", expandedOrder === order.id ? "rotate-90" : "")} />
                  </button>

                  <AnimatePresence>
                    {expandedOrder === order.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-sand overflow-hidden"
                      >
                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12 bg-sand/20">
                           <div className="space-y-6">
                             <div>
                               <p className="text-[10px] font-black uppercase tracking-widest text-stone mb-4 flex items-center gap-2">
                                 <MapPin size={12} className="text-primary" /> Delivery Address
                               </p>
                               <div className="p-5 bg-white rounded-3xl border border-sand shadow-sm">
                                 <p className="text-sm font-medium text-stone leading-relaxed">{order.address}</p>
                               </div>
                             </div>
                             <div>
                               <p className="text-[10px] font-black uppercase tracking-widest text-stone mb-4 flex items-center gap-2">
                                 <CreditCard size={12} className="text-primary" /> Payment Method
                               </p>
                               <div className="p-5 bg-primary text-white rounded-3xl shadow-lg flex items-center justify-between">
                                 <span className="text-sm font-bold tracking-tight">{order.payment}</span>
                                 <CreditCard size={20} className="opacity-40" />
                               </div>
                             </div>
                           </div>

                           <div className="space-y-6">
                             <p className="text-[10px] font-black uppercase tracking-widest text-stone mb-4 flex items-center gap-2">
                               <Receipt size={12} className="text-primary" /> Billing Breakdown
                             </p>
                             <div className="space-y-4 font-bold text-sm">
                               <div className="flex justify-between text-stone">
                                 <span>Subtotal</span>
                                 <span>৳{order.fees.subtotal}</span>
                               </div>
                               <div className="flex justify-between text-stone">
                                 <span>Shipping & Handling</span>
                                 <span>৳{order.fees.shipping}</span>
                               </div>
                               <div className="flex justify-between text-stone pt-4 border-t border-sand text-lg text-primary">
                                 <span className="font-serif italic capitalize">Total Amount</span>
                                 <span>৳{order.total}</span>
                               </div>
                               <button className="w-full mt-4 flex items-center justify-center gap-2 py-4 border-2 border-primary text-primary rounded-2xl hover:bg-primary hover:text-white transition-all text-xs">
                                 <Receipt size={16} /> Download Invoice PDF
                               </button>
                             </div>
                           </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Academy' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-serif font-bold text-primary italic">My Enrollments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="card-natural p-8 space-y-6">
                  <div className="w-fit px-3 py-1 bg-sage text-primary rounded-full text-[10px] font-black uppercase tracking-widest">In Progress</div>
                  <h3 className="text-2xl font-serif font-bold text-primary italic">Islamic Wellness Certification</h3>
                  <div className="space-y-3">
                     <div className="flex justify-between text-xs font-bold text-stone">
                        <span>Course Finish Path</span>
                        <span className="text-primary">75%</span>
                     </div>
                     <div className="h-2 w-full bg-sand rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[75%]" />
                     </div>
                  </div>
                  <button className="w-full btn-natural py-4 flex items-center justify-center gap-3">
                    <PlayCircle size={20} /> Resume Learning
                  </button>
               </div>
               
               <div className="card-natural p-8 flex flex-col items-center justify-center text-center space-y-4 border-dashed border-2 border-sand bg-transparent">
                  <div className="w-16 h-16 bg-sand rounded-full flex items-center justify-center text-stone/30">
                    <Package size={32} />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-primary italic opacity-50">Start New Journey</h3>
                  <p className="text-xs text-stone font-medium">Explore more courses in Sukun Academy</p>
                  <button className="text-xs font-black uppercase tracking-widest text-primary underline underline-offset-8 decoration-sand decoration-4 hover:decoration-primary transition-all">Browse Courses</button>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'Settings' && (
          <div className="space-y-12">
            <div className="card-natural p-0 overflow-hidden">
              <div className="p-10 space-y-10">
                <div className="space-y-8">
                  <div className="flex items-center gap-4">
                    <div className="w-1 p-4 h-8 bg-primary rounded-full" />
                    <h3 className="text-2xl font-serif font-bold text-primary italic">Identity & Account</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-3">
                       <label className="text-[10px] font-black text-stone uppercase tracking-[0.2em] ml-2">Full Legal Name</label>
                       <div className="relative group">
                         <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone opacity-30 group-focus-within:text-primary transition-colors" size={18} />
                         <input type="text" defaultValue={user.displayName || ''} className="w-full bg-sand border-none rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-primary focus:ring-2 ring-primary/20 outline-none transition-all" />
                       </div>
                     </div>
                     <div className="space-y-3">
                       <label className="text-[10px] font-black text-stone uppercase tracking-[0.2em] ml-2">Spiritual Identity (Email)</label>
                       <div className="relative group">
                         <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-stone opacity-30" size={18} />
                         <input type="email" readOnly defaultValue={user.email || ''} className="w-full bg-sand/30 border-none rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-stone/50 cursor-not-allowed outline-none" />
                       </div>
                     </div>
                  </div>
                </div>

                <div className="pt-12 border-t border-sand space-y-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-1 p-4 h-8 bg-primary rounded-full" />
                      <h3 className="text-2xl font-serif font-bold text-primary italic">Deep Notification Logic</h3>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-sage rounded-2xl text-[10px] font-black text-primary uppercase tracking-widest border border-primary/10">
                      <Bell size={14} /> Smart Delivery Active
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {[
                       { icon: Bell, label: 'Spiritual Reminders', desc: 'Prayer, Adhkar & Daily Sunnah tasks.', enabled: true },
                       { icon: Package, label: 'Supply Chain Alerts', desc: 'Real-time tracking for your healing physical tools.', enabled: true },
                       { icon: ShieldCheck, label: 'Security & Access', desc: 'Log-in alerts and critical account data updates.', enabled: true },
                       { icon: Moon, label: 'Silence during Ibadah', desc: 'Automatically pause pings during prayer times.', enabled: false },
                     ].map((item, i) => (
                       <div key={i} className="flex items-center justify-between p-6 bg-sand/30 rounded-3xl border border-transparent hover:border-sand hover:bg-white transition-all group">
                         <div className="flex items-center gap-5">
                           <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-sand group-hover:scale-110 transition-transform">
                             <item.icon size={20} />
                           </div>
                           <div className="space-y-0.5">
                             <p className="text-sm font-bold text-primary">{item.label}</p>
                             <p className="text-[10px] text-stone font-medium max-w-[180px] leading-relaxed">{item.desc}</p>
                           </div>
                         </div>
                         <button 
                           className={cn(
                             "w-12 h-6 rounded-full relative transition-all duration-500",
                             item.enabled ? "bg-primary shadow-lg shadow-primary/20" : "bg-stone/20"
                           )}
                         >
                           <div className={cn(
                             "absolute top-1 bottom-1 w-4 bg-white rounded-full transition-all duration-500",
                             item.enabled ? "right-1" : "left-1"
                           )} />
                         </button>
                       </div>
                     ))}
                  </div>
                </div>

                <div className="pt-12 border-t border-sand space-y-8">
                  <div className="p-8 bg-sand/30 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-6 border border-sand">
                    <div className="space-y-1">
                      <h4 className="text-xl font-serif font-bold text-primary italic capitalize">Save Global Preferences</h4>
                      <p className="text-[10px] font-bold text-stone uppercase tracking-widest">Changes will propagate across all your signed-in devices</p>
                    </div>
                    <div className="flex gap-4">
                      <button className="px-8 py-4 text-xs font-black text-stone uppercase tracking-widest hover:text-primary transition-colors">Abort</button>
                      <button className="btn-natural py-4 px-12 text-xs">Propagate Changes</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-natural p-10 border-red-50 hover:border-red-100 bg-red-50/5 space-y-6 group">
                <div className="flex items-center gap-4">
                  <div className="w-1 p-3 h-6 bg-red-500 rounded-full" />
                  <h3 className="text-xl font-serif font-bold text-red-600 italic leading-none">The Terminal Path</h3>
                </div>
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                  <p className="text-xs font-medium text-stone/70 max-w-xl leading-relaxed">
                    Deleting your spiritual account is a permanent action. All your healing progress, academy certifications, and tool history will be removed from our records instantly.
                  </p>
                  <button className="text-[10px] font-black uppercase tracking-widest text-red-500 bg-white border-2 border-red-100 px-8 py-4 rounded-2xl hover:bg-red-500 hover:text-white hover:border-red-500 transition-all shadow-sm">
                    Initiate Account Deletion
                  </button>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

