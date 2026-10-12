import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import './Home.css';
// import moviesData from '../movies.json'; -> Ye fake data ab hata diya gaya hai!

const Home = ({ searchQuery }) => {
  // Naya state: Asali movies store karne ke liye
  const [movies, setMovies] = useState([]);

  // Component load hote hi backend se data mangwana
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/movies');
        const data = await response.json();
        setMovies(data); // Backend se aayi asali movies yahan save kar li
      } catch (error) {
        console.error("Backend Server band hai, isliye movies nahi aayi!");
      }
    };

    fetchMovies();
  }, []); // Khali array matlab sirf ek baar mangwana hai

  // Pehli movie ko hero banner mein dikhana
  const featuredMovie = movies.length > 0 ? movies[0] : null;

  // Search filter
  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-container">
      
      {/* Agar search nahi ho raha aur kam-se-kam 1 movie hai, tabhi Banner dikhao */}
      {!searchQuery && featuredMovie && (
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
        <h3>{searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Movies'}</h3>
        <div className="accent-line"></div>
      </div>

      <div className="movies-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            // Dhyan rakhein, asali database ki ID ko '_id' likhte hain
            <MovieCard key={movie._id} movie={movie} /> 
          ))
        ) : (
          <div className="no-results">
            <h2>No movies found in Database! 😢</h2>
            <p>Pehle Postman se database mein kuch movies add karein.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
