// Dashboard.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../components/Navbar'; // Optional: Include Navbar if needed
import Footer from '../components/Footer'; // Optional: Include Footer if needed

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      {/* Optional Navbar */}
      <Navbar />

      <Container className="py-5">
        <Row>
          <Col>
            <h1 className="fs-1">Welcome to Cadence Dashboard</h1>
            <p className="fs-4">This is your dashboard where you can manage your inventory and more.</p>
            {/* Add more dashboard content here */}
          </Col>
        </Row>
      </Container>

      {/* Optional Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
