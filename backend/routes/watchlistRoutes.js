const express = require('express');
const router = express.Router();
const { getWatchlist, addToWatchlist, removeFromWatchlist } = require('../controllers/watchlistController');
const { protect } = require('../middleware/authMiddleware'); // Security Guard Import kiya

// Har raaste (route) par jane se pehle 'protect' guard check karega ki token hai ya nahi.
router.get('/', protect, getWatchlist);
router.post('/', protect, addToWatchlist);
router.delete('/:id', protect, removeFromWatchlist); // :id matlab konsi watchlist hatani hai

module.exports = router;
