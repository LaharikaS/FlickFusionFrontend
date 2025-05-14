import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { searchMovies } from '../redux/slices/movieSlice';
import Spinner from '../components/Spinner';
import MovieCard from '../components/MovieCard';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { movies, isLoading } = useSelector((state) => state.movies);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // Extract search query from URL if present
  useEffect(() => {
    const query = new URLSearchParams(location.search).get('q');
    if (query) {
      setSearchTerm(query);
      dispatch(searchMovies(query));
      setHasSearched(true);
    }
  }, [dispatch, location.search]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(searchMovies(searchTerm));
      setHasSearched(true);
      
      // Update URL with search query without reloading the page
      const url = new URL(window.location);
      url.searchParams.set('q', searchTerm);
      window.history.pushState({}, '', url);
    }
  };

  return (
    <SearchContainer>
      <SearchHeader>
        <SearchTitle>Search Movies</SearchTitle>
        <SearchDescription>
          Find your favorite movies by title, actor, or director
        </SearchDescription>
      </SearchHeader>

      <SearchForm onSubmit={handleSearch}>
        <SearchInput
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchButton type="submit">
          <FaSearch /> Search
        </SearchButton>
      </SearchForm>

      {isLoading ? (
        <Spinner />
      ) : hasSearched ? (
        <>
          <SearchResults>
            {searchTerm && (
              <ResultsInfo>
                {movies.length > 0
                  ? `Found ${movies.length} results for "${searchTerm}"`
                  : `No results found for "${searchTerm}"`}
              </ResultsInfo>
            )}

            {movies.length > 0 ? (
              <MoviesGrid >
                {movies.map((movie) => (
                  <MovieCard  key={movie._id} movie={movie}  />
                ))}
              </MoviesGrid>
            ) : (
              <NoResults>
                <p>No movies found matching your search criteria.</p>
                <p>Try using different keywords or browse our categories.</p>
              </NoResults>
            )}
          </SearchResults>
        </>
      ) : (
        <SearchPrompt>
          <FaSearch />
          <h3>Search for your favorite movies</h3>
          <p>Enter keywords in the search box above to find movies</p>
        </SearchPrompt>
      )}
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const SearchHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`;

const SearchTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: white;
`;

const SearchDescription = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  max-width: 600px;
  margin: 0 auto;
`;

const SearchForm = styled.form`
  display: flex;
  max-width: 600px;
  margin: 0 auto 2rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 1rem 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px 0 0 4px;
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #f84464;
  }
  
  @media (max-width: 576px) {
    border-radius: 4px;
  }
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background-color: #f84464;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color:rgb(190, 12, 21);
  }
  
  @media (max-width: 576px) {
    border-radius: 4px;
  }
`;

const SearchResults = styled.div`
  margin-top: 2rem;
`;

const ResultsInfo = styled.div`
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
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

const NoResults = styled.div`
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

const SearchPrompt = styled.div`
  text-align: center;
  padding: 4rem 1rem;
  color: rgba(255, 255, 255, 0.5);
  
  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  p {
    font-size: 1.1rem;
  }
`;

export default Search; 