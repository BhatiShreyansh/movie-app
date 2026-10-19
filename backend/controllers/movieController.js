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
    const { title, year, poster, rating, trailer } = req.body;

    // Nayi movie create karo (Blueprint ke hisaab se)
    const newMovie = new Movie({ title, year, poster, rating, trailer: trailer || "" });
    
    // Database mein permanently save karo
    await newMovie.save();
    
    res.status(201).json({ message: "Movie Added Successfully!", movie: newMovie });
  } catch (error) {
    console.error("Add Movie Error:", error.message);
    res.status(400).json({ message: "Failed to add movie", error: error.message });
  }
};

// 3. Movie Delete karne ka logic (Admin Only)
const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
      return res.status(404).json({ message: "Movie database me nahi mili!" });
    }
    res.status(200).json({ message: "Movie permanently delete ho gayi! 🗑️" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete movie", error: error.message });
  }
};

module.exports = { getMovies, addMovie, deleteMovie };
