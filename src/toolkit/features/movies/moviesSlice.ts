import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "11fa32df9fcbd31f6fa828d0b6c069bf"; // Replace with a valid key if needed
const BASE_URL = "https://api.themoviedb.org/3";

// Define the Movie interface
export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

// Define the state interface
interface MoviesState {
  movies: Movie[];
  status: "idle" | "loading" | "failed";
  currentPage: number;
  error: string | null;
  searchQuery: string | null;
}

// Initial state
const initialState: MoviesState = {
  movies: [],
  status: "idle",
  currentPage: 1,
  error: null,
  searchQuery: null,
};

// Async thunk to fetch popular movies
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (page: number = 1) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: { api_key: API_KEY, page },
      });
      return response.data.results; // Return movies list
    } catch (error) {
      throw new Error("Failed to fetch movies.");
    }
  }
);

// Async thunk to fetch search results
export const fetchSearchResults = createAsyncThunk(
  "movies/fetchSearchResults",
  async (query: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: { api_key: API_KEY, query },
      });
      return response.data.results; // Return search results
    } catch (error) {
      throw new Error("Failed to fetch search results.");
    }
  }
);

// Create a slice for movies
const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    // Reducer to set the current page for pagination
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchMovies states
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "idle";
        state.movies = action.payload; // Update movies state
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong.";
      })

      // Handle fetchSearchResults state
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.movies = action.payload; // Update movies with search results
      });
  },
});

// Export actions and reducer
export const { setPage } = moviesSlice.actions;
export default moviesSlice.reducer;
