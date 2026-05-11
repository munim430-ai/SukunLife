// src/lib/insforge.ts
// Mock Insforge Authentication integration

export type User = {
  id: string;
  email?: string;
  phoneNumber?: string;
  displayName: string;
  photoURL?: string;
  isPro: boolean;
};

// Simulated current user state
let currentUser: User | null = {
  id: 'usr_mock123',
  email: 'ahmed@example.com',
  displayName: 'Ahmed Yusuf',
  isPro: true,
};

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const insforgeAuth = {
  // Get current session
  getCurrentUser: (): User | null => currentUser,

  // Google Sign In (Mock)
  signInWithGoogle: async (): Promise<User> => {
    await delay(1000);
    currentUser = {
      id: 'usr_mock_google',
      email: 'user@google.com',
      displayName: 'Google User',
      isPro: false,
    };
    return currentUser;
  },

  // Email/Password Login (Mock)
  signInWithEmail: async (email: string, _password: string): Promise<User> => {
    await delay(1000);
    currentUser = {
      id: 'usr_mock_email',
      email,
      displayName: email.split('@')[0],
      isPro: false,
    };
    return currentUser;
  },

  // Phone OTP Login (Mock)
  requestOTP: async (phoneNumber: string): Promise<boolean> => {
    await delay(1000);
    console.log(`Mock OTP sent to ${phoneNumber}`);
    return true; // OTP sent successfully
  },

  verifyOTP: async (phoneNumber: string, code: string): Promise<User> => {
    await delay(1000);
    if (code !== '123456') { // Mock valid code
      throw new Error("Invalid OTP code");
    }
    currentUser = {
      id: 'usr_mock_phone',
      phoneNumber,
      displayName: 'Verified User',
      isPro: false,
    };
    return currentUser;
  },

  // Sign out
  signOut: async (): Promise<void> => {
    await delay(500);
    currentUser = null;
  }
};
