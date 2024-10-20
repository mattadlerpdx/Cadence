import React from 'react';
import { Carousel } from 'react-bootstrap';

const CarouselComponent = () => {
  return (
    <Carousel>
      <Carousel.Item interval={3000}>
        <div className="card p-4 shadow text-center">
          <h3>Automate Orders</h3>
          <p>Easily manage and automate packaging orders based on historical sales data.</p>
        </div>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <div className="card p-4 shadow text-center">
          <h3>Real-Time Inventory</h3>
          <p>Track your inventory in real time to prevent stockouts and ensure seamless operation.</p>
        </div>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <div className="card p-4 shadow text-center">
          <h3>Supplier Integration</h3>
          <p>Connect with suppliers directly and manage all your orders seamlessly.</p>
        </div>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselComponent;
