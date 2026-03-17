import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AdminBottomNav } from './AdminBottomNav';
import { AdminDashboard } from './AdminDashboard';
import { AdminMenu } from './AdminMenu';
import { AdminStaff } from './AdminStaff';
import { ProfileView } from '../ProfileView';

export function AdminApp() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'menu' | 'staff' | 'profile'>('dashboard');

  return (
    <div className="min-h-screen bg-oled-black text-white font-sans selection:bg-imperial-gold/30 selection:text-imperial-gold pb-28 relative">
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] pointer-events-none mix-blend-screen"></div>
      
      <AnimatePresence mode="wait">
        {activeTab === 'dashboard' && (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AdminDashboard />
          </motion.div>
        )}
        
        {activeTab === 'menu' && (
          <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AdminMenu />
          </motion.div>
        )}

        {activeTab === 'staff' && (
          <motion.div key="staff" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AdminStaff />
          </motion.div>
        )}

        {activeTab === 'profile' && (
          <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ProfileView />
          </motion.div>
        )}
      </AnimatePresence>

      <AdminBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
