const express = require("express");
const router = express.Router();
const interview_Controller = require("../controller/interview_controller");
const passport = require("passport");

//home router
router.get("/", passport.checkAuthentication, interview_Controller.home);

//schedule new interview
router.get("/addNew", passport.checkAuthentication, (req, res) => {
  return res.render("interview_addNew");
});

//get detail page
router.get(
  "/:id",
  passport.checkAuthentication,
  interview_Controller.detailPage
);

//enroll student in the interview
router.post(
  "/enroll/:id",
  passport.checkAuthentication,
  interview_Controller.enroll
);

//delete interview
router.get(
  "/delete/:id",
  passport.checkAuthentication,
  interview_Controller.delete
);

//receive interview details
router.post(
  "/create",
  passport.checkAuthentication,
  interview_Controller.create
);
//recive updated result
router.post(
  "/updateResult/:interviewId/:studentId",
  interview_Controller.updateResult
);

module.exports = router;
