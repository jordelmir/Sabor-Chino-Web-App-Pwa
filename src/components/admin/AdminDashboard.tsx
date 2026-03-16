import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Activity, DollarSign, BrainCircuit, ChevronRight, Package, Users, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SpinningLogo } from '../SpinningLogo';

const data = [
  { name: 'Lun', sales: 4000 },
  { name: 'Mar', sales: 3000 },
  { name: 'Mié', sales: 2000 },
  { name: 'Jue', sales: 2780 },
  { name: 'Vie', sales: 5890 },
  { name: 'Sáb', sales: 8390 },
  { name: 'Dom', sales: 7490 },
];

export function AdminDashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 py-8 pb-32"
    >
      <header className="flex items-center justify-between mb-8 bg-zinc-950/50 p-6 rounded-3xl border border-white/5 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div>
          <h1 className="text-3xl font-display font-bold text-white flex items-center gap-3">
            Mando <span className="text-imperial-gold drop-shadow-[0_0_10px_rgba(242,183,5,0.5)]">Imperial</span>
          </h1>
          <p className="text-sm text-white/50 mt-1.5 font-medium tracking-wide">Visión global del imperio gastronómico</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
            <Clock className="w-4 h-4 text-imperial-gold" />
            <span className="font-bold text-white tracking-wider">
              {new Date().toLocaleDateString('es-CR', { weekday: 'short', day: 'numeric', month: 'short' })}
            </span>
          </div>
          <SpinningLogo size="md" className="drop-shadow-[0_0_15px_rgba(242,183,5,0.4)]" />
        </div>
      </header>

      {/* AI Insight Card - 2026 Feature */}
      <div className="bg-gradient-to-r from-imperial-gold/20 via-imperial-crimson/20 to-zinc-950 border border-imperial-gold/30 rounded-3xl p-6 mb-8 relative overflow-hidden group shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute -right-10 -top-10 w-64 h-64 bg-imperial-gold/20 blur-[60px] rounded-full group-hover:bg-imperial-gold/30 transition-colors duration-700"></div>
        
        <div className="flex items-start gap-5 relative z-10">
          <div className="p-3.5 bg-black/60 backdrop-blur-md rounded-2xl border border-imperial-gold/50 shadow-[0_0_20px_rgba(242,183,5,0.3)] shrink-0">
            <BrainCircuit className="w-7 h-7 text-imperial-gold animate-pulse" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-imperial-gold font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                Sugerencia de IA <span className="w-2 h-2 rounded-full bg-imperial-gold animate-ping"></span>
              </h3>
              <span className="text-xs text-white/40 font-medium bg-black/40 px-2 py-1 rounded-lg border border-white/5">Hace 5 min</span>
            </div>
            <p className="text-white/90 text-sm leading-relaxed mb-4 max-w-3xl">
              Detectamos un evento deportivo a 2km a las 8:00 PM. Históricamente, esto aumenta la demanda de <strong className="text-white">Combos Familiares</strong> en un 45%. Sugerimos preparar 20% más base de Arroz Cantonés.
            </p>
            <div className="flex gap-3">
              <button className="bg-imperial-gold text-black px-5 py-2 rounded-xl text-xs font-bold hover:bg-imperial-gold/90 transition-all shadow-[0_0_15px_rgba(242,183,5,0.3)] flex items-center gap-1.5">
                Aplicar Ajuste <ChevronRight className="w-4 h-4" />
              </button>
              <button className="bg-white/5 text-white/60 px-5 py-2 rounded-xl text-xs font-bold hover:bg-white/10 hover:text-white transition-all border border-white/10">
                Ignorar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <div className="bg-zinc-950/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-green-500/30 transition-colors shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-bl-full blur-2xl group-hover:bg-green-500/20 transition-colors"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="p-3 bg-green-500/10 rounded-2xl border border-green-500/20 shadow-inner">
              <DollarSign className="w-6 h-6 text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-green-400 bg-green-400/10 px-2.5 py-1.5 rounded-xl border border-green-400/20 shadow-inner">
              <ArrowUpRight className="w-3.5 h-3.5" /> 12.5%
            </span>
          </div>
          <div className="relative z-10">
            <p className="text-white/50 text-xs uppercase tracking-widest font-bold mb-1.5">Ventas Hoy</p>
            <h4 className="text-3xl font-display font-bold text-white tracking-tight drop-shadow-md">¢452.5K</h4>
          </div>
        </div>

        <div className="bg-zinc-950/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-imperial-crimson/30 transition-colors shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-imperial-crimson/10 rounded-bl-full blur-2xl group-hover:bg-imperial-crimson/20 transition-colors"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="p-3 bg-imperial-crimson/10 rounded-2xl border border-imperial-crimson/20 shadow-inner">
              <Activity className="w-6 h-6 text-imperial-crimson drop-shadow-[0_0_8px_rgba(178,24,31,0.5)]" />
            </div>
            <span className="flex items-center gap-1.5 text-xs font-bold text-imperial-crimson bg-imperial-crimson/10 px-2.5 py-1.5 rounded-xl border border-imperial-crimson/20 shadow-inner">
              <span className="w-1.5 h-1.5 rounded-full bg-imperial-crimson animate-pulse shadow-[0_0_8px_rgba(178,24,31,0.8)]"></span> En curso
            </span>
          </div>
          <div className="relative z-10">
            <p className="text-white/50 text-xs uppercase tracking-widest font-bold mb-1.5">Pedidos Activos</p>
            <h4 className="text-3xl font-display font-bold text-white tracking-tight drop-shadow-md">14</h4>
          </div>
        </div>

        <div className="bg-zinc-950/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-blue-500/30 transition-colors shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full blur-2xl group-hover:bg-blue-500/20 transition-colors"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 shadow-inner">
              <Package className="w-6 h-6 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-blue-400 bg-blue-400/10 px-2.5 py-1.5 rounded-xl border border-blue-400/20 shadow-inner">
              <ArrowUpRight className="w-3.5 h-3.5" /> 3.2%
            </span>
          </div>
          <div className="relative z-10">
            <p className="text-white/50 text-xs uppercase tracking-widest font-bold mb-1.5">Ticket Promedio</p>
            <h4 className="text-3xl font-display font-bold text-white tracking-tight drop-shadow-md">¢12,450</h4>
          </div>
        </div>

        <div className="bg-zinc-950/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-purple-500/30 transition-colors shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-full blur-2xl group-hover:bg-purple-500/20 transition-colors"></div>
          <div className="flex justify-between items-start mb-6 relative z-10">
            <div className="p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20 shadow-inner">
              <Users className="w-6 h-6 text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.5)]" />
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-imperial-crimson bg-imperial-crimson/10 px-2.5 py-1.5 rounded-xl border border-imperial-crimson/20 shadow-inner">
              <ArrowDownRight className="w-3.5 h-3.5" /> 1.5%
            </span>
          </div>
          <div className="relative z-10">
            <p className="text-white/50 text-xs uppercase tracking-widest font-bold mb-1.5">Nuevos Clientes</p>
            <h4 className="text-3xl font-display font-bold text-white tracking-tight drop-shadow-md">28</h4>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-zinc-950/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-1 tracking-wide">Rendimiento Semanal</h3>
              <p className="text-xs text-white/50 font-medium tracking-widest uppercase">Ingresos brutos por día</p>
            </div>
            <select className="bg-black/50 border border-white/10 text-white text-sm font-medium rounded-xl px-4 py-2 outline-none focus:border-imperial-gold transition-colors cursor-pointer shadow-inner">
              <option>Esta Semana</option>
              <option>Semana Pasada</option>
              <option>Este Mes</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F2B705" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#F2B705" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `¢${value/1000}k`} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', borderColor: '#ffffff20', borderRadius: '16px', color: '#fff', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
                  itemStyle={{ color: '#F2B705', fontWeight: 'bold' }}
                  formatter={(value: number) => [`¢${value.toLocaleString()}`, 'Ventas']}
                  labelStyle={{ color: '#ffffff80', marginBottom: '4px' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#F2B705" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" activeDot={{ r: 6, fill: '#F2B705', stroke: '#000', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Orders Feed */}
        <div className="bg-zinc-950/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-1 tracking-wide">Flujo en Vivo</h3>
              <p className="text-xs text-white/50 font-medium tracking-widest uppercase">Últimos pedidos</p>
            </div>
            <button className="text-xs font-bold text-imperial-gold hover:text-white transition-colors bg-imperial-gold/10 px-3 py-1.5 rounded-lg border border-imperial-gold/20 shadow-inner">Ver todos</button>
          </div>
          <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-2">
            {[
              { id: '8495', time: 'Hace 2 min', items: 'Combo Familiar + Wantán', total: 18500, status: 'preparando' },
              { id: '8494', time: 'Hace 5 min', items: 'Arroz Especial (Grande)', total: 6500, status: 'listo' },
              { id: '8493', time: 'Hace 12 min', items: 'Chop Suey + 2 Rollitos', total: 8000, status: 'entregado' },
              { id: '8492', time: 'Hace 18 min', items: 'Pollo Agridulce + Arroz', total: 9500, status: 'entregado' },
              { id: '8491', time: 'Hace 25 min', items: 'Sopa de Mariscos', total: 5500, status: 'entregado' },
            ].map((order, i) => (
              <div key={i} className="bg-black/40 border border-white/5 rounded-2xl p-4 flex items-center justify-between hover:bg-white/5 hover:border-white/10 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className={`w-2.5 h-2.5 rounded-full shadow-lg ${order.status === 'preparando' ? 'bg-imperial-crimson animate-pulse shadow-imperial-crimson/50' : order.status === 'listo' ? 'bg-imperial-gold shadow-imperial-gold/50' : 'bg-green-500 shadow-green-500/50'}`} />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white text-sm">#{order.id}</span>
                      <span className="text-[10px] text-white/40 font-medium bg-white/5 px-2 py-0.5 rounded-md">{order.time}</span>
                    </div>
                    <p className="text-xs text-white/60 line-clamp-1">{order.items}</p>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <div className="font-bold text-imperial-gold text-sm group-hover:scale-105 transition-transform">¢{order.total.toLocaleString()}</div>
                  <div className="text-[9px] uppercase tracking-widest text-white/40 mt-1 font-bold">{order.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
