import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../toolkit/store";
import { fetchMovies, setPage } from "../toolkit/features/movies/moviesSlice";

const Pagination: React.FC = () => {
  // Redux-dan dispatch va currentPage ni olish
  const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector(
    (state: RootState) => state.movies.currentPage
  );

  // Sahifani o'zgartirish uchun funksiya
  const handlePageChange = (page: number) => {
    // Agar sahifa 1 dan kichik bo'lsa, hech narsa qilmaydi
    if (page < 1) return;
    // Page-ni yangilash va yangi filmlar ro'yxatini yuklash
    dispatch(setPage(page));
    dispatch(fetchMovies(page));
  };

  return (
    <div className="flex justify-center p-4">
      {/* Oldingi sahifaga o'tish tugmasi */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1} // Agar hozirgi sahifa 1 bo'lsa, tugma faol bo'lmaydi
        className="p-2 mx-2 bg-purple-600 text-white rounded disabled:bg-gray-600"
      >
        Previous
      </button>
      {/* Hozirgi sahifani ko'rsatish */}
      <span className="p-2 mx-2">{`Page ${currentPage}`}</span>
      {/* Keyingi sahifaga o'tish tugmasi */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        className="p-2 mx-2 bg-purple-600 text-white rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
