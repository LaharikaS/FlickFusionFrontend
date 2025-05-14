import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../Contexts/AuthContext';
import './Seatbooking.css';

const SeatBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  // const { currentUser } = useAuth();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showtime, setShowtime] = useState('');
  const [date, setDate] = useState('');
  const [theater, setTheater] = useState('');
  const [theaterName, setTheaterName] = useState('');
  const [bookedSeats, setbookedSeats] = useState('');
  const [price, setPrice] = useState(0.00); // Default price per seat
  const [seatcost, setseatcost] = useState(0.00); // Default price per seat


  // Get booking details from location state
  useEffect(() => {
    if (location.state) {
      const { date, showtime, theater, theaterName } = location.state;
      if (date) setDate(date);
      if (showtime) setShowtime(showtime);
      if (theater) setTheater(theater);
      if (theaterName) setTheaterName(theaterName);

    }
  }, [location.state]);

  // Fetch movie details
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        // Replace with your actual API call
        const response = await fetch(`https://flickfusion-backend-zn4d.onrender.com/api/event/${id}`);
        if (!response.ok) throw new Error('Movie not found');
        const data = await response.json();
        setMovie(data);
        setPrice(data.price || 0.00); 

      } catch (error) {
        console.error('Error fetching movie:', error);
        // Mock data for development
        const mockMovie = {
          _id: id,
          title: id === 'm1' ? 'Venom: The Last Dance' : 'Deadpool & Wolverine',
          poster: `https://via.placeholder.com/300x450?text=${id === 'm1' ? 'Venom:+The+Last+Dance' : 'Deadpool+and+Wolverine'}`,
          genre: id === 'm1' ? ['Action', 'Sci-Fi'] : ['Action', 'Comedy'],
          description: id === 'm1' 
            ? 'Eddie Brock and Venom face their biggest challenge yet as they confront a new symbiote threat.'
            : 'The Merc with a Mouth teams up with Wolverine for an action-packed adventure across the multiverse.'
        };
        setMovie(mockMovie);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  // Dummy data for available showtimes
  const showtimes = ['10:00 AM', '1:30 PM', '4:00 PM', '7:30 PM', '10:00 PM'];
  
  // Generate seats grid (6 rows A-F, 8 seats per row)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
  const seatsPerRow = 8;
  const rowPriceMap = {
    A: 40,
    B: 26,
    C: 18,
    D: 12,
    E: 6,
    F: 0
  };
  // Dummy data for already booked seats
  // const bookedSeats = [];

  const handleSeatClick = (seat) => {
      const row = seat.charAt(0);
        const seatPrice = rowPriceMap[row] || 0;

        if (bookedSeats.includes(seat)) return;

        if (selectedSeats.includes(seat)) {
          // Deselect the seat
          setSelectedSeats(prev => prev.filter(s => s !== seat));
          setseatcost(prev => prev - seatPrice);
        } else {
          // Select the seat
          setSelectedSeats(prev => [...prev, seat]);
          setseatcost(prev => prev + seatPrice);  
        };
    }


  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  // console.log(id,date,showtime)

  const handleShowtimeChange = async(e) => {
    const newShowtime = e.target.value;
    setShowtime(newShowtime);
    fetchbookedseats(newShowtime);
  
  };

    const fetchbookedseats = async (updatedShowtime) => {
      try {
        const response = await fetch(
          `https://flickfusion-backend-zn4d.onrender.com/api/booking/${id}/${date}/${updatedShowtime}`
        );
    
        if (response.ok) {
          const data = await response.json();
          setbookedSeats(data.bookedSeats);
          console.log(data.bookedSeats); 
        } else {
          console.error('Error fetching booked seats:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching booked seats:', error);
      }
    };
  
  const handleProceedToCheckout = () => {
    // if (!currentUser) {
    //   // Redirect to login if user is not logged in
    //   navigate('/login', { 
    //     state: { 
    //       redirectTo: `/seatbooking/${id}`,
    //       message: 'Please login to continue booking' 
    //     } 
    //   });
    //   return;
    // }
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userId = storedUser?._id;

    if (selectedSeats.length === 0 || !date || !showtime) {
      alert('Please select seats, date and showtime');
      return;
    }

    // Save booking details to session storage or context
    const bookingDetails = {
      movieId: id,
      movieTitle: movie?.title,
      moviePoster: movie?.poster,
      selectedSeats,
      showDate: date,
      userId,
      showtime,
      theater,
      theaterName,
      totalPrice: (selectedSeats.length * price).toFixed(2)
    };
    
    sessionStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
    console.log(bookingDetails)

    // {
    //   "movieId": bookingDetails.movieId,
    //   "showDate": bookingDetails.showDate,
    //   "showTime": bookingDetails.showTime,
    //   "seats": bookingDetails.selectedSeats,
    //   "userId": bookingDetails.userId
    // }
    
    
    // Navigate to checkout
    navigate(`/checkout/${id}`, { 
      state: { bookingDetails } 
    });
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!movie) return <div className="error">Movie not found</div>;

  return (
    <div className="seat-booking-container">
      <div className="movie-info">
        <h1>{movie.title}</h1>
        <p>{movie.description}</p>
      </div>

      <div className="booking-options">
      <div className="date-selection">
        {date ? (
          <div className="selected-option">
            <label>Date:</label>
            <span>{new Date(date).toLocaleDateString('en-IN', {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
        ) : (
          <>
           <label htmlFor="date">Select Date:</label>
          <select id="date" value={date} onChange={handleDateChange}>
            <option value="">-- Select a Date --</option>
            {(Array.isArray(movie.date) ? movie.date : [movie.date]).map((d, i) => (
              <option key={i} value={d}>
                {new Date(d).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </option>
            ))}
          </select>

          </>
        )}
      </div>

        <div className="showtime-selection">
          {showtime ? (
            <div className="selected-option">
              <label>Showtime:</label>
              <span>{showtime}</span>
            </div>
          ) : (
            <>
              <label htmlFor="showtime">Select Showtime:</label>
              <select id="showtime" value={showtime} onChange={handleShowtimeChange}>
                <option value="">Select a time</option>
                {showtimes.map((time, index) => (
                  <option key={index} value={time}>{time}</option>
                ))}
              </select>
            </>
          )}
        </div>
        
        {theaterName && (
          <div className="theater-selection">
            <div className="selected-option">
              <label>Theater:</label>
              <span>{movie.theaterName}</span>
            </div>
          </div>
        )}
      </div>

      <div className="seating-chart">
        <div className="screen">
          <div className="screen-text">Screen</div>
        </div>
        
        <div className="seats-container">
          {rows.map(row => (
            <div key={row} className="seat-row">
              <div className="row-label">{row}</div>
              {Array.from({ length: seatsPerRow }, (_, i) => {
                const seatNum = i + 1;
                const seatId = `${row}${seatNum}`;
                const isBooked = bookedSeats.includes(seatId);
                const isSelected = selectedSeats.includes(seatId);
                
                return (
                  <div 
                    key={seatId}
                    className={`seat ${isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSeatClick(seatId)}
                    title={isBooked ? 'Seat already booked' : `Seat ${seatId}`}
                  >
                    {seatNum}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        
        <div className="seat-legend">
          <div className="legend-item">
            <div className="seat"></div>
            <span>Available</span>
          </div>
          <div className="legend-item">
            <div className="seat selected"></div>
            <span>Selected</span>
          </div>
          <div className="legend-item">
            <div className="seat booked"></div>
            <span>Booked</span>
          </div>
        </div>
      </div>

      <div className="booking-summary">
        <h3>Booking Summary</h3>
        <div className="summary-row">
          <span>Movie:</span>
          <span>{movie.title}</span>
        </div>
        {date && (
          <div className="summary-row">
            <span>Date:</span>
            <span>{new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
          </div>
        )}
        {showtime && (
          <div className="summary-row">
            <span>Time:</span>
            <span>{showtime}</span>
          </div>
        )}
        {theaterName && (
          <div className="summary-row">
            <span>Theater:</span>
            <span>{theaterName}</span>
          </div>
        )}
        <div className="summary-row">
          <span>Seats:</span>
          <span>{selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None selected'}</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>${(selectedSeats.length * price + seatcost).toFixed(2)}</span>
        </div>
        
        <button 
          className="checkout-btn"
          onClick={handleProceedToCheckout}
          disabled={selectedSeats.length === 0 || !date || !showtime}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default SeatBooking;