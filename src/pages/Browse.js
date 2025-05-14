import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../redux/slices/movieSlice';
import { getCategories } from '../redux/slices/categorySlice';
import Spinner from '../components/Spinner';
import MovieCard from '../components/MovieCard';
import styled from 'styled-components';

const Browse = () => {
  const dispatch = useDispatch();
  const { movies, isLoading } = useSelector((state) => state.movies);
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getMovies());
    dispatch(getCategories());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <BrowseContainer>
      <div className="container">
        <BrowseHeader>
          <BrowseTitle>Browse All Movies</BrowseTitle>
          <BrowseDescription>
            Discover our collection of movies across various genres
          </BrowseDescription>
        </BrowseHeader>

        <CategoryFilter>
          <FilterTitle>Filter by Category:</FilterTitle>
          <FilterButtons>
            <FilterButton className="active">All</FilterButton>
            {categories.map((category) => (
              <FilterButton key={category._id}>{category.name}</FilterButton>
            ))}
          </FilterButtons>
        </CategoryFilter>

        {movies.length > 0 ? (
          <MoviesGrid>
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </MoviesGrid>
        ) : (
          <NoMovies>
            <h3>No movies found</h3>
            <p>Please try a different category or check back later.</p>
          </NoMovies>
        )}
      </div>
    </BrowseContainer>
  );
};

const BrowseContainer = styled.div`
  padding: 2rem 0;
`;

const BrowseHeader = styled.div`
  margin-bottom: 2rem;
`;

const BrowseTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--text-light);
`;

const BrowseDescription = styled.p`
  font-size: 1.1rem;
  color: var(--text-gray);
  max-width: 800px;
`;

const CategoryFilter = styled.div`
  margin-bottom: 2rem;
`;

const FilterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--text-light);
`;

const FilterButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: var(--background-light);
  border: none;
  border-radius: 20px;
  color: var(--text-light);
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--primary-color);
  }

  &.active {
    background-color: var(--primary-color);
  }
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;

  @media (min-width: 576px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }

  @media (min-width: 992px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
`;

const NoMovies = styled.div`
  text-align: center;
  padding: 3rem 0;
  color: var(--text-gray);

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.1rem;
  }
`;

export default Browse; 