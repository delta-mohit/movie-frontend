import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movies/${movie._id}`}>
      <div className="relative group mx-4 overflow-hidden rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
        <img
          src={movie.image}
          alt={movie.name}
          className="w-full h-60 object-contain rounded-lg transition-opacity duration-300 group-hover:opacity-50"
        />

        <div className="absolute inset-0 flex items-end justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300">
          <p className="text-white font-semibold text-lg py-4">{movie.name}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
