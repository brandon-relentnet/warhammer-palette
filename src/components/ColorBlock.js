import React, { useState } from "react";
import "../css/styles.css";
const hexToRgba = (hex, alpha = 0.5) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

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
      {/* Overlay for readability on hover */}
      <div
        className="hover-overlay"
        style={{
          opacity: isHovered || isSelected ? 1 : 0,
          
        }}
      ></div>

      <div className="color-info">
        <span className="color-name">{color.name}</span>
        <br />
        <span className="color-hex">{color.hexCode}</span>
      </div>

      {/* Border when hovered */}
      {isHovered && <div className="border-overlay"></div>}
    </div>
  );
};

export default ColorBlock;
