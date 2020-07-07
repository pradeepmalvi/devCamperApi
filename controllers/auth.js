const User = require("../modals/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

// @dec     Register User
// @route   GET /api/v2/bootcamps
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "Register successfully",
  });
});
