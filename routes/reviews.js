const express = require("express");
const router = express.Router();
const {
  getReviews,
  createReview,
  getReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviews");

const { protect, authorize } = require("../middleware/auth");

const advancedResults = require("../middleware/advancedResults");
const Review = require("../modals/Review");

router
  .route("/")
  .get(advancedResults(Review, "bootcamp"), getReviews)
  .post(createReview);
router.route("/:id").get(getReview).put(updateReview).delete(deleteReview);

module.exports = router;
