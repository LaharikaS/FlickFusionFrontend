import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../../Services/api';
import './Checkevent.css';

const CheckoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ticketCount, setTicketCount] = useState(1);
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

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/events/${id}`);
        setEvent(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching event details:', err);
        setError('Failed to load event details.');
        // Navigate back to events page if event cannot be found
        navigate('/events');
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id, navigate]);

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
    
    return errors;
  };

  const handleTicketCountChange = (change) => {
    const newCount = ticketCount + change;
    if (newCount >= 1 && newCount <= 10) {
      setTicketCount(newCount);
    }
  };

  const calculateTotalPrice = () => {
    if (!event || !event.price) return 0;
    return event.price * ticketCount;
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
      //   tickets: ticketCount,
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

  const handleBookTickets = () => {
    navigate(`/seatbookings/${id}`, {
      state: {
        eventId: event._id,
        eventTitle: event.title,
        eventPrice: event.price,
        eventDateTime: event.dateTime,
        eventVenue: event.venue,
        eventAddress: event.address,
        eventOrganizer: event.organizer,
        seatingMap: event.seatingMap,
      },
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading checkout...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="error-container">
        <h2>Event not found</h2>
        <p>The event you're trying to book doesn't exist or has been removed.</p>
        <Link to="/events" className="back-link">Browse all events</Link>
      </div>
    );
  }

  if (bookingComplete) {
    return (
      <div className="checkout-page">
        <div className="booking-confirmation">
          <div className="confirmation-header">
            <i className="confirmation-icon">✓</i>
            <h1>Booking Confirmed!</h1>
          </div>
          
          <div className="confirmation-details">
            <h2>Thank you, {customerInfo.fullName}!</h2>
            <p>Your tickets for <strong>{event.title}</strong> have been booked successfully.</p>
            
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
                <span className="summary-label">Tickets:</span>
                <span className="summary-value">{ticketCount}</span>
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
            <button className="secondary-button" onClick={() => navigate('/my-bookings')}>
              View My Bookings
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1>Complete Your Booking</h1>
        <Link to={`/events/${id}`} className="back-link">
          <i className="fas fa-arrow-left">←</i> Back to Event
        </Link>
      </div>

      <div className="checkout-content">
        <div className="checkout-main">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <section className="form-section">
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

            <section className="form-section">
              <h2>Tickets</h2>
              <div className="ticket-selector">
                <div className="ticket-type">
                  <span>Standard Admission</span>
                  <span className="ticket-price">${event.price}</span>
                </div>
                <div className="ticket-quantity">
                  <button 
                    type="button" 
                    className="quantity-btn"
                    onClick={() => handleTicketCountChange(-1)}
                    disabled={ticketCount <= 1}
                  >
                    −
                  </button>
                  <span className="quantity-display">{ticketCount}</span>
                  <button 
                    type="button" 
                    className="quantity-btn"
                    onClick={() => handleTicketCountChange(1)}
                    disabled={ticketCount >= 10}
                  >
                    +
                  </button>
                </div>
              </div>
              <p className="ticket-limit-note">* Maximum 10 tickets per order</p>
            </section>

            <section className="form-section">
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

            <section className="form-section">
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
              <div className="checkout-error">
                <p>{error}</p>
              </div>
            )}

            <div className="form-actions">
              <button 
                type="submit" 
                className="complete-booking-button"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Complete Booking'}
              </button>
            </div>
          </form>
        </div>

        <div className="checkout-sidebar">
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-line">
              <span>Standard Admission × {ticketCount}</span>
              <span>${(event.price * ticketCount).toFixed(2)}</span>
            </div>
            <div className="summary-line service-fee">
              <span>Service Fee</span>
              <span>${(event.price * ticketCount * 0.05).toFixed(2)}</span>
            </div>
            <div className="summary-line total">
              <span>Total</span>
              <span>${(event.price * ticketCount * 1.05).toFixed(2)}</span>
            </div>
          </div>

          <div className="event-policies">
            <h3>Event Policies</h3>
            <ul>
              <li>All sales are final. No refunds or exchanges.</li>
              <li>Tickets are transferable up to 24 hours before the event.</li>
              <li>Please arrive 30 minutes before the event starts.</li>
              <li>Proof of identity may be required at entry.</li>
            </ul>
          </div>

          <button 
            className="book-tickets-button"
            disabled={!event.dateTime || !event.venue}
            onClick={handleBookTickets}
          >
            Book Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;