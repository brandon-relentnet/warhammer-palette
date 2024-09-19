// src/components/Filters.js
import React, { useState } from "react";

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

const Filters = ({ onFilterChange }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterChange = (filter) => {
    const updatedFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter((f) => f !== filter)
      : [...selectedFilters, filter];

    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters); // Notify parent of the change
  };

  return (
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
          <span>{filter}/</span> {/* Add the label text in a span */}
        </label>
      ))}
    </div>
  );
};

export default Filters;
