const express = require( 'express' );
const router = express.Router();
const { isLoggedIn, isAuthor } = require( '../middleware/middleware' );
const campgroundsController = require( '../controllers/campgrounds' );
const multer = require( 'multer' );
const { storage } = require("../config/cloudinary");
const upload = multer( {storage } );



//Routes 🚦
router.route( "/" )
	.get(campgroundsController.index )
	.post( isLoggedIn, upload.array('image'),campgroundsController.createNewCampground );

router.get( "/new", isLoggedIn, campgroundsController.renderNewForm );

router.route("/:id")
  .get(campgroundsController.showCampground)
  .put(isLoggedIn, isAuthor, upload.array('image'),campgroundsController.updateCampground)
  .delete(isLoggedIn, isAuthor, campgroundsController.deleteCampground);


//Show New Campground Page Route

//Show Update Page Route
router.get( '/:id/update', isLoggedIn ,isAuthor, campgroundsController.renderUpdateForm);


module.exports = router; 
