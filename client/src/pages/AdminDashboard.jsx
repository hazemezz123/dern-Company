import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getTickets, updateTicket } from "../services/api";
import { AuthContext } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState({
    status: "all",
    priority: "all",
    search: "",
  });

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await getTickets(user._id, user.role);
        setTickets(response.tickets);
        setFilteredTickets(response.tickets);
      } catch (err) {
        setError("Failed to load tickets. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, [user]);

  useEffect(() => {
    // Filter tickets based on current filter settings
    let result = [...tickets];

    if (filter.status !== "all") {
      result = result.filter((ticket) => ticket.status === filter.status);
    }

    if (filter.priority !== "all") {
      result = result.filter((ticket) => ticket.priority === filter.priority);
    }

    if (filter.search) {
      const searchLower = filter.search.toLowerCase();
      result = result.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(searchLower) ||
          ticket.description.toLowerCase().includes(searchLower) ||
          (ticket.user.name &&
            ticket.user.name.toLowerCase().includes(searchLower))
      );
    }

    setFilteredTickets(result);
  }, [filter, tickets]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      await updateTicket(ticketId, {
        status: newStatus,
        userId: user._id,
        userRole: user.role,
      });

      // Update local state
      const updatedTickets = tickets.map((ticket) =>
        ticket._id === ticketId ? { ...ticket, status: newStatus } : ticket
      );

      setTickets(updatedTickets);
    } catch (err) {
      setError("Failed to update ticket status. Please try again.");
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card bg-blue-50">
          <h3 className="text-lg font-semibold mb-2">Total Tickets</h3>
          <p className="text-3xl font-bold">{tickets.length}</p>
        </div>

        <div className="card bg-yellow-50">
          <h3 className="text-lg font-semibold mb-2">Open Tickets</h3>
          <p className="text-3xl font-bold">
            {tickets.filter((ticket) => ticket.status === "open").length}
          </p>
        </div>

        <div className="card bg-green-50">
          <h3 className="text-lg font-semibold mb-2">In Progress</h3>
          <p className="text-3xl font-bold">
            {tickets.filter((ticket) => ticket.status === "in-progress").length}
          </p>
        </div>

        <div className="card bg-purple-50">
          <h3 className="text-lg font-semibold mb-2">Resolved</h3>
          <p className="text-3xl font-bold">
            {
              tickets.filter(
                (ticket) =>
                  ticket.status === "resolved" || ticket.status === "closed"
              ).length
            }
          </p>
        </div>
      </div>

      <div className="card mb-8">
        <h2 className="text-xl font-semibold mb-4">Filter Tickets</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              id="status"
              name="status"
              className="form-input"
              value={filter.status}
              onChange={handleFilterChange}
            >
              <option value="all">All Statuses</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div>
            <label htmlFor="priority" className="form-label">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              className="form-input"
              value={filter.priority}
              onChange={handleFilterChange}
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div>
            <label htmlFor="search" className="form-label">
              Search
            </label>
            <input
              id="search"
              type="text"
              name="search"
              className="form-input"
              placeholder="Search by title, description or user"
              value={filter.search}
              onChange={handleFilterChange}
            />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card mb-8"
      >
        <h2 className="text-xl font-semibold mb-4 text-text-primary-light dark:text-text-primary-dark">
          Recent Tickets
        </h2>

        {isLoading ? (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary-light dark:border-primary-dark"></div>
            <p className="mt-2 text-text-secondary-light dark:text-text-secondary-dark">
              Loading tickets...
            </p>
          </div>
        ) : tickets.length === 0 ? (
          <p className="text-text-secondary-light dark:text-text-secondary-dark">
            No tickets found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border-light dark:divide-border-dark">
              <thead className="bg-background-light dark:bg-background-dark">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider"
                  >
                    Priority
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider"
                  >
                    Created
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-surface-light dark:bg-surface-dark divide-y divide-border-light dark:divide-border-dark">
                {tickets.slice(0, 5).map((ticket) => (
                  <tr
                    key={ticket._id}
                    className="hover:bg-background-light/50 dark:hover:bg-background-dark/50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-text-primary-light dark:text-text-primary-dark">
                        {ticket.title}
                      </div>
                      <div className="text-sm text-text-secondary-light dark:text-text-secondary-dark truncate max-w-xs">
                        {ticket.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${
                            ticket.status === "new"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                              : ""
                          }
                          ${
                            ticket.status === "in-progress"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                              : ""
                          }
                          ${
                            ticket.status === "resolved"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                              : ""
                          }
                          ${
                            ticket.status === "closed"
                              ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                              : ""
                          }
                        `}
                      >
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${
                            ticket.priority === "low"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                              : ""
                          }
                          ${
                            ticket.priority === "medium"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                              : ""
                          }
                          ${
                            ticket.priority === "high"
                              ? "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                              : ""
                          }
                          ${
                            ticket.priority === "urgent"
                              ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                              : ""
                          }
                        `}
                      >
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary-light dark:text-text-secondary-dark">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        to={`/tickets/${ticket._id}`}
                        className="text-primary-light dark:text-primary-dark hover:text-primary-light/80 dark:hover:text-primary-dark/80"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card hover:shadow-lg">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">User Management</h3>
            <p className="text-gray-600 mb-4">
              Create new admin users and manage existing users.
            </p>
            <Link to="/admin/users" className="btn btn-primary w-full">
              Manage Users
            </Link>
          </div>
        </div>

        <div className="card hover:shadow-lg">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Service Management</h3>
            <p className="text-gray-600 mb-4">
              Create, edit, and manage available services.
            </p>
            <Link to="/admin/services" className="btn btn-primary w-full">
              Manage Services
            </Link>
          </div>
        </div>

        <div className="card hover:shadow-lg">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Booking Management</h3>
            <p className="text-gray-600 mb-4">
              View and manage customer bookings. and change the status of the
              booking
            </p>
            <Link to="/admin/bookings" className="btn btn-primary w-full">
              Manage Bookings
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
