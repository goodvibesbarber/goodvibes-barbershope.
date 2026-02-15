import React, { useState } from 'react';

export default function BookingForm() {
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('SUCCESS');
  };

  if (status === 'SUCCESS') {
    return (
      <div className="flex justify-center items-center py-20 bg-white">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border border-gray-100 max-w-lg w-full">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Booking Received!</h3>
          <p className="text-gray-500 mb-8">Simonyo will contact you shortly to confirm your spot.</p>
          <button 
            onClick={() => setStatus('')} 
            className="bg-black text-white px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-[#c5a059] transition-colors"
          >
            Back to Site
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-24 px-4">
      <div className="max-w-xl mx-auto bg-white p-10 rounded-[2rem] shadow-xl border border-gray-100">
        <div className="text-center mb-10">
          <span className="text-[#c5a059] text-xs font-bold tracking-widest uppercase">Appointments</span>
          <h2 className="text-4xl font-serif font-black text-black mt-2">Reserve Your Chair</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Full Name" required className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#c5a059]" />
            <input placeholder="Phone Number" required className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#c5a059]" />
          </div>
          <input type="email" placeholder="Email Address" required className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#c5a059]" />
          
          <div className="grid grid-cols-2 gap-4">
            <input type="date" required className="w-full p-4 bg-gray-50 rounded-xl outline-none" />
            <input type="time" required className="w-full p-4 bg-gray-50 rounded-xl outline-none" />
          </div>

          <select required className="w-full p-4 bg-gray-50 rounded-xl outline-none appearance-none">
            <option value="">Select Service</option>
            <option value="Classic Haircut">Classic Haircut ($35)</option>
            <option value="Signature Fade">Signature Fade ($45)</option>
            <option value="Beard Trim">Beard Trim ($20)</option>
          </select>
          
          <button 
            type="submit" 
            className="w-full bg-black text-white p-5 rounded-xl font-bold uppercase hover:bg-[#c5a059] transition-all mt-4 shadow-lg active:scale-95"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </section>
  );
}
