import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../redux/slices/authSlice';
import styled from 'styled-components';
import { FaSearch, FaUser, FaSignOutAlt, FaBars, FaTimes, FaHeart } from 'react-icons/fa';
import { Weight } from 'lucide-react';
import '../components/Layout/Navbar.css'

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
    setIsMenuOpen(false);
  };

  const goToSearch = () => {
    navigate('/search');
  };
  const query = searchQuery.toLowerCase().trim();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo">
            <span>Flick</span>Fusion
          </Link>

          {/* <form onSubmit={goToSearch}>
              <input
                type="text"
                placeholder="Search for Movies, Events, MiniTV..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              /> */}

            {/* </form> */}
           
        </div>
        
          
        {/* </div> */}

        <div className="navbar-right">
        

        <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/Movies" className="nav-link">Movies</Link>
            <Link to="/events" className="nav-link">Events</Link>
            <Link to="/Minitv" className="nav-link">MiniTV</Link>
            {user && <Link to="/MyBookings" className="nav-link">Bookings</Link>}
            {user && <Link to="/Favourites" className="nav-link">Favourites</Link>}
          </div>
          <div className="search-bar">
          <Link to="/search" className="search-button">
          <button className='searchbutton' type="submit">
                {/* <FaSearch /> */}
                <i className="fas fa-search"><FaSearch/></i>
        </button>
          </Link>
          </div>
          {user ? (
            <UserMenu ref={menuRef}>
              <UserButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <FaUser />
              </UserButton>
              {isMenuOpen && (
                <DropdownMenu>
                  <UserInfo>
                    <UserName>{user.name}</UserName>
                    <UserEmail>{user.email}</UserEmail>
                  </UserInfo>
                  <MenuDivider />
                  <MenuItem to="/profile">
                    <FaUser /> Profile
                  </MenuItem>
                  <MenuItem to="/MyBookings">
                    <FaHeart /> Bookings
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem as="button" onClick={onLogout} style={{backgroundColor:'#f84464', fontWeight:'bold'}}>
                    <FaSignOutAlt /> Logout
                  </MenuItem>
                </DropdownMenu>
              )}
            </UserMenu>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="auth-button">Login</Link> 
              {/* <Link to="/register" className="register-button"> Register</Link> */}
            </div>
          )}

          <button className="mobile-menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* {isMenuOpen && (
        <div className="mobile-menu">
          <Link to="/booking" className="mobile-menu-item" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/" className="mobile-menu-item" onClick={() => setIsMenuOpen(false)}>
            Shows
          </Link>
          <Link to="/search" className="mobile-menu-item" onClick={() => setIsMenuOpen(false)}>
            Search
          </Link>
          {user && (
            <>
              <Link to="/MyBookings" className="mobile-menu-item" onClick={() => setIsMenuOpen(false)}>
                Bookings
              </Link>
              <Link to="/profile" className="mobile-menu-item" onClick={() => setIsMenuOpen(false)}>
                Profile
              </Link>
              <button className="mobile-menu-item" onClick={onLogout}>
                Logout
              </button>
            </>
          )}
          {!user && (
            <>
              <Link to="/login" className="mobile-menu-item" onClick={() => setIsMenuOpen(false)}>
                Login  
              </Link>
              <Link to="/register" className="mobile-menu-item" onClick={() => setIsMenuOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      )} */}
    </nav>
  );
};


// const HeaderContainer = styled.header`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   z-index: 1000;
//   background-color: ${({ scrolled }) =>
//     scrolled ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.3)'};
//   transition: background-color 0.3s ease;
//   box-shadow: ${({ scrolled }) =>
//     scrolled ? '0 2px 10px rgba(0, 0, 0, 0.3)' : 'none'};
// `;

// const HeaderContent = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 1rem 2rem;
//   max-width: 1200px;
//   margin: 0 auto;

//   @media (max-width: 768px) {
//     padding: 1rem;
//   }
// `;

// const Logo = styled(Link)`
//   font-size: 1.8rem;
//   font-weight: 700;
//   color: white;
//   text-decoration: none;
  
//   span {
//     color: #e50914;
//   }

//   @media (max-width: 768px) {
//     font-size: 1.5rem;
//   }
// `;

// const NavLinks = styled.div`
//   display: flex;
//   gap: 1.5rem;

//   @media (max-width: 768px) {
//     display: none;
//   }
// `;

// const NavLink = styled(Link)`
//   color: white;
//   text-decoration: none;
//   font-weight: 500;
//   transition: color 0.3s ease;

//   &:hover {
//     color: #e50914;
//   }
// `;

// const HeaderRight = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1rem;
// `;

// const SearchButton = styled(Link)`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background-color: rgba(255, 255, 255, 0.1);
//   color: white;
//   transition: all 0.3s ease;

//   &:hover {
//     background-color: rgba(255, 255, 255, 0.2);
//     transform: translateY(-2px);
//   }

//   @media (max-width: 768px) {
//     display: none;
//   }
// `;

const UserMenu = styled.div`
  position: relative;
`;

const UserButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  width: 250px;
  background-color: #141414;
  border-radius: 4px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 1000;
`;

const UserInfo = styled.div`
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.05);
`;

const UserName = styled.div`
  font-weight: bold;
  color: white;
  margin-bottom: 0.25rem;
`;

const UserEmail = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
`;

const MenuDivider = styled.div`
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  color: white;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  svg {
    font-size: 1rem;
  }

  &[as="button"] {
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    font-family: inherit;
  }
`;

// const AuthButtons = styled.div`
//   display: flex;
//   gap: 0.5rem;

//   @media (max-width: 768px) {
//     display: none;
//   }
// `;

// const LoginButton = styled(Link)`
//   padding: 0.5rem 1rem;
//   border-radius: 4px;
//   background-color: transparent;
//   border: 1px solid white;
//   color: white;
//   text-decoration: none;
//   transition: all 0.3s ease;

//   &:hover {
//     background-color: rgba(255, 255, 255, 0.1);
//     transform: translateY(-2px);
//   }
// `;

// const RegisterButton = styled(Link)`
//   padding: 0.5rem 1rem;
//   border-radius: 4px;
//   background-color: #e50914;
//   color: white;
//   text-decoration: none;
//   transition: all 0.3s ease;

//   &:hover {
//     background-color: #f40612;
//     transform: translateY(-2px);
//   }
// `;

// const MobileMenuButton = styled.button`
//   display: none;
//   background: none;
//   border: none;
//   color: white;
//   font-size: 1.5rem;
//   cursor: pointer;

//   @media (max-width: 768px) {
//     display: block;
//   }
// `;

// const MobileMenu = styled.div`
//   display: none;
//   flex-direction: column;
//   background-color: #141414;
//   padding: 1rem;

//   @media (max-width: 768px) {
//     display: flex;
//   }
// `;

// const MobileMenuItem = styled(Link)`
//   padding: 0.75rem 1rem;
//   color: white;
//   text-decoration: none;
//   border-bottom: 1px solid rgba(255, 255, 255, 0.1);
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: rgba(255, 255, 255, 0.1);
//   }

//   &:last-child {
//     border-bottom: none;
//   }

//   &[as="button"] {
//     background: none;
//     border: none;
//     text-align: left;
//     font-size: 1rem;
//     font-family: inherit;
//     cursor: pointer;
//   }
// `;

export default Header; 