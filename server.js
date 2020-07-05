const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const colors = require("colors");
const fileupload = require("express-fileupload");
const path = require("path");

// Route
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");

// Load env file
dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

// body parser
app.use(express.json());

// File upload
app.use(fileupload());

// Set static folder for images
app.use(express.static(path.join(__dirname, "public")));

// Mount router
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log("Server Running".yellow.bold));

process.on("unhandledRejection", (err, promise) => {
  console.log(err);
  // CLOSE SERVER AND EXIT PROCESS
  server.close(() => process.exit(1));
});
