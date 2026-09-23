const mongoose = require('mongoose');

// Schema ka matlab hai "Blueprint". 
// Hum MongoDB ko bata rahe hain ki ek Movie kaisi dikhegi.
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
}, { timestamps: true }); // timestamps se created_at date automatically save ho jayegi

// Is schema ko Model mein convert kar rahe hain taaki hum isko use kar sakein
module.exports = mongoose.model('Movie', movieSchema);
