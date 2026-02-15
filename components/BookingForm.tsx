import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// REPLACE THESE WITH YOUR ACTUAL KEYS FROM SUPABASE SETTINGS
const supabaseUrl = "PASTE_YOUR_PROJECT_URL_HERE";
const supabaseAnonKey = "PASTE_YOUR_ANON_KEY_HERE";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);

  // Fixed Line 16: Removed the extra dot that caused the crash
  const today = new Date().toISOString().split('T')[0];

  const timeSlots = [
    "10:00", "11:00", "12:00", "13:00", 
    "14:00", "15:00", "16:00", "17:00"
  ];

  useEffect(() => {
    async function checkAvailability() {
      if (!selectedDate) return;
      try {
        const { data } = await supabase
          .from('bookings')
          .select('booking_time')
          .eq('booking_date', selectedDate);
        if (data) {
          setBookedTimes(data.map(b => b.booking_time));
        }
      } catch (err) {
        console.error("Supabase Error:", err);
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
        setStatus("❌ Already taken!");
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
      setStatus("⚠️ Connection Error");
    }
    setLoading(false);
  };

  if (status === "SUCCESS") {
    return (
      <div className="flex justify-center items-center py-20 px-4 bg-white">
        <div className="bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row max-w-2xl w-full overflow-hidden border border-gray-100">
          <div className="bg-[#1a1a1a] text-white p-10 md:w-1/3">
            <h2 className="text-2xl font-bold text-[#c5a059] mb-1">Book Now</h2>
            <p className="text-gray-400 text-[11px] mt-4">+65 8727 3741</p>
          </div>
          <div className="p-12 md:w-2/3 flex flex-col items-center justify-center text-center">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">Booking Sent!</h3>
            <button onClick={() => setStatus('')} className="text-[#c5a059] font-bold uppercase text-xs mt-4">Book another</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-24 px-4">
      <div className="max-w-xl mx-auto bg-white p-10 rounded-[2rem] shadow-xl border border-gray-100">
        <h2 className="text-4xl font-serif font-black text-center mb-10">Reserve Your Chair</h2>
        
        <form onSubmit={handleBooking} className="space-y-4">
          <input name="name" placeholder="Full Name" required className="w-full p-4 bg-gray-50 rounded-xl outline-none" />
          <input name="phone" placeholder="Phone Number" required className="w-full p-4 bg-gray-50 rounded-xl outline-none" />
          <input name="email" type="email" placeholder="Email Address" required className="w-full p-4 bg-gray-50 rounded-xl outline-none" />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Date</label>
              <input name="date" type="date" min={today} required onChange={(e) => setSelectedDate(e.target.value)} className="w-full p-4 bg-gray-50 rounded-xl outline-none" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Time</label>
              <select name="time" required className="w-full p-4 bg-gray-50 rounded-xl outline-none">
                <option value="">Select Time</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time} disabled={bookedTimes.includes(time)}>
                    {time} {bookedTimes.includes(time) ? "(Full)" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Service</label>
            <select name="service" required className="w-full p-4 bg-gray-50 rounded-xl outline-none">
                <option value="Classic Haircut">Classic Haircut</option>
                <option value="Signature Fade">Signature Fade</option>
                <option value="Beard Trim">Beard Trim</option>
                <option value="Full Combo">Haircut + Beard Combo</option>
            </select>
          </div>
          
          <button type="submit" disabled={loading} className="w-full bg-black text-white p-5 rounded-xl font-bold uppercase hover:bg-[#c5a059] transition-all mt-4 shadow-lg">
            {loading ? "Checking..." : "Confirm Booking"}
          </button>
          
          {status && <div className="text-red-600 text-center font-bold text-sm mt-4">{status}</div>}
        </form>
      </div>
    </section>
  );
}
