import React from 'react';
import MovieCard from '../components/MovieCard';
import moviesData from '../movies.json';
import './Home.css';

const Home = () => {
  // Use a movie for the big featured hero banner
  const featuredMovie = moviesData[1] || moviesData[0];

  return (
    <div className="home-container">
      {/* Interactive Hero Banner */}
      <div 
        className="hero-section"
        style={{ backgroundImage: `url(${featuredMovie.poster})` }}
      >
        <div className="hero-overlay">
          <span className="trending-badge">🔥 Trending Now</span>
          <h2>{featuredMovie.title}</h2>
          <p>Experience the most thrilling adventure of the year. Add to your watchlist now and never miss a moment of cinematic brilliance.</p>
          <div className="hero-buttons">
            <button className="play-btn">▶ Watch Trailer</button>
            <button className="info-btn">ℹ More Info</button>
          </div>
        </div>
      </div>
      
      <div className="section-header">
        <h3>Popular Movies</h3>
        <div className="accent-line"></div>
      </div>

      <div className="movies-grid">
        {moviesData.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
