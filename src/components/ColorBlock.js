import React, { useState } from "react";
import "../css/styles.css";
import { hexToRgba } from "../helpers/colorHelpers";

const ColorBlock = ({
  color,
  isSelected,
  isAddedToCollection,
  handleColorSelect,
  blockSize,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const blockClass = isAddedToCollection ? "color-block added" : "color-block";
  const selectedClass = isSelected ? "selected" : "";
  const fontSize = blockSize * 0.15;

  return (
    <div
      className={`${blockClass} ${selectedClass}`}
      onClick={() => !isAddedToCollection && handleColorSelect(color)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: color.hexCode,
        boxShadow: isHovered
          ? `0 10px 20px ${hexToRgba(color.hexCode)}`
          : "none", // Shadow based on hex code
        position: "relative",
        width: `${blockSize}px`,
        height: `${blockSize}px`,
      }}
    >
      <div
        className="color-info"
        style={{
          fontSize: `${fontSize}px`, // Set text size based on block size
        }}
      >
        <span className="color-name">{color.name}</span>
        <br />
        <span className="color-hex">{color.hexCode}</span>
      </div>

      {/* Single border overlay with opacity and transition */}
      <div
        className="border-overlay"
        style={{
          opacity: isHovered || isSelected ? 1 : 0,
        }}
      ></div>
    </div>
  );
};

export default ColorBlock;
