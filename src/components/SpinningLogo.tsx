import React from 'react';
import { motion } from 'framer-motion';

interface SpinningLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  className?: string;
}

export function SpinningLogo({ size = 'md', className = '' }: SpinningLogoProps) {
  const sizeClasses = {
    xs: 'w-6 h-6 text-[4px]',
    sm: 'w-10 h-10 text-[6px]',
    md: 'w-16 h-16 text-[10px]',
    lg: 'w-24 h-24 text-[14px]',
    xl: 'w-40 h-40 text-[24px]',
    xxl: 'w-64 h-64 text-[38px]'
  };

  return (
    <div className={className} style={{ perspective: '1000px' }}>
      <motion.div
        animate={{ rotateY: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className={`${sizeClasses[size]} rounded-full border-[2px] sm:border-[3px] border-imperial-gold bg-gradient-to-br from-imperial-crimson to-[#5a0000] flex items-center justify-center shadow-[0_0_20px_rgba(242,183,5,0.4)] relative`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Inner black circle */}
        <div 
          className="absolute inset-[8%] rounded-full bg-black/60 border border-imperial-gold/50 flex flex-col items-center justify-between py-[10%]" 
          style={{ transform: 'translateZ(1px)' }} 
        >
          <span className="text-imperial-gold opacity-80" style={{ fontSize: '1.5em' }}>🏮</span>
          <span className="text-imperial-gold opacity-80" style={{ fontSize: '1.5em' }}>🐉</span>
        </div>
        
        {/* Text */}
        <div 
          className="text-center font-display font-black leading-none tracking-tighter flex flex-col items-center justify-center w-full absolute inset-0" 
          style={{ transform: 'translateZ(10px)' }}
        >
          <span className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,1)]" style={{ fontSize: '1.4em' }}>SABOR</span>
          <span className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,1)]" style={{ fontSize: '1.4em' }}>CHINO</span>
        </div>
        
        {/* Back side of the coin */}
        <div 
          className="absolute inset-0 rounded-full bg-gradient-to-br from-[#5a0000] to-imperial-crimson border-[2px] sm:border-[3px] border-imperial-gold flex items-center justify-center"
          style={{ transform: 'rotateY(180deg) translateZ(1px)', backfaceVisibility: 'hidden' }}
        >
           <div className="w-[80%] h-[80%] rounded-full border border-imperial-gold/30 flex items-center justify-center bg-black/40">
             <span className="text-imperial-gold opacity-80" style={{ fontSize: '3em' }}>🐉</span>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
