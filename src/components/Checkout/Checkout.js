import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../../Contexts/AuthContext';
import './Checkout.css';

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  // const { currentUser } = useAuth();
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const userId = storedUser?._id;
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Get booking details from location state or session storage
  const [bookingDetails, setBookingDetails] = useState(null);
  
  useEffect(() => {
    // Check if user is logged in
    if (!userId) {
      navigate('/login', { 
        state: { 
          redirectTo: `/checkout/${id}`,
          message: 'Please login to proceed with checkout' 
        } 
      });
      return;
    }
    
    // Get booking details
    let details = location.state?.bookingDetails;
    
    // If not available in location state, try session storage
    if (!details) {
      const storedDetails = sessionStorage.getItem('bookingDetails');
      if (storedDetails) {
        details = JSON.parse(storedDetails);
      }
    }
    
    // If still no details, redirect to seat booking page
    if (!details) {
      navigate(`/seatbooking/${id}`);
      return;
    }
    
    setBookingDetails(details);
  }, [userId, id, location.state, navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (paymentMethod === 'card') {
      if (!cardNumber || !cardExpiry || !cardCvv || !nameOnCard) {
        alert('Please fill in all card details');
        return;
      }
    }
    
    try {
      setLoading(true);
  
      // Simulate payment processing
      console.log("Processing payment...");
      await new Promise(resolve => setTimeout(resolve, 1500));
  
      // Get booking details from session storage
      const bookingDetails = JSON.parse(sessionStorage.getItem('bookingDetails'));
      console.log(bookingDetails)
      // POST booking details to backend
      const response = await fetch('https://flickfusion-backend-zn4d.onrender.com/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movieId: bookingDetails.movieId,
          showDate: bookingDetails.showDate,
          showTime: bookingDetails.showtime,
          seats: bookingDetails.selectedSeats,
          userId: bookingDetails.userId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Booking successful:', data);
  
        // Clear session storage
        sessionStorage.removeItem('bookingDetails');
  
        // Show success message and redirect
        alert('Booking successful! Thank you for your purchase.');
        navigate('/MyBookings'); // or navigate(`/confirmation/${data.bookingId}`) if applicable
  
      } else {
        const errorData = await response.json();
        console.error('Booking failed:', errorData.message || response.statusText);
        alert('Booking failed. Please try again.');
      }
  
    } catch (error) {
      console.error('Payment or booking error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  if (!bookingDetails) return <div className="loading">Loading booking details...</div>;
  
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1 style={{color: 'white'}}>Complete Your Purchase</h1>
      </div>
      
      <div className="checkout-content">
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-item">
            <span>Movie:</span>
            <span>{bookingDetails.movieTitle}</span>
          </div>
          <div className="summary-item">
            <span>Date:</span>
            <span>{new Date(bookingDetails.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="summary-item">
            <span>Time:</span>
            <span>{bookingDetails.showtime}</span>
          </div>
          {bookingDetails.theaterName && (
            <div className="summary-item">
              <span>Theater:</span>
              <span>{bookingDetails.theaterName}</span>
            </div>
          )}
          <div className="summary-item">
            <span>Seats:</span>
            <span>{bookingDetails.selectedSeats.join(', ')}</span>
          </div>
          <div className="summary-item total">
            <span>Total:</span>
            <span>${bookingDetails.totalPrice}</span>
          </div>
        </div>
        
        <div className="payment-section">
          <h2>Payment Details</h2>
          
          <form onSubmit={handleSubmit} className="payment-form">
            <div className="payment-methods">
              <div className="method-selection">
                <input 
                  type="radio" 
                  id="card" 
                  name="paymentMethod" 
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                />
                <label htmlFor="card">Credit/Debit Card</label>
              </div>
              
              <div className="method-selection">
                <input 
                  type="radio" 
                  id="paypal" 
                  name="paymentMethod" 
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={() => setPaymentMethod('paypal')}
                />
                <label htmlFor="paypal">PayPal</label>
              </div>
            </div>
            
            {paymentMethod === 'card' && (
              <div className="card-details">
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cardExpiry">Expiry Date</label>
                    <input
                      type="text"
                      id="cardExpiry"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="cardCvv">CVV</label>
                    <input
                      type="text"
                      id="cardCvv"
                      placeholder="123"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="nameOnCard">Name on Card</label>
                  <input
                    type="text"
                    id="nameOnCard"
                    placeholder="John Doe"
                    value={nameOnCard}
                    onChange={(e) => setNameOnCard(e.target.value)}
                  />
                </div>
              </div>
            )}
            
            {paymentMethod === 'paypal' && (
              <div className="paypal-info">
                <p>You will be redirected to PayPal to complete your payment after clicking "Complete Purchase".</p>
              </div>
            )}
            
            <button 
              type="submit" 
              className="purchase-button"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Complete Purchase'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;