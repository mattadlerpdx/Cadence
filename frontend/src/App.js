import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Inventory from './Inventory';  // Import the Inventory component
import LandingPage from './LandingPage';  // Import the Landing Page component
import LoginPage from './LoginPage';  // Import the Login Page component
import RegisterPage from './RegisterPage';  // Import the Register Page component
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap for styling

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for Landing Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Route for Inventory Page */}
          <Route path="/inventory" element={<div><h1>Cadence Inventory</h1><Inventory /></div>} />
          
          {/* Login and Register Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Redirect to Landing Page by default */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

