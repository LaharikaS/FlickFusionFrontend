import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';
import { FaSearch } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      // Define local search data
      const searchData = {
        movies: [
          { id: 'm1', title: 'Venom: Last Dance', category: 'movies' },
          { id: 'm2', title: 'Deadpool & Wolverine', category: 'movies' }
        ],
        events: [
          { id: 'e1', title: 'Live Concert Experience', category: 'events' },
          { id: 'e2', title: 'Comic Convention 2024', category: 'events' }
        ],

      };

      // Perform local search
      const query = searchQuery.toLowerCase().trim();
      const results = {
        movies: searchData.movies.filter(m => m.title.toLowerCase().includes(query)),
        events: searchData.events.filter(e => e.title.toLowerCase().includes(query)),
      };

      // Store results in localStorage for the search page to access
      localStorage.setItem('searchResults', JSON.stringify(results));

      // Navigate to search page with query parameter
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left Section */}
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            Flick-Fusion
          </Link>
          <div className="search-bar">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search for Movies, Events, MiniTV..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">
                <i className="fas fa-search"><FaSearch/></i>
              </button>
            </form>
          </div>
        </div>

        {/* Right Section */}
        <div className="navbar-right">
          {/* Mobile Menu Button */}
          <div className="mobile-menu-button" onClick={toggleMenu} aria-expanded={isMenuOpen}>
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bar'}`}>
              {isMenuOpen ? '✖' : '☰'}
            </i>
          </div>

          {/* Navigation Links */}
          <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/events" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Events
            </Link>
            <Link to="/movies" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              Movies
            </Link>
            <Link to="/minitv" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              MiniTV
            </Link>
            {user ? (
              <>
                <span className="user-name">Hi, {user.name}</span>
                <button className="auth-button" onClick={handleLogout}>
                  Sign out
                </button>
              </>
            ) : (
              <Link to="/login" className="auth-button" onClick={() => setIsMenuOpen(false)}>
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
