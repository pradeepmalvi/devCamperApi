const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// Load env variables
dotenv.config({ path: "./config/config.env" });

// Load model
const Bootcamp = require("./modals/Bootcamp");
const Course = require("./modals/Course");
const User = require("./modals/User");
const Review = require("./modals/Review");

// connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// Read JSON file
const bootcamp = JSON.parse(
  fs.readFileSync(`${__dirname}/data/bootcamps.json`, "utf-8")
);
const course = JSON.parse(
  fs.readFileSync(`${__dirname}/data/courses.json`, "utf-8")
);
const user = JSON.parse(
  fs.readFileSync(`${__dirname}/data/users.json`, "utf-8")
);
const review = JSON.parse(
  fs.readFileSync(`${__dirname}/data/reviews.json`, "utf-8")
);
// import into DB
const importData = async () => {
  try {
    await Bootcamp.create(bootcamp);
    await Course.create(course);
    await User.create(user);
    await Review.create(review);

    console.log("Data Imported...".green.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();

    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
