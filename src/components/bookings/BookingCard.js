import React from 'react';
import { Link } from 'react-router-dom';
import './BookingCard.css';

const BookingCard= ({ movie, isUpcoming = false }) => {
  return (
    <Link to={`/movie/${movie._id}`} className="movie-card">
      {movie.promoted && <div className="promoted-badge">PROMOTED</div>}
      {isUpcoming && movie.releaseDate && (
        <div className="release-date-badge">
          <span>Releasing: {new Date(movie.releaseDate).toLocaleDateString()}</span>
        </div>
      )}
      <div className="movie-poster">
        <img src={movie.poster} alt={movie.title} />
        {movie.rating && (
          <div className="movie-rating">
            <span>{movie.rating}</span>
            <i className="fas fa-star">★</i>
          </div>
        )}
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-genre">{movie.genre.join(', ')}</p>
      </div>
    </Link>
  );
};

export default BookingCard; 