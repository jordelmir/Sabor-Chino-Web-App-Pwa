import React from 'react';
import { motion } from 'framer-motion';
import { Logo } from './Logo';

interface SpinningLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  className?: string;
  spin?: boolean;
}

export function SpinningLogo({ size = 'md', className = '', spin = true }: SpinningLogoProps) {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-40 h-40',
    xxl: 'w-64 h-64'
  };

  return (
    <div className={`${className} ${sizeClasses[size]} flex items-center justify-center`} style={{ perspective: '1000px' }}>
      <motion.div
        animate={spin ? { rotateY: 360 } : { rotateY: 0 }}
        transition={spin ? { duration: 8, repeat: Infinity, ease: "linear" } : {}}
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front side */}
        <div 
          className="absolute inset-0 flex items-center justify-center backface-hidden" 
          style={{ transform: 'translateZ(1px)', backfaceVisibility: 'hidden' }} 
        >
          <Logo className="w-full h-full drop-shadow-[0_0_15px_rgba(242,183,5,0.4)]" />
        </div>
        
        {/* Back side of the coin */}
        <div 
          className="absolute inset-0 flex items-center justify-center backface-hidden"
          style={{ transform: 'rotateY(180deg) translateZ(1px)', backfaceVisibility: 'hidden' }}
        >
          <Logo className="w-full h-full drop-shadow-[0_0_15px_rgba(242,183,5,0.4)]" />
        </div>
      </motion.div>
    </div>
  );
}
