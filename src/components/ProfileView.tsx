import React from 'react';
import { Crown, Settings, LogOut, ChevronRight, Gift } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUserStore } from '../store/useUserStore';
import { SpinningLogo } from './SpinningLogo';

export function ProfileView() {
  const { puntosImperiales, role, logout } = useUserStore();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 py-8 pb-32"
    >
      <div className="flex items-center gap-4 mb-8">
        <SpinningLogo size="lg" />
        <div>
          <h2 className="text-2xl font-display font-bold text-white capitalize">
            Hola, {role === 'admin' ? 'Administrador' : role === 'employee' ? 'Empleado' : 'Cliente'}
          </h2>
          <p className="text-sm text-white/60">Miembro Imperial</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-imperial-gold/20 to-imperial-crimson/20 border border-imperial-gold/30 rounded-3xl p-6 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-imperial-gold/20 rounded-bl-full blur-2xl pointer-events-none" />
        
        <div className="flex justify-between items-center mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <Crown className="w-6 h-6 text-imperial-gold" />
            <h3 className="text-lg font-bold text-white">Puntos Imperiales</h3>
          </div>
          <span className="text-3xl font-display font-bold text-imperial-gold">{puntosImperiales}</span>
        </div>
        
        <div className="w-full bg-black/40 rounded-full h-2 mb-2 relative z-10">
          <div className="bg-imperial-gold h-2 rounded-full" style={{ width: '60%' }}></div>
        </div>
        <p className="text-xs text-white/60 relative z-10">Faltan 250 pts para tu próximo Rollito Primavera gratis.</p>
      </div>

      <div className="space-y-2">
        <button className="w-full flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-3">
            <Gift className="w-5 h-5 text-white/60" />
            <span className="font-medium text-white">Recompensas Disponibles</span>
          </div>
          <ChevronRight className="w-5 h-5 text-white/40" />
        </button>
        <button className="w-full flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-white/60" />
            <span className="font-medium text-white">Configuración de Cuenta</span>
          </div>
          <ChevronRight className="w-5 h-5 text-white/40" />
        </button>
        <button 
          onClick={logout}
          className="w-full flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors mt-4"
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-5 h-5 text-imperial-crimson" />
            <span className="font-medium text-imperial-crimson">Cerrar Sesión</span>
          </div>
        </button>
      </div>
    </motion.div>
  );
}
