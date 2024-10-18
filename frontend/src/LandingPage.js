import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="/">Cadence</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/login">Login</a>
              </li>
              <li className="nav-item">
                <a className="btn btn-primary" href="/register">Sign Up</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-primary text-white text-center py-5">
        <div className="container">
          <h1>Grow, Sell, Scale with Cadence</h1>
          <p>Your vertical seed-to-sale cannabis supply chain management solution.</p>
          <a href="/register" className="btn btn-success btn-lg mt-3">Book My Personal Demo</a>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section py-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-md-4">
              <div className="card p-4 shadow">
                <h3>Automate Orders</h3>
                <p>Easily manage and automate packaging orders based on historical sales data.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-4 shadow">
                <h3>Real-Time Inventory</h3>
                <p>Track your inventory in real time to prevent stockouts and ensure seamless operation.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card p-4 shadow">
                <h3>Supplier Integration</h3>
                <p>Connect with suppliers directly and manage all your orders seamlessly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-light text-center py-5">
        <h2>Ready to Get Started?</h2>
        <a href="/register" className="btn btn-success btn-lg mt-3">Sign Up Now</a>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white text-center py-3">
        <p>&copy; 2024 Cadence. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;

