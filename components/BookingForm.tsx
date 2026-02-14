import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// This connects your site to your Singapore database
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      // 1. Check if someone already booked this time
      const { data: existing } = await supabase
        .from('bookings')
        .select('*')
        .eq('booking_date', data.date)
        .eq('booking_time', data.time);

      if (existing && existing.length > 0) {
        setStatus("❌ This time is already taken. Please pick another!");
        setLoading(false);
        return;
      }

      // 2. Save to your Supabase logbook
      await supabase.from('bookings').insert([{
        name: data.name,
        email: data.email,
        phone: data.phone,
        booking_date: data.date,
        booking_time: data.time,
        service: data.service
      }]);

      // 3. Send the Gmail notification
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      setStatus("✅ Success! Your appointment is locked in.");
    } catch (err) {
      setStatus("⚠️ Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleBooking} className="space-y-4">
      {/* Ensure your input names match (e.g., name="date", name="time") */}
      <button type="submit" disabled={loading} className="w-full bg-black text-white p-3 rounded">
        {loading ? "Checking availability..." : "Confirm Booking"}
      </button>
      {status && <p className="text-center font-bold mt-2">{status}</p>}
    </form>
  );
}
