import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FaStar, FaPlay, FaHeart, FaRegHeart } from 'react-icons/fa';
import { getMovieById } from '../redux/slices/movieSlice';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

const Movie = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movie, isLoading, favorites } = useSelector((state) => state.movies);
  const { user } = useSelector((state) => state.auth);
  const [isFavorite, setIsFavorite] = useState(false);

  const userData = JSON.parse(localStorage.getItem('user')); 

  useEffect(() => {
    dispatch(getMovieById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (favorites && movie) {
      setIsFavorite(favorites.some((fav) => fav._id === movie._id));
    }
  }, [favorites, movie]);

  const handleFavoriteToggle = async() => {
    if (!user) {
      toast.error('Please log in to add favorites');
      return;
    }

    if (isFavorite) {
      // console.log(userData.token)
      const res = await fetch(`https://flickfusion-backend-zn4d.onrender.com/api/users/favorites/${movie._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${userData.token}`, // Add your auth token
        },
      });      toast.success('Removed from favorites');
      setIsFavorite(false);
    } else {
      const res = await fetch('https://flickfusion-backend-zn4d.onrender.com/api/users/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userData.token}`,
        },
        body: JSON.stringify({ movieId: movie._id }),
      });
      toast.success('Added to favorites');
      setIsFavorite(true);
    }
  };

  if (isLoading || !movie) {
    return <Spinner />;
  }

  return (
    <MovieContainer>
      <BackdropContainer style={{ backgroundImage: `url(${movie.bannerImage})` }}>
        <BackdropOverlay>
          <MovieContent>
            <MoviePoster>
              <img src={movie.posterImage} alt={movie.title} />
            </MoviePoster>
            <MovieInfo>
              <MovieTitle>{movie.title}</MovieTitle>
              <MovieMeta>
                <MetaItem>{movie.year}</MetaItem>
                <MetaItem>{movie.duration} min</MetaItem>
                <MetaRating>
                  <FaStar /> {movie.rating}
                </MetaRating>
              </MovieMeta>
              <MovieCategories>
                {movie.categories.map((category, index) => (
                  <React.Fragment key={category._id}>
                    <CategoryLink to={`/category/${category._id}`}>
                      {category.name}
                    </CategoryLink>
                    {index < movie.categories.length - 1 && ' • '}
                  </React.Fragment>
                ))}
              </MovieCategories>
              <MovieDescription>{movie.description}</MovieDescription>
              <MovieButtons>
                <WatchButton to={`/watch/${movie._id}`}>
                  <FaPlay /> Watch Now
                </WatchButton>
                <FavoriteButton onClick={handleFavoriteToggle} isFavorite={isFavorite}>
                  {isFavorite ? <FaHeart /> : <FaRegHeart />}
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </FavoriteButton>
              </MovieButtons>
            </MovieInfo>
          </MovieContent>
        </BackdropOverlay>
      </BackdropContainer>

      <MovieDetailsSection>
        <SectionTitle>Movie Details</SectionTitle>
        <DetailsGrid>
          <DetailItem>
            <DetailLabel>Director</DetailLabel>
            <DetailValue>{movie.director}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Cast</DetailLabel>
            <DetailValue>{movie.cast.join(', ')}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Release Year</DetailLabel>
            <DetailValue>{movie.releaseYear}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Age Rating</DetailLabel>
            <DetailValue>{movie.ageRating}</DetailValue>
          </DetailItem>
          {/* <DetailItem>
            <DetailLabel>Release Year</DetailLabel>
            <DetailValue>{movie.releaseYear}</DetailValue>
          </DetailItem> */}
        </DetailsGrid>
      </MovieDetailsSection>
    </MovieContainer>
  );
};

const MovieContainer = styled.div`
  margin-top: -80px; /* Offset for fixed header */
`;

const BackdropContainer = styled.div`
  position: relative;
  background-size: cover;
  background-position: center;
  min-height: 600px;

  @media (max-width: 768px) {
    min-height: auto;
  }
`;

const BackdropOverlay = styled.div`
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(20, 20, 20, 1) 100%);
  padding: 120px 0 60px;

  @media (max-width: 768px) {
    padding: 100px 0 40px;
  }
`;

const MovieContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const MoviePoster = styled.div`
  flex-shrink: 0;
  width: 300px;
  height: 450px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 768px) {
    width: 220px;
    height: 330px;
  }
`;

const MovieInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MovieTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-top: 1.5rem;
  }
`;

const MovieMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.7);

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const MetaItem = styled.span`
  font-size: 1rem;
`;

const MetaRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  
  svg {
    color: #ffc107;
  }
`;

const MovieCategories = styled.div`
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.7);

  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const CategoryLink = styled(Link)`
  color: rgba(255, 255, 255, 0.7);
  transition: color 0.3s ease;

  &:hover {
    color: #e50914;
  }
`;

const MovieDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`;

const MovieButtons = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const WatchButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #e50914;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    background-color: #f40612;
    transform: translateY(-2px);
  }
`;

const FavoriteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: ${({ isFavorite }) => (isFavorite ? 'rgba(229, 9, 20, 0.1)' : 'rgba(255, 255, 255, 0.1)')};
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 600;
  border: none;
  transition: all 0.3s ease;

  svg {
    color: ${({ isFavorite }) => (isFavorite ? '#e50914' : 'white')};
  }

  &:hover {
    background-color: ${({ isFavorite }) => (isFavorite ? 'rgba(229, 9, 20, 0.2)' : 'rgba(255, 255, 255, 0.2)')};
    transform: translateY(-2px);
  }
`;

const MovieDetailsSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: white;
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const DetailItem = styled.div``;

const DetailLabel = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
`;

const DetailValue = styled.p`
  font-size: 1.1rem;
  color: white;
`;

export default Movie; 