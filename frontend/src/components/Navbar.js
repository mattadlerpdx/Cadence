// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is included

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black"> {/* Use Bootstrap class for background */} 
      <div className="container">
        <Link className="navbar-brand text-white" to="/">Cadence</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav"> {/* Added justify-content-end */}
          <ul className="navbar-nav ms-auto text-right"> {/* Use ms-auto for Bootstrap 5 and text-right to align right */}
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Sign Up</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
