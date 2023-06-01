const express = require("express");
const router = express.Router();
const home_Controller = require("../controller/home_controller");

const passport = require("passport");

router.get("/", passport.checkAuthentication, home_Controller.home);
router.get("/report", passport.checkAuthentication, home_Controller.report);

router.use("/user", require("./user_route"));

router.use("/students", require("./student_route"));

router.use("/interviews", require("./interview_route"));

module.exports = router;
