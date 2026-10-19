import React, { useEffect } from 'react';
import './TrailerModal.css';

// Fallback trailers agar movie ke pass apna trailer na ho
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

// 11-character Video ID nikaalne ka function
const extractVideoId = (trailerUrl, title) => {
  if (trailerUrl && typeof trailerUrl === 'string' && trailerUrl.trim() !== '') {
    let trimmed = trailerUrl.trim();

    // 1. Agar iframe tag paste kiya ho
    const iframeMatch = trimmed.match(/src=["'](.*?)["']/);
    if (iframeMatch) {
      trimmed = iframeMatch[1];
    }

    // 2. YouTube URL formats match karein (watch, shorts, youtu.be, embed)
    const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/|live\/))([\w-]{11})/;
    const match = trimmed.match(regExp);
    if (match && match[1]) {
      return match[1];
    }

    // 3. Agar direct 11-char ID di ho
    if (trimmed.length === 11) {
      return trimmed;
    }
  }

  // 4. Fallback check: title
  if (title) {
    const cleanTitle = title.toLowerCase().trim();
    for (const [key, videoId] of Object.entries(FALLBACK_TRAILERS)) {
      if (cleanTitle.includes(key)) {
        return videoId;
      }
    }
  }

  // Default Fallback ID
  return 'YoHD9XEInc0';
};

const TrailerModal = ({ movie, onClose }) => {
  // Escape key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!movie) return null;

  const videoId = extractVideoId(movie.trailer, movie.title);
  // Privacy-friendly youtube-nocookie domain jo localhost par block nahi hota
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&enablejsapi=1`;
  const youtubeDirectUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return (
    <div className="trailer-backdrop" onClick={onClose}>
      <div className="trailer-modal" onClick={(e) => e.stopPropagation()}>
        <div className="trailer-modal-header">
          <div className="trailer-modal-info">
            <span className="trailer-badge">🎬 Official Trailer</span>
            <h3>{movie.title}</h3>
            <span className="trailer-year">{movie.year}</span>
          </div>
          
          <div className="trailer-header-actions">
            {/* Agar browser ya Adblocker iframe ko block kare toh direct YouTube link */}
            <a 
              href={youtubeDirectUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="open-yt-btn"
              title="Open directly on YouTube"
            >
              YouTube ↗
            </a>
            <button className="trailer-close-btn" onClick={onClose} title="Close Trailer">
              ✕
            </button>
          </div>
        </div>

        <div className="trailer-video-container">
          <iframe
            src={embedUrl}
            title={`${movie.title} Trailer`}
            frameBorder="0"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
