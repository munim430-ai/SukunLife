// src/api/data.ts
// Mock Database service layer for Insforge Postgres integration

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- Mock Data Store ---

const mockDatabase = {
  users: [
    { id: 'usr_mock123', name: 'Ahmed Yusuf', proStatus: true, points: 1240, protectionLevel: 5 },
  ],
  practitioners: [
    { id: 'prac_1', name: 'Imam Khalid', type: 'Ruqyah Specialist', verified: true, rating: 4.9, available: true },
    { id: 'prac_2', name: 'Dr. Sarah', type: 'Certified Hijama', verified: true, rating: 4.8, available: false },
    { id: 'prac_3', name: 'Sheikh Abdullah', type: 'Islamic Counselor', verified: true, rating: 5.0, available: true },
  ],
  appointments: [
    { id: 'apt_1', userId: 'usr_mock123', practitionerId: 'prac_1', date: '2024-06-15T10:00:00Z', type: 'Ruqyah', status: 'upcoming' },
  ],
  hadiths: [
    { id: 'hdt_1', topic: 'Anxiety', text: "O Allah, I seek refuge in You from grief and sadness...", source: "Sahih al-Bukhari 2893" },
    { id: 'hdt_2', topic: 'Protection', text: "Whoever recites Ayatul Kursi after every obligatory prayer...", source: "Sunan an-Nasa'i" },
  ]
};

// --- API Service Layer ---

export const api = {
  // Users
  getUserProfile: async (userId: string) => {
    await delay(500);
    return mockDatabase.users.find(u => u.id === userId) || null;
  },

  // Practitioners
  getPractitioners: async (filters?: { type?: string, verifiedOnly?: boolean }) => {
    await delay(800);
    let results = [...mockDatabase.practitioners];
    if (filters?.type) results = results.filter(p => p.type.includes(filters.type!));
    if (filters?.verifiedOnly) results = results.filter(p => p.verified);
    return results;
  },

  // Appointments
  bookAppointment: async (userId: string, practitionerId: string, date: string, type: string) => {
    await delay(1200);
    const newApt = { id: `apt_${Date.now()}`, userId, practitionerId, date, type, status: 'pending' };
    mockDatabase.appointments.push(newApt);
    return newApt;
  },

  // Hadiths
  getHadithsByTopic: async (topic: string) => {
    await delay(600);
    return mockDatabase.hadiths.filter(h => h.topic.toLowerCase() === topic.toLowerCase());
  }
};
