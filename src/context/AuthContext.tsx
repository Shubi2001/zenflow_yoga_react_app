import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { auth, googleProvider, db } from '../firebase';
import { onAuthStateChanged, signInWithPopup, signOut, User as FirebaseUser, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  signupWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Check if user exists in Firestore
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUser(userDoc.data() as User);
        } else {
          // Create new user in Firestore
          const newUser: User = {
            id: firebaseUser.uid,
            name: firebaseUser.displayName || 'Zen User',
            email: firebaseUser.email || '',
            photoURL: firebaseUser.photoURL || undefined,
            favorites: [],
            completedSessions: 0,
            totalMinutes: 0,
            bio: '',
            gender: '',
            hobby: ''
          };
          await setDoc(userDocRef, newUser);
          setUser(newUser);
        }

        // Real-time listener for user data
        const unsubDoc = onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            setUser(doc.data() as User);
          }
        });

        return () => unsubDoc();
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      // Clear any existing auth state that might be stuck
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      console.error('Login failed:', error);
      
      if (error.code === 'auth/unauthorized-domain') {
        alert(`This domain (${window.location.hostname}) is not authorized in your Firebase Console. \n\nPlease add it to Authentication > Settings > Authorized domains.`);
      } else if (error.code === 'auth/popup-blocked') {
        alert('The login popup was blocked by your browser. Please allow popups for this site.');
      } else if (error.code === 'auth/popup-closed-by-user') {
        // User closed the popup, no need for a big alert
        console.log('User closed the login popup');
      } else {
        alert(`Login failed: ${error.message}`);
      }
      throw error;
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (error: any) {
      console.error('Email login failed:', error);
      throw error;
    }
  };

  const signupWithEmail = async (email: string, pass: string, name: string) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, pass);
      await updateProfile(result.user, { displayName: name });
      
      // The onAuthStateChanged listener will handle creating the Firestore document
    } catch (error: any) {
      console.error('Signup failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loginWithGoogle, 
      loginWithEmail,
      signupWithEmail,
      logout, 
      isAuthenticated: !!user,
      loading 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
