import axios from 'axios';

const API_URL = 'http://localhost:8080';  // This will be the base URL for your backend API

export const getInventory = async () => {
  try {
    const response = await axios.get(`${API_URL}/inventory`);
    return response.data;
  } catch (error) {
    console.error('Error fetching inventory:', error);
    throw error;
  }
};

