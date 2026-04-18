import React from 'react';

const AARJLogo = () => (
  <svg viewBox="0 0 200 50" className="h-12 w-auto" aria-label="AARJ - Articulação Agroecológica do Rio de Janeiro">
    <g>
      <circle cx="18" cy="12" r="6" fill="#C9A227" />
      <line x1="18" y1="2" x2="18" y2="4" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="28" y1="12" x2="26" y2="12" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="12" x2="10" y2="12" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="24" y1="6" x2="22" y2="8" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="18" x2="14" y2="16" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="24" y1="18" x2="22" y2="16" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="6" x2="14" y2="8" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 35 L15 22 L25 35 Z" fill="#4A90A4" opacity="0.6" />
      <path d="M15 35 L28 18 L40 35 Z" fill="#4A90A4" opacity="0.8" />
      <path d="M30 35 L38 26 L46 35 Z" fill="#4A90A4" opacity="0.5" />
      <rect x="52" y="30" width="3" height="8" fill="#8B9556" />
      <circle cx="53.5" cy="26" r="6" fill="#8B9556" />
      <circle cx="50" cy="30" r="4" fill="#8B9556" />
      <circle cx="57" cy="30" r="4" fill="#8B9556" />
      <ellipse cx="72" cy="34" rx="4" ry="2.5" fill="#4A90A4" />
      <circle cx="75" cy="32" r="2" fill="#4A90A4" />
      <line x1="70" y1="34" x2="68" y2="37" stroke="#4A90A4" strokeWidth="1" strokeLinecap="round" />
      <line x1="74" y1="34" x2="73" y2="37" stroke="#4A90A4" strokeWidth="1" strokeLinecap="round" />
      <circle cx="85" cy="28" r="2.5" fill="#4A90A4" />
      <line x1="85" y1="30.5" x2="85" y2="37" stroke="#4A90A4" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="85" y1="33" x2="82" y2="36" stroke="#4A90A4" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="85" y1="33" x2="88" y2="36" stroke="#4A90A4" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="93" cy="30" r="2.5" fill="#4A90A4" />
      <line x1="93" y1="32.5" x2="93" y2="39" stroke="#4A90A4" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="93" y1="35" x2="90" y2="38" stroke="#4A90A4" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="93" y1="35" x2="96" y2="38" stroke="#4A90A4" strokeWidth="1.5" strokeLinecap="round" />
    </g>
    <text x="108" y="20" fontFamily="'Nunito', sans-serif" fontWeight="800" fontSize="14" fill="#4A90A4">AARJ</text>
    <text x="108" y="32" fontFamily="'Inter', sans-serif" fontWeight="500" fontSize="6" fill="#2C2C2C">ARTICULAÇÃO DE</text>
    <text x="108" y="40" fontFamily="'Inter', sans-serif" fontWeight="500" fontSize="6" fill="#2C2C2C">AGROECOLOGIA DO</text>
    <text x="108" y="48" fontFamily="'Inter', sans-serif" fontWeight="500" fontSize="6" fill="#2C2C2C">RIO DE JANEIRO</text>
  </svg>
);

export default function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3">
          <AARJLogo />
          <h1 className="font-heading text-xl sm:text-2xl font-bold text-aarj-text text-center">Calculadora de Translados</h1>
          <p className="text-sm text-aarj-text-light text-center">Custos de deslocamento para encontros e reuniões</p>
        </div>
      </div>
    </header>
  );
}
