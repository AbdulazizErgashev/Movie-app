import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "11fa32df9fcbd31f6fa828d0b6c069bf";
const BASE_URL = "https://api.themoviedb.org/3";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

interface MoviesState {
  movies: Movie[];
  status: "idle" | "loading" | "failed";
  currentPage: number;
}

const initialState: MoviesState = {
  movies: [],
  status: "idle",
  currentPage: 1,
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (page: number = 1) => {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: { api_key: API_KEY, page },
    });
    return response.data.results;
  }
);

export const fetchSearchResults = createAsyncThunk(
  "movies/fetchSearchResults",
  async (query: string) => {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: { api_key: API_KEY, query },
    });
    return response.data.results;
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "idle";
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.movies = action.payload;
      });
  },
});

export const { setPage } = moviesSlice.actions;
