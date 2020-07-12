const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const colors = require("colors");
const fileupload = require("express-fileupload");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongoSanitize= require('express-mongo-sanitize')
const helmet = require('helmet')

// Route
const bootcamps = require("./routes/bootcamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const users = require("./routes/users");
const reviews = require("./routes/reviews");

// Load env file
dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

// body parser
app.use(express.json());

// cookie parser
app.use(cookieParser());

// File upload
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize)

// Set security header
// app.use(helmet)

// Set static folder for images
app.use(express.static(path.join(__dirname, "public")));

// Mount router
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log("Server Running".yellow.bold));

process.on("unhandledRejection", (err, promise) => {
  console.log(err);
  // CLOSE SERVER AND EXIT PROCESS
  server.close(() => process.exit(1));
});
