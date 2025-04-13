import React from 'react';
import { categories } from './Categories';
import './Navbar.css'; // Import the CSS file

const Navbar = ({ activeCategory, setActiveCategory }) => {
  return (
    <nav className="navbar">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.name;
        return (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat.name)}
            className={`nav-button ${isActive ? 'active' : ''}`}
          >
            {cat.name}
            {isActive && <div className="active-underline" />}
          </button>
        );
      })}
    </nav>
  );
};

export default Navbar;