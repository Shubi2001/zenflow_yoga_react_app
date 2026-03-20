import React, { createContext, useContext, useEffect, useState } from 'react';
import { Pose } from '../types';
import { useAuth } from './AuthContext';
import { db, auth } from '../firebase';
import { doc, updateDoc, arrayUnion, arrayRemove, increment, collection, query, where, onSnapshot, setDoc, getDoc, runTransaction } from 'firebase/firestore';

import { ThemeType } from '../types';

export interface Booking {
  id: string;
  userId: string;
  classId: string;
  timestamp: string;
  status: 'confirmed' | 'cancelled';
}

export interface ClassStats {
  classId: string;
  capacity: number;
  bookedCount: number;
}

interface YogaContextType {
  favorites: string[];
  toggleFavorite: (poseId: string) => Promise<void>;
  progress: { completedSessions: number; totalMinutes: number };
  addSession: (minutes: number) => Promise<void>;
  bookings: Booking[];
  classStats: Record<string, ClassStats>;
  bookClass: (classId: string) => Promise<void>;
  cancelBooking: (bookingId: string) => Promise<void>;
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const YogaContext = createContext<YogaContextType | undefined>(undefined);

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const YogaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [progress, setProgress] = useState({ completedSessions: 0, totalMinutes: 0 });
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [classStats, setClassStats] = useState<Record<string, ClassStats>>({});
  const [theme, setThemeState] = useState<ThemeType>(() => {
    const saved = localStorage.getItem('yoga-theme');
    return (saved as ThemeType) || 'earthy-tones';
  });

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem('yoga-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (user) {
      setFavorites(user.favorites || []);
      setProgress({
        completedSessions: user.completedSessions || 0,
        totalMinutes: user.totalMinutes || 0
      });

      // Listen to user bookings
      const q = query(collection(db, 'bookings'), where('userId', '==', user.id), where('status', '==', 'confirmed'));
      const unsubscribeBookings = onSnapshot(q, (snapshot) => {
        const userBookings = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Booking));
        setBookings(userBookings);
      }, (err) => {
        handleFirestoreError(err, OperationType.LIST, 'bookings');
      });

      return () => unsubscribeBookings();
    } else {
      setFavorites([]);
      setProgress({ completedSessions: 0, totalMinutes: 0 });
      setBookings([]);
    }
  }, [user]);

  useEffect(() => {
    // Listen to all class stats
    const unsubscribeStats = onSnapshot(collection(db, 'class_stats'), (snapshot) => {
      const stats: Record<string, ClassStats> = {};
      snapshot.docs.forEach(doc => {
        stats[doc.id] = doc.data() as ClassStats;
      });
      setClassStats(stats);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'class_stats');
    });

    return () => unsubscribeStats();
  }, []);

  const toggleFavorite = async (poseId: string) => {
    if (!user) return;

    const userRef = doc(db, 'users', user.id);
    const isFavorite = favorites.includes(poseId);

    try {
      await updateDoc(userRef, {
        favorites: isFavorite ? arrayRemove(poseId) : arrayUnion(poseId)
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.id}`);
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
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.id}`);
    }
  };

  const bookClass = async (classId: string) => {
    if (!user) throw new Error('Must be logged in to book a class');

    const bookingId = `${user.id}_${classId}`;
    const bookingRef = doc(db, 'bookings', bookingId);
    const statsRef = doc(db, 'class_stats', classId);

    try {
      await runTransaction(db, async (transaction) => {
        // Perform all reads first
        const statsDoc = await transaction.get(statsRef);
        const bookingDoc = await transaction.get(bookingRef);
        
        let currentStats: ClassStats;
        if (!statsDoc.exists()) {
          // Initialize stats if they don't exist (default capacity 20)
          currentStats = { classId, capacity: 20, bookedCount: 0 };
          transaction.set(statsRef, currentStats);
        } else {
          currentStats = statsDoc.data() as ClassStats;
        }

        if (currentStats.bookedCount >= currentStats.capacity) {
          throw new Error('Class is full');
        }

        if (bookingDoc.exists() && bookingDoc.data()?.status === 'confirmed') {
          throw new Error('Already booked for this class');
        }

        // Perform all writes after reads
        transaction.set(bookingRef, {
          id: bookingId,
          userId: user.id,
          classId,
          timestamp: new Date().toISOString(),
          status: 'confirmed'
        });

        transaction.update(statsRef, {
          bookedCount: increment(1)
        });
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `bookings/${bookingId}`);
    }
  };

  const cancelBooking = async (bookingId: string) => {
    if (!user) return;

    const bookingRef = doc(db, 'bookings', bookingId);
    
    try {
      const bookingDoc = await getDoc(bookingRef);
      if (!bookingDoc.exists() || bookingDoc.data()?.status !== 'confirmed') return;

      const classId = bookingDoc.data()?.classId;
      const statsRef = doc(db, 'class_stats', classId);

      await runTransaction(db, async (transaction) => {
        transaction.update(bookingRef, { status: 'cancelled' });
        transaction.update(statsRef, { bookedCount: increment(-1) });
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `bookings/${bookingId}`);
    }
  };

  return (
    <YogaContext.Provider value={{ favorites, toggleFavorite, progress, addSession, bookings, classStats, bookClass, cancelBooking, theme, setTheme }}>
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
