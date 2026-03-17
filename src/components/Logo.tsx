import React from 'react';

interface LogoProps {
  className?: string;
}

export function Logo({ className = '' }: LogoProps) {
  return (
    <svg viewBox="-40 -40 580 580" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Gradients */}
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E5C05C" />
          <stop offset="25%" stopColor="#FFF2B2" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="75%" stopColor="#AA7C11" />
          <stop offset="100%" stopColor="#6B4C05" />
        </linearGradient>
        
        <linearGradient id="goldGradDark" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8B6508" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#AA7C11" />
        </linearGradient>

        <radialGradient id="redGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D92525" />
          <stop offset="70%" stopColor="#8A1010" />
          <stop offset="100%" stopColor="#4A0000" />
        </radialGradient>
        
        <linearGradient id="blackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2A2A2A" />
          <stop offset="50%" stopColor="#111111" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>

        <linearGradient id="lanternGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6B00" />
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FF6B00" />
        </linearGradient>

        {/* Filters */}
        <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000" floodOpacity="0.8"/>
        </filter>
        
        <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feOffset dx="0" dy="6"/>
          <feGaussianBlur stdDeviation="5" result="offset-blur"/>
          <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
          <feFlood floodColor="black" floodOpacity="0.8" result="color"/>
          <feComposite operator="in" in="color" in2="inverse" result="shadow"/>
          <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
        </filter>

        <filter id="text3D" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="2" dy="4" stdDeviation="2" floodColor="#000" floodOpacity="0.9"/>
          <feDropShadow dx="0" dy="1" stdDeviation="0" floodColor="#FFF" floodOpacity="0.5"/>
        </filter>

        <filter id="bevel" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
          <feOffset dx="2" dy="2" result="offsetBlur"/>
          <feSpecularLighting in="blur" surfaceScale="2" specularConstant="0.8" specularExponent="20" lightingColor="#FFFFFF" result="specOut">
            <fePointLight x="-5000" y="-10000" z="20000"/>
          </feSpecularLighting>
          <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut"/>
          <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
        </filter>
      </defs>

      {/* Base Circle / Outer Gold Ring */}
      <circle cx="250" cy="250" r="245" fill="url(#goldGrad)" filter="url(#dropShadow)" />
      <circle cx="250" cy="250" r="235" fill="#000" />
      
      {/* Black Ring for Text */}
      <circle cx="250" cy="250" r="230" fill="url(#blackGrad)" />
      
      {/* Inner Gold Ring */}
      <circle cx="250" cy="250" r="175" fill="url(#goldGrad)" />
      
      {/* Inner Red Area */}
      <circle cx="250" cy="250" r="165" fill="url(#redGrad)" filter="url(#innerShadow)" />

      {/* Subtle Gold Waves in Red Area */}
      <path d="M 100 200 Q 150 150 250 180 T 400 150" fill="none" stroke="url(#goldGrad)" strokeWidth="2" opacity="0.3" />
      <path d="M 120 300 Q 200 350 250 320 T 380 350" fill="none" stroke="url(#goldGrad)" strokeWidth="2" opacity="0.3" />

      {/* Text on Circular Black Band */}
      {/* Top Text */}
      <path id="topCurve" d="M 60 250 A 190 190 0 0 1 440 250" fill="none" />
      <text fill="#FFF" fontFamily="'Trebuchet MS', Arial, sans-serif" fontSize="22" fontWeight="bold" letterSpacing="3">
        <textPath href="#topCurve" startOffset="22%" textAnchor="middle">HERMANOS</textPath>
        <textPath href="#topCurve" startOffset="78%" textAnchor="middle">BALMACEDA</textPath>
      </text>

      {/* Bottom Text */}
      <path id="bottomCurve" d="M 60 250 A 190 190 0 0 0 440 250" fill="none" />
      <text fill="#FFF" fontFamily="'Trebuchet MS', Arial, sans-serif" fontSize="22" fontWeight="bold" letterSpacing="3">
        <textPath href="#bottomCurve" startOffset="24%" textAnchor="middle">COMIDA CHI</textPath>
        <textPath href="#bottomCurve" startOffset="76%" textAnchor="middle">INA EXPRESS</textPath>
      </text>

      {/* --- Dragons --- */}
      <g id="dragon" fill="url(#goldGrad)" filter="url(#bevel)">
        {/* Simplified Dragon Silhouette for better scaling */}
        <path d="M 0 -20 C 20 -40, 40 -10, 20 10 C 0 30, -30 10, -10 -10 C 10 -30, 30 -10, 20 0" fill="none" stroke="url(#goldGrad)" strokeWidth="10" strokeLinecap="round" />
        <path d="M -10 -25 Q -20 -35 -5 -40 Q 10 -45 15 -30 Z" />
        <path d="M -5 -40 Q -15 -50 0 -55" fill="none" stroke="url(#goldGrad)" strokeWidth="3" />
        <path d="M 10 -42 Q 20 -50 30 -45" fill="none" stroke="url(#goldGrad)" strokeWidth="3" />
        <path d="M 10 15 L 20 10 M 10 15 L 20 20 M 10 15 L 15 25" fill="none" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round" />
        <path d="M -20 -5 L -30 -10 M -20 -5 L -30 0 M -20 -5 L -25 5" fill="none" stroke="url(#goldGrad)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="0" cy="-33" r="3" fill="#000" />
      </g>

      {/* Top Dragon */}
      <use href="#dragon" x="250" y="140" transform="scale(1.3) translate(-55, -25)" />
      
      {/* Bottom Dragon (Inside Red) */}
      <use href="#dragon" x="250" y="360" transform="scale(1.1) translate(-20, 25)" />
      
      {/* Bottom Center Dragon (On Gold Ring) */}
      <use href="#dragon" x="250" y="460" transform="scale(0.9) translate(-25, 45)" />

      {/* --- Central Banner --- */}
      <g filter="url(#dropShadow)">
        {/* Banner Base (Gold) */}
        <path d="M -10 200 L 510 200 A 20 20 0 0 1 530 220 L 530 280 A 20 20 0 0 1 510 300 L -10 300 A 20 20 0 0 1 -30 280 L -30 220 A 20 20 0 0 1 -10 200 Z" fill="url(#goldGrad)" />
        {/* Banner Inner (Black) */}
        <path d="M -5 208 L 505 208 A 12 12 0 0 1 517 220 L 517 280 A 12 12 0 0 1 505 292 L -5 292 A 12 12 0 0 1 -17 280 L -17 220 A 12 12 0 0 1 -5 208 Z" fill="url(#blackGrad)" />
        
        {/* Banner Side Accents */}
        <rect x="-20" y="215" width="12" height="70" fill="url(#goldGrad)" rx="4" filter="url(#bevel)" />
        <rect x="508" y="215" width="12" height="70" fill="url(#goldGrad)" rx="4" filter="url(#bevel)" />
        <circle cx="-14" cy="250" r="3" fill="#000" />
        <circle cx="514" cy="250" r="3" fill="#000" />
      </g>

      {/* SABOR CHINO Text */}
      <text 
        x="250" 
        y="282" 
        fill="#FDF5E6" 
        fontFamily="Impact, 'Arial Black', sans-serif" 
        fontSize="95" 
        fontWeight="900" 
        textAnchor="middle" 
        filter="url(#text3D)" 
        textLength="480" 
        lengthAdjust="spacingAndGlyphs"
      >
        SABOR CHINO
      </text>
      
      {/* Text Inner Details (to simulate 3D bevel) */}
      <text 
        x="250" 
        y="282" 
        fill="none" 
        stroke="#D4AF37" 
        strokeWidth="2" 
        fontFamily="Impact, 'Arial Black', sans-serif" 
        fontSize="95" 
        fontWeight="900" 
        textAnchor="middle" 
        textLength="480" 
        lengthAdjust="spacingAndGlyphs"
        opacity="0.8"
      >
        SABOR CHINO
      </text>

      {/* --- Lanterns --- */}
      <g id="lantern" filter="url(#dropShadow)">
        {/* Top Cap */}
        <rect x="-18" y="-40" width="36" height="10" fill="url(#goldGrad)" rx="3" filter="url(#bevel)" />
        <rect x="-6" y="-50" width="12" height="10" fill="url(#goldGrad)" filter="url(#bevel)" />
        {/* Body */}
        <ellipse cx="0" cy="0" rx="40" ry="35" fill="url(#lanternGrad)" stroke="url(#goldGrad)" strokeWidth="4" />
        {/* Vertical Lines */}
        <path d="M -18 -31 Q -35 0 -18 31" fill="none" stroke="url(#goldGrad)" strokeWidth="2.5" opacity="0.9" />
        <path d="M 18 -31 Q 35 0 18 31" fill="none" stroke="url(#goldGrad)" strokeWidth="2.5" opacity="0.9" />
        <line x1="0" y1="-35" x2="0" y2="35" stroke="url(#goldGrad)" strokeWidth="2.5" opacity="0.9" />
        {/* Bottom Cap */}
        <rect x="-18" y="30" width="36" height="10" fill="url(#goldGrad)" rx="3" filter="url(#bevel)" />
        {/* Tassel */}
        <line x1="0" y1="40" x2="0" y2="70" stroke="url(#goldGrad)" strokeWidth="2.5" />
        <line x1="-8" y1="50" x2="-8" y2="70" stroke="url(#goldGrad)" strokeWidth="1.5" />
        <line x1="8" y1="50" x2="8" y2="70" stroke="url(#goldGrad)" strokeWidth="1.5" />
      </g>

      {/* Top Center Lantern */}
      <use href="#lantern" x="250" y="60" transform="scale(1.15) translate(-32, -5)" />
      
      {/* Left Lantern */}
      <use href="#lantern" x="80" y="180" transform="scale(0.85) translate(15, 30)" />
      
      {/* Right Lantern */}
      <use href="#lantern" x="420" y="180" transform="scale(0.85) translate(-15, 30)" />

    </svg>
  );
}
