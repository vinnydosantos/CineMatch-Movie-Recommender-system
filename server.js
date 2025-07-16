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
  { id: 1, title: "The Shawshank Redemption", poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg" },
  { id: 2, title: "The Godfather", poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg" },
  { id: 3, title: "The Dark Knight", poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg" },
  { id: 4, title: "Pulp Fiction", poster: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg" },
  { id: 5, title: "Forrest Gump", poster: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg" }
];

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
  // Mock KNN recommendations
  const recommendations = mockMovies.slice(0, 3);
  res.json({ recommendations, userId });
});

app.post('/api/mlp-recommend', (req, res) => {
  const { userId } = req.body;
  // Mock MLP recommendations
  const recommendations = mockMovies.slice(2, 5);
  res.json({ recommendations, userId });
});

app.listen(PORT, () => {
  console.log(`CineMatch server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT}/welcome to get started`);
});