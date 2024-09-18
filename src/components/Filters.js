// Filters.js
import React from 'react';

const Filters = ({ selectedFilters, handleFilterChange, filterOptions }) => {
  return (
    <div className='filters-container'>
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
