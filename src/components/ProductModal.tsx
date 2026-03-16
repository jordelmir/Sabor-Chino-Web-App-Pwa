import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, SizeOption } from '../data/menuData';
import { useCartStore } from '../store/useCartStore';
import { X, Minus, Plus } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<SizeOption>('Entero');
  const [notes, setNotes] = useState('');
  const addItem = useCartStore(state => state.addItem);

  if (!product) return null;

  const hasSizes = !!product.priceMedio;
  const currentPrice = size === 'Medio' && product.priceMedio ? product.priceMedio : product.price;

  const handleAdd = () => {
    addItem(product, hasSizes ? size : 'Unico', quantity, notes);
    onClose();
    // Reset state for next open
    setQuantity(1);
    setSize('Entero');
    setNotes('');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-oled-black/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-zinc-900 w-full max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6 relative">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/5 rounded-full text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-display font-bold text-white mb-2 pr-10">{product.name}</h2>
            {product.description && (
              <p className="text-white/60 text-sm mb-6 leading-relaxed">{product.description}</p>
            )}

            {hasSizes && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-white/80 mb-3 uppercase tracking-wider">Tamaño</h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSize('Entero')}
                    className={`flex-1 py-3 px-4 rounded-2xl border transition-all ${
                      size === 'Entero' 
                        ? 'border-imperial-gold bg-imperial-gold/10 text-imperial-gold' 
                        : 'border-white/10 bg-white/5 text-white/60'
                    }`}
                  >
                    <div className="font-semibold">Entero</div>
                    <div className="text-xs opacity-80">¢{product.price.toLocaleString('es-CR')}</div>
                  </button>
                  <button
                    onClick={() => setSize('Medio')}
                    className={`flex-1 py-3 px-4 rounded-2xl border transition-all ${
                      size === 'Medio' 
                        ? 'border-imperial-gold bg-imperial-gold/10 text-imperial-gold' 
                        : 'border-white/10 bg-white/5 text-white/60'
                    }`}
                  >
                    <div className="font-semibold">Medio</div>
                    <div className="text-xs opacity-80">¢{product.priceMedio?.toLocaleString('es-CR')}</div>
                  </button>
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-sm font-medium text-white/80 mb-3 uppercase tracking-wider">Notas Especiales</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ej. Sin cebollino, extra salsa de soya..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-imperial-gold focus:ring-1 focus:ring-imperial-gold resize-none h-24"
              />
            </div>

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4 bg-white/5 rounded-full p-1 border border-white/10">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="w-6 text-center font-bold text-lg text-white">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="text-right">
                <div className="text-sm text-white/50 uppercase tracking-wider mb-1">Total</div>
                <div className="text-2xl font-bold text-imperial-gold">
                  ¢{(currentPrice * quantity).toLocaleString('es-CR')}
                </div>
              </div>
            </div>

            <button
              onClick={handleAdd}
              className="w-full bg-imperial-gold text-oled-black font-bold text-lg py-4 rounded-full hover:bg-imperial-gold/90 transition-colors active:scale-[0.98]"
            >
              Agregar al Pedido
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
