// components/routes/CollectionRoute.js
import React from "react";
import ColorBlockDisplay from "../ColorBlockDisplay"; // Import your ColorBlockDisplay component

const CollectionRoute = ({
  filteredCollection,
  collection,
  setCollection,
  selectedColors,
  setSelectedColors,
  blockSize,
}) => {
  return (
    <div className="collection-route-container">
      <ColorBlockDisplay
        colors={filteredCollection} // Pass the filtered collection
        collection={collection}
        setCollection={setCollection} // Allow removing from collection
        selectedColors={selectedColors}
        setSelectedColors={setSelectedColors}
        blockSize={blockSize}
      />
    </div>
  );
};

export default CollectionRoute;
