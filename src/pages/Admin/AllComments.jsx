import {
  useDeleteCommentMutation,
  useGetAllMoviesQuery,
} from "../../redux/api/movies";
import { toast } from "react-toastify";

const AllComments = () => {
  const { data: movies, refetch } = useGetAllMoviesQuery();
  const [deleteComment] = useDeleteCommentMutation();

  const handleDeleteComment = async (movieId, reviewId) => {
    try {
      await deleteComment({ movieId, reviewId });
      toast.success("Comment Deleted");
      refetch();
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  };

  return (
    <div className="min-h-screen mt-5 bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-6 text-teal-400">All Comments</h1>

      {movies?.length === 0 || !movies?.some((m) => m.reviews.length > 0) ? (
        <p className="text-gray-400 text-lg">No comments available</p>
      ) : (
        movies?.map((movie) => (
          <section key={movie._id} className="w-full max-w-3xl">
            {movie.reviews.map((review) => (
              <div
                key={review._id}
                className="bg-gray-800 p-5 rounded-lg shadow-lg mb-4 w-full"
              >
                <div className="flex justify-between items-center">
                  <strong className="text-teal-300">{review.name}</strong>
                  <p className="text-gray-400">
                    {review.createdAt.substring(0, 10)}
                  </p>
                </div>

                <p className="my-3 text-gray-300">{review.comment}</p>

                <button
                  className="text-red-500 hover:text-red-400 transition duration-200"
                  onClick={() => handleDeleteComment(movie._id, review._id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </section>
        ))
      )}
    </div>
  );
};

export default AllComments;
