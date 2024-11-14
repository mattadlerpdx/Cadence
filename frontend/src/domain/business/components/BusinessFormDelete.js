import React, { useState } from "react";
import { deleteBusiness } from "../services/businessService";

const BusinessFormDelete = ({ setBusinessData, onDelete }) => {
  const [businessId, setBusinessId] = useState(""); // Local state for businessId

  const handleDelete = async () => {
    await deleteBusiness(businessId, setBusinessData);
    onDelete(); // Switch to BusinessList view after deletion
  };

  return (
    <>
      <h1>Delete Business</h1>
      <div className="mb-3">
        <label htmlFor="businessId" className="form-label">Enter Business ID:</label>
        <input
          type="number"
          id="businessId"
          value={businessId}
          onChange={(e) => setBusinessId(e.target.value)} // Update local state on input change
          className="form-control"
        />
      </div>
      <button onClick={handleDelete} className="btn btn-danger mt-2">
        Delete Business
      </button>
    </>
  );
};

export default BusinessFormDelete;


