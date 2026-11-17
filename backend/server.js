const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. Middlewares
// CORS allows frontend (both localhost and deployed domains) to access backend
app.use(cors());
// express.json() allows our backend to parse JSON request bodies
app.use(express.json());

// 2. Database Connection (MongoDB Atlas or Local MongoDB)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/movie_app_db';

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch((err) => console.error("❌ MongoDB Connection Failed:", err.message));

// 3. Basic Test & Health Check Route
app.get('/', (req, res) => {
  res.status(200).json({
    status: "online",
    message: "🎬 Movie App Backend is Running Live!",
    timestamp: new Date().toISOString()
  });
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
