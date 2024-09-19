import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Filters from "./components/Filters";
import Search from "./components/Search";
import "./css/styles.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "./components/Navbar";
import HomeRoute from "./components/routes/HomeRoute"; // Import HomeRoute component
import PaletteRoute from "./components/routes/PaletteRoute"; // Import PaletteRoute component
import CollectionRoute from "./components/routes/CollectionRoute"; // Import CollectionRoute component
import colorsData from "./color_database.json";

function App() {
  const [filteredColors, setFilteredColors] = useState([]);
  const [filteredCollection, setFilteredCollection] = useState([]); // Filtered collection
  const [selectedColors, setSelectedColors] = useState([]);
  const [collection, setCollection] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [blockSize, setBlockSize] = useState(() => {
    const savedSize = localStorage.getItem("blockSize");
    return savedSize ? parseInt(savedSize, 10) : 150;
  });

  // Load stored collection from localStorage
  useEffect(() => {
    const storedCollection = localStorage.getItem("colorCollection");
    if (storedCollection) {
      setCollection(JSON.parse(storedCollection));
    }
  }, []);

  // Update localStorage whenever collection changes
  useEffect(() => {
    if (collection.length > 0) {
      localStorage.setItem("colorCollection", JSON.stringify(collection));
    }
  }, [collection]);

  // Load block size from localStorage
  useEffect(() => {
    const storedBlockSize = localStorage.getItem("blockSize");
    if (storedBlockSize) {
      setBlockSize(parseInt(storedBlockSize, 10));
    }
  }, []);

  return (
    <Router>
      <Navbar blockSize={blockSize} setBlockSize={setBlockSize} />
      <div className="filters-search-container">
        <Filters
          colorsData={colorsData}
          collection={collection}
          onFilteredColorsChange={setFilteredColors} // Update filtered palette
          onFilteredCollectionChange={setFilteredCollection} // Update filtered collection
          searchTerm={searchTerm}
        />
        <Search handleSearch={setSearchTerm} />
      </div>
      {/* Routing */}
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route
          path="/palette"
          element={
            <PaletteRoute
              colors={filteredColors}
              collection={collection}
              setCollection={setCollection}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              blockSize={blockSize}
            />
          }
        />
        <Route
          path="/collection"
          element={
            <CollectionRoute
              filteredCollection={filteredCollection}
              collection={collection}
              setCollection={setCollection}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              blockSize={blockSize}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
