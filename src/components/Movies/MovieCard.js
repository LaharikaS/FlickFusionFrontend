import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const EventCard = ({ event }) => {
  // Format date to be more readable
// Format date as "July 20, 2025"
// Format date as "July 20, 2025"
const formatDate = (isoDate) => {
  try {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch (error) {
    return '';
  }
};

// Format time as "6:30 PM"
const formatTime = (isoDate) => {
  try {
    const date = new Date(isoDate);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch (error) {
    return '';
  }
};


  return (
    <div className="movie-card">
      {/* Link to the EventsDetailsPage */}
      <Link to={`/movies/${event._id}`} className="movie-link">
        <div className="movie-image-container">
          <img 
            src={event.image || 'https://via.placeholder.com/300x200?text=Event'} 
            alt={event.title} 
            className="movie-image" 
          />
          {event.featured && <span className="movie-featured-tag">Featured</span>}
        </div>
        <div className="movie-details">
          <h3 className="movie-title">{event.title}</h3>
          <p className="movie-venue">{event.venue}</p>
          {/* <div className="event-date-time">
            <span className="event-date">{formatDate(event.date)}</span>
            <span className="event-time">{formatTime(event.date)}</span>
          </div> */}
          <div className="movie-category-price">
            <span className="movie-category">{event.category}</span>
            {/* <span className="event-price">{event.price ? `$${event.price}` : 'Free'}</span> */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;


