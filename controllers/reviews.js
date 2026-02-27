const Review = require("../models/review");
const Listing = require("../models/listing");

module.exports.createReviews = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  const review = new Review(req.body.review);
  review.author = req.user._id;

  listing.reviews.push(review);

  await review.save();
  await listing.save();

  req.flash("success", "New Review Created!!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyReviews = async (req, res) => {
  const { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });

  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review Deleted!!");
  res.redirect(`/listings/${id}`);
};
