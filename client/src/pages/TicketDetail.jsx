import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { getTicket, updateTicket, deleteTicket } from "../services/api";

const TicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [ticket, setTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
  });

  useEffect(() => {
    fetchTicket();
  }, [id]);

  const fetchTicket = async () => {
    try {
      setIsLoading(true);
      const response = await getTicket(id, user._id, user.role);

      if (response && response.ticket) {
        setTicket(response.ticket);
        setFormData({
          title: response.ticket.title || "",
          description: response.ticket.description || "",
          status: response.ticket.status || "",
          priority: response.ticket.priority || "",
        });
      } else {
        setError("Ticket not found or data is incomplete");
      }

      setIsLoading(false);
    } catch (err) {
      setError("Failed to fetch ticket details");
      setIsLoading(false);
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Only allow admins to update tickets
    if (user.role !== "admin") {
      setError("Only administrators can edit tickets");
      return;
    }

    try {
      // Include userId and userRole in the request
      const updatedData = {
        ...formData,
        userId: user._id,
        userRole: user.role,
      };

      await updateTicket(id, updatedData);
      setTicket((prev) => ({ ...prev, ...formData }));
      setIsEditing(false);
      setError(""); // Clear any previous errors
    } catch (err) {
      setError("Failed to update ticket");
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this ticket?")) {
      try {
        await deleteTicket(id, user._id, user.role);
        navigate("/tickets");
      } catch (err) {
        setError("Failed to delete ticket");
        console.error(err);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-light dark:border-primary-dark"></div>
        <p className="mt-2 text-text-secondary-light dark:text-text-secondary-dark">
          Loading ticket details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
          Ticket Details
        </h1>
        <div className="flex space-x-2">
          {user.role === "admin" && (
            <>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="btn-secondary px-4 py-2 rounded-md"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
              <button
                onClick={handleDelete}
                className="btn-danger px-4 py-2 rounded-md"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card"
      >
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-input"
                rows="4"
                required
              ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="status" className="form-label">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="new">New</option>
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
                  value={formData.priority}
                  onChange={handleChange}
                  className="form-input"
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div>
            <div className="mb-6 pb-6 border-b border-border-light dark:border-border-dark">
              <h2 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
                {ticket.title}
              </h2>
              <p className="text-text-secondary-light dark:text-text-secondary-dark whitespace-pre-line">
                {ticket.description}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-2">
                  Status
                </h3>
                <span
                  className={`px-3 py-1 inline-flex text-sm font-medium rounded-full
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
              </div>
              <div>
                <h3 className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-2">
                  Priority
                </h3>
                <span
                  className={`px-3 py-1 inline-flex text-sm font-medium rounded-full
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
              </div>
              <div>
                <h3 className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-2">
                  Created By
                </h3>
                <p className="text-text-primary-light dark:text-text-primary-dark">
                  {ticket.user?.name || "Unknown User"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-2">
                  Created At
                </h3>
                <p className="text-text-primary-light dark:text-text-primary-dark">
                  {new Date(ticket.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default TicketDetail;
