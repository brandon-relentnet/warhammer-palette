import React, { useState } from 'react';

const Search = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value); // Pass the updated search term to the parent component
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name or hex code"
        value={searchTerm}
        onChange={handleChange}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '20px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
    </div>
  );
};

export default Search;
