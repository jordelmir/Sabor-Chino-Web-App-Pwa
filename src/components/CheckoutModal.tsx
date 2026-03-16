import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/useCartStore';
import { X, MapPin, CreditCard, Banknote, Smartphone, ScanFace } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, getTotal, clearCart } = useCartStore();
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'SINPE' | 'Tarjeta' | 'Efectivo'>('SINPE');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleConfirm = () => {
    if (!address) {
      alert('Por favor ingresa una dirección de entrega.');
      return;
    }

    setIsAuthenticating(true);
    
    // Simulate FaceID / Biometric auth
    setTimeout(() => {
      setIsAuthenticating(false);
      
      const total = getTotal();
      let message = `*Nuevo Pedido - Sabor Chino*\n\n`;
      message += `📍 *Dirección:* ${address}\n`;
      message += `💳 *Pago:* ${paymentMethod}\n\n`;
      
      items.forEach(item => {
        const price = item.size === 'Medio' && item.product.priceMedio ? item.product.priceMedio : item.product.price;
        message += `${item.quantity}x ${item.product.name} (${item.size}) - ¢${(price * item.quantity).toLocaleString('es-CR')}\n`;
        if (item.notes) message += `   _Nota: ${item.notes}_\n`;
      });
      message += `\n*Total: ¢${total.toLocaleString('es-CR')}*`;
      
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/50660394591?text=${encodedMessage}`, '_blank');
      
      clearCart();
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-oled-black/90 backdrop-blur-md p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-zinc-950/95 backdrop-blur-3xl w-full max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border border-white/10"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 relative">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/5 rounded-full text-white/60 hover:text-white transition-colors border border-white/5 hover:bg-white/10"
                disabled={isAuthenticating}
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-display font-bold text-white mb-6 tracking-wide">Finalizar Pedido</h2>

              <div className="space-y-6">
                {/* Address Section */}
                <div>
                  <h3 className="text-sm font-bold text-white/80 mb-3 uppercase tracking-widest flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-imperial-gold drop-shadow-[0_0_8px_rgba(242,183,5,0.5)]" />
                    Dirección de Entrega
                  </h3>
                  <div className="relative">
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Ej. 100m sur de la iglesia, casa blanca con portón negro..."
                      className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-imperial-gold focus:ring-1 focus:ring-imperial-gold resize-none h-24 shadow-inner focus:shadow-[0_0_15px_rgba(242,183,5,0.15)] transition-all"
                      disabled={isAuthenticating}
                    />
                    <button className="absolute bottom-3 right-3 text-xs bg-imperial-gold/20 text-imperial-gold px-3 py-1.5 rounded-full font-bold flex items-center gap-1 hover:bg-imperial-gold/30 transition-colors border border-imperial-gold/30">
                      <MapPin className="w-3 h-3" /> Usar GPS
                    </button>
                  </div>
                </div>

                {/* Payment Method Section */}
                <div>
                  <h3 className="text-sm font-bold text-white/80 mb-3 uppercase tracking-widest flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-imperial-gold drop-shadow-[0_0_8px_rgba(242,183,5,0.5)]" />
                    Método de Pago
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setPaymentMethod('SINPE')}
                      disabled={isAuthenticating}
                      className={`flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-2xl border transition-all ${
                        paymentMethod === 'SINPE' 
                          ? 'border-imperial-gold bg-imperial-gold/10 text-imperial-gold shadow-[0_0_15px_rgba(242,183,5,0.15)]' 
                          : 'border-white/10 bg-black/40 text-white/60 hover:bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <Smartphone className="w-6 h-6" />
                      <span className="text-xs font-bold">SINPE Móvil</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('Tarjeta')}
                      disabled={isAuthenticating}
                      className={`flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-2xl border transition-all ${
                        paymentMethod === 'Tarjeta' 
                          ? 'border-imperial-gold bg-imperial-gold/10 text-imperial-gold shadow-[0_0_15px_rgba(242,183,5,0.15)]' 
                          : 'border-white/10 bg-black/40 text-white/60 hover:bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <CreditCard className="w-6 h-6" />
                      <span className="text-xs font-bold">Tarjeta</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('Efectivo')}
                      disabled={isAuthenticating}
                      className={`flex flex-col items-center justify-center gap-2 py-4 px-2 rounded-2xl border transition-all ${
                        paymentMethod === 'Efectivo' 
                          ? 'border-imperial-gold bg-imperial-gold/10 text-imperial-gold shadow-[0_0_15px_rgba(242,183,5,0.15)]' 
                          : 'border-white/10 bg-black/40 text-white/60 hover:bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <Banknote className="w-6 h-6" />
                      <span className="text-xs font-bold">Efectivo</span>
                    </button>
                  </div>
                </div>

                {/* Total & Confirm */}
                <div className="pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-white/50 uppercase tracking-widest text-xs font-bold">Total a Pagar</span>
                    <span className="text-3xl font-display font-bold text-imperial-gold drop-shadow-[0_0_10px_rgba(242,183,5,0.3)]">
                      ¢{getTotal().toLocaleString('es-CR')}
                    </span>
                  </div>
                  
                  <button
                    onClick={handleConfirm}
                    disabled={isAuthenticating}
                    className="relative w-full bg-imperial-gold text-black font-bold text-lg py-4 rounded-2xl hover:bg-imperial-gold/90 transition-all active:scale-[0.98] flex items-center justify-center gap-2 overflow-hidden shadow-[0_0_20px_rgba(242,183,5,0.4)]"
                  >
                    {isAuthenticating ? (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        <ScanFace className="w-6 h-6 animate-pulse" />
                        <span>Verificando FaceID...</span>
                      </motion.div>
                    ) : (
                      <>
                        <ScanFace className="w-6 h-6" />
                        Confirmar y Pagar
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
