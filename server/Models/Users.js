const mongoose = require('mongoose')

const UsersSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: String,
    favoriteNumber: Number,
    birthdate: Date,
    email: String,
    password: String


})

const UsersModel = mongoose.model('users', UsersSchema)
module.exports = UsersModel