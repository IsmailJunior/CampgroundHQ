const express = require( 'express' );
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const {
  isLoggedIn,
  isAuthor,
  validateCampground,
} = require("../middleware/middleware");
const campgroundsController = require("../controllers/campgrounds");
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const { validate } = require("../models/user");
const upload = multer({ storage });

//Routes 🚦
router
  .route("/")
  .get(catchAsync(campgroundsController.index))
  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    catchAsync(campgroundsController.createNewCampground)
  );

router.get("/new", isLoggedIn, campgroundsController.renderNewForm);
router.get("/map", campgroundsController.map);
router
  .route("/:id")
  .get(catchAsync(campgroundsController.showCampground))
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    validateCampground,
    catchAsync(campgroundsController.updateCampground)
  )
  .delete(
    isLoggedIn,
    isAuthor,
    catchAsync(campgroundsController.deleteCampground)
  );
//Show New Campground Page Route

//Show Update Page Route
router.get(
  "/:id/update",
  isLoggedIn,
  isAuthor,
  catchAsync(campgroundsController.renderUpdateForm)
);



module.exports = router; 
