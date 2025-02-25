import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { getTickets } from "../services/api";

const TicketList = () => {
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
          ticket.description.toLowerCase().includes(searchLower)
      );
    }

    setFilteredTickets(result);
  }, [tickets, filter]);

  const fetchTickets = async () => {
    try {
      setIsLoading(true);
      const response = await getTickets(user._id, user.role);
      setTickets(response.tickets);
      setFilteredTickets(response.tickets);
      setIsLoading(false);
    } catch (err) {
      setError("Failed to fetch tickets");
      setIsLoading(false);
      console.error(err);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
          Support Tickets
        </h1>
        {user && (
          <Link to="/tickets/new" className="btn-primary">
            Create New Ticket
          </Link>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card mb-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/4">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={filter.status}
              onChange={handleFilterChange}
              className="form-input"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div className="md:w-1/4">
            <label htmlFor="priority" className="form-label">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={filter.priority}
              onChange={handleFilterChange}
              className="form-input"
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <div className="md:w-1/2">
            <label htmlFor="search" className="form-label">
              Search
            </label>
            <input
              type="text"
              id="search"
              name="search"
              value={filter.search}
              onChange={handleFilterChange}
              placeholder="Search by title or description"
              className="form-input"
            />
          </div>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-light dark:border-primary-dark"></div>
          <p className="mt-2 text-text-secondary-light dark:text-text-secondary-dark">
            Loading tickets...
          </p>
        </div>
      ) : filteredTickets.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-8"
        >
          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
            No tickets found.
          </p>
          <Link to="/tickets/new" className="btn-primary">
            Create Your First Ticket
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border-light dark:divide-border-dark rounded-lg overflow-hidden">
              <thead className="bg-gray-50 dark:bg-surface-dark">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-surface-light dark:bg-surface-dark divide-y divide-border-light dark:divide-border-dark">
                {filteredTickets.map((ticket) => (
                  <tr
                    key={ticket._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors duration-150"
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
        </motion.div>
      )}
    </div>
  );
};

export default TicketList;
