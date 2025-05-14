import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import api from '../../Services/api';
import { useAuth } from '../../Contexts/AuthContext';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTheater, setSelectedTheater] = useState('');
  const [selectedShowtime, setSelectedShowtime] = useState('');
  
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await api.get(`/event/${id}`);
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie:', error);
        setError('Failed to fetch movie details');
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);
  
  // Mock data for development or API failure
  useEffect(() => {
    if (error && !movie) {
      const mockMovie = {
        _id: id,
        title: id === 'm1' ? 'Venom: The Last Dance' : 'Deadpool & Wolverine',
        poster: `https://via.placeholder.com/300x450?text=${id === 'm1' ? 'Venom:+The+Last+Dance' : 'Deadpool+and+Wolverine'}`,
        banner: `https://via.placeholder.com/1200x500?text=${id === 'm1' ? 'Venom:+The+Last+Dance' : 'Deadpool+and+Wolverine'}+Banner`,
        genre: id === 'm1' ? ['Action', 'Sci-Fi'] : ['Action', 'Comedy'],
        rating: id === 'm1' ? 8.1 : 9.0,
        duration: id === 'm1' ? 112 : 124,
        certification: 'UA',
        language: 'English',
        description: id === 'm1' 
          ? 'Eddie Brock and Venom face their biggest challenge yet as they confront a new symbiote threat. As they go on the run, they must find a way to separate and survive before it\'s too late.'
          : 'The Merc with a Mouth teams up with Wolverine for an action-packed adventure across the multiverse. Wade Wilson must convince Logan to join forces to save the world one last time.',
        cast: id === 'm1' 
          ? ['Tom Hardy', 'Juno Temple', 'Chiwetel Ejiofor'] 
          : ['Ryan Reynolds', 'Hugh Jackman', 'Emma Corrin'],
        director: id === 'm1' ? 'Kelly Marcel' : 'Shawn Levy',
        releaseDate: '2025-06-01'
      };
      
      setMovie(mockMovie);
      setError(null);
    }
  }, [error, movie, id]);
  
  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate(`/checkout/${id}`);
    }
  };
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  if (error) {
    return <div className="error">{error}</div>;
  }
  
  if (!movie) {
    return <div className="not-found">Movie not found</div>;
  }
  
  // Generate dates for the next 7 days
  const getDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        display: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        })
      });
    }
    
    return dates;
  };
  
  const theaters = [
    { id: 't1', name: 'PVR Cinemas - Forum Mall' },
    { id: 't2', name: 'INOX - City Centre' },
    { id: 't3', name: 'Cinepolis - Lake Mall' }
  ];
  
  const showtimes = [
    '10:00 AM', '1:15 PM', '4:30 PM', '7:45 PM', '10:30 PM'
  ];
  
  return (
    <div className="movie-detail">
      <div className="movie-header">
        <img src={movie.poster} alt={movie.title} className="movie-poster" />
        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p className="genre">{movie.genre.join(', ')}</p>
          <p className="description">{movie.description}</p>
          <button onClick={handleBookNow} className="book-now-button">
            Book Now
          </button>
        </div>
      </div>
      
      <div className="movie-content-container">
        <div className="movie-description">
          <h2>Synopsis</h2>
          <p>{movie.description}</p>
        </div>
        
        <div className="booking-section">
          <h2>Book Tickets</h2>
          
          <div className="booking-options">
            <div className="booking-dates">
              <h3>Select Date</h3>
              <div className="date-selector">
                {getDates().map(date => (
                  <button 
                    key={date.value}
                    className={`date-option ${selectedDate === date.value ? 'selected' : ''}`}
                    onClick={() => setSelectedDate(date.value)}
                  >
                    {date.display}
                  </button>
                ))}
              </div>
            </div>
            
            {selectedDate && (
              <div className="booking-theaters">
                <h3>Select Theater</h3>
                <div className="theater-selector">
                  {theaters.map(theater => (
                    <button
                      key={theater.id}
                      className={`theater-option ${selectedTheater === theater.id ? 'selected' : ''}`}
                      onClick={() => setSelectedTheater(theater.id)}
                    >
                      {theater.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {selectedTheater && (
              <div className="booking-showtimes">
                <h3>Select Showtime</h3>
                <div className="showtime-selector">
                  {showtimes.map((time, index) => (
                    <button
                      key={index}
                      className={`showtime-option ${selectedShowtime === time ? 'selected' : ''}`}
                      onClick={() => setSelectedShowtime(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <button 
            className="book-tickets-button"
            disabled={!selectedDate || !selectedTheater || !selectedShowtime}
            onClick={() => navigate(`/Seatbooking/${id}`, {
              state: {
                movieId: id,
                movieTitle: movie.title,
                moviePoster: movie.poster,
                date: selectedDate,
                theater: selectedTheater,
                theaterName: theaters.find(t => t.id === selectedTheater)?.name,
                showtime: selectedShowtime
              }
            })}
          >
            Book Tickets
          </button>
        </div>
      </div>
      
      <div className="back-to-movies">
        <button className="back-button" onClick={() => navigate('/movies')}>
          Back to Movies
        </button>
      </div>
    </div>
  );
};

export default MovieDetail;