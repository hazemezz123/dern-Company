import { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getTickets } from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Redirect admin to home page
  if (user && user.role === "admin") {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        if (user && user.role === "user") {
          const response = await getTickets(user._id, user.role);
          setTickets(response.tickets);
        }
      } catch (err) {
        setError("Failed to load tickets. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, [user]);

  // Count tickets by status
  const ticketCounts = {
    total: tickets.length,
    open: tickets.filter((ticket) => ticket.status === "open").length,
    inProgress: tickets.filter((ticket) => ticket.status === "in-progress")
      .length,
    resolved: tickets.filter((ticket) => ticket.status === "resolved").length,
    closed: tickets.filter((ticket) => ticket.status === "closed").length,
  };

  // Get recent tickets (last 5)
  const recentTickets = [...tickets]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-light dark:border-primary-dark"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">
          Dashboard
        </h1>
        <Link
          to="/tickets/new"
          className="btn bg-primary-light dark:bg-primary-dark text-white px-4 py-2 rounded hover:bg-primary-light/90 dark:hover:bg-primary-dark/90 transition"
        >
          Create New Ticket
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="card bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded shadow-sm">
            <h3 className="text-lg font-semibold mb-1 text-text-primary-light dark:text-text-primary-dark">
              Total Tickets
            </h3>
            <p className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">
              {ticketCounts.total}
            </p>
          </div>
          <div className="card bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded shadow-sm">
            <h3 className="text-lg font-semibold mb-1 text-text-primary-light dark:text-text-primary-dark">
              Open
            </h3>
            <p className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">
              {ticketCounts.open}
            </p>
          </div>
          <div className="card bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4 rounded shadow-sm">
            <h3 className="text-lg font-semibold mb-1 text-text-primary-light dark:text-text-primary-dark">
              In Progress
            </h3>
            <p className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">
              {ticketCounts.inProgress}
            </p>
          </div>
          <div className="card bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 rounded shadow-sm">
            <h3 className="text-lg font-semibold mb-1 text-text-primary-light dark:text-text-primary-dark">
              Resolved
            </h3>
            <p className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">
              {ticketCounts.resolved + ticketCounts.closed}
            </p>
          </div>
        </div>

        <div className="card bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">
              Recent Tickets
            </h2>
            <Link
              to="/tickets"
              className="text-primary-light dark:text-primary-dark hover:underline"
            >
              View All
            </Link>
          </div>

          {recentTickets.length === 0 ? (
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              No tickets found. Create your first ticket!
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
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
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {recentTickets.map((ticket) => (
                    <tr
                      key={ticket._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link
                          to={`/tickets/${ticket._id}`}
                          className="text-primary-light dark:text-primary-dark hover:underline font-medium"
                        >
                          {ticket.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            ticket.status === "open"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
                              : ""
                          }
                          ${
                            ticket.status === "in-progress"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                              : ""
                          }
                          ${
                            ticket.status === "resolved"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                              : ""
                          }
                          ${
                            ticket.status === "closed"
                              ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                              : ""
                          }
                        `}
                        >
                          {ticket.status.replace("-", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            ticket.priority === "low"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                              : ""
                          }
                          ${
                            ticket.priority === "medium"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
                              : ""
                          }
                          ${
                            ticket.priority === "high"
                              ? "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300"
                              : ""
                          }
                          ${
                            ticket.priority === "urgent"
                              ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300"
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
