import React, { useEffect } from 'react';
import './TrailerModal.css';

// Known popular movie fallbacks (taaki puraani movies bina trailer field ke bhi chal sakein)
const FALLBACK_TRAILERS = {
  inception: 'YoHD9XEInc0',
  interstellar: 'zSWdZVtXT7E',
  'avengers: endgame': 'TcMBFSGVi1c',
  avengers: 'eOrNdBpGMv8',
  batman: 'mqqft2x_Aa4',
  'the batman': 'mqqft2x_Aa4',
  'the dark knight': 'EXeTwQWrcwY',
  joker: 'zAGVQLHvwOY',
  oppenheimer: 'uYPbbksJxIg',
  dune: 'n9xhJrPXop4'
};

// YouTube Link ya ID se direct Embed URL nikalne ka helper
const getEmbedUrl = (trailerUrl, title) => {
  // 1. Agar movie ke pass apna trailer URL/ID hai
  if (trailerUrl && typeof trailerUrl === 'string' && trailerUrl.trim() !== '') {
    const trimmed = trailerUrl.trim();
    // YouTube link formats match karein:
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = trimmed.match(regExp);

    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0`;
    }
    // Agar direct 11-char ID di hai (jaise "YoHD9XEInc0")
    if (trimmed.length === 11) {
      return `https://www.youtube.com/embed/${trimmed}?autoplay=1&rel=0`;
    }
  }

  // 2. Fallback check: movie title match
  if (title) {
    const cleanTitle = title.toLowerCase().trim();
    for (const [key, videoId] of Object.entries(FALLBACK_TRAILERS)) {
      if (cleanTitle.includes(key)) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
      }
    }
  }

  // 3. Default blockbuster trailer fallback (Inception)
  return 'https://www.youtube.com/embed/YoHD9XEInc0?autoplay=1&rel=0';
};

const TrailerModal = ({ movie, onClose }) => {
  // Keyboard Escape key dabane se modal band hona
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!movie) return null;

  const embedUrl = getEmbedUrl(movie.trailer, movie.title);

  return (
    <div className="trailer-backdrop" onClick={onClose}>
      <div className="trailer-modal" onClick={(e) => e.stopPropagation()}>
        <div className="trailer-modal-header">
          <div className="trailer-modal-info">
            <span className="trailer-badge">🎬 Official Trailer</span>
            <h3>{movie.title}</h3>
            <span className="trailer-year">{movie.year}</span>
          </div>
          <button className="trailer-close-btn" onClick={onClose} title="Close Trailer">
            ✕
          </button>
        </div>

        <div className="trailer-video-container">
          <iframe
            src={embedUrl}
            title={`${movie.title} Trailer`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
