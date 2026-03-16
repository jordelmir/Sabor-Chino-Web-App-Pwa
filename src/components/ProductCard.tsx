import React from 'react';
import { Product } from '../data/menuData';
import { Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '../store/useCartStore';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const formatPrice = (price: number) => `¢${price.toLocaleString('es-CR')}`;
  
  const { items, addItem, updateQuantity, removeItem } = useCartStore();
  
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white/5 border border-white/10 rounded-3xl p-4 flex flex-col justify-between overflow-hidden relative group hover:border-imperial-gold/50 transition-colors"
      onClick={() => onSelect(product)}
    >
      {product.popular && (
        <div className="absolute top-0 right-0 bg-imperial-crimson text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-bl-xl z-10">
          Popular
        </div>
      )}
      
      <div className="flex-1">
        <h3 className="text-lg font-display font-semibold text-white mb-1 leading-tight">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-sm text-white/50 mb-3 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}
      </div>

      <div className="flex items-end justify-between mt-4">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-imperial-gold">
              {formatPrice(product.price)}
            </span>
            {product.priceMedio && (
              <span className="text-xs text-white/40 font-medium">
                / {formatPrice(product.priceMedio)}
              </span>
            )}
          </div>
          {product.priceMedio && (
            <p className="text-[10px] text-white/30 uppercase tracking-wider mt-0.5">Entero / Medio</p>
          )}
        </div>

        {cartItem && !hasSizes ? (
          <div className="flex items-center bg-imperial-gold/20 rounded-full border border-imperial-gold/30" onClick={e => e.stopPropagation()}>
            <button 
              className="w-10 h-10 rounded-full flex items-center justify-center text-imperial-gold hover:bg-imperial-gold hover:text-oled-black transition-colors"
              onClick={handleQuickRemove}
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="w-6 text-center font-bold text-sm text-white">{cartItem.quantity}</span>
            <button 
              className="w-10 h-10 rounded-full flex items-center justify-center text-imperial-gold hover:bg-imperial-gold hover:text-oled-black transition-colors"
              onClick={handleQuickAdd}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button 
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-imperial-gold hover:text-oled-black transition-colors group-hover:bg-imperial-gold group-hover:text-oled-black"
            onClick={handleQuickAdd}
          >
            <Plus className="w-5 h-5" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
