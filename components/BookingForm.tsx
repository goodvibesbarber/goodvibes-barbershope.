// 2. Save to your Supabase logbook
      const { error: insertError } = await supabase.from('bookings').insert([{
        name: data.name,
        email: data.email,
        phone: data.phone,
        booking_date: data.date,  // This matches your 'booking_date' column
        booking_time: data.time,  // This matches your 'booking_time' column
        service: data.service     // This matches your 'service' column
      }]);

      if (insertError) {
        console.error("Database Error:", insertError);
        throw insertError;
      }

      // 3. Send the Gmail notification
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
