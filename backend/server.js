const User = require("./models/user");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB database
mongoose.connect("mongodb://localhost:27017/project_management", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// API endpoints
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: req.body.password,
      type: req.body.type,
    });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/users/:id", (req, res) => {
  // Implement logic to update an existing user in the database
});

app.delete("/api/users/:id", (req, res) => {
  // Implement logic to delete an existing user from the database
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
