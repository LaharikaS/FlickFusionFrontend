import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie, isUpcoming = false }) => {
  return (
    <div className="movie-card">
      {/* Link to the EventsDetailsPage */}
      <Link to={`/movies/${movie._id}`} className="movie-link">
        <div className="movie-image-container">
          <img 
            src={movie.image || 'https://via.placeholder.com/300x200?text=Event'} 
            alt={movie.title} 
            className="movie-image" 
          />
          {movie.featured && <span className="movie-featured-tag">Featured</span>}
        </div>
        <div className="movie-details">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-venue">{movie.venue}</p>
          {/* <div className="event-date-time">
            <span className="event-date">{formatDate(event.date)}</span>
            <span className="event-time">{formatTime(event.date)}</span>
          </div> */}
          <div className="movie-category-price">
            <span className="movie-category">{movie.category}</span>
            {/* <span className="event-price">{event.price ? `$${event.price}` : 'Free'}</span> */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;