// Sidebar.jsx
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  
  AiOutlinePlus,
  AiOutlineVideoCamera,
} from "react-icons/ai";
import { MdCategory, MdComment, MdOutlineSpaceDashboard } from "react-icons/md";

const menuItems = [
  {
    icon: <MdOutlineSpaceDashboard size={24} className="mr-2" />,
    label: "Admin Dashboard",
    path: "/admin/movies/dashboard",
  },
  {
    icon: <AiOutlineVideoCamera size={24} className="mr-2" />,
    label: "Create Movie",
    path: "/admin/movies/create",
  },
  {
    icon: <MdCategory size={24} className="mr-2" />,
    label: "Create Genre",
    path: "/admin/movies/genre",
  },
  {
    icon: <MdComment size={24} className="mr-2" />,
    label: "Comments",
    path: "/admin/movies/comments",
  },
];


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
<>
    {/* Sidebar for larger screens > md */}
    <div className={`hidden md:block fixed h-screen bg-gray-900 text-white md: md:w-60 transition-transform duration-300 ease-in-out transform md:translate-x-0`}>
      <ul className="mt-10 space-y-6 px-6">
        {menuItems.map((item,index) => (
          <li key={index} className="hover:bg-gradient-to-r from-green-500 to-lime-400 p-3 rounded transition flex">
            {item.icon}
            <Link to={item.path} className="block w-full">{item.label}</Link>
          </li>
        ))}
      </ul>
    </div>


    {/* Sidebar for smaller screen <= md */}
    
    <div className="md:hidden fixed bottom-[8%] right-8 z-50">
      {/* FAB Button */}
      <button
        className="w-16 h-16 bg-gradient-to-r from-green-500 to-lime-400 text-white rounded-full flex items-center justify-center shadow-xl transition-transform"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AiOutlinePlus size={28} className={`transition-transform ${isOpen ? "rotate-45" : ""}`} />
      </button>

      {/* Floating Menu */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 bg-gray-900 p-4 rounded-lg shadow-2xl w-48 space-y-3 transition-all duration-300">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center space-x-3 text-white hover:text-green-400 hover:bg-gray-800 px-3 py-2 rounded-lg transition-all"
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div></>
  );
};

export default Sidebar;
