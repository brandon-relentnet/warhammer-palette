// components/routes/PaletteRoute.js
import React from "react";
import ColorBlockDisplay from "../ColorBlockDisplay"; // Import your ColorBlockDisplay component

const PaletteRoute = ({
  colors,
  collection,
  setCollection,
  selectedColors,
  setSelectedColors,
  blockSize,
}) => {
  return (
    <div className="palette-route-container">
      <ColorBlockDisplay
        colors={colors} // Pass the filtered colors for the palette
        collection={collection}
        setCollection={setCollection} // Allow adding/removing from collection
        selectedColors={selectedColors}
        setSelectedColors={setSelectedColors}
        blockSize={blockSize}
      />
    </div>
  );
};

export default PaletteRoute;
