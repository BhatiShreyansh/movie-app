import React from 'react';
import { toast } from 'react-toastify';
import './MovieCard.css';

const MovieCard = ({ movie }) => {

  // Watchlist me save karne ka function
  const handleSaveToWatchlist = async () => {
    // 1. Check karo ki user logged in hai ya nahi?
    const token = localStorage.getItem('token');
    
    if (!token) {
      toast.error('Please login to save movies! 🔒');
      return; // Agar login nahi hai, toh code yahin rok do
    }

    // 2. Logged-in user ke liye Watchlist me save karne ki Request bhejna
    try {
      const response = await fetch('http://localhost:5000/api/watchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Guard ko pass dikhana
        },
        body: JSON.stringify({ movieId: movie._id }) // Backend ki asali _id
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Movie saved to Watchlist! ❤️');
      } else {
        toast.info(data.message); // Agar movie pehle se save hai
      }
    } catch (error) {
      toast.error('Server is not responding!');
    }
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={movie.poster} alt={movie.title} />
        <div className="overlay">
          {/* Button par click hone se handleSaveToWatchlist call hoga */}
          <button className="watchlist-btn" onClick={handleSaveToWatchlist}>
            ❤️ Add to Watchlist
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <div className="movie-meta">
          <span className="year">{movie.year}</span>
          <span className="rating">⭐ {movie.rating}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
