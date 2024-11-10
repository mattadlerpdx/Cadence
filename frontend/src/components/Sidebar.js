// src/components/Sidebar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion'; // Import Bootstrap Accordion
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is included
import '../App.css'; // You can style the sidebar separately if needed

const Sidebar = ({ setActiveSection }) => {
  return (
    <div className="d-flex flex-column bg-dark p-3 vh-100" style={{ width: '250px' }}>


      <Accordion>
        {/* Inventory Accordion */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>Inventory</Accordion.Header>
          <Accordion.Body>
            <ul className="list-unstyled">
              <li>
                <button
                  className="text-white btn btn-link"
                  onClick={() => setActiveSection('inventory-upload')}
                  style={{ textDecoration: 'none' }}>
                  Upload Inventory
                </button>
              </li>
              <li>
                <button
                  className="text-white btn btn-link"
                  onClick={() => setActiveSection('inventory-view')}
                  style={{ textDecoration: 'none' }}>
                  View Inventory
                </button>
              </li>
              <li>
                <button
                  className="text-white btn btn-link"
                  onClick={() => setActiveSection('inventory-delete')}
                  style={{ textDecoration: 'none' }}>
                  Delete Inventory
                </button>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>

        {/* Reports Accordion */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>Reports</Accordion.Header>
          <Accordion.Body>
            <ul className="list-unstyled">
              <li>
                <button
                  className="text-white btn btn-link"
                  onClick={() => setActiveSection('reports-upload')}
                  style={{ textDecoration: 'none' }}>
                  Upload Reports
                </button>
              </li>
              <li>
                <button
                  className="text-white btn btn-link"
                  onClick={() => setActiveSection('reports-view')}
                  style={{ textDecoration: 'none' }}>
                  View Reports
                </button>
              </li>
              <li>
                <button
                  className="text-white btn btn-link"
                  onClick={() => setActiveSection('reports-delete')}
                  style={{ textDecoration: 'none' }}>
                  Delete Reports
                </button>
              </li>
            </ul>
          </Accordion.Body>
        </Accordion.Item>

        {/* Settings Link */}
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/settings" className="nav-link text-white">Settings</Link>
          </li>
        </ul>
      </Accordion>
    </div>
  );
};

export default Sidebar;
