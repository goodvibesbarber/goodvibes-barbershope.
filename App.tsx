import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import BookingForm from './BookingForm';
import Footer from './Footer';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden bg-white">
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
