const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      // 1. Check if the slot is already taken
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

      // 2. Save to Supabase using your exact column names
      const { error: insertError } = await supabase.from('bookings').insert([{
        name: data.name,
        email: data.email,
        phone: data.phone,
        booking_date: data.date,
        booking_time: data.time,
        service: data.service
      }]);

      if (insertError) throw insertError;

      // 3. Send the Email Notification
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
