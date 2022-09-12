
const Campground = require( "../models/campground" );
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const { cloudinary } = require("../config/cloudinary");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const moment = require("moment");

module.exports.index = async (req, res) => {
  const campgrounds = await Campground.find({})
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("author");
  res.render("campgrounds/index", { campgrounds });
};

// module.exports.showMap = (req, res) => {
//   res.render("campgrounds/showMap");
// };

module.exports.renderNewForm = (req, res) => {
  res.render("campgrounds/new");
};

module.exports.createNewCampground = async (req, res) => {
  const geoData = await geocoder
    .forwardGeocode({
      query: req.body.campground.location,
      limit: 1,
    })
    .send();
  
  const campground = new Campground(req.body.campground);
  campground.date = Date();
  campground.geometry = geoData.body.features[0].geometry;
  campground.images = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  campground.author = req.user._id;
  await campground.save();
  console.log(campground);
  req.flash("success", "Successfully made a new campgground!");
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.renderUpdateForm = async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render("campgrounds/update", { campground });
};

module.exports.updateCampground = async (req, res) => {
  const { id } = req.params;
  const geoData = await geocoder
    .forwardGeocode({
      query: req.body.campground.location,
      limit: 1,
    })
    .send();
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  campground.geometry = geoData.body.features[0].geometry;
  const imgs = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  campground.images.push(...imgs);
  await campground.save();
  if (req.body.deleteImages) {
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await campground.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
    console.log(campground);
  }
  req.flash("success", "Successfully updated campgground!");
  res.redirect(`/campgrounds/${campground._id}`);
};
module.exports.map = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/map", { campgrounds });
};

module.exports.showCampground = async (req, res) => {
  const campground = await Campground.findById(req.params.id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("author");

  if (!campground) {
    req.flash("error", "Cannot find that campground!");
    return res.redirect("/campgrounds");
  }
  res.render("campgrounds/show", { campground });
};



module.exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted campgground!");
  res.redirect("/campgrounds");
};
