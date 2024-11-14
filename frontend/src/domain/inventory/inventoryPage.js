// src/domains/inventory/inventoryPage.js

import React, { useState, useEffect } from 'react';
import InventoryList from './components/InventoryList';
import InventoryForm from './components/InventoryForm';
import { fetchInventory, deleteInventory, updateInventory } from './services/inventoryService'; // Import services

const InventoryPage = ({ section }) => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null); // State to store selected item for updating

  useEffect(() => {
    const loadInventory = async () => {
      try {
        const data = await fetchInventory();
        setInventoryItems(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    loadInventory();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteInventory(id);
      setInventoryItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      const updatedItem = await updateInventory(updatedData.id, updatedData);
      setInventoryItems((prevItems) =>
        prevItems.map((item) => (item.id === updatedData.id ? updatedItem : item))
      );
      setSelectedItem(null); // Clear selected item after update
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item); // Set selected item for editing
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {section === 'inventory-upload' && <InventoryForm onSave={handleUpdate} />}
      
      {section === 'inventory-view' && (
        <InventoryList
          items={inventoryItems}
          onDelete={handleDelete}
          onUpdate={handleEdit} // Pass handleEdit to select item for updating
        />
      )}

      {
      section === 'inventory-update' && selectedItem && (
        <InventoryForm
          onSave={(updatedData) => handleUpdate({ ...selectedItem, ...updatedData })}
        />
      )}

      {section === 'inventory-delete' && (
        <InventoryList items={inventoryItems} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default InventoryPage;

