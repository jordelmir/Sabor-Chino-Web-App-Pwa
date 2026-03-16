import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EmployeeBottomNav } from './EmployeeBottomNav';
import { EmployeePOS } from './EmployeePOS';
import { EmployeeKDS } from './EmployeeKDS';
import { ProfileView } from '../ProfileView';

export function EmployeeApp() {
  const [activeTab, setActiveTab] = useState<'pos' | 'kds' | 'profile'>('pos');

  return (
    <div className="min-h-screen bg-oled-black text-white font-sans selection:bg-imperial-crimson/30 selection:text-imperial-crimson pb-20 relative">
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03] pointer-events-none mix-blend-screen"></div>
      <AnimatePresence mode="wait">
        {activeTab === 'pos' && (
          <motion.div key="pos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
            <EmployeePOS />
          </motion.div>
        )}
        
        {activeTab === 'kds' && (
          <motion.div key="kds" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
            <EmployeeKDS />
          </motion.div>
        )}

        {activeTab === 'profile' && (
          <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ProfileView />
          </motion.div>
        )}
      </AnimatePresence>

      <EmployeeBottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
