import React, { useState } from 'react';
import Navbar from '../components/Navbar'; // Navbar component
import { useGoogleLogin } from '@react-oauth/google';
import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is included
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import { Link } from 'react-router-dom'; // Import Link for client-side navigation
import { FaGoogle } from 'react-icons/fa'; // Import Google Icon

const RegisterPage = () => {
  // State variables for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State variables for form validation and feedback
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  // Handle successful Google login
  const handleLoginSuccess = (tokenResponse) => {
    console.log('Google Login Success:', tokenResponse);
    setSuccess('Google authentication successful! Redirecting...');
    setTimeout(() => {
      window.location.href = '/dashboard'; // Redirect to a desired page
    }, 2000);
  };

  // Handle failed Google login
  const handleLoginFailure = (errorResponse) => {
    console.log('Google Login Failed:', errorResponse);
    setError('Google authentication failed. Please try again.');
  };

  // Initialize Google Login
  const login = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: handleLoginFailure,
    flow: 'implicit', // or 'authorization_code' based on your setup
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Check form validity
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setError('');
    setSuccess('');
    setLoading(true);

    // Prepare form data
    const formData = { email, password };

    try {
      // Replace this with your actual registration logic
      const response = await registerUser(formData);
      console.log('User registered:', response);
      setSuccess('Registration successful! Redirecting to login...');

      // Optionally, redirect to login page after a delay
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (error) {
      console.error('Error registering user:', error);
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Placeholder for actual user registration function
  const registerUser = async (formData) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simple validation for demonstration
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          reject(new Error('Invalid email format'));
        } else if (formData.password.length < 6) {
          reject(new Error('Password must be at least 6 characters'));
        } else {
          resolve({ message: 'User registered successfully' });
        }
      }, 1500);
    });
  };

  // Define animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger each child by 0.2 seconds
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 }, // Start slightly below with 0 opacity
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 50,
      },
    },
  };

  return (
    <>
      <Navbar />
      <motion.div
        className="main-content"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-black">
          <Row className="w-100">
            {/* Adjust the width to match the login page */}
            <Col xs={12} sm={10} md={8} lg={7} xl={6} className="mx-auto"> 
              <motion.div
                className="bg-black text-white shadow rounded p-5"
                variants={rowVariants}
              >
                <motion.h1 
                  className="text-center mb-4 fs-3" // Adjusted font size for mobile
                  variants={rowVariants}
                >
                  Register for Cadence
                </motion.h1>

                {/* Display Success Message */}
                {success && (
                  <motion.div variants={rowVariants}>
                    <Alert variant="success" onClose={() => setSuccess('')} dismissible>
                      {success}
                    </Alert>
                  </motion.div>
                )}

                {/* Display Error Message */}
                {error && (
                  <motion.div variants={rowVariants}>
                    <Alert variant="danger" onClose={() => setError('')} dismissible>
                      {error}
                    </Alert>
                  </motion.div>
                )}

                {/* Registration Form */}
                <motion.div variants={rowVariants}>
                  <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <Form.Group controlId="formEmail" className="mb-4">
                      <Form.Label className="fs-5">Email address</Form.Label>
                      <Form.Control
                        type="email"
                        className="fs-5"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* Password Field */}
                    <Form.Group controlId="formPassword" className="mb-5">
                      <Form.Label className="fs-5">Password</Form.Label>
                      <Form.Control
                        type="password"
                        className="fs-5"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a password with at least 6 characters.
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* Submit Button with larger text */}
                    <Button variant="primary" type="submit" className="w-100 btn-lg fs-5" disabled={loading}>
                      {loading ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Registering...
                        </>
                      ) : (
                        'Register'
                      )}
                    </Button>
                  </Form>
                </motion.div>

                {/* OR Divider */}
                <motion.div className="d-flex align-items-center my-4" variants={rowVariants}>
                  <hr className="flex-grow-1" />
                  <span className="mx-2 text-muted fs-5">OR</span>
                  <hr className="flex-grow-1" />
                </motion.div>

                {/* Custom Google Login Button */}
                <motion.div className="d-grid" variants={rowVariants}>
                  <Button
                    variant="light"
                    className="btn-google d-flex align-items-center justify-content-center btn-lg fs-5"
                    onClick={() => login()}
                    aria-label="Sign in with Google"
                  >
                    <FaGoogle className="me-2" size={24} /> {/* Larger icon with margin */}
                    Sign in with Google
                  </Button>
                </motion.div>

                {/* Link to Login Page */}
                <motion.div className="text-center mt-3" variants={rowVariants}>
                  <span className="fs-5">Already have an account? </span>
                  <Link to="/login" className="text-primary fs-5">Login here</Link>
                </motion.div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </motion.div>
    </>
  );
};

export default RegisterPage;
