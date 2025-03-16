import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateMovieMutation,
  useUploadImageMutation,
} from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";

const CreateMovie = () => {
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: "",
    detail: "",
    cast: [],
    rating: "",
    image: null,
    genre: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const [createMovie, { isLoading: isCreatingMovie }] =
    useCreateMovieMutation();
  const [uploadImage, { isLoading: isUploadingImage }] =
    useUploadImageMutation();
  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();

  useEffect(() => {
    if (genres) {
      setMovieData((prevData) => ({
        ...prevData,
        genre: genres[0]?._id || "",
      }));
    }
  }, [genres]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleCreateMovie = async () => {
    try {
      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast ||
        !selectedImage
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      let uploadedImagePath = null;
      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);
        const uploadImageResponse = await uploadImage(formData);

        if (uploadImageResponse.data) {
          uploadedImagePath = uploadImageResponse.data.image;
        } else {
          toast.error("Failed to upload image");
          return;
        }
      }

      await createMovie({ ...movieData, image: uploadedImagePath });
      navigate("/admin/movies-list");
      toast.success("Movie Added To Database");

      setMovieData({
        name: "",
        year: "",
        detail: "",
        cast: [],
        rating: "",
        image: null,
        genre: "",
      });
      setSelectedImage(null);
    } catch (error) {
      toast.error("Failed to create movie");
    }
  };

  return (
    <div className="container mt-10 mx-auto p-4">
      {/* Back Button */}
      <button
        onClick={() => navigate("/admin/movies/dashboard")}
        className="mb-4 px-4 py-2 bg-teal-400 text-white rounded-lg hover:bg-gray-700 transition duration-200"
      >
        ← Back to Dashboard
      </button>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Create Movie
        </h2>

        {/* Name Input */}
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={movieData.name}
            onChange={handleChange}
            className="border-2 border-gray-300 px-3 py-2 w-full rounded-lg shadow-sm transition-all duration-200"
          />
        </div>

        {/* Year Input */}
        <div className="mb-4">
          <label className="block text-gray-700">Year:</label>
          <input
            type="number"
            name="year"
            value={movieData.year}
            onChange={handleChange}
            className="border-2 border-gray-300 px-3 py-2 w-full rounded-lg shadow-sm transition-all duration-200"
          />
        </div>

        {/* Detail Input */}
        <div className="mb-4">
          <label className="block text-gray-700">Detail:</label>
          <textarea
            name="detail"
            value={movieData.detail}
            onChange={handleChange}
            className="border-2 border-gray-300 px-3 py-2 w-full rounded-lg shadow-sm transition-all duration-200"
          />
        </div>

        {/* Cast Input */}
        <div className="mb-4">
          <label className="block text-gray-700">Cast (comma-separated):</label>
          <input
            type="text"
            name="cast"
            value={movieData.cast.join(", ")}
            onChange={(e) =>
              setMovieData({ ...movieData, cast: e.target.value.split(", ") })
            }
            className="border-2 border-gray-300 px-3 py-2 w-full rounded-lg shadow-sm transition-all duration-200"
          />
        </div>

        {/* Genre Dropdown */}
        <div className="mb-4">
          <label className="block text-gray-700">Genre:</label>
          <select
            name="genre"
            value={movieData.genre}
            onChange={handleChange}
            className="border-2 border-gray-300 px-3 py-2 w-full rounded-lg text-black"
          >
            {isLoadingGenres ? (
              <option>Loading genres...</option>
            ) : (
              <>
                <option value="" disabled>
                  Select Genre
                </option>
                {genres.map((genre) => (
                  <option key={genre._id} value={genre._id}>
                    {genre.name}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700">Upload Image:</label>
          <div className="border-2 border-gray-300 rounded-lg p-2 w-full flex items-center">
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          {selectedImage && (
            <p className="text-sm text-gray-500 mt-1">{selectedImage.name}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleCreateMovie}
          className="w-full bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition duration-200"
          disabled={isCreatingMovie || isUploadingImage}
        >
          {isCreatingMovie || isUploadingImage ? "Creating..." : "Create Movie"}
        </button>
      </div>
    </div>
  );
};

export default CreateMovie;
