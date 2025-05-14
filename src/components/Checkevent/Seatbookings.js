import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
// import api from '../../Services/api';
import './Seatbookings.css';

const Seatbookings = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    paymentMethod: 'creditCard'
  });
  const [formErrors, setFormErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  
  // Seat selection state
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatMap, setSeatMap] = useState({});
  const [seatCategories, setSeatCategories] = useState({
    vip: { name: 'VIP', price: 150, color: '#FFD700' },
    premium: { name: 'Premium', price: 100, color: '#FF6B6B' },
    standard: { name: 'Standard', price: 75, color: '#4CAF50' },
    economy: { name: 'Economy', price: 50, color: '#2196F3' }
  });
  
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://flickfusion-backend-zn4d.onrender.com/api/event/${id}`);
        setEvent(response.data);
        setError(null);
        
        // Generate seat map for the event
        generateSeatMap(response.data);
      } catch (err) {
        console.error('Error fetching event details:', err);
        setError('Failed to load event details.');
        
        // Use mock event as fallback data
        const mockEvent = {
          _id: id,
          title: id === 'e1' ? 'Live Concert Experience' : 'Stand-Up Comedy Night',
          image: `https://via.placeholder.com/1200x600?text=${id === 'e1' ? 'Live+Concert+Experience' : 'Stand-Up+Comedy+Night'}`,
          dateTime: id === 'e1' ? '2025-05-15T19:30:00' : '2025-06-10T20:00:00',
          venue: id === 'e1' ? 'Metro Concert Hall' : 'Downtown Comedy Club',
          address: id === 'e1' ? '123 Music Avenue, Downtown' : '456 Laugh Lane, Uptown',
          price: id === 'e1' ? 50 : 30,
          description: id === 'e1'
            ? 'Join us for an unforgettable night of live music featuring the hottest bands in town.'
            : 'Laugh out loud with the best comedians in the business at our Stand-Up Comedy Night.',
          organizer: id === 'e1' ? 'City Entertainment Group' : 'Comedy Central Events',
          contactEmail: id === 'e1' ? 'events@cityentertainment.com' : 'info@comedycentral.com',
          contactPhone: id === 'e1' ? '(555) 123-4567' : '(555) 987-6543',
          seatingMap: `https://via.placeholder.com/800x600?text=${id === 'e1' ? 'Concert+Seating+Map' : 'Comedy+Seating+Map'}`,
        };
        setEvent(mockEvent);
        
        // Generate seat map for the mock event
        generateSeatMap(mockEvent);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  // Generate a seat map based on the venue size
  const generateSeatMap = (eventData) => {
    // This would typically come from the API with actual seat data
    // For this example, we'll create a simulated seat map
    const rows = 10;
    const seatsPerRow = 15;
    const generatedMap = {};
    
    const seatTypes = ['vip', 'premium', 'standard', 'economy'];
    
    // Create rows A through J
    for (let i = 0; i < rows; i++) {
      const rowLetter = String.fromCharCode(65 + i);
      generatedMap[rowLetter] = [];
      
      for (let j = 1; j <= seatsPerRow; j++) {
        let seatType;
        
        // Assign seat types based on position
        if (i < 2) {
          seatType = 'vip'; // First 2 rows are VIP
        } else if (i < 4) {
          seatType = 'premium'; // Next 2 rows are Premium
        } else if (i < 8) {
          seatType = 'standard'; // Next 4 rows are Standard
        } else {
          seatType = 'economy'; // Last 2 rows are Economy
        }
        
        // Add some randomness to simulate already booked seats
        const isBooked = Math.random() < 0.3;
        
        generatedMap[rowLetter].push({
          id: `${rowLetter}${j}`,
          row: rowLetter,
          number: j,
          type: seatType,
          price: seatCategories[seatType].price,
          booked: isBooked
        });
      }
    }
    
    setSeatMap(generatedMap);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: value
    });
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!customerInfo.fullName.trim()) {
      errors.fullName = 'Full name is required';
    }
    
    if (!customerInfo.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!customerInfo.phone.trim()) {
      errors.phone = 'Phone number is required';
    }
    
    if (selectedSeats.length === 0) {
      errors.seats = 'Please select at least one seat';
    }
    
    return errors;
  };

  const toggleSeatSelection = (seat) => {
    if (seat.booked) return; // Cannot select already booked seats
    
    const seatIndex = selectedSeats.findIndex(s => s.id === seat.id);
    
    if (seatIndex > -1) {
      // Deselect the seat
      setSelectedSeats(selectedSeats.filter((_, index) => index !== seatIndex));
    } else {
      // Select the seat
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const calculateTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => total + seat.price, 0);
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would make an API call to create the booking
      // const response = await api.post('/bookings', {
      //   eventId: id,
      //   seats: selectedSeats.map(seat => seat.id),
      //   customerInfo,
      //   totalPrice: calculateTotalPrice()
      // });
      
      // Generate a mock booking reference
      const mockReference = `BK-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;
      setBookingReference(mockReference);
      setBookingComplete(true);
    } catch (err) {
      console.error('Error processing booking:', err);
      setError('Failed to process your booking. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading seat booking...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="error-container">
        <h2>Event not found</h2>
        <p>The event you're trying to book doesn't exist or has been removed.</p>
        <Link to="/booking" className="back-link">Browse all events</Link>
      </div>
    );
  }

  if (bookingComplete) {
    return (
      <div className="seat-booking-page">
        <div className="booking-confirmation">
          <div className="confirmation-header">
            <i className="confirmation-icon">✓</i>
            <h1>Booking Confirmed!</h1>
          </div>
          
          <div className="confirmation-details">
            <h2>Thank you, {customerInfo.fullName}!</h2>
            <p>Your seats for <strong>{event.title}</strong> have been booked successfully.</p>
            
            <div className="booking-summary">
              <div className="summary-item">
                <span className="summary-label">Booking Reference:</span>
                <span className="summary-value">{bookingReference}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Event:</span>
                <span className="summary-value">{event.title}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Date:</span>
                <span className="summary-value">{formatDate(event.dateTime)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Time:</span>
                <span className="summary-value">{formatTime(event.dateTime)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Venue:</span>
                <span className="summary-value">{event.venue}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Seats:</span>
                <span className="summary-value">
                  {selectedSeats.map(seat => `${seat.row}${seat.number}`).join(', ')}
                </span>
              </div>
              <div className="summary-item total">
                <span className="summary-label">Total Paid:</span>
                <span className="summary-value">${calculateTotalPrice().toFixed(2)}</span>
              </div>
            </div>
            
            <p className="confirmation-message">
              A confirmation email has been sent to <strong>{customerInfo.email}</strong>. 
              Please check your inbox for booking details and e-tickets.
            </p>
          </div>
          
          <div className="confirmation-actions">
            <button className="primary-button" onClick={() => navigate('/events')}>
              Browse More Events
            </button>
            
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="seat-booking-page">
      <div className="booking-header">
        <h1>Select Your Seats</h1>
        <Link to={`/events/${id}`} className="back-link">
          <i className="fas fa-arrow-left">←</i> Back to Event
        </Link>
      </div>

      <div className="booking-content">
        <div className="booking-main">
          <section className="event-details-section">
            <h2>Event Details</h2>
            <div className="event-summary">
              <div className="event-image">
                <img src={event.image} alt={event.title} />
              </div>
              <div className="event-info">
                <h3>{event.title}</h3>
                <p className="event-date">
                  <i className="fas fa-calendar">📅</i> {formatDate(event.dateTime)}
                </p>
                <p className="event-time">
                  <i className="fas fa-clock">⏰</i> {formatTime(event.dateTime)}
                </p>
                <p className="event-venue">
                  <i className="fas fa-map-marker-alt">📍</i> {event.venue}
                </p>
              </div>
            </div>
          </section>

          <section className="seat-selection-section">
            <h2>Select Your Seats</h2>
            
            <div className="seat-map-container">
              <div className="seat-categories">
                {Object.entries(seatCategories).map(([key, category]) => (
                  <div className="seat-category" key={key}>
                    <div className="seat-sample" style={{ backgroundColor: category.color }}></div>
                    <span className="category-name">{category.name}</span>
                    <span className="category-price">${category.price}</span>
                  </div>
                ))}
              </div>
              
              <div className="seat-map-legend">
                <div className="legend-item">
                  <div className="seat-sample available"></div>
                  <span>Available</span>
                </div>
                <div className="legend-item">
                  <div className="seat-sample selected"></div>
                  <span>Selected</span>
                </div>
                <div className="legend-item">
                  <div className="seat-sample booked"></div>
                  <span>Booked</span>
                </div>
              </div>
              
              <div className="stage-area">
                <div className="stage">STAGE</div>
              </div>
              
              <div className="seat-map">
                {Object.entries(seatMap).map(([row, seats]) => (
                  <div className="seat-row" key={row}>
                    <div className="row-label">{row}</div>
                    <div className="seats">
                      {seats.map((seat) => {
                        const isSelected = selectedSeats.some(s => s.id === seat.id);
                        return (
                          <div 
                            key={seat.id} 
                            className={`seat ${seat.booked ? 'booked' : 'available'} ${isSelected ? 'selected' : ''}`}
                            style={{ backgroundColor: seat.booked ? '#ccc' : (isSelected ? '#FF9800' : seatCategories[seat.type].color) }}
                            onClick={() => toggleSeatSelection(seat)}
                            title={`${seat.row}${seat.number} - ${seatCategories[seat.type].name} - $${seat.price}`}
                          >
                            {seat.number}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              
              {formErrors.seats && <div className="error-message seat-error">{formErrors.seats}</div>}
            </div>
          </section>

          <form className="booking-form" onSubmit={handleSubmit}>
            <section className="customer-info-section">
              <h2>Your Information</h2>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={customerInfo.fullName}
                  onChange={handleInputChange}
                  className={formErrors.fullName ? 'error' : ''}
                />
                {formErrors.fullName && <span className="error-message">{formErrors.fullName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  className={formErrors.email ? 'error' : ''}
                />
                {formErrors.email && <span className="error-message">{formErrors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  className={formErrors.phone ? 'error' : ''}
                />
                {formErrors.phone && <span className="error-message">{formErrors.phone}</span>}
              </div>
            </section>

            <section className="payment-section">
              <h2>Payment Method</h2>
              <div className="payment-options">
                <div className="payment-option">
                  <input
                    type="radio"
                    id="creditCard"
                    name="paymentMethod"
                    value="creditCard"
                    checked={customerInfo.paymentMethod === 'creditCard'}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="creditCard">
                    <i className="fas fa-credit-card">💳</i> Credit Card
                  </label>
                </div>

                <div className="payment-option">
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    value="paypal"
                    checked={customerInfo.paymentMethod === 'paypal'}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="paypal">
                    <i className="fab fa-paypal">💰</i> PayPal
                  </label>
                </div>
              </div>

              {customerInfo.paymentMethod === 'creditCard' && (
                <div className="credit-card-form">
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group half">
                      <label htmlFor="expiryDate">Expiry Date</label>
                      <input
                        type="text"
                        id="expiryDate"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="form-group half">
                      <label htmlFor="cvv">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        placeholder="123"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="nameOnCard">Name on Card</label>
                    <input
                      type="text"
                      id="nameOnCard"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}
            </section>

            {error && (
              <div className="booking-error">
                <p>{error}</p>
              </div>
            )}

            <div className="form-actions">
              <button 
                type="submit" 
                className="complete-booking-button"
                disabled={isProcessing || selectedSeats.length === 0}
              >
                {isProcessing ? 'Processing...' : 'Complete Booking'}
              </button>
            </div>
          </form>
        </div>

        <div className="booking-sidebar">
          <div className="selected-seats-summary">
            <h2>Selected Seats</h2>
            
            {selectedSeats.length === 0 ? (
              <p className="no-seats-message">No seats selected yet</p>
            ) : (
              <div className="selected-seats-list">
                {selectedSeats.map((seat) => (
                  <div className="selected-seat-item" key={seat.id}>
                    <div className="seat-info">
                      <span className="seat-label">{seat.row}{seat.number}</span>
                      <span className="seat-type">{seatCategories[seat.type].name}</span>
                    </div>
                    <span className="seat-price">${seat.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-line">
              <span>Selected Seats ({selectedSeats.length})</span>
              <span>${calculateTotalPrice().toFixed(2)}</span>
            </div>
            <div className="summary-line service-fee">
              <span>Service Fee</span>
              <span>${(calculateTotalPrice() * 0.05).toFixed(2)}</span>
            </div>
            <div className="summary-line total">
              <span>Total</span>
              <span>${(calculateTotalPrice() * 1.05).toFixed(2)}</span>
            </div>
          </div>

          <div className="event-policies">
            <h3>Event Policies</h3>
            <ul>
              <li>All sales are final. No refunds or exchanges.</li>
              <li>Seats are transferable up to 24 hours before the event.</li>
              <li>Please arrive 30 minutes before the event starts.</li>
              <li>Proof of identity may be required at entry.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seatbookings;