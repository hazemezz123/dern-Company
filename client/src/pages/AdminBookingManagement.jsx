import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { getBookings, updateBookingStatus } from "../services/api";
import { AuthContext } from "../context/AuthContext";

const AdminBookingManagement = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [filter, setFilter] = useState({
    status: "all",
    search: "",
  });

  useEffect(() => {
    fetchBookings();
  }, [user]);

  useEffect(() => {
    // Filter bookings based on current filter settings
    let result = [...bookings];

    if (filter.status !== "all") {
      result = result.filter((booking) => booking.status === filter.status);
    }

    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      result = result.filter(
        (booking) =>
          booking.service.title.toLowerCase().includes(searchLower) ||
          booking.user.name.toLowerCase().includes(searchLower) ||
          booking.user.email.toLowerCase().includes(searchLower)
      );
    }

    setFilteredBookings(result);
  }, [filter, bookings]);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const response = await getBookings(user._id, user.role);
      setBookings(response.bookings);
      setFilteredBookings(response.bookings);
    } catch (err) {
      setError("Failed to load bookings. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await updateBookingStatus(bookingId, newStatus, user._id, user.role);

      setBookings(
        bookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: newStatus }
            : booking
        )
      );

      setSuccess(`Booking status updated to ${newStatus}`);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update booking status."
      );
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
      <h1 className="text-3xl font-bold mb-8">Booking Management</h1>

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

      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Search by service or customer..."
            className="form-input w-full"
            name="search"
            value={filter.search}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <select
            className="form-input"
            name="status"
            value={filter.status}
            onChange={handleFilterChange}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <p className="text-gray-500">Loading bookings...</p>
      ) : filteredBookings.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-x-auto"
        >
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Customer
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Service
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date & Time
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {booking.user.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {booking.user.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {booking.service.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      ${booking.service.price.toFixed(2)} •{" "}
                      {booking.service.duration} min
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(booking.date).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(booking.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                        booking.status
                      )}`}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {booking.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            handleStatusChange(booking._id, "confirmed")
                          }
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(booking._id, "cancelled")
                          }
                          className="text-red-600 hover:text-red-900"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {booking.status === "confirmed" && (
                      <button
                        onClick={() =>
                          handleStatusChange(booking._id, "completed")
                        }
                        className="text-green-600 hover:text-green-900"
                      >
                        Mark Completed
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
};

export default AdminBookingManagement;
