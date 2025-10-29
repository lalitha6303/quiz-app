import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Result.css";

const Result = () => {
  const [message, setMessage] = useState("");
  const [previous, setPrevious] = useState(null);
  const score = parseInt(localStorage.getItem("score"));
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    async function updateScore() {
      const res = await fetch(`http://localhost:5000/api/score/${username}`);
      const data = await res.json();
      setPrevious(data.previousScore);

      if (data.previousScore === null) {
        setMessage("👏 First attempt recorded!");
      } else if (score > data.previousScore) {
        setMessage("🎉 You improved from last time!");
      } else if (score === data.previousScore) {
        setMessage("🙂 Same as last time!");
      } else {
        setMessage("😅 Score dropped this time!");
      }

      await fetch("http://localhost:5000/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, score }),
      });
    }
    updateScore();
  }, [username, score]);

  return (
    <div className="result-container">
      <h2>Results</h2>
      <p>You scored {score} / 10</p>
      {previous !== null && <p>Previous score: {previous}</p>}
      <h3>{message}</h3>
      <button onClick={() => navigate("/")}>Reattempt Quiz</button>
    </div>
  );
};

export default Result;
