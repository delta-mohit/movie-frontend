import { useState, useEffect } from "react";
import {
  AiOutlineHome,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { IoPersonCircleOutline } from "react-icons/io5";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { BiCameraMovie } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/users";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  // Detect scroll to add shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-gray-800
 text-white z-50 transition-all ${isScrolled ? "shadow-lg" : ""}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Menu Toggle Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white ml-4"
          >
            {mobileMenuOpen ? (
              <AiOutlineClose size={24} />
            ) : (
              <AiOutlineMenu size={24} />
            )}
          </button>

          {/* Left - Logo and Navigation */}

          <div className="hidden md:flex md:items-center md:space-x-12">
            {userInfo && (
              <>
                {" "}
                <Link
                  to="/"
                  className="flex items-center text-lg font-semibold hover:text-teal-400 transition"
                >
                  <AiOutlineHome size={24} className="mr-2" />
                  Home
                </Link>
                <Link
                  to="/movies"
                  className="flex items-center text-lg font-semibold hover:text-teal-400 transition"
                >
                  <BiCameraMovie size={24} className="mr-2" />
                  Movies
                </Link>
              </>
            )}
            {userInfo?.isAdmin && (
              <Link
                to="/admin/movies/dashboard"
                className="hidden md:flex items-center text-lg font-semibold hover:text-teal-400 transition"
              >
                <MdOutlineSpaceDashboard size={24} className="mr-2" />
                Admin Dashboard
              </Link>
            )}
            {userInfo && (
              <Link
                to="/profile"
                className="hidden md:flex items-center text-lg font-semibold hover:text-teal-400 transition"
              >
                <IoPersonCircleOutline size={24} className="mr-2" />
                Profile
              </Link>
            )}
          </div>

          {/* Right - User Profile & Auth */}
          <div className="relative flex items-center">
            {userInfo ? (
              <>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center focus:outline-none"
                >
                  <span className="mr-2">{userInfo.username}</span>
                </button>

                <button
                  onClick={logoutHandler}
                  className="hidden md:block w-full px-2 py-[4px] rounded-lg bg-gray-700 text-center"
                >
                  Logout
                </button>

              </>
            ) : (
              <div className="hidden md:flex space-x-4">
                <Link
                  to="/login"
                  className="flex items-center hover:text-teal-400 transition"
                >
                  <AiOutlineLogin size={24} className="mr-2" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center hover:text-teal-400 transition"
                >
                  <AiOutlineUserAdd size={24} className="mr-2" />
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-900 text-white py-4 px-6 space-y-4">
            <Link
              to="/"
              className="block text-lg font-semibold hover:text-teal-400 transition"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/movies"
              className="block text-lg font-semibold hover:text-teal-400 transition"
              onClick={toggleMobileMenu}
            >
              Movies
            </Link>
            {userInfo?.isAdmin && (
              <Link
                to="/admin/movies/dashboard"
                className="block text-lg font-semibold hover:text-teal-400 transition"
                onClick={toggleMobileMenu}
              >
                Admin Dashboard
              </Link>
            )}
            {userInfo && (
              <Link
                to="/profile"
                className="block text-lg font-semibold hover:text-teal-400 transition"
                onClick={toggleMobileMenu}
              >
                Profile
              </Link>
            )}
            {!userInfo ? (
              <>
                <Link
                  to="/login"
                  className="block text-lg font-semibold hover:text-teal-400 transition"
                  onClick={toggleMobileMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block text-lg font-semibold hover:text-teal-400 transition"
                  onClick={toggleMobileMenu}
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  logoutHandler();
                  toggleMobileMenu();
                }}
                className="block w-full text-left text-lg font-semibold hover:text-teal-400 transition"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
