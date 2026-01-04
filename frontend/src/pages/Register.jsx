import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await API.post("/api/auth/register", {
        username,
        email,
        password
      });

      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert("User already exists or invalid data");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Register</h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Register</button>

      <p style={{ marginTop: "10px" }}>
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>
    </form>
  );
}

export default Register;
