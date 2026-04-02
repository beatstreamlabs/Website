export interface Artist {
  id: string;
  name: string;
  image: string;
  genre: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  cover: string;
  tracks: Track[];
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  duration: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  image: string;
}

export const TRENDING_ARTISTS: Artist[] = [
  { id: '1', name: 'Cyber Neon', genre: 'Synthwave', image: 'https://picsum.photos/seed/artist1/400/400' },
  { id: '2', name: 'The Glitch', genre: 'Electronic', image: 'https://picsum.photos/seed/artist2/400/400' },
  { id: '3', name: 'Luna Ray', genre: 'Dream Pop', image: 'https://picsum.photos/seed/artist3/400/400' },
  { id: '4', name: 'Void Walker', genre: 'Techno', image: 'https://picsum.photos/seed/artist4/400/400' },
  { id: '5', name: 'Echo Pulse', genre: 'Ambient', image: 'https://picsum.photos/seed/artist5/400/400' },
  { id: '6', name: 'Red Shift', genre: 'Industrial', image: 'https://picsum.photos/seed/artist6/400/400' },
];

export const FEATURED_PLAYLISTS: Playlist[] = [
  { 
    id: 'p1', 
    title: 'Midnight Drive', 
    description: 'Perfect beats for late night cruising', 
    cover: 'https://picsum.photos/seed/p1/600/600',
    tracks: [
      { id: 't1', title: 'Neon Nights', artist: 'Cyber Neon', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', duration: '6:12' },
      { id: 't2', title: 'Glitch in the Matrix', artist: 'The Glitch', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', duration: '7:05' },
    ]
  },
  { 
    id: 'p2', 
    title: 'Neon Dreams', 
    description: 'Immerse yourself in synth landscapes', 
    cover: 'https://picsum.photos/seed/p2/600/600',
    tracks: [
      { id: 't3', title: 'Starlight', artist: 'Luna Ray', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', duration: '5:45' },
      { id: 't4', title: 'Void', artist: 'Void Walker', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', duration: '6:30' },
    ]
  },
  { 
    id: 'p3', 
    title: 'Cyberpunk 2077', 
    description: 'High tech, low life soundtrack', 
    cover: 'https://picsum.photos/seed/p3/600/600',
    tracks: [
      { id: 't5', title: 'Echoes', artist: 'Echo Pulse', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', duration: '4:15' },
    ]
  },
  { 
    id: 'p4', 
    title: 'Future Bass', 
    description: 'The sound of tomorrow, today', 
    cover: 'https://picsum.photos/seed/p4/600/600',
    tracks: [
      { id: 't6', title: 'Shift', artist: 'Red Shift', audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', duration: '5:20' },
    ]
  },
];

export const CATEGORIES: Category[] = [
  { id: 'c1', name: 'Electronic', color: 'bg-blue-600', image: 'https://picsum.photos/seed/c1/300/300' },
  { id: 'c2', name: 'Synthwave', color: 'bg-purple-600', image: 'https://picsum.photos/seed/c2/300/300' },
  { id: 'c3', name: 'Lo-Fi', color: 'bg-orange-600', image: 'https://picsum.photos/seed/c3/300/300' },
  { id: 'c4', name: 'Techno', color: 'bg-red-600', image: 'https://picsum.photos/seed/c4/300/300' },
  { id: 'c5', name: 'Ambient', color: 'bg-teal-600', image: 'https://picsum.photos/seed/c5/300/300' },
  { id: 'c6', name: 'Industrial', color: 'bg-zinc-700', image: 'https://picsum.photos/seed/c6/300/300' },
];
