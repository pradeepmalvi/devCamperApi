const Review = require("../modals/Review");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @dec     get all reviews
// @route   GET /api/v1/reviews
// @route   GET /api/v1/bootcamps/:bootcampId/courses
// @access  Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  // let query;
  // if (req.params.bootcampId) {
  //   query = Course.find({ bootcamp: req.params.bootcampId });
  // } else {
  //   query = Course.find().populate("bootcamp");
  // }

  // const courses = await query;

  res.status(200).json(res.advancedResults);
});

// @dec     Create Review
// @route   POST /api/v1/reviews
// @access  Private/Admin
exports.createReview = asyncHandler(async (req, res, next) => {
    const review = await Review.create(req.body);
  
    res.status(201).json({ success: true, data: review });
  });
  
  // @dec     Get single Review
  // @route   GET /api/v1/reviews/:id
  // @access  Private/Admin
  exports.getReview = asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id);
  
    res.status(200).json({ success: true, data: review });
  });
  
  // @dec     Update Review
  // @route   PUT /api/v1/reviews/:id
  // @access  Private/Admin
  exports.updateReview = asyncHandler(async (req, res, next) => {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  
    res.status(200).json({ success: true, data: review });
  });
  
  // @dec     Delete Review
  // @route   DELETE /api/v1/review/:id
  // @access  Private/Admin
  exports.deleteReview = asyncHandler(async (req, res, next) => {
    await Review.findByIdAndDelete(req.params.id);
  
    res.status(200).json({ success: true, data: {} });
  });
  