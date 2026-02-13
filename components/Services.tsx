import React from 'react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  { 
    name: 'Standard Haircut', 
    price: 35, 
    description: 'A complete grooming session starting with a personalized consultation, followed by a precision cut, refreshing wash, and professional styling to finish.' 
  },
  { 
    name: 'Student Haircut', 
    price: 25, 
    description: 'Stay sharp for school with our discounted cut for students. Includes the same attention to detail and styling as our standard service. (Valid ID required).' 
  },
  { 
    name: 'Beard Trim', 
    price: 25, 
    description: 'Keep your facial hair in check. Includes sculpting, line-up, and a nourishing beard oil treatment to keep your beard soft and healthy.' 
  },
  { 
    name: 'Clean Shave', 
    price: 30, 
    description: "The classic gentleman's ritual. Experience a close, comfortable shave with hot towels, pre-shave oil, and a straight razor finish." 
  },
  { 
    name: 'Vibes Experience', 
    price: 55, 
    description: 'The perfect combo. Enjoy a precision haircut paired with a beard trim or clean shave for a completely refreshed look.' 
  },
  { 
    name: 'Good Vibes Experience', 
    price: 70, 
    description: 'The ultimate indulgence. Includes a precision haircut, beard grooming or shave, plus a rejuvenating facial and deep cleansing wash. Walk out feeling brand new.' 
  },
  { 
    name: 'Ear/Nose Wax', 
    price: 8, 
    description: 'The finishing touch for a polished look. Quick and effective hair removal for a clean, sharp appearance.' 
  },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-vibes-black text-vibes-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 
            data-aos="fade-down"
            data-aos-delay="100"
            className="text-4xl md:text-5xl font-serif font-bold text-vibes-gold mb-4"
          >
            Service Menu
          </h2>
          <div 
            data-aos="zoom-in" 
            data-aos-delay="200"
            className="h-1 w-20 bg-vibes-gold mx-auto rounded-full"
          ></div>
          <p 
            data-aos="fade-up" 
            data-aos-delay="300"
            className="mt-4 text-gray-400"
          >
            Precision. Style. Relaxation.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`bg-white/5 p-8 rounded-xl border border-white/10 hover:border-vibes-gold/50 transition-all duration-300 group ${index === services.length - 1 ? 'md:col-span-2 md:w-2/3 md:mx-auto' : ''}`}
              data-aos="fade-up"
              data-aos-delay={100 + (index * 50)} // Slightly tighter staggered delay
            >
              <div className="flex justify-between items-baseline mb-4">
                <h3 className="text-xl font-bold group-hover:text-vibes-gold transition-colors">{service.name}</h3>
                <span className="text-2xl font-serif text-vibes-gold">${service.price}</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p data-aos="fade-in" data-aos-delay="600" className="text-gray-400 mb-6">Not sure what you need? Just ask Simonyo.</p>
          <div data-aos="zoom-in" data-aos-delay="700">
            <a 
              href="#booking" 
              className="inline-block bg-vibes-gold text-vibes-black px-10 py-4 rounded-full font-bold hover:bg-vibes-black hover:text-vibes-gold transition-all duration-300 shadow-[0_4px_14px_0_rgba(197,160,89,0.39)] hover:shadow-[0_6px_20px_rgba(250,250,250,0.15)] hover:-translate-y-1"
            >
              Book Appointment
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;