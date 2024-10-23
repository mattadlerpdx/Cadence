// services/userService.js
const API_URL = 'http://localhost:8080';
export const registerUser = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/register`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to register user');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in registerUser:', error);
      throw error;
    }
  };
  
  export const loginWithGoogle = async (googleData) => {
    try {
      const response = await fetch(`${API_URL}/google-login`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: googleData.tokenId }),
      });
  
      if (!response.ok) {
        throw new Error('Google login failed');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in loginWithGoogle:', error);
      throw error;
    }
  };
  