const express = require("express");
const router = express.Router();
const user_Controller = require("../controller/user_controller");
const passport = require("passport");

router.get("/login", user_Controller.login);
router.get("/signup", user_Controller.signUp);
router.get("/profile", passport.checkAuthentication, user_Controller.profile);
router.get("/logout", user_Controller.destroySession);

router.post("/create", user_Controller.create);
router.post(
  "/create-session",
  passport.authenticate("local", {
    failureRedirect: "/user/signup",
  }),
  user_Controller.createSession
);

module.exports = router;
