const Interview = require("../model/interview");
const Student = require("../model/student");

const createCsvWriter = require("csv-writer").createObjectCsvWriter;

module.exports.home = (req, res) => {
  return res.redirect("/students");
};
module.exports.report = async (req, res) => {
  const csvWriter = createCsvWriter({
    path: "student_details.csv",
    header: [
      { id: "studentName", title: "Student Name" },
      { id: "studentEmail", title: "Student Email" },
      { id: "studentCollege", title: "Student College" },
      { id: "placementStatus", title: "Placement Status" },
      { id: "batchInput", title: "Batch" },
      { id: "dsaScore", title: "DSA Score" },
      { id: "webdevScore", title: "Web Development Score" },
      { id: "reactScore", title: "React Score" },
    ],
  });

  try {
    const students = await Student.find({});

    const records = students.map((student) => ({
      studentName: student.studentName,
      studentEmail: student.studentEmail,
      studentCollege: student.studentCollege,
      placementStatus: student.placementStatus,
      batchInput: student.batchInput,
      dsaScore: student.dsaScore,
      webdevScore: student.webdevScore,
      reactScore: student.reactScore,
    }));

    await csvWriter.writeRecords(records);

    res.download("student_details.csv");
  } catch (error) {
    console.log("Error generating CSV file:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Assuming the 'csvWriter' variable is already defined with appropriate configuration
