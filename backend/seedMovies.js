const mongoose = require('mongoose');
const Movie = require('./models/Movie');

const MONGO_URI = process.env.MONGO_URI || process.env.MONGO_URL || 'mongodb://localhost:27017/movie_app_db';

const sampleMovies = [
  {
    title: "Inception",
    year: "2010",
    poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    rating: 8.8,
    trailer: "https://www.youtube.com/watch?v=YoHD9XEInc0"
  },
  {
    title: "Interstellar",
    year: "2014",
    poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    rating: 8.7,
    trailer: "https://www.youtube.com/watch?v=zSWdZVtXT7E"
  },
  {
    title: "The Dark Knight",
    year: "2008",
    poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
    rating: 9.0,
    trailer: "https://www.youtube.com/watch?v=EXeTwQWrcwY"
  },
  {
    title: "Oppenheimer",
    year: "2023",
    poster: "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg",
    rating: 8.9,
    trailer: "https://www.youtube.com/watch?v=uYPbbksJxIg"
  },
  {
    title: "Avengers: Endgame",
    year: "2019",
    poster: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg",
    rating: 8.4,
    trailer: "https://www.youtube.com/watch?v=TcMBFSGVi1c"
  },
  {
    title: "Dune: Part Two",
    year: "2024",
    poster: "https://m.media-amazon.com/images/M/MV5BN2QyZGU4ZDctOWMzMy00NWUzLWIxNDUtOTc2MjU3YjMzNDIzXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg",
    rating: 8.6,
    trailer: "https://www.youtube.com/watch?v=Way9Dexny3w"
  },
  {
    title: "Spider-Man: Across the Spider-Verse",
    year: "2023",
    poster: "https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU3MzE1ZDA2MTBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg",
    rating: 8.7,
    trailer: "https://www.youtube.com/watch?v=cqGjhVJWtEg"
  },
  {
    title: "Top Gun: Maverick",
    year: "2022",
    poster: "https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZmExLTkyNTEtODFlZGY4ODk4ODgzXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
    rating: 8.3,
    trailer: "https://www.youtube.com/watch?v=giXco2nxYKg"
  },
  {
    title: "Deadpool & Wolverine",
    year: "2024",
    poster: "https://m.media-amazon.com/images/M/MV5BNzRiMjg0MzUtNTQ1Mi00Y2Q5LWEwM2MtMzUwZDU5NmVjN2NkXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg",
    rating: 7.9,
    trailer: "https://www.youtube.com/watch?v=73_1biulkYk"
  },
  {
    title: "The Batman",
    year: "2022",
    poster: "https://m.media-amazon.com/images/M/MV5BMDdmMTBiNTYtMGMzYS00ODAzLTlmNDUtYzQ2ODdhYjNjNDhhXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_SX300.jpg",
    rating: 7.8,
    trailer: "https://www.youtube.com/watch?v=mqqft2x_Aa4"
  },
  {
    title: "John Wick: Chapter 4",
    year: "2023",
    poster: "https://m.media-amazon.com/images/M/MV5BMDExZGMyOTMtMDgyYi00N2JhLWExNTMtZDFiZjg2NDExNTVhXkEyXkFqcGdeQXVyMTM1MTE1NDMx._V1_SX300.jpg",
    rating: 7.7,
    trailer: "https://www.youtube.com/watch?v=qEVUtrk8_B4"
  },
  {
    title: "Gladiator II",
    year: "2024",
    poster: "https://m.media-amazon.com/images/M/MV5BMTE1ZGFmZWEtZDM1MS00MmE5LWJkMzEtODk1Y2Y4NzI4YmRiXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg",
    rating: 7.5,
    trailer: "https://www.youtube.com/watch?v=4rgYUipGJNo"
  },
  {
    title: "Avatar: The Way of Water",
    year: "2022",
    poster: "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_SX300.jpg",
    rating: 7.6,
    trailer: "https://www.youtube.com/watch?v=d9MyW72ELq0"
  },
  {
    title: "Fight Club",
    year: "1999",
    poster: "https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZDYtZWRhOTA1OWNjYTRlXkEyXkFqcGdeQXVyNzkwMjQ5NzE@._V1_SX300.jpg",
    rating: 8.8,
    trailer: "https://www.youtube.com/watch?v=qtRKDV93gk8"
  },
  {
    title: "The Matrix",
    year: "1999",
    poster: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    rating: 8.7,
    trailer: "https://www.youtube.com/watch?v=vKQi3bBA1y8"
  },
  {
    title: "Joker",
    year: "2019",
    poster: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
    rating: 8.4,
    trailer: "https://www.youtube.com/watch?v=zAGVQLHvwOY"
  }
];

const seedMovies = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected!");

    console.log(`Inserting ${sampleMovies.length} sample movies for pagination testing...`);
    const inserted = await Movie.insertMany(sampleMovies);
    console.log(`🎉 Successfully inserted ${inserted.length} movies!`);

    const total = await Movie.countDocuments();
    console.log(`🍿 Total movies now in database: ${total}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed Error:", error.message);
    process.exit(1);
  }
};

seedMovies();
