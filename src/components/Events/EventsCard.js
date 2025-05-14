import React from 'react';
import { Link } from 'react-router-dom';
import './EventCard.css';

const EventCard = ({ event }) => {
  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Extract time from the date
  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  return (
    <div className="event-card">
      {/* Link to the EventsDetailsPage */}
      <Link to={`/events/${event._id}`} className="event-link">
        <div className="event-image-container">
          <img 
            src={event.image || 'https://via.placeholder.com/300x200?text=Event'} 
            alt={event.title} 
            className="event-image" 
          />
          {event.featured && <span className="event-featured-tag">Featured</span>}
        </div>
        <div className="event-details">
          <h3 className="event-title">{event.title}</h3>
          <p className="event-venue">{event.venue}</p>
          <div className="event-date-time">
            <span className="event-date">{formatDate(event.dateTime)}</span>
            <span className="event-time">{formatTime(event.dateTime)}</span>
          </div>
          <div className="event-category-price">
            <span className="event-category">{event.category}</span>
            <span className="event-price">{event.price ? `$${event.price}` : 'Free'}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;