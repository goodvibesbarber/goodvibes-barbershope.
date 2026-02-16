import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  // Check if it's a POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, date, time, service } = req.body;

    await resend.emails.send({
      from: 'Good Vibes Barber <onboarding@resend.dev>',
      to: ['pasposip@gmail.com'],
      subject: `New Booking: ${name}`,
      html: `<h1>New Booking Request</h1>
             <p><strong>Customer:</strong> ${name}</p>
             <p><strong>Phone:</strong> ${phone}</p>
             <p><strong>Service:</strong> ${service}</p>
             <p><strong>Date/Time:</strong> ${date} at ${time}</p>`
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
