const express = require("express");
const router = express.Router();
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses");

const advancedResults = require("../middleware/advancedResults");
const Course = require("../modals/Course");

router
  .route("/")
  .get(advancedResults(Course, "bootcamp"), getCourses)
  .post(createCourse);
router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;
