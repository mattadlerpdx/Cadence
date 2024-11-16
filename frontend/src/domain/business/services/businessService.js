// src/domain/business/services/businessService.js

export const fetchBusinessData = async (businessId, setFetchedData) => {
    if (!businessId) {
      alert("Please enter a valid business ID.");
      return;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/business/${businessId}`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setFetchedData(data);
    } catch (error) {
      console.error(error);
    }
  };


  export const getAllBusinesses = async (setBusinesses, setError) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/businessAll`);
      if (!response.ok) {
        // Parse and log the error message
        const errorData = await response.json();
        console.error("Error fetching businesses:", errorData.error);
        setError(errorData.error); // Optionally set an error state to display in UI
        return;
      }
  
      const data = await response.json();
      setBusinesses(data);
    } catch (error) {
      console.error("Network error fetching businesses:", error);
      setError("Network error: Unable to retrieve businesses");
    }
  };
  


  export const createBusiness = async (business, setBusinessData, onComplete) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/business`, {
        method: "POST",
        body: JSON.stringify(business),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to create business");
  
      const data = await response.json();
      setBusinessData(data); // Update with created business data
      alert("Business created successfully");
  
      if (onComplete) onComplete(); // Trigger the callback after successful creation
    } catch (error) {
      console.error(error);
    }
  };
  

  export const updateBusiness = async (businessId, business, setBusinessData) => {
    if (!businessId || !business.name || !business.owner || !business.contact_info) {
      alert("Please fill out all fields.");
      return;
    }
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/business/${businessId}`, {
        method: "PUT",
        body: JSON.stringify(business),
        headers: { "Content-Type": "application/json" },
      });
  
      if (!response.ok) throw new Error("Failed to update business");
      const data = await response.json();
      setBusinessData(data); // Updates parent component's state
      alert("Business updated successfully");
    } catch (error) {
      console.error(error);
    }
  };
  

export const deleteBusiness = async (businessId, setBusinessData) => {
  if (!businessId) {
    alert("Please enter a valid business ID to delete.");
    return;
  }

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/business/${businessId}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete business");
    alert("Business deleted successfully");
    setBusinessData(null); // Clear business data after deletion
  } catch (error) {
    console.error(error);
  }
};

  
  