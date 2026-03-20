import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { initializeFirestore, doc, getDocFromServer, enableIndexedDbPersistence } from 'firebase/firestore';

// ... (rest of the imports)

// Import the Firebase configuration
import firebaseConfigJson from '../firebase-applet-config.json';

// Helper to check if a value is a placeholder or invalid
export const isPlaceholder = (val: any) => {
  if (val === undefined || val === null) return true;
  if (typeof val !== 'string') return true;
  
  const v = val.trim().toLowerCase();
  return (
    v === '' || 
    v === 'undefined' || 
    v === 'null' || 
    v === 'your_api_key' || 
    v.includes('your_') || 
    v.includes('placeholder') || 
    v.includes('invalid') ||
    v.length < 10 // Real Firebase keys are much longer
  );
};

// Use environment variables if available, otherwise fallback to the JSON config
const getFirebaseConfig = () => {
  const config = {
    apiKey: firebaseConfigJson.apiKey,
    authDomain: firebaseConfigJson.authDomain,
    projectId: firebaseConfigJson.projectId,
    appId: firebaseConfigJson.appId,
    firestoreDatabaseId: firebaseConfigJson.firestoreDatabaseId,
    storageBucket: firebaseConfigJson.storageBucket,
    messagingSenderId: firebaseConfigJson.messagingSenderId,
  };

  // Log key info for debugging (masked)
  if (config.apiKey) {
    console.log(`Firebase Config: Using key starting with ${config.apiKey.substring(0, 8)}... (Length: ${config.apiKey.length})`);
  } else {
    console.warn("Firebase Config: API key is missing!");
  }

  return config;
};

const firebaseConfig = getFirebaseConfig();

// Initialize Firebase SDK safely
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error("Firebase initialization failed:", error);
  // Create a dummy app object to prevent crashes in other parts of the app
  app = { options: firebaseConfig } as any;
}

// Initialize Firestore with settings to improve reliability in restricted environments
const databaseId = firebaseConfig.firestoreDatabaseId === '(default)' ? undefined : firebaseConfig.firestoreDatabaseId;

export let db: any;
try {
  db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
  }, databaseId);

  // Enable offline persistence
  if (typeof window !== 'undefined') {
    enableIndexedDbPersistence(db).catch((err) => {
      if (err.code === 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled in one tab at a a time.
        console.warn('Firestore persistence failed: Multiple tabs open');
      } else if (err.code === 'unimplemented') {
        // The current browser does not support all of the features required to enable persistence
        console.warn('Firestore persistence failed: Browser not supported');
      }
    });
  }
} catch (error) {
  console.error("Firestore initialization failed:", error);
  db = {}; // Dummy object
}

export let auth: any;
try {
  auth = getAuth(app);
  console.log("Firebase Auth initialized successfully.");
} catch (error: any) {
  console.error("Auth initialization failed:", error.message, error.code);
  console.error("Attempted config:", JSON.stringify({ ...firebaseConfig, apiKey: firebaseConfig.apiKey.substring(0, 8) + '...' }));
  auth = { app: { options: firebaseConfig } } as any;
}

// Set persistence to local only if auth is valid
if (auth && typeof auth.onAuthStateChanged === 'function') {
  setPersistence(auth, browserLocalPersistence).catch((err) => {
    console.error("Auth persistence error:", err);
  });
}

export const googleProvider = new GoogleAuthProvider();

// Test connection to Firestore with retries
async function testConnection(retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      await getDocFromServer(doc(db, 'test', 'connection'));
      console.log("Firestore connection test successful.");
      return;
    } catch (error: any) {
      console.warn(`Firestore connection attempt ${i + 1} failed:`, error.message, error.code);
      if (i === retries - 1) {
        if (error.message.includes('the client is offline') || error.code === 'unavailable' || error.code === 'permission-denied') {
          console.error(`CRITICAL: Could not reach Firestore (${error.code}). Please check your Firebase project and ensure the database is provisioned.`);
        }
      }
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1)));
    }
  }
}
testConnection();
