import React from 'react';
import LocalImage from './LocalImage';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-vibes-white">
      <div className="absolute inset-0 z-0 opacity-5">
        <LocalImage src="hero-bg.jpg" alt="Background" className="w-full h-full" />
      </div>
      <div className="container mx-auto px-4 z-10 relative text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2">
            <div data-aos="fade-down" className="inline-block px-4 py-1 mb-6 border border-vibes-gold text-vibes-gold text-xs tracking-[0.2em] uppercase font-bold rounded-full">
              Est. Singapore
            </div>
            <h1 data-aos="fade-up" className="text-5xl md:text-7xl font-serif font-bold text-vibes-black leading-tight mb-6">
              Zero Stress.<br /><span className="text-vibes-gold italic">Perfect Fades.</span>
            </h1>
            <p data-aos="fade-up" data-aos-delay="200" className="text-lg text-gray-600 mb-8 max-w-lg">
              More than a haircut, it’s a vibe. Experience premium grooming tailored to your lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#booking" className="bg-vibes-black text-white px-8 py-4 rounded-full font-bold hover:bg-vibes-gold hover:text-black transition-all">Book Your Vibe</a>
              <a href="#services" className="px-8 py-4 rounded-full font-bold border border-black text-black hover:bg-black hover:text-vibes-gold transition-all">View Menu</a>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative" data-aos="fade-left">
            <div className="relative aspect-[3/4] max-w-md mx-auto">
              <div className="absolute inset-0 bg-vibes-gold transform translate-x-4 translate-y-4 rounded-2xl"></div>
              <LocalImage src="hero-profile.jpg" alt="Simonyo" className="relative w-full h-full rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
      </div>
    </section>
  );
};

export default Hero;
