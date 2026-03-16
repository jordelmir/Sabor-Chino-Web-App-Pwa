import React from 'react';
import { MapPin, Clock, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { SpinningLogo } from './SpinningLogo';

export function OrdersView() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 py-8 pb-32"
    >
      <h2 className="text-2xl font-display font-bold text-white mb-6">Pedido Activo</h2>
      
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-imperial-gold/10 rounded-bl-full blur-2xl pointer-events-none" />
        
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-imperial-gold text-xs font-bold uppercase tracking-wider">En Camino</span>
            <h3 className="text-xl font-bold text-white mt-1">Orden #8492</h3>
          </div>
          <div className="text-right">
            <span className="text-white/40 text-xs uppercase tracking-wider">Llegada est.</span>
            <div className="text-lg font-bold text-white flex items-center gap-1">
              <Clock className="w-4 h-4 text-imperial-gold" />
              15-20 min
            </div>
          </div>
        </div>

        {/* Simulated Map */}
        <div className="w-full h-48 bg-zinc-900 rounded-2xl border border-white/10 mb-6 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #F2B705 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="text-center z-10 flex flex-col items-center">
            <SpinningLogo size="md" className="mb-2" />
            <span className="text-xs text-white/60 font-medium uppercase tracking-widest">GPS Activo</span>
          </div>
        </div>

        <div className="space-y-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-imperial-gold/20 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-imperial-gold" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">Preparando tu banquete</p>
              <p className="text-xs text-white/50">El chef está trabajando en tu pedido.</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-display font-bold text-white mb-6">Historial de Banquetes</h2>
      
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-white/40 mb-1">Hace {i * 2} días</div>
              <div className="font-bold text-white">Combo #{i} + Arroz Cantonés</div>
              <div className="text-sm text-imperial-gold mt-1">¢{(i * 3500 + 3000).toLocaleString('es-CR')}</div>
            </div>
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-full transition-colors">
              Repetir
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
