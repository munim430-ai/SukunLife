// src/api/data.ts
// Service layer capable of falling back to Mock data if Insforge tables aren't setup yet

import { insforgeClient } from '../lib/insforge';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- Fallback Mock Data Store ---
const mockDatabase = {
  users: [
    { id: 'usr_mock123', name: 'Ahmed Yusuf', proStatus: true, points: 1240, protectionLevel: 5 },
  ],
  practitioners: [
    { id: 'prac_1', name: 'Imam Khalid', type: 'Ruqyah Specialist', verified: true, rating: 4.9, available: true },
    { id: 'prac_2', name: 'Dr. Sarah', type: 'Certified Hijama', verified: true, rating: 4.8, available: false },
    { id: 'prac_3', name: 'Sheikh Abdullah', type: 'Islamic Counselor', verified: true, rating: 5.0, available: true },
  ],
  hadiths: [
    { id: 'hdt_1', topic: 'Anxiety', text: "O Allah, I seek refuge in You from grief and sadness...", source: "Sahih al-Bukhari 2893" },
    { id: 'hdt_2', topic: 'Protection', text: "Whoever recites Ayatul Kursi after every obligatory prayer...", source: "Sunan an-Nasa'i" },
  ]
};

// --- Real API Implementation (with Mock Fallbacks) ---
export const api = {

  getPractitioners: async (filters?: { type?: string, verifiedOnly?: boolean }) => {
    try {
      // Try to fetch from real Insforge DB
      const GET_PRACTITIONERS = `
        query {
          practitioners {
            id
            name
            type
            verified
            rating
            available
          }
        }
      `;
      const data = await insforgeClient(GET_PRACTITIONERS);
      let results = data.practitioners;
      if (filters?.type) results = results.filter((p: any) => p.type.includes(filters.type!));
      if (filters?.verifiedOnly) results = results.filter((p: any) => p.verified);
      return results;
    } catch (e) {
      // Fallback to mock data if table doesn't exist or not configured
      console.log("Using mock practitioners");
      await delay(800);
      let results = [...mockDatabase.practitioners];
      if (filters?.type) results = results.filter(p => p.type.includes(filters.type!));
      if (filters?.verifiedOnly) results = results.filter(p => p.verified);
      return results;
    }
  },

  getHadithsByTopic: async (topic: string) => {
    try {
      const GET_HADITHS = `
        query GetHadiths($topic: String!) {
          hadiths(where: { topic: { _eq: $topic } }) {
            id
            topic
            text
            source
          }
        }
      `;
      const data = await insforgeClient(GET_HADITHS, { topic });
      return data.hadiths;
    } catch (e) {
      console.log("Using mock hadiths");
      await delay(600);
      return mockDatabase.hadiths.filter(h => h.topic.toLowerCase() === topic.toLowerCase());
    }
  }
};
