import { create } from 'zustand';
import type { Patient } from '../types';
import {
  fetchPatientsFromStore,
  addPatientToStore,
  updatePatientInStore,
  deletePatientFromStore,
  seedPatients,
} from '../services/patientService';

interface PatientState {
  patients: Patient[];
  isLoading: boolean;
  error: string | null;
  fetchPatients: () => Promise<void>;
  addPatient: (patient: Omit<Patient, 'id' | 'createdAt' | 'lastVisit' | 'status'>) => Promise<void>;
  updatePatient: (id: string, updates: Partial<Patient>) => Promise<void>;
  deletePatient: (id: string) => Promise<void>;
}

export const usePatientStore = create<PatientState>((set, get) => ({
  patients: [],
  isLoading: false,
  error: null,

  fetchPatients: async () => {
    set({ isLoading: true, error: null });
    try {
      // Ensure data is seeded on first fetch if empty
      await seedPatients();
      const patients = await fetchPatientsFromStore();
      set({ patients, isLoading: false });
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
    }
  },

  addPatient: async (patientData) => {
    set({ isLoading: true, error: null });
    try {
      const newPatient = await addPatientToStore(patientData);
      // Optimistic update is better handled by adding the real returned doc
      set((state) => ({
        patients: [newPatient, ...state.patients],
        isLoading: false,
      }));
    } catch (err: any) {
      set({ error: err.message, isLoading: false });
      throw err;
    }
  },

  updatePatient: async (id, updates) => {
    set({ error: null });
    try {
      await updatePatientInStore(id, updates);
      set((state) => ({
        patients: state.patients.map((p) => (p.id === id ? { ...p, ...updates } : p)),
      }));
    } catch (err: any) {
      set({ error: err.message });
      throw err;
    }
  },

  deletePatient: async (id) => {
    const previousPatients = get().patients;
    // Optimistic update
    set((state) => ({
      patients: state.patients.filter((p) => p.id !== id),
    }));

    try {
      await deletePatientFromStore(id);
    } catch (err: any) {
      // Rollback on error
      set({ patients: previousPatients, error: err.message });
      throw err;
    }
  },
}));
