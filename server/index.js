require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Import routes (we'll create these later)
const authRoutes = require("./routes/auth");
const ticketRoutes = require("./routes/tickets");

// Import the new route files
const serviceRoutes = require("./routes/services");
const bookingRoutes = require("./routes/bookings");
const userRoutes = require("./routes/users");

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Normalize CLIENT_URL to remove trailing slash if present
const clientUrl = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.replace(/\/$/, "")
  : "";
const allowedOrigins = [clientUrl, "http://localhost:5173"];

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl requests)
      if (!origin) return callback(null, true);

      // Check if the origin is allowed
      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        process.env.NODE_ENV !== "production"
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(helmet());
app.use(morgan("dev"));

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

// Root route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Routes - API prefix
app.use("/api/auth", authRoutes);
app.use("/api/support-tickets", ticketRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);

// Routes - No API prefix (for compatibility with client)
app.use("/auth", authRoutes);
app.use("/support-tickets", ticketRoutes);
app.use("/services", serviceRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    // Start server after successful database connection
    if (process.env.NODE_ENV !== "production") {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    }
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    if (process.env.NODE_ENV !== "production") {
      process.exit(1);
    }
  });

// Export the Express app for serverless deployment
module.exports = app;
