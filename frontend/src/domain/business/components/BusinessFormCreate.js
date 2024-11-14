import React, { useState } from "react";
import { createBusiness } from "../services/businessService";

const BusinessFormCreate = ({ setBusinessData, onCreateComplete }) => {
  const [businessName, setBusinessName] = useState("");
  const [businessOwner, setBusinessOwner] = useState("");
  const [businessContactInfo, setBusinessContactInfo] = useState("");

  const handleCreate = () => {
    if (!businessName || !businessOwner || !businessContactInfo) {
      alert("Please fill out all fields.");
      return;
    }

    const business = {
      name: businessName,
      owner: businessOwner,
      contact_info: businessContactInfo,
    };

    createBusiness(business, setBusinessData, onCreateComplete);
  };

  return (
    <>
      <h1>Create Business</h1>
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
      <button onClick={handleCreate} className="btn btn-primary mt-2">
        Create Business
      </button>
    </>
  );
};

export default BusinessFormCreate;
