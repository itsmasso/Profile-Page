import express from "express";
import UsersModel from "../Models/Users.js";
import multer from "multer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userAuth from "../middlewares/userAuth.js";

const router = express.Router();

// Multer config for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const uploads = multer({ storage });

// First step of registration: check username and email
router.post("/register/first-step", async (req, res) => {
  const { username, email } = req.body;
  try {
    const existingUser = await UsersModel.findOne({ username });
    const existingEmail = await UsersModel.findOne({ email });

    if (existingEmail)
      return res
        .status(409)
        .json({ success: false, message: "Email already exists." });
    if (existingUser)
      return res
        .status(409)
        .json({ success: false, message: "Username already exists." });

    return res.status(200).json({ success: true, message: "OK" });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error." });
  }
});

// Second step: save full user with image
router.post(
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
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({ success: true, user: newUser });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }
);

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UsersModel.findOne({ username });

  if (!user)
    return res
      .status(401)
      .json({ success: false, message: "Username does not exist." });

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch)
    return res
      .status(401)
      .json({ success: false, message: "Invalid password." });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res
    .status(200)
    .json({ success: true, message: "Logged in successfully." });
});

// Logout
router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully." });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// User profile
router.get("/user-profile", userAuth, async (req, res) => {
  try {
    const user = await UsersModel.findById(req.user.id);

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });

    const {
      username,
      password,
      email,
      firstName,
      lastName,
      birthday,
      biography,
      favoriteNumber,
      profilePicturePath,
    } = user;

    res.json({
      username,
      password,
      email,
      firstName,
      lastName,
      birthday,
      biography,
      favoriteNumber,
      profilePicturePath,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put("/edit-profile", userAuth, async (req, res) => {
  const { username, email } = req.body;
  try {
    const updates = req.body;
    const existingUser = await UsersModel.findOne({ username });
    const existingEmail = await UsersModel.findOne({ email });
    if (existingEmail && existingEmail._id.toString() !== req.user.id) {
      return res
        .status(409)
        .json({ success: false, message: "Email already exists." });
    }

    if (existingUser && existingUser._id.toString() !== req.user.id) {
      return res
        .status(409)
        .json({ success: false, message: "Username already exists." });
    }
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const updatedUser = await UsersModel.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true }
    );

    res.json({ success: true, user: updatedUser });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
router.put(
  "/update-profile-picture",
  userAuth,
  uploads.single("profilePicture"),
  async (req, res) => {
    try {
      const user = await UsersModel.findById(req.user.id);
      if (!user)
        return res
          .status(404)
          .json({ success: false, message: "User not found" });

      user.profilePicturePath = req.file.path;
      await user.save();

      res.json({ success: true, user });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
);
export default router;
