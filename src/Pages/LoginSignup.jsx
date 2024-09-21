import React, { useState } from "react";
import "../CSS/LoginSignup.css";
import { useNavigate } from "react-router-dom";

const LoginSignup = ({ setIsLoggedIn }) => {
  const [loginState, setLogin] = useState("Login");
  const navigate = useNavigate();
  const [btn, setBtn] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleLogin = () => {
    setLogin((prev) => {
      if (prev === "Sign Up") {
        navigate("/login");
        return "Login";
      } else {
        navigate("/register");
        return "Sign Up";
      }
    });
    handleBtnLogin();
  };
  const handleBtnLogin = () => {
    if (loginState === "Login") {
      setBtn("Register");
    } else {
      setBtn("Login");
    }
  };

  const submitForm = async (e) => {
    console.log(formData);
    setBtn(loginState);
    if (btn === "Sign Up") {
      const res = await fetch("http://127.0.0.1:8000/api/v1/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const payload = await res.json();
      if (payload.status_code === 201) {
        alert("User Registered successfully.");
        navigate("/login");
        setLogin("Login");
      } else if (payload.status_code === 409) {
        alert(payload.error);
      } else if (payload.status_code === 400) {
        const password = payload.errors.password;
        const username = payload.errors.username;
        const email = payload.errors.email;
        let errors = [];
        if (password) {
          errors = [...errors, "\n", ...password];
        }
        if (username) {
          errors = [...errors, "\n", ...username];
        }
        if (email) {
          errors = [...errors, "\n", ...email];
        }
        alert(errors);
      }
    } else {
      const { email, password } = formData;
      const url = "http://127.0.0.1:8000/api/v1/login";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const payload = await res.json();
      if (payload.status_code === 200) {
        localStorage.setItem("token", payload.token);
        setIsLoggedIn(true);
        console.log(payload);
        alert(payload.message);
        if (payload.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        alert(payload.message);
      }
    }
  };

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{loginState}</h1>
        <div className="loginsignup-fields">
          {loginState === "Sign Up" && (
            <input
              type="text"
              placeholder="Your name"
              name="username"
              value={formData.username}
              onChange={handleFormChange}
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleFormChange}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleFormChange}
          />
        </div>
        <button onClick={submitForm}>{loginState}</button>
        <p className="loginsignup-login">
          {loginState === "Sign Up" ? (
            <>
              {/* {navigate("/register")} */}
              Already have an Account?
              <span onClick={handleLogin}>Login here.</span>
            </>
          ) : (
            <>
              Dont't Have an Account?
              <span onClick={handleLogin}> Sign Up</span>
            </>
          )}
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By Continuing, i agree to the terms of use and privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
