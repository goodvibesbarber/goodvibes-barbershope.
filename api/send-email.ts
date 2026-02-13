import { Resend } from 'resend';

// NOTE: In a production environment, store this key in an environment variable (e.g., process.env.RESEND_API_KEY)
// The user provided this key for this specific build.
const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_YX3vW7YC_3pvEy3KTp3ZdmkYtbU86SxGk';

const resend = new Resend(RESEND_API_KEY);

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { name, email, phone, date, time, service } = await req.json();

    const data = await resend.emails.send({
      from: 'Good Vibes Barber <onboarding@resend.dev>',
      to: ['pasposip@gmail.com'],
      subject: `New Booking Request: ${name} - ${service}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #1a1a1a;">
          <h1 style="color: #C5A059;">New Appointment Request</h1>
          <p>You have a new booking from the website.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 10px; margin-top: 20px;">
            <p><strong>Customer:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Requested Date:</strong> ${date}</p>
            <p><strong>Requested Time:</strong> ${time}</p>
          </div>
          
          <p style="margin-top: 20px; font-size: 12px; color: #666;">
            Sent from Good Vibes Barber Shop Website.
          </p>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: (error as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}