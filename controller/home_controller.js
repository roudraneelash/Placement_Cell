const Interview = require("../model/interview");
const Student = require("../model/student");
const json2csv = require("json2csv").parse;
const fs = require("fs");
const path = require("path");

module.exports.home = (req, res) => {
  return res.redirect("/students");
};

module.exports.report = async (req, res) => {
  try {
    const students = await Student.find({});
    const interviews = await Interview.find({}).populate("enrolledStudents");

    const reportData = [];

    students.forEach((student) => {
      let studentDetails = {
        Name: student.studentName,
        Email: student.studentEmail,
        College: student.studentCollege,
        placementStatus: student.placementStatus,
        batchInput: student.batchInput,
        dsaScore: student.dsaScore,
        webdevScore: student.webdevScore,
        reactScore: student.reactScore,
      };

      let results = [];
      interviews.forEach((interview) => {
        interview.enrolledStudents.forEach((enrolledStudent) => {
          if (enrolledStudent.student == student.id) {
            const interviewResult = {
              companyName: interview.companyName,
              result: enrolledStudent.result,
            };
            results.push(interviewResult);
          }
        });
      });

      if (results.length > 0) {
        let interviewInfo = {};
        results.forEach((result, index) => {
          interviewInfo[`companyName-${index}`] = result.companyName;
          interviewInfo[`result-${index}`] = result.result;
        });
        studentDetails = { ...studentDetails, ...interviewInfo };
      }

      results = [];
      reportData.push(studentDetails);
    });

    const csv = json2csv(reportData);

    fs.writeFileSync("data.csv", csv, (err) => {
      if (err) console.log(err);
      else {
        console.log("CSV file is saved");
      }
    });

    // Set the file path
    const filePath = path.join(__dirname, "../data.csv");

    // Download the CSV file
    res.download(filePath, "report.csv");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error generating report",
      error: err.message,
    });
  }
};
