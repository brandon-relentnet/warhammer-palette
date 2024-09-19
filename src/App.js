import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Filters from "./components/Filters";
import ColorBlockDisplay from "./components/ColorBlockDisplay";
import CollectionDisplay from "./components/CollectionDisplay";
import Search from "./components/Search";
import { getFilteredColors } from "./helpers/colorHelpers";

import "./css/global.css";
import "./css/latte.css";
import "./css/mocha.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import OverwriteConfirmation from "./components/OverwriteConfirmation";

function App() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [collection, setCollection] = useState([]);
  const [removeMode, setRemoveMode] = useState(false);
  const [colorToRemove, setColorToRemove] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOverwrite, setIsOverwrite] = useState(false);
  const [importedCollection, setImportedCollection] = useState([]);
  const [blockSize, setBlockSize] = useState(() => {
    const savedSize = localStorage.getItem("blockSize");
    return savedSize ? parseInt(savedSize, 10) : 150;
  });

  useEffect(() => {
    const storedBlockSize = localStorage.getItem("blockSize");
    if (storedBlockSize) {
      setBlockSize(parseInt(storedBlockSize, 10));
    }
  }, []);

  useEffect(() => {
    const storedCollection = localStorage.getItem("colorCollection");
    if (storedCollection) {
      setCollection(JSON.parse(storedCollection));
    }
  }, []);

  useEffect(() => {
    if (collection.length > 0) {
      localStorage.setItem("colorCollection", JSON.stringify(collection));
    }
  }, [collection]);

  const handleFilterChange = (newFilters) => {
    setSelectedFilters(newFilters);
  };

  const handleColorSelect = (color) => {
    setSelectedColors((prevColors) =>
      prevColors.includes(color)
        ? prevColors.filter((c) => c !== color)
        : [...prevColors, color]
    );
  };

  const handleAddToCollection = () => {
    const uniqueNewCollection = selectedColors.filter(
      (color) => !collection.some((col) => col.name === color.name)
    );
    const newCollection = [...collection, ...uniqueNewCollection];
    setCollection(newCollection);
    setSelectedColors([]);
  };

  const handleRemoveFromCollection = (colorToRemove) => {
    const updatedCollection = collection.filter(
      (color) => color.name !== colorToRemove.name
    );
    setCollection(updatedCollection);
  };

  const handleExportCollection = () => {
    const collectionJSON = JSON.stringify(collection, null, 2);
    const blob = new Blob([collectionJSON], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "collection.json";
    link.click();
  };

  const handleImportCollection = (newCollection) => {
    if (collection.length > 0) {
      setImportedCollection(newCollection);
      setIsOverwrite(true);
    } else {
      setCollection(newCollection);
    }
  };

  // Get filtered colors for rendering
  const filteredColors = getFilteredColors(searchTerm, selectedFilters);

  return (
    <Router>
      <Navbar
        filteredColors={filteredColors}
        collection={collection}
        blockSize={blockSize}
        setBlockSize={setBlockSize}
      />

      {isOverwrite && (
        <OverwriteConfirmation
          collection={collection}
          importedCollection={importedCollection}
          setCollection={setCollection}
          setIsOverwrite={setIsOverwrite}
        />
      )}

      {/* Routing */}
      <Routes>
        <Route
          path="/"
          element={
            <div className="home-route-container">
              <Homepage />
            </div>
          }
        />
        <Route
          path="/palette"
          element={
            <div className="palette-route-container">
              <div className="filters-search-container">
                <Filters onFilterChange={handleFilterChange} />{" "}
                <Search handleSearch={setSearchTerm} />
              </div>
              <ColorBlockDisplay
                colors={filteredColors}
                selectedColors={selectedColors}
                handleColorSelect={handleColorSelect}
                handleAddToCollection={handleAddToCollection}
                collection={collection}
                blockSize={blockSize}
              />
            </div>
          }
        />
        <Route
          path="/collection"
          element={
            <div className="collection-route-container">
              <CollectionDisplay
                collection={collection}
                removeMode={removeMode}
                setRemoveMode={setRemoveMode}
                handleRemoveFromCollection={handleRemoveFromCollection}
                colorToRemove={colorToRemove}
                setColorToRemove={setColorToRemove}
                handleExportCollection={handleExportCollection}
                handleImportCollection={handleImportCollection}
                blockSize={blockSize}
              />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
