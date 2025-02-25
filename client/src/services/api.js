import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth services
export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};

// Ticket services
export const getTickets = async (userId, userRole) => {
  try {
    const response = await api.get("/support-tickets", {
      params: { userId, userRole },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
};

export const createTicket = async (ticketData) => {
  const response = await api.post("/support-tickets", ticketData);
  return response.data;
};

/**
 * Update a ticket
 * @param {string} id - Ticket ID
 * @param {object} ticketData - Updated ticket data including userId and userRole
 * @returns {Promise} - Promise with updated ticket data
 */
export const updateTicket = async (id, ticketData) => {
  try {
    const response = await api.patch(`/support-tickets/${id}`, ticketData);
    return response.data;
  } catch (error) {
    console.error("Error updating ticket:", error);
    throw error;
  }
};

export const deleteTicket = async (id, userId, userRole) => {
  const response = await api.delete(`/support-tickets/${id}`, {
    data: { userId, userRole },
  });
  return response.data;
};

// User services
export const getUsers = async (userId, userRole) => {
  try {
    const response = await api.get("/users", {
      params: { userId, userRole },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const createAdmin = async (userData) => {
  try {
    const response = await api.post("/auth/create-admin", userData);
    return response.data;
  } catch (error) {
    console.error("Error creating admin:", error);
    throw error;
  }
};

// Service services
export const getServices = async () => {
  try {
    const response = await api.get("/services");
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};

export const createService = async (serviceData) => {
  try {
    const response = await api.post("/services", serviceData);
    return response.data;
  } catch (error) {
    console.error("Error creating service:", error);
    throw error;
  }
};

export const updateService = async (id, serviceData) => {
  try {
    const response = await api.put(`/services/${id}`, serviceData);
    return response.data;
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
};

export const deleteService = async (id, userId, userRole) => {
  try {
    const response = await api.delete(`/services/${id}`, {
      data: { userId, userRole },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};

// Booking services
export const getBookings = async (userId, userRole) => {
  try {
    const response = await api.get("/bookings", {
      params: { userId, userRole },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

export const createBooking = async (bookingData) => {
  try {
    const response = await api.post("/bookings", bookingData);
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

export const updateBookingStatus = async (id, status, userId, userRole) => {
  try {
    const response = await api.patch(`/bookings/${id}/status`, {
      status,
      userId,
      userRole,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating booking status:", error);
    throw error;
  }
};

export const cancelBooking = async (id, userId, userRole) => {
  try {
    const response = await api.patch(`/bookings/${id}/cancel`, {
      userId,
      userRole,
    });
    return response.data;
  } catch (error) {
    console.error("Error cancelling booking:", error);
    throw error;
  }
};

/**
 * Get a specific ticket by ID
 * @param {string} id - Ticket ID
 * @param {string} userId - User ID
 * @param {string} role - User role
 * @returns {Promise} - Promise with ticket data
 */
export const getTicket = async (id, userId, role) => {
  try {
    const response = await api.get(`/support-tickets/${id}`, {
      params: { userId, role },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching ticket:", error);
    throw error;
  }
};
