import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-vibes-black text-white pt-16 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <div className="text-center md:text-left" data-aos="fade-up" data-aos-delay="0">
            {/* Branding - Matched to Navbar */}
            <div className="flex flex-col items-center md:items-start mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="bg-vibes-gold text-vibes-black p-2.5 rounded-full shadow-[0_0_15px_rgba(197,160,89,0.3)]">
                        {/* Custom "Good Vibes" Logo: Scissors with Sunburst Rays */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                            <path d="M12 2v2" />
                            <path d="M12 20v2" />
                            <path d="M4.93 4.93l1.41 1.41" />
                            <path d="M17.66 17.66l1.41 1.41" />
                            <path d="M2 12h2" />
                            <path d="M20 12h2" />
                            <path d="M6.34 17.66l-1.41 1.41" />
                            <path d="M19.07 4.93l-1.41 1.41" />
                            <circle cx="12" cy="12" r="2" fill="currentColor" className="opacity-20" />
                            <path d="M12 12l-3 5" />
                            <path d="M12 12l3 5" />
                            <path d="M12 12l-2.5-4" />
                            <path d="M12 12l2.5-4" />
                            <circle cx="9" cy="17" r="1.5" />
                            <circle cx="15" cy="17" r="1.5" />
                        </svg>
                    </div>
                    <div className="flex flex-col items-start -space-y-0.5">
                        <span className="text-xl font-serif font-black text-vibes-gold leading-none">GOOD VIBES</span>
                        <span className="text-[0.6rem] tracking-[0.35em] text-gray-400 uppercase font-bold mt-1">Barber Shop</span>
                    </div>
                </div>
            </div>

            <p className="text-gray-400 mb-6">
              More than a haircut, it's a lifestyle. <br />
              Come for the fade, stay for the vibe.
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="https://instagram.com/GoodVibesBarberShop" target="_blank" rel="noopener noreferrer" className="bg-white/10 p-2 rounded-full hover:bg-vibes-gold hover:text-vibes-black transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                {/* Inline Instagram Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          <div className="text-center md:text-left" data-aos="fade-up" data-aos-delay="100">
            <h4 className="font-bold text-lg mb-6 text-white">Find Us</h4>
            <div className="space-y-6 text-gray-400">
              
              {/* Address - Interactive Google Maps Link */}
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=Blk+360+Yung+An+Rd,+#04-101+Singapore+610360"
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start justify-center md:justify-start space-x-4 group transition-all duration-300"
              >
                <div className="mt-1 p-2 rounded-full bg-white/5 text-vibes-gold group-hover:bg-vibes-gold group-hover:text-vibes-black transition-colors duration-300 shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="text-left group-hover:text-white transition-colors">
                    <p className="font-bold text-vibes-gold text-sm uppercase tracking-wider mb-1">Visit Shop</p>
                    <p className="leading-relaxed text-sm">BLK 360 YUNG AN ROAD #04-101,<br />SINGAPORE 610360</p>
                </div>
              </a>

              {/* Phone & WhatsApp Section */}
              <div className="flex flex-col space-y-3">
                  
                  {/* Call Link */}
                  <a 
                    href="tel:+6587273741"
                    className="flex items-center justify-center md:justify-start space-x-4 group transition-all duration-300"
                  >
                    <div className="p-2 rounded-full bg-white/5 text-vibes-gold group-hover:bg-vibes-gold group-hover:text-vibes-black transition-colors duration-300 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <span className="text-sm font-medium group-hover:text-white transition-colors">+65 8727 3741</span>
                  </a>

                  {/* WhatsApp Link */}
                  <a 
                    href="https://wa.me/6587273741"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center md:justify-start space-x-4 group transition-all duration-300"
                  >
                    <div className="p-2 rounded-full bg-white/5 text-vibes-gold group-hover:bg-[#25D366] group-hover:text-white transition-colors duration-300 shrink-0">
                      {/* WhatsApp Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                      </svg>
                    </div>
                    <span className="text-sm font-medium group-hover:text-white transition-colors">Chat on WhatsApp</span>
                  </a>

              </div>
            </div>
          </div>

          <div className="text-center md:text-left" data-aos="fade-up" data-aos-delay="200">
            <h4 className="font-bold text-lg mb-6 text-white">Opening Hours</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex justify-between md:justify-start gap-4">
                <span className="w-24">Mon - Sat:</span>
                <span className="text-white">11:00 AM - 9:00 PM</span>
              </li>
              <li className="flex justify-between md:justify-start gap-4">
                <span className="w-24">Sunday:</span>
                <span className="text-red-400 font-bold">Closed</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Good Vibes Barber Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;