// components/OverwriteConfirmationDialog.js

import React from "react";

function OverwriteConfirmation({
  collection,
  importedCollection,
  setCollection,
  setIsOverwrite,
}) {
  const confirmOverwrite = () => {
    setCollection(importedCollection); // Overwrite the current collection
    setIsOverwrite(false); // Close confirmation dialog
  };

  const cancelOverwrite = () => {
    const mergedCollection = [...collection];
    importedCollection.forEach((color) => {
      if (!mergedCollection.some((col) => col.name === color.name)) {
        mergedCollection.push(color);
      }
    });
    setCollection(mergedCollection); // Merge collections
    setIsOverwrite(false); // Close confirmation dialog
  };

  return (
    <div className="confirm-overwrite-container">
      <p>
        Do you want to overwrite your current collection with the imported
        collection?
      </p>
      <button onClick={confirmOverwrite}>Overwrite</button>
      <button onClick={cancelOverwrite}>Merge</button>
    </div>
  );
}

export default OverwriteConfirmation;
