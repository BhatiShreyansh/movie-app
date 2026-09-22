import React from 'react';
import './Navbar.css';

// onSearch ek function hai jo App.jsx se mila hai
const Navbar = ({ onSearch }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="logo-icon">🎬</span>
        <h1>CineVerse</h1>
      </div>
      
      {/* Search Bar */}
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search movies by name..." 
          onChange={(e) => onSearch(e.target.value)} 
        />
      </div>

      <div className="navbar-links">
        <a href="#home" className="active">Home</a>
        <a href="#watchlist">My Watchlist</a>
        <button className="login-btn">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
