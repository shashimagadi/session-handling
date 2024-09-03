const express = require("express");

const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const db = require("../server/db_conn"); //
const { route } = require("./routes.js");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
// app.use(
//   session({
//     secret: "secret",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: false,
//       // maxAge: 1000 * 60 * 24,
//       maxAge: 1000 * 60,
//     },
//   })
// );
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }, // Example: 1 minute session
  })
);

app.listen(3000, () => {
  console.log("conncted to server");
});

const verifyUser = require("../server/authMiddleware.js");
app.get("/cookie", verifyUser, (req, res) => {
  console.log("req verify", req.name);
  return res.json({ Status: "Success", name: req.name });
});
const authRoutes = require("../server/routes.js");
app.use("/", authRoutes);

const emp = require("../server/emp_route.js");
app.use("/emp", emp, verifyUser);

// Logout route
app.post("/logout", (req, res) => {
  // Destroy the session if using session-based authentication
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to log out" });
    }
    res.clearCookie("connect.sid"); // Clear the session cookie
    return res.json({ message: "Logged out successfully" });
  });
});
