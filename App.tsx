import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import BookingForm from './BookingForm';
import Footer from './Footer';

const App = () => {
  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({
        duration: 1000,
        once: true,
        offset: 50,
        easing: 'ease-out-cubic',
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
        <div id="booking">
          <BookingForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
