const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types;

const UsersSchema = new mongoose.Schema({
    username: { type: String , required: true },
    password: { type: String , required: true },
    booksCollection: [ String ]
});

const UserModel = mongoose.model("user" , UsersSchema );

module.exports = UserModel;