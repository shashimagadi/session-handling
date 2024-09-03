const express = require("express");
const emp_router = express.Router();

const db = require("./db_conn");

emp_router.get("/getEmp", (req, res) => {
  const sql = `SELECT * FROM  signup.employee_details`;

  db.query(sql, (err, result) => {
    if (err) {
      console.log("err in ", err);
    } else {
      res.status(200).json({ message: "success", result: result });
    }
  });
});

module.exports = emp_router;
