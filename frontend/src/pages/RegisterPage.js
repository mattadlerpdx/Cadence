// src/pages/RegisterPage.jsx

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Form, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import { FaGoogle } from 'react-icons/fa';
import { auth, googleProvider } from '../services/firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  // Handle successful Google login
  const handleGoogleSignInSuccess = (user) => {
    console.log('Google Login Success:', user);
    setSuccess('Google authentication successful! Redirecting...');
    setTimeout(() => {
      navigate('/dashboard'); // Redirect to dashboard
    }, 2000);
  };

  // Handle failed Google login
  const handleGoogleSignInFailure = (errorResponse) => {
    console.log('Google Login Failed:', errorResponse);
    setError('Google authentication failed. Please try again.');
  };

  // Handle Google Sign-In using Firebase
  const handleGoogleSignIn = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      handleGoogleSignInSuccess(result.user);
    } catch (error) {
      console.error('Google Sign-In Failed:', error);
      handleGoogleSignInFailure(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for email/password registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setError('');
    setSuccess('');
    setLoading(true);

    const formData = { email, password };

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      console.log('User registered:', userCredential.user);
      setSuccess('Registration successful! Redirecting to login...');

      setTimeout(() => {
        navigate('/login'); // Redirect to login page
      }, 2000);
    } catch (error) {
      console.error('Error registering user:', error);
      switch (error.code) {
        case 'auth/email-already-in-use':
          setError('This email is already in use.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email format.');
          break;
        case 'auth/weak-password':
          setError('Password should be at least 6 characters.');
          break;
        default:
          setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50 } },
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
              <motion.div className="bg-black text-white shadow rounded p-5" variants={rowVariants}>
                <motion.h1 className="text-center mb-4 fs-3" variants={rowVariants}>
                  Register for Cadence
                </motion.h1>

                {/* Success Message */}
                {success && (
                  <motion.div variants={rowVariants}>
                    <Alert variant="success" onClose={() => setSuccess('')} dismissible>
                      {success}
                    </Alert>
                  </motion.div>
                )}

                {/* Error Message */}
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

                {/* Google Sign-In Button */}
                <motion.div className="d-grid" variants={rowVariants}>
                  <Button
                    variant="light"
                    className="btn-google d-flex align-items-center justify-content-center btn-lg fs-5"
                    onClick={handleGoogleSignIn}
                    aria-label="Register through Google"
                  >
                    <FaGoogle className="me-2" size={24} />
                    Register through Google
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
