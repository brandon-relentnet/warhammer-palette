import React from "react";
import { useLocation } from "react-router-dom";

const TotalBlocks = ({ filteredColors, collection }) => {
  const location = useLocation();

  // Display the correct total based on the current route
  const totalBlocks =
    location.pathname === "/collection"
      ? collection.length
      : filteredColors.length;

  return (
    <div className="total-blocks-container">
      <h4>
        #/<span className="total-number">{totalBlocks}</span>
      </h4>
    </div>
  );
};

export default TotalBlocks;
