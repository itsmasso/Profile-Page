import mongoose from 'mongoose';

const UsersSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  birthday: {type: Date, required: true},
  biography: {type: String},
  favoriteNumber: {type: Number, required: true},
  profilePicturePath: {type: String},
});

const UsersModel = mongoose.model("users", UsersSchema);
export default UsersModel;
