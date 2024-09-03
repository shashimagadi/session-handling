import React, { useState } from "react";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import axios from "axios"; // Import Axios
import { Link, useNavigate } from "react-router-dom";

import "./LoginSign.css";

const LoginSignup = () => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });


  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    const postValues = await axios.post(
      "http://localhost:3000/signIn",
      formData
    );

    if (postValues.data.message === "success") {
      alert("data inset scuccefully");
    } else {
      alert("eroe");
    }

    // You can add your submission logic here, such as making an API call
  };

  const navgiateToLogin = () => {
    navigate("/login");
  };
  return (
    <div className="container">
      <div className="header">
        <div className="text">sign up</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={user_icon} alt="" />
          <input
            type="text"
            placeholder="Name"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
        </div>

        <div className="input">
          <img src={email_icon} alt="" />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className=" forgot-password">
        <p>
          <Link to="/login" onClick={() => navigate("/")}>
            Login
          </Link>
        </p>
      </div>
      <div className="submit-container">
        <div className="submit" onClick={handleSubmit}>
          sign up
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
