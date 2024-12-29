import React from "react";
import MovieList from "./components/MovieList";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="p-4 text-center bg-gray-800">
        <h1 className="text-2xl font-bold">TMDB Movie Site</h1>
      </header>
      <main>
        <MovieList />
      </main>
    </div>
  );
};

export default App;
