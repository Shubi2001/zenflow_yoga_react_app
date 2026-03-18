import React, { createContext, useContext, useEffect, useState } from 'react';
import { Pose } from '../types';
import { useAuth } from './AuthContext';
import { db } from '../firebase';
import { doc, updateDoc, arrayUnion, arrayRemove, increment } from 'firebase/firestore';

interface YogaContextType {
  favorites: string[];
  toggleFavorite: (poseId: string) => Promise<void>;
  progress: { completedSessions: number; totalMinutes: number };
  addSession: (minutes: number) => Promise<void>;
}

const YogaContext = createContext<YogaContextType | undefined>(undefined);

export const YogaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [progress, setProgress] = useState({ completedSessions: 0, totalMinutes: 0 });

  useEffect(() => {
    if (user) {
      setFavorites(user.favorites || []);
      setProgress({
        completedSessions: user.completedSessions || 0,
        totalMinutes: user.totalMinutes || 0
      });
    } else {
      setFavorites([]);
      setProgress({ completedSessions: 0, totalMinutes: 0 });
    }
  }, [user]);

  const toggleFavorite = async (poseId: string) => {
    if (!user) return;

    const userRef = doc(db, 'users', user.id);
    const isFavorite = favorites.includes(poseId);

    try {
      await updateDoc(userRef, {
        favorites: isFavorite ? arrayRemove(poseId) : arrayUnion(poseId)
      });
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  const addSession = async (minutes: number) => {
    if (!user) return;

    const userRef = doc(db, 'users', user.id);
    try {
      await updateDoc(userRef, {
        completedSessions: increment(1),
        totalMinutes: increment(minutes)
      });
    } catch (error) {
      console.error('Error adding session:', error);
    }
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
