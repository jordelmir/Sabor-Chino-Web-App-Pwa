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
      
      <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 mb-8 relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-imperial-gold/10 rounded-bl-full blur-2xl pointer-events-none" />
        
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-imperial-gold text-xs font-bold uppercase tracking-widest drop-shadow-[0_0_8px_rgba(242,183,5,0.5)]">En Camino</span>
            <h3 className="text-xl font-bold text-white mt-1 tracking-wide">Orden #8492</h3>
          </div>
          <div className="text-right">
            <span className="text-white/40 text-xs uppercase tracking-widest font-bold">Llegada est.</span>
            <div className="text-lg font-bold text-white flex items-center gap-1">
              <Clock className="w-4 h-4 text-imperial-gold drop-shadow-[0_0_8px_rgba(242,183,5,0.5)]" />
              15-20 min
            </div>
          </div>
        </div>

        {/* Simulated Map */}
        <div className="w-full h-48 bg-zinc-950/90 rounded-2xl border border-white/10 mb-6 flex items-center justify-center relative overflow-hidden shadow-inner">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #F2B705 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          <div className="text-center z-10 flex flex-col items-center">
            <SpinningLogo size="md" className="mb-2 drop-shadow-[0_0_15px_rgba(242,183,5,0.3)]" />
            <span className="text-xs text-white/60 font-bold uppercase tracking-widest">GPS Activo</span>
          </div>
        </div>

        <div className="space-y-4 relative z-10">
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
            <div className="w-10 h-10 rounded-full bg-imperial-gold/20 flex items-center justify-center shadow-[0_0_15px_rgba(242,183,5,0.2)]">
              <CheckCircle2 className="w-5 h-5 text-imperial-gold" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white tracking-wide">Preparando tu banquete</p>
              <p className="text-xs text-white/50 font-medium">El chef está trabajando en tu pedido.</p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-display font-bold text-white mb-6 tracking-wide">Historial de Banquetes</h2>
      
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-black/40 backdrop-blur-sm border border-white/5 hover:border-white/10 rounded-2xl p-4 flex items-center justify-between transition-all group hover:shadow-[0_5px_15px_rgba(0,0,0,0.3)]">
            <div>
              <div className="text-xs text-white/40 mb-1 font-bold tracking-widest uppercase">Hace {i * 2} días</div>
              <div className="font-bold text-white text-sm">Combo #{i} + Arroz Cantonés</div>
              <div className="text-sm font-bold text-imperial-gold mt-1 drop-shadow-[0_0_8px_rgba(242,183,5,0.3)]">¢{(i * 3500 + 3000).toLocaleString('es-CR')}</div>
            </div>
            <button className="px-5 py-2.5 bg-white/5 hover:bg-imperial-gold/20 text-white hover:text-imperial-gold text-xs font-bold rounded-xl transition-all border border-white/10 hover:border-imperial-gold/30">
              Repetir
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
