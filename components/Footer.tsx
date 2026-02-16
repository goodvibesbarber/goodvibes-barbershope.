import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-vibes-black text-white py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="mb-8">
          <h2 className="text-2xl font-serif font-bold tracking-widest mb-2">GOOD VIBES</h2>
          <p className="text-vibes-gold text-sm uppercase tracking-[0.3em]">Barber Shop</p>
        </div>
        
        <div className="flex justify-center space-x-6 mb-8 text-gray-400">
          <p>BLK 360 Yung An Road, Singapore</p>
          <span>•</span>
          <p>Tues-Sun: 10am - 8pm</p>
        </div>

        <div className="pt-8 border-t border-white/5 text-gray-500 text-xs">
          © {new Date().getFullYear()} Good Vibes Barber Shop. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
