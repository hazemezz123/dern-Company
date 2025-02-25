const express = require("express");
const { body, validationResult } = require("express-validator");
const Ticket = require("../models/Ticket");
const mongoose = require("mongoose");
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
  // Check for userId in query params, body, or headers
  const userId = req.query.userId || req.body.userId || req.headers["user-id"];

  if (!userId) {
    return res.status(401).json({ message: "Authentication required" });
  }

  // Add userId to request for use in route handlers
  req.userId = userId;
  next();
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  // Check for userRole in query params, body, or headers
  const userRole =
    req.query.userRole || req.body.userRole || req.headers["user-role"];

  if (userRole !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }

  req.userRole = userRole;
  next();
};

// Get all tickets
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const userId = req.userId;
    const userRole =
      req.query.userRole || req.body.userRole || req.headers["user-role"];

    // If admin, get all tickets, otherwise get only user's tickets
    const tickets =
      userRole === "admin"
        ? await Ticket.find().populate("user", "name email")
        : await Ticket.find({ user: userId }).populate("user", "name email");

    res.json({
      success: true,
      count: tickets.length,
      tickets,
    });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new ticket
router.post(
  "/",
  isAuthenticated,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("priority")
      .isIn(["low", "medium", "high", "urgent"])
      .withMessage("Invalid priority"),
  ],
  validate,
  async (req, res) => {
    try {
      const { title, description, priority, userId } = req.body;

      const ticket = new Ticket({
        title,
        description,
        priority,
        user: userId,
      });

      await ticket.save();

      res.status(201).json({
        success: true,
        message: "Ticket created successfully",
        ticket,
      });
    } catch (error) {
      console.error("Error creating ticket:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Update a ticket (admin only)
router.patch("/:id", isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, userId, userRole } = req.body;

    // Only allow admins to update tickets
    if (userRole !== "admin") {
      return res
        .status(403)
        .json({ message: "Admin access required to update tickets" });
    }

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Update ticket fields
    if (title) ticket.title = title;
    if (description) ticket.description = description;
    if (status) ticket.status = status;
    if (priority) ticket.priority = priority;

    await ticket.save();

    res.json({
      success: true,
      message: "Ticket updated successfully",
      ticket,
    });
  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a ticket (admin only)
router.delete("/:id", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete ticket
    const ticket = await Ticket.findByIdAndDelete(id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json({
      success: true,
      message: "Ticket deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting ticket:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update a ticket status (admin only)
router.patch(
  "/:id/status",
  isAuthenticated,
  [
    body("status")
      .isIn(["open", "in-progress", "resolved", "closed"])
      .withMessage("Invalid status"),
  ],
  validate,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const userRole =
        req.query.userRole || req.body.userRole || req.headers["user-role"];

      // Only admins can update status
      if (userRole !== "admin") {
        return res
          .status(403)
          .json({ message: "Admin access required to update ticket status" });
      }

      // Find ticket
      const ticket = await Ticket.findById(id);
      if (!ticket) {
        return res.status(404).json({ message: "Ticket not found" });
      }

      // Update ticket status
      ticket.status = status;

      // If status is 'in-progress', assign to admin
      if (status === "in-progress" && !ticket.assignedTo) {
        ticket.assignedTo = req.userId;
      }

      await ticket.save();

      res.json({
        success: true,
        message: "Ticket status updated successfully",
        ticket,
      });
    } catch (error) {
      console.error("Error updating ticket status:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Assign ticket to admin
router.patch("/:id/assign", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.userId;

    // Find ticket
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Assign ticket to admin
    ticket.assignedTo = adminId;

    // If ticket is still open, change to in-progress
    if (ticket.status === "open") {
      ticket.status = "in-progress";
    }

    await ticket.save();

    res.json({
      success: true,
      message: "Ticket assigned successfully",
      ticket,
    });
  } catch (error) {
    console.error("Error assigning ticket:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a single ticket by ID
router.get("/:id", isAuthenticated, async (req, res) => {
  console.log("GET /tickets/:id route hit");
  console.log("Params:", req.params);
  console.log("Query:", req.query);

  try {
    const { id } = req.params;
    const { userId, role } = req.query;

    // Validate the ticket ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ticket ID" });
    }

    const ticket = await Ticket.findById(id).populate("user", "name email");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Check if user has permission to view this ticket
    if (role !== "admin" && ticket.user._id.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this ticket" });
    }

    res.json({ success: true, ticket });
  } catch (error) {
    console.error("Error fetching ticket:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
