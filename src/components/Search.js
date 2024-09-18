import React, { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Ensure FontAwesome is available

const Search = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showInput, setShowInput] = useState(false); // State to toggle input field

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value); // Pass the updated search term to the parent component
  };

  const toggleInput = () => {
    setShowInput(!showInput); // Toggle the search input visibility
  };

  return (
    <div className="search-container" style={{ position: "relative" }}>
      {/* Search Icon */}
      <button className="search-button" onClick={toggleInput}>
        <i className="fas fa-search"></i>
      </button>

      {/* Conditional rendering of input field */}
      {showInput && (
        <input
          type="text"
          placeholder="Search by name or hex code"
          value={searchTerm}
          onChange={handleChange}
          className="search-input"
          style={{
            position: "absolute",
            left: "40px", // Position to the right of the search icon
            top: "50%",
            transform: "translateY(-50%)",
            width: "200px",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid var(--mocha-overlay1)", // Use your theme colors
            backgroundColor: "var(--mocha-surface1)",
            color: "var(--mocha-text)",
          }}
        />
      )}
    </div>
  );
};

export default Search;
