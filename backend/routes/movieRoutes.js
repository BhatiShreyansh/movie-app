const express = require('express');
const router = express.Router();
const { getMovies, addMovie } = require('../controllers/movieController');

// Jab koi '/api/movies' par GET request karega, toh getMovies function chalega
router.get('/', getMovies);

// Jab koi '/api/movies' par POST request karega, toh addMovie function chalega
router.post('/', addMovie);

module.exports = router;
