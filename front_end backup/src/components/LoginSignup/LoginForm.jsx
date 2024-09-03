import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCheck } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios"; // Import Axios
import "./Login.css";

const LoginForm = () => {
  const [formDataLogin, setFormDataLogin] = useState({
    userName: "",

    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataLogin({
      ...formDataLogin,
      [name]: value,
    });
  };

  axios.defaults.withCredentials = true;
  const submitLogin = async (e) => {
    e.preventDefault();

    const postValues = await axios.post(
      "http://localhost:3000/login",
      formDataLogin
    );
    console.log("postt va", postValues.data.jwtToken);
    if (postValues.data.message === "yes") {
      localStorage.setItem("authToken", postValues.data.jwtToken);
      setTimeout(() => {
        localStorage.removeItem("authToken");
        alert("Session expired. Please log in again.");
        navigate("/login"); // Redirect to login page after token is removed
      }, 600000);
      navigate("/home");
    } else {
      alert("eroe");
    }
  };
  return (
    <div className="wrapper">
      <form action="">
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="UserName"
            required
            name="userName"
            value={formDataLogin.userName}
            onChange={handleChange}
          />
          <FaUserCheck className="icon" />
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            required
            name="password"
            value={formDataLogin.password}
            onChange={handleChange}
          />
          <RiLockPasswordFill className="icon" />
        </div>

        <div>
          <Button className="submitbtn" type="submit" onClick={submitLogin}>
            Submit
          </Button>
        </div>
        <div className="register-link">
          <p>
            Dont have a account?{" "}
            <Link to="/" onClick={() => navigate("/")}>
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
