const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. Middlewares
// CORS allows our frontend (port 5173) to talk to this backend (port 5000)
app.use(cors());
// express.json() allows our backend to understand JSON data sent in requests
app.use(express.json());

// 2. Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.log("❌ MongoDB Connection Failed:", err));

// 3. Basic Test Route
app.get('/', (req, res) => {
  res.send('🎬 Movie App Backend is Running!');
});

// 4. API Routes (Movie, Auth, and Watchlist)
const movieRoutes = require('./routes/movieRoutes');
const authRoutes = require('./routes/authRoutes');
const watchlistRoutes = require('./routes/watchlistRoutes');

app.use('/api/movies', movieRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/watchlist', watchlistRoutes);

// 5. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
