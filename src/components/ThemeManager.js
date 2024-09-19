// src/components/ThemeManager.js
import React, { useState, useEffect } from "react";

// Helper to get saved theme from localStorage (before render)
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  return savedTheme ? savedTheme : "mocha"; // Default to mocha if nothing is saved
};

const ThemeManager = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    const themes = ["mocha", "macchiato", "frappe", "latte"];
    const currentThemeIndex = themes.indexOf(theme);
    const newTheme = themes[(currentThemeIndex + 1) % themes.length];
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Save theme to localStorage
    document.body.className = newTheme; // Apply theme class to body
  };

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {theme === "mocha" ? (
        <i className="fas fa-palette"></i>
      ) : theme === "macchiato" ? (
        <i className="fas fa-cloud"></i>
      ) : theme === "frappe" ? (
        <i className="fas fa-sun"></i>
      ) : (
        <i className="fas fa-moon"></i>
      )}
    </button>
  );
};

export default ThemeManager;
