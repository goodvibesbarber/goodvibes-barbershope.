import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-vibes-black text-white py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-8">
          <h2 className="text-2xl font-serif font-bold tracking-widest mb-2">GOOD VIBES</h2>
          <p className="text-vibes-gold text-xs uppercase tracking-[0.3em]">Precision • Style • Relaxation</p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 mb-8 text-gray-400 text-sm uppercase tracking-widest">
          <p>BLK 360 Yung An Road, Singapore</p>
          <span className="hidden md:inline">•</span>
          <p>Tues-Sun: 10am - 8pm</p>
        </div>

        <div className="pt-8 border-t border-white/5 text-gray-500 text-[10px] uppercase tracking-widest">
          © {currentYear} Good Vibes Barber Shop. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
