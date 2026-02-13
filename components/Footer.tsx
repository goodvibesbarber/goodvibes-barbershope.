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
                    <div className="bg-vibes-gold text-vibes-black p-2.5 rounded-full">
                        {/* Custom Logo SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z" />
                          <path fillRule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 010 1.5H3a.75.75 0 010-1.5h.75v-9.918a.75.75 0 01.634-.74A49.109 49.109 0 0112 9c2.59 0 5.134.202 7.616.592a.75.75 0 01.634.74zm-7.5 2.418a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm3-.75a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0v-6.75a.75.75 0 01.75-.75zM9 12.75a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75z" clipRule="evenodd" />
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
            <div className="space-y-4 text-gray-400">
              <div className="flex items-start justify-center md:justify-start space-x-3">
                {/* Inline MapPin Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-vibes-gold mt-1 shrink-0">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <p>BLK 360 YUNG AN ROAD #04-101,<br />SINGAPORE 610360</p>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                {/* Inline Phone Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-vibes-gold shrink-0">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <p>+65 8727 3741</p>
              </div>
            </div>
          </div>

          <div className="text-center md:text-left" data-aos="fade-up" data-aos-delay="200">
            <h4 className="font-bold text-lg mb-6 text-white">Opening Hours</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex justify-between md:justify-start gap-4">
                <span className="w-24">Mon - Fri:</span>
                <span className="text-white">11:00 AM - 9:00 PM</span>
              </li>
              <li className="flex justify-between md:justify-start gap-4">
                <span className="w-24">Sat - Sun:</span>
                <span className="text-white">10:00 AM - 7:00 PM</span>
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