import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// I have updated these with the keys from your screenshot
const supabaseUrl = "https://fivjtiaayguuejbtreku.supabase.co"; 
const supabaseAnonKey = "sb_publishable_A0_Yy-Zbbp2JjJV4Za4UXA_plSlk6mS87_Wd96Yh6yqN7-9f7p0yT8E1h7Q";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);

  // TYPO FIXED: Removed the dot after "new" to fix the white screen
  const today = new Date().toISOString().split('T')[0];

  const timeSlots = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

  useEffect(() => {
    async function checkAvailability() {
      if (!selectedDate) return;
      try {
        const { data } = await supabase
          .from('bookings')
          .select('booking_time')
          .eq('booking_date', selectedDate);
        if (data) setBookedTimes(data.map(b => b.booking_time));
      } catch (err) {
        console.error("Database check failed:", err);
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
        .from('bookings').select('*')
        .eq('booking_date', data.date).eq('booking_time', data.time);

      if (existing && existing.length > 0) {
        setStatus("❌ Slot taken! Pick another time.");
        setLoading(false);
        return;
      }

      const { error } = await supabase.from('bookings').insert([{
        name: data.name, email: data.email, phone: data.phone,
        booking_date: data.date, booking_time: data.time, service: data.service
      }]);

      if (error) throw error;
      setStatus("SUCCESS");
    } catch (err) {
      setStatus("⚠️ Connection error. Try again!");
    }
    setLoading(false);
  };

  if (status === "SUCCESS") {
    return (
      <div className="flex justify-center items-center py-20 bg-white">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center border border-gray-100">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-3xl font-bold mb-2">Booking Sent!</h3>
          <p className="text-gray-500 mb-6">Simonyo will see you soon.</p>
          <button onClick={() => setStatus('')} className="text-[#c5a059] font-bold uppercase text-xs">Book another</button>
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
        
        <form onSubmit={handleBooking} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" placeholder="Full Name" required className="w-full p-4 bg-gray-50 rounded-xl outline-none" />
            <input name="phone" placeholder="Phone" required className="w
