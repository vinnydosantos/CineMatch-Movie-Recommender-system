import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('static'));

// Set view engine to handle HTML templates
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'html');

// Mock data for demonstration
const mockMovies = [
  { id: 1, title: "The Shawshank Redemption (1994)", poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg" },
  { id: 2, title: "The Godfather (1972)", poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg" },
  { id: 3, title: "The Dark Knight (2008)", poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
  { id: 4, title: "Pulp Fiction (1994)", poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg" },
  { id: 5, title: "Forrest Gump (1994)", poster: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg" },
  { id: 6, title: "Inception (2010)", poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg" },
  { id: 7, title: "The Matrix (1999)", poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg" },
  { id: 8, title: "Goodfellas (1990)", poster: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg" },
  { id: 9, title: "The Lord of the Rings: The Fellowship of the Ring (2001)", poster: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg" },
  { id: 10, title: "Star Wars: Episode IV - A New Hope (1977)", poster: "https://image.tmdb.org/t/p/w500/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg" }
];

// Function to get random movies for recommendations
function getRandomMovies(count = 5) {
  const shuffled = [...mockMovies].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Routes
app.get('/', (req, res) => {
  res.redirect('/welcome');
});

app.get('/welcome', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'welcome.html'));
});

app.get('/knn', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'knn.html'));
});

app.get('/mlp', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'mlp.html'));
});

// API endpoints for recommendations
app.post('/api/knn-recommend', (req, res) => {
  const { userId } = req.body;
  
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  
  // Simulate user validation
  const userIdNum = parseInt(userId);
  if (isNaN(userIdNum) || userIdNum < 1 || userIdNum > 100) {
    return res.status(400).json({ error: 'User ID must be between 1 and 100' });
  }
  
  // Mock KNN recommendations - simulate different results based on user ID
  const recommendations = getRandomMovies(5);
  
  res.json({ 
    recommendations, 
    userId,
    algorithm: 'KNN'
  });
});

app.post('/api/mlp-recommend', (req, res) => {
  const { userId } = req.body;
  
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }
  
  // Simulate user validation
  const userIdNum = parseInt(userId);
  if (isNaN(userIdNum) || userIdNum < 1 || userIdNum > 100) {
    return res.status(400).json({ error: 'User ID must be between 1 and 100' });
  }
  
  // Mock MLP recommendations and watched movies
  const recommendations = getRandomMovies(5);
  const watchedMovies = getRandomMovies(5);
  
  res.json({ 
    recommendations,
    watchedMovies,
    userId,
    algorithm: 'MLP'
  });
});

app.listen(PORT, () => {
  console.log(`CineMatch server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}/welcome to get started`);
});