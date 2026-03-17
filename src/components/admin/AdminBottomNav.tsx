import React from 'react';
import { LayoutDashboard, Utensils, Users, User } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

interface AdminBottomNavProps {
  activeTab: 'dashboard' | 'menu' | 'staff' | 'profile';
  setActiveTab: (tab: 'dashboard' | 'menu' | 'staff' | 'profile') => void;
}

export function AdminBottomNav({ activeTab, setActiveTab }: AdminBottomNavProps) {
  const { t } = useTranslation();
  
  const tabs = [
    { id: 'dashboard', icon: LayoutDashboard, label: t('adminNavDashboard') },
    { id: 'menu', icon: Utensils, label: t('adminNavMenu') },
    { id: 'staff', icon: Users, label: t('adminNavStaff') },
    { id: 'profile', icon: User, label: t('navProfile') },
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
              className={`flex flex-col items-center justify-center w-20 h-full gap-1.5 transition-all duration-300 relative group ${
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
