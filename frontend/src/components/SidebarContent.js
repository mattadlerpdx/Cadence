import React from 'react';
import { Accordion, Nav } from 'react-bootstrap';

const SidebarContent = ({ setActiveSection }) => {
  return (
    <Accordion>
      {/* Business Management Accordion */}
      <Accordion.Item eventKey="3">
        <Accordion.Body>
          <Nav className="flex-column">
            <Nav.Link onClick={() => setActiveSection('business-getAll')}>Get All Businesses</Nav.Link>
            <Nav.Link onClick={() => setActiveSection('business-create')}>Create Business</Nav.Link>
            <Nav.Link onClick={() => setActiveSection('business-update')}>Update Business</Nav.Link>
            <Nav.Link onClick={() => setActiveSection('business-delete')}>Delete Business</Nav.Link>
            <Nav.Link onClick={() => setActiveSection('fetch')}>Fetch a Business</Nav.Link>
          </Nav>
        </Accordion.Body>
      </Accordion.Item>
      {/* Additional Accordions */}
      {/* ... */}
    </Accordion>
  );
};

export default SidebarContent;
