const connectDB = require("./config/mongoose");
const dotenv = require("dotenv");
const express = require("express");
const port = 8080;
const path = require("path");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-startegy");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const customMware = require("./config/middleware");
//required for flash messages
dotenv.config();
connectDB();

app.use(express.urlencoded());
app.use(cookieParser());

//set up the view engine
app.set("view engine", "ejs");
app.set("views", "./view");
//to render static files
app.use(express.static("./assets"));
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//setup the session cookie
//setting up the store
app.use(
  session({
    name: "placement-cell",
    //todo change the secret before deployment in prod
    secret: "blahsomething",
    saveUninitialized: false,
    resave: false,
    cookie: {
      //in milli sec (10min )
      maxAge: 1000 * 60 * 10,
    },
    store: new MongoStore(
      {
        mongoUrl: process.env.MONGO_URI,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

//setting up passport auth
app.use(passport.initialize());
app.use(passport.session());

//set the authenticated user in locals
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use("/", require("./routes"));
app.listen(port, () => {
  console.log("server is up and running on port", port);
});
