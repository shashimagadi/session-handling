const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db_conn"); // Adjust the path if needed

const router = express.Router();

router.post("/login", async (req, res) => {
  console.log("req body", req.body);
  const name = req.body.userName;
  const password = req.body.password;

  const fetch = `Select password,username from signup.users where username='${name}'`;

  db.query(fetch, async (err, result) => {
    if (err) {
      console.log("err to insert", err);
    } else {
      if (result.length > 0) {
        const encryptedPassword = result[0].password;
        // Compare the entered password with the encrypted password
        const passwordMatch = await bcrypt.compare(password, encryptedPassword);

        console.log("password ", passwordMatch, encryptedPassword);

        if (passwordMatch) {
          const name = result[0].username;
          const token = jwt.sign({ name }, "jwt-secret-key", {
            expiresIn: "1d",
          });
          console.log("tokennnnnnnnnn", token);

          res.cookie("token", token);
          res.status(200).json({ message: "yes", jwtToken: token });
        } else {
          res.status(200).json({ message: "no" });
        }
      } else {
        console.log("no password");
      }
    }
  });
});

router.post("/signIn", async (req, res) => {
  console.log("req body", req.body);
  const name = req.body.userName;
  const password = req.body.password;
  const email = req.body.email;
  const hashedPassword = await bcrypt.hash(password, 10);

  const sql1 = `Insert into signup.users(username,password,email) VALUES ('${name}','${hashedPassword}', '${email}')`;

  db.query(sql1, (err, result) => {
    if (err) {
      console.log("err to insert", err);
    } else {
      res.status(200).json({ message: "success" });
    }
  });
});

// router.get("/cookie", verifyUser, (req, res) => {
//   console.log("req verify", req.name);
//   return res.json({ Status: "Success", name: req.name });
// });
module.exports = router;
