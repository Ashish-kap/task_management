require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const authRoutes = require("./routes/auth.js");
const taskRoutes = require("./routes/task.js");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(helmet());
app.use(express.json());


app.get("/", (req, res) => {
  res.status(200).json({message:"server is running"});
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);



// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error Handler
app.use(errorHandler);


module.exports = app;

