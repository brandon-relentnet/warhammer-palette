import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Filters from "./components/Filters";
import ColorBlockDisplay from "./components/ColorBlockDisplay";
import CollectionDisplay from "./components/CollectionDisplay";
import Search from "./components/Search";
import colorsData from "./color_database.json";
import "./css/global.css";
import "./css/latte.css";
import "./css/mocha.css"; 
import "@fortawesome/fontawesome-free/css/all.min.css";

const filterOptions = [
  "base",
  "dry",
  "technical",
  "layer",
  "shade",
  "spray",
  "contrast",
  "air",
];

// Helper function to convert hex to HSL
function hexToHSL(hex) {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16);  // Correct slicing
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
      default: break;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

// Function to sort colors by HSL values
function sortColorsByHSL(colors) {
  return colors.sort((a, b) => {
    const hslA = hexToHSL(a.hexCode);
    const hslB = hexToHSL(b.hexCode);
    if (hslA.h !== hslB.h) return hslA.h - hslB.h;
    if (hslA.s !== hslB.s) return hslA.s - hslB.s;
    return hslA.l - hslB.l;
  });
}

function App() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [collection, setCollection] = useState([]);
  const [removeMode, setRemoveMode] = useState(false);
  const [colorToRemove, setColorToRemove] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term
  const [isOverwrite, setIsOverwrite] = useState(false); // State for overwrite confirmation
  const [importedCollection, setImportedCollection] = useState([]); // Temporarily hold the imported collection
  const [theme, setTheme] = useState("mocha"); // State for managing the theme

  // Load collection from localStorage on initial load
  useEffect(() => {
    const storedCollection = localStorage.getItem("colorCollection");
    if (storedCollection) {
      setCollection(JSON.parse(storedCollection));
    }
  }, []);

  // Save collection to localStorage whenever it updates
  useEffect(() => {
    if (collection.length > 0) {
      localStorage.setItem("colorCollection", JSON.stringify(collection));
    }
  }, [collection]);

  // Apply the theme to the body immediately when the app loads
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Toggle theme between Mocha and Latte
  const toggleTheme = () => {
    const newTheme = theme === "mocha" ? "latte" : "mocha";
    setTheme(newTheme);
    document.body.className = newTheme; // Apply the theme class to the body element
  };

  const handleFilterChange = (filter) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter]
    );
  };

  const handleColorSelect = (color) => {
    setSelectedColors((prevColors) =>
      prevColors.includes(color)
        ? prevColors.filter((c) => c !== color)
        : [...prevColors, color]
    );
  };

  const handleAddToCollection = () => {
    // Avoid adding duplicate colors to the collection
    const uniqueNewCollection = selectedColors.filter(
      (color) => !collection.some((col) => col.name === color.name)
    );
    const newCollection = [...collection, ...uniqueNewCollection];
    setCollection(newCollection);
    setSelectedColors([]); // Clear selected colors after adding to collection
  };

  const handleRemoveFromCollection = (colorToRemove) => {
    const updatedCollection = collection.filter(
      (color) => color.name !== colorToRemove.name
    );
    setCollection(updatedCollection);
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase()); // Update search term in lower case
  };

  // Export collection as JSON file
  const handleExportCollection = () => {
    const collectionJSON = JSON.stringify(collection, null, 2);
    const blob = new Blob([collectionJSON], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "collection.json";
    link.click();
  };

  // Handle imported collection, prompt user for confirmation
  const handleImportCollection = (newCollection) => {
    if (collection.length > 0) {
      setImportedCollection(newCollection); // Save the imported collection temporarily
      setIsOverwrite(true); // Show the overwrite confirmation dialog
    } else {
      setCollection(newCollection); // If the current collection is empty, just import it
    }
  };

  // Confirm overwrite action
  const confirmOverwrite = () => {
    setCollection(importedCollection); // Overwrite the current collection
    setIsOverwrite(false); // Close confirmation dialog
  };

  // Cancel overwrite action (merge collections instead)
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

  const filteredColors = sortColorsByHSL(
    colorsData.filter((color) => {
      const matchesSearch =
        color.name.toLowerCase().includes(searchTerm) ||
        color.hexCode.toLowerCase().includes(searchTerm);

      // Ensure color.type is always an array and standardize to lowercase
      const colorTypes = color.type
        ? (Array.isArray(color.type) ? color.type : [color.type]).map((type) =>
            type.toLowerCase()
          ) // convert to lowercase for comparison
        : [];

      // If no filters are selected, display all colors that match the search term
      if (selectedFilters.length === 0) {
        return matchesSearch;
      }

      // Standardize selected filters to lowercase and match against color type
      const normalizedSelectedFilters = selectedFilters.map((filter) =>
        filter.toLowerCase()
      );

      // Check if any of the color's types match any of the selected filters
      const matchesFilter = normalizedSelectedFilters.some((filter) =>
        colorTypes.includes(filter)
      );

      // Return true if the color matches both the search term and any selected filter
      return matchesSearch && matchesFilter;
    })
  );

  return (
    <Router>
      <div>
        {/* Navigation */}
        <nav>
          <ul>
            <li>
              <Link to="/">/palette</Link>
            </li>
            <li>
              <Link to="/collection">/collection</Link>
            </li>
          </ul>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "mocha" ? (
              <i className="fas fa-sun"></i>
            ) : (
              <i className="fas fa-moon"></i>
            )}
          </button>
        </nav>

        {/* Overwrite Confirmation Dialog */}
        {isOverwrite && (
          <div className="confirm-overwrite-dialog">
            <p>
              Do you want to overwrite your current collection with the imported
              collection?
            </p>
            <button onClick={confirmOverwrite}>Overwrite</button>
            <button onClick={cancelOverwrite}>Merge</button>
          </div>
        )}

        {/* Show the count of displayed colors */}
        <div>
          <h4>Displayed Colors: {filteredColors.length}</h4>
        </div>

        {/* Routing */}
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Filters
                  selectedFilters={selectedFilters}
                  handleFilterChange={handleFilterChange}
                  filterOptions={filterOptions}
                />
                <Search handleSearch={handleSearch} />
                <ColorBlockDisplay
                  colors={filteredColors}
                  selectedColors={selectedColors}
                  handleColorSelect={handleColorSelect}
                  handleAddToCollection={handleAddToCollection}
                  collection={collection} // Pass collection to check if color is added
                />
              </div>
            }
          />
          <Route
            path="/collection"
            element={
              <CollectionDisplay
                collection={collection}
                removeMode={removeMode}
                setRemoveMode={setRemoveMode}
                handleRemoveFromCollection={handleRemoveFromCollection}
                colorToRemove={colorToRemove}
                setColorToRemove={setColorToRemove}
                handleExportCollection={handleExportCollection}
                handleImportCollection={handleImportCollection}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
