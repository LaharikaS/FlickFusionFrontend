import React, { useState } from "react";
import "./movieBooking.css"; // CSS styles (see below)

const MovieBookingForm = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const totalSeats = 20;

  const toggleSeat = (seatNumber) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    const bookingData = {
      movie: form.movie.value,
      showtime: form.showtime.value,
      name: form.name.value,
      email: form.email.value,
      selectedSeats,
    };

    console.log("Booking confirmed:", bookingData);
    alert(`🎟️ Booking confirmed for ${bookingData.movie} at ${bookingData.showtime}!\nSeats: ${selectedSeats.join(", ")}`);

    form.reset();
    setSelectedSeats([]);
  };

  return (
    <div>
      <h2>Book Your Movie Ticket</h2>
      <form id="movieForm" onSubmit={handleSubmit}>
        <label>
          Movie:
          <select name="movie" required>
            <option value="Inception">Inception</option>
            <option value="Oppenheimer">Oppenheimer</option>
            <option value="Dune 2">Dune 2</option>
          </select>
        </label>
        <br />

        <label>
          Showtime:
          <select name="showtime" required>
            <option value="10:00 AM">10:00 AM</option>
            <option value="2:00 PM">2:00 PM</option>
            <option value="6:00 PM">6:00 PM</option>
          </select>
        </label>
        <br />

        <label>
          Name:
          <input type="text" name="name" required />
        </label>
        <br />

        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <br />

        <div id="seats">
          <p>Select Your Seats:</p>
          <div className="seat-grid">
            {Array.from({ length: totalSeats }, (_, i) => {
              const seatNum = (i + 1).toString();
              const isSelected = selectedSeats.includes(seatNum);
              return (
                <div
                  key={seatNum}
                  className={`seat ${isSelected ? "selected" : ""}`}
                  onClick={() => toggleSeat(seatNum)}
                >
                  {seatNum}
                </div>
              );
            })}
          </div>
        </div>

        <button type="submit">Book Ticket</button>
      </form>
    </div>
  );
};

export default MovieBookingForm;
