// src/domains/inventory/hooks/useInventory.js

import { useState, useEffect } from 'react';
import { fetchInventory, deleteInventory, updateInventory } from '../services/inventoryService';

const useInventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch inventory items from the backend
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

  // Handle deleting an inventory item
  const handleDelete = async (id) => {
    try {
      await deleteInventory(id);
      setInventoryItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle updating an inventory item
  const handleUpdate = async (updatedData) => {
    try {
      const updatedItem = await updateInventory(updatedData.id, updatedData);
      setInventoryItems(prevItems =>
        prevItems.map(item => (item.id === updatedData.id ? updatedItem : item))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    inventoryItems,
    loading,
    error,
    handleDelete,
    handleUpdate,
  };
};

export default useInventory;
