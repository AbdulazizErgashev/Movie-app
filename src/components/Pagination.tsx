import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../toolkit/store";
import { fetchMovies, setPage } from "../toolkit/features/movies/moviesSlice";

const Pagination: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector(
    (state: RootState) => state.movies.currentPage
  );

  const handlePageChange = (page: number) => {
    if (page < 1) return;
    dispatch(setPage(page));
    dispatch(fetchMovies(page));
  };

  return (
    <div className="flex justify-center p-4">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 mx-2 bg-purple-600 text-white rounded disabled:bg-gray-600"
      >
        Previous
      </button>
      <span className="p-2 mx-2">{`Page ${currentPage}`}</span>
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
