import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Papa from 'papaparse';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import * as XLSX from 'xlsx'; // Handles Excel files


import BusinessFormCreate from "../domain/business/components/BusinessFormCreate";
import BusinessFormUpdate from "../domain/business/components/BusinessFormUpdate";
import BusinessFormDelete from "../domain/business/components/BusinessFormDelete";
import BusinessList from "../domain/business/components/BusinessGetAll"; // Rename in import if used as BusinessList
import { fetchBusinessData } from "../domain/business/services/businessService";


const Dashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [fetchedData, setFetchedData] = useState(null); // State to store fetched data
  const [businessId, setBusinessId] = useState(''); // State to store the input business ID
  const [businessName, setBusinessName] = useState(''); // State to store business name
  const [businessOwner, setBusinessOwner] = useState(''); // State to store business owner
  const [businessContactInfo, setBusinessContactInfo] = useState(''); // State to store business contact info
  const [businessData, setBusinessData] = useState(null); // State for business data
  const [activeSection, setActiveSection] = useState("business-list"); // Default to showing the business list

  // Function to fetch data from the backend
  const handleFetchData = () => {
    fetchBusinessData(businessId, setFetchedData);
  };
  

  // Handle CSV File Upload using papaparse
  const handleCSVUpload = (file) => {
    Papa.parse(file, {
      complete: (result) => {
        const data = result.data;
        const labels = [];
        const values = [];

        data.forEach((row, index) => {
          if (index > 0) { // Skip the header row
            labels.push(row[0]);
            values.push(Number(row[1]));
          }
        });

        setChartData({
          labels,
          datasets: [
            {
              label: 'Uploaded Data',
              data: values,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
          ],
        });
      }
    });
  };

  // Handle Excel File Upload
  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const arrayBuffer = event.target.result;
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

      handleCSVUpload(data);
    };

    reader.readAsArrayBuffer(file);
  };

  /*
  // Handle creating a new business
  const handleCreateBusiness = async () => {
    if (!businessName || !businessOwner || !businessContactInfo) {
      alert("Please fill out all fields.");
      return;
    }

    const business = {
      name: businessName,
      owner: businessOwner,
      contact_info: businessContactInfo
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/business`, {
        method: 'POST',
        body: JSON.stringify(business),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error('Failed to create business');
      const data = await response.json();
      setBusinessData(data); // Store the created business data
      alert("Business created successfully");
    } catch (error) {
      console.error(error);
    }
  };


  // Handle updating an existing business
  const handleUpdateBusiness = async () => {
    if (!businessId || !businessName || !businessOwner || !businessContactInfo) {
      alert("Please fill out all fields.");
      return;
    }

    const business = {
      name: businessName,
      owner: businessOwner,
      contact_info: businessContactInfo
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/business/${businessId}`, {
        method: 'PUT',
        body: JSON.stringify(business),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error('Failed to update business');
      const data = await response.json();
      setBusinessData(data); // Store the updated business data
      alert("Business updated successfully");
    } catch (error) {
      console.error(error);
    }
  };

  // Handle deleting a business
  const handleDeleteBusiness = async () => {
    if (!businessId) {
      alert("Please enter a valid business ID to delete.");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/business/${businessId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete business');
      alert("Business deleted successfully");
      setBusinessData(null); // Clear business data after deletion
    } catch (error) {
      console.error(error);
    }
  };
  */

  // Render content based on the active section
  const renderContent = () => {
    switch (activeSection) {
      case 'upload':
        return (
          <>
            <h1>Upload a File and See Data</h1>
            <div className="mb-3">
              <label htmlFor="fileUpload" className="form-label">Upload CSV/Excel</label>
              <input
                type="file"
                accept=".csv"
                onChange={(e) => handleCSVUpload(e.target.files[0])}
                className="form-control mb-2"
              />
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleExcelUpload}
                className="form-control"
              />
            </div>

            {chartData && (
              <div className="chart-container" style={{ height: '400px' }}>
                <Bar data={chartData} />
              </div>
            )}
          </>
        );
      case 'fetch':
        return (
          <>
            <h1>Fetch Data from Backend</h1>
            <div className="mb-3">
              <label htmlFor="businessId" className="form-label">Enter Business ID:</label>
              <input
                type="number"
                id="businessId"
                value={businessId}
                onChange={(e) => setBusinessId(e.target.value)}
                className="form-control"
              />
            </div>
            <button onClick={handleFetchData} className="btn btn-primary">Fetch Data</button>

            {fetchedData && (
              <div>
                <h2>Fetched Data:</h2>
                <pre>{JSON.stringify(fetchedData, null, 2)}</pre>
              </div>
            )}
          </>
        );
      /*
  case 'business-create':
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
        <button onClick={handleCreateBusiness} className="btn btn-primary mt-2">Create Business</button>
      </>
    );
          case 'business-update':
    return (
      <>
        <h1>Update Business</h1>
        <div className="mb-3">
          <label htmlFor="businessId" className="form-label">Enter Business ID:</label>
          <input
            type="number"
            id="businessId"
            value={businessId}
            onChange={(e) => setBusinessId(e.target.value)}
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
        <button onClick={handleUpdateBusiness} className="btn btn-primary mt-2">Update Business</button>
      </>
    );
          case 'business-delete':
    return (
      <>
        <h1>Delete Business</h1>
        <div className="mb-3">
          <label htmlFor="businessId" className="form-label">Enter Business ID:</label>
          <input
            type="number"
            id="businessId"
            value={businessId}
            onChange={(e) => setBusinessId(e.target.value)}
            className="form-control"
          />
        </div>
        <button onClick={handleDeleteBusiness} className="btn btn-danger mt-2">Delete Business</button>
      </>
    );
    */
    case "business-create":
      return (
        <BusinessFormCreate
          setBusinessData={setBusinessData}
          onCreateComplete={() => setActiveSection("business-list")} // Show all businesses after creation
        />
      );
    

      case "business-update":
        return (
          <BusinessFormUpdate
            businessId={businessId}
            setBusinessData={setBusinessData}
          />
        );

        case "business-delete":
          return (
            <BusinessFormDelete
              businessId={businessId}
              setBusinessData={setBusinessData}
              onDelete={() => setActiveSection("business-list")} // Switch back to the list after delete
            />
          );
          case "business-getAll":
            return <BusinessList />; // Render BusinessList to show all businesses
  
        default:
          return <BusinessList />; // Render BusinessList directly to fetch and show data
    }
  };

  return (
    <div>
      <Navbar />
      <div className="d-flex">
        <Sidebar setActiveSection={setActiveSection} />
        <div className="p-4" style={{ flex: 1 }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;