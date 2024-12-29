import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // URL parametrlarini olish uchun useParams hookni import qilamiz
import axios from "axios"; // API ga so'rov yuborish uchun axiosni import qilamiz

const API_KEY = "11fa32df9fcbd31f6fa828d0b6c069bf"; // API kalitini o'rnatamiz
const BASE_URL = "https://api.themoviedb.org/3"; // The Movie Database API manzili

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // URLdan filmning id sini olish uchun useParams hookini ishlatamiz
  const [movie, setMovie] = useState<any>(null); // movie holatini yaratamiz (boshlanishda null)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      // API ga so'rov yuborib, film ma'lumotlarini olish uchun fetchMovieDetails funksiyasini yaratamiz
      const response = await axios.get(`${BASE_URL}/movie/${id}`, {
        params: { api_key: API_KEY }, // API kaliti bilan so'rov yuboramiz
      });
      setMovie(response.data); // Olingan ma'lumotlarni movie holatiga saqlaymiz
    };
    fetchMovieDetails(); // Film ma'lumotlarini yuklash
  }, [id]); // id o'zgarganida yana fetchMovieDetails chaqiriladi

  if (!movie) return <p>Loading...</p>; // Agar movie ma'lumotlari hali yuklanmagan bo'lsa, "Loading..." yozuvi ko'rsatiladi

  return (
    <div className="p-4 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">{movie.title}</h1>{" "}
      <p>{movie.overview}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="mt-4"
      />
    </div>
  );
};

export default MovieDetails;
