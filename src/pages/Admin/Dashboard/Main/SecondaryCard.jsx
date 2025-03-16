const SecondaryCard = ({ pill, content, info, gradient }) => {
  return (
    <div
      className={`w-[80%] mx-auto sm:w-60 h-20 sm:h-40 relative bg-gradient-to-b ${gradient} rounded-lg shadow-lg p-4 flex flex-col justify-between items-center`}
    >
      {/* Badge */}
      <div
        className={`absolute -top-3 px-4 py-1 bg-gradient-to-b ${gradient} rounded-full text-xs sm:text-sm text-gray-900 font-semibold`}
      >
        {pill}
      </div>

      {/* Content */}
      <h2 className="text-3xl sm:text-4xl font-bold text-white">{content}</h2>

      {/* Info */}
      <p className="text-xs sm:text-sm text-white">{info}</p>
    </div>
  );
};

export default SecondaryCard;
