import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_KEY = "11fa32df9fcbd31f6fa828d0b6c069bf";
const BASE_URL = "https://api.themoviedb.org/3";

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await axios.get(`${BASE_URL}/movie/${id}`, {
        params: { api_key: API_KEY },
      });
      setMovie(response.data);
    };
    fetchMovieDetails();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="p-4 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">{movie.title}</h1>
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
