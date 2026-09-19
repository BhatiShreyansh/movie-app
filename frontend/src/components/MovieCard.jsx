import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={movie.poster} alt={movie.title} />
        <div className="overlay">
          <button className="watchlist-btn">❤️ Add to Watchlist</button>
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
