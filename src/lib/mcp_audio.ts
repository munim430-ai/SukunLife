// src/lib/mcp_audio.ts
// Mock MCP integration for Background Audio (Digital Protection Loop)

export interface AudioTrack {
  id: string;
  title: string;
  type: 'adhkar' | 'ruqyah' | 'quran';
  url: string; // Typically a remote URL, mocked for now
  duration: number;
}

const mockTracks: AudioTrack[] = [
  { id: 'trk_1', title: 'Morning Adhkar Protection', type: 'adhkar', url: '#mock-audio-1', duration: 1200 },
  { id: 'trk_2', title: 'Ruqyah for Home', type: 'ruqyah', url: '#mock-audio-2', duration: 3600 },
];

export const mcpAudio = {
  getProtectionPlaylist: async (): Promise<AudioTrack[]> => {
    // Simulate fetching from MCP/Backend
    return new Promise((resolve) => setTimeout(() => resolve(mockTracks), 500));
  },

  // Note: True background audio requires native modules (e.g., react-native-track-player)
  // or specific Service Worker setups for PWAs.
  // For this web-based implementation, we use HTML5 Audio as a placeholder.
};
