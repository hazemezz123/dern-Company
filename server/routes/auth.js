const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const router = express.Router();

// Middleware for validation
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Register a new user
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  validate,
  async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Create new user
      user = new User({
        name,
        email,
        password,
      });

      await user.save();

      // Return user data (excluding password)
      const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: userData,
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Login user
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").exists().withMessage("Password is required"),
  ],
  validate,
  async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Check password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Return user data (excluding password)
      const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      res.json({
        success: true,
        message: "Login successful",
        user: userData,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Create admin user (this should be protected in production)
router.post(
  "/create-admin",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  validate,
  async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Create new admin user
      user = new User({
        name,
        email,
        password,
        role: "admin", // Set role to admin
      });

      await user.save();

      // Return user data (excluding password)
      const userData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      res.status(201).json({
        success: true,
        message: "Admin user created successfully",
        user: userData,
      });
    } catch (error) {
      console.error("Admin registration error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
