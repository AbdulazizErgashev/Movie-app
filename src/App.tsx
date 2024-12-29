import React from "react";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="p-4 text-center bg-gray-800">
        <h1 className="text-2xl font-bold">Movie-Finder</h1>
      </header>
      <SearchBar />
      <main>
        <MovieList />
        <Pagination />
      </main>
    </div>
  );
};

export default App;
