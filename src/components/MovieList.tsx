import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // Redux store'dan ma'lumotlarni olish uchun useSelector va dispatch qilish uchun useDispatch import qilinadi
import { fetchMovies } from "../toolkit/features/movies/moviesSlice"; // fetchMovies action import qilinadi
import { RootState, AppDispatch } from "../toolkit/store"; // RootState va AppDispatch ni import qilamiz

const MovieList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>(); // dispatchni ishlatish uchun
  const movies = useSelector((state: RootState) => state.movies.movies); // movies ni store'dan olish
  const status = useSelector((state: RootState) => state.movies.status); // status ni store'dan olish (loading yoki failed)
  const currentPage = useSelector(
    (state: RootState) => state.movies.currentPage // currentPage ni store'dan olish
  );

  const [selectedMovie, setSelectedMovie] = useState<any | null>(null); // selectedMovie holatini yaratamiz (boshlanishda null)

  // currentPage o'zgarganda har safar filmlarni olish
  useEffect(() => {
    dispatch(fetchMovies(currentPage)); // fetchMovies actionini chaqirib, currentPage ni yuboramiz
  }, [dispatch, currentPage]); // dependency array: dispatch va currentPage o'zgarganida ishlaydi

  const handleWatchClick = (movie: any) => {
    setSelectedMovie(movie); // "Watch" tugmasini bosganda filmni selectedMovie holatiga saqlaymiz
  };

  if (status === "loading") {
    return <p className="text-center text-white">Loading movies...</p>; // Agar status "loading" bo'lsa, "Loading..." matnini chiqaramiz
  }

  if (status === "failed") {
    return (
      <p className="text-center text-red-500">
        Failed to load movies. Please try again later.{" "}
        {/* Agar status "failed" bo'lsa, xato haqida xabar beramiz */}
      </p>
    );
  }

  return (
    <div>
      {selectedMovie ? ( // Agar selectedMovie mavjud bo'lsa
        <div className="p-6 text-white bg-gray-900 rounded-lg shadow-lg">
          <h2 className="text-4xl font-semibold mb-4">{selectedMovie.title}</h2>{" "}
          {/* Tanlangan filmining nomini chiqaramiz */}
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
              className="rounded-lg shadow-lg w-full md:w-72"
            />
            <div className="flex flex-col justify-between">
              <p className="text-lg mb-4">{selectedMovie.overview}</p>{" "}
              {/* Filmning qisqacha tavsifi */}
              <p className="text-sm mb-2">
                <strong>Release Date:</strong> {selectedMovie.release_date}{" "}
                {/* Filmning chiqarilgan sanasi */}
              </p>
              <p className="text-sm mb-2">
                <strong>Genres:</strong>{" "}
                {selectedMovie.genres && selectedMovie.genres.length > 0
                  ? selectedMovie.genres
                      .map((genre: any) => genre.name)
                      .join(", ") // Filmning janrlari bo'lsa, ularni chiqaramiz
                  : "N/A"}
              </p>
              <p className="text-sm mb-2">
                <strong>Runtime:</strong> {selectedMovie.runtime} minutes{" "}
                {/* Filmning davomiyligi */}
              </p>
              <p className="text-sm mb-4">
                <strong>Rating:</strong> {selectedMovie.vote_average}/10{" "}
                {/* Filmning reytingi */}
              </p>
              <button
                onClick={() => setSelectedMovie(null)} // "Back to Movie List" tugmasi bosilganda selectedMovie ni null qilib, film ro'yxatiga qaytamiz
                className="mt-4 bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition"
              >
                Back to Movie List
              </button>
            </div>
          </div>
        </div>
      ) : (
        // Agar selectedMovie bo'lmasa, filmlar ro'yxatini ko'rsatamiz
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
                  <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>{" "}
                  {/* Film nomini chiqaramiz */}
                  <p className="text-sm text-gray-300">
                    {movie.overview.slice(0, 100)}...
                  </p>{" "}
                  {/* Film tavsifining birinchi 100 ta belgisini chiqaramiz */}
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleWatchClick(movie)} // "Watch" tugmasi bosilganda filmni tanlash
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
