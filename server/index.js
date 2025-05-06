const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UsersModel = require("./Models/Users");
const multer = require("multer");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/Users");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder where files are saved
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); 
  },
});

const uploads = multer({ storage });

app.post("/register/first-step", async (req, res) => {
  const { username, email } = req.body;

  try {
    const existingUser = await UsersModel.findOne({ username });
    const existingEmail = await UsersModel.findOne({ email });

    if (existingEmail) {
      return res.status(409).json({ status: "Email exists" });
    }

    if (existingUser) {
      return res.status(409).json({ status: "Username exists" });
    }

    return res.status(200).json({ status: "OK" });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

app.post(
  "/register/second-step",
  uploads.single("profilePicture"),
  async (req, res) => {
    try {
      const userData = req.body;

      if (userData.password) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;
      }
      if (req.file) {
        userData.profilePicturePath = req.file.path;
      }
      const newUser = await UsersModel.create(userData);
      res.json(newUser);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UsersModel.findOne({ username });
  if (!user) {
    return res.status(401).json({ error: "Username does not exist." });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(401).json({ error: "Incorrect password." });
  }
  res.json({ status: "Success" });
});

app.listen(3001, () => {
  console.log("Server is running.");
});
