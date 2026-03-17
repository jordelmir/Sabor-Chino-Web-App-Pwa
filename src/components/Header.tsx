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
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-2xl border-b border-white/10 pb-4 pt-6 px-4 safe-area-top shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      <div className="flex items-center justify-between mb-5 gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button className="p-1 sm:p-2 -ml-1 sm:-ml-2 text-white/80 hover:text-imperial-gold transition-colors flex-shrink-0">
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex-shrink-0">
              <SpinningLogo size="sm" className="drop-shadow-[0_0_10px_rgba(242,183,5,0.4)] scale-90 sm:scale-100 origin-left" />
            </div>
            <div className="min-w-0 flex flex-col justify-center">
              <h1 className="font-display font-bold text-base sm:text-xl tracking-wide text-white flex items-center gap-1 truncate">
                SABOR <span className="text-imperial-crimson drop-shadow-[0_0_8px_rgba(178,24,31,0.5)]">CHINO</span>
              </h1>
              <span className="text-[8px] sm:text-[10px] uppercase tracking-widest text-imperial-gold/80 font-bold truncate leading-tight mt-0.5">
                Hermanos Balmaceda
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <div className="flex items-center gap-1 bg-imperial-gold/10 px-1.5 sm:px-2 py-1 rounded-full border border-imperial-gold/20 shadow-[0_0_10px_rgba(242,183,5,0.2)]">
            <Crown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-imperial-gold" />
            <span className="text-[9px] sm:text-[10px] font-bold text-imperial-gold">{puntosImperiales} <span className="hidden sm:inline">pts</span></span>
          </div>

          <button 
            onClick={toggleLanguage}
            className="p-1.5 sm:p-2 text-white/60 hover:text-white transition-colors flex items-center gap-1 bg-white/5 rounded-full border border-white/10 hover:bg-white/10"
          >
            <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="text-[9px] sm:text-[10px] font-bold uppercase">{language}</span>
          </button>
          
          <button 
            onClick={onOpenCart}
            className="relative p-1.5 sm:p-2 text-white hover:text-imperial-gold transition-colors bg-white/5 rounded-full border border-white/10 hover:bg-white/10 hover:border-imperial-gold/50 hover:shadow-[0_0_15px_rgba(242,183,5,0.3)]"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 bg-imperial-crimson text-white text-[9px] sm:text-[10px] font-bold w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center transform translate-x-1 -translate-y-1 shadow-[0_0_10px_rgba(178,24,31,0.6)]">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-white/40 group-focus-within:text-imperial-gold transition-colors" />
        </div>
        <input
          type="text"
          placeholder={language === 'es' ? "¿Qué se te antoja hoy?" : language === 'en' ? "What are you craving?" : "你今天想吃什么？"}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full pl-12 pr-4 py-3.5 border border-white/10 rounded-2xl leading-5 bg-black/50 text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-imperial-gold focus:border-imperial-gold sm:text-sm transition-all shadow-inner focus:bg-white/5 focus:shadow-[0_0_15px_rgba(242,183,5,0.15)]"
        />
      </div>
    </header>
  );
}
