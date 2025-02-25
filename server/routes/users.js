const express = require("express");
const User = require("../models/User");
const router = express.Router();

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

// Get all users (admin only)
router.get("/", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
