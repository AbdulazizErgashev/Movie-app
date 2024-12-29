import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"; // Redux Toolkit'dan kerakli funksiyalarni import qilamiz
import axios from "axios"; // API so'rovlarini yuborish uchun axios kutubxonasini import qilamiz

const API_KEY = "11fa32df9fcbd31f6fa828d0b6c069bf"; // API kalitini belgilaymiz (to'g'ri kalitni qo'yish kerak)
const BASE_URL = "https://api.themoviedb.org/3"; // API ning asosiy URL manzili

// Movie interfeysini aniqlaymiz
export interface Movie {
  id: number; // Filmning ID raqami
  title: string; // Filmning nomi
  overview: string; // Filmning qisqacha tavsifi
  poster_path: string; // Filmning posterining yo'li
}

// MoviesState interfeysini aniqlaymiz
interface MoviesState {
  movies: Movie[]; // Movie'lar ro'yxati
  status: "idle" | "loading" | "failed"; // Yozilgan status: idle, loading yoki failed
  currentPage: number; // Hozirgi sahifa raqami
  error: string | null; // Xatolik haqida xabar
  searchQuery: string | null; // Qidiruv so'rovi
}

// Boshlang'ich holat
const initialState: MoviesState = {
  movies: [], // Movie'lar ro'yxati boshida bo'sh
  status: "idle", // Status boshlanishda "idle"
  currentPage: 1, // Sahifa boshlanishda 1
  error: null, // Xatolik boshlanishda mavjud emas
  searchQuery: null, // Qidiruv so'rovi boshlanishda mavjud emas
};

// Asinxron thunk: Movie'larni olish uchun
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies", // Action nomi
  async (page: number = 1) => {
    // Sahifa raqami parametri
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: { api_key: API_KEY, page }, // API dan ma'lumot so'rash
      });
      return response.data.results; // Film ro'yxatini qaytarish
    } catch (error) {
      throw new Error("Failed to fetch movies."); // Xatolik yuzaga kelganda
    }
  }
);

// Asinxron thunk: Qidiruv natijalarini olish uchun
export const fetchSearchResults = createAsyncThunk(
  "movies/fetchSearchResults", // Action nomi
  async (query: string) => {
    // Qidiruv so'rovi
    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: { api_key: API_KEY, query }, // Qidiruv so'rovini API ga yuborish
      });
      return response.data.results; // Qidiruv natijalarini qaytarish
    } catch (error) {
      throw new Error("Failed to fetch search results."); // Xatolik yuzaga kelganda
    }
  }
);

// MoviesSlice ni yaratamiz
const moviesSlice = createSlice({
  name: "movies", // Slicedagi nom
  initialState, // Boshlang'ich holat
  reducers: {
    // Sahifani o'zgartirish uchun reducer
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload; // Sahifa raqamini yangilash
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload; // Qidiruv so'rovini yangilash
      state.currentPage = 1; // Qidiruv qayta bajarilganda sahifani 1 ga qaytarish
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchMovies ni bajarish holatini kuzatish
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading"; // Fetch boshlanayotganda statusni "loading" ga o'zgartirish
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "idle"; // Fetch tugaganda statusni "idle" ga o'zgartirish
        state.movies = action.payload; // Film ro'yxatini yangilash
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed"; // Fetch xatolik bilan tugaganda statusni "failed" ga o'zgartirish
        state.error = action.error.message || "Something went wrong."; // Xatolikni ko'rsatish
      })

      // fetchSearchResults ni bajarish holatini kuzatish
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.movies = action.payload; // Qidiruv natijalarini yangilash
      });
  },
});

// Actionlar va reducer ni eksport qilish
export const { setPage } = moviesSlice.actions;
export default moviesSlice.reducer;
