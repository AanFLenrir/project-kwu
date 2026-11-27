'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { AppState, Task, Certificate, Course, Notification, Portfolio, User, UserSubscription, TransactionInvoice } from '@/types';
import { initialAppState, subscriptionPlans } from '@/lib/data/defaults';

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
  subscribePlan: (planId: string, paymentMethod: string) => void;
  cancelSubscription: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

function loadState(): AppState {
  if (typeof window === 'undefined') return initialAppState;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...initialAppState,
        ...parsed,
        subscription: parsed.subscription || initialAppState.subscription,
        invoices: parsed.invoices || initialAppState.invoices,
      };
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
  const [state, setState] = useState<AppState>(() => loadState());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
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

  const subscribePlan = (planId: string, paymentMethod: string) => {
    const selectedPlan = subscriptionPlans.find(p => p.id === planId) || subscriptionPlans[3];
    const durationDays = selectedPlan.months === 0 ? 365 : selectedPlan.months * 30;
    const now = new Date();
    const expiry = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000);

    const newSub: UserSubscription = {
      planId: selectedPlan.id,
      planName: selectedPlan.name,
      tier: selectedPlan.tier,
      status: 'active',
      startDate: now.toISOString(),
      expiryDate: expiry.toISOString(),
      billingCycle: selectedPlan.durationLabel,
      pricePaid: selectedPlan.price,
      paymentMethod,
      autoRenew: true,
    };

    const newInvoice: TransactionInvoice = {
      id: `inv-${Date.now()}`,
      date: now.toISOString(),
      planName: selectedPlan.name,
      amount: selectedPlan.price,
      status: 'paid',
      paymentMethod,
      invoiceNumber: `INV/${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/KRS-${Math.floor(1000 + Math.random() * 9000)}`,
    };

    const notif: Notification = {
      id: `notif-${Date.now()}`,
      title: 'Langganan Berhasil Diaktifkan! 🎉',
      message: `Terima kasih! Anda sekarang aktif menggunakan ${selectedPlan.name}. Masa aktif hingga ${expiry.toLocaleDateString('id-ID')}.`,
      type: 'achievement',
      isRead: false,
      createdAt: now.toISOString(),
      link: '/pricing',
    };

    setState(s => ({
      ...s,
      subscription: newSub,
      invoices: [newInvoice, ...s.invoices],
      notifications: [notif, ...s.notifications],
    }));
  };

  const cancelSubscription = () => {
    setState(s => ({
      ...s,
      subscription: {
        ...s.subscription,
        autoRenew: false,
      },
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
      subscribePlan,
      cancelSubscription,
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
