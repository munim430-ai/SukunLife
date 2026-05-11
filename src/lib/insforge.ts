// src/lib/insforge.ts
// Real Insforge Fetch client setup

export type User = {
  id: string;
  email?: string;
  phoneNumber?: string;
  displayName: string;
  photoURL?: string;
  isPro: boolean;
};

const BASE_URL = import.meta.env.VITE_INSFORGE_BASE_URL;
const API_KEY = import.meta.env.VITE_INSFORGE_API_KEY;

export const insforgeClient = async (query: string, variables: any = {}) => {
  if (!BASE_URL || !API_KEY) {
    console.warn("Missing Insforge credentials. Returning mock data or throwing.");
    throw new Error("Insforge credentials missing");
  }

  const response = await fetch(`${BASE_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  const data = await response.json();
  if (data.errors) {
    throw new Error(data.errors[0].message);
  }
  return data.data;
};

// Simulated current user state for MVP frontend preview
// Real auth would involve exchanging tokens with Insforge via OAuth/JWT
let currentUser: User | null = {
  id: 'usr_mock123',
  email: 'ahmed@example.com',
  displayName: 'Ahmed Yusuf',
  isPro: true,
};

export const insforgeAuth = {
  getCurrentUser: (): User | null => currentUser,

  signInWithGoogle: async (): Promise<User> => {
    // In a real app, this would redirect to Insforge OAuth flow
    await new Promise(r => setTimeout(r, 1000));
    return currentUser!;
  },

  requestOTP: async (phoneNumber: string): Promise<boolean> => {
    // Requires Insforge custom edge function or integrated Twilio
    await new Promise(r => setTimeout(r, 1000));
    console.log(`Mock OTP sent to ${phoneNumber}`);
    return true;
  },

  verifyOTP: async (phoneNumber: string, code: string): Promise<User> => {
    await new Promise(r => setTimeout(r, 1000));
    if (code !== '123456') throw new Error("Invalid OTP code");
    return currentUser!;
  },

  signOut: async (): Promise<void> => {
    await new Promise(r => setTimeout(r, 500));
    currentUser = null;
  }
};
