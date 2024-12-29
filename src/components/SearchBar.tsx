import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../toolkit/store";
import { fetchSearchResults } from "../toolkit/features/movies/moviesSlice";

const SearchBar: React.FC = () => {
  // qidiruv so'rovi uchun state yaratish
  const [query, setQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  // Qidiruvni boshlash uchun funksiya
  const handleSearch = () => {
    // Agar qidiruv so'rovi bo'sh bo'lmasa, fetchSearchResults action yuboramiz
    if (query.trim()) {
      dispatch(fetchSearchResults(query));
    }
  };

  return (
    <div className="p-4 flex items-center justify-center bg-gray-800">
      {/* Qidiruv inputi */}
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)} // inputdagi o'zgarishlarni state ga yozish
        placeholder="Search movies..."
        className="p-2 w-full max-w-md rounded bg-gray-700 text-white"
      />
      {/* Qidiruv tugmasi */}
      <button
        onClick={handleSearch} // qidiruvni boshlash
        className="ml-2 p-2 bg-purple-600 text-white rounded"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
