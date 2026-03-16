import React, { createContext, useContext, useState } from 'react';
import { Pose } from '../types';

interface YogaContextType {
  favorites: string[];
  toggleFavorite: (poseId: string) => void;
  progress: { completedSessions: number; totalMinutes: number };
  addSession: (minutes: number) => void;
}

const YogaContext = createContext<YogaContextType | undefined>(undefined);

export const YogaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [progress, setProgress] = useState({ completedSessions: 0, totalMinutes: 0 });

  const toggleFavorite = (poseId: string) => {
    setFavorites(prev => 
      prev.includes(poseId) ? prev.filter(id => id !== poseId) : [...prev, poseId]
    );
  };

  const addSession = (minutes: number) => {
    setProgress(prev => ({
      completedSessions: prev.completedSessions + 1,
      totalMinutes: prev.totalMinutes + minutes
    }));
  };

  return (
    <YogaContext.Provider value={{ favorites, toggleFavorite, progress, addSession }}>
      {children}
    </YogaContext.Provider>
  );
};

export const useYoga = () => {
  const context = useContext(YogaContext);
  if (context === undefined) {
    throw new Error('useYoga must be used within a YogaProvider');
  }
  return context;
};
