import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Filters from "./components/Filters";
import ColorBlockDisplay from "./components/ColorBlockDisplay";
import Search from "./components/Search";
import "./css/styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import HomeRoute from "./components/routes/HomeRoute";
import Navbar from "./components/Navbar";
import colorsData from "./color_database.json";

function App() {
  const [filteredColors, setFilteredColors] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [collection, setCollection] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [blockSize, setBlockSize] = useState(() => {
    const savedSize = localStorage.getItem("blockSize");
    return savedSize ? parseInt(savedSize, 10) : 150;
  });

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

  useEffect(() => {
    const storedBlockSize = localStorage.getItem("blockSize");
    if (storedBlockSize) {
      setBlockSize(parseInt(storedBlockSize, 10));
    }
  }, []);

  return (
    <Router>
      <Navbar blockSize={blockSize} setBlockSize={setBlockSize} />
      {/* Routing */}
      <Routes>
        <Route
          path="/"
          element={
            <div className="home-route-container">
              <HomeRoute />
            </div>
          }
        />
        <Route
          path="/palette"
          element={
            <div className="palette-route-container">
              <div className="filters-search-container">
                <Filters
                  colorsData={colorsData}
                  collection={collection}
                  onFilteredColorsChange={setFilteredColors} // Update filteredColors
                  searchTerm={searchTerm}
                />
                <Search handleSearch={setSearchTerm} />
              </div>
              <ColorBlockDisplay
                colors={filteredColors}
                collection={collection}
                setCollection={setCollection} // Allow adding/removing from collection
                selectedColors={selectedColors}
                setSelectedColors={setSelectedColors}
                blockSize={blockSize}
              />
            </div>
          }
        />
        <Route
          path="/collection"
          element={
            <div className="collection-route-container">
              <ColorBlockDisplay
                colors={filteredColors} // Still pass filtered colors
                collection={collection}
                setCollection={setCollection} // Allow removing from collection
                selectedColors={selectedColors}
                setSelectedColors={setSelectedColors}
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
