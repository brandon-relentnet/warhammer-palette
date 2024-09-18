import React from 'react';
import ColorBlock from './ColorBlock'; // Use the same ColorBlock component for consistent behavior
import "../css/global.css";
import "../css/latte.css";
import "../css/mocha.css"; 

const CollectionDisplay = ({
  collection,
  removeMode,
  setRemoveMode,
  handleRemoveFromCollection,
  colorToRemove,
  setColorToRemove,
  handleExportCollection,
  handleImportCollection,
  blockSize,
}) => {
  const handleRemoveClick = (color) => {
    if (removeMode) {
      setColorToRemove(color); // Set the color to remove
      const confirmed = window.confirm(
        `Are you sure you want to delete ${color.name}?`
      );
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
    <div className="collection-display-container">
      <h2>Your Collection</h2>

      {/* Remove Mode Toggle */}
      <button onClick={() => setRemoveMode(!removeMode)}>
        {removeMode ? "Disable Remove Mode" : "Enable Remove Mode"}
      </button>

      {/* Export and Import Buttons */}
      <div>
        <button onClick={handleExportCollection}>Export Collection</button>
        <input
          type="file"
          accept="application/json"
          onChange={handleFileImport}
        />
      </div>

      {/* Display Collection */}
      <div className="collection-block-display">
        {collection.map((color) => (
          <ColorBlock
            key={color.name}
            color={color}
            isSelected={false} // No need to highlight selected colors here
            isAddedToCollection={false} // No need to gray out in collection
            handleColorSelect={() => handleRemoveClick(color)} // Handle remove when clicked in remove mode
            blockSize={blockSize}
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionDisplay;
