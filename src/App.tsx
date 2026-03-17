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
import { WifiOff, Flame } from 'lucide-react';
import { LoginView } from './components/LoginView';
import { useUserStore } from './store/useUserStore';
import { AdminApp } from './components/admin/AdminApp';
import { EmployeeApp } from './components/employee/EmployeeApp';
import { useTranslation } from './hooks/useTranslation';

export default function App() {
  const { isAuthenticated, role } = useUserStore();
  const { t, language } = useTranslation();
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
        p.description?.toLowerCase().includes(query) ||
        p.nameEn?.toLowerCase().includes(query) ||
        p.descriptionEn?.toLowerCase().includes(query) ||
        p.nameZh?.toLowerCase().includes(query) ||
        p.descriptionZh?.toLowerCase().includes(query)
      );
    } else {
      filtered = filtered.filter(p => p.category === activeCategory);
    }
    
    return filtered;
  }, [activeCategory, searchQuery]);

  const popularProducts = useMemo(() => {
    return MENU_DATA.filter(p => p.popular).slice(0, 4);
  }, []);

  if (!isAuthenticated) {
    return <LoginView />;
  }

  if (role === 'admin') {
    return <AdminApp />;
  }

  if (role === 'employee') {
    return <EmployeeApp />;
  }

  return (
    <div className="min-h-screen bg-oled-black text-white font-sans selection:bg-imperial-gold/30 selection:text-imperial-gold pb-28 relative">
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] pointer-events-none mix-blend-screen"></div>
      <AnimatePresence>
        {!isOnline && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-imperial-crimson text-white text-xs font-bold text-center py-2 flex items-center justify-center gap-2"
          >
            <WifiOff className="w-4 h-4" />
            {t('offlineMode')}
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
              <>
                {/* Hero Section */}
                <div className="relative h-64 overflow-hidden mb-6">
                  <div className="absolute inset-0">
                    <img 
                      src="https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=1000" 
                      alt="Comida China" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-oled-black via-oled-black/60 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="inline-block px-3 py-1 bg-imperial-gold/20 text-imperial-gold text-xs font-bold uppercase tracking-widest rounded-full border border-imperial-gold/30 mb-3 backdrop-blur-md">
                        {t('houseSpecialty')}
                      </span>
                      <h2 className="text-4xl font-display font-bold text-white mb-2 drop-shadow-lg">
                        {language === 'en' ? 'Cantonese Rice' : language === 'zh' ? '广东炒饭' : 'Arroz Cantones'}
                      </h2>
                      <p className="text-white/80 text-sm max-w-md drop-shadow-md">
                        {language === 'en' ? 'Our secret family recipe, wok-prepared with fresh ingredients and the authentic Balmaceda Brothers flavor.' : language === 'zh' ? '我们的家庭秘方，用新鲜食材和正宗的Balmaceda兄弟风味炒制。' : 'Nuestra receta secreta familiar, preparada al wok con ingredientes frescos y el auténtico sabor de los Hermanos Balmaceda.'}
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* Popular Items Section */}
                <div className="px-4 mb-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Flame className="w-5 h-5 text-imperial-crimson" />
                    <h3 className="text-lg font-display font-bold text-white">{t('mostPopular')}</h3>
                  </div>
                  <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 snap-x">
                    {popularProducts.map(product => (
                      <div key={`popular-${product.id}`} className="min-w-[280px] snap-start">
                        <ProductCard 
                          product={product} 
                          onSelect={setSelectedProduct}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <CategoryList 
                  activeCategory={activeCategory} 
                  setActiveCategory={setActiveCategory} 
                />
              </>
            )}

            <main className="max-w-7xl mx-auto px-4 py-8">
              {!searchQuery && (
                <h3 className="text-2xl font-display font-bold text-white mb-6 capitalize">
                  {language === 'en' ? 'Menu' : language === 'zh' ? '菜单' : activeCategory}
                </h3>
              )}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={searchQuery ? 'search' : activeCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
                      <p className="text-lg">{t('noProductsFound')}</p>
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
