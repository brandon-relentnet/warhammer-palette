import React from 'react';
import ColorBlock from './ColorBlock';
import "../css/global.css";
import "../css/latte.css";
import "../css/mocha.css"; 

const ColorBlockDisplay = ({ colors, selectedColors, handleColorSelect, handleAddToCollection, collection, blockSize }) => {
  return (
    <div className='color-block-display-container'>
      <div className='color-block-display'>
        {colors.map((color) => {
          const isAddedToCollection = collection.some((collectedColor) => collectedColor.name === color.name);

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
        onClick={handleAddToCollection}
        style={{ position: 'fixed', bottom: '20px', right: '20px' }}
      >
        Add to Collection
      </button>
    </div>
  );
};

export default ColorBlockDisplay;
