const User = require("../model/user");
//render login
module.exports.login = (req, res) => {
  return res.render("user_login");
};
//render signup
module.exports.signUp = (req, res) => {
  return res.render("user_signUp");
};
//render profile page
module.exports.profile = (req, res) => {
  return res.render("user_profile");
};
//create a new user
module.exports.create = async (req, res) => {
  try {
    //check if the  password entered and confirm password is matching
    if (req.body.password != req.body.confirm_password) {
      req.flash("error", "Passwords do not match");
      return res.redirect("back");
    }

    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) {
      //create user in the db

      if (req.body.password === req.body.confirm_password) {
        const newUser = await User.create({
          email: req.body.email,
          name: req.body.name,
          password: req.body.password,
        });

        if (newUser) {
          req.flash("success", "user created successfully");
          req.flash("success", "Please login");
          return res.redirect("/user/login");
        }
      }
    } else {
      console.log("user already exists");
      return res.redirect("/user/login");
    }
  } catch (err) {
    console.log(err);
  }

  return res.redirect("back");
};
// Log in and create a session for the user
module.exports.createSession = (req, res) => {
  req.flash("success", "Logged In Successfully");
  return res.redirect("/");
};
module.exports.destroySession = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged out Successfully");
    res.redirect("/user/login");
  });
};
