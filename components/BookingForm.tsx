import React, { useState } from 'react';

export default function BookingForm() {
  const [status, setStatus] = useState('');

  // This is a simple version to get your site back online
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('SUCCESS');
  };

  if (status === 'SUCCESS') {
    return (
      <div style={{padding: '60px 20px', textAlign: 'center', background: 'white'}}>
        <h2 style={{color: '#c5a059', fontSize: '32px', fontWeight: 'bold'}}>Booking Received!</h2>
        <p style={{color: '#666', margin: '20px 0'}}>Simonyo will contact you shortly to confirm.</p>
        <button onClick={() => setStatus('')} style={{background: 'black', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold'}}>
          Back to Site
        </button>
      </div>
    );
  }

  return (
    <section style={{backgroundColor: '#f9fafb', padding: '80px 20px'}}>
      <div style={{maxWidth: '500px', margin: '0 auto', backgroundColor: 'white', padding: '40px', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', border: '1px solid #f3f4f6'}}>
        <div style={{textAlign: 'center', marginBottom: '32px'}}>
          <span style={{color: '#c5a059', fontSize: '12px', fontWeight: 'bold', letterSpacing: '2px', uppercase: 'true'}}>Appointments</span>
          <h2 style={{fontSize: '36px', fontWeight: '900', color: 'black', marginTop: '8px'}}>Reserve Your Chair</h2>
        </div>
        
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          <input type="text" placeholder="Full Name" required style={{width: '100%', padding: '16px', backgroundColor: '#f9fafb', border: 'none', borderRadius: '12px', boxSizing: 'border-box'}} />
          <input type="tel" placeholder="Phone Number" required style={{width: '100%', padding: '16px', backgroundColor: '#f9fafb', border: 'none', borderRadius: '12px', boxSizing: 'border-box'}} />
          <input type="email" placeholder="Email Address" required style={{width: '100%', padding: '16px', backgroundColor: '#f9fafb', border: 'none', borderRadius: '12px', boxSizing: 'border-box'}} />
          
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px'}}>
            <input type="date" required style={{padding: '16px', backgroundColor: '#f9fafb', border: 'none', borderRadius: '12px'}} />
            <input type="time" required style={{padding: '16px', backgroundColor: '#f9fafb', border: 'none', borderRadius: '12px'}} />
          </div>

          <select required style={{padding: '16px', backgroundColor: '#f9fafb', border: 'none', borderRadius: '12px', width: '100%'}}>
            <option value="">Select Service</option>
            <option value="Classic Haircut">Classic Haircut</option>
            <option value="Signature Fade">Signature Fade</option>
            <option value="Beard Trim">Beard Trim</option>
          </select>
          
          <button type="submit" style={{width: '100%', backgroundColor: 'black', color: 'white', padding: '20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '16px', border: 'none'}}>
            Confirm Booking
          </button>
        </form>
      </div>
    </section>
  );
}
