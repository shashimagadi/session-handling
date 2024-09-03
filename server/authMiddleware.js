const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  console.log("tokennn", token);
  if (!token) {
    console.log("you are not authenticated");
    return res.json({ Error: "you are not authenticated" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) {
        console.log("Token is not okay");
        return res.json({ Error: "Token is not okay" });
      } else {
        console.log("req name", req.name);
        req.name = decoded.name;
        next();
      }
    });
  }
};

module.exports = verifyUser;
