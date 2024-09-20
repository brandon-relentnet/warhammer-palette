import React, { useState, useEffect } from "react";
import "animate.css"; // Import Animate.css

const TotalBlocks = ({ filteredColors }) => {
  const [displayedNumber, setDisplayedNumber] = useState(filteredColors);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (filteredColors !== displayedNumber) {
      setShouldAnimate(true); // Start animation immediately

      // Change the number mid-animation (e.g., after 0.5s)
      setTimeout(() => {
        setDisplayedNumber(filteredColors);
      }, 100); // This should match the mid-point of your animation

      // Stop the animation after it completes (e.g., after 1s)
      setTimeout(() => {
        setShouldAnimate(false); // End animation
      }, 500); // Adjust to the total animation duration
    }
  }, [filteredColors, displayedNumber]);

  return (
    <div className="total-blocks-container">
      <h4>
        #/
        <span
          className={`total-number animate__animated ${
            shouldAnimate ? "animate__jello" : ""
          }`}
        >
          {displayedNumber}
        </span>
      </h4>
    </div>
  );
};

export default TotalBlocks;
