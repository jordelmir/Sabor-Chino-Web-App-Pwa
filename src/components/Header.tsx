import React from 'react';
import { ShoppingBag, Search, Menu, Crown, Globe } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useUserStore } from '../store/useUserStore';
import { SpinningLogo } from './SpinningLogo';

interface HeaderProps {
  onOpenCart: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function Header({ onOpenCart, searchQuery, setSearchQuery }: HeaderProps) {
  const itemCount = useCartStore((state) => state.getItemCount());
  const { puntosImperiales, language, setLanguage } = useUserStore();

  const toggleLanguage = () => {
    if (language === 'es') setLanguage('en');
    else if (language === 'en') setLanguage('zh');
    else setLanguage('es');
  };

  return (
    <header className="sticky top-0 z-40 bg-oled-black/90 backdrop-blur-md border-b border-white/5 pb-4 pt-6 px-4 safe-area-top">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <button className="p-2 -ml-2 text-white/80 hover:text-imperial-gold transition-colors">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <SpinningLogo size="sm" />
            <div>
              <h1 className="font-display font-bold text-xl tracking-wide text-white flex items-center gap-1">
                SABOR <span className="text-imperial-crimson">CHINO</span>
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] uppercase tracking-widest text-imperial-gold/80 font-medium">
                  Hermanos Balmaceda
                </span>
                <div className="flex items-center gap-1 bg-imperial-gold/10 px-2 py-0.5 rounded-full border border-imperial-gold/20">
                  <Crown className="w-3 h-3 text-imperial-gold" />
                  <span className="text-[10px] font-bold text-imperial-gold">{puntosImperiales} pts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={toggleLanguage}
            className="p-2 text-white/60 hover:text-white transition-colors flex items-center gap-1"
          >
            <Globe className="w-5 h-5" />
            <span className="text-xs font-bold uppercase">{language}</span>
          </button>
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-white hover:text-imperial-gold transition-colors"
          >
            <ShoppingBag className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 bg-imperial-crimson text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-white/40" />
        </div>
        <input
          type="text"
          placeholder={language === 'es' ? "¿Qué se te antoja hoy?" : language === 'en' ? "What are you craving?" : "你今天想吃什么？"}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-2xl leading-5 bg-white/5 text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-imperial-gold focus:border-imperial-gold sm:text-sm transition-all shadow-inner"
        />
      </div>
    </header>
  );
}
