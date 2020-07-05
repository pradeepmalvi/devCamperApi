const path = require("path");
const Bootcamp = require("../modals/Bootcamp");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const { query } = require("express");
const { startSession } = require("mongoose");

// @dec     get all bootcamps
// @route   GET /api/v2/bootcamps
// @access  Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @dec     get one bootcamp
// @route   GET /api/v2/bootcamps
// @access  Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`bootcamp not found with ${req.params.id}`),
      400
    );
  }

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

// @dec     Add bootcamp
// @route   GET /api/v2/bootcamps
// @access  Public
exports.createBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

// @dec     Update bootcamp
// @route   GET /api/v2/bootcamps
// @access  Public
exports.updateBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamp) {
    return next(
      new ErrorResponse(`bootcamp not found with ${req.params.id}`),
      400
    );
  }

  res.status(200).json({
    success: true,
    data: bootcamp,
  });
});

// @dec     delete bootcamps
// @route   GET /api/v2/bootcamps
// @access  Public
exports.deleteBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`bootcamp not found with ${req.params.id}`),
      400
    );
  }
  bootcamp.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @dec     Upload photo for bootcamp
// @route   PUT /api/v2/bootcamps/:id/photo
// @access  Public
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`bootcamp not found with ${req.params.id}`, 400)
    );
  }
  console.log(req.files);

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file `, 400));
  }

  const file = req.files.file;

  // Make sure the file is photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an Image file `, 400));
  }

  // Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom filename
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.log(err);
      return next(`Problem with file upload`, 500);
    }
    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });

  console.log(file.name);
});
