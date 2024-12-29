import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies } from "../toolkit/features/movies/moviesSlice";
import { RootState, AppDispatch } from "../toolkit/store";

const MovieList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const status = useSelector((state: RootState) => state.movies.status);
  const currentPage = useSelector(
    (state: RootState) => state.movies.currentPage
  );

  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);

  // Fetch movies whenever `currentPage` changes
  useEffect(() => {
    dispatch(fetchMovies(currentPage));
  }, [dispatch, currentPage]);

  const handleWatchClick = (movie: any) => {
    setSelectedMovie(movie);
  };

  if (status === "loading") {
    return <p className="text-center text-white">Loading movies...</p>;
  }

  if (status === "failed") {
    return (
      <p className="text-center text-red-500">
        Failed to load movies. Please try again later.
      </p>
    );
  }

  return (
    <div>
      {selectedMovie ? (
        <div className="p-6 text-white bg-gray-900 rounded-lg shadow-lg">
          <h2 className="text-4xl font-semibold mb-4">{selectedMovie.title}</h2>
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
              className="rounded-lg shadow-lg w-full md:w-72"
            />
            <div className="flex flex-col justify-between">
              <p className="text-lg mb-4">{selectedMovie.overview}</p>
              <p className="text-sm mb-2">
                <strong>Release Date:</strong> {selectedMovie.release_date}
              </p>
              {/* Check if genres exists and map over it */}
              <p className="text-sm mb-2">
                <strong>Genres:</strong>{" "}
                {selectedMovie.genres && selectedMovie.genres.length > 0
                  ? selectedMovie.genres
                      .map((genre: any) => genre.name)
                      .join(", ")
                  : "N/A"}
              </p>
              <p className="text-sm mb-2">
                <strong>Runtime:</strong> {selectedMovie.runtime} minutes
              </p>
              <p className="text-sm mb-4">
                <strong>Rating:</strong> {selectedMovie.vote_average}/10
              </p>
              <button
                onClick={() => setSelectedMovie(null)}
                className="mt-4 bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition"
              >
                Back to Movie List
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg p-6 text-white flex flex-col transition-transform transform hover:scale-105 hover:bg-gray-700 shadow-lg"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg mb-4 object-cover h-80 w-full"
              />
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
                  <p className="text-sm text-gray-300">
                    {movie.overview.slice(0, 100)}...
                  </p>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleWatchClick(movie)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition"
                  >
                    Watch
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;
// https://api.themoviedb.org/3/movie/popular?api_key=11fa32df9fcbd31f6fa828d0b6c069bf&page=1
