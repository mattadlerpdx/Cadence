import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';  // Bootstrap components

const InventoryPage = () => {
  const [items, setItems] = useState([]);

  // Fetch inventory items from the backend
  useEffect(() => {
    axios.get('http://localhost:8080/inventory')  // Ensure this URL matches your backend setup
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the inventory data!', error);
      });
  }, []);

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Inventory</h1>
      <Row>
        {items.map(item => (
          <Col key={item.id} md={4} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  Quantity: {item.quantity}
                </Card.Text>
                <Button variant="primary">Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default InventoryPage;
