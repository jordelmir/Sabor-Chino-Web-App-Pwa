import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES, MENU_DATA, Product } from '../../data/menuData';
import { Search, Plus, Minus, Trash2, CreditCard, Banknote, Clock, UtensilsCrossed, Send } from 'lucide-react';
import { SpinningLogo } from '../SpinningLogo';

interface OrderItem {
  id: string;
  product: Product;
  size: 'Entero' | 'Medio' | 'Unico';
  quantity: number;
  notes: string;
}

export function EmployeePOS() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].name);
  const [searchQuery, setSearchQuery] = useState('');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [orderType, setOrderType] = useState<'Para Llevar' | 'Comer Aquí'>('Para Llevar');

  const filteredProducts = useMemo(() => {
    let filtered = MENU_DATA;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(query));
    } else {
      filtered = filtered.filter(p => p.category === activeCategory);
    }
    return filtered;
  }, [activeCategory, searchQuery]);

  const addToOrder = (product: Product, size: 'Entero' | 'Medio' | 'Unico' = 'Unico') => {
    setOrderItems(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item => 
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: Math.random().toString(), product, size, quantity: 1, notes: '' }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setOrderItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQ = item.quantity + delta;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeItem = (id: string) => {
    setOrderItems(prev => prev.filter(item => item.id !== id));
  };

  const clearOrder = () => {
    if (window.confirm('¿Estás seguro de que deseas limpiar la orden actual?')) {
      setOrderItems([]);
    }
  };

  const total = orderItems.reduce((sum, item) => {
    const price = item.size === 'Medio' && item.product.priceMedio ? item.product.priceMedio : item.product.price;
    return sum + (price * item.quantity);
  }, 0);

  return (
    <div className="flex h-[calc(100vh-5rem)] bg-oled-black overflow-hidden font-sans">
      {/* Categories Sidebar */}
      <div className="w-24 md:w-28 bg-zinc-950/90 backdrop-blur-2xl border-r border-white/5 overflow-y-auto hide-scrollbar flex flex-col items-center py-6 gap-3 z-20 shadow-[20px_0_50px_rgba(0,0,0,0.5)]">
        <SpinningLogo size="sm" className="mb-6 drop-shadow-[0_0_15px_rgba(242,183,5,0.3)]" />
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => { setActiveCategory(cat.name); setSearchQuery(''); }}
            className={`w-20 p-3 rounded-2xl flex flex-col items-center gap-2 transition-all duration-300 relative group ${
              activeCategory === cat.name && !searchQuery
                ? 'bg-imperial-crimson text-white shadow-[0_0_20px_rgba(178,24,31,0.4)] scale-105'
                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/90 hover:border-white/10 border border-transparent'
            }`}
          >
            <span className="text-2xl drop-shadow-md">{cat.icon}</span>
            <span className="text-[10px] font-bold text-center leading-tight tracking-widest uppercase">{cat.name}</span>
            {activeCategory === cat.name && !searchQuery && (
              <motion.div layoutId="activeCatIndicator" className="absolute -left-1 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-imperial-gold rounded-r-full shadow-[0_0_10px_rgba(242,183,5,0.5)]" />
            )}
          </button>
        ))}
      </div>

      {/* Main Product Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative bg-zinc-900/30">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
        
        {/* Top Bar */}
        <div className="p-5 border-b border-white/5 bg-zinc-950/90 backdrop-blur-2xl z-10 flex items-center justify-between gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          <div className="relative flex-1 max-w-xl group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-imperial-gold transition-colors" />
            <input
              type="text"
              placeholder="Buscar producto por nombre..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-imperial-gold focus:ring-1 focus:ring-imperial-gold transition-all shadow-inner focus:shadow-[0_0_15px_rgba(242,183,5,0.15)]"
            />
          </div>
          <div className="flex bg-black/40 rounded-2xl p-1.5 border border-white/10 shadow-inner">
            {(['Para Llevar', 'Comer Aquí'] as const).map(type => (
              <button
                key={type}
                onClick={() => setOrderType(type)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 tracking-wide ${
                  orderType === type 
                    ? 'bg-imperial-gold text-black shadow-[0_0_15px_rgba(242,183,5,0.3)] scale-95' 
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                {type === 'Comer Aquí' ? <UtensilsCrossed className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar z-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 content-start">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map(product => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  key={product.id}
                  className="bg-zinc-950/90 backdrop-blur-md border border-white/10 rounded-3xl p-4 flex flex-col justify-between hover:border-imperial-gold/50 transition-all group shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_0_25px_rgba(242,183,5,0.2)]"
                >
                  <div className="mb-4">
                    <div className="w-full h-24 bg-zinc-900 rounded-2xl mb-3 overflow-hidden relative shadow-inner">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl opacity-50 group-hover:scale-110 transition-transform duration-500">
                          {CATEGORIES.find(c => c.name === product.category)?.icon || '🥢'}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-60" />
                    </div>
                    <h3 className="font-bold text-white text-sm mb-1 leading-tight group-hover:text-imperial-gold transition-colors">{product.name}</h3>
                    <p className="text-[10px] text-white/40 line-clamp-2">{product.description}</p>
                  </div>
                  
                  {product.priceMedio ? (
                    <div className="flex gap-2 mt-auto">
                      <button 
                        onClick={() => addToOrder(product, 'Medio')}
                        className="flex-1 bg-white/5 hover:bg-imperial-gold hover:text-black border border-white/10 hover:border-imperial-gold rounded-xl py-2 flex flex-col items-center transition-all group/btn"
                      >
                        <span className="text-[9px] text-white/50 group-hover/btn:text-black/70 uppercase tracking-widest font-bold mb-0.5">Medio</span>
                        <span className="font-bold text-imperial-gold group-hover/btn:text-black text-sm">¢{product.priceMedio.toLocaleString()}</span>
                      </button>
                      <button 
                        onClick={() => addToOrder(product, 'Entero')}
                        className="flex-1 bg-white/5 hover:bg-imperial-gold hover:text-black border border-white/10 hover:border-imperial-gold rounded-xl py-2 flex flex-col items-center transition-all group/btn"
                      >
                        <span className="text-[9px] text-white/50 group-hover/btn:text-black/70 uppercase tracking-widest font-bold mb-0.5">Entero</span>
                        <span className="font-bold text-imperial-gold group-hover/btn:text-black text-sm">¢{product.price.toLocaleString()}</span>
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => addToOrder(product, 'Unico')}
                      className="w-full mt-auto bg-white/5 hover:bg-imperial-gold hover:text-black border border-white/10 hover:border-imperial-gold rounded-xl py-3 flex items-center justify-center gap-2 transition-all group/btn"
                    >
                      <span className="font-bold text-imperial-gold group-hover/btn:text-black">¢{product.price.toLocaleString()}</span>
                    </button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Ticket Sidebar */}
      <div className="w-80 lg:w-[400px] bg-zinc-950 border-l border-white/5 flex flex-col shadow-2xl z-20 relative">
        {/* Ticket Header */}
        <div className="p-5 border-b border-white/10 bg-black/60 backdrop-blur-xl">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
              Orden <span className="text-imperial-gold">#8496</span>
            </h2>
            <button 
              onClick={clearOrder}
              disabled={orderItems.length === 0}
              className="text-white/30 hover:text-imperial-crimson disabled:opacity-30 transition-colors p-2 rounded-full hover:bg-white/5"
              title="Limpiar Orden"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
          <div className="text-xs text-white/50 flex items-center gap-2 bg-white/5 inline-flex px-3 py-1.5 rounded-lg border border-white/5">
            <Clock className="w-3.5 h-3.5 text-imperial-gold" /> 
            <span className="font-medium">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="font-bold text-white/80 uppercase tracking-wider text-[10px]">{orderType}</span>
          </div>
        </div>

        {/* Ticket Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar bg-zinc-950/50">
          <AnimatePresence mode="popLayout">
            {orderItems.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center text-white/20">
                <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-4 border border-white/5">
                  <UtensilsCrossed className="w-10 h-10 opacity-20" />
                </div>
                <p className="text-sm font-bold uppercase tracking-widest">Orden Vacía</p>
                <p className="text-xs mt-2 text-center max-w-[200px]">Selecciona productos del menú para comenzar</p>
              </motion.div>
            ) : (
              orderItems.map(item => {
                const price = item.size === 'Medio' && item.product.priceMedio ? item.product.priceMedio : item.product.price;
                return (
                  <motion.div 
                    layout
                    key={item.id}
                    initial={{ opacity: 0, x: 20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -20, scale: 0.95 }}
                    className="bg-zinc-900/80 border border-white/10 rounded-2xl p-3.5 shadow-sm group hover:border-white/20 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 pr-3">
                        <h4 className="font-bold text-white text-sm leading-tight mb-1">{item.product.name}</h4>
                        {item.size !== 'Unico' && (
                          <span className="inline-block px-2 py-0.5 bg-imperial-gold/10 border border-imperial-gold/20 text-[10px] text-imperial-gold uppercase tracking-widest rounded-md font-bold">
                            {item.size}
                          </span>
                        )}
                      </div>
                      <div className="font-bold text-white text-sm bg-black/40 px-2 py-1 rounded-lg border border-white/5">
                        ¢{(price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/5">
                      <button onClick={() => removeItem(item.id)} className="p-2 text-white/30 hover:text-imperial-crimson hover:bg-imperial-crimson/10 rounded-lg transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="flex items-center bg-black/60 rounded-xl border border-white/10 p-1">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"><Minus className="w-4 h-4" /></button>
                        <span className="w-10 text-center font-bold text-sm text-white">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"><Plus className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>

        {/* Ticket Footer / Actions */}
        <div className="p-5 bg-black/80 border-t border-white/10 backdrop-blur-xl">
          <div className="flex justify-between items-end mb-5">
            <span className="text-white/50 font-bold uppercase tracking-widest text-xs mb-1">Total a Pagar</span>
            <span className="text-4xl font-display font-bold text-imperial-gold drop-shadow-[0_0_10px_rgba(242,183,5,0.3)]">
              ¢{total.toLocaleString()}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-3">
            <button 
              disabled={orderItems.length === 0}
              className="bg-zinc-800 hover:bg-zinc-700 text-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-white/5"
            >
              <Banknote className="w-5 h-5 text-emerald-400" /> Efectivo
            </button>
            <button 
              disabled={orderItems.length === 0}
              className="bg-zinc-800 hover:bg-zinc-700 text-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-white/5"
            >
              <CreditCard className="w-5 h-5 text-blue-400" /> Tarjeta
            </button>
          </div>
          
          <button 
            disabled={orderItems.length === 0}
            className="w-full bg-imperial-crimson hover:bg-imperial-crimson/90 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(178,24,31,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none text-lg"
          >
            <Send className="w-5 h-5" /> Enviar a Cocina
          </button>
        </div>
      </div>
    </div>
  );
}
