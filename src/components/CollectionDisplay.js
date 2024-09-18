import React from 'react';
import ColorBlock from './ColorBlock'; // Use the same ColorBlock component for consistent behavior

const CollectionDisplay = ({
  collection,
  removeMode,
  setRemoveMode,
  handleRemoveFromCollection,
  colorToRemove,
  setColorToRemove,
  handleExportCollection,
  handleImportCollection,
}) => {
  const handleRemoveClick = (color) => {
    if (removeMode) {
      setColorToRemove(color); // Set the color to remove
      const confirmed = window.confirm(`Are you sure you want to delete ${color.name}?`);
      if (confirmed) {
        handleRemoveFromCollection(color);
      }
    }
  };

  const handleFileImport = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const importedData = JSON.parse(e.target.result);
      handleImportCollection(importedData);
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ padding: '0 15%' }}> {/* Add 15% padding around the content */}
      <h2>Your Collection</h2>

      {/* Remove Mode Toggle */}
      <button onClick={() => setRemoveMode(!removeMode)}>
        {removeMode ? 'Disable Remove Mode' : 'Enable Remove Mode'}
      </button>

      {/* Export and Import Buttons */}
      <div>
        <button onClick={handleExportCollection}>Export Collection</button>
        <input type="file" accept="application/json" onChange={handleFileImport} />
      </div>

      {/* Display Collection */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0px' }}>
        {collection.map((color) => (
          <ColorBlock
            key={color.name}
            color={color}
            isSelected={false} // No need to highlight selected colors here
            isAddedToCollection={false} // No need to gray out in collection
            handleColorSelect={() => handleRemoveClick(color)} // Handle remove when clicked in remove mode
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionDisplay;
