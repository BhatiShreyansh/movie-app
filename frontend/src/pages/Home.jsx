import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import TrailerModal from '../components/TrailerModal'; // Naya Trailer Modal
import './Home.css';

const Home = ({ searchQuery }) => {
  const [movies, setMovies] = useState([]);
  // Naya state: Kaunsi movie ka trailer open karna hai
  const [selectedTrailerMovie, setSelectedTrailerMovie] = useState(null);

  // Component load hote hi backend se data mangwana
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/movies');
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Backend Server band hai, isliye movies nahi aayi!");
      }
    };

    fetchMovies();
  }, []);

  // Pehli movie ko hero banner mein dikhana
  const featuredMovie = movies.length > 0 ? movies[0] : null;

  // Search filter
  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-container">
      
      {/* Hero Banner */}
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
              {/* Featured movie ka trailer play karna */}
              <button 
                className="play-btn"
                onClick={() => setSelectedTrailerMovie(featuredMovie)}
              >
                ▶ Watch Trailer
              </button>
              <button 
                className="info-btn"
                onClick={() => setSelectedTrailerMovie(featuredMovie)}
              >
                ℹ More Info
              </button>
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
            <MovieCard 
              key={movie._id} 
              movie={movie} 
              onWatchTrailer={(m) => setSelectedTrailerMovie(m)}
            /> 
          ))
        ) : (
          <div className="no-results">
            <h2>No movies found in Database! 😢</h2>
            <p>Pehle Postman se database mein kuch movies add karein.</p>
          </div>
        )}
      </div>

      {/* Trailer Modal Popup */}
      <TrailerModal 
        movie={selectedTrailerMovie} 
        onClose={() => setSelectedTrailerMovie(null)} 
      />
    </div>
  );
};

export default Home;
