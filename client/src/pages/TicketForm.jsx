import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { createTicket } from "../services/api";
import { AuthContext } from "../context/AuthContext";

const TicketForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");

    try {
      const ticketData = {
        ...data,
        userId: user._id,
      };

      await createTicket(ticketData);
      navigate("/tickets");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create ticket. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Create Support Ticket</h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card"
      >
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              id="title"
              type="text"
              className={`form-input ${errors.title ? "border-red-500" : ""}`}
              placeholder="Brief description of the issue"
              {...register("title", {
                required: "Title is required",
              })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              rows="5"
              className={`form-input ${
                errors.description ? "border-red-500" : ""
              }`}
              placeholder="Detailed explanation of your issue"
              {...register("description", {
                required: "Description is required",
              })}
            ></textarea>
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="priority" className="form-label">
              Priority
            </label>
            <select
              id="priority"
              className={`form-input ${
                errors.priority ? "border-red-500" : ""
              }`}
              defaultValue="medium"
              {...register("priority", {
                required: "Priority is required",
              })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
            {errors.priority && (
              <p className="text-red-500 text-sm mt-1">
                {errors.priority.message}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/tickets")}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Ticket"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default TicketForm;
