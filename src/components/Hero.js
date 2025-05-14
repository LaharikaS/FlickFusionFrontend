import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';
import styled from 'styled-components';

const Hero = ({ movie }) => {
  if (!movie) return null;

  return (
    <HeroContainer style={{ backgroundImage: `url(${movie.bannerImage})` }}>
      <HeroOverlay />
      <div className="container">
        <HeroContent>
          <HeroTitle>{movie.title}</HeroTitle>
          <HeroInfo>
            <HeroYear>{movie.releaseYear}</HeroYear>
            <HeroDuration>{movie.duration}</HeroDuration>
            <HeroRating>{movie.ageRating}</HeroRating>
          </HeroInfo>
          <HeroDescription>{movie.description}</HeroDescription>
          <HeroCategories>
            {movie.categories.map((category, index) => (
              <span key={category._id}>
                {category.name}
                {index < movie.categories.length - 1 && ', '}
              </span>
            ))}
          </HeroCategories>
          <HeroButtons>
            <Link to={`/movie/${movie._id}`} className="btn btn-primary">
              <FaPlay /> Watch Now
            </Link>
            <Link to={`/movie/${movie._id}`} className="btn btn-outline">
              <FaInfoCircle /> More Info
            </Link>
          </HeroButtons>
        </HeroContent>
      </div>
    </HeroContainer>
  );
};

const HeroContainer = styled.div`
  position: relative;
  height: 80vh;
  min-height: 500px;
  background-size: cover;
  background-position: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    height: 60vh;
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.6) 50%,
    rgba(0, 0, 0, 0.3) 100%
  );
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: 600px;
  padding: 2rem 0;
  height: 80vh;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    height: 60vh;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-light);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: var(--text-light);
`;

const HeroYear = styled.span`
  margin-right: 1rem;
`;

const HeroDuration = styled.span`
  margin-right: 1rem;
`;

const HeroRating = styled.span`
  padding: 0.2rem 0.5rem;
  border: 1px solid var(--text-light);
  border-radius: 4px;
  font-size: 0.9rem;
`;

const HeroDescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: var(--text-light);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 1rem;
    -webkit-line-clamp: 2;
  }
`;

const HeroCategories = styled.div`
  margin-bottom: 1.5rem;
  color: var(--text-gray);
  font-size: 1rem;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1rem;

  .btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;

    .btn {
      width: 100%;
      justify-content: center;
    }
  }
`;

export default Hero; 