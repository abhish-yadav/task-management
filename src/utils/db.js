const mongoose = require("mongoose");
const db = mongoose.connection;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { dbName: process.env.MONGO_DB })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

db.on("open", () => console.log("Database connection is open to use"));

db.on("disconnected", () => console.log("Database connection is disconnected"));
