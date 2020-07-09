const express = require("express");
const router = express.Router();
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses");

const { protect, authorize } = require("../middleware/auth");

const advancedResults = require("../middleware/advancedResults");
const Course = require("../modals/Course");

router
  .route("/")
  .get(advancedResults(Course, "bootcamp"), getCourses)
  .post(protect, authorize("publisher", "admin"), createCourse);
router
  .route("/:id")
  .get(getCourse)
  .put(protect, authorize("publisher", "admin"), updateCourse)
  .delete(protect, authorize("publisher", "admin"), deleteCourse);

module.exports = router;
