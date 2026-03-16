import React from 'react';
import { Home, ListOrdered, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'orders' | 'profile';
  setActiveTab: (tab: 'home' | 'orders' | 'profile') => void;
}

export function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/90 backdrop-blur-md border-t border-white/5 pb-safe pt-2 px-6">
      <div className="flex justify-between items-center max-w-md mx-auto h-14">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center w-16 gap-1 transition-colors ${
            activeTab === 'home' ? 'text-imperial-gold' : 'text-white/40 hover:text-white/80'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-medium">Menú</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('orders')}
          className={`flex flex-col items-center justify-center w-16 gap-1 transition-colors ${
            activeTab === 'orders' ? 'text-imperial-gold' : 'text-white/40 hover:text-white/80'
          }`}
        >
          <ListOrdered className="w-6 h-6" />
          <span className="text-[10px] font-medium">Pedidos</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center w-16 gap-1 transition-colors ${
            activeTab === 'profile' ? 'text-imperial-gold' : 'text-white/40 hover:text-white/80'
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-[10px] font-medium">Perfil</span>
        </button>
      </div>
    </div>
  );
}
