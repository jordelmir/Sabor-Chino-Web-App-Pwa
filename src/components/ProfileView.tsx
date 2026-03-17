import React, { useState } from 'react';
import { Crown, Settings, LogOut, ChevronRight, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '../hooks/useTranslation';
import { SpinningLogo } from './SpinningLogo';
import { RewardsView } from './RewardsView';
import { useUserStore } from '../store/useUserStore';

export function ProfileView() {
  const { puntosImperiales, role, logout } = useUserStore();
  const [showRewards, setShowRewards] = useState(false);
  const { t } = useTranslation();

  if (showRewards) {
    return <RewardsView onBack={() => setShowRewards(false)} />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 py-8 pb-32"
    >
      <div className="flex items-center gap-4 mb-8">
        <SpinningLogo size="lg" className="drop-shadow-[0_0_15px_rgba(242,183,5,0.3)]" />
        <div>
          <h2 className="text-2xl font-display font-bold text-white capitalize tracking-wide">
            {t('hello')}, {role === 'admin' ? t('greetingAdmin') : role === 'employee' ? t('greetingEmployee') : t('greetingClient')}
          </h2>
          <p className="text-sm text-white/60 font-bold tracking-widest uppercase mt-1">{t('memberTier')}</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-imperial-gold/20 to-imperial-crimson/20 border border-imperial-gold/30 rounded-3xl p-6 mb-8 relative overflow-hidden shadow-[0_10px_30px_rgba(242,183,5,0.15)]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-imperial-gold/20 rounded-bl-full blur-2xl pointer-events-none" />
        
        <div className="flex justify-between items-center mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <Crown className="w-6 h-6 text-imperial-gold drop-shadow-[0_0_8px_rgba(242,183,5,0.5)]" />
            <h3 className="text-lg font-bold text-white tracking-wide">{t('pointsTitle')}</h3>
          </div>
          <span className="text-3xl font-display font-bold text-imperial-gold drop-shadow-[0_0_10px_rgba(242,183,5,0.3)]">{puntosImperiales}</span>
        </div>
        
        <div className="w-full bg-black/40 rounded-full h-2 mb-2 relative z-10 shadow-inner">
          <div className="bg-imperial-gold h-2 rounded-full shadow-[0_0_10px_rgba(242,183,5,0.5)]" style={{ width: '60%' }}></div>
        </div>
        <p className="text-xs text-white/80 font-medium relative z-10">{t('pointsMissing')}</p>
      </div>

      <div className="space-y-3">
        <button 
          onClick={() => setShowRewards(true)}
          className="w-full flex items-center justify-between bg-black/40 backdrop-blur-sm border border-white/5 p-4 rounded-2xl hover:bg-white/5 hover:border-white/10 transition-all group shadow-[0_5px_15px_rgba(0,0,0,0.2)]"
        >
          <div className="flex items-center gap-3">
            <Gift className="w-5 h-5 text-imperial-gold/70 group-hover:text-imperial-gold transition-colors" />
            <span className="font-bold text-white tracking-wide">{t('rewardsBtn')}</span>
          </div>
          <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors" />
        </button>
        <button className="w-full flex items-center justify-between bg-black/40 backdrop-blur-sm border border-white/5 p-4 rounded-2xl hover:bg-white/5 hover:border-white/10 transition-all group shadow-[0_5px_15px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
            <span className="font-bold text-white tracking-wide">{t('settingsBtn')}</span>
          </div>
          <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors" />
        </button>
        <button 
          onClick={logout}
          className="w-full flex items-center justify-between bg-black/40 backdrop-blur-sm border border-white/5 p-4 rounded-2xl hover:bg-imperial-crimson/10 hover:border-imperial-crimson/30 transition-all mt-6 group shadow-[0_5px_15px_rgba(0,0,0,0.2)]"
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-5 h-5 text-imperial-crimson drop-shadow-[0_0_8px_rgba(178,24,31,0.3)]" />
            <span className="font-bold text-imperial-crimson tracking-wide">{t('logoutBtn')}</span>
          </div>
        </button>
      </div>
    </motion.div>
  );
}
