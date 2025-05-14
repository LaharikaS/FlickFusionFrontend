import axios from 'axios';

const API_URL = '/api/miniTV/';

// Get all movies
const getMovies = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get featured movies
const getFeaturedMovies = async () => {
  const response = await axios.get(API_URL + 'featured');
  return response.data;
};

// Get trending movies
const getTrendingMovies = async () => {
  const response = await axios.get(API_URL + 'trending');
  return response.data;
};

// Get movie by ID
const getMovieById = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

// Get movies by category
const getMoviesByCategory = async (categoryId) => {
  const response = await axios.get(API_URL + `category/${categoryId}`);
  return response.data;
};

// Search movies
const searchMovies = async (keyword) => {
  const response = await axios.get(API_URL + `search?keyword=${keyword}`);
  return response.data;
};

const movieService = {
  getMovies,
  getFeaturedMovies,
  getTrendingMovies,
  getMovieById,
  getMoviesByCategory,
  searchMovies,
};

export default movieService; 