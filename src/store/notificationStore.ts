import { create } from 'zustand';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
}

interface NotificationState {
  notifications: AppNotification[];
  addNotification: (title: string, message: string, type?: AppNotification['type']) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [
    {
      id: 'welcome',
      title: 'System Update',
      message: 'Welcome to the clinical atelier. Your workstation is now fully synchronized with Firestore.',
      time: 'Just now',
      type: 'info',
      read: false,
    },
  ],

  addNotification: (title, message, type = 'info') => {
    const newNotification: AppNotification = {
      id: Math.random().toString(36).substring(7),
      title,
      message,
      time: 'Just now',
      type,
      read: false,
    };
    set((state) => ({
      notifications: [newNotification, ...state.notifications],
    }));
  },

  markAsRead: (id) => {
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    }));
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    }));
  },

  clearAll: () => {
    set({ notifications: [] });
  },
}));
