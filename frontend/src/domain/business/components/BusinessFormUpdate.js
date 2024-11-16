import React, { useState } from "react";
import { updateBusiness } from "../services/businessService";

const BusinessFormUpdate = ({ setBusinessData }) => {
  const [businessId, setBusinessId] = useState(""); // Local state for businessId
  const [businessName, setBusinessName] = useState("");
  const [businessOwner, setBusinessOwner] = useState("");
  const [businessContactInfo, setBusinessContactInfo] = useState("");

  const handleUpdate = () => {
    const business = {
      name: businessName,
      owner: businessOwner,
      contact_info: businessContactInfo,
    };
    updateBusiness(businessId, business, setBusinessData);
  };

  return (
    <>
      <h1>Update Business</h1>
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
      <input
        type="text"
        placeholder="Business Name"
        value={businessName}
        onChange={(e) => setBusinessName(e.target.value)}
        className="form-control"
      />
      <input
        type="text"
        placeholder="Owner"
        value={businessOwner}
        onChange={(e) => setBusinessOwner(e.target.value)}
        className="form-control"
      />
      <input
        type="text"
        placeholder="Contact Info"
        value={businessContactInfo}
        onChange={(e) => setBusinessContactInfo(e.target.value)}
        className="form-control"
      />
      <button onClick={handleUpdate} className="btn btn-primary mt-2">Update Business</button>
    </>
  );
};

export default BusinessFormUpdate;
