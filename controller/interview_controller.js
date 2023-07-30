const Interview = require("../model/interview");
const Student = require("../model/student");

module.exports.home = async (req, res) => {
  try {
    const interviews = await Interview.find({});
    return res.render("interview", {
      interviews: interviews,
    });
  } catch (err) {
    console.log(err);
  }
  return res.redirect("back");
};

module.exports.create = async (req, res) => {
  try {
    const newInterview = await Interview.create(req.body);
    if (newInterview) {
      req.flash("success", "interview created successfully");
    }
  } catch (err) {
    console.log(err);
  }

  return res.redirect("/interviews");
};
module.exports.detailPage = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id).populate(
      "enrolledStudents.student"
    );

    return res.render("interview_details", {
      interview: interview,
    });
  } catch (err) {
    console.log(err);
  }
  return res.render("interview_details");
};

module.exports.updateResult = async (req, res) => {
  try {
    const interviewId = req.params.interviewId;
    const studentId = req.params.studentId;
    const status = req.body.status;

    // Find the interview by ID
    const interview = await Interview.findById(interviewId);

    if (!interview) {
      req.flash("error", "Interview not found");
      return res.redirect("back");
    }

    // Find the enrolled student by ID
    const enrolledStudent = interview.enrolledStudents.find(
      (enrollment) => enrollment.student._id.toString() === studentId
    );

    if (!enrolledStudent) {
      req.flash("error", "Enrolled student not found");
      return res.redirect("back");
    }

    // Update the status of the enrolled student
    enrolledStudent.result = status;

    // Save the modified interview document
    await interview.save();

    // console.log("Enrolled student status updated");
    return res.redirect("back");
  } catch (err) {
    req.flash("error", "Error updating enrolled student status:");
    return res.redirect("back");
  }
};

module.exports.enroll = async (req, res) => {
  try {
    console.log(req.body.email);
    const interview = await Interview.findById(req.params.id);
    if (interview) {
      const student = await Student.findOne({
        studentEmail: req.body.email,
      });

      if (student) {
        // If student exists
        const newEnrolledStudent = {
          student: student.id,
        };

        // Add the new student to the enrolledStudents array
        interview.enrolledStudents.push(newEnrolledStudent);

        // Save the modified interview document
        await interview.save();
        return res.redirect("back");
      } else {
        req.flash("error", "No student found. Please enter a valid email id.");
      }
    } else {
      req.flash("error", "Interview not found.");
    }
  } catch (err) {
    req.flash("error", "Error in enrolling student:");
  }
  return res.redirect("back");
};

module.exports.delete = async (req, res) => {
  try {
    console.log("delete", req.params.id);
    await Interview.findByIdAndDelete(req.params.id);
  } catch (err) {
    console.log(err);
  }
  return res.redirect("back");
};
