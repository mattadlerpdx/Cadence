// src/domains/inventory/components/InventoryList.js

import React from 'react';

const InventoryList = ({ items, onDelete, onUpdate }) => {
  return (
    <div>
      <h2>Inventory List</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - Stock: {item.stock}
            <button onClick={() => onUpdate(item.id)}>Update</button>
            <button onClick={() => onDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryList;
