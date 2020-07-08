const express = require("express");
const router = express.Router();
const {
  getBootcamps,
  getBootcamp,
  createBootcamps,
  updateBootcamps,
  deleteBootcamps,
  bootcampPhotoUpload,
} = require("../controllers/bootcamps");

const advancedResults = require("../middleware/advancedResults");
const Bootcamp = require("../modals/Bootcamp");

const { protect } = require("../middleware/auth");

router.route("/:id/photo").put(protect, bootcampPhotoUpload);

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, createBootcamps);

router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, updateBootcamps)
  .delete(protect, deleteBootcamps);

module.exports = router;
