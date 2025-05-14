import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import movieService from '../../services/movieService';
import authService from '../../services/authService';

const initialState = {
  movies: [],
  featuredMovies: [],
  trendingMovies: [],
  movie: null,
  favorites: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get all movies
export const getMovies = createAsyncThunk(
  'movies/getAll',
  async (_, thunkAPI) => {
    try {
      return await movieService.getMovies();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get featured movies
export const getFeaturedMovies = createAsyncThunk(
  'movies/getFeatured',
  async (_, thunkAPI) => {
    try {
      return await movieService.getFeaturedMovies();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get trending movies
export const getTrendingMovies = createAsyncThunk(
  'movies/getTrending',
  async (_, thunkAPI) => {
    try {
      return await movieService.getTrendingMovies();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get movie by ID
export const getMovieById = createAsyncThunk(
  'movies/getById',
  async (id, thunkAPI) => {
    try {
      return await movieService.getMovieById(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get movies by category
export const getMoviesByCategory = createAsyncThunk(
  'movies/getByCategory',
  async (categoryId, thunkAPI) => {
    try {
      return await movieService.getMoviesByCategory(categoryId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Search movies
export const searchMovies = createAsyncThunk(
  'movies/search',
  async (keyword, thunkAPI) => {
    try {
      return await movieService.searchMovies(keyword);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user favorites
export const getFavorites = createAsyncThunk(
  'movies/getFavorites',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await authService.getFavorites(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.movies = action.payload;
      })
      .addCase(getMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getFeaturedMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeaturedMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.featuredMovies = action.payload;
      })
      .addCase(getFeaturedMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTrendingMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrendingMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.trendingMovies = action.payload;
      })
      .addCase(getTrendingMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMovieById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMovieById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.movie = action.payload;
      })
      .addCase(getMovieById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMoviesByCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMoviesByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.movies = action.payload;
      })
      .addCase(getMoviesByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(searchMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.movies = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getFavorites.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.favorites = action.payload;
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = movieSlice.actions;
export default movieSlice.reducer; 