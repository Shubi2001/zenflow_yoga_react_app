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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [configError, setConfigError] = useState(false);

  useEffect(() => {
    // Rely on the initialization logic in firebase.ts
    if (!auth || !auth.onAuthStateChanged) {
      console.error("Firebase Auth not initialized correctly");
      setConfigError(true);
      setLoading(false);
      return;
    }

    try {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        try {
          if (firebaseUser) {
            // Set basic user info immediately for faster UI response
            const basicUser: User = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || 'Zen User',
              email: firebaseUser.email || '',
              photoURL: firebaseUser.photoURL || null,
              favorites: [],
              completedSessions: 0,
              totalMinutes: 0,
              bio: '',
              gender: '',
              hobby: ''
            };
            setUser(basicUser);
            setLoading(false); // Stop loading early if we have basic info

            const userDocRef = doc(db, 'users', firebaseUser.uid);
            
            try {
              const userDoc = await getDoc(userDocRef);

              if (userDoc.exists()) {
                setUser(userDoc.data() as User);
              } else {
                // Create new user in Firestore
                await setDoc(userDocRef, basicUser);
              }

              // Real-time listener for user data updates
              onSnapshot(userDocRef, (doc) => {
                if (doc.exists()) {
                  setUser(doc.data() as User);
                }
              }, (err) => {
                handleFirestoreError(err, OperationType.GET, `users/${firebaseUser.uid}`);
              });
            } catch (fsError) {
              handleFirestoreError(fsError, OperationType.GET, `users/${firebaseUser.uid}`);
            }
          } else {
            setUser(null);
            setLoading(false);
          }
        } catch (error) {
          console.error("Auth state change error:", error);
          setLoading(false);
        }
      });

      return () => unsubscribe();
    } catch (error) {
      console.error("Failed to subscribe to auth state changes:", error);
      setConfigError(true);
      setLoading(false);
    }
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
      {configError ? (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 p-6">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-red-100">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-stone-900 text-center mb-4">Firebase Setup Required</h2>
            <p className="text-stone-600 text-center mb-8">
              To connect your yoga app to the database, you need to add your Firebase API keys as secrets.
            </p>
            <div className="space-y-4">
              <div className="bg-stone-50 rounded-lg p-4 text-sm text-stone-700 border border-stone-200">
                <p className="font-semibold mb-2">How to fix this:</p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Open <strong>Settings</strong> (⚙️ gear icon)</li>
                  <li>Go to <strong>Secrets</strong></li>
                  <li>Add <strong>VITE_FIREBASE_API_KEY</strong> and other required variables</li>
                  <li>Click <strong>Apply</strong></li>
                </ol>
              </div>
              <button 
                onClick={() => window.location.reload()}
                className="w-full py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
              >
                I've added the secrets, reload
              </button>
            </div>
          </div>
        </div>
      ) : loading ? (
        <div className="min-h-screen flex items-center justify-center bg-stone-50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
            <p className="text-stone-500 font-medium animate-pulse">Connecting to ZenFlow...</p>
          </div>
        </div>
      ) : children}
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
