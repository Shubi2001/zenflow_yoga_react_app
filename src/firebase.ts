import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { initializeFirestore, doc, getDocFromServer } from 'firebase/firestore';

// Import the Firebase configuration
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase SDK
const app = initializeApp(firebaseConfig);

// Initialize Firestore with settings to improve reliability in restricted environments
const databaseId = firebaseConfig.firestoreDatabaseId === '(default)' ? undefined : firebaseConfig.firestoreDatabaseId;
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true, // Helps with connection issues in some proxy environments
}, databaseId);

export const auth = getAuth(app);

// Set persistence to local
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.error("Auth persistence error:", err);
});

export const googleProvider = new GoogleAuthProvider();

// Test connection to Firestore with retries
async function testConnection(retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      await getDocFromServer(doc(db, 'test', 'connection'));
      console.log("Firestore connection test successful.");
      return;
    } catch (error: any) {
      console.warn(`Firestore connection attempt ${i + 1} failed:`, error.message);
      if (i === retries - 1) {
        if (error.message.includes('the client is offline') || error.code === 'unavailable') {
          console.error("CRITICAL: Could not reach Firestore. Please check your Firebase project and ensure the database is provisioned.");
        }
      }
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1)));
    }
  }
}
testConnection();
