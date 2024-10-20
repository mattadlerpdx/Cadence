import axios from 'axios';

//const API_URL = 'https://cadence-backend-122826430682.us-west1.run.app';  // This will be the base URL for your backend API
const API_URL = 'http://localhost:8080';

export const getInventory = async () => {
  try {
    const response = await axios.get(`${API_URL}/inventory`);
    return response.data;
  } catch (error) {
    console.error('Error fetching inventory:', error);
    throw error;
  }
};

