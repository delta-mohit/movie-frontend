const GenreForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          className="w-full max-w-xl py-3 px-4 border-2 border-teal-400 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          placeholder="Write genre name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="flex flex-col sm:flex-row gap-3">
          <button className="w-full sm:w-auto bg-teal-500 text-white py-2 px-6 rounded-lg hover:bg-teal-600 transition duration-200">
            {buttonText}
          </button>

          {handleDelete && (
            <button
              onClick={handleDelete}
              className="w-full sm:w-auto bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-200"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GenreForm;
