import React, { useState } from 'react';

const BookingForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // FORM HANDLING LOGIC
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      // REPLACE THE URL BELOW with your unique Formspree ID later
      const response = await fetch('https://formspree.io/f/mqaejovz', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="booking" className="py-24 bg-vibes-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row" data-aos="fade-up">
          
          <div className="md:w-1/3 bg-vibes-black p-10 flex flex-col justify-between text-vibes-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-3xl font-serif font-bold text-vibes-gold mb-4">Book Now</h3>
              <p className="text-gray-400 mb-8">Secure your spot with Simonyo. Walk-ins welcome, appointments preferred.</p>
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-wider text-vibes-gold">Contact</p>
                <p>+65 8727 3741</p>
                <p>@GoodVibesBarberShop</p>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 text-vibes-white opacity-5 transform rotate-12">
               <svg width="200" height="200" fill="currentColor" viewBox="0 0 24 24"><path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-3.485a2.2 2.2 0 01-1.229-1.879 2.172 2.172 0 011.23-1.878V5a2 2 0 00-2-2H7"/></svg>
            </div>
          </div>

          <div className="md:w-2/3 p-10">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <h3 className="text-2xl font-bold text-vibes-black mb-2">Booking Request Sent!</h3>
                <p className="text-gray-600">Simonyo will confirm your appointment shortly via email.</p>
                <button onClick={() => setStatus('idle')} className="mt-8 text-vibes-gold font-medium underline">Book another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" name="name" required className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-vibes-gold" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input type="tel" name="phone" required className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-vibes-gold" placeholder="+65 1234 5678" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" name="email" required className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-vibes-gold" placeholder="you@example.com" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input type="date" name="date" required className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-vibes-gold" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input type="time" name="time" required className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-vibes-gold" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                  <select name="service" className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-vibes-gold bg-white">
                    <option value="Haircut">Haircut ($35)</option>
                    <option value="Student Haircut">Student Haircut ($25)</option>
                    <option value="Beard Trim">Beard Trim ($25)</option>
                    <option value="Clean Shave">Clean Shave ($30)</option>
                    <option value="Vibes Experience">Vibes Experience ($55)</option>
                    <option value="The Works">The Works ($70)</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-vibes-black text-vibes-white font-bold py-4 rounded-lg hover:bg-vibes-gold hover:text-vibes-black transition-all flex items-center justify-center disabled:opacity-70"
                >
                  {status === 'loading' ? 'Processing...' : 'Confirm Booking'}
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
