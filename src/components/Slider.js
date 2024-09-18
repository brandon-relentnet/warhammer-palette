import React from "react";

const Slider = ({ blockSize, handleBlockSizeChange }) => {
  return (
    <div className="slider-container">
      <input
        type="range"
        id="block-size-slider"
        min="50"
        max="300"
        step="1"
        value={blockSize}
        onChange={handleBlockSizeChange}
      />
    </div>
  );
};

export default Slider;
