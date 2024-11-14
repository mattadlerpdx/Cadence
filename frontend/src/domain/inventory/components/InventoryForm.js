// src/domains/inventory/components/InventoryForm.js

import React, { useState } from 'react';

const InventoryForm = ({ onSave }) => {
  const [inventoryName, setInventoryName] = useState('');
  const [inventoryStock, setInventoryStock] = useState('');

  const handleSubmit = () => {
    if (!inventoryName || !inventoryStock) {
      alert("Please fill out all fields.");
      return;
    }

    const updatedInventory = {
      name: inventoryName,
      stock: inventoryStock,
    };

    onSave(updatedInventory);
  };

  return (
    <div>
      <h3>Update Inventory</h3>
      <input
        type="text"
        value={inventoryName}
        onChange={(e) => setInventoryName(e.target.value)}
        placeholder="Inventory Item Name"
      />
      <input
        type="number"
        value={inventoryStock}
        onChange={(e) => setInventoryStock(e.target.value)}
        placeholder="Stock"
      />
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
};

export default InventoryForm;
