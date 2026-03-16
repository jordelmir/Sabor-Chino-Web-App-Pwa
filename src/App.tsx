/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { CategoryList } from './components/CategoryList';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { BottomNav } from './components/BottomNav';
import { OrdersView } from './components/OrdersView';
import { ProfileView } from './components/ProfileView';
import { MENU_DATA, Product } from './data/menuData';
import { AnimatePresence, motion } from 'framer-motion';
import { useNetwork } from './hooks/useNetwork';
import { WifiOff } from 'lucide-react';
import { LoginView } from './components/LoginView';
import { useUserStore } from './store/useUserStore';

export default function App() {
  const isAuthenticated = useUserStore(state => state.isAuthenticated);
  const [activeTab, setActiveTab] = useState<'home' | 'orders' | 'profile'>('home');
  const [activeCategory, setActiveCategory] = useState('Arroces');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const isOnline = useNetwork();

  const filteredProducts = useMemo(() => {
    let filtered = MENU_DATA;
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description?.toLowerCase().includes(query)
      );
    } else {
      filtered = filtered.filter(p => p.category === activeCategory);
    }
    
    return filtered;
  }, [activeCategory, searchQuery]);

  if (!isAuthenticated) {
    return <LoginView />;
  }

  return (
    <div className="min-h-screen bg-oled-black text-white font-sans selection:bg-imperial-gold/30 selection:text-imperial-gold pb-20">
      <AnimatePresence>
        {!isOnline && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-imperial-crimson text-white text-xs font-bold text-center py-2 flex items-center justify-center gap-2"
          >
            <WifiOff className="w-4 h-4" />
            Modo Sin Conexión. Mostrando menú guardado.
          </motion.div>
        )}
      </AnimatePresence>

      <Header 
        onOpenCart={() => setIsCartOpen(true)} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <AnimatePresence mode="wait">
        {activeTab === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {!searchQuery && (
              <CategoryList 
                activeCategory={activeCategory} 
                setActiveCategory={setActiveCategory} 
              />
            )}

            <main className="max-w-7xl mx-auto px-4 py-8">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={searchQuery ? 'search' : activeCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                >
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        onSelect={setSelectedProduct}
                      />
                    ))
                  ) : (
                    <div className="col-span-full py-20 text-center text-white/40">
                      <p className="text-lg">No encontramos productos que coincidan con tu búsqueda.</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </main>
          </motion.div>
        )}
        
        {activeTab === 'orders' && <OrdersView key="orders" />}
        {activeTab === 'profile' && <ProfileView key="profile" />}
      </AnimatePresence>

      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
