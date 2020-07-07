const User = require("../modals/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const { create } = require("../modals/User");

// @dec     Register User
// @route   GET /api/v2/bootcamps
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  // Create token
  const token = user.getSignedJwtToken();

  res.status(200).json({
    success: true,
    token,
  });
});
