import React, { useState } from 'react';
import { BookingFormData } from '../types';
import { MessageCircle, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: 'Haircut',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // NOTE: Since this is a static site (GitHub Pages), we cannot use server-side API routes like /api/send-email.
    // Instead, we simulate the network request and provide a WhatsApp link for the actual booking.
    
    // Simulate network delay for better UX
    setTimeout(() => {
      setStatus('success');
      // We do NOT clear formData here so we can use it to generate the WhatsApp message
    }, 1500);
  };

  const handleReset = () => {
    setStatus('idle');
    setFormData({ name: '', email: '', phone: '', date: '', time: '', service: 'Haircut' });
  };

  const getWhatsAppLink = () => {
    const text = `Hi Simonyo! 👋%0A%0AI'd like to secure a booking:%0A%0A💈 Service: ${formData.service}%0A📅 Date: ${formData.date}%0A⏰ Time: ${formData.time}%0A👤 Name: ${formData.name}%0A%0APlease confirm. Thanks!`;
    return `https://wa.me/6587273741?text=${text}`;
  };

  return (
    <section id="booking" className="py-24 bg-vibes-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row" data-aos="fade-up">
          
          <div className="md:w-1/3 bg-vibes-black p-10 flex flex-col justify-between text-vibes-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 
                data-aos="fade-right" 
                data-aos-delay="200"
                className="text-3xl font-serif font-bold text-vibes-gold mb-4"
              >
                Book Now
              </h3>
              <p 
                data-aos="fade-right" 
                data-aos-delay="300"
                className="text-gray-400 mb-8"
              >
                Secure your spot with Simonyo. Walk-ins welcome, appointments preferred.
              </p>
              
              <div 
                data-aos="fade-up" 
                data-aos-delay="400"
                className="space-y-4"
              >
                <p className="text-sm font-semibold uppercase tracking-wider text-vibes-gold">Contact</p>
                <p>+65 8727 3741</p>
                <p>@GoodVibesBarberShop</p>
              </div>
            </div>
            {/* Background pattern */}
            <div className="absolute -bottom-10 -right-10 text-vibes-white opacity-5 transform rotate-12">
               <svg width="200" height="200" fill="currentColor" viewBox="0 0 24 24"><path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-3.485a2.2 2.2 0 01-1.229-1.879 2.172 2.172 0 011.23-1.878V5a2 2 0 00-2-2H7"/></svg>
            </div>
          </div>

          <div className="md:w-2/3 p-10">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-vibes-black mb-2">Details Received!</h3>
                <p className="text-gray-600 mb-8 max-w-sm">
                  To finalize your appointment immediately, please send the details directly to Simonyo via WhatsApp.
                </p>
                
                <a 
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-white font-bold py-4 px-8 rounded-lg hover:bg-[#20bd5a] transition-all duration-300 flex items-center shadow-lg hover:shadow-xl hover:-translate-y-1 mb-4"
                >
                  <MessageCircle className="mr-2" size={24} />
                  Send via WhatsApp
                </a>

                <button 
                  onClick={handleReset}
                  className="mt-4 text-vibes-gold hover:text-vibes-black font-medium text-sm underline transition-colors"
                >
                  Book another appointment
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-vibes-gold focus:border-transparent outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input 
                      type="tel" 
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-vibes-gold focus:border-transparent outline-none transition-all"
                      placeholder="+65 1234 5678"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-vibes-gold focus:border-transparent outline-none transition-all"
                    placeholder="you@example.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input 
                      type="date" 
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-vibes-gold focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input 
                      type="time" 
                      name="time"
                      required
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-vibes-gold focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-vibes-gold focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="Haircut">Haircut ($35)</option>
                    <option value="Student Haircut">Student Haircut ($25)</option>
                    <option value="Beard Trim">Beard Trim ($25)</option>
                    <option value="Clean Shave">Clean Shave ($30)</option>
                    <option value="Vibes Experience">Vibes Experience ($55)</option>
                    <option value="Good Vibes Experience">The Works ($70)</option>
                  </select>
                </div>

                {status === 'error' && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center text-sm">
                    <AlertCircle size={20} className="mr-2" />
                    Something went wrong. Please try again or call us.
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-vibes-black text-vibes-white font-bold py-4 rounded-lg hover:bg-vibes-gold hover:text-vibes-black transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={20} className="animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;