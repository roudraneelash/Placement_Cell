const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/placement-cell");

const db = mongoose.connection;

db.on("error", () => console.log("error!")); // If there's an error connecting to the database, log an error message

db.once("open", (err) => {
  if (err) console.log(err);

  console.log("successfully connected to the db");
});
