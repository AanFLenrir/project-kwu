'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { AppState, Task, Certificate, Course, Notification, Portfolio, User } from '@/types';
import { initialAppState } from '@/lib/data/defaults';

const STORAGE_KEY = 'kairos-app-data';

interface AppContextType {
  state: AppState;
  updateUser: (user: Partial<User>) => void;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  completeTask: (id: string) => void;
  addCertificate: (cert: Certificate) => void;
  deleteCertificate: (id: string) => void;
  updateCourse: (id: string, updates: Partial<Course>) => void;
  updatePortfolio: (portfolio: Partial<Portfolio>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  toggleBookmark: (infoId: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

function loadState(): AppState {
  if (typeof window === 'undefined') return initialAppState;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...initialAppState, ...parsed };
    }
  } catch {}
  return initialAppState;
}

function saveState(state: AppState) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialAppState);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setState(loadState());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveState(state);
  }, [state, loaded]);

  const updateUser = (updates: Partial<User>) => {
    setState(s => ({ ...s, user: { ...s.user, ...updates } }));
  };

  const addTask = (task: Task) => {
    setState(s => ({ ...s, tasks: [task, ...s.tasks] }));
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setState(s => ({
      ...s,
      tasks: s.tasks.map(t => t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t),
    }));
  };

  const deleteTask = (id: string) => {
    setState(s => ({ ...s, tasks: s.tasks.filter(t => t.id !== id) }));
  };

  const completeTask = (id: string) => {
    setState(s => ({
      ...s,
      tasks: s.tasks.map(t =>
        t.id === id
          ? { ...t, status: 'completed', completedAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
          : t
      ),
    }));
  };

  const addCertificate = (cert: Certificate) => {
    setState(s => ({ ...s, certificates: [cert, ...s.certificates] }));
  };

  const deleteCertificate = (id: string) => {
    setState(s => ({ ...s, certificates: s.certificates.filter(c => c.id !== id) }));
  };

  const updateCourse = (id: string, updates: Partial<Course>) => {
    setState(s => ({
      ...s,
      courses: s.courses.map(c => c.id === id ? { ...c, ...updates } : c),
    }));
  };

  const updatePortfolio = (updates: Partial<Portfolio>) => {
    setState(s => ({ ...s, portfolio: { ...s.portfolio, ...updates } }));
  };

  const markNotificationRead = (id: string) => {
    setState(s => ({
      ...s,
      notifications: s.notifications.map(n => n.id === id ? { ...n, isRead: true } : n),
    }));
  };

  const markAllNotificationsRead = () => {
    setState(s => ({
      ...s,
      notifications: s.notifications.map(n => ({ ...n, isRead: true })),
    }));
  };

  const toggleBookmark = (infoId: string) => {
    setState(s => ({
      ...s,
      information: s.information.map(i => i.id === infoId ? { ...i, isBookmarked: !i.isBookmarked } : i),
    }));
  };

  return (
    <AppContext.Provider value={{
      state,
      updateUser,
      addTask,
      updateTask,
      deleteTask,
      completeTask,
      addCertificate,
      deleteCertificate,
      updateCourse,
      updatePortfolio,
      markNotificationRead,
      markAllNotificationsRead,
      toggleBookmark,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
