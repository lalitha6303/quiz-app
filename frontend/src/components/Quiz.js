import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";

const questions = [
  { question: "What does CPU stand for?", options: ["Central Process Unit", "Central Processing Unit", "Computer Personal Unit", "Central Processor Utility"], answer: "Central Processing Unit" },
  { question: "Which programming language is known as the mother of all languages?", options: ["C", "Java", "Python", "Assembly"], answer: "C" },
  { question: "What is the full form of HTTP?", options: ["Hyper Transfer Text Protocol", "Hyper Text Transfer Protocol", "High Transfer Text Program", "Hyper Text Translate Process"], answer: "Hyper Text Transfer Protocol" },
  { question: "Which company developed Java?", options: ["Sun Microsystems", "IBM", "Microsoft", "Oracle"], answer: "Sun Microsystems" },
  { question: "Which device is used to connect computers over the Internet?", options: ["Router", "Monitor", "Keyboard", "Switch"], answer: "Router" },
  { question: "What does RAM stand for?", options: ["Random Access Memory", "Read Access Memory", "Run Access Memory", "Ready Access Memory"], answer: "Random Access Memory" },
  { question: "Which of these is an example of an operating system?", options: ["Windows", "MS Word", "Google", "Intel"], answer: "Windows" },
  { question: "HTML is used for?", options: ["Designing", "Styling", "Structuring web pages", "Database"], answer: "Structuring web pages" },
  { question: "Which of the following is a NoSQL database?", options: ["MongoDB", "MySQL", "Oracle", "PostgreSQL"], answer: "MongoDB" },
  { question: "Which language is used for AI?", options: ["Python", "C", "Assembly", "HTML"], answer: "Python" },
];

const Quiz = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const handleAnswer = (option) => {
    if (option === questions[current].answer) setScore(score + 1);
    const next = current + 1;
    if (next < questions.length) setCurrent(next);
    else {
      localStorage.setItem("score", score + 1);
      navigate("/result");
    }
  };

  return (
    <div className="quiz-container">
      <h2>{questions[current].question}</h2>
      <div className="options">
        {questions[current].options.map((opt, i) => (
          <button key={i} onClick={() => handleAnswer(opt)}>
            {opt}
          </button>
        ))}
      </div>
      <p>
        Question {current + 1} of {questions.length}
      </p>
    </div>
  );
};

export default Quiz;
