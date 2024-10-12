const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authController = require('./controllers/authController');
const connectDB = require('./db/db');
const mongoose = require('mongoose');
const app = express();



app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/auth', authController);

// Connect to DB
mongoose
  .connect(connectDB.url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB", err);
  });

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
