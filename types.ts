export interface Route {
  id: string;
  name: string;
  region: string;
  distance: string;
  difficulty: number; // 1-5
  duration: string;
  description: string;
  startPoint: string;
  endPoint: string;
  tags: string[];
  imageUrl: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'Hiking' | 'Planning' | 'Resting' | 'Lying Flat' | 'Happy';
  location?: { lat: number; lng: number };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system' | 'teammate';
  senderName?: string;
  text: string;
  timestamp: Date;
  isMapResult?: boolean;
}

export interface SavedTrack {
  id: string;
  name: string;
  date: string;
  distance: string;
  duration: string;
  isUploaded: boolean;
}
