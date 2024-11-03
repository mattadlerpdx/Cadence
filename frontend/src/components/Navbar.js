// src/components/Navbar.jsx

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is included
import { auth } from '../services/firebase'; // Import auth from your Firebase setup
import { signOut, onAuthStateChanged } from 'firebase/auth';

const Navbar = () => {
  const [user, setUser] = useState(null); // State to hold the authenticated user

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Handle user sign-out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully.');
      // Redirect to home page after sign-out
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
      // Optionally, display an error message to the user
      alert('Failed to sign out. Please try again.');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
      <div className="container">
        {/* Modify the home button based on authentication state */}
        <Link className="navbar-brand text-white" to={user ? "/dashboard" : "/"}>
          Cadence
        </Link>
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
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav ms-auto text-right">
            {!user ? (
              // If user is not authenticated, show Login and Sign Up
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
              </>
            ) : (
              // If user is authenticated, show Sign Out
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-white"
                  onClick={handleSignOut}
                  style={{ textDecoration: 'none' }} // Remove underline from button
                >
                  Sign Out
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
