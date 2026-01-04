import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <h2>Login</h2>

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

      <button type="submit">Login</button>

      <p style={{ marginTop: "10px" }}>
        Don&apos;t have an account?{" "}
        <Link to="/register">Register</Link>
      </p>
    </form>
  );
}

export default Login;
