import React, { useState } from "react";
import ColorBlock from "./ColorBlock";
import "../css/styles.css";
import { useLocation } from "react-router-dom";
import OverwriteConfirmation from "./OverwriteConfirmation";

const ColorBlockDisplay = ({
  colors, // These are the filtered colors from palette or collection
  blockSize,
  collection, // Full collection
  setCollection,
  selectedColors,
  setSelectedColors,
}) => {
  const [removeMode, setRemoveMode] = useState(false);
  const [importedCollection, setImportedCollection] = useState([]);
  const [isOverwrite, setIsOverwrite] = useState(false);
  const location = useLocation(); // Get the current route

  // Check if the route is for the collection page
  const isCollectionPage = location.pathname === "/collection";

  // Handlers for collection management
  const handleRemoveClick = (color) => {
    if (removeMode) {
      const confirmed = window.confirm(
        `Are you sure you want to delete ${color.name}?`
      );
      if (confirmed) {
        handleRemoveFromCollection(color);
      }
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColors((prevColors) =>
      prevColors.includes(color)
        ? prevColors.filter((c) => c !== color)
        : [...prevColors, color]
    );
  };

  const handleAddToCollection = () => {
    const uniqueNewCollection = selectedColors.filter(
      (color) => !collection.some((col) => col.name === color.name)
    );
    const newCollection = [...collection, ...uniqueNewCollection];
    setCollection(newCollection);
    setSelectedColors([]);
  };

  const handleRemoveFromCollection = (colorToRemove) => {
    const updatedCollection = collection.filter(
      (color) => color.name !== colorToRemove.name
    );
    setCollection(updatedCollection);
  };

  const handleExportCollection = () => {
    const collectionJSON = JSON.stringify(collection, null, 2);
    const blob = new Blob([collectionJSON], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "collection.json";
    link.click();
  };

  const handleImportCollection = (newCollection) => {
    if (collection.length > 0) {
      setImportedCollection(newCollection);
      setIsOverwrite(true);
    } else {
      setCollection(newCollection);
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
    <div className="color-block-display-container">
      {isCollectionPage ? (
        <>
          <h2>Your Collection</h2>

          {isOverwrite && (
            <OverwriteConfirmation
              collection={collection}
              importedCollection={importedCollection}
              setCollection={setCollection}
              setIsOverwrite={setIsOverwrite}
            />
          )}

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

          {/* Display Filtered Collection */}
          <div className="collection-block-display">
            {colors.map((color) => (
              <ColorBlock
                key={color.name}
                color={color}
                isSelected={false} // No need to highlight selected colors here
                isAddedToCollection={false} // No need to gray out in collection
                handleColorSelect={() => handleRemoveClick(color)}
                blockSize={blockSize}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="color-block-display">
            {colors.map((color) => {
              const isAddedToCollection = collection.some(
                (collectedColor) => collectedColor.name === color.name
              );

              return (
                <ColorBlock
                  key={color.name}
                  color={color}
                  isSelected={selectedColors.includes(color)}
                  isAddedToCollection={isAddedToCollection}
                  handleColorSelect={handleColorSelect}
                  blockSize={blockSize}
                />
              );
            })}
          </div>

          <button
            className="add-to-collection-button-pushable"
            onClick={handleAddToCollection}
          >
            <span className="add-to-collection-button-shadow"></span>
            <span className="add-to-collection-button-edge"></span>
            <span className="add-to-collection-button-front text">
              + collection/
            </span>
          </button>
        </>
      )}
    </div>
  );
};

export default ColorBlockDisplay;
