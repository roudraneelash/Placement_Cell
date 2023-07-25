const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://placementcell123:placementcell123@cluster0.hflgxaj.mongodb.net/"
);

const db = mongoose.connection;

db.on("error", () => console.log("error!")); // If there's an error connecting to the database, log an error message

db.once("open", (err) => {
  if (err) console.log(err);

  console.log("successfully connected to the db");
});
