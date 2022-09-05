/** @format */
const Campground = require("../models/campground");
const Review = require( "../models/review" );

module.exports.isLoggedIn = ( req, res, next ) =>
{
  console.log( req.user );
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be signed in!");
    return res.redirect("/login");
  }
  next();
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id).populate("author");
  if (!campground.author.equals(req.user._id)) {
    req.flash("error", "You do not have premission to do that!");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id,reviewId } = req.params;
  const review = await Review.findById(reviewId).populate("author");
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You do not have premission to do that!");
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};