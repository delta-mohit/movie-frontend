import { useState } from "react";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";

import { useFetchGenresQuery } from "../../redux/api/genre";
import SliderUtil from "../../component/SliderUtil";

const MoviesContainerPage = () => {
  const { data } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const [selectedGenre, setSelectedGenre] = useState(null);

  // Toggle genre filter: If clicked again, remove filter
  const handleGenreClick = (genreId) => {
    setSelectedGenre((prev) => (prev === genreId ? null : genreId));
  };

  const filteredMovies = data?.filter(
    (movie) => selectedGenre === null || movie.genre === selectedGenre
  );

  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mt-10 px-6">
      {/* Genre Selection Sidebar */}
      <nav className="w-full lg:w-1/4">
        <h2 className="text-lg font-semibold text-gray-300 mb-4">Genres</h2>
        <div className="flex flex-wrap gap-2">
          <>
            <button
              key="1"
              className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 border ${
                selectedGenre === null
                  ? "bg-teal-500 text-white border-teal-500"
                  : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-teal-500 hover:text-white"
              }`}
              onClick={() => setSelectedGenre(null)}
            >
              All Movie
            </button>
            {genres?.map((g) => (
              <button
                key={g._id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 border ${
                  selectedGenre === g._id
                    ? "bg-teal-500 text-white border-teal-500"
                    : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-teal-500 hover:text-white"
                }`}
                onClick={() => handleGenreClick(g._id)}
              >
                {g.name}
              </button>
            ))}
          </>
        </div>
      </nav>

      {/* Movies Sections */}
      <section className="w-full lg:w-3/4 space-y-12">
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
          <h1 className="text-white text-xl font-semibold mb-4">
            Explore by Genre
          </h1>
          {filteredMovies?.length > 0 ? (
            <SliderUtil data={filteredMovies} />
          ) : (
            <div className="flex flex-col items-center justify-center py-6">
              <p className="text-gray-400 text-lg">
                No movie found based on your genre selection
              </p>
              <p className="text-lg">Try some other genre</p>
            </div>
          )}
        </div>

        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
          <h1 className="text-white text-xl font-semibold mb-4">
            Movies You’ll Love
          </h1>
          {randomMovies?.length > 0 ? (
            <SliderUtil data={randomMovies} />
          ) : (
            <p className="text-gray-400 text-center py-6">
              No movies available
            </p>
          )}
        </div>

        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
          <h1 className="text-white text-xl font-semibold mb-4">
            Trending Now: Top Rated
          </h1>
          {topMovies?.length > 0 ? (
            <SliderUtil data={topMovies} />
          ) : (
            <p className="text-gray-400 text-center py-6">
              No movies available
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default MoviesContainerPage;
