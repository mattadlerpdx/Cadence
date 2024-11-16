import React, { useEffect, useState } from "react";
import { getAllBusinesses } from "../services/businessService";

const BusinessList = () => {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    console.log("Calling getAllBusinesses from BusinessList...");
    getAllBusinesses(setBusinesses);
  }, []);

  useEffect(() => {
    console.log("Updated businesses state:", businesses); // Log updated state after fetch
  }, [businesses]);

  return (
    <div>
      <h1>All Businesses</h1>
      <ul>
        {businesses.map((business) => (
          <li key={business.id}>
           ID: {business.id} - Name: {business.name} - Owner: {business.owner} - Contact: {business.contact_info}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusinessList;
