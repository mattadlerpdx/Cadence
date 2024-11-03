// src/pages/Dashboard.jsx

import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import CSVReader from 'react-csv-reader'; // Handles CSV files
import * as XLSX from 'xlsx'; // Handles Excel files
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is included

const Dashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [activeSection, setActiveSection] = useState(''); // State to track the active section

  // Handle CSV File Upload
  const handleCSVUpload = (data) => {
    const labels = [];
    const values = [];

    // Assume the CSV file has two columns: label and value
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
  };

  // Handle Excel File Upload
  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

      handleCSVUpload(data); // Reusing CSV handler since the format is similar
    };

    reader.readAsBinaryString(file);
  };

  // Render content based on the active section
  const renderContent = () => {
    switch (activeSection) {
      case 'upload':
        return (
          <>
            <h1>Upload a File and See Data</h1>

            <div className="mb-3">
              <label htmlFor="fileUpload" className="form-label">Upload CSV/Excel</label>
              <CSVReader onFileLoaded={handleCSVUpload} className="form-control mb-2" />
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleExcelUpload}
                className="form-control"
              />
            </div>

            {/* Display chart if data is uploaded */}
            {chartData && (
              <div className="chart-container" style={{ height: '400px' }}>
                <Bar data={chartData} />
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div>
      {/* Navbar at the top */}
      <Navbar/>

      {/* Dashboard layout with sidebar and content */}
      <div className="d-flex">
        {/* Sidebar for navigation */}
        <Sidebar setActiveSection={setActiveSection} />

        {/* Main dashboard content */}
        <div className="p-4" style={{ flex: 1 }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;