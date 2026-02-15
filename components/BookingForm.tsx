import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);

  // Get today's date in YYYY-MM-DD format to block the past
  const today = new Date().toISOString().split('T')[0];

  const timeSlots = [
    "10:00", "11:00", "12:00", "13:00", 
    "14:00", "15:00", "16:00", "17:00"
  ];

  useEffect(() => {
    async function checkAvailability() {
      if (!selectedDate) return;
      
      const { data } = await supabase
        .from('bookings')
        .select('booking_time')
        .eq('booking_date', selectedDate);

      if (data) {
        setBookedTimes(data.map(b => b.booking_time));
      }
    }
    checkAvailability();
  }, [selectedDate]);

  const handleBooking = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const { data: existing } = await supabase
        .from('bookings')
        .select('*')
        .eq('booking_date', data.date)
        .eq('booking_time', data.time);

      if (existing && existing.length > 0) {
        setStatus("❌ Sorry, this time was just taken! Please pick another.");
        setLoading(false);
        return;
      }

      const { error: insertError } = await supabase.from('bookings').insert([{
        name: data.name,
        email: data.email,
        phone: data.phone,
        booking_date: data.date,
        booking_time: data.time,
        service: data.service
      }]);

      if (insertError) throw insertError;
      setStatus("SUCCESS");
    } catch (err) {
      console.error(err);
      setStatus("⚠️ Something went wrong. Please check your connection.");
    }
    setLoading(false);
  };

  if (status === "SUCCESS") {
    return (
      <div className="flex justify-center items-center py-20 px-4 bg-white" data-aos="zoom-in">
        <div className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row max-w-2xl w-full overflow-hidden border border-gray-100">
          <div className="bg-[#1a1a1a] text-white p-10 md:w-1/3 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#c5a059] mb-1">Book Now</h2>
              <p className="text-gray-400 text-[11px] leading-relaxed">Secure your spot with Simonyo. Walk-ins welcome, appointments preferred.</p>
            </div>
            <div className="mt-8">
              <p className="text-[#c5a059] uppercase text-[10px] font-bold tracking-widest mb-4">Contact</p>
              <p className="text-sm font-medium mb-1">+65 8727 3741</p>
              <p className="text-sm text-gray-400">@GoodVibesBarberShop</p>
            </div>
          </div>
          <div className="p-12 md:w-2/3 flex flex-col items-center justify-center text-center bg-white">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Booking Request Sent!</h3>
            <p className="text-gray-500 mb-8 text-sm px-4">Thanks for choosing Good Vibes. Simonyo will confirm your appointment shortly via email.</p>
            <button onClick={() => {setStatus(''); setSelectedDate('');}} className="text-[#c5a059] hover:underline font-bold uppercase tracking-widest text-xs">
              Book another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-24 px-4">
      <div className="max-w-xl mx-auto bg-white p-10 rounded-[2rem] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.12)] border border-gray-100" data-aos="fade-up">
        <div className="text-center mb-10">
          <span className="text-[#c5a059] text-xs font-bold tracking-[0.4em] uppercase">Appointments</span>
          <h2 className="text-4xl font-serif font-black text-black mt-2 leading-tight">Reserve Your Chair</h2>
        </div>
        
        <form onSubmit={handleBooking} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" type="text" placeholder="Full Name" required className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#c5a059] outline-none transition-all placeholder:text-gray-400" />
            <input name="phone" type="tel" placeholder="Phone Number" required className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#c5a059] outline-none transition-all placeholder:text-gray-400" />
          </div>
          <input name="email" type="email" placeholder="Email Address" required className="w-full p-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-[#c5a059] outline-none transition-all placeholder:text-gray-400" />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Date</label>
              <input 
                name="date" 
                type="date" 
                min={today} // THIS BLOCKS THE PAST
                required 
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-4 bg-gray-50 border-none rounded-xl outline-none" 
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Time</label>
              <select name="time" required className="w-full p-4 bg-gray-50 border-none rounded-xl outline-none">
                <option value="" disabled selected>Pick a time</option>
                {timeSlots.map((time) => {
                  const isBooked = bookedTimes.includes(time);
                  return (
                    <option key={time} value={time} disabled={isBooked} className={isBooked ? "text-gray-300" : "text-black"}>
                      {time} {isBooked ? "(Full)" : ""}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Service</label>
            <select name="service" required className="w-full p-4 bg-gray-50 border-none rounded-xl outline-none">
                <option value="Classic Haircut">Classic Haircut</option>
                <option value="Signature Fade">Signature Fade</option>
                <option value="Beard Trim">Beard Trim</option>
                <option value="Full Combo">Haircut + Beard</option>
            </select>
          </div>
          
          <button type="submit" disabled={loading} className="w-full bg-black text-white p-5 rounded-xl font-bold uppercase tracking-[0.2em] hover:bg-[#c5a059] transition-all duration-500 shadow-xl mt-4">
            {loading ? "Checking Schedule..." : "Confirm Booking"}
          </button>
          
          {status && status !== "SUCCESS" && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-center font-bold text-sm animate-pulse border border-red-100">
              {status}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
