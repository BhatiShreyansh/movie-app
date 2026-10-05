const Watchlist = require('../models/Watchlist');

// 1. User ki Watchlist mangwana (GET)
const getWatchlist = async (req, res) => {
  try {
    // req.user.id hume 'protect' middleware se mili hai
    // .populate('movie') ka matlab hai ID ki jagah poori movie ki details dikhana
    const watchlist = await Watchlist.find({ user: req.user.id }).populate('movie');
    res.status(200).json(watchlist);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// 2. Watchlist mein Nayi Movie save karna (POST)
const addToWatchlist = async (req, res) => {
  try {
    const { movieId } = req.body;

    // Check karo ki user ne pehle se toh ye movie save nahi kar rakhi
    const alreadySaved = await Watchlist.findOne({ user: req.user.id, movie: movieId });
    if (alreadySaved) {
      return res.status(400).json({ message: "Movie already in watchlist!" });
    }

    // Naya data banakar save karna
    const watchlistItem = new Watchlist({
      user: req.user.id,
      movie: movieId
    });

    await watchlistItem.save();
    res.status(201).json({ message: "Movie added to watchlist!", watchlistItem });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// 3. Watchlist se movie Delete karna (DELETE)
const removeFromWatchlist = async (req, res) => {
  try {
    // URL ke end mein jo ID hogi, wo 'req.params.id' ban jayegi
    const { id } = req.params; 
    
    await Watchlist.findByIdAndDelete(id);
    res.status(200).json({ message: "Movie removed from watchlist" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = { getWatchlist, addToWatchlist, removeFromWatchlist };
