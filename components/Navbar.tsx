import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Book Now', href: '#booking', isButton: true },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || isOpen ? 'bg-vibes-white/95 shadow-md backdrop-blur-sm py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <a href="#" className="flex items-center gap-3.5 group">
            <div className="relative flex items-center justify-center w-12 h-12 bg-vibes-black text-vibes-gold rounded-full border-2 border-vibes-black group-hover:bg-vibes-gold group-hover:text-vibes-black group-hover:border-vibes-gold transition-all duration-500 shadow-lg overflow-hidden">
               {/* Custom "Good Vibes" Logo: Scissors with Sunburst Rays */}
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 transform group-hover:rotate-12 transition-transform duration-500">
                 {/* Sun Rays representing 'Vibes' */}
                 <path d="M12 2v2" />
                 <path d="M12 20v2" />
                 <path d="M4.93 4.93l1.41 1.41" />
                 <path d="M17.66 17.66l1.41 1.41" />
                 <path d="M2 12h2" />
                 <path d="M20 12h2" />
                 <path d="M6.34 17.66l-1.41 1.41" />
                 <path d="M19.07 4.93l-1.41 1.41" />
                 {/* Central Scissors */}
                 <circle cx="12" cy="12" r="2" fill="currentColor" className="opacity-20" />
                 <path d="M12 12l-3 5" />
                 <path d="M12 12l3 5" />
                 <path d="M12 12l-2.5-4" />
                 <path d="M12 12l2.5-4" />
                 <circle cx="9" cy="17" r="1.5" />
                 <circle cx="15" cy="17" r="1.5" />
               </svg>
            </div>
            <div className="flex flex-col items-start -space-y-1">
              <span className="text-xl font-serif font-black tracking-tight text-vibes-black leading-none group-hover:text-vibes-gold transition-colors duration-300">
                GOOD VIBES
              </span>
              <span className="text-[0.6rem] font-sans font-bold tracking-[0.35em] text-vibes-gold uppercase leading-tight ml-0.5 group-hover:text-vibes-black transition-colors duration-300">
                Barber Shop
              </span>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-bold tracking-wide transition-all duration-300 ${
                  link.isButton
                    ? 'bg-vibes-black text-vibes-white px-7 py-2.5 rounded-full hover:bg-vibes-gold hover:text-vibes-black shadow-md hover:shadow-xl hover:-translate-y-0.5'
                    : 'text-vibes-black hover:text-vibes-gold uppercase text-xs'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button - Using Inline SVGs to prevent crash */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-vibes-black hover:text-vibes-gold transition-colors p-2 focus:outline-none"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                // Close Icon (X)
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                // Menu Icon (Hamburger)
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-vibes-white shadow-xl border-t border-gray-100 h-screen">
          <div className="px-4 py-8 space-y-6 flex flex-col items-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-xl font-medium transition-all duration-300 ${
                  link.isButton
                    ? 'bg-vibes-black text-vibes-white px-10 py-4 rounded-full w-full text-center mt-4 hover:bg-vibes-gold hover:text-vibes-black shadow-lg'
                    : 'text-vibes-black hover:text-vibes-gold font-serif italic'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;