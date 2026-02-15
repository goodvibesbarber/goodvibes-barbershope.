import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Direct connection using the keys you provided
const supabaseUrl = "https://fivjtiaayguuejbtreku.supabase.co"; 
const supabaseAnonKey = "sb_publishable_A0_Yy-Zbbp2JjJV4Za4UXA_plSlk6mS87_Wd96Yh6yqN7-9f7p0yT8E1h7Q";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);

  // Fixed the Date typo to prevent white screen
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
        setStatus("❌ This time is already taken.");
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
      setStatus("⚠️ Error connecting to database.");
    }
    setLoading(false);
  };

  if (status === "SUCCESS") {
    return (
      <div style={{padding: '50px', textAlign: 'center', background: 'white'}}>
        <h2 style={{color: '#c5a059'}}>Booking Confirmed!</h2>
        <p>Thank you. Simonyo will see you soon.</p>
        <button onClick={() => setStatus('')} style={{background: 'black', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>
          Book Another
        </button>
      </div>
    );
  }

  return (
    <div style={{maxWidth: '500px', margin: '40px auto', padding: '20px', background: 'white', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', fontFamily: 'sans-serif'}}>
      <h2 style={{textAlign: 'center', marginBottom: '30px'}}>Reserve Your Chair</h2>
      <form onSubmit={handleBooking} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
        <input name="name" placeholder="Full Name" required style={{padding: '12
