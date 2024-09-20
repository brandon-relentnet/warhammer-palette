import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TotalBlocks from "./TotalBlocks";
import { getFilteredColors } from "../helpers/colorHelpers"; // Import the filter helper

const filterOptions = [
  "base",
  "dry",
  "technical",
  "layer",
  "shade",
  "spray",
  "contrast",
  "air",
];

const Filters = ({
  colorsData,
  collection,
  onFilteredColorsChange,
  onFilteredCollectionChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false); // State to toggle search bar visibility
  const location = useLocation(); // Get the current route
  const [filteredColors, setFilteredColors] = useState([]);

  // Determine if the current route is the collection page
  const isCollectionPage = location.pathname === "/collection";
  const isHomePage = location.pathname === "/";

  // Function to handle filter changes
  const handleFilterChange = (filter) => {
    const updatedFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter((f) => f !== filter)
      : [...selectedFilters, filter];

    setSelectedFilters(updatedFilters);
  };

  // Function to handle search bar visibility
  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar); // Toggle the visibility of the search bar
  };

  // Function to handle filtering logic (based on search term and filters)
  useEffect(() => {
    const currentDataSet = isCollectionPage ? collection : colorsData; // Select the correct data set
    const filtered = getFilteredColors(
      currentDataSet,
      searchTerm,
      selectedFilters
    );

    setFilteredColors(filtered);

    // Pass the filtered colors or filtered collection back to the parent
    if (isCollectionPage) {
      onFilteredCollectionChange(filtered); // Filtered collection for collection page
    } else {
      onFilteredColorsChange(filtered); // Filtered colors for the palette
    }
  }, [
    selectedFilters,
    searchTerm,
    colorsData,
    collection,
    onFilteredColorsChange,
    onFilteredCollectionChange,
    isCollectionPage,
  ]);

  // Only render the filters if the current page is not the home page
  if (isHomePage) {
    return null;
  }

  return (
    <div className="side-navbar-container">
      {/* The search bar at the top */}
      <div
        className={`search-bar-wrapper animate__animated ${
          showSearchBar ? "animate__slideInDown show" : "animate__slideOutUp"
        }`}
      >
        <input
          type="text"
          placeholder="name || hex"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="displayed-colors-search">
        {/* Total blocks and search button side by side */}
        <TotalBlocks filteredColors={filteredColors.length} />
        <button className="search-button" onClick={toggleSearchBar}>
          {/* Conditionally apply class for active color change */}
          <i className={`fas fa-search ${showSearchBar ? "active" : ""}`}></i>
        </button>
      </div>

      <div className="filters-container">
        {filterOptions.map((filter) => (
          <label key={filter} className="checkbox-wrapper">
            <input
              type="checkbox"
              value={filter}
              onChange={() => handleFilterChange(filter)}
              checked={selectedFilters.includes(filter)}
            />
            <svg viewBox="0 0 35.6 35.6">
              <circle
                className="background"
                cx="17.8"
                cy="17.8"
                r="17.8"
              ></circle>
              <circle className="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
              <polyline
                className="check"
                points="11.78 18.12 15.55 22.23 25.17 12.87"
              ></polyline>
            </svg>
            <span>{filter}/</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filters;
