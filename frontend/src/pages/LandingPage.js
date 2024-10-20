import React from 'react';
import Navbar from '../components/Navbar';  // Navbar component
import CarouselComponent from '../components/Carousel';  // Carousel component
import Footer from '../components/Footer';  // Footer component
import 'bootstrap/dist/css/bootstrap.min.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header className="hero-section text-center">
        <div className="container">
          <p>
            Cadence 
          </p>
          <h1>Sell. Scale. Grow with Cadence</h1>
          <p>Your vertical seed-to-sale cannabis supply chain management solution.</p>
          <a href="/register" className="btn btn-light btn-pill me-3">Get Started</a>
          <a href="/demo" className="btn btn-outline-light btn-pill">Book My Personal Demo</a>
        </div>
      </header>

      {/* Carousel Section */}
      <section className="carousel-section py-5">
        <div className="container">
          <CarouselComponent />
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="text-center py-5">
        <h2>Ready to Get Started?</h2>
        <a href="/register" className="btn btn-success btn-lg mt-3">Sign Up Now</a>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;

