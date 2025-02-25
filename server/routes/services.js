const express = require("express");
const { body, validationResult } = require("express-validator");
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

// Get all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).populate(
      "createdBy",
      "name"
    );

    res.json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new service (admin only)
router.post(
  "/",
  isAuthenticated,
  isAdmin,
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("price").isNumeric().withMessage("Price must be a number"),
    body("duration").isNumeric().withMessage("Duration must be a number"),
    body("category").notEmpty().withMessage("Category is required"),
    body("serviceType")
      .isIn([
        "remote-support",
        "on-site-support",
        "device-repair",
        "device-pickup",
        "consultation",
      ])
      .withMessage("Invalid service type"),
  ],
  validate,
  async (req, res) => {
    try {
      const { title, description, price, duration, category, serviceType } =
        req.body;

      const service = new Service({
        title,
        description,
        price,
        duration,
        category,
        serviceType,
        createdBy: req.userId,
      });

      await service.save();

      res.status(201).json({
        success: true,
        message: "Service created successfully",
        service,
      });
    } catch (error) {
      console.error("Error creating service:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Update a service (admin only)
router.put(
  "/:id",
  isAuthenticated,
  isAdmin,
  [
    body("title").optional().notEmpty().withMessage("Title cannot be empty"),
    body("description")
      .optional()
      .notEmpty()
      .withMessage("Description cannot be empty"),
    body("price").optional().isNumeric().withMessage("Price must be a number"),
    body("duration")
      .optional()
      .isNumeric()
      .withMessage("Duration must be a number"),
    body("category")
      .optional()
      .notEmpty()
      .withMessage("Category cannot be empty"),
    body("serviceType")
      .optional()
      .isIn([
        "remote-support",
        "on-site-support",
        "device-repair",
        "device-pickup",
        "consultation",
      ])
      .withMessage("Invalid service type"),
    body("isActive")
      .optional()
      .isBoolean()
      .withMessage("isActive must be a boolean"),
  ],
  validate,
  async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      // Remove userId and userRole from updates
      delete updates.userId;
      delete updates.userRole;

      const service = await Service.findByIdAndUpdate(
        id,
        { $set: updates },
        { new: true }
      );

      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }

      res.json({
        success: true,
        message: "Service updated successfully",
        service,
      });
    } catch (error) {
      console.error("Error updating service:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Delete a service (admin only)
router.delete("/:id", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
