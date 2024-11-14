// src/domains/inventory/services/inventoryService.js

// Fetch all inventory items from the backend
export const fetchInventory = async () => {
    const response = await fetch('/inventory'); // Adjusted to match the route without `/api`
    if (!response.ok) {
      throw new Error('Failed to fetch inventory');
    }
    return response.json(); // Returns the data from the response
  };
  
  // Fetch a single inventory item by ID from the backend
  export const fetchInventoryItemById = async (id) => {
    const response = await fetch(`/inventory/${id}`); // Adjusted to match the route with item ID
    if (!response.ok) {
      throw new Error(`Failed to fetch inventory item with id: ${id}`);
    }
    return response.json(); // Returns the single item data from the response
  };
  
  // Delete an inventory item by ID
  export const deleteInventory = async (id) => {
    const response = await fetch(`/inventory/${id}`, { // Adjusted to match the delete route with item ID
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete inventory');
    }
  };
  
  // Update an inventory item by ID
  export const updateInventory = async (id, updatedData) => {
    const response = await fetch(`/inventory/${id}`, { // Adjusted to match the update route with item ID
      method: 'PUT',
      body: JSON.stringify(updatedData), // Sending the updated data in the request body
      headers: {
        'Content-Type': 'application/json', // Specifying that we're sending JSON data
      },
    });
    if (!response.ok) {
      throw new Error('Failed to update inventory');
    }
    return response.json(); // Returns the updated inventory item data
  };
  
  // Add a new inventory item
  export const addInventoryItem = async (newItem) => {
    const response = await fetch('/inventory', { // Adjusted to match the POST route
      method: 'POST',
      body: JSON.stringify(newItem), // Sending the new inventory item in the request body
      headers: {
        'Content-Type': 'application/json', // Specifying that we're sending JSON data
      },
    });
    if (!response.ok) {
      throw new Error('Failed to add inventory item');
    }
    return response.json(); // Returns the created inventory item data
  };
  
  