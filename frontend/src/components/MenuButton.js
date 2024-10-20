import React, { useState } from 'react';
import { Navbar, Container, Nav, Collapse } from 'react-bootstrap';
import './MenuButton.css';  // Ensure this file exists in the same directory

const MenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleMenu} className="menu-toggle">
            <div className={`animated-icon ${isOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </Navbar.Toggle>
        </Container>
      </Navbar>

      <Collapse in={isOpen}>
        <div className="bg-light p-4">
          <Nav className="flex-column">
            <Nav.Link href="#link1">Link 1</Nav.Link>
            <Nav.Link href="#link2">Link 2</Nav.Link>
            <Nav.Link href="#link3">Link 3</Nav.Link>
          </Nav>
        </div>
      </Collapse>
    </>
  );
};

export default MenuButton;
