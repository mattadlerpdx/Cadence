import React from 'react';
import './App.css';
import Inventory from './Inventory';  // Import the Inventory component

function App() {
  return (
    <div className="App">
      <h1>Cadence Inventory</h1>
      <Inventory />  {/* Render the Inventory component */}
    </div>
  );
}

export default App;

