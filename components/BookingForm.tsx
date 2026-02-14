// 2. Save to your Supabase logbook
      const { error: insertError } = await supabase.from('bookings').insert([{
        customer_name: data.name,    // Matches 'name' in your form
        customer_email: data.email,  // Matches 'email' in your form
        customer_phone: data.phone,  // Matches 'phone' in your form
        date: data.date,             // Matches 'date' in your form
        time: data.time,             // Matches 'time' in your form
        service: data.service        // Matches 'service' in your form
      }]);

      if (insertError) {
        console.error("Database Error:", insertError);
        throw insertError;
      }
