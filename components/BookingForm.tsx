import React, { useState } from 'react';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Standard Haircut',
    date: '',
    time: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Logic for handling the booking
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', service: 'Standard Haircut', date: '', time: '' });
    }, 1500);
  };

  return (
    <section className="py-24 bg-vibes-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100" data-aos="zoom-in">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-serif font-bold mb-4">Book Your Session</h2>
            <p className="text-gray-500">Secure your spot with Simonyo. We'll confirm via email.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-2 uppercase tracking-wide">Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-vibes-gold focus:ring-1 focus:ring-vibes-gold outline-none transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2 uppercase tracking-wide">Email</label>
                <input 
                  required
                  type="email" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-vibes-gold focus:ring-1 focus:ring-vibes-gold outline-none transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-wide">Service</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-vibes-gold outline-none"
                value={formData.service}
                onChange={(e) => setFormData({...formData, service: e.target.value})}
              >
                <option>Standard Haircut</option>
                <option>Student Haircut</option>
                <option>Beard Trim</option>
                <option>The Vibes Experience</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={status === 'sending'}
              className="w-full bg-vibes-black text-white py-4 rounded-xl font-bold hover:bg-vibes-gold hover:text-black transition-all shadow-lg disabled:opacity-50"
            >
              {status === 'sending' ? 'Processing...' : status === 'success' ? 'Booking Confirmed!' : 'Request Appointment'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
