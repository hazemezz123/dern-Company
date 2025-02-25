import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {
  getServices,
  createService,
  updateService,
  deleteService,
} from "../services/api";
import { AuthContext } from "../context/AuthContext";

const AdminServiceManagement = () => {
  const { user } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editingService, setEditingService] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const serviceTemplates = [
    {
      title: "Remote Technical Support",
      description:
        "Remote assistance for software issues, troubleshooting, and configuration via screen sharing.",
      price: 50,
      duration: 60,
      category: "Technical Support",
      serviceType: "remote-support",
    },
    {
      title: "On-Site IT Support",
      description:
        "Our technicians will visit your location to resolve hardware and software issues.",
      price: 100,
      duration: 120,
      category: "Technical Support",
      serviceType: "on-site-support",
    },
    {
      title: "Computer Repair Service",
      description: "Hardware diagnostics and repair for desktops and laptops.",
      price: 75,
      duration: 180,
      category: "Repair",
      serviceType: "device-repair",
    },
    {
      title: "Device Pickup & Delivery",
      description:
        "We'll pick up your device, repair it at our facility, and return it to you.",
      price: 120,
      duration: 1440, // 24 hours
      category: "Repair",
      serviceType: "device-pickup",
    },
    {
      title: "IT Infrastructure Consultation",
      description:
        "Expert advice on IT infrastructure, network setup, and security solutions.",
      price: 150,
      duration: 90,
      category: "Consultation",
      serviceType: "consultation",
    },
  ];

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const response = await getServices();
      setServices(response.services);
    } catch (err) {
      setError("Failed to load services. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setError("");
    setSuccess("");

    try {
      if (editingService) {
        // Update existing service
        const response = await updateService(editingService._id, {
          ...data,
          userId: user._id,
          userRole: user.role,
        });

        setServices(
          services.map((service) =>
            service._id === editingService._id ? response.service : service
          )
        );
        setSuccess("Service updated successfully!");
      } else {
        // Create new service
        const response = await createService({
          ...data,
          userId: user._id,
          userRole: user.role,
        });

        setServices([...services, response.service]);
        setSuccess("Service created successfully!");
      }

      reset();
      setEditingService(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save service.");
      console.error(err);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);

    // Set form values
    setValue("title", service.title);
    setValue("description", service.description);
    setValue("price", service.price);
    setValue("duration", service.duration);
    setValue("category", service.category);
    setValue("isActive", service.isActive);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) {
      return;
    }

    try {
      await deleteService(id, user._id, user.role);
      setServices(services.filter((service) => service._id !== id));
      setSuccess("Service deleted successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete service.");
      console.error(err);
    }
  };

  const handleCancel = () => {
    setEditingService(null);
    reset();
  };

  const applyTemplate = (template) => {
    Object.entries(template).forEach(([key, value]) => {
      setValue(key, value);
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Service Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card"
        >
          <h2 className="text-xl font-semibold mb-4">
            {editingService ? "Edit Service" : "Create New Service"}
          </h2>

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

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                id="title"
                type="text"
                className={`form-input ${errors.title ? "border-red-500" : ""}`}
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
                rows="3"
                className={`form-input ${
                  errors.description ? "border-red-500" : ""
                }`}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="price" className="form-label">
                  Price ($)
                </label>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  className={`form-input ${
                    errors.price ? "border-red-500" : ""
                  }`}
                  {...register("price", {
                    required: "Price is required",
                    min: {
                      value: 0,
                      message: "Price must be positive",
                    },
                  })}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="duration" className="form-label">
                  Duration (minutes)
                </label>
                <input
                  id="duration"
                  type="number"
                  min="1"
                  className={`form-input ${
                    errors.duration ? "border-red-500" : ""
                  }`}
                  {...register("duration", {
                    required: "Duration is required",
                    min: {
                      value: 1,
                      message: "Duration must be at least 1 minute",
                    },
                  })}
                />
                {errors.duration && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.duration.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <input
                id="category"
                type="text"
                className={`form-input ${
                  errors.category ? "border-red-500" : ""
                }`}
                {...register("category", {
                  required: "Category is required",
                })}
              />
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="serviceType" className="form-label">
                Service Type
              </label>
              <select
                id="serviceType"
                className={`form-input ${
                  errors.serviceType ? "border-red-500" : ""
                }`}
                {...register("serviceType", {
                  required: "Service type is required",
                })}
              >
                <option value="">Select a service type</option>
                <option value="remote-support">Remote Support</option>
                <option value="on-site-support">On-Site Support</option>
                <option value="device-repair">Device Repair</option>
                <option value="device-pickup">Device Pickup & Return</option>
                <option value="consultation">IT Consultation</option>
              </select>
              {errors.serviceType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.serviceType.message}
                </p>
              )}
            </div>

            {editingService && (
              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    {...register("isActive")}
                  />
                  <span className="ml-2">Active</span>
                </label>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Quick Templates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {serviceTemplates.map((template, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => applyTemplate(template)}
                    className="text-left p-3 border border-gray-300 rounded hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    <p className="font-medium">{template.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {template.serviceType.replace("-", " ")}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              {editingService && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              )}
              <button type="submit" className="btn btn-primary">
                {editingService ? "Update Service" : "Create Service"}
              </button>
            </div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card"
        >
          <h2 className="text-xl font-semibold mb-4">Services</h2>

          {isLoading ? (
            <p className="text-gray-500">Loading services...</p>
          ) : services.length === 0 ? (
            <p className="text-gray-500">No services found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
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
                  {services.map((service) => (
                    <tr key={service._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {service.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {service.category}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${service.price.toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {service.duration} min
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            service.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {service.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(service)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(service._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminServiceManagement;
