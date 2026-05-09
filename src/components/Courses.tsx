import React from 'react';
import { Play, Clock, BookOpen, Star, ArrowRight, ClipboardList, CheckCircle2, Headphones } from 'lucide-react';
import { cn } from '../lib/utils';

const COURSES = [
  {
    id: 'c1',
    title: 'Self-Ruqyah Basics',
    instructor: 'Sheikh Ahmad',
    lessons: 12,
    duration: '4h 30m',
    rating: 4.9,
    price: 'Free',
    category: 'Healing',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'c2',
    title: 'Protection from Evil Eye',
    instructor: 'Ustadh Omar',
    lessons: 8,
    duration: '2h 15m',
    rating: 4.8,
    price: 1200,
    category: 'Healing',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'c3',
    title: 'Prophetic Medicine (Tibb al-Nabawi)',
    instructor: 'Dr. Kareem',
    lessons: 20,
    duration: '10h 00m',
    rating: 5.0,
    price: 3500,
    category: 'Islamic Study',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'c4',
    title: 'Fiqh of Purification & Salah',
    instructor: 'Sheikh Yahya',
    lessons: 15,
    duration: '6h 45m',
    rating: 4.9,
    price: 'Free',
    category: 'Foundations',
    image: 'https://images.unsplash.com/photo-1590076215667-873d420451ad?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'c5',
    title: 'Seerah: The Healing Life',
    instructor: 'Ustadh Hamza',
    lessons: 24,
    duration: '12h 00m',
    rating: 5.0,
    price: 2500,
    category: 'Foundations',
    image: 'https://images.unsplash.com/photo-1519750783826-e2420f4d687f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'c6',
    title: 'Essential Aqidah for Daily Life',
    instructor: 'Sheikh Yusuf',
    lessons: 10,
    duration: '4h 20m',
    rating: 4.7,
    price: 'Free',
    category: 'Foundations',
    image: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=600'
  }
];

const RESOURCES = [
  { title: 'Morning & Evening Adhkar', type: 'PDF Guide', length: '12 Pages', icon: BookOpen },
  { title: 'Prophetic Nutrition Plan', type: 'Dietary Chart', length: '5 Articles', icon: ClipboardList },
  { title: 'Ruqyah Checklist for Home', type: 'Checklist', length: '2 Pages', icon: CheckCircle2 },
  { title: 'Quranic Healing Verses', type: 'Reference', length: 'Full Audio', icon: Headphones },
];

export default function Courses() {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  
  const categories = ['All', 'Healing', 'Foundations', 'Islamic Study'];
  const filteredCourses = COURSES.filter(c => selectedCategory === 'All' || c.category === selectedCategory);

  return (
    <div className="p-8 space-y-20 max-w-7xl mx-auto pb-40">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone">Sukun Academy & Institute</p>
          <h1 className="text-6xl font-serif font-bold text-primary italic leading-none">Curated Knowledge</h1>
          <p className="text-stone max-w-sm font-medium leading-relaxed">Systematic learning tracks covering Islamic foundations and spiritual wellness.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex bg-sand p-1 rounded-2xl">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                  selectedCategory === cat ? "bg-white text-primary shadow-sm" : "text-stone hover:text-primary"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <button className="px-8 py-4 bg-white text-primary border-2 border-sand rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/5 hover:border-primary transition-all">My Learning Dashboard</button>
        </div>
      </header>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredCourses.map(course => (
          <div key={course.id} className="group flex flex-col space-y-6">
            <div className="aspect-[16/10] relative overflow-hidden bg-sand rounded-[40px] shadow-sm group-hover:shadow-2xl transition-all duration-500">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors" />
              <div className="absolute top-6 left-6 px-4 py-2 bg-white/95 backdrop-blur-md rounded-2xl text-[10px] font-black text-primary uppercase tracking-widest shadow-sm">
                {course.lessons} Modules
              </div>
              <div className="absolute bottom-6 left-6 right-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <button className="w-full btn-natural py-4 shadow-2xl shadow-primary/40">Start Learning</button>
              </div>
            </div>

            <div className="space-y-4 px-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-primary/40 uppercase tracking-widest">{course.category}</span>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span className="text-xs font-bold text-stone">{course.rating}</span>
                  </div>
                </div>
                <h3 className="text-3xl font-serif font-bold text-primary italic leading-tight group-hover:text-primary group-hover:underline decoration-sand underline-offset-8 transition-all">{course.title}</h3>
                <p className="text-xs font-bold text-stone opacity-50 uppercase tracking-widest">With {course.instructor}</p>
              </div>

              <div className="flex items-center gap-6 text-[10px] font-black text-stone uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-primary" />
                  {course.duration}
                </div>
                <div className="ml-auto text-xl font-black text-primary font-serif">
                  {typeof course.price === 'number' ? `৳${course.price}` : course.price}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Learning Section */}
      <div className="bg-sage rounded-[64px] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-16 relative overflow-hidden group">
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-white/20 rounded-full blur-[100px] group-hover:bg-white/40 transition-colors" />
        <div className="space-y-8 max-w-xl relative z-10">
          <div className="w-fit px-4 py-2 bg-white text-primary rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
            Exclusive Masterclass
          </div>
          <h2 className="text-5xl font-serif font-bold text-primary italic leading-tight">Islamic Psychology & Transpersonal Healing</h2>
          <p className="text-primary/70 text-xl leading-relaxed font-serif">
            A deep-dive program exploring classical Islamic texts on the soul (Nafs) and modern psychological paradigms.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 pt-4">
            <button className="btn-natural py-5 px-10 text-xs shadow-2xl shadow-primary/20">Reserve Your Spot</button>
            <button className="flex items-center gap-3 font-black text-primary group text-xs uppercase tracking-widest leading-none">
              Full Curriculum <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
        <div className="w-full md:w-[450px] aspect-square rounded-[64px] bg-white shadow-2xl relative z-10 border-[16px] border-white/40 overflow-hidden transform hover:rotate-2 transition-transform duration-700">
           <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* New Knowledge Library Section */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
           <h2 className="text-4xl font-serif font-bold text-primary italic">Knowledge Library</h2>
           <p className="text-stone font-medium uppercase text-[10px] tracking-[0.4em]">Essential Free Teaching Resources</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {RESOURCES.map((item, i) => (
             <div key={i} className="card-natural p-8 space-y-6 group hover:bg-primary hover:text-white transition-all duration-500 cursor-pointer">
                <div className="w-14 h-14 bg-sand rounded-2xl flex items-center justify-center text-primary group-hover:bg-white/20 group-hover:text-white transition-colors">
                  <item.icon size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-serif font-bold italic group-hover:text-white">{item.title}</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone group-hover:text-white/60">{item.type} • {item.length}</p>
                </div>
                <button className="w-full py-4 border-2 border-sand group-hover:border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                  Download <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                </button>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
}
