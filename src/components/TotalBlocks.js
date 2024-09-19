import React from "react";


const TotalBlocks = ({ filteredColors }) => {


  // Display the correct total based on the current route
  return (
    <div className="total-blocks-container">
      <h4>
        #/<span className="total-number">{filteredColors}</span>
      </h4>
    </div>
  );
};

export default TotalBlocks;
