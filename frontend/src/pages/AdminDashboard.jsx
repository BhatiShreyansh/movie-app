import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  // Form states
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [poster, setPoster] = useState('');
  const [rating, setRating] = useState('');
  const [trailer, setTrailer] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Movies list state
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Role-based Access Check & Fetch Movies
  useEffect(() => {
    // Agar login nahi hai ya user admin nahi hai
    if (!token || user?.role !== 'admin') {
      toast.error('Access Denied: Admins Only! ⛔');
      navigate('/');
      return;
    }

    fetchMovies();
  }, [token, navigate]);

  const fetchMovies = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/movies');
      const data = await response.json();
      if (response.ok) {
        setMovies(data);
      }
    } catch (error) {
      toast.error('Failed to load movies from backend');
    } finally {
      setLoading(false);
    }
  };

  // 2. Nayi Movie Add karne ka handler
  const handleAddMovie = async (e) => {
    e.preventDefault();
    if (!title || !year || !poster || !rating) {
      toast.error('Please fill in all required fields!');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Admin Guard Pass
        },
        body: JSON.stringify({
          title,
          year,
          poster,
          rating: Number(rating),
          trailer
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('🎬 Movie Added Successfully to Website!');
        // UI list me turant add karo
        setMovies(prev => [data.movie, ...prev]);
        // Form reset karo
        setTitle('');
        setYear('');
        setPoster('');
        setRating('');
        setTrailer('');
      } else {
        toast.error(data.message || data.error || 'Failed to add movie');
      }
    } catch (error) {
      toast.error('Server error while adding movie!');
    } finally {
      setSubmitting(false);
    }
  };

  // 3. Movie Delete karne ka handler
  const handleDeleteMovie = async (movieId, movieTitle) => {
    const confirmDelete = window.confirm(`Kya aap sach me "${movieTitle}" ko delete karna chahte hain?`);
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/movies/${movieId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`"${movieTitle}" deleted permanently! 🗑️`);
        setMovies(prev => prev.filter(m => m._id !== movieId));
      } else {
        toast.error(data.message || 'Delete failed');
      }
    } catch (error) {
      toast.error('Server error while deleting movie!');
    }
  };

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="admin-container">
      {/* Top Header */}
      <div className="admin-header">
        <div className="admin-title-group">
          <h2>👑 Admin Control Panel</h2>
          <p>Website par nayi movies live upload karein aur puraani movies manage karein.</p>
        </div>
        <div className="admin-badge-box">
          <span className="admin-badge">Admin Mode Active</span>
          <span className="admin-username">👤 {user.name}</span>
        </div>
      </div>

      <div className="admin-content-grid">
        {/* Form: Add New Movie */}
        <div className="admin-card add-movie-card">
          <div className="card-header">
            <h3>➕ Add New Movie (Live)</h3>
            <span className="info-tag">Instant Live Sync</span>
          </div>

          <form onSubmit={handleAddMovie} className="admin-form">
            <div className="form-row">
              <div className="form-group flex-2">
                <label>Movie Title *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Inception, The Nun, Avatar" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group flex-1">
                <label>Release Year *</label>
                <input 
                  type="text" 
                  placeholder="e.g. 2024" 
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group flex-1">
                <label>Rating (1 - 10) *</label>
                <input 
                  type="number" 
                  step="0.1" 
                  min="0" 
                  max="10" 
                  placeholder="e.g. 8.5" 
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Poster Image URL *</label>
              <input 
                type="url" 
                placeholder="https://image.tmdb.org/t/p/w500/... or Google image link" 
                value={poster}
                onChange={(e) => setPoster(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label>YouTube Trailer Link / Video ID</label>
              <input 
                type="text" 
                placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..." 
                value={trailer}
                onChange={(e) => setTrailer(e.target.value)}
              />
            </div>

            {/* Poster Live Preview */}
            {poster && (
              <div className="poster-preview-box">
                <p>Poster Live Preview:</p>
                <img 
                  src={poster} 
                  alt="Poster preview" 
                  onError={(e) => { e.target.style.display = 'none'; }}
                  onLoad={(e) => { e.target.style.display = 'block'; }}
                />
              </div>
            )}

            <button type="submit" className="submit-movie-btn" disabled={submitting}>
              {submitting ? 'Adding Movie to Database...' : '🚀 Publish Movie to Website'}
            </button>
          </form>
        </div>

        {/* Existing Movies List */}
        <div className="admin-card movie-list-card">
          <div className="card-header">
            <h3>🎬 Current Live Movies ({movies.length})</h3>
            <span className="info-tag">Database Records</span>
          </div>

          {loading ? (
            <p className="loading-text">Loading movies from database...</p>
          ) : movies.length > 0 ? (
            <div className="admin-movies-table">
              {movies.map((m) => (
                <div key={m._id} className="admin-movie-row">
                  <img src={m.poster} alt={m.title} className="table-poster" />
                  
                  <div className="table-movie-info">
                    <h4>{m.title}</h4>
                    <div className="table-meta">
                      <span>📅 {m.year}</span>
                      <span>⭐ {m.rating}</span>
                      {m.trailer && <span className="trailer-badge-pill">▶ Has Trailer</span>}
                    </div>
                  </div>

                  <div className="table-actions">
                    <button 
                      className="delete-movie-btn"
                      onClick={() => handleDeleteMovie(m._id, m.title)}
                      title="Permanently Delete Movie"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-movies-msg">No movies found in database. Add your first movie above!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
