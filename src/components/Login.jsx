import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/webbucks/",
        {
          email: email,
          password: password,
        }
      );

      // Assuming the token is in the Authorization header
      const token = response.headers["authorization"];
      sessionStorage.setItem("jwt", token);
      alert("Login successful");
      navigate("/");
      // Redirect or do something after login
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Login</h2>
        <div className="formGroup">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="formGroup">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="button">
          Login
        </button>

        <Link to="/signUp" className="button">
          회원가입
        </Link>
      </form>
    </div>
  );
};

export default Login;
