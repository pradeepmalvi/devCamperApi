const Course = require("../modals/Course");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @dec     get all courses
// @route   GET /api/v2/courses
// @route   GET /api/v2/bootcamps/:bootcampId/courses
// @access  Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  // let query;
  // if (req.params.bootcampId) {
  //   query = Course.find({ bootcamp: req.params.bootcampId });
  // } else {
  //   query = Course.find().populate("bootcamp");
  // }

  // const courses = await query;

  res.status(200).json(res.advancedResults);
});

// @dec     get single courses
// @route   GET /api/v2/courses/:id
// @access  Private
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate("bootcamp");

  if (!course) {
    return next(
      new ErrorResponse(`course not found with ${req.params.id}`),
      400
    );
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @dec     Add course
// @route   GET /api/v2/course
// @access  Private
exports.createCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.create(req.body);

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @dec     Update course
// @route   GET /api/v2/course
// @access  Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!course) {
    return next(
      new ErrorResponse(`course not found with ${req.params.id}`),
      400
    );
  }

  res.status(200).json({
    success: true,
    data: course,
  });
});

// @dec     delete course
// @route   GET /api/v2/course
// @access  Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`course not found with ${req.params.id}`),
      400
    );
  }
  course.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
