import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../Services/api';
import './EventsDetailsPage.css';

const fallbackEventDetails = {
  _id: 'event1',
  title: 'Live Concert Experience',
  venue: 'Metro Concert Hall',
  address: '123 Music Avenue, Downtown',
  dateTime: '2025-05-15T19:30:00',
  endTime: '2025-05-15T22:30:00',
  category: 'Music',
  price: 45,
  description: 'Join us for an unforgettable night of live music featuring the hottest bands in town.',
  image: 'https://via.placeholder.com/1200x600?text=Live+Concert+Experience',
  featured: true,
  organizer: 'City Entertainment Group',
  contactEmail: 'events@cityentertainment.com',
  contactPhone: '(555) 123-4567',
  additionalInfo: [
    'Food and beverages available for purchase',
    'No outside food or drinks allowed',
    'Limited parking available',
    'Age restriction: 18+'
  ],
  seatingMap: 'https://via.placeholder.com/800x600?text=Seating+Map',
  locationMap: 'https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Metro+Concert+Hall'
};

const EventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/events/${id}`);
        setEvent(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching event details:', err);
        setError('Failed to load event details. Using fallback data.');
        setEvent(fallbackEventDetails);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  const handleBookTickets = () => {
    navigate(`/Seatbookings/${id}`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading event details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="error-container">
        <h2>Event not found</h2>
        <p>The event you're looking for doesn't exist or has been removed.</p>
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
                <i className="fas fa-calendar">📅</i>
                <span>{formatDate(event.dateTime)}</span>
              </div>
              <div className="meta-item">
                <i className="fas fa-clock">⏰</i>
                <span>{formatTime(event.dateTime)}</span>
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

      <div className="event-content">
        <div className="event-main">
          <section className="event-description">
            <h2>About This Event</h2>
            <p>{event.description}</p>
          </section>

          {event.additionalInfo && event.additionalInfo.length > 0 && (
            <section className="event-additional-info">
              <h2>Additional Information</h2>
              <ul>
                {event.additionalInfo.map((info, index) => (
                  <li key={index}>{info}</li>
                ))}
              </ul>
            </section>
          )}

          {event.seatingMap && (
            <section className="event-seating">
              <h2>Seating Map</h2>
              <div className="seating-map">
                <img src={event.seatingMap} alt="Seating Map" />
              </div>
            </section>
          )}
        </div>

        <div className="event-sidebar">
          <div className="booking-card">
            <div className="price-display">
              <span className="price-label">Price</span>
              <span className="price-value">{event.price ? `$${event.price}` : 'Free'}</span>
            </div>

            <button 
              className="book-tickets-button"
              disabled={!event.dateTime || !event.venue}
              onClick={handleBookTickets}
            >
              Book Tickets
            </button>

            <div className="event-location">
              <h3>Location</h3>
              <p>{event.venue}</p>
              <p>{event.address}</p>
              {event.locationMap && (
                <div className="map-placeholder">
                  <iframe
                    src={event.locationMap}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Event Location Map"
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

export default EventDetailPage;