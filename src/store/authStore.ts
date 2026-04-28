import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthUser } from '../types';
import { firebaseLogin, firebaseLogout, onAuthChange } from '../services/firebase';

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  initialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  init: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      initialized: false,

      init: () => {
        onAuthChange((firebaseUser) => {
          if (firebaseUser) {
            set({
              user: {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName ?? 'Dr. Julianne Vane',
              },
              initialized: true,
            });
          } else {
            set({ user: null, initialized: true });
          }
        });
      },

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const firebaseUser = await firebaseLogin(email, password);
          set({
            user: {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName ?? 'Dr. Julianne Vane',
            },
            isLoading: false,
          });
        } catch (err: unknown) {
          // Specific message as requested by user
          set({ error: 'Please Provide valid Credential', isLoading: false });
        }
      },

      logout: async () => {
        set({ isLoading: true });
        await firebaseLogout();
        set({ user: null, isLoading: false });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);
