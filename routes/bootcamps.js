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

router.route("/:id/photo").put(bootcampPhotoUpload);

router.route("/").get(getBootcamps).post(createBootcamps);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamps)
  .delete(deleteBootcamps);

module.exports = router;
