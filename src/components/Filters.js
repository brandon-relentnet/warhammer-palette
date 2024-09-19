import React, { useState, useEffect } from "react";
import TotalBlocks from "./TotalBlocks";
import { useLocation } from "react-router-dom";
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
  searchTerm,
}) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const location = useLocation(); // Get the current route
  const [filteredColors, setFilteredColors] = useState([]);

  // Determine if the current route is the collection page
  const isCollectionPage = location.pathname === "/collection";

  // Function to handle filter changes
  const handleFilterChange = (filter) => {
    const updatedFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter((f) => f !== filter)
      : [...selectedFilters, filter];

    setSelectedFilters(updatedFilters);
  };

  // Function to handle filtering logic (based on search term and filters)
  useEffect(() => {
    const currentDataSet = isCollectionPage ? collection : colorsData;
    const filtered = getFilteredColors(
      currentDataSet,
      searchTerm,
      selectedFilters
    );
    setFilteredColors(filtered);
    onFilteredColorsChange(filtered); // Pass the filtered colors back to parent
  }, [
    selectedFilters,
    searchTerm,
    colorsData,
    collection,
    onFilteredColorsChange,
    isCollectionPage,
  ]);

  return (
    <div className="side-navbar-container">
      <div className="displayed-colors">
        <TotalBlocks
          filteredColors={filteredColors} // Show filtered colors
          collection={collection} // Pass the collection prop
        />
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
