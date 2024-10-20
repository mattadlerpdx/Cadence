import React from 'react';
import { Carousel } from 'react-bootstrap';  // <-- Make sure this is imported
import 'bootstrap/dist/css/bootstrap.min.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand" href="/">Cadence</a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/login">Login</a>
              </li>
              <li className="nav-item">
                <a className="btn btn-primary btn-pill" href="/register">Sign Up</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

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
          <Carousel>
            <Carousel.Item interval={3000}>
              <div className="card p-4 shadow text-center">
                <h3>Automate Orders</h3>
                <p>Easily manage and automate packaging orders based on historical sales data.</p>
              </div>
            </Carousel.Item>
            <Carousel.Item interval={3000}>
              <div className="card p-4 shadow text-center">
                <h3>Real-Time Inventory</h3>
                <p>Track your inventory in real time to prevent stockouts and ensure seamless operation.</p>
              </div>
            </Carousel.Item>
            <Carousel.Item interval={3000}>
              <div className="card p-4 shadow text-center">
                <h3>Supplier Integration</h3>
                <p>Connect with suppliers directly and manage all your orders seamlessly.</p>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="text-center py-5">
        <h2>Ready to Get Started?</h2>
        <a href="/register" className="btn btn-success btn-lg mt-3">Sign Up Now</a>
      </section>

      {/* Footer */}
      <footer className="footer text-center py-3">
        <p>&copy; 2024 Cadence. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
