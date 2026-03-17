import React, { useState, useEffect } from 'react';
import { MapPin, Clock, CheckCircle2, Star, Navigation, ChefHat, PackageCheck, Banknote, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpinningLogo } from './SpinningLogo';
import { useOrderStore, OrderStatus } from '../store/useOrderStore';

export function OrdersView() {
  const { orders } = useOrderStore();
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [isRated, setIsRated] = useState(false);

  const handleRating = (r: number) => {
    setRating(r);
    setIsRated(true);
  };

  // Find the most recent active order (or the last one if all are delivered)
  const activeOrder = orders.find(o => o.status !== 'entregado') || orders[0];

  if (!activeOrder) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 pb-32 flex flex-col items-center justify-center min-h-[60vh]">
        <PackageCheck className="w-16 h-16 text-white/20 mb-4" />
        <h2 className="text-2xl font-display font-bold text-white mb-2">No tienes pedidos</h2>
        <p className="text-white/50">Tus pedidos recientes aparecerán aquí.</p>
      </div>
    );
  }

  const status = activeOrder.status;

  const getStatusConfig = () => {
    switch (status) {
      case 'validando_pago':
        return {
          title: 'Validando Pago',
          desc: 'Estamos revisando tu comprobante de pago.',
          icon: <Banknote className="w-5 h-5 text-blue-400" />,
          color: 'text-blue-400',
          bg: 'bg-blue-400/20',
          shadow: 'shadow-[0_0_15px_rgba(59,130,246,0.2)]'
        };
      case 'nuevo':
        return {
          title: 'Orden Recibida',
          desc: 'Tu pedido está en cola para la cocina.',
          icon: <AlertCircle className="w-5 h-5 text-purple-400" />,
          color: 'text-purple-400',
          bg: 'bg-purple-400/20',
          shadow: 'shadow-[0_0_15px_rgba(168,85,247,0.2)]'
        };
      case 'preparando':
        return {
          title: 'Preparando',
          desc: 'El chef está trabajando en tu pedido.',
          icon: <ChefHat className="w-5 h-5 text-imperial-gold" />,
          color: 'text-imperial-gold',
          bg: 'bg-imperial-gold/20',
          shadow: 'shadow-[0_0_15px_rgba(242,183,5,0.2)]'
        };
      case 'listo':
        return {
          title: 'Listo para envío',
          desc: 'Tu pedido está empacado y esperando al repartidor.',
          icon: <PackageCheck className="w-5 h-5 text-emerald-400" />,
          color: 'text-emerald-400',
          bg: 'bg-emerald-400/20',
          shadow: 'shadow-[0_0_15px_rgba(52,211,153,0.2)]'
        };
      case 'en_camino':
        return {
          title: 'En Camino',
          desc: 'Tu pedido va en camino a tu dirección.',
          icon: <Navigation className="w-5 h-5 text-blue-400" />,
          color: 'text-blue-400',
          bg: 'bg-blue-400/20',
          shadow: 'shadow-[0_0_15px_rgba(59,130,246,0.2)]'
        };
      case 'entregado':
        return {
          title: 'Entregado',
          desc: '¡Disfruta tu banquete!',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
          color: 'text-emerald-500',
          bg: 'bg-emerald-500/20',
          shadow: 'shadow-[0_0_15px_rgba(16,185,129,0.2)]'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 py-8 pb-32"
    >
      <h2 className="text-2xl font-display font-bold text-white mb-6">Pedido Activo</h2>
      
      <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 mb-8 relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        <div className={`absolute top-0 right-0 w-32 h-32 ${config.bg} rounded-bl-full blur-2xl pointer-events-none transition-colors duration-1000`} />
        
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className={`${config.color} text-xs font-bold uppercase tracking-widest drop-shadow-[0_0_8px_currentColor] transition-colors duration-500`}>
              {config.title}
            </span>
            <h3 className="text-xl font-bold text-white mt-1 tracking-wide">Orden #{activeOrder.id}</h3>
          </div>
          <div className="text-right">
            <span className="text-white/40 text-xs uppercase tracking-widest font-bold">Llegada est.</span>
            <div className="text-lg font-bold text-white flex items-center gap-1">
              <Clock className={`w-4 h-4 ${config.color} drop-shadow-[0_0_8px_currentColor] transition-colors duration-500`} />
              {status === 'entregado' ? '--:--' : '15-20 min'}
            </div>
          </div>
        </div>

        <div className="relative pt-4 mb-8">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 rounded-full overflow-hidden">
            <motion.div 
              className={`h-full ${config.bg.replace('/20', '')}`}
              initial={{ width: '0%' }}
              animate={{ 
                width: status === 'validando_pago' ? '10%' :
                       status === 'nuevo' ? '25%' :
                       status === 'preparando' ? '50%' : 
                       status === 'listo' ? '75%' : 
                       status === 'en_camino' ? '90%' : '100%' 
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </div>
          <div className="relative flex justify-between">
            {['validando_pago', 'nuevo', 'preparando', 'listo', 'en_camino', 'entregado'].map((step, index) => {
              const isActive = [
                'validando_pago', 'nuevo', 'preparando', 'listo', 'en_camino', 'entregado'
              ].indexOf(status) >= index;
              
              let StepIcon = Banknote;
              if (step === 'nuevo') StepIcon = AlertCircle;
              if (step === 'preparando') StepIcon = ChefHat;
              if (step === 'listo') StepIcon = PackageCheck;
              if (step === 'en_camino') StepIcon = Navigation;
              if (step === 'entregado') StepIcon = CheckCircle2;

              return (
                <motion.div 
                  key={step}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-zinc-950 transition-all duration-500 z-10 ${
                    isActive ? `${config.bg.replace('/20', '')} text-black shadow-[0_0_15px_currentColor]` : 'bg-white/5 text-white/20'
                  }`}
                >
                  <StepIcon className="w-4 h-4" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Area: Map or Rating */}
        <AnimatePresence mode="wait">
          {status === 'entregado' ? (
            <motion.div 
              key="rating"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full bg-zinc-950/90 rounded-2xl border border-white/10 mb-6 p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-inner text-center"
            >
              {!isRated ? (
                <>
                  <h4 className="text-lg font-bold text-white mb-2">¿Qué tal estuvo tu comida?</h4>
                  <p className="text-sm text-white/50 mb-4">Califica tu experiencia con Hermanos Balmaceda</p>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => handleRating(star)}
                        className="p-1 transition-transform hover:scale-110 focus:outline-none"
                      >
                        <Star 
                          className={`w-8 h-8 transition-colors ${
                            (hoveredRating || rating) >= star 
                              ? 'text-imperial-gold fill-imperial-gold drop-shadow-[0_0_10px_rgba(242,183,5,0.5)]' 
                              : 'text-white/20'
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-12 h-12 bg-imperial-gold/20 rounded-full flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-6 h-6 text-imperial-gold" />
                  </div>
                  <h4 className="text-lg font-bold text-white">¡Gracias por tu calificación!</h4>
                  <p className="text-sm text-white/50">Esperamos verte pronto.</p>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-48 bg-zinc-950/90 rounded-2xl border border-white/10 mb-6 flex items-center justify-center relative overflow-hidden shadow-inner"
            >
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #F2B705 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
              
              {status === 'en_camino' ? (
                <div className="absolute inset-0">
                  {/* Simulated Map Path */}
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <path 
                      d="M 50,150 Q 150,50 250,100 T 400,50" 
                      fill="none" 
                      stroke="rgba(242,183,5,0.3)" 
                      strokeWidth="4" 
                      strokeDasharray="8 8"
                    />
                  </svg>
                  {/* Moving Driver */}
                  <motion.div 
                    initial={{ x: 50, y: 150 }}
                    animate={{ x: [50, 150, 250, 400], y: [150, 50, 100, 50] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.6)] -ml-4 -mt-4 z-20"
                  >
                    <Navigation className="w-4 h-4 text-white" />
                  </motion.div>
                  {/* Destination */}
                  <div className="absolute right-[10%] top-[20%] w-6 h-6 bg-imperial-crimson rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(178,24,31,0.6)] z-10">
                    <MapPin className="w-3 h-3 text-white" />
                  </div>
                </div>
              ) : (
                <div className="text-center z-10 flex flex-col items-center">
                  <SpinningLogo size="md" className="mb-2 drop-shadow-[0_0_15px_rgba(242,183,5,0.3)]" />
                  <span className="text-xs text-white/60 font-bold uppercase tracking-widest">
                    {status === 'validando_pago' ? 'Revisando Pago' :
                     status === 'nuevo' ? 'En Cola' :
                     status === 'preparando' ? 'En Cocina' : 'Esperando Repartidor'}
                  </span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-4 relative z-10">
          <motion.div 
            layout
            className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${config.bg} ${config.shadow}`}>
              {config.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white tracking-wide">{config.title}</p>
              <p className="text-xs text-white/50 font-medium">{config.desc}</p>
            </div>
          </motion.div>
        </div>
      </div>

      <h2 className="text-2xl font-display font-bold text-white mb-6 tracking-wide">Detalles del Pedido</h2>
      
      <div className="bg-zinc-950/90 backdrop-blur-md rounded-3xl border border-white/10 p-6 mb-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
          <div>
            <p className="text-xs text-white/50 font-bold uppercase tracking-widest mb-1">Orden #{activeOrder.id}</p>
            <p className="text-sm text-white font-medium">{activeOrder.items.length} productos</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/50 font-bold uppercase tracking-widest mb-1">Total</p>
            <p className="text-lg font-bold text-imperial-gold drop-shadow-[0_0_8px_rgba(242,183,5,0.3)]">
              ¢{activeOrder.total.toLocaleString('es-CR')}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {activeOrder.items.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-white/70 border border-white/10">
                  {item.quantity}
                </span>
                <div>
                  <p className="text-sm font-bold text-white">{item.product.name}</p>
                  {item.size !== 'Unico' && (
                    <p className="text-xs text-white/50">{item.size}</p>
                  )}
                </div>
              </div>
              <span className="text-sm font-bold text-white/80">
                ¢{(item.product.price * item.quantity).toLocaleString('es-CR')}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
          <span className="text-xs text-white/50 font-bold uppercase tracking-widest">Método de Pago</span>
          <span className="text-sm font-bold text-white bg-white/5 px-3 py-1 rounded-lg border border-white/10">
            {activeOrder.paymentMethod}
          </span>
        </div>
      </div>

      <h2 className="text-2xl font-display font-bold text-white mb-6 tracking-wide">Historial de Banquetes</h2>
      
      <div className="space-y-4">
        {orders.filter(o => o.status === 'entregado').length === 0 ? (
          <div className="text-center py-8 text-white/50">
            No tienes pedidos anteriores.
          </div>
        ) : (
          orders.filter(o => o.status === 'entregado').map((order) => (
            <div key={order.id} className="bg-black/40 backdrop-blur-sm border border-white/5 hover:border-white/10 rounded-2xl p-4 flex items-center justify-between transition-all group hover:shadow-[0_5px_15px_rgba(0,0,0,0.3)]">
              <div>
                <div className="text-xs text-white/40 mb-1 font-bold tracking-widest uppercase">
                  {new Date(order.createdAt).toLocaleDateString('es-CR')}
                </div>
                <div className="font-bold text-white text-sm">
                  Orden #{order.id} - {order.items.length} productos
                </div>
                <div className="text-sm font-bold text-imperial-gold mt-1 drop-shadow-[0_0_8px_rgba(242,183,5,0.3)]">
                  ¢{order.total.toLocaleString('es-CR')}
                </div>
              </div>
              <button className="px-5 py-2.5 bg-white/5 hover:bg-imperial-gold/20 text-white hover:text-imperial-gold text-xs font-bold rounded-xl transition-all border border-white/10 hover:border-imperial-gold/30">
                Repetir
              </button>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}
