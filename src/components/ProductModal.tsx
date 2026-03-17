import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product, SizeOption } from '../data/menuData';
import { useCartStore } from '../store/useCartStore';
import { X, Minus, Plus, Image as ImageIcon } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<SizeOption>('Entero');
  const [notes, setNotes] = useState('');
  const addItem = useCartStore(state => state.addItem);
  const { t, language } = useTranslation();

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

  const displayName = language === 'en' && product.nameEn ? product.nameEn : 
                      language === 'zh' && product.nameZh ? product.nameZh : 
                      product.name;
                      
  const displayDesc = language === 'en' && product.descriptionEn ? product.descriptionEn : 
                      language === 'zh' && product.descriptionZh ? product.descriptionZh : 
                      product.description;

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
          className="bg-zinc-950/95 backdrop-blur-3xl w-full max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col max-h-[90vh]"
          onClick={e => e.stopPropagation()}
        >
          {/* Image Header */}
          <div className="relative h-64 w-full bg-black/40 shrink-0">
            {product.image ? (
              <img 
                src={product.image} 
                alt={displayName} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/20">
                <ImageIcon className="w-16 h-16 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-full text-white/80 hover:text-white transition-colors border border-white/10 hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-0 left-0 right-0 p-6 pb-2">
              <h2 className="text-3xl font-display font-bold text-white mb-1 drop-shadow-lg leading-tight tracking-wide">{displayName}</h2>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-imperial-gold drop-shadow-[0_0_10px_rgba(242,183,5,0.4)]">
                  ¢{currentPrice.toLocaleString('es-CR')}
                </span>
                {product.popular && (
                  <span className="bg-imperial-crimson text-white text-[10px] font-bold uppercase tracking-widest py-1 px-2.5 rounded-md shadow-[0_0_10px_rgba(178,24,31,0.5)]">
                    {t('popular')}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 overflow-y-auto custom-scrollbar">
            {displayDesc && (
              <p className="text-white/70 text-base mb-8 leading-relaxed font-medium">{displayDesc}</p>
            )}

            {hasSizes && (
              <div className="mb-8">
                <h3 className="text-xs font-bold text-white/50 mb-3 uppercase tracking-widest">{t('size')}</h3>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSize('Entero')}
                    className={`flex-1 py-3 px-4 rounded-2xl border transition-all ${
                      size === 'Entero' 
                        ? 'border-imperial-gold bg-imperial-gold/10 text-imperial-gold shadow-[0_0_15px_rgba(242,183,5,0.15)]' 
                        : 'border-white/10 bg-black/40 text-white/60 hover:bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="font-bold mb-1">{t('sizeFull')}</div>
                    <div className="text-sm opacity-80 font-medium">¢{product.price.toLocaleString('es-CR')}</div>
                  </button>
                  <button
                    onClick={() => setSize('Medio')}
                    className={`flex-1 py-3 px-4 rounded-2xl border transition-all ${
                      size === 'Medio' 
                        ? 'border-imperial-gold bg-imperial-gold/10 text-imperial-gold shadow-[0_0_15px_rgba(242,183,5,0.15)]' 
                        : 'border-white/10 bg-black/40 text-white/60 hover:bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="font-bold mb-1">{t('sizeHalf')}</div>
                    <div className="text-sm opacity-80 font-medium">¢{product.priceMedio?.toLocaleString('es-CR')}</div>
                  </button>
                </div>
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-xs font-bold text-white/50 mb-3 uppercase tracking-widest">{t('specialNotes')}</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t('specialNotesPlaceholder')}
                className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-imperial-gold focus:ring-1 focus:ring-imperial-gold resize-none h-24 transition-all shadow-inner focus:shadow-[0_0_15px_rgba(242,183,5,0.15)]"
              />
            </div>

            {/* Sticky Bottom Actions */}
            <div className="mt-auto pt-6 border-t border-white/10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4 bg-black/40 rounded-full p-1 border border-white/10 shadow-inner">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <Minus className="w-6 h-6" />
                  </button>
                  <span className="w-8 text-center font-bold text-xl text-white">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
                <div className="text-right">
                  <div className="text-xs text-white/40 uppercase tracking-widest mb-1 font-bold">{t('calculatedTotal')}</div>
                  <div className="text-3xl font-display font-bold text-imperial-gold drop-shadow-[0_0_10px_rgba(242,183,5,0.3)]">
                    ¢{(currentPrice * quantity).toLocaleString('es-CR')}
                  </div>
                </div>
              </div>

              <button
                onClick={handleAdd}
                className="w-full bg-imperial-gold text-black font-bold text-lg py-4 rounded-2xl hover:bg-imperial-gold/90 transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(242,183,5,0.4)]"
              >
                {t('addToOrder')}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
