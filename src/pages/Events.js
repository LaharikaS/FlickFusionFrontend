import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../components/Services/api';
import EventCard from '../components/Movies/MovieCard';
import Carousel from '../components/Home/Carousel';
import '../components/Home/HomePage.css';


const carouselSlides = [
  
];

const Booking = () => {
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [carouselSlides, setCarouselSlides] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
  
        const [recommendedRes, upcomingRes, featuredRes] = await Promise.all([
          fetch('https://flickfusion-backend-zn4d.onrender.com/api/event/recommendedevent'),
          fetch('https://flickfusion-backend-zn4d.onrender.com/api/event/upcomingevent'),
          fetch('https://flickfusion-backend-zn4d.onrender.com/api/event/featuredevent')
        ]);
  
        if (!recommendedRes.ok || !upcomingRes.ok || !featuredRes.ok) {
          throw new Error('One or more requests failed');
        }
  
        const [recommendedData, upcomingData, featuredData] = await Promise.all([
          recommendedRes.json(),
          upcomingRes.json(),
          featuredRes.json()
        ]);
  
        setRecommendedEvents(recommendedData);
        setUpcomingEvents(upcomingData);
        setFeaturedEvents(featuredData);
        setCarouselSlides(recommendedData);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  
  return (
  <div className="home-page">
    <Carousel slides={carouselSlides} />

    {/* Featured Events */}
    <div className="content-section">
      <div className="section-header">
        <h2>Latest Events</h2>
        <Link to="/booking" className="see-all">
          See All <i className="fas fa-chevron-right">›</i>
        </Link>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading events...</p>
        </div>
      ) : (
        <div className="event-grid">
          {(featuredEvents).map(event => ( 
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>

    {/* Recommended Events */}
    <div className="content-section">
      <div className="section-header">
        <h2>Recommended to Visit</h2>
        <Link to="/booking" className="see-all">
          See All <i className="fas fa-chevron-right">›</i>
        </Link>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading events...</p>
        </div>
      ) : (
        <div className="event-grid">
          {(recommendedEvents).map(event => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
      {/* Upcoming Events */}
        <div className="content-section">
        <div className="section-header">
            <h2>Upcoming Events</h2>
            <Link to="/booking" className="see-all">
            See All <i className="fas fa-chevron-right">›</i>
            </Link>
        </div>

        {loading ? (
            <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading events...</p>
            </div>
        ) : (
            <div className="event-grid">
            {upcomingEvents.map(event => (
                <EventCard key={event._id} event={event} />
            ))}
            </div>
        )}
        </div>

    {/* Promo Banner */}
    {/* <div className="content-section">
      <div className="promo-banner">
        <div className="promo-content">
          <h3>Trending Movies</h3>
          <p>Discover the spicing shows!</p>
          <Link to="/Movies" className="promo-button">Book Now!!</Link>
        </div>
        <div className="promo-image">
          <img src="https://via.placeholder.com/500x300?text=Live+Events" alt="Book Now!!" />
        </div>
      </div>
    </div> */}
  </div>
);
};

export default Booking;