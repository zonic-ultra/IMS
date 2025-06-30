import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../service/ApiService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loginData = { email, password };
      const reponse = await ApiService.loginUser(loginData);

      console.log(reponse);

      if (reponse.status === 200) {
        ApiService.saveToken(reponse.token);
        ApiService.saveRole(reponse.role);

        setMessage(reponse.message);
        navigate("/dashboard");
      }
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Error Registering a User" + error
      );
      console.log(error);
    }
  };
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {message && <p className="message"> {message}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};
export default LoginPage;
