import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection (use your working Atlas string)
const mongoURI = "mongodb+srv://quizuser:quiz1234@quizapp.6btjo1q.mongodb.net/quizDB?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  score: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// ✅ Get previous score
app.get("/api/score/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (user) res.json({ previousScore: user.score });
    else res.json({ previousScore: null });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Save or update score
app.post("/api/score", async (req, res) => {
  try {
    const { username, score } = req.body;
    const user = await User.findOneAndUpdate(
      { username },
      { score, updatedAt: new Date() },
      { new: true, upsert: true }
    );
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving score" });
  }
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
