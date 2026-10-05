const mongoose = require('mongoose');

// Watchlist ka blueprint - Kaunse User ne konsi Movie save ki hai.
const watchlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Ye 'User' database se link hai
    required: true
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie', // Ye 'Movie' database se link hai
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Watchlist', watchlistSchema);
