// Add this line to your server.js file if it's not already there
app.use("/api/support-tickets", require("./routes/supportTickets"));

// Make sure this line exists in your server.js
app.use("/api/tickets", require("./routes/tickets"));
