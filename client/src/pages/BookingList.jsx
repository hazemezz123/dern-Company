import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { getBookings, cancelBooking } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const BookingList = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const response = await getBookings(user._id, user.role);
      setBookings(response.bookings);
    } catch (err) {
      setError("Failed to load bookings. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelBooking = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) {
      return;
    }

    try {
      await cancelBooking(id, user._id, user.role);
      setBookings(
        bookings.map((booking) =>
          booking._id === id ? { ...booking, status: "cancelled" } : booking
        )
      );
      setSuccess("Booking cancelled successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to cancel booking.");
      console.error(err);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
          My Bookings
        </h1>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-light dark:border-primary-dark"></div>
          <p className="mt-2 text-text-secondary-light dark:text-text-secondary-dark">
            Loading bookings...
          </p>
        </div>
      ) : bookings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-8"
        >
          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
            You don't have any bookings yet.
          </p>
          <Link to="/services" className="btn-primary">
            Browse Services
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="card hover:shadow-lg transition-shadow duration-200"
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-1">
                  {booking.service?.title || "Unknown Service"}
                </h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark">
                  {booking.service?.description || "No description available"}
                </p>
              </div>

              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-primary-light/10 dark:bg-primary-dark/10 flex items-center justify-center mr-3">
                  <span className="text-primary-light dark:text-primary-dark">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                    {new Date(booking.date).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">
                    {new Date(booking.date).toLocaleTimeString()}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <span
                  className={`px-3 py-1 inline-flex text-sm font-medium rounded-full
                    ${
                      booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                        : ""
                    }
                    ${
                      booking.status === "confirmed"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                        : ""
                    }
                    ${
                      booking.status === "completed"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        : ""
                    }
                    ${
                      booking.status === "cancelled"
                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        : ""
                    }
                  `}
                >
                  {booking.status}
                </span>
              </div>

              {booking.notes && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">
                    Notes:
                  </h4>
                  <p className="text-text-primary-light dark:text-text-primary-dark text-sm">
                    {booking.notes}
                  </p>
                </div>
              )}

              {booking.status === "pending" && (
                <button
                  onClick={() => handleCancelBooking(booking._id)}
                  className="btn-danger w-full"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default BookingList;
