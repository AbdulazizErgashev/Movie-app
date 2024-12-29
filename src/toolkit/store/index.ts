import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../features/movies/moviesSlice";

export const store = configureStore({
  reducer: {
    movies: moviesReducer, // Store uchun movies nomli reducer qo'shamiz
  },
});

export type RootState = ReturnType<typeof store.getState>; // Store'dan olingan barcha state ni RootState turiga o'zgartiramiz
export type AppDispatch = typeof store.dispatch; // dispatch turini AppDispatch sifatida belgilaymiz
