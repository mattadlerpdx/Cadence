import React, { useEffect, useState } from 'react';

const Inventory = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/inventory`);
        console.log('Response status:', response.status); // Check status
        console.log(`${process.env.REACT_APP_BACKEND_URL}/inventory`);
        console.log('Backend URL:', process.env.REACT_APP_BACKEND_URL);
        const data = await response.json();
        console.log('Fetched data:', data); // Log the data


        setItems(data);  // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    }
  
    fetchItems();
  }, []);
  

  return (
<div>
  <h1>Inventory</h1>
  <ul>
  {items.map((item) => (
    <li key={item.id}>
      {item.name}: {item.quantity}
    </li>
  ))}
</ul>
</div>

  );
};

export default Inventory;

