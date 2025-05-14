import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getMoviesByCategory } from '../redux/slices/movieSlice';
import { getCategoryById } from '../redux/slices/categorySlice';
import Spinner from '../components/Spinner';
import MovieCard from '../components/MovieCard';

const Category = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movies, isLoading } = useSelector((state) => state.movies);
  const { category } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getMoviesByCategory(id));
    dispatch(getCategoryById(id));
  }, [dispatch, id]);

  if (isLoading || !category) {
    return <Spinner />;
  }

  return (
    <CategoryContainer>
      <CategoryHeader>
        <CategoryTitle>{category.name} Movies</CategoryTitle>
        <CategoryDescription>
          {category.description || `Explore our collection of ${category.name} movies`}
        </CategoryDescription>
      </CategoryHeader>

      {movies.length > 0 ? (
        <MoviesGrid>
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </MoviesGrid>
      ) : (
        <NoMovies>
          <p>No movies found in this category.</p>
          <p>Please check back later as we update our collection.</p>
        </NoMovies>
      )}
    </CategoryContainer>
  );
};

const CategoryContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const CategoryHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const CategoryTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: white;
`;

const CategoryDescription = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 800px;
  margin: 0 auto;
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

const NoMovies = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  
  p {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 0.5rem;
  }
`;

export default Category; 