import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Shield, ShieldAlert, MoreVertical, Search } from 'lucide-react';
import { SpinningLogo } from '../SpinningLogo';

const mockStaff = [
  { id: 1, name: 'Carlos Mendoza', role: 'admin', email: 'carlos@imperial.com', status: 'active', lastActive: 'Hace 5 min' },
  { id: 2, name: 'Ana Sofía', role: 'employee', email: 'ana@imperial.com', status: 'active', lastActive: 'Hace 2 horas' },
  { id: 3, name: 'Luis Fernando', role: 'employee', email: 'luis@imperial.com', status: 'inactive', lastActive: 'Ayer' },
  { id: 4, name: 'María José', role: 'employee', email: 'maria@imperial.com', status: 'active', lastActive: 'Hace 10 min' },
];

export function AdminStaff() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 py-8 pb-32"
    >
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <SpinningLogo size="sm" className="drop-shadow-[0_0_15px_rgba(242,183,5,0.3)]" />
          <div>
            <h2 className="text-3xl font-display font-bold text-white">Personal y Roles</h2>
            <p className="text-sm text-white/50 mt-1">Administra accesos y permisos del equipo</p>
          </div>
        </div>
        <button className="bg-imperial-gold text-black px-6 py-3 rounded-xl font-bold hover:bg-imperial-gold/90 transition-all shadow-[0_0_15px_rgba(242,183,5,0.3)] flex items-center justify-center gap-2">
          <UserPlus className="w-5 h-5" /> Invitar Miembro
        </button>
      </header>

      <div className="bg-zinc-950/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 drop-shadow-md" />
          <input 
            type="text" 
            placeholder="Buscar por nombre o correo..." 
            className="w-full md:w-96 bg-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-imperial-gold transition-colors shadow-inner"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockStaff.map((user) => (
            <div key={user.id} className="bg-black/40 border border-white/5 rounded-2xl p-5 hover:bg-white/5 hover:border-white/10 transition-all group relative overflow-hidden">
              {user.role === 'admin' && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-imperial-gold/10 rounded-bl-full blur-xl pointer-events-none"></div>
              )}
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                    user.role === 'admin' ? 'bg-imperial-gold/20 text-imperial-gold border border-imperial-gold/30' : 'bg-white/10 text-white border border-white/20'
                  }`}>
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{user.name}</h3>
                    <p className="text-xs text-white/50">{user.email}</p>
                  </div>
                </div>
                <button className="text-white/40 hover:text-white transition-colors p-1">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center justify-between mt-6 relative z-10">
                <div className="flex items-center gap-2">
                  {user.role === 'admin' ? (
                    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-imperial-gold bg-imperial-gold/10 px-2.5 py-1 rounded-lg border border-imperial-gold/20">
                      <Shield className="w-3.5 h-3.5" /> Admin
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/60 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                      <ShieldAlert className="w-3.5 h-3.5" /> Empleado
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-white/20'}`} />
                  <span className="text-[10px] text-white/40 font-medium">{user.lastActive}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
