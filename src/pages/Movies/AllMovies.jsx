import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetAllMoviesQuery,
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import {
  setMoviesFilter,
  setFilteredMovies,
  setMovieYears,
  setUniqueYears,
} from "../../redux/features/movies/moviesSlice";
import MovieCard from "./MovieCard";
import banner from "../../assets/banner.jpg";

const AllMovies = () => {
  const dispatch = useDispatch();
  const { data } = useGetAllMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: newMovies } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();
  const { moviesFilter, filteredMovies } = useSelector((state) => state.movies);

  const movieYears = data?.map((movie) => movie.year);
  const uniqueYears = Array.from(new Set(movieYears));

  useEffect(() => {
    dispatch(setFilteredMovies(data || []));
    dispatch(setMovieYears(movieYears));
    dispatch(setUniqueYears(uniqueYears));
  }, [data, dispatch]);

  const handleSearchChange = (e) => {
    dispatch(setMoviesFilter({ searchTerm: e.target.value }));
    const filteredMovies = data?.filter((movie) =>
      movie.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    dispatch(setFilteredMovies(filteredMovies));
  };

  const handleGenreClick = (genreId) => {
    const filterByGenre = data?.filter((movie) => movie.genre === genreId);
    dispatch(setFilteredMovies(filterByGenre));
  };

  const handleYearChange = (year) => {
    const filterByYear = data?.filter((movie) => movie.year === +year);
    dispatch(setFilteredMovies(filterByYear));
  };

  const handleSortChange = (sortOption) => {
    switch (sortOption) {
      case "new":
        dispatch(setFilteredMovies(newMovies));
        break;
      case "top":
        dispatch(setFilteredMovies(topMovies));
        break;
      case "random":
        dispatch(setFilteredMovies(randomMovies));
        break;
      default:
        dispatch(setFilteredMovies(data || []));
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div
        className="relative h-[40rem] flex items-center justify-center bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold">The Movies Hub</h1>
          <p className="text-lg mt-2">
            Cinematic Odyssey: Unveiling the Magic of Movies
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-6 flex flex-wrap justify-center gap-4">
        <input
          type="text"
          className="w-full md:w-1/2 lg:w-1/3 px-4 py-2 border rounded-lg"
          placeholder="Search Movie"
          value={moviesFilter.searchTerm}
          onChange={handleSearchChange}
        />

        <select
          className="px-4 py-2 border rounded-lg text-black"
          onChange={(e) => handleGenreClick(e.target.value)}
        >
          <option value="">Genres</option>
          {genres?.map((genre) => (
            <option key={genre._id} value={genre._id}>
              {genre.name}
            </option>
          ))}
        </select>

        <select
          className="px-4 py-2 border rounded-lg text-black"
          onChange={(e) => handleYearChange(e.target.value)}
        >
          <option value="">Year</option>
          {uniqueYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          className="px-4 py-2 border rounded-lg text-black"
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="new">New Movies</option>
          <option value="top">Top Movies</option>
          <option value="random">Random Movies</option>
        </select>
      </div>

      {/* Movie Cards */}
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
        {filteredMovies?.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default AllMovies;
