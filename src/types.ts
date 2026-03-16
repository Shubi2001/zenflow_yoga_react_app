export interface Pose {
  id: string;
  name: string;
  sanskritName: string;
  description: string;
  benefits: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  image: string;
  category: string;
}

export interface YogaClass {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  image: string;
  category: string;
  description: string;
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  certifications: string[];
  experience: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  favorites: string[]; // Pose IDs
  completedSessions: number;
  totalMinutes: number;
}
