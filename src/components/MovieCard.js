import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaStar, FaHeart, FaRegHeart, FaPlay } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { favorites } = useSelector((state) => state.movies);
  const userToken = localStorage.getItem('token');
  const isFavorite = favorites?.some((fav) => fav._id === movie._id);

  const handleFavoriteToggle = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please log in to add favorites');
      return;
    }

    if (isFavorite) {
      const res = await fetch(`https://flickfusion-backend-zn4d.onrender.com/api/user/favorites/${movie._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${userToken}`, // Add your auth token
        },
      });
      if (!res.ok) throw new Error('Failed to remove favorite');

      toast.success('Removed from favorites');
      // setIsFavorite(false); // Update local state


      toast.success('Removed from favorites');
    } else {
      // Add to favorites
      // dispatch(addToFavorites(movie._id));
       // Add to favorites
       const res = await fetch('https://flickfusion-backend-zn4d.onrender.com/api/user/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ movieId: movie._id }),
      });

      if (!res.ok) throw new Error('Failed to add favorite');

      toast.success('Added to favorites');
    }
  };

  return (
    <CardContainer style={{padding:'5%'}} to={`/movie/${movie._id}`}>
      <CardImage src={movie.posterImage} alt={movie.title} />
      <CardOverlay>
        <CardButtons>
          <WatchButton to={`/watch/${movie._id}`}>
            <FaPlay /> Watch
          </WatchButton>
          <FavoriteButton onClick={handleFavoriteToggle}>
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </FavoriteButton>
        </CardButtons>
        <CardInfo>
          <CardTitle>{movie.title}</CardTitle>
          <CardMeta>
            <CardYear>{movie.year}</CardYear>
            <CardRating>
              <FaStar /> {movie.rating}
            </CardRating>
          </CardMeta>
        </CardInfo>
      </CardOverlay>
    </CardContainer>
  );
};

const CardContainer = styled(Link)`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: block;
  text-decoration: none;
  background-color: #141414;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  aspect-ratio: 2/3;
`;

const CardOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0) 100%);
  padding: 1.5rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const CardButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;

  ${CardContainer}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const WatchButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #e50914;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;

  &:hover {
    background-color: #f40612;
  }
`;

const FavoriteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  svg {
    color: #e50914;
    font-size: 1.1rem;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const CardInfo = styled.div`
  transition: transform 0.3s ease;

  ${CardContainer}:hover & {
    transform: translateY(-5px);
  }
`;

const CardTitle = styled.h3`
  color: white;
  font-size: 1rem;
  margin: 0 0 0.5rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
`;

const CardYear = styled.span``;

const CardRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  svg {
    color: #ffc107;
  }
`;

export default MovieCard; 