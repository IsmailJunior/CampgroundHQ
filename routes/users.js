/** @format */
const express = require("express");
const router = express.Router();
const passport = require("passport");
const usersController = require( '../controllers/users' );


router.route( "/sign-up" )
	.get( usersController.renderSignUpForm )
	.post(usersController.signUpUser);

router.route("/login")
  .get(usersController.renderLoginForm)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    usersController.loginUser
  );

router.get( '/logout', usersController.logoutUser);

module.exports = router; 

