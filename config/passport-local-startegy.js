const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../model/user");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });

        if (!user || user.password != password) {
          //"Invalid Username/Password"
          //
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serializing the user to decide which key is to be kept in the cookie
passport.serializeUser((user, done) => {
  // Storing the user's id field in the cookie
  done(null, user.id);
});

// Deserializing the user from the key in the cookies
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (user) {
      // Returning the deserialized user
      return done(null, user);
    }
  } catch (err) {
    console.log(err);
  }
});

//check if the user is authenticated
passport.checkAuthentication = (req, res, next) => {
  //if the user is signed in, then pass on the req to the next function(controller's action)
  //passport put a method authenticated in the request
  if (req.isAuthenticated()) {
    return next();
  }

  //if user not logged in
  return res.redirect("/user/login");
};

passport.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    //req.user contains the current signed in user from session cookie and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
