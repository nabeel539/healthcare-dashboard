import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import { db, isDemoMode } from './firebase';
import type { Patient } from '../types';

const COLLECTION_NAME = 'patients';

// ─── Utility: Mock Delay ───────────────────────────────────────────────────
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// ─── Helpers for Initials & Colors ──────────────────────────────────────────
const getInitials = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

const colors = [
  'bg-blue-100 text-blue-700',
  'bg-emerald-100 text-emerald-700',
  'bg-purple-100 text-purple-700',
  'bg-amber-100 text-amber-700',
  'bg-rose-100 text-rose-700',
];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

// ─── Seed Data ─────────────────────────────────────────────────────────────
const SAMPLE_PATIENTS = [
  { name: 'Elena Rodriguez', age: 34, gender: 'Female', condition: 'Type 2 Diabetes', status: 'Active', lastVisit: '2024-10-24' },
  { name: 'Thomas Wright', age: 52, gender: 'Male', condition: 'Hypertension', status: 'Active', lastVisit: '2024-10-25' },
  { name: 'Sarah Chen', age: 28, gender: 'Female', condition: 'Asthma', status: 'Inactive', lastVisit: '2024-09-12' },
  { name: 'James Wilson', age: 45, gender: 'Male', condition: 'Chronic Back Pain', status: 'Active', lastVisit: '2024-10-20' },
  { name: 'Maria Garcia', age: 61, gender: 'Female', condition: 'Post-Op Recovery', status: 'Active', lastVisit: '2024-10-26' },
  { name: 'Robert Miller', age: 39, gender: 'Male', condition: 'Lyme Disease', status: 'Inactive', lastVisit: '2024-08-30' },
  { name: 'Linda Thompson', age: 72, gender: 'Female', condition: 'Osteoarthritis', status: 'Active', lastVisit: '2024-10-22' },
  { name: 'David Lee', age: 31, gender: 'Male', condition: 'Dermatitis', status: 'Active', lastVisit: '2024-10-24' },
];

export const seedPatients = async () => {
  if (isDemoMode || !db) return;
  const colRef = collection(db, COLLECTION_NAME);
  const snapshot = await getDocs(colRef);
  
  if (snapshot.empty) {
    console.log('🌱 Seeding initial patient records...');
    for (const p of SAMPLE_PATIENTS) {
      await addDoc(colRef, {
        ...p,
        createdAt: serverTimestamp(),
      });
    }
    console.log('✅ Seeding complete');
  }
};

// ─── CRUD Operations ───────────────────────────────────────────────────────
export const fetchPatientsFromStore = async (): Promise<Patient[]> => {
  if (isDemoMode || !db) {
    await delay(1000);
    // Fallback to minimal mock if needed, but requirements say replace all
    return [];
  }

  const colRef = collection(db, COLLECTION_NAME);
  const q = query(colRef, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      initials: getInitials(data.name),
      avatarColor: getRandomColor(),
    } as Patient;
  });
};

export const addPatientToStore = async (patient: Omit<Patient, 'id' | 'createdAt' | 'lastVisit' | 'status'>) => {
  if (isDemoMode || !db) {
    await delay(800);
    return { id: Math.random().toString(), ...patient, status: 'Active', lastVisit: new Date().toISOString().split('T')[0] } as Patient;
  }

  const colRef = collection(db, COLLECTION_NAME);
  const newPatient = {
    ...patient,
    status: 'Active',
    lastVisit: new Date().toISOString().split('T')[0],
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(colRef, newPatient);
  return { 
    id: docRef.id, 
    ...newPatient, 
    initials: getInitials(patient.name), 
    avatarColor: getRandomColor() 
  } as Patient;
};

export const updatePatientInStore = async (id: string, updates: Partial<Patient>) => {
  if (isDemoMode || !db) {
    await delay(500);
    return;
  }
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, updates);
};

export const deletePatientFromStore = async (id: string) => {
  if (isDemoMode || !db) {
    await delay(500);
    return;
  }
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
};
