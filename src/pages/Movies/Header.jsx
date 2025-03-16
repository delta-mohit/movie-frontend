import SliderUtil from "../../component/SliderUtil";
import { useGetNewMoviesQuery } from "../../redux/api/movies";
import { Link } from "react-router-dom";

const Header = () => {
  const { data } = useGetNewMoviesQuery();

  return (
    <div className="flex flex-col md:flex-row md:gap-4 justify-between items-start mt-8 px-4 md:px-8">
      {/* Navigation Sidebar */}
      <nav className="w-full md:w-1/5 space-y-3 text-center md:text-left">
        <Link
          to="/"
          className="block py-2 px-4 bg-gray-800 text-white rounded-lg shadow-md hover:bg-teal-500 transition duration-300"
        >
          Home
        </Link>
        <Link
          to="/movies"
          className="block py-2 px-4 bg-gray-800 text-white rounded-lg shadow-md hover:bg-teal-500 transition duration-300"
        >
          Browse Movies
        </Link>
      </nav>

      {/* Movie Slider */}
      <div className="w-full px-6 md:w-4/5 mt-6 md:mt-0">
        <SliderUtil data={data} />
      </div>
    </div>
  );
};

export default Header;
