// Navbar.js
import React from "react";
import { NavLink } from "react-router-dom";
import Slider from "./Slider";
import "../css/styles.css";
import ThemeManager from "./ThemeManager";

const Navbar = ({ blockSize, setBlockSize }) => {
  return (
    <div className="navbar-container">
      {/* Navigation */}
      <nav>
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
