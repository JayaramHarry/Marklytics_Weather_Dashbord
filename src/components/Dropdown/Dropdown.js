// Import React library and CSS for styling
import React from 'react';
import "./Dropdown.css"

// Define the Dropdown component
const Dropdown = ({ onChange }) => {
  // Handle the change event for the dropdown selection
  const handleLocationChange = (event) => {
    // Call the onChange function passed as a prop with the selected value
    onChange(event.target.value);
  };

  return (
    <div className="dropdown-container">
      <label>Select Location:</label>
      {/* Render a dropdown with options for different locations */}
      <select onChange={handleLocationChange}>
        <option value="New York">New York</option>
        <option value="London">London</option>
        <option value="Tokyo">Tokyo</option>
        <option value="Sydney">Sydney</option>
      </select>
    </div>
  );
};

export default Dropdown;
