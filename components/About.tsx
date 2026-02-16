import React from 'react';
import LocalImage from './LocalImage';

const About = () => {
  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-4">
            <LocalImage src="blue-cape.jpg" alt="Skin Fade" className="rounded-lg h-96 mt-12" aos="fade-right" />
            <LocalImage src="red-jersey.jpg" alt="Texture" className="rounded-lg h-96" aos="fade-right" aosDelay="200" />
          </div>
          <div>
            <h4 data-aos="fade-up" className="text-vibes-gold font-bold uppercase tracking-widest mb-2">The Story</h4>
            <h2 data-aos="fade-up" className="text-4xl font-serif font-bold mb-6">A Cut Above <br /> The Rest.</h2>
            <p className="text-gray-600 text-lg mb-8">Located at Yung An Road, Good Vibes Barber Shop is the spot for premium grooming. Simonyo specializes in precision fades.</p>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-vibes-gold/20 p-3 rounded-full text-vibes-gold">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div><h3 className="font-bold">Prime Location</h3><p className="text-gray-500">BLK 360 Yung An Road, Singapore</p></div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-vibes-gold/20 p-3 rounded-full text-vibes-gold">
                   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/></svg>
                </div>
                <div><h3 className="font-bold">Premium Quality</h3><p className="text-gray-500">Expert techniques and hot towels.</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
