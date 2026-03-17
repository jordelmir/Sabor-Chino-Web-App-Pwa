import React from 'react';
import { Product } from '../data/menuData';
import { Plus, Minus, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '../store/useCartStore';
import { useTranslation } from '../hooks/useTranslation';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const formatPrice = (price: number) => `¢${price.toLocaleString('es-CR')}`;
  
  const { items, addItem, updateQuantity, removeItem } = useCartStore();
  const { t, language } = useTranslation();
  
  // Find if this exact product (without special notes/sizes) is in the cart
  const cartItem = items.find(item => item.product.id === product.id && item.size === 'Unico' && !item.notes);
  const hasSizes = !!product.priceMedio;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasSizes) {
      onSelect(product);
    } else {
      if (cartItem) {
        updateQuantity(cartItem.id, cartItem.quantity + 1);
      } else {
        addItem(product, 'Unico', 1, '');
      }
    }
  };

  const handleQuickRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartItem) {
      if (cartItem.quantity > 1) {
        updateQuantity(cartItem.id, cartItem.quantity - 1);
      } else {
        removeItem(cartItem.id);
      }
    }
  };

  const displayName = language === 'en' && product.nameEn ? product.nameEn : 
                      language === 'zh' && product.nameZh ? product.nameZh : 
                      product.name;
                      
  const displayDesc = language === 'en' && product.descriptionEn ? product.descriptionEn : 
                      language === 'zh' && product.descriptionZh ? product.descriptionZh : 
                      product.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-zinc-950/90 backdrop-blur-2xl border border-white/10 rounded-3xl flex flex-col overflow-hidden relative group hover:border-imperial-gold/30 hover:shadow-[0_0_25px_rgba(242,183,5,0.2)] transition-all duration-300 cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
      onClick={() => onSelect(product)}
    >
      {product.popular && (
        <div className="absolute top-0 right-0 bg-imperial-crimson text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-3.5 rounded-bl-2xl z-10 shadow-[0_0_15px_rgba(178,24,31,0.5)]">
          {t('popular')}
        </div>
      )}
      
      {/* Image Section */}
      <div className="relative h-48 w-full bg-zinc-900 overflow-hidden shadow-inner">
        {product.image ? (
          <img 
            src={product.image} 
            alt={displayName} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/20">
            <ImageIcon className="w-12 h-12" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-oled-black via-oled-black/20 to-transparent opacity-80" />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1 -mt-12 relative z-10">
        <div className="flex-1">
          <h3 className="text-xl font-display font-semibold text-white mb-1 leading-tight drop-shadow-md tracking-wide">
            {displayName}
          </h3>
          {displayDesc && (
            <p className="text-sm text-white/60 mb-3 line-clamp-2 leading-relaxed">
              {displayDesc}
            </p>
          )}
        </div>

        <div className="flex items-end justify-between mt-4 pt-4 border-t border-white/10">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-imperial-gold drop-shadow-[0_0_8px_rgba(242,183,5,0.3)]">
                {formatPrice(product.price)}
              </span>
              {product.priceMedio && (
                <span className="text-xs text-white/40 font-medium">
                  / {formatPrice(product.priceMedio)}
                </span>
              )}
            </div>
            {product.priceMedio && (
              <p className="text-[10px] text-white/30 uppercase tracking-widest mt-0.5 font-bold">Entero / Medio</p>
            )}
          </div>

          {cartItem && !hasSizes ? (
            <div className="flex items-center bg-imperial-gold/20 rounded-full border border-imperial-gold/30 backdrop-blur-md shadow-[0_0_15px_rgba(242,183,5,0.15)]" onClick={e => e.stopPropagation()}>
              <button 
                className="w-10 h-10 rounded-full flex items-center justify-center text-imperial-gold hover:bg-imperial-gold hover:text-oled-black transition-colors"
                onClick={handleQuickRemove}
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="w-6 text-center font-bold text-sm text-white drop-shadow-md">{cartItem.quantity}</span>
              <button 
                className="w-10 h-10 rounded-full flex items-center justify-center text-imperial-gold hover:bg-imperial-gold hover:text-oled-black transition-colors"
                onClick={handleQuickAdd}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button 
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-imperial-gold hover:text-oled-black transition-colors group-hover:bg-imperial-gold group-hover:text-oled-black border border-white/10 group-hover:border-imperial-gold shadow-[0_5px_15px_rgba(0,0,0,0.3)] group-hover:shadow-[0_0_15px_rgba(242,183,5,0.3)]"
              onClick={handleQuickAdd}
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
