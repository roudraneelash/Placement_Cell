const Student = require("../model/student");

module.exports.home = async (req, res) => {
  try {
    const students = await Student.find({});
    return res.render("student", {
      students: students,
    });
  } catch (err) {
    console.log("an error occured in fetching students", err);
  }
};
module.exports.addNew = (req, res) => {
  return res.render("student_addNew");
};
module.exports.profile = async (req, res) => {
  // console.log(req.params.id);
  try {
    const student = await Student.findById(req.params.id);
    return res.render("student_profile", {
      student: student,
    });
  } catch (err) {
    console.log("error in fetching student");
  }
};
module.exports.create = async (req, res) => {
  try {
    const { studentEmail } = req.body;

    const existingStudent = await Student.findOne({ studentEmail });
    if (existingStudent) {
      console.log("Student already exists with the same email");
    } else {
      const newStudent = await Student.create(req.body);
      if (newStudent) {
        console.log("Student created");
      }
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the student" });
  }

  return res.redirect("/students");
};
module.exports.edit = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    return res.render("student_edit", {
      student: student,
    });
  } catch (err) {
    console.log("error in finding student");
  }
};

module.exports.delete = async (req, res) => {
  try {
    // Perform the deletion operation in the database using the provided studentId
    const deleteStudent = await Student.findByIdAndDelete(req.params.id);
    if (deleteStudent) {
      console.log("successfully deleted");
    }
    return res.redirect("/students");
  } catch (err) {
    console.log("error in deleting student");
  }
  return res.redirect("/");
};

// Assuming you have a route set up to handle the form submission
module.exports.update = async (req, res) => {
  try {
    const studentId = req.params.id;
    const updatedStudent = req.body;
    console.log(updatedStudent);
    // Update the student in the database using the provided studentId
    const result = await Student.findByIdAndUpdate(studentId, updatedStudent, {
      new: true,
    });

    if (result) {
      console.log("Student updated:", result);
      res.redirect("/students"); // Redirect to the student list page after successful update
    } else {
      console.log("Student not found");
      res.redirect("/students"); // Redirect to the student list page if the student is not found
    }
  } catch (err) {
    console.error("Error updating student:", err);
    res.redirect("/students"); // Redirect to the student list page in case of an error
  }
};
