import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Role = 'guest' | 'client' | 'employee' | 'admin';

interface UserState {
  isAuthenticated: boolean;
  role: Role;
  puntosImperiales: number;
  language: 'es' | 'en' | 'zh';
  login: (role: Role) => void;
  logout: () => void;
  addPuntos: (points: number) => void;
  setLanguage: (lang: 'es' | 'en' | 'zh') => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      role: 'guest',
      puntosImperiales: 1250, // Initial bonus points
      language: 'es',
      login: (role) => set({ isAuthenticated: true, role }),
      logout: () => set({ isAuthenticated: false, role: 'guest' }),
      addPuntos: (points) => set((state) => ({ puntosImperiales: state.puntosImperiales + points })),
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'sabor-chino-user',
    }
  )
);
