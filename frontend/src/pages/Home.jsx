import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import TrailerModal from '../components/TrailerModal';
import { API_BASE_URL } from '../config';
import './Home.css';

const Home = ({ searchQuery }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalMovies, setTotalMovies] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  
  // Trailer modal state
  const [selectedTrailerMovie, setSelectedTrailerMovie] = useState(null);

  // Pehli baar (Page 1) movies load karna
  useEffect(() => {
    const fetchInitialMovies = async () => {
      try {
        setLoading(true);
        // Backend se sirf 8 movies mangwayenge
        const response = await fetch(`${API_BASE_URL}/api/movies?page=1&limit=8`);
        const data = await response.json();

        if (data.movies) {
          // Pagination object format
          setMovies(data.movies);
          setHasMore(data.hasMore);
          setTotalMovies(data.totalMovies);
          setPage(1);
        } else {
          // Normal array fallback
          setMovies(data);
          setHasMore(false);
          setTotalMovies(data.length);
        }
      } catch (error) {
        console.error("Backend Server band hai, isliye movies nahi aayi!", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialMovies();
  }, []);

  // "Load More" button click hone par agla page mangwana
  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const response = await fetch(`${API_BASE_URL}/api/movies?page=${nextPage}&limit=8`);
      const data = await response.json();

      if (data.movies && data.movies.length > 0) {
        // Puraani movies ke aage nayi movies jod do (Spread operator ...)
        setMovies((prevMovies) => [...prevMovies, ...data.movies]);
        setPage(nextPage);
        setHasMore(data.hasMore);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Load more movies failed:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  // Pehli movie ko hero banner mein dikhana
  const featuredMovie = movies.length > 0 ? movies[0] : null;

  // Search filter (Loaded movies me se search karna)
  const filteredMovies = movies.filter((movie) =>
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
            <p>
              Experience the most thrilling adventure of the year. Add to your watchlist now and
              never miss a moment of cinematic brilliance.
            </p>
            <div className="hero-buttons">
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

      {/* Section Header */}
      <div className="section-header" style={{ marginTop: searchQuery ? '2rem' : '0' }}>
        <h3>{searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Movies'}</h3>
        <div className="accent-line"></div>
      </div>

      {/* Initial Loading Indicator */}
      {loading && movies.length === 0 ? (
        <div className="initial-loading">
          <div className="load-more-spinner large"></div>
          <p>Fetching movies from database...</p>
        </div>
      ) : (
        /* Movies Grid */
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
              <p>Pehle Postman ya Admin Dashboard se database mein kuch movies add karein.</p>
            </div>
          )}
        </div>
      )}

      {/* Load More Button & Status */}
      {!searchQuery && movies.length > 0 && (
        <div className="load-more-container">
          {hasMore ? (
            <button
              className="load-more-btn"
              onClick={handleLoadMore}
              disabled={loadingMore}
            >
              {loadingMore ? (
                <>
                  <span className="load-more-spinner"></span>
                  <span>Loading Movies...</span>
                </>
              ) : (
                <>
                  <span>Load More Movies 🍿</span>
                  <span className="movie-count-badge">
                    Showing {movies.length} of {totalMovies}
                  </span>
                </>
              )}
            </button>
          ) : (
            <div className="end-of-collection">
              <span className="end-icon">🎬</span>
              <p>
                You've reached the end! All <strong>{totalMovies}</strong> movies are loaded.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Trailer Modal Popup */}
      <TrailerModal
        movie={selectedTrailerMovie}
        onClose={() => setSelectedTrailerMovie(null)}
      />
    </div>
  );
};

export default Home;
