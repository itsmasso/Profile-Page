const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UsersModel = require("./Models/Users");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/Users");

app.post("/register", (req, res) => {
  UsersModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  UsersModel.findOne({ username: username }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("The password is incorrect.");
      }
    } else {
      res.json("Username does not exist.");
    }
  });
});

app.listen(3001, () => {
  console.log("Server is running.");
});
