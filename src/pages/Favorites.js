import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getFavorites } from '../redux/slices/movieSlice';
import Spinner from '../components/Spinner';
import MovieCard from '../components/MovieCard';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Favorites = () => {
  const dispatch = useDispatch();
  const { favorites, isLoading } = useSelector((state) => state.movies);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(getFavorites());
    }
  }, [dispatch, user]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    return (
      <FavoritesContainer>
        <FavoritesHeader>
          <FavoritesTitle>My Favorites</FavoritesTitle>
        </FavoritesHeader>
        <NoFavoritesMessage>
          <p>Please log in to view your favorites.</p>
          <LoginButton to="/login">Log In</LoginButton>
        </NoFavoritesMessage>
      </FavoritesContainer>
    );
  }

  return (
    <FavoritesContainer>
      <FavoritesHeader>
        <FavoritesTitle>
          <FaHeart /> My Favorites
        </FavoritesTitle>
      </FavoritesHeader>

      {favorites && favorites.length > 0 ? (
        <MoviesGrid>
          {favorites.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </MoviesGrid>
      ) : (
        <NoFavoritesMessage>
          <p>You haven't added any movies to your favorites yet.</p>
          <BrowseButton to="/browse">Browse Movies</BrowseButton>
        </NoFavoritesMessage>
      )}
    </FavoritesContainer>
  );
};

const FavoritesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const FavoritesHeader = styled.div`
  margin-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 1rem;
`;

const FavoritesTitle = styled.h1`
  font-size: 2rem;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: ##f84464;
  }
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
`;

const NoFavoritesMessage = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  margin-top: 2rem;

  p {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    color: #ccc;
  }
`;

const BrowseButton = styled(Link)`
  display: inline-block;
  background-color: ##f84464;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background-color: ##f84464;
    transform: translateY(-2px);
  }
`;

const LoginButton = styled(Link)`
  display: inline-block;
  background-color: ##f84464;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background-color: ##f84464;
    transform: translateY(-2px);
  }
`;

export default Favorites; 