/** @format */
const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn, isReviewAuthor } = require("../middleware/middleware");
const reviewController = require( '../controllers/reviews' );

router.post("/", isLoggedIn, reviewController.createReview);
router.delete("/:reviewId", isReviewAuthor, isLoggedIn, reviewController.deleteReview);

module.exports = router;
