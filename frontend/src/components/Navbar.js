// src/components/Navbar.jsx

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from '../services/firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { FaChevronRight } from 'react-icons/fa'; // Sidebar toggle icon

const Navbar = ({ isMobileView, toggleSidebar }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Effect to handle user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  // Sign-out handler
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully.');
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error.code, error.message);
      alert(`Failed to sign out: ${error.message}`);
    }
  };

  // Render the brand logo
  const renderBrand = () => {
    if (!user) {
      return (
        <Link className="navbar-brand text-white" to="/">
          Cadence
        </Link>
      );
    }
    return null;
  };

  // Render the sidebar toggle button for mobile view
  const renderSidebarToggle = () => {
    if (isMobileView) {
      return (
        <button
          className="btn btn-link text-white sidebar-toggle"
          onClick={toggleSidebar}
        >
          <FaChevronRight />
        </button>
      );
    }
    return null;
  };

  // Render navigation links
  const renderNavLinks = () => {
    if (user) {
      return (
        <li className="nav-item ms-auto mt-2">
          <button
            className="nav-link btn btn-link text-white sign-out-btn"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </li>
      );
    }
    return (
      <>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
      </>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
      {renderBrand()}
      {renderSidebarToggle()}

      <button
        className="navbar-toggler ms-auto"
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
        <ul className="navbar-nav ms-auto text-right">{renderNavLinks()}</ul>
      </div>
    </nav>
  );
};

export default Navbar;

