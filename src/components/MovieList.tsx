import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies } from "../toolkit/features/movies/movieSlice";
import { RootState, AppDispatch } from "../toolkit/store";

const MovieList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const status = useSelector((state: RootState) => state.movies.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMovies());
    }
  }, [dispatch, status]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Failed to load movies.</p>}
      {movies.map((movie) => (
        <div key={movie.id} className="bg-gray-800 rounded p-4 text-white">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded mb-2"
          />
          <h3 className="text-lg font-bold">{movie.title}</h3>
          <p className="text-sm">{movie.overview.slice(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
// https://chatgpt.com/share/67711b34-c6c8-8011-a532-2913379aa65e
