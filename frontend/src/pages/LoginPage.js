// LoginPage.jsx
import React, { useState } from 'react';
import Navbar from '../components/Navbar';  // Navbar component
import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is included
import { motion } from 'framer-motion'; // Import Framer Motion for animations
import '../App.css'; // Import your custom styles if needed
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for client-side navigation
import { FaGoogle } from 'react-icons/fa'; // Import Google Icon

// Import Firebase authentication services from services/firebase.js
import { auth, googleProvider } from '../services/firebase'; // Adjust the path as necessary
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const LoginPage = () => {
  const navigate = useNavigate(); // Hook for navigation

  // State variables for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State variables for form validation and feedback
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  // Handle form submission for email/password login
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

    try {
      // Firebase sign-in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
      setSuccess('Login successful! Redirecting...');

      // Optionally, redirect to dashboard page after a delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Error logging in user:', error);
      // Map Firebase auth errors to user-friendly messages
      switch (error.code) {
        case 'auth/invalid-email':
          setError('Invalid email format.');
          break;
        case 'auth/user-disabled':
          setError('This user has been disabled.');
          break;
        case 'auth/user-not-found':
          setError('No user found with this email.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password.');
          break;
        default:
          setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Google sign-in using Firebase
  const handleGoogleSignIn = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log('Google Sign-In Success:', user);
      setSuccess('Google authentication successful! Redirecting...');

      // Optionally, redirect to dashboard page after a delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Google Sign-In Failed:', error);
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData?.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      setError('Google authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Define animation variants for container and elements
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
            <Col xs={12} sm={10} md={8} lg={7} xl={6} className="mx-auto">
              <motion.div
                className="bg-black text-white shadow rounded p-5"
                variants={rowVariants}
              >
                {/* Heading with dynamic animation */}
                <motion.h1 
                  className="text-center mb-4 fs-3"
                  variants={rowVariants}
                >
                  Login to Cadence
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

                {/* Login Form */}
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
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your password (minimum 6 characters).
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* Submit Button with larger text */}
                    <Button variant="primary" type="submit" className="w-100 btn-lg fs-5" disabled={loading}>
                      {loading ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Logging in...
                        </>
                      ) : (
                        'Login'
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

                {/* Google Login Button */}
                <motion.div className="d-grid" variants={rowVariants}>
                  <Button
                    variant="light"
                    className="btn-google d-flex align-items-center justify-content-center btn-lg fs-5"
                    onClick={handleGoogleSignIn}
                    aria-label="Sign in with Google" // Added for accessibility
                  >
                    <FaGoogle className="me-2" size={24} /> {/* Larger icon with margin */}
                    Sign in with Google
                  </Button>
                </motion.div>

                {/* Link to Register Page */}
                <motion.div className="text-center mt-3" variants={rowVariants}>
                  <span className="fs-5">Don't have an account? </span>
                  <Link to="/register" className="text-primary fs-5">Register here</Link>
                </motion.div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </motion.div>
    </>
  );
};

export default LoginPage;
