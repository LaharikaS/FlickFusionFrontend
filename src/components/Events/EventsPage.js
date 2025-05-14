import React, { useEffect, useState } from 'react';
import api from '../../Services/api';
import EventCard from './EventCard';
import './EventsPage.css';

// Fallback data if API fails
const fallbackEvents = [
  {
    _id: 'event1',
    title: 'Live Concert Experience',
    venue: 'Metro Concert Hall',
    dateTime: '2025-05-15T19:30:00',
    category: 'Music',
    price: 45,
    image: 'https://via.placeholder.com/300x200?text=Live+Concert',
    featured: true
  },
  {
    _id: 'event2',
    title: 'Comedy Night Special',
    venue: 'Laugh Factory',
    dateTime: '2025-05-20T20:00:00',
    category: 'Comedy',
    price: 25,
    image: 'https://via.placeholder.com/300x200?text=Comedy+Night',
    featured: false
  },
  {
    _id: 'event3',
    title: 'NBA Finals Game 3',
    venue: 'City Arena',
    dateTime: '2025-06-02T19:00:00',
    category: 'Sports',
    price: 120,
    image: 'https://via.placeholder.com/300x200?text=NBA+Finals',
    featured: true
  },
  {
    _id: 'event4',
    title: 'Tech Conference 2025',
    venue: 'Convention Center',
    dateTime: '2025-05-10T09:00:00',
    category: 'Conference',
    price: 75,
    image: 'https://via.placeholder.com/300x200?text=Tech+Conference',
    featured: false
  },
  {
    _id: 'event5',
    title: 'Food & Wine Festival',
    venue: 'City Park',
    dateTime: '2025-05-22T12:00:00',
    category: 'Food',
    price: 35,
    image: 'https://via.placeholder.com/300x200?text=Food+Festival',
    featured: false
  },
  {
    _id: 'event6',
    title: 'Broadway Musical Show',
    venue: 'Grand Theater',
    dateTime: '2025-05-18T18:30:00',
    category: 'Theater',
    price: 60,
    image: 'https://via.placeholder.com/300x200?text=Broadway+Show',
    featured: true
  },
  {
    _id: 'event7',
    title: 'Community Yoga Class',
    venue: 'Central Park',
    dateTime: '2025-05-11T08:30:00',
    category: 'Fitness',
    price: 0,
    image: 'https://via.placeholder.com/300x200?text=Yoga+Class',
    featured: false
  },
  {
    _id: 'event8',
    title: 'Art Exhibition Opening',
    venue: 'Modern Art Gallery',
    dateTime: '2025-05-25T17:00:00',
    category: 'Art',
    price: 15,
    image: 'https://via.placeholder.com/300x200?text=Art+Exhibition',
    featured: false
  }
];

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Categories for filtering
  const categories = ['All', 'Music', 'Comedy', 'Sports', 'Theater', 'Food', 'Conference', 'Art', 'Fitness'];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        // Try to fetch from API first
        const response = await api.get('/events');
        setEvents(response.data);
        setFilteredEvents(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to load events. Using fallback data.');
        // Use fallback data if API fails
        setEvents(fallbackEvents);
        setFilteredEvents(fallbackEvents);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events when category or search term changes
  useEffect(() => {
    let filtered = events;
    
    // Filter by category
    if (activeCategory !== 'All') {
      filtered = filtered.filter(event => event.category === activeCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(term) ||
        event.venue.toLowerCase().includes(term)
      );
    }
    
    setFilteredEvents(filtered);
  }, [activeCategory, searchTerm, events]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="events-page">
      <div className="events-header">
        <h1>Upcoming Events</h1>
        <p>Discover and book the best events in your area</p>
      </div>
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading events...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="no-events">
          <p>No events found matching your criteria. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="events-grid">
          {filteredEvents.map(event => (
            <div className="event-grid-item" key={event._id}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;