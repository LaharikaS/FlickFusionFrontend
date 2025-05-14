import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import './SearchPage.css';

// MovieCard Component
const MovieCard = ({ movie }) => (
  <div className="search-card movie-card">
    <div className="card-image">
      <img 
        src={movie.poster || 'https://via.placeholder.com/300x450?text=Movie'} 
        alt={movie.title}
      />
      <div className="card-overlay">
        <Link to={`/movies/${movie.id}`} className="view-details">
          View Details
        </Link>
      </div>
    </div>
    <div className="card-content">
      <h4>{movie.title}</h4>
      <p className="category">{movie.category}</p>
    </div>
  </div>
);

// EventCard Component
const EventCard = ({ event }) => (
  <div className="search-card event-card">
    <div className="card-image">
      <img 
        src={event.image || 'https://via.placeholder.com/300x200?text=Event'} 
        alt={event.title}
      />
      <div className="card-overlay">
        <Link to={`/events/${event.id}`} className="view-details">
          View Details
        </Link>
      </div>
    </div>
    <div className="card-content">
      <h4>{event.title}</h4>
      <p className="category">{event.category}</p>
    </div>
  </div>
);

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [results, setResults] = useState(null);

  useEffect(() => {
    // Get results from localStorage
    const storedResults = localStorage.getItem('searchResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
      // Clear storage after retrieving results
      localStorage.removeItem('searchResults');
    }
  }, [query]);

  if (!results) return <div>No results found</div>;

  return (
    <div className="search-results">
      <h2>Search Results for: {query}</h2>
      
      {/* Movies Section */}
      {results.movies.length > 0 && (
        <section className="result-section">
          <h3>Movies</h3>
          <div className="results-grid">
            {results.movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      )}

      {/* Events Section */}
      {results.events.length > 0 && (
        <section className="result-section">
          <h3>Events</h3>
          <div className="results-grid">
            {results.events.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}


      {/* No Results Message */}
      {Object.values(results).every(arr => arr.length === 0) && (
        <div className="no-results">
          No results found for "{query}"
        </div>
      )}
    </div>
  );
}

export default SearchPage;