const express = require('express');
const router = express.Router();
const { getMovies, addMovie, deleteMovie } = require('../controllers/movieController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// 1. Movies dekhna sabke liye open hai (Public)
router.get('/', getMovies);

// 2. Movie add karna sirf Admin ke liye allowed hai (Protected)
router.post('/', protect, adminOnly, addMovie);

// 3. Movie delete karna sirf Admin ke liye allowed hai (Protected)
router.delete('/:id', protect, adminOnly, deleteMovie);

module.exports = router;
