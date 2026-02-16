import React, { useState } from 'react';
import { BookingFormData } from '../types';

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '', email: '', phone: '', date: '', time: '', service: 'Haircut',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    try {
      const response = await fetch('https://formspree.io/f/mqaejovz', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', date: '', time: '', service: 'Haircut' });
      } else { setStatus('error'); }
    } catch (error) { setStatus('error'); }
  };

  return (
    <section id="booking" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        {status === 'success' ? (
          <div className="text-center py-10">
            <h3 className="text-2xl font-bold mb-2">Booking Sent!</h3>
            <button onClick={() => setStatus('idle')} className="text-gold underline">Book another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" required placeholder="Name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded" />
            <input name="phone" required placeholder="Phone" value={formData.phone} onChange={handleChange} className="w-full p-3 border rounded" />
            <input name="email" type="email" required placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded" />
            <div className="flex gap-4">
              <input name="date" type="date" required value={formData.date} onChange={handleChange} className="w-1/2 p-3 border rounded" />
              <input name="time" type="time" required value={formData.time} onChange={handleChange} className="w-1/2 p-3 border rounded" />
            </div>
            <button type="submit" disabled={status === 'loading'} className="w-full bg-black text-white p-4 font-bold rounded">
              {status === 'loading' ? 'Processing...' : 'Confirm Booking'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default BookingForm;
