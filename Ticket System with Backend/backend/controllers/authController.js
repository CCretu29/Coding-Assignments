const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/register", async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (!email ||!password ||!username) {
        return res.status(400).send({ message: "Email, password, and username are required." });
      }
      if(password.length < 8) {
        return res.status(400).send({ message: "Password must be at least 8 characters long." });
      }
    const user = new User({ email, password, username });
    await user.save();
    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "An error occurred during registration" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
        return res.status(400).send({ message: "Invalid email or password" });
      }
    res.send({
      "message": "Login successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "An error occurred during login" });
  }
});


router.get("/getAll", async (req, res) => {
    try {
      const users = await User.find({});
      
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching users.' });
    }
  });
  
  router.delete('/all', async (req, res) => {
    try {
      const result = await User.deleteMany({});
  
      res.status(200).json({ message: 'All users have been deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while deleting users.' });
    }
  });

module.exports = router;