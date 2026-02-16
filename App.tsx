import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';

// Declare AOS since it's loaded via CDN
declare global {
  interface Window {
    AOS: any;
  }
}

const App: React.FC = () => {
  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({
        duration: 1000, // Slower duration for elegance
        once: true,
        offset: 50,
        easing: 'ease-out-cubic',
        mirror: false,
      });
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Services />
        <BookingForm />
      </main>
      <Footer />
    </div>
  );
};

export default App;