const Bootcamp = require("../modals/Bootcamp");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const { query } = require("express");
const { startSession } = require("mongoose");

// @dec     get all bootcamps
// @route   GET /api/v2/bootcamps
// @access  Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  // Copy req.query
  let reqQuery = { ...req.query };

  // Field to exclude
  const removeFields = ["select", "sort", "page", "limit"];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operator
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  // Finding resource
  query = Bootcamp.find(JSON.parse(queryStr)).populate("courses");

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.select(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 100;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await Bootcamp.countDocuments();

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const bootcamps = await query;

  // Pagination Result
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    pagination,
    data: bootcamps,
  });
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

// @dec     Upload photo for bootcamps
// @route   PUT /api/v2/bootcamps/:id/photo
// @access  Public
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`bootcamp not found with ${req.params.id}`),
      400
    );
  }

  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file `, 400));
  }

  const file = req.files.file;

  // Make sure the file is photo
  if (!file.mimetype.startWith("image")) {
    return next(new ErrorResponse(`Please upload an Image file `, 400));
  }
});
