/** @format */
const User = require( "../models/user" );

module.exports.renderSignUpForm = (req, res) => {
  res.render("users/sign-up");
}; 

module.exports.signUpUser = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const signedUser = await User.register(user, password);
    console.log(signedUser);
    req.login(signedUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to campground!!");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    req.flash("error", "A user is already exist!");
    console.log(e.message);
    res.redirect("sign-up");
  }
}; 

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login");
}; 

module.exports.loginUser = (req, res) => {
  req.flash("success", "Welcome back!");
  res.redirect("/campgrounds");
}; 

module.exports.logoutUser = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Goodbye!");
    res.redirect("/campgrounds");
  });
};
