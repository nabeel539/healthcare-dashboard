import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// ─── Demo mode detection ─────────────────────────────────────────────────────
// If the user hasn't set up Firebase, we use a local demo-mode fallback.
export const isDemoMode =
  !import.meta.env.VITE_FIREBASE_API_KEY ||
  import.meta.env.VITE_FIREBASE_API_KEY === 'your-api-key';

// ─── Firebase init (only when real config is present) ───────────────────────
let auth: ReturnType<typeof getAuth> | null = null;
let db: ReturnType<typeof getFirestore> | null = null;

if (!isDemoMode) {
  try {
    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    console.log('✅ Clinical Atelier: Firebase & Firestore Initialized');
  } catch (error) {
    console.error('❌ Clinical Atelier: Firebase Init Failed', error);
  }
} else {
  console.log('🧪 Clinical Atelier: Running in Demo Mode');
}

export { auth, db };

// ─── Demo credentials ────────────────────────────────────────────────────────
export const DEMO_EMAIL = 'demo@clinic.com';
export const DEMO_PASSWORD = 'password123';

// ─── Auth helpers ─────────────────────────────────────────────────────────────
export async function firebaseLogin(email: string, password: string): Promise<User> {
  if (isDemoMode) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      // Return a mock user object
      return {
        uid: 'demo-user-001',
        email: DEMO_EMAIL,
        displayName: 'Dr. Julianne Vane',
      } as unknown as User;
    }
    throw new Error('Invalid credentials. Use demo@clinic.com / password123');
  }

  const result = await signInWithEmailAndPassword(auth!, email, password);
  return result.user;
}

export async function firebaseLogout(): Promise<void> {
  if (isDemoMode) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return;
  }
  await signOut(auth!);
}

export function onAuthChange(callback: (user: User | null) => void): () => void {
  if (isDemoMode) {
    // In demo mode, immediately call with null (not logged in)
    callback(null);
    return () => { };
  }
  return onAuthStateChanged(auth!, callback);
}
