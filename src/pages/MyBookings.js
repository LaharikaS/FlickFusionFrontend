import React, { useEffect, useState } from 'react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [eventdetails, seteventdetails] = useState([]);
  const [loading, setLoading] = useState(true);


  const user = JSON.parse(localStorage.getItem('user')); 

  useEffect(() => {
    const fetchBookingsAndDetails = async () => {
      try {
        const bookingRes = await fetch(`https://flickfusion-backend-zn4d.onrender.com/api/booking/user/${user._id}`);
        const bookingData = await bookingRes.json();
        const userBookings = bookingData.bookings || [];
        setBookings(userBookings);
  
        // Get unique movieIds
        const movieIds = [...new Set(userBookings.map(b => b.movieId))];
  
        // Fetch details for all movieIds
        const detailsPromises = movieIds.map(id =>
          fetch(`https://flickfusion-backend-zn4d.onrender.com/api/event/${id}`).then(res => res.json())
        );
        const eventDetailsArray = await Promise.all(detailsPromises);
  
        // Create a map: movieId => eventDetail
        const eventMap = {};
        movieIds.forEach((id, idx) => {
          eventMap[id] = eventDetailsArray[idx];
        });
  
        seteventdetails(eventMap);
      } catch (error) {
        console.error('Error fetching bookings or event details:', error);
      } finally {
        setLoading(false);
      }
    };
  
    if (user?._id) {
      fetchBookingsAndDetails();
    }
  }, [user]);
  
  

 

  if (loading) return <p>Loading your bookings...</p>;

  const handleDelete = async (bookingId) => {
    try {
      // Send DELETE request to remove the booking
      const response = await fetch(`/api/booking/${bookingId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // If successful, update the UI by removing the deleted booking
        setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== bookingId));
      } else {
        alert('Failed to delete booking. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      alert('An error occurred while deleting the booking.');
    }
  };


  return (
<div style={{ padding: '20px' }}>
  {bookings.map((booking, index) => {
    const event = eventdetails[booking.movieId] || {};

    return (
      <div
        key={index}
        className="booking-card"
        style={{
          border: '1px solid #ccc',
          borderRadius: '10px',
          padding: '15px',
          marginBottom: '20px',
          backgroundColor: '#1c1c1c',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '20px',
        }}
      >
        <div style={{ display: 'flex', flex: 1, gap: '20px' }}>
          <div className="event-image" style={{ width: '100px', height: '150px' }}>
            <img
              src={event.image || 'https://via.placeholder.com/100x150?text=No+Image'}
              alt={booking.movie}
              style={{ width: '100%', height: '100%', borderRadius: '8px', objectFit: 'cover' }}
            />
          </div>
          <div>
            <h3 style={{color:'white'}}>{booking.movie || 'Unknown'}</h3>
            <p><strong>📅 Date:</strong> {new Date(booking.showDate).toLocaleDateString()}</p>
            <p><strong>⏰ Time:</strong> {booking.showTime}</p>
            <p>
              <strong>🪑 Seats:</strong>{' '}
              {Array.isArray(booking.bookedSeats) ? booking.bookedSeats.join(', ') : 'No seats booked'}
            </p>
            <p><strong>📍 Venue:</strong> {event.venue || 'Venue not specified'}</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', paddingTop:'50px'}}>
          <button
            style={{
              backgroundColor: '#f84464',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              height: 'fit-content',
              whiteSpace: 'nowrap',
            }}
            onClick={() => handleDelete(booking._id)}
          >
            Delete Booking
          </button>
        </div>
      </div>
    );
  })}
</div>

  );
};  

export default MyBookings;
