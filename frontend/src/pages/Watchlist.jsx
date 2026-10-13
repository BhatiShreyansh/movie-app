import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import TrailerModal from '../components/TrailerModal'; // Trailer popup
import './Watchlist.css';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrailerMovie, setSelectedTrailerMovie] = useState(null);
  const navigate = useNavigate();

  // 1. User ki Watchlist Backend se load karna
  useEffect(() => {
    const token = localStorage.getItem('token');

    // Agar user logged in nahi hai toh Login page par bhejo
    if (!token) {
      toast.error('Please login to view your watchlist! 🔒');
      navigate('/login');
      return;
    }

    const fetchWatchlist = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/watchlist', {
          headers: {
            'Authorization': `Bearer ${token}` // Guard ko token dikhaya
          }
        });

        const data = await response.json();

        if (response.ok) {
          setWatchlist(data);
        } else {
          toast.error(data.message || 'Failed to fetch watchlist');
        }
      } catch (error) {
        toast.error('Server connection error!');
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [navigate]);

  // 2. Watchlist se Movie Delete karne ka function
  const handleRemove = async (watchlistId) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:5000/api/watchlist/${watchlistId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        // UI se turant wo movie hata do (bina page reload kiye)
        setWatchlist(prev => prev.filter(item => item._id !== watchlistId));
        toast.success('Movie removed from watchlist! 🗑️');
      } else {
        toast.error('Failed to remove movie');
      }
    } catch (error) {
      toast.error('Server error while removing!');
    }
  };

  if (loading) {
    return (
      <div className="watchlist-loading">
        <div className="spinner"></div>
        <p>Loading your favorite movies... 🍿</p>
      </div>
    );
  }

  return (
    <div className="watchlist-container">
      <div className="watchlist-header">
        <div className="watchlist-title-group">
          <h2>My Watchlist ❤️</h2>
          <span className="movie-count">
            {watchlist.length} {watchlist.length === 1 ? 'Movie' : 'Movies'} Saved
          </span>
        </div>
        <div className="accent-line"></div>
      </div>

      {watchlist.length > 0 ? (
        <div className="watchlist-grid">
          {watchlist.map((item) => {
            const movie = item.movie;
            if (!movie) return null; // Safety check

            return (
              <div key={item._id} className="watchlist-card">
                <div className="watchlist-poster">
                  <img src={movie.poster} alt={movie.title} />
                  <div className="watchlist-card-overlay">
                    <div className="watchlist-overlay-buttons">
                      <button 
                        className="watchlist-trailer-btn"
                        onClick={() => setSelectedTrailerMovie(movie)}
                      >
                        ▶ Watch Trailer
                      </button>
                      <button 
                        className="remove-btn"
                        onClick={() => handleRemove(item._id)}
                      >
                        🗑️ Remove
                      </button>
                    </div>
                  </div>
                </div>

                <div className="watchlist-info">
                  <h3>{movie.title}</h3>
                  <div className="watchlist-meta">
                    <span className="year">{movie.year}</span>
                    <span className="rating">⭐ {movie.rating}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="empty-watchlist">
          <div className="empty-icon">🍿</div>
          <h3>Your Watchlist is Empty!</h3>
          <p>You haven't saved any movies yet. Explore our collection and add your favorites!</p>
          <Link to="/" className="explore-btn">
            🎬 Explore Movies
          </Link>
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

export default Watchlist;
