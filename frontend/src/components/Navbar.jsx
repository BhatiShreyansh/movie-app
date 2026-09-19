import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="logo-icon">🎬</span>
        <h1>CineVerse</h1>
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
