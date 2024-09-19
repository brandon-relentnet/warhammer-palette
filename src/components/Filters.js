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
      <h2>Filters</h2>
      {filterOptions.map((filter) => (
        <label key={filter}>
          <input
            type="checkbox"
            value={filter}
            onChange={() => handleFilterChange(filter)}
            checked={selectedFilters.includes(filter)}
          />
          {filter}
        </label>
      ))}
    </div>
  );
};

export default Filters;
