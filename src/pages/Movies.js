import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import api from '../../Services/api';
import MovieCard from '../components/MoviesPage/MovieCard';
import '../components/MoviesPage/MoviesPage.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeGenre, setActiveGenre] = useState('all');
  const [activeLanguage, setActiveLanguage] = useState('all');
  const api = 'https://flickfusion-backend-zn4d.onrender.com/api';
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search');
  const filterType = queryParams.get('filter');
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        let endpoint = '/movies';
        
        if (filterType === 'upcoming') {
          endpoint = '/movies/upcoming';
        }
        
        let response;
        if (searchQuery) {
          response = await api.get(`${endpoint}/search?q=${searchQuery}`);
        } else {
          response = await api.get(endpoint);
        }
        
        setMovies(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to load movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovies();
  }, [searchQuery, filterType]);
  
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        let endpoint = 'https://flickfusion-backend-zn4d.onrender.com/api/event/shows';
  
        if (filterType === 'upcoming') {
          endpoint = 'https://flickfusion-backend-zn4d.onrender.com/api/event/shows/upcoming';
        }
  
        let url = endpoint;
        if (searchQuery) {
          url += `/search?q=${encodeURIComponent(searchQuery)}`;
        }
  
        const response = await fetch(url);
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        setMovies(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to load movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchMovies();
  }, [searchQuery, filterType]);
  
  
  const filterMovies = () => {
    if (activeGenre === 'all' && activeLanguage === 'all') {
      return movies;
    }
    
    return movies.filter(movie => {
      const genreMatch = activeGenre === 'all' || movie.category === activeGenre;
      const languageMatch = activeLanguage === 'all' || movie.language === activeLanguage;
      return genreMatch && languageMatch;
    });
  };
  
  const allGenres = ['Action','Animation','Fantasy', 'Romance', 'Comedy', 'Crime', 'Drama', 'Horror', 'Sci-Fi', 'Thriller'];
  const allLanguages = ['English', 'Hindi', 'Telugu', 'Tamil', 'Kannada', 'Malayalam'];
  
  const filteredMovies = filterMovies();
  
  return (
    <div className="movies-page">
      <div className="movies-header">
        <h1 style={{color:'white', backgroundColor:'black'}}>
          {searchQuery 
            ? `Search Results: ${searchQuery}` 
            : filterType === 'upcoming' 
              ? 'Upcoming Movies' 
              : 'Movies Now Showing'}
        </h1>
        
        {!searchQuery && (
          <div className="filters-section" style={{color:'white', backgroundColor:'#333333'}}>
            <div className="filter-group">
              <h3>Genres</h3>
              <div className="filter-options">
                <button 
                  className={`filter-button ${activeGenre === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveGenre('all')}
                >
                  All Genres
                </button>
                
                {allGenres.map(genre => (
                  <button 
                    key={genre}
                    className={`filter-button ${activeGenre === genre ? 'active' : ''}`}
                    onClick={() => setActiveGenre(genre)}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="filter-group">
              <h3>Languages</h3>
              <div className="filter-options">
                <button 
                  className={`filter-button ${activeLanguage === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveLanguage('all')}
                >
                  All Languages
                </button>
                
                {allLanguages.map(language => (
                  <button 
                    key={language}
                    className={`filter-button ${activeLanguage === language ? 'active' : ''}`}
                    onClick={() => setActiveLanguage(language)}
                  >
                    {language}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {loading ? (
        <div className="loading">Loading movies...</div>
      ) : filteredMovies.length === 0 ? (
        <div className="no-results">
          <h2>No movies found</h2>
          <p>Try changing your filters or search term</p>
        </div>
      ) : (
        <div className="movies-grid">
          {filteredMovies.map(movie => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
