import React, { useEffect, useState } from 'react';
import { getInventory } from './services/inventoryService';

const Inventory = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchItems() {
      try {
        const data = await getInventory();
        setItems(data);
      } catch (error) {
        console.error("Error loading inventory:", error);
      }
    }

    fetchItems();
  }, []);

  return (
    <div>
      <h1>Inventory</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}: {item.quantity}</li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;



