import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Nazar from './pages/Nazar';
import VerifiedPractitioners from './pages/VerifiedPractitioners';
import Knowledge from './pages/Knowledge';
import More from './pages/More';
import Premium from './pages/Premium';
import AssessmentEngine from './components/AssessmentEngine';
import Shop from './components/Shop';
import BookingSystem from './components/BookingSystem';
import Courses from './components/Courses';
import AudioLibrary from './components/AudioLibrary';
import Profile from './components/Profile';
import QuranReader from './components/QuranReader';

// Placeholders for Sprint 2/3 pages to ensure routing doesn't break
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="p-8 max-w-2xl mx-auto space-y-6">
    <h1 className="text-3xl font-serif text-primary font-bold">{title}</h1>
    <p className="text-stone">This feature is currently under development.</p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nazar" element={<Nazar />} />
          <Route path="/practitioners" element={<VerifiedPractitioners />} />
          <Route path="/knowledge" element={<Knowledge />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/more" element={<More />} />
          <Route path="/premium" element={<Premium />} />

          {/* Legacy/Other Routes */}
          <Route path="/assessment" element={<AssessmentEngine />} />
          <Route path="/booking/*" element={<BookingSystem />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/audio" element={<AudioLibrary />} />
          <Route path="/quran" element={<QuranReader />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
