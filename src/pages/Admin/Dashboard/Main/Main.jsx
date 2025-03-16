// Main.jsx
import SecondaryCard from "./SecondaryCard";
import VideoCard from "./VideoCard";
import RealTimeCard from "./RealTimeCard";
import {
  useGetTopMoviesQuery,
  useGetAllMoviesQuery,
} from "../../../../redux/api/movies";
import { useGetUsersQuery } from "../../../../redux/api/users";

const Main = () => {
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: visitors } = useGetUsersQuery();
  const { data: allMovies } = useGetAllMoviesQuery();

  const totalComments = allMovies?.reduce(
    (acc, m) => acc + (m.numReviews || 0),
    0
  );

  return (
    <div className="flex-1 ml-0 p-6 md:ml-64 text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <SecondaryCard
          pill="Users"
          content={visitors?.length}
          info="20.2k more than usual"
          gradient="from-teal-500 to-lime-400"
        />
        <SecondaryCard
          pill="Comments"
          content={totalComments}
          info="742.8 more than usual"
          gradient="from-yellow-500 to-orange-400"
        />
        <SecondaryCard
          pill="Movies"
          content={allMovies?.length}
          info="372+ more than usual"
          gradient="from-green-500 to-lime-400"
        />
      </div>

      <h2 className="mt-10 text-lg font-semibold">Top Content</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {topMovies?.map((movie) => (
          <VideoCard
            key={movie._id}
            image={movie.image}
            title={movie.name}
            date={movie.year}
            comments={movie.numReviews}
          />
        ))}
      </div>

      <div className="mt-10">
        <RealTimeCard />
      </div>
    </div>
  );
};

export default Main;
