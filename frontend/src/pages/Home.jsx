import React from 'react';
import MovieCard from '../components/MovieCard';
import moviesData from '../movies.json';
import './Home.css';

// searchQuery prop App.jsx se aayega
const Home = ({ searchQuery }) => {
  const featuredMovie = moviesData[1] || moviesData[0];

  // Agar user kuch search kar raha hai toh movies filter karo, varna saari dikhao
  const filteredMovies = moviesData.filter(movie => 
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-container">
      
      {/* Agar user search nahi kar raha tabhi Hero Banner dikhao */}
      {!searchQuery && (
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
      )}
      
      <div className="section-header" style={{ marginTop: searchQuery ? '2rem' : '0' }}>
        {/* Agar search ho raha hai toh "Search Results" dikhao */}
        <h3>{searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Movies'}</h3>
        <div className="accent-line"></div>
      </div>

      <div className="movies-grid">
        {/* Agar movies hain toh dikhao, warna "No movies found" dikhao */}
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <div className="no-results">
            <h2>No movies found! 😢</h2>
            <p>Try searching for a different name.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
