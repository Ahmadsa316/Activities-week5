const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/express-bcrypt-demo")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

app.post("/api/users", async (req, res) => {
  const { username, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: "User registered" });
});

app.post("/api/users/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  res.status(200).json({ message: "Login successful" });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
