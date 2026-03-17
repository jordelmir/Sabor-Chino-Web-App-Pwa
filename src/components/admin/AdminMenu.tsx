import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';
import { SpinningLogo } from '../SpinningLogo';

const mockMenu = [
  { id: 1, name: 'Arroz Cantonés Especial', category: 'Arroces', price: 6500, status: 'active' },
  { id: 2, name: 'Chop Suey en Salsa', category: 'Fideos', price: 5800, status: 'active' },
  { id: 3, name: 'Pollo Agridulce', category: 'Carnes', price: 7200, status: 'active' },
  { id: 4, name: 'Rollitos Primavera (2)', category: 'Entradas', price: 2500, status: 'inactive' },
  { id: 5, name: 'Sopa de Mariscos', category: 'Sopas', price: 8500, status: 'active' },
];

export function AdminMenu() {
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
            <h2 className="text-3xl font-display font-bold text-white">Gestión de Menú</h2>
            <p className="text-sm text-white/50 mt-1">Administra productos, precios y disponibilidad</p>
          </div>
        </div>
        <button className="bg-imperial-gold text-black px-6 py-3 rounded-xl font-bold hover:bg-imperial-gold/90 transition-all shadow-[0_0_15px_rgba(242,183,5,0.3)] flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" /> Nuevo Producto
        </button>
      </header>

      <div className="bg-zinc-950/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 drop-shadow-md" />
            <input 
              type="text" 
              placeholder="Buscar productos..." 
              className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-imperial-gold transition-colors shadow-inner"
            />
          </div>
          <button className="bg-black/50 border border-white/10 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-white/5 transition-colors shadow-inner">
            <Filter className="w-5 h-5 drop-shadow-md" /> Filtrar
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-white/50 text-xs uppercase tracking-widest">
                <th className="pb-4 font-medium pl-4">Producto</th>
                <th className="pb-4 font-medium">Categoría</th>
                <th className="pb-4 font-medium">Precio</th>
                <th className="pb-4 font-medium">Estado</th>
                <th className="pb-4 font-medium text-right pr-4">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {mockMenu.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                  <td className="py-4 pl-4 font-medium text-white">{item.name}</td>
                  <td className="py-4 text-white/70">{item.category}</td>
                  <td className="py-4 font-bold text-imperial-gold">¢{item.price.toLocaleString()}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      item.status === 'active' 
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                        : 'bg-white/5 text-white/40 border border-white/10'
                    }`}>
                      {item.status === 'active' ? 'Activo' : 'Agotado'}
                    </span>
                  </td>
                  <td className="py-4 pr-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-imperial-crimson/10 rounded-lg hover:bg-imperial-crimson/20 text-imperial-crimson transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
