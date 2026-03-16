import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUserStore, Role } from '../store/useUserStore';
import { SpinningLogo } from './SpinningLogo';
import { User, Shield, Briefcase, ChevronRight } from 'lucide-react';

export function LoginView() {
  const [selectedRole, setSelectedRole] = useState<Role>('client');
  const [email, setEmail] = useState('cliente@saborchino.com');
  const [password, setPassword] = useState('password123');
  const login = useUserStore(state => state.login);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole);
  };

  const roleConfig = {
    client: { color: 'text-white', bg: 'bg-white/10', border: 'border-white/20', icon: User, title: 'Cliente', mockEmail: 'cliente@saborchino.com', mockPassword: 'password123' },
    employee: { color: 'text-imperial-crimson', bg: 'bg-imperial-crimson/10', border: 'border-imperial-crimson/30', icon: Briefcase, title: 'Empleado', mockEmail: 'empleado@saborchino.com', mockPassword: 'password123' },
    admin: { color: 'text-imperial-gold', bg: 'bg-imperial-gold/10', border: 'border-imperial-gold/30', icon: Shield, title: 'Admin', mockEmail: 'admin@saborchino.com', mockPassword: 'password123' }
  };

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    if (role !== 'guest') {
      const config = roleConfig[role as keyof typeof roleConfig];
      setEmail(config.mockEmail);
      setPassword(config.mockPassword);
    }
  };

  return (
    <div className="min-h-screen bg-oled-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative logos */}
      <div className="absolute top-10 left-10 opacity-20 blur-sm pointer-events-none"><SpinningLogo size="xl" /></div>
      <div className="absolute bottom-10 right-10 opacity-20 blur-sm pointer-events-none"><SpinningLogo size="xxl" /></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 blur-xl pointer-events-none"><SpinningLogo size="xxl" /></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10"
      >
        <div className="flex justify-center mb-6">
          <SpinningLogo size="xl" />
        </div>

        <h2 className="text-3xl font-display font-bold text-center text-white mb-2">Portal Imperial</h2>
        <p className="text-center text-white/50 mb-8 text-sm">Selecciona tu nivel de acceso</p>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {(Object.keys(roleConfig) as Role[]).filter(r => r !== 'guest').map((role) => {
            const config = roleConfig[role as keyof typeof roleConfig];
            const isActive = selectedRole === role;
            const Icon = config.icon;
            return (
              <button
                key={role}
                type="button"
                onClick={() => handleRoleSelect(role)}
                className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${isActive ? `${config.bg} ${config.border} ${config.color} scale-105 shadow-lg` : 'border-white/5 text-white/40 hover:bg-white/5'}`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-[10px] font-bold uppercase tracking-wider">{config.title}</span>
              </button>
            );
          })}
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={`w-full bg-black/50 border rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:ring-1 transition-colors ${selectedRole === 'admin' ? 'focus:border-imperial-gold focus:ring-imperial-gold border-imperial-gold/20' : selectedRole === 'employee' ? 'focus:border-imperial-crimson focus:ring-imperial-crimson border-imperial-crimson/20' : 'focus:border-white/50 focus:ring-white/50 border-white/10'}`}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={`w-full bg-black/50 border rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:ring-1 transition-colors ${selectedRole === 'admin' ? 'focus:border-imperial-gold focus:ring-imperial-gold border-imperial-gold/20' : selectedRole === 'employee' ? 'focus:border-imperial-crimson focus:ring-imperial-crimson border-imperial-crimson/20' : 'focus:border-white/50 focus:ring-white/50 border-white/10'}`}
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-transform active:scale-95 mt-4 ${selectedRole === 'admin' ? 'bg-imperial-gold text-black hover:bg-imperial-gold/90 shadow-[0_0_15px_rgba(242,183,5,0.3)]' : selectedRole === 'employee' ? 'bg-imperial-crimson text-white hover:bg-imperial-crimson/90 shadow-[0_0_15px_rgba(178,24,31,0.3)]' : 'bg-white text-black hover:bg-white/90 shadow-[0_0_15px_rgba(255,255,255,0.3)]'}`}
          >
            Ingresar <ChevronRight className="w-5 h-5" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
