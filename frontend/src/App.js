import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Inventory from './Inventory';
import LandingPage from './pages/LandingPageNonModular';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Button from 'react-bootstrap/Button';  // Import Bootstrap Button component
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap for styling

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <Router>
      <div className="App">

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/inventory" element={<div><h1>Cadence Inventory</h1><Inventory /></div>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
