import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getFeaturedMovies,
  getTrendingMovies,
  getMovies,
} from '../redux/slices/movieSlice';
import { getCategories } from '../redux/slices/categorySlice';
import Hero from '../components/Hero';
import MovieSlider from '../components/MovieSlider';
import Spinner from '../components/Spinner';
import styled from 'styled-components';

const Home = () => {
  const dispatch = useDispatch();
  const { featuredMovies, trendingMovies, movies, isLoading } = useSelector(
    (state) => state.movies
  );
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getFeaturedMovies());
    dispatch(getTrendingMovies());
    dispatch(getMovies());
    dispatch(getCategories());
  }, [dispatch]);

  if (isLoading || !featuredMovies.length) {
    return <Spinner />;
  }

  // Get a random featured movie for the hero
  const randomFeaturedMovie =
    featuredMovies[Math.floor(Math.random() * featuredMovies.length)];

  // Group movies by category
  const moviesByCategory = {};
  if (categories.length && movies.length) {
    categories.forEach((category) => {
      const categoryMovies = movies.filter((movie) =>
        movie.categories.some((cat) => cat._id === category._id)
      );
      if (categoryMovies.length) {
        moviesByCategory[category._id] = {
          name: category.name,
          movies: categoryMovies,
        };
      }
    });
  }
//   console.log("Trending Movies:", trendingMovies);
// console.log("Featured Movies:", featuredMovies);

  return (
    <HomeContainer>
      <Hero movie={randomFeaturedMovie} />

      <div className="container">
        {trendingMovies.length > 0 && (
          <MovieSlider title="Trending Now" movies={trendingMovies} />
        )}

        {featuredMovies.length > 0 && (
          <MovieSlider
            title="Featured Movies"
            movies={featuredMovies.filter(
              (movie) => !trendingMovies.some((trend) => trend._id === movie._id)
            )}
          />
        )}


        {Object.keys(moviesByCategory).map((categoryId) => (
          <MovieSlider
            key={categoryId}
            title={moviesByCategory[categoryId].name}
            movies={moviesByCategory[categoryId].movies}
          />
        ))}
      </div>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  padding-bottom: 2rem;
`;

export default Home; 