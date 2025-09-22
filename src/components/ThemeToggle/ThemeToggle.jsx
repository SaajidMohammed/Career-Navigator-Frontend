import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext.jsx';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  return (
    <button className="theme-toggle-button" onClick={toggleTheme}>
      {isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default ThemeToggle;