const express = require("express");
const router = express.Router();
const home_Controller = require("../controller/home_controller");
const user_Controller = require("../controller/user_controller");
const passport = require("passport");

router.get("/", passport.checkAuthentication, home_Controller.home);

router.use("/user", require("./user_route"));

module.exports = router;
