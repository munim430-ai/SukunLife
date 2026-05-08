import React from 'react';
import { Play, Clock, BookOpen, Star, ArrowRight } from 'lucide-react';

const COURSES = [
  {
    id: 'c1',
    title: 'Self-Ruqyah Basics',
    instructor: 'Sheikh Ahmad',
    lessons: 12,
    duration: '4h 30m',
    rating: 4.9,
    price: 'Free',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'c2',
    title: 'Protection from Evil Eye',
    instructor: 'Ustadh Omar',
    lessons: 8,
    duration: '2h 15m',
    rating: 4.8,
    price: 1200,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'c3',
    title: 'Understanding Waswasa',
    instructor: 'Dr. Kareem',
    lessons: 15,
    duration: '6h 00m',
    rating: 5.0,
    price: 1800,
    image: 'https://images.unsplash.com/photo-1490127252417-7c393f993ee4?auto=format&fit=crop&q=80&w=300'
  }
];

export default function Courses() {
  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone">Sukun Academy</p>
          <h1 className="text-4xl font-serif font-bold text-primary italic">Islamic Wellness</h1>
          <p className="text-stone">Learn the science of spiritual healing from certified experts.</p>
        </div>
        <button className="px-8 py-3 bg-white text-stone border border-sand rounded-xl font-bold text-sm shadow-sm hover:bg-sand transition-colors">My Enrollments</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {COURSES.map(course => (
          <div key={course.id} className="group card-natural overflow-hidden hover:border-primary transition-all">
            <div className="aspect-video relative overflow-hidden bg-sand">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary shadow-xl">
                  <Play size={28} fill="currentColor" />
                </div>
              </div>
              <div className="absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-[10px] font-bold text-primary uppercase tracking-widest">
                {course.lessons} Lessons
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-bold text-primary italic leading-tight">{course.title}</h3>
                <p className="text-xs font-bold text-stone uppercase tracking-widest">Instructor: {course.instructor}</p>
              </div>

              <div className="flex items-center gap-6 text-xs font-bold text-stone">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-primary" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-2">
                  <Star size={16} className="text-primary fill-primary" />
                  {course.rating} Rating
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-sand">
                <div className="text-2xl font-bold text-primary">
                  {typeof course.price === 'number' ? `$${course.price / 100}` : course.price}
                </div>
                <button className="btn-natural py-2 px-6 text-xs">
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Learning Section */}
      <div className="bg-sage rounded-[40px] p-10 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="space-y-6 max-w-xl">
          <div className="w-fit px-3 py-1 bg-white/50 text-primary rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20">
            Advanced Masterclass
          </div>
          <h2 className="text-4xl font-serif font-bold text-primary italic leading-tight">Psychology & Spiritual Healing</h2>
          <p className="text-primary/70 text-lg leading-relaxed">
            A comprehensive 12-week program for practitioners and students to understand the intersection of clinical psychology and traditional Ruqyah.
          </p>
          <button className="flex items-center gap-3 font-bold text-primary group text-lg italic underline decoration-sand underline-offset-8 decoration-4 hover:decoration-primary transition-all">
            Learn More <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
        <div className="w-full md:w-96 aspect-video rounded-[32px] bg-white shadow-2xl shadow-primary/5 flex items-center justify-center border-8 border-white/50 overflow-hidden group">
           <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
        </div>
      </div>
    </div>
  );
}
