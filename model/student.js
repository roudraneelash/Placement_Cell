const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    studentEmail: {
      type: String,
      required: true,
      unique: true,
    },
    studentCollege: {
      type: String,
      required: true,
    },
    placementStatus: {
      type: String,
      required: true,
    },
    batchInput: {
      type: String,
      required: true,
    },
    dsaScore: {
      type: String,
      required: true,
    },
    webdevScore: {
      type: String,
      required: true,
    },
    reactScore: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
