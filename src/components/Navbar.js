// Navbar.js
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Slider from "./Slider";
import TotalBlocks from "./TotalBlocks";
import "../css/global.css";
import "../css/latte.css";
import "../css/mocha.css";
import ThemeManager from "./ThemeManager";

const Navbar = ({
  filteredColors,
  collection,
  blockSize,
  setBlockSize,
}) => {
  const location = useLocation();

  const totalBlocks =
    location.pathname === "/collection"
      ? collection.length
      : location.pathname === "/"
      ? 0
      : filteredColors.length;

  return (
    <div className="navbar-container">
      {/* Navigation */}
      <nav>
        <div className="displayed-colors">
          <TotalBlocks total={totalBlocks} />
        </div>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-link active-nav-link" : "nav-link"
              }
            >
              ~/
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/palette"
              className={({ isActive }) =>
                isActive ? "nav-link active-nav-link" : "nav-link"
              }
            >
              palette/
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/collection"
              className={({ isActive }) =>
                isActive ? "nav-link active-nav-link" : "nav-link"
              }
            >
              collection/
            </NavLink>
          </li>
        </ul>
        <div className="slider-theme-container">
          <Slider
            blockSize={blockSize}
            handleBlockSizeChange={(e) => {
              const newSize = e.target.value;
              setBlockSize(newSize);
              localStorage.setItem("blockSize", newSize);
            }}
          />
          <ThemeManager />{" "}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
