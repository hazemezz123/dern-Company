import { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { AiFillAliwangwang } from "react-icons/ai";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const menuRef = useRef(null);
  const profileRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsProfileOpen(false);
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-primary-light dark:bg-surface-dark text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 justify-center">
            <AiFillAliwangwang className="h-8 w-8 text-white dark:text-primary-dark " />
            <span className="font-bold text-xl">Dern-Company</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                {user.role === "user" && (
                  <Link
                    to="/dashboard"
                    className="hover:text-blue-200 transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="hover:text-blue-200 transition-colors"
                  >
                    AdminDashboard
                  </Link>
                )}
                <Link
                  to="/tickets"
                  className="hover:text-blue-200 transition-colors"
                >
                  Tickets
                </Link>
                <Link
                  to="/services"
                  className="hover:text-blue-200 transition-colors"
                >
                  Services
                </Link>
                {user.role === "user" && (
                  <Link
                    to="/bookings"
                    className="hover:text-blue-200 transition-colors"
                  >
                    My Bookings
                  </Link>
                )}
                <Link
                  to="/about"
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  Contact Us
                </Link>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-primary-light/20 dark:hover:bg-primary-dark/20 transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    // Sun icon for dark mode (to switch to light)
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    // Moon icon for light mode (to switch to dark)
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </button>

                {/* User Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-full hover:bg-primary-light/20 dark:hover:bg-primary-dark/20 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-200 text-primary-light flex items-center justify-center font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span>{user.name}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 transition-transform duration-200 ${
                        isProfileOpen ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-surface-dark rounded-md shadow-lg py-1 z-10 border dark:border-border-dark">
                      <div className="px-4 py-3 border-b dark:border-border-dark">
                        <p className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark">
                          {user.name}
                        </p>
                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark truncate">
                          {user.email}
                        </p>
                        <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-1 capitalize">
                          Role: {user.role}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-text-primary-light dark:text-text-primary-dark hover:bg-background-light dark:hover:bg-background-dark"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Your Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-background-light dark:hover:bg-background-dark"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/services"
                  className="hover:text-blue-200 transition-colors"
                >
                  Services
                </Link>
                <Link
                  to="/login"
                  className="hover:text-blue-200 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-primary-light px-4 py-2 rounded-md hover:bg-blue-100 dark:bg-primary-dark dark:text-white dark:hover:bg-primary-dark/90 transition-colors"
                >
                  Register
                </Link>
                <Link
                  to="/about"
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  Contact Us
                </Link>

                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full hover:bg-primary-light/20 dark:hover:bg-primary-dark/20 transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-primary-light/20 dark:hover:bg-primary-dark/20 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="md:hidden bg-primary-light/95 dark:bg-primary-dark/95 backdrop-blur-sm absolute w-full z-50 shadow-lg"
        >
          <div className="px-4 py-3 space-y-3">
            {user ? (
              <>
                <div className="flex items-center space-x-3 p-3 bg-primary-light/30 dark:bg-primary-dark/30 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-blue-200 text-primary-light flex items-center justify-center font-semibold text-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-xs text-blue-200">{user.email}</p>
                  </div>
                </div>

                {user.role === "user" && (
                  <Link
                    to="/dashboard"
                    className="block py-2 px-3 rounded-md hover:bg-primary-light/20 dark:hover:bg-primary-dark/20"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="block py-2 px-3 rounded-md hover:bg-primary-light/20 dark:hover:bg-primary-dark/20"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <Link
                  to="/tickets"
                  className="block py-2 px-3 rounded-md hover:bg-primary-light/20 dark:hover:bg-primary-dark/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tickets
                </Link>
                <Link
                  to="/services"
                  className="block py-2 px-3 rounded-md hover:bg-primary-light/20 dark:hover:bg-primary-dark/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
                {user.role === "user" && (
                  <Link
                    to="/bookings"
                    className="block py-2 px-3 rounded-md hover:bg-primary-light/20 dark:hover:bg-primary-dark/20"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Bookings
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="block py-2 px-3 rounded-md hover:bg-primary-light/20 dark:hover:bg-primary-dark/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/about"
                  className="block py-2 px-3 rounded-md hover:bg-primary-light/20 dark:hover:bg-primary-dark/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="block py-2 px-3 rounded-md hover:bg-primary-light/20 dark:hover:bg-primary-dark/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Us
                </Link>
                {/* Theme Toggle in Mobile Menu */}
                <button
                  onClick={() => {
                    toggleTheme();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left py-2 px-3 rounded-md hover:bg-primary-light/20 dark:hover:bg-primary-dark/20 flex items-center"
                >
                  {theme === "dark" ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Switch to Light Mode
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                      Switch to Dark Mode
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left py-2 px-3 rounded-md text-red-300 hover:bg-primary-light/20 dark:hover:bg-primary-dark/20"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/services"
                  className="block py-2 px-3 rounded-md hover:bg-primary-light/20 dark:hover:bg-primary-dark/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  to="/login"
                  className="block py-2 px-3 rounded-md hover:bg-primary-light/20 dark:hover:bg-primary-dark/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block py-2 px-3 rounded-md bg-white text-primary-light hover:bg-blue-100 dark:bg-primary-dark dark:text-white dark:hover:bg-primary-dark/90"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
                <Link
                  to="/about"
                  className="block py-2 px-3 rounded-md hover:bg-primary-light/20 dark:hover:bg-primary-dark/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="block py-2 px-3 rounded-md hover:bg-primary-light/20 dark:hover:bg-primary-dark/20"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Us
                </Link>

                {/* Theme Toggle in Mobile Menu */}
                <button
                  onClick={() => {
                    toggleTheme();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left py-2 px-3 rounded-md hover:bg-primary-light/20 dark:hover:bg-primary-dark/20 flex items-center"
                >
                  {theme === "dark" ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Switch to Light Mode
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                      Switch to Dark Mode
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
