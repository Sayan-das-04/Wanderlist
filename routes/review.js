const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync");
const { validateReviews, isLoggedIn, isAuthor } = require("../middlewares");
const reviewController = require("../controllers/reviews");

// CREATE REVIEW
router.post(
  "/",
  isLoggedIn,
  validateReviews,
  wrapAsync(reviewController.createReviews),
);

// DELETE REVIEW
router.delete(
  "/:reviewId",
  isLoggedIn,
  isAuthor,
  wrapAsync(reviewController.destroyReviews),
);

module.exports = router;
