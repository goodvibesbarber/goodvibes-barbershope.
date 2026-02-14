import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// VITE uses 'import.meta.env' instead of 'process.env'
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      // 1. Check if slot is taken
      const { data: existing, error: checkError } = await supabase
        .from('bookings')
        .select('*')
        .eq('booking_date', data.date)
        .eq('booking_time', data.time);

      if (existing && existing.length > 0) {
        setStatus("❌ This time is already taken. Please pick another!");
        setLoading(false);
        return;
      }

      // 2. Save to Supabase
      const { error: insertError } = await supabase.from('bookings').insert([{
        name: data.name,
        email: data.email,
        phone: data.phone,
        booking_date: data.date,
        booking_time: data.time,
        service: data.service
      }]);

      if (insertError) throw insertError;

      // 3. Send the Email
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      setStatus("✅ Success! Your appointment is locked in.");
    } catch (err) {
      console.error("Booking error:", err);
      setStatus("⚠️ Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleBooking} className="space-y-4">
      {/* Make sure your inputs have name="date" and name="time" */}
      <button type="submit" disabled={loading} className="w-full bg-black text-white p-3 rounded">
        {loading ? "Checking availability..." : "Confirm Booking"}
      </button>
      {status && <p className="text-center font-bold mt-2 p-2 border rounded">{status}</p>}
    </form>
  );
}
