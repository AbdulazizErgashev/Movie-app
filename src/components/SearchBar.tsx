import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../toolkit/store";
import { fetchSearchResults } from "../toolkit/features/movies/movieSlice";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = () => {
    if (query.trim()) {
      dispatch(fetchSearchResults(query));
    }
  };

  return (
    <div className="p-4 flex items-center justify-center bg-gray-800">
      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search movies..."
        className="p-2 w-full max-w-md rounded bg-gray-700 text-white"
      />
      <button
        onClick={handleSearch}
        className="ml-2 p-2 bg-purple-600 text-white rounded"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
