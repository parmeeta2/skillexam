const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true, 
  },
  gender: {
    type: String,
    required: true, 
  },
  username: {
    type: String,
    required: true, 
  },
  password: {
    type: String,
    required: true, 
  },
  email: {
    type: String,
    required: true, 
  },
  phone: {
    type: String,
    required: true, 
  },
  date: {
    type: Date,
    default: Date.now, 
    required: true,
  },
  location: {
    type: String,
    required: true, 
  },
});


const User = mongoose.model("User", userSchema, "users");

module.exports = User;
