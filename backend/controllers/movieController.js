const Movie = require('../models/Movie');

// 1. Saari Movies lane ka logic (With Pagination Support & Backward Compatibility)
const getMovies = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit) || 8;

    // A. Agar Frontend ne ?page=1 manga hai (Pagination Mode)
    if (page) {
      // Formula: (page - 1) * limit
      // Example: Page 1 => (1-1)*8 = 0 (Pehle 0 movies skip karke agle 8 lao)
      // Example: Page 2 => (2-1)*8 = 8 (Pehle 8 movies skip karke agle 8 lao)
      const skip = (page - 1) * limit;

      // Database mein total kitni movies hain
      const totalMovies = await Movie.countDocuments();

      // Movies fetch karo (Newest movies sabse pehle)
      const movies = await Movie.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const totalPages = Math.ceil(totalMovies / limit);
      const hasMore = page < totalPages;

      return res.status(200).json({
        movies,
        currentPage: page,
        totalPages,
        totalMovies,
        hasMore
      });
    }

    // B. Normal Mode (Admin Dashboard ya bina page query ke direct array)
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
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
