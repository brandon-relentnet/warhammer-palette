import React from 'react';
import ColorBlock from './ColorBlock';

const ColorBlockDisplay = ({ colors, selectedColors, handleColorSelect, handleAddToCollection, collection }) => {
  return (
    <div style={{ padding: '0 15%' }}> {/* Add 15% padding around the content */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0px' }}>
        {colors.map((color) => {
          const isAddedToCollection = collection.some((collectedColor) => collectedColor.name === color.name);

          return (
            <ColorBlock
              key={color.name}
              color={color}
              isSelected={selectedColors.includes(color)}
              isAddedToCollection={isAddedToCollection}
              handleColorSelect={handleColorSelect}
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
