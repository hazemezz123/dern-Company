const express = require("express");
const { body, validationResult } = require("express-validator");
const Booking = require("../models/Booking");
const Service = require("../models/Service");
const router = express.Router();

// Middleware for validation
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  const userId = req.query.userId || req.body.userId || req.headers["user-id"];

  if (!userId) {
    return res.status(401).json({ message: "Authentication required" });
  }

  req.userId = userId;
  next();
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  const userRole =
    req.query.userRole || req.body.userRole || req.headers["user-role"];

  if (userRole !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }

  req.userRole = userRole;
  next();
};

// Get all bookings (filtered by user or all for admin)
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const userId = req.userId;
    const userRole =
      req.query.userRole || req.body.userRole || req.headers["user-role"];

    // If admin, get all bookings, otherwise get only user's bookings
    const bookings =
      userRole === "admin"
        ? await Booking.find()
            .populate("service")
            .populate("user", "name email")
        : await Booking.find({ user: userId }).populate("service");

    res.json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new booking
router.post(
  "/",
  isAuthenticated,
  [
    body("serviceId").notEmpty().withMessage("Service ID is required"),
    body("date").isISO8601().withMessage("Valid date is required"),
    body("notes").optional(),
  ],
  validate,
  async (req, res) => {
    try {
      const { serviceId, date, notes } = req.body;
      const userId = req.userId;

      // Check if service exists
      const service = await Service.findById(serviceId);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }

      // Check if service is active
      if (!service.isActive) {
        return res
          .status(400)
          .json({ message: "This service is not currently available" });
      }

      // Create booking
      const booking = new Booking({
        service: serviceId,
        user: userId,
        date: new Date(date),
        notes,
      });

      await booking.save();

      res.status(201).json({
        success: true,
        message: "Booking created successfully",
        booking,
      });
    } catch (error) {
      console.error("Error creating booking:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Update booking status (admin only)
router.patch(
  "/:id/status",
  isAuthenticated,
  isAdmin,
  [
    body("status")
      .isIn(["pending", "confirmed", "completed", "cancelled"])
      .withMessage("Invalid status"),
  ],
  validate,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const booking = await Booking.findById(id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      booking.status = status;
      await booking.save();

      res.json({
        success: true,
        message: "Booking status updated successfully",
        booking,
      });
    } catch (error) {
      console.error("Error updating booking status:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Cancel a booking (user can cancel their own bookings)
router.patch("/:id/cancel", isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if the booking belongs to the user or user is admin
    const userRole =
      req.query.userRole || req.body.userRole || req.headers["user-role"];
    if (booking.user.toString() !== userId && userRole !== "admin") {
      return res
        .status(403)
        .json({ message: "Not authorized to cancel this booking" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({
      success: true,
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
