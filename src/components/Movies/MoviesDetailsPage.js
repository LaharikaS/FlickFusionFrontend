import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
// import api from '../../Services/api';
import './MoviesDetailsPage.css';

const fallbackEventDetails = {

};

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`hthttps://flickfusion-backend-zn4d.onrender.com/api/event/${id}`);
        
        console.log('Fetching event:', id);
        console.log('Response status:', response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json();
        setEvent(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching event details:', err);
        setError('Failed to load event details. Using fallback data.');
        setEvent(fallbackEventDetails);
      } finally {
        setLoading(false);
      }
    };
    
    console.log(event)

    fetchEventDetails();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',

    });
  };
  
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, 
    });
  };

  const handleBookTickets = () => {
    console.log('clicked')
    navigate(`/seatbooking/${id}`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="error-container">
        <h2>Movie not found</h2>
        <p>The movie you're looking for doesn't exist or has been removed.</p>
        <Link to="/events" className="back-link">Browse all events</Link>
      </div>
    );
  }

  
  return (
    <div className="event-detail-page">
      <div className="event-hero" style={{ backgroundImage: `url(${event.image})` }}>
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>{event.title}</h1>
            <div className="event-meta">
              <div className="meta-item">
                {/* <i className="fas fa-calendar">📅</i> */}
                {/* <span>{formatDate(event.date)}</span> */}
                </div>
              <div className="meta-item">
                {/* <i className="fas fa-clock">⏰</i> */}
                {/* <span>{formatTime(event.date)}</span> */}
              </div>
              <div className="meta-item">
                <i className="fas fa-map-marker-alt">📍</i>
                <span>{event.venue}</span>
              </div>
              <div className="meta-item category-badge">
                <span>{event.category}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="event-content" >
        <div className="event-main">
        <section className="event-description">
            <h2 style={{ color: 'white' }}>About This Event</h2>
            <p style={{ color: 'white' }}>{event.description}</p>
          </section>

          {event.additionalInfo && Object.keys(event.additionalInfo).length > 0 && (
          <section className="event-additional-info">
            <h2  style={{ color: 'white' }}>Additional Information</h2>
            <ul>
              {Object.entries(event.additionalInfo).map(([key, value], index) => (
                <li  style={{ color: 'white' }} key={index}>
                  <strong  style={{ color: 'white' }}>{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </section>
        )}

{/* 
          {event.seatingMap && (
            <section className="event-seating">
              <h2  style={{ color: 'white' }}>Seating Map</h2>
              <div  style={{ color: 'white' }} className="seating-map">
                <img src={event.seatingMap} alt="Seating Map" />
              </div>
            </section>
          )} */}
        </div>

        <div className="event-sidebar">
          <div className="booking-card">
            <div className="price-display">
              <span className="price-label">Price</span>
              <span className="price-value">{event.price ? `$${event.price}` : 'Free'}</span>
            </div>

            <button 
              className="book-tickets-button"
              disabled={!event.date || !event.venue || !event.price || !event.title}
              onClick={handleBookTickets}
            >
              Book Tickets
            </button>

            <div className="event-location" >
              <h3>Location</h3>
              <p>{event.venue}</p>
              <p>{event.location}</p>
              {event.locationMap && event.locationMap.length > 0 && (
                  <div className="map-placeholder">
                    <iframe
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen=""
                      title="Event Location Map"
                      src={`https://www.google.com/maps?q=${event.locationMap[0].lat},${event.locationMap[0].lng}&z=15&output=embed`}
                    ></iframe>
                  </div>
                )}
            </div>

            <div className="event-organizer">
              <h3>Organizer</h3>
              <p>{event.organizer}</p>
              {event.contactEmail && <p>Email: {event.contactEmail}</p>}
              {event.contactPhone && <p>Phone: {event.contactPhone}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;