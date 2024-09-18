import React from "react";

const TotalBlocks = ({ total }) => {
  return (
    <div className="total-blocks-container">
      <h4>
        #/<span className="total-number">{total}</span>
      </h4>
    </div>
  );
};

export default TotalBlocks;
