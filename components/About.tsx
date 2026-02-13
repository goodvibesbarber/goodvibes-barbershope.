import React from 'react';
import { MapPin, Award } from 'lucide-react';
import LocalImage from './LocalImage';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -skew-x-12 opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
            
            {/* IMAGE 1: Blue Cape Fade */}
            <LocalImage 
              src="blue-cape.jpg" 
              alt="Side profile skin fade with blue cape" 
              className="rounded-lg shadow-lg w-full h-96 object-cover mt-12 bg-gray-100"
              aos="fade-right"
              aosDelay="100"
            />
            
            {/* IMAGE 2: Red Jersey Texture */}
            <LocalImage 
              src="red-jersey.jpg" 
              alt="Back view textured haircut with red jersey" 
              className="rounded-lg shadow-lg w-full h-96 object-cover bg-gray-100"
              aos="fade-right"
              aosDelay="300"
            />
            
          </div>

          <div className="order-1 lg:order-2">
            <h4 
              data-aos="fade-up" 
              className="text-vibes-gold font-bold tracking-widest uppercase mb-2"
            >
              The Story
            </h4>
            <h2 
              data-aos="fade-up" 
              data-aos-delay="100"
              className="text-4xl md:text-5xl font-serif font-bold text-vibes-black mb-6"
            >
              A Cut Above <br /> The Rest.
            </h2>
            <p 
              data-aos="fade-up" 
              data-aos-delay="200"
              className="text-gray-600 text-lg leading-relaxed mb-8"
            >
              Located at <span className="text-vibes-black font-semibold">Yung An Road</span>, Good Vibes Barber Shop is the go-to spot for premium grooming in Singapore. 
              Simonyo specializes in precision fades and creating a relaxing atmosphere where you can unwind.
            </p>

            <div className="space-y-6">
              <div 
                data-aos="fade-up" 
                data-aos-delay="300"
                className="flex items-start space-x-4"
              >
                <div className="bg-vibes-gold/20 p-3 rounded-full text-vibes-gold shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-vibes-black text-lg">Prime Location</h3>
                  <p className="text-gray-500">BLK 360 Yung An Road #04-101, Singapore 610360</p>
                </div>
              </div>

              <div 
                data-aos="fade-up" 
                data-aos-delay="400"
                className="flex items-start space-x-4"
              >
                <div className="bg-vibes-gold/20 p-3 rounded-full text-vibes-gold shrink-0">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-vibes-black text-lg">Premium Quality</h3>
                  <p className="text-gray-500">Expert techniques, hot towels, and top-tier products.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;