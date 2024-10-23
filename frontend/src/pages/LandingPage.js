// LandingPage.jsx
import React from 'react';
import Navbar from '../components/Navbar';  // Navbar component
import CarouselComponent from '../components/Carousel';  // Carousel component
import Footer from '../components/Footer';  // Footer component
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'; // Import Link for client-side navigation

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <header className="hero-section text-center">
        <div className="container">
          <p className="fs-3">Cadence</p>
          <h1 className="fs-1">Sell. Scale. Grow with Cadence</h1>
          <p className="fs-4">Your vertical seed-to-sale cannabis supply chain management solution.</p>
          <Link to="/register" className="btn btn-light btn-pill mb-3 me-3">Get Started</Link>
          <Link to="/demo" className="btn btn-outline-light btn-pill mb-3 me-3">Book My Personal Demo</Link>
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
        <h2 className="fs-2">Ready to Get Started?</h2>
        <Link to="/register" className="btn btn-success btn-lg mt-3">Sign Up Now</Link>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;


