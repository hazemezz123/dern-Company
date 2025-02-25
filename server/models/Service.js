const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number, // in minutes
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    serviceType: {
      type: String,
      enum: [
        "remote-support",
        "on-site-support",
        "device-repair",
        "device-pickup",
        "consultation",
      ],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Service", ServiceSchema);
