import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/useCartStore';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { CheckoutModal } from './CheckoutModal';
import { SpinningLogo } from './SpinningLogo';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-oled-black/80 backdrop-blur-sm"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-zinc-950 border-l border-white/10 shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-6 h-6 text-imperial-gold" />
                  <h2 className="text-xl font-display font-bold text-white">Tu Pedido</h2>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 bg-white/5 rounded-full text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-white/40">
                    <SpinningLogo size="xl" className="mb-6 opacity-50" />
                    <p className="text-lg">Tu carrito está vacío</p>
                    <button 
                      onClick={onClose}
                      className="mt-6 text-imperial-gold font-medium hover:text-imperial-gold/80"
                    >
                      Ver el menú
                    </button>
                  </div>
                ) : (
                  items.map((item) => {
                    const itemPrice = item.size === 'Medio' && item.product.priceMedio 
                      ? item.product.priceMedio 
                      : item.product.price;
                    
                    return (
                      <div key={item.id} className="flex gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-semibold text-white">{item.product.name}</h3>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-white/40 hover:text-imperial-crimson transition-colors p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="text-xs text-white/50 mb-2">
                            Tamaño: {item.size}
                            {item.notes && <span className="block mt-1 italic">Nota: {item.notes}</span>}
                          </div>
                          <div className="font-bold text-imperial-gold">
                            ¢{(itemPrice * item.quantity).toLocaleString('es-CR')}
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-center justify-between bg-white/5 rounded-full p-1 border border-white/10">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <span className="w-6 text-center font-bold text-sm text-white py-1">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {items.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-zinc-950">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-white/60 uppercase tracking-wider text-sm font-medium">Total a Pagar</span>
                    <span className="text-2xl font-bold text-imperial-gold">
                      ¢{getTotal().toLocaleString('es-CR')}
                    </span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-imperial-gold text-oled-black font-bold text-lg py-4 rounded-full hover:bg-imperial-gold/90 transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    Ir a Pagar
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => {
          setIsCheckoutOpen(false);
          onClose();
        }} 
      />
    </>
  );
}
