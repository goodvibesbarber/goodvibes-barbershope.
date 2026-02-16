import React, { useState, useEffect } from 'react';
import { BookingFormData } from '../types';
import { MessageCircle, CheckCircle, Loader2, AlertCircle, Calendar, Clock } from 'lucide-react';

// Define operating hours: 11 AM to 9 PM. 
// Last slot is 8:00 PM.
const TIME_SLOTS = [
  "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", 
  "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"
];

const BookingForm: React.FC = () => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: 'Haircut',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [slotError, setSlotError] = useState<string | null>(null);

  // Load simulated bookings from localStorage on mount
  useEffect(() => {
    const savedBookings = localStorage.getItem('simonyo_bookings');
    if (savedBookings) {
      setBookedSlots(JSON.parse(savedBookings));
    } else {
      // Add some dummy "taken" slots for demonstration
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateStr = tomorrow.toISOString().split('T')[0];
      const dummyBookings = [`${dateStr}_2:00 PM`, `${dateStr}_4:00 PM`];
      setBookedSlots(dummyBookings);
      localStorage.setItem('simonyo_bookings', JSON.stringify(dummyBookings));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    // If date changes, reset time and check for Sunday
    if (e.target.name === 'date') {
        setFormData(prev => ({ ...prev, date: e.target.value, time: '' }));
        
        if (e.target.value) {
            // Robust way to get local day of week from YYYY-MM-DD
            const [y, m, d] = e.target.value.split('-').map(Number);
            const dateObj = new Date(y, m - 1, d);
            
            if (dateObj.getDay() === 0) { // 0 represents Sunday
                setSlotError("We are closed on Sundays. Please select another date.");
            } else {
                setSlotError(null);
            }
        } else {
            setSlotError(null);
        }
    }
  };

  const handleTimeSelect = (time: string) => {
    if (!formData.date) {
        setSlotError("Please select a date first.");
        return;
    }
    
    // Double check Sunday
    const [y, m, d] = formData.date.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    if (dateObj.getDay() === 0) {
        setSlotError("We are closed on Sundays.");
        return;
    }

    const slotKey = `${formData.date}_${time}`;
    
    if (bookedSlots.includes(slotKey)) {
        setSlotError("This slot has been taken. Please choose another.");
        setTimeout(() => setSlotError(null), 3000);
        return;
    }

    setFormData({ ...formData, time });
    setSlotError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.time) {
        setSlotError("Please select a time slot.");
        return;
    }

    setStatus('loading');

    // Simulate marking the slot as taken
    const newSlotKey = `${formData.date}_${formData.time}`;
    const updatedBookings = [...bookedSlots, newSlotKey];
    setBookedSlots(updatedBookings);
    localStorage.setItem('simonyo_bookings', JSON.stringify(updatedBookings));

    try {
        // FormSubmit.co integration
        await fetch("https://formsubmit.co/ajax/pasposip@gmail.com", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                _subject: `💈 New Booking: ${formData.name} - ${formData.date} @ ${formData.time}`,
                _template: "table",
                _captcha: "false",
                service: formData.service,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                date: formData.date,
                time: formData.time,
                message: "Please contact customer to confirm appointment."
            })
        });

        setStatus('success');
    } catch (error) {
        console.error("Email submission failed", error);
        setStatus('success');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setFormData({ name: '', email: '', phone: '', date: '', time: '', service: 'Haircut' });
    setSlotError(null);
  };

  const getWhatsAppLink = () => {
    const text = `Hi Simonyo! 👋%0A%0AI'd like to secure a booking:%0A%0A💈 Service: ${formData.service}%0A📅 Date: ${formData.date}%0A⏰ Time: ${formData.time}%0A👤 Name: ${formData.name}%0A%0APlease confirm. Thanks!`;
    return `https://wa.me/6587273741?text=${text}`;
  };

  // Check if a specific slot is taken
  const isSlotTaken = (time: string) => {
    if (!formData.date) return false;
    return bookedSlots.includes(`${formData.date}_${time}`);
  };

  // Check if current selected date is Sunday
  const isSundaySelected = () => {
      if (!formData.date) return false;
      const [y, m, d] = formData.date.split('-').map(Number);
      return new Date(y, m - 1, d).getDay() === 0;
  };

  return (
    <section id="booking" className="py-24 bg-vibes-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row" data-aos="fade-up">
          
          {/* Left Side: Info & Branding */}
          <div className="md:w-1/3 bg-vibes-black p-10 flex flex-col justify-between text-vibes-white relative overflow-hidden">
            <div className="relative z-10">
              <h3 
                data-aos="fade-right" 
                data-aos-delay="200"
                className="text-3xl font-serif font-bold text-vibes-gold mb-4"
              >
                Book Now
              </h3>
              <p 
                data-aos="fade-right" 
                data-aos-delay="300"
                className="text-gray-400 mb-8"
              >
                Secure your spot with Simonyo. Select a date to view available time slots.
              </p>
              
              <div 
                data-aos="fade-up" 
                data-aos-delay="400"
                className="space-y-4"
              >
                <div className="flex items-center text-sm font-semibold uppercase tracking-wider text-vibes-gold mb-2">
                    <Clock size={16} className="mr-2" />
                    Operating Hours
                </div>
                <ul className="text-sm text-gray-400 space-y-1">
                    <li className="flex justify-between"><span>Mon-Sat</span> <span className="text-white">11am - 9pm</span></li>
                    <li className="flex justify-between"><span>Sunday</span> <span className="text-red-400 font-bold">Closed</span></li>
                </ul>

                <div className="pt-6">
                    <p className="text-sm font-semibold uppercase tracking-wider text-vibes-gold">Contact</p>
                    <p className="mt-1">+65 8727 3741</p>
                    <p>@GoodVibesBarberShop</p>
                </div>
              </div>
            </div>
            {/* Background pattern */}
            <div className="absolute -bottom-10 -right-10 text-vibes-white opacity-5 transform rotate-12">
               <svg width="200" height="200" fill="currentColor" viewBox="0 0 24 24"><path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-3.485a2.2 2.2 0 01-1.229-1.879 2.172 2.172 0 011.23-1.878V5a2 2 0 00-2-2H7"/></svg>
            </div>
          </div>

          {/* Right Side: Interactive Form */}
          <div className="md:w-2/3 p-8 md:p-10 bg-white">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in py-10">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <CheckCircle size={40} />
                </div>
                
                <h3 className="text-2xl font-bold text-vibes-black mb-2">Request Sent!</h3>
                <p className="text-gray-600 mb-6 max-w-sm">
                  Your slot for <strong>{formData.date} at {formData.time}</strong> has been tentatively reserved.
                </p>

                <div className="bg-orange-50 border border-orange-100 p-4 rounded-xl mb-6 max-w-sm w-full">
                    <p className="text-sm text-orange-800 font-medium mb-3">
                        Final Step: Confirm via WhatsApp
                    </p>
                    <a 
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#20bd5a] transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg w-full"
                    >
                      <MessageCircle className="mr-2" size={20} />
                      Send via WhatsApp
                    </a>
                </div>

                <button 
                  onClick={handleReset}
                  className="mt-2 text-vibes-gold hover:text-vibes-black font-medium text-sm underline transition-colors"
                >
                  Book another appointment
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Details Section */}
                <div className="space-y-4">
                    <h4 className="text-lg font-serif font-bold text-vibes-black border-b border-gray-100 pb-2">1. Your Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Name</label>
                            <input 
                            type="text" 
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-vibes-gold focus:border-transparent outline-none transition-all"
                            placeholder="Your name"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Phone</label>
                            <input 
                            type="tel" 
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-vibes-gold focus:border-transparent outline-none transition-all"
                            placeholder="+65 1234 5678"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Email</label>
                        <input 
                            type="email" 
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-vibes-gold focus:border-transparent outline-none transition-all"
                            placeholder="you@example.com"
                        />
                    </div>
                </div>

                {/* Service Selection */}
                <div className="space-y-4">
                     <h4 className="text-lg font-serif font-bold text-vibes-black border-b border-gray-100 pb-2">2. Choose Service</h4>
                     <select 
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-vibes-gold focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                        style={{backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right .7em top 50%', backgroundSize: '.65em auto'}}
                      >
                        <option value="Haircut">Haircut ($35)</option>
                        <option value="Student Haircut">Student Haircut ($25)</option>
                        <option value="Beard Trim">Beard Trim ($25)</option>
                        <option value="Clean Shave">Clean Shave ($30)</option>
                        <option value="Vibes Experience">Vibes Experience ($55)</option>
                        <option value="Good Vibes Experience">Good Vibes Experience ($70)</option>
                      </select>
                </div>

                {/* Date & Time Selection */}
                <div className="space-y-4">
                    <h4 className="text-lg font-serif font-bold text-vibes-black border-b border-gray-100 pb-2">3. Date & Time</h4>
                    
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Select Date</label>
                        <div className="relative">
                            <input 
                                type="date" 
                                name="date"
                                required
                                min={new Date().toISOString().split('T')[0]}
                                value={formData.date}
                                onChange={handleChange}
                                className={`w-full px-4 py-3 rounded-lg border focus:bg-white focus:ring-2 focus:ring-vibes-gold focus:border-transparent outline-none transition-all ${isSundaySelected() ? 'border-red-300 bg-red-50 text-red-900' : 'border-gray-200 bg-gray-50'}`}
                            />
                            <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                        </div>
                        {isSundaySelected() && (
                            <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                                We are closed on Sundays. Please choose another date.
                            </p>
                        )}
                    </div>

                    <div className="relative">
                         <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 flex justify-between">
                            <span>Select Time Slot</span>
                            {formData.time && <span className="text-vibes-gold font-bold">{formData.time}</span>}
                         </label>
                         
                         {/* Time Slot Grid */}
                         <div className={`grid grid-cols-3 sm:grid-cols-4 gap-2 transition-opacity duration-300 ${(!formData.date || isSundaySelected()) ? 'opacity-50 pointer-events-none blur-[1px]' : 'opacity-100'}`}>
                            {TIME_SLOTS.map((slot) => {
                                const taken = isSlotTaken(slot);
                                const selected = formData.time === slot;
                                
                                return (
                                    <button
                                        key={slot}
                                        type="button"
                                        disabled={taken}
                                        onClick={() => handleTimeSelect(slot)}
                                        className={`
                                            py-2 px-1 text-xs sm:text-sm font-medium rounded-md border transition-all duration-200 relative
                                            ${selected 
                                                ? 'bg-vibes-gold text-vibes-black border-vibes-gold shadow-md transform scale-105 z-10' 
                                                : taken 
                                                    ? 'bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed decoration-slice' 
                                                    : 'bg-white text-gray-700 border-gray-200 hover:border-vibes-gold hover:text-vibes-black'
                                            }
                                        `}
                                    >
                                        {slot}
                                        {taken && (
                                            <span className="absolute inset-0 flex items-center justify-center bg-gray-100/80 text-[10px] text-red-500 font-bold uppercase tracking-wider rounded-md">
                                                Booked
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                         </div>
                         
                         {!formData.date && (
                             <p className="text-xs text-gray-400 mt-2 text-center italic">Please select a date first to view availability</p>
                         )}

                         {/* Error Toast for Taken Slots */}
                         {slotError && (
                             <div className="absolute top-[-40px] left-0 w-full bg-red-600 text-white text-sm py-2 px-4 rounded-lg shadow-lg flex items-center justify-center animate-bounce z-20">
                                 <AlertCircle size={16} className="mr-2" />
                                 {slotError}
                             </div>
                         )}
                    </div>
                </div>

                {status === 'error' && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center text-sm">
                    <AlertCircle size={20} className="mr-2" />
                    Something went wrong. Please try again or call us.
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={status === 'loading' || isSundaySelected()}
                  className="w-full bg-vibes-black text-vibes-white font-bold py-4 rounded-lg hover:bg-vibes-gold hover:text-vibes-black transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed mt-6"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={20} className="animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    'Confirm Appointment'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;