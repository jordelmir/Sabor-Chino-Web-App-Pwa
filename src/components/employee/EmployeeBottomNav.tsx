import React from 'react';
import { MonitorSmartphone, ChefHat, User } from 'lucide-react';

interface EmployeeBottomNavProps {
  activeTab: 'pos' | 'kds' | 'profile';
  setActiveTab: (tab: 'pos' | 'kds' | 'profile') => void;
}

export function EmployeeBottomNav({ activeTab, setActiveTab }: EmployeeBottomNavProps) {
  const tabs = [
    { id: 'pos', icon: MonitorSmartphone, label: 'Caja / POS' },
    { id: 'kds', icon: ChefHat, label: 'Cocina (KDS)' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ] as const;

  return (
    <nav className="fixed bottom-0 w-full bg-zinc-950/90 backdrop-blur-2xl border-t border-white/10 pb-safe z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      <div className="flex justify-around items-center h-20 max-w-lg mx-auto px-6">
        {tabs.map(({ id, icon: Icon, label }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex flex-col items-center justify-center w-24 h-full gap-1.5 transition-all duration-300 relative group ${
                isActive ? 'text-imperial-gold scale-105' : 'text-white/40 hover:text-white/80'
              }`}
            >
              <div className="relative p-2 rounded-2xl transition-colors duration-300 group-hover:bg-white/5">
                <Icon className={`w-6 h-6 transition-all duration-300 ${isActive ? 'drop-shadow-[0_0_10px_rgba(242,183,5,0.6)]' : ''}`} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-imperial-gold rounded-full shadow-[0_0_10px_rgba(242,183,5,1)]" />
                )}
              </div>
              <span className={`text-[11px] font-bold tracking-widest uppercase transition-colors duration-300 ${isActive ? 'text-imperial-gold' : 'text-white/40'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
