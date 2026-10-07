import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  // Browser ki tijori se check karo ki kya user logged in hai?
  const user = JSON.parse(localStorage.getItem('user'));

  // Logout ka logic
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="logo-icon">🎬</span>
          <h1>CineVerse</h1>
        </Link>
      </div>
      
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search movies by name..." 
          onChange={(e) => onSearch(e.target.value)} 
        />
      </div>

      <div className="navbar-links">
        <Link to="/" className="active">Home</Link>
        
        {/* Agar user logged in hai toh usko Watchlist aur Logout dikhao */}
        {user ? (
          <>
            <Link to="/watchlist">My Watchlist</Link>
            <span className="user-name" style={{ color: '#ff416c', fontWeight: 'bold' }}>Hi, {user.name}</span>
            <button className="login-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          /* Agar logged in nahi hai toh Login ka button dikhao */
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
