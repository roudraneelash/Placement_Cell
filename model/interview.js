const mongoose = require("mongoose");

const interviewSchema = mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  enrolledStudents: [
    {
      student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
      result: {
        type: String,
        enum: ["pass", "fail", "onhold", "didntAttempt"],
        default: "onhold",
      },
    },
  ],
});

const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;
