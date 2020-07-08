const express = require("express");
const router = express.Router();
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses");

const { protect } = require("../middleware/auth");

const advancedResults = require("../middleware/advancedResults");
const Course = require("../modals/Course");

router
  .route("/")
  .get(advancedResults(Course, "bootcamp"), getCourses)
  .post(protect, createCourse);
router
  .route("/:id")
  .get(getCourse)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);

module.exports = router;
