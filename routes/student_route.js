const express = require("express");
const router = express.Router();
const student_Controller = require("../controller/student_controller");
const passport = require("passport");

router.get("/", passport.checkAuthentication, student_Controller.home);
router.get(
  "/add-student",
  passport.checkAuthentication,
  student_Controller.addNew
);
router.get("/:id", passport.checkAuthentication, student_Controller.profile);
router.get("/edit/:id", passport.checkAuthentication, student_Controller.edit);
router.get(
  "/delete/:id",
  passport.checkAuthentication,
  student_Controller.delete
);

router.post("/create", passport.checkAuthentication, student_Controller.create);
router.post(
  "/update/:id",
  passport.checkAuthentication,
  student_Controller.update
);

module.exports = router;
