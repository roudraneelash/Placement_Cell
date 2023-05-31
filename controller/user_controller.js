const User = require("../model/user");

module.exports.login = (req, res) => {
  console.log(req.body);
  return res.render("user_login");
};
module.exports.signUp = (req, res) => {
  return res.render("user_signUp");
};
module.exports.profile = (req, res) => {
  return res.render("user_profile");
};

module.exports.create = async (req, res) => {
  try {
    //check if the  password entered and confirm password is matching
    if (req.body.password != req.body.confirm_password) {
      // req.flash("error", "Passwords do not match");
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
          console.log("user created successfully");
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
module.exports.createSession = (req, res) => {
  // console.log(req.body);
  // res.cookie("user_id", req.body.email);
  return res.redirect("/");
};
module.exports.destroySession = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/user/login");
  });
};
