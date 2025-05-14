import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Layout/Footer';
import Events from './pages/Events';
import MiniTV from './pages/MiniTV';
import Login from './pages/Login';
import Register from './pages/Register';
import Movie from './pages/Movie';
import Movies from './pages/Movies';
import Watch from './pages/Watch';
import Search from './pages/Search';
import Category from './pages/Category';
import Profile from './pages/Profile';
import Browse from './pages/Browse';
import Home from './pages/Home';
import Seatbooking from './components/Checkout/Seatbooking';
import Seatbookings from './components/Checkevent/Seatbookings';
import Checkout from './components/Checkout/Checkout';
import Chatbot from './components/Chatbot/Chatbot';
import MyBookings from './pages/MyBookings';
import NotFound from './pages/NotFound';
import Favorites from './pages/Favorites';
import MoviesDetailsPage from './components/Movies/MoviesDetailsPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Chatbot />
        <main className="container">
          <Routes>
            <Route path="/MiniTV" element={<MiniTV />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movie/:id" element={<Movie />} />
            <Route path="/watch/:id" element={<Watch />} />
            <Route path="/search" element={<Search />} />
            <Route path="/Events" element={<Events />} />
            <Route path="/Movies" element={<Movies />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/seatbookings/:id" element={<Seatbookings />} />
            <Route path="/seatbooking/:id" element={<Seatbooking />} />
            <Route path="/checkout/:id" element={<Checkout />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/" element={<Home />} />
            <Route path="/Favourites" element={<Favorites />} />
            <Route path="/movies/:id" element={<MoviesDetailsPage />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/MyBookings"
              element={
                <PrivateRoute>
                  <MyBookings />
                </PrivateRoute>
              }
            />
            <Route
              path="/Favorites"
              element={
                <PrivateRoute>
                  <Favorites />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App; 