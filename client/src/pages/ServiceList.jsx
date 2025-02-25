import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { getServices, createBooking } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const ServiceList = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    // Filter services based on search term and category
    let result = [...services];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (service) =>
          service.title.toLowerCase().includes(term) ||
          service.description.toLowerCase().includes(term)
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter(
        (service) => service.category === selectedCategory
      );
    }

    setFilteredServices(result);
  }, [searchTerm, selectedCategory, services]);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const response = await getServices();
      const activeServices = response.services.filter(
        (service) => service.isActive
      );
      setServices(activeServices);
      setFilteredServices(activeServices);

      // Extract unique categories
      const uniqueCategories = [
        ...new Set(activeServices.map((service) => service.category)),
      ];
      setCategories(uniqueCategories);
    } catch (err) {
      setError("Failed to load services. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookService = (service) => {
    setSelectedService(service);
    setError("");
    setSuccess("");
  };

  const onSubmit = async (data) => {
    try {
      const bookingData = {
        serviceId: selectedService._id,
        date: data.date,
        notes: data.notes,
        userId: user._id,
      };

      await createBooking(bookingData);
      setSuccess(
        `Your booking for ${selectedService.title} has been submitted!`
      );
      setSelectedService(null);
      reset();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create booking.");
      console.error(err);
    }
  };

  const handleCancel = () => {
    setSelectedService(null);
    reset();
  };

  // Add this function to display service type with icon
  const getServiceTypeInfo = (type) => {
    switch (type) {
      case "remote-support":
        return {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
                clipRule="evenodd"
              />
            </svg>
          ),
          label: "Remote Support",
        };
      case "on-site-support":
        return {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-14a3 3 0 00-3 3v2H7a1 1 0 000 2h1v1a1 1 0 01-1 1 1 1 0 100 2h6a1 1 0 100-2H9.83c.11-.313.17-.65.17-1v-1h1a1 1 0 100-2h-1V7a1 1 0 112 0 1 1 0 102 0 3 3 0 00-3-3z"
                clipRule="evenodd"
              />
            </svg>
          ),
          label: "On-Site Support",
        };
      case "device-repair":
        return {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          ),
          label: "Device Repair",
        };
      case "device-pickup":
        return {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
            </svg>
          ),
          label: "Device Pickup & Return",
        };
      case "consultation":
        return {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          ),
          label: "Consultation",
        };
      default:
        return {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
          ),
          label: "Other Service",
        };
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Our Services</h1>

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

      {!selectedService && (
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-grow">
              <input
                type="text"
                placeholder="Search services..."
                className="form-input w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <select
                className="form-input"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {isLoading ? (
            <p className="text-gray-500">Loading services...</p>
          ) : filteredServices.length === 0 ? (
            <p className="text-gray-500">No services found.</p>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredServices.map((service) => (
                <motion.div
                  key={service._id}
                  whileHover={{ y: -5 }}
                  className="card hover:shadow-lg  "
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-2">
                          {service.title}
                        </h3>
                        <div className="flex items-center text-sm text-text-secondary-light dark:text-text-secondary-dark mb-2">
                          {getServiceTypeInfo(service.serviceType).icon}
                          <span className="ml-1">
                            {getServiceTypeInfo(service.serviceType).label}
                          </span>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-primary-light dark:text-primary-dark">
                        ${service.price}
                      </span>
                    </div>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4">
                      {service.description}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-text-secondary-light dark:text-text-secondary-dark mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-text-secondary-light dark:text-text-secondary-dark">
                          {service.duration} min
                        </span>
                      </div>
                      <span className="px-2 py-1 bg-background-light dark:bg-background-dark text-text-secondary-light dark:text-text-secondary-dark text-sm rounded">
                        {service.category}
                      </span>
                    </div>
                    {user ? (
                      <button
                        onClick={() => handleBookService(service)}
                        className="btn-primary w-full"
                      >
                        Book Now
                      </button>
                    ) : (
                      <Link
                        to="/login"
                        className="btn-primary w-full text-center"
                      >
                        Login to Book
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      )}

      {selectedService && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card max-w-2xl mx-auto"
        >
          <h2 className="text-xl font-semibold mb-4">
            Book {selectedService.title}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="date" className="form-label">
                Select Date and Time
              </label>
              <input
                id="date"
                type="datetime-local"
                className={`form-input ${errors.date ? "border-red-500" : ""}`}
                {...register("date", {
                  required: "Date and time are required",
                })}
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.date.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="notes" className="form-label">
                Additional Notes (Optional)
              </label>
              <textarea
                id="notes"
                rows="3"
                className="form-input"
                {...register("notes")}
              ></textarea>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Confirm Booking
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default ServiceList;
