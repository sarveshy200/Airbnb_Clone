const Listing = require("../models/listing");
const Review = require("../models/review");

// Create Review
module.exports.createReview = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  const newReview = new Review(req.body.review);
  newReview.author = req.user._id;

  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();

  req.flash("success", "New Review Created!");
  res.redirect(`/listings/${listing._id}`);
};

// Delete Review
module.exports.deleteReview = async (req, res) => {
  const { id, reviewsId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewsId } });
  await Review.findByIdAndDelete(reviewsId);

  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`);
};
