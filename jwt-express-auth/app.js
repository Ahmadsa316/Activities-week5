const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/jwt-demo")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  username: String,
  password: String
});

const User = mongoose.model("User", userSchema);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashed });
  await user.save();

  const token = jwt.sign({ username }, "secret123");
  res.json({ message: "User registered", token });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.status(400).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign({ username }, "secret123");
  res.json({ message: "Login successful", token });
});

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];

  jwt.verify(token, "secret123", (err, user) => {
    if (err) return res.status(401).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
}

app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

app.listen(3001, () => console.log("Server running on 3001"));
