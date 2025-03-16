import { useState } from "react";
import {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useFetchGenresQuery,
} from "../../redux/api/genre";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GenreForm from "../../component/GenreForm";
import Modal from "../../component/Modal";

const GenreList = () => {
  const navigate = useNavigate();
  const { data: genres, refetch } = useFetchGenresQuery();
  const [name, setName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const handleCreateGenre = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await createGenre({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
        refetch();
      }
    } catch (error) {
      toast.error("Creating genre failed, try again.");
    }
  };

  const handleUpdateGenre = async (e) => {
    e.preventDefault();
    if (!updatingName) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await updateGenre({
        id: selectedGenre._id,
        updateGenre: { name: updatingName },
      }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        refetch();
        setSelectedGenre(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteGenre = async () => {
    try {
      const result = await deleteGenre(selectedGenre._id).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        refetch();
        setSelectedGenre(null);
        setModalVisible(false);
      }
    } catch (error) {
      toast.error("Genre deletion failed. Try again.");
    }
  };

  return (
    <div className="h-screen mt-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 pb-0">
      {/* Back to Dashboard Button */}
      <button
        onClick={() => navigate("/admin/movies/dashboard")}
        className="mb-4 px-4 py-2 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 transition duration-200"
      >
        ← Back to Dashboard
      </button>

      <div className="max-w-4xl mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-teal-400 mb-4">
          Manage Genres
        </h1>

        {/* Genre Form */}
        <GenreForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateGenre}
        />
        <br />

        {/* Genre List */}
        <div className="flex flex-wrap justify-center">
          {genres?.map((genre) => (
            <button
              key={genre._id}
              className="border border-teal-400 text-teal-400 px-4 py-2 rounded-lg m-2 hover:bg-teal-500 hover:text-white transition duration-300"
              onClick={() => {
                setModalVisible(true);
                setSelectedGenre(genre);
                setUpdatingName(genre.name);
              }}
            >
              {genre.name}
            </button>
          ))}
        </div>

        {/* Update/Delete Modal */}
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <GenreForm
            value={updatingName}
            setValue={setUpdatingName}
            handleSubmit={handleUpdateGenre}
            buttonText="Update"
            handleDelete={handleDeleteGenre}
          />
        </Modal>
      </div>
    </div>
  );
};

export default GenreList;
