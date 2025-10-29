import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username.trim()) {
      alert("Please enter your name!");
      return;
    }

    // Check if user exists (optional)
    const response = await fetch(`http://localhost:5000/api/score/${username}`);
    const data = await response.json();
    localStorage.setItem("username", username);
    localStorage.setItem("previousScore", data.previousScore ?? "null");

    navigate("/quiz");
  };

  return (
    <div className="login-container">
      <h2>Welcome to QuizMaster ⚡</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Start Quiz</button>
    </div>
  );
};

export default Login;
