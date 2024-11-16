import React, { useState, useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { FaChevronLeft } from 'react-icons/fa'; // Import left arrow for closing sidebar
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import BusinessFormCreate from "../domain/business/components/BusinessFormCreate";
import BusinessFormUpdate from "../domain/business/components/BusinessFormUpdate";
import BusinessFormDelete from "../domain/business/components/BusinessFormDelete";
import BusinessList from "../domain/business/components/BusinessGetAll";

const Dashboard = () => {
  // Sidebar and view state management
  const [activeSection, setActiveSection] = useState("business-list");
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);

  // Business-related states
  const [chartData, setChartData] = useState(null); // For future chart data integration
  const [fetchedData, setFetchedData] = useState(null); // For fetched data
  const [businessId, setBusinessId] = useState(""); // Selected business ID
  const [businessName, setBusinessName] = useState(""); // Business name for creation
  const [businessOwner, setBusinessOwner] = useState(""); // Business owner
  const [businessContactInfo, setBusinessContactInfo] = useState(""); // Contact info
  const [businessData, setBusinessData] = useState(null); // For created/updated business data

  // Handle mobile view responsiveness
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobileView(mobile);
      if (!mobile) setShowSidebar(true); // Always show sidebar in desktop view
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to render content based on the active section
  const renderContent = () => {
    switch (activeSection) {
      case 'business-create':
        return (
          <BusinessFormCreate
            setBusinessData={setBusinessData}
            onCreateComplete={() => setActiveSection("business-list")}
          />
        );
      case 'business-update':
        return (
          <BusinessFormUpdate
            businessId={businessId} // ID of the business to update
            setBusinessData={setBusinessData} // Function to update the state with the response
          />
        );

      case 'business-delete':
        return (
          <BusinessFormDelete
            businessId={businessId}
            setBusinessData={setBusinessData}
            onDelete={() => setActiveSection("business-list")}
          />
        );
      case 'business-getAll':
        return <BusinessList />; // Display list of all businesses
      default:
        return <BusinessList />; // Default to business list view
    }
  };

  return (
    <div>
      {/* Navbar */}
      <div className="sticky-top">
        <Navbar
          isMobileView={isMobileView}
          toggleSidebar={() => setShowSidebar(!showSidebar)}
        />
      </div>

      {/* Sidebar Offcanvas for Mobile View */}
      <Offcanvas
        show={showSidebar && isMobileView}
        onHide={() => setShowSidebar(false)}
        placement="start"
      >
        <Offcanvas.Header>
          {isMobileView && (
            <button
              className="btn btn-link text-white sidebar-close-btn"
              onClick={() => setShowSidebar(false)}
            >
              <FaChevronLeft />
            </button>
          )}
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Sidebar
            setActiveSection={(section) => {
              setActiveSection(section);
              setShowSidebar(false); // Hide sidebar when an item is selected in mobile view
            }}
          />
        </Offcanvas.Body>
      </Offcanvas>

      <div className="d-flex">
        {/* Sidebar for Desktop View */}
        {!isMobileView && (
          <div className="sidebar-container" style={{ position: 'relative', width: '250px' }}>
            <Sidebar setActiveSection={setActiveSection} />
          </div>
        )}

        {/* Main Content Area */}
        <div className="content-container p-4" style={{ flex: 1 }}>
          {/* Render the content based on the active section */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
