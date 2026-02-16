import React from 'react';
import { ChevronDown } from 'lucide-react';
import LocalImage from './LocalImage';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-vibes-white">
      <div className="absolute inset-0 z-0 opacity-5">
        <LocalImage 
            src="hero-bg.jpg" 
            alt="Background Texture"
            className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="w-full md:w-1/2 text-center md:text-left">
            <div 
              data-aos="fade-down" 
              data-aos-delay="100"
              className="inline-block px-4 py-1 mb-6 border border-vibes-gold text-vibes-gold text-xs tracking-[0.2em] uppercase font-bold rounded-full"
            >
              Est. Singapore
            </div>
            <h1 
              data-aos="fade-up" 
              data-aos-delay="200"
              className="text-5xl md:text-7xl font-serif font-bold text-vibes-black leading-tight mb-6"
            >
              Zero Stress.<br />
              <span className="text-vibes-gold italic">Perfect Fades.</span>
            </h1>
            <p 
              data-aos="fade-up" 
              data-aos-delay="300"
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0 font-light"
            >
              More than a haircut, it’s a vibe. Experience premium grooming tailored to your lifestyle.
            </p>
            <div 
              data-aos="fade-up" 
              data-aos-delay="400"
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <a 
                href="#booking" 
                className="bg-vibes-black text-vibes-white px-8 py-4 rounded-full font-medium hover:bg-vibes-gold hover:text-vibes-black transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 text-center"
              >
                Book Your Vibe
              </a>
              <a 
                href="#services" 
                className="px-8 py-4 rounded-full font-medium border border-vibes-black text-vibes-black hover:bg-vibes-black hover:text-vibes-gold transition-all duration-300 text-center hover:shadow-lg hover:-translate-y-1"
              >
                View Menu
              </a>
            </div>
          </div>

          <div className="w-full md:w-1/2 relative" data-aos="fade-left" data-aos-duration="1200" data-aos-delay="200">
            <div className="relative aspect-[3/4] max-w-md mx-auto">
              <div className="absolute inset-0 bg-vibes-gold transform translate-x-4 translate-y-4 rounded-2xl"></div>
              
              {/* Main Profile Image with Tap-to-Select functionality */}
              <LocalImage 
                src="hero-profile.jpg" 
                alt="Simonyo Barber" 
                className="relative w-full h-full object-cover rounded-2xl shadow-2xl"
              />

              <div 
                data-aos="fade-up"
                data-aos-delay="600"
                className="absolute -bottom-6 -left-6 bg-vibes-white p-6 rounded-xl shadow-xl max-w-[200px] z-20"
              >
                <p className="font-serif font-bold text-vibes-black text-lg">Simonyo</p>
                <p className="text-sm text-gray-500">Lead Barber & Owner</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-vibes-black opacity-50">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};

export default Hero;