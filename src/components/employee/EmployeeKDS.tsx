import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle2, Flame, AlertCircle, Timer, Banknote } from 'lucide-react';
import { useOrderStore, OrderStatus } from '../../store/useOrderStore';
import { SpinningLogo } from '../SpinningLogo';

export function EmployeeKDS() {
  const { orders, updateOrderStatus } = useOrderStore();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const moveOrder = (id: string, newStatus: OrderStatus) => {
    const order = orders.find(o => o.id === id);
    if (newStatus === 'listo' && order && order.status !== 'listo') {
      const name = order.customerName || `Número ${order.id}`;
      const utterance = new SpeechSynthesisUtterance(`Orden para ${name} está lista.`);
      utterance.lang = 'es-ES';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
    updateOrderStatus(id, newStatus);
  };

  const renderColumn = (status: OrderStatus, title: string, icon: React.ReactNode, colorClass: string, bgClass: string) => {
    const columnOrders = orders
      .filter(o => o.status === status)
      .map(o => ({
        ...o,
        elapsedMinutes: Math.floor((Date.now() - o.createdAt) / 60000)
      }))
      .sort((a, b) => b.elapsedMinutes - a.elapsedMinutes);

    return (
      <div className={`flex-1 flex flex-col rounded-3xl overflow-hidden border border-white/5 shadow-2xl ${bgClass}`}>
        <div className={`p-5 border-b border-white/10 flex items-center justify-between bg-black/60 backdrop-blur-md ${colorClass}`}>
          <div className="flex items-center gap-3 font-display font-bold text-xl tracking-wide">
            {icon} {title}
          </div>
          <div className="bg-white/10 px-4 py-1.5 rounded-full text-sm font-bold border border-white/5 shadow-inner">
            {columnOrders.length}
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-5 pb-32 space-y-5 custom-scrollbar bg-black/20">
          <AnimatePresence mode="popLayout">
            {columnOrders.map(order => {
              const isDelayed = order.elapsedMinutes > 20;
              return (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  className={`bg-zinc-900/90 backdrop-blur-sm border rounded-2xl p-5 shadow-xl flex flex-col relative overflow-hidden group ${
                    isDelayed ? 'border-imperial-crimson/50 shadow-[0_0_20px_rgba(178,24,31,0.2)]' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  {isDelayed && (
                    <div className="absolute top-0 left-0 w-full h-1 bg-imperial-crimson animate-pulse" />
                  )}
                  
                  <div className="flex justify-between items-start mb-4 pb-4 border-b border-white/10">
                    <div>
                      <h3 className="text-2xl font-display font-bold text-white mb-1">#{order.id}</h3>
                      <span className="inline-block px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] uppercase tracking-widest text-imperial-gold font-bold">
                        {order.type}
                      </span>
                    </div>
                    <div className={`flex items-center gap-1.5 text-sm font-bold px-3 py-1.5 rounded-xl border ${
                      isDelayed 
                        ? 'bg-imperial-crimson/20 text-imperial-crimson border-imperial-crimson/30 animate-pulse' 
                        : 'bg-white/5 text-white/60 border-white/10'
                    }`}>
                      <Timer className="w-4 h-4" /> {order.elapsedMinutes}m
                    </div>
                  </div>

                  {status === 'validando_pago' && order.paymentMethod === 'SINPE' && (
                    <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                      <p className="text-xs text-blue-400 font-bold uppercase tracking-widest mb-1">Comprobante SINPE</p>
                      <p className="text-lg font-mono text-white tracking-wider">{order.receiptNumber}</p>
                      <p className="text-sm text-white/60 mt-1">Total: ¢{order.total.toLocaleString('es-CR')}</p>
                    </div>
                  )}

                  <div className="flex-1 space-y-3 mb-5">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 bg-black/30 p-3 rounded-xl border border-white/5">
                        <span className="font-bold text-imperial-gold text-lg min-w-[1.5rem] bg-imperial-gold/10 w-8 h-8 flex items-center justify-center rounded-lg border border-imperial-gold/20">
                          {item.quantity}
                        </span>
                        <div className="flex-1 pt-1">
                          <p className="font-bold text-white text-base leading-tight">{item.product.name}</p>
                          {item.size !== 'Unico' && (
                            <span className="text-[10px] text-white/50 uppercase tracking-widest block mt-1 font-medium">{item.size}</span>
                          )}
                          {item.notes && (
                            <p className="text-xs text-imperial-crimson italic mt-2 flex items-start gap-1.5 bg-imperial-crimson/10 p-2 rounded-lg border border-imperial-crimson/20">
                              <AlertCircle className="w-4 h-4 shrink-0" /> 
                              <span className="leading-tight">{item.notes}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-3">
                    {status === 'validando_pago' && (
                      <button 
                        onClick={() => moveOrder(order.id, 'nuevo')}
                        className="col-span-2 bg-blue-500 hover:bg-blue-400 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] text-lg"
                      >
                        <CheckCircle2 className="w-5 h-5" /> Aprobar Pago
                      </button>
                    )}
                    {status === 'nuevo' && (
                      <button 
                        onClick={() => moveOrder(order.id, 'preparando')}
                        className="col-span-2 bg-imperial-crimson hover:bg-imperial-crimson/90 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(178,24,31,0.3)] hover:shadow-[0_0_30px_rgba(178,24,31,0.5)] text-lg"
                      >
                        <Flame className="w-5 h-5" /> Iniciar Preparación
                      </button>
                    )}
                    {status === 'preparando' && (
                      <>
                        <button 
                          onClick={() => moveOrder(order.id, 'nuevo')}
                          className="bg-zinc-800 hover:bg-zinc-700 text-white/60 hover:text-white py-3.5 rounded-xl font-bold transition-all text-sm border border-white/5"
                        >
                          Deshacer
                        </button>
                        <button 
                          onClick={() => moveOrder(order.id, 'listo')}
                          className="bg-imperial-gold hover:bg-imperial-gold/90 text-black py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(242,183,5,0.3)] hover:shadow-[0_0_30px_rgba(242,183,5,0.5)] text-lg"
                        >
                          <CheckCircle2 className="w-5 h-5" /> Terminar
                        </button>
                      </>
                    )}
                    {status === 'listo' && (
                      <button 
                        onClick={() => moveOrder(order.id, order.type === 'Express' ? 'en_camino' : 'entregado')}
                        className="col-span-2 bg-emerald-500 hover:bg-emerald-400 text-black py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] text-lg"
                      >
                        <CheckCircle2 className="w-5 h-5" /> {order.type === 'Express' ? 'Enviar Pedido' : 'Entregar Pedido'}
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  return (
    <div className="h-[calc(100vh-5rem)] bg-oled-black flex flex-col overflow-hidden font-sans">
      {/* KDS Header */}
      <div className="px-6 py-4 bg-zinc-950/90 backdrop-blur-2xl border-b border-white/5 flex justify-between items-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-10">
        <div className="flex items-center gap-3">
          <SpinningLogo size="sm" className="drop-shadow-[0_0_15px_rgba(242,183,5,0.3)]" />
          <div>
            <h1 className="text-xl font-display font-bold text-white tracking-wide">Pedidos y Cocina</h1>
            <p className="text-xs text-white/50 uppercase tracking-widest font-medium">Sabor Chino - Hermanos Balmaceda</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-xl border border-white/10 shadow-inner">
          <Clock className="w-4 h-4 text-imperial-gold drop-shadow-[0_0_8px_rgba(242,183,5,0.5)]" />
          <span className="font-bold text-white tracking-wider">
            {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
          </span>
        </div>
      </div>

      {/* KDS Columns */}
      <div className="flex-1 p-6 flex gap-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
        {renderColumn('validando_pago', 'Validar Pagos', <Banknote className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />, 'text-blue-400', 'bg-zinc-950/90 backdrop-blur-md')}
        {renderColumn('nuevo', 'Nuevos', <AlertCircle className="w-6 h-6 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />, 'text-white', 'bg-zinc-950/90 backdrop-blur-md')}
        {renderColumn('preparando', 'En Fuego', <Flame className="w-6 h-6 drop-shadow-[0_0_8px_rgba(178,24,31,0.5)]" />, 'text-imperial-crimson', 'bg-zinc-950/90 backdrop-blur-md')}
        {renderColumn('listo', 'Listos', <CheckCircle2 className="w-6 h-6 drop-shadow-[0_0_8px_rgba(242,183,5,0.5)]" />, 'text-imperial-gold', 'bg-zinc-950/90 backdrop-blur-md')}
      </div>
    </div>
  );
}
