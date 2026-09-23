const Movie = require('../models/Movie');

// 1. Saari Movies lane ka logic (Read)
const getMovies = async (req, res) => {
  try {
    // Database se saari movies lao
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// 2. Nayi Movie add karne ka logic (Create)
const addMovie = async (req, res) => {
  try {
    // Postman ya Frontend se aaya hua data pakdo
    const { title, year, poster, rating } = req.body;

    // Nayi movie create karo (Blueprint ke hisaab se)
    const newMovie = new Movie({ title, year, poster, rating });
    
    // Database mein permanently save karo
    await newMovie.save();
    
    res.status(201).json({ message: "Movie Added Successfully!", movie: newMovie });
  } catch (error) {
    res.status(500).json({ message: "Failed to add movie", error });
  }
};

module.exports = { getMovies, addMovie };
