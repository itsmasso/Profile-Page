const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  birthday: Date,
  biography: String,
  favoriteNumber: Number,
  profilePicturePath: String,
});

const UsersModel = mongoose.model("users", UsersSchema);
module.exports = UsersModel;
