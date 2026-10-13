import React from 'react';
import { toast } from 'react-toastify';
import './MovieCard.css';

const MovieCard = ({ movie, onWatchTrailer }) => {

  // Watchlist me save karne ka function
  const handleSaveToWatchlist = async (e) => {
    e.stopPropagation();
    const token = localStorage.getItem('token');
    
    if (!token) {
      toast.error('Please login to save movies! 🔒');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/watchlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ movieId: movie._id })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Movie saved to Watchlist! ❤️');
      } else {
        toast.info(data.message);
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
          <div className="overlay-buttons">
            <button 
              className="trailer-card-btn"
              onClick={(e) => {
                e.stopPropagation();
                if (onWatchTrailer) onWatchTrailer(movie);
              }}
            >
              ▶ Watch Trailer
            </button>
            <button className="watchlist-btn" onClick={handleSaveToWatchlist}>
              ❤️ Add to Watchlist
            </button>
          </div>
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
