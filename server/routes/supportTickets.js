const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Ticket = require("../models/Ticket");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

// Get all tickets
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const { userId, userRole } = req.query;
    let tickets;

    if (userRole === "admin") {
      tickets = await Ticket.find()
        .populate("user", "name email")
        .sort({ createdAt: -1 });
    } else {
      tickets = await Ticket.find({ user: userId })
        .populate("user", "name email")
        .sort({ createdAt: -1 });
    }

    res.json({ success: true, tickets });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new ticket
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    const userId = req.userId;

    const ticket = new Ticket({
      title,
      description,
      priority,
      user: userId,
      status: "new",
    });

    await ticket.save();
    res.status(201).json({ success: true, ticket });
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a single ticket by ID
router.get("/:id", isAuthenticated, async (req, res) => {
  console.log("GET /support-tickets/:id route hit");
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

// Delete a ticket
router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, userRole } = req.body;

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Check if user has permission to delete this ticket
    if (userRole !== "admin" && ticket.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this ticket" });
    }

    await ticket.remove();
    res.json({ success: true, message: "Ticket deleted successfully" });
  } catch (error) {
    console.error("Error deleting ticket:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
