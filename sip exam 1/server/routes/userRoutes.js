const express = require("express");
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const User = require("../models/users");

router.post("/add", [
  check('name').not().isEmpty().withMessage('Name is required'),
  check('age').isInt({ min: 0 }).withMessage('Age must be a positive number'),
  check('gender').isIn(['male', 'female', 'Other']).withMessage('Invalid gender'),
  check('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
  check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  check('email').isEmail().withMessage('Invalid email address'),
  check('phone').isMobilePhone().withMessage('Invalid phone number'),
  check('location').not().isEmpty().withMessage('Location is required'),
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, age, gender, username, password, email, phone, location } = req.body;

    const usernameIsFound = await User.findOne({'username': username});
    const emailIsFound = await User.findOne({'email': email});
    const phoneIsFound = await User.findOne({'phone': phone});

    if (usernameIsFound) {
      return res.status(400).json({errors:[{'msg': "Username already exists"}]});
    } else if (emailIsFound) {
      return res.status(400).json({errors:[{'msg': "Email already exists"}]});
    } else if (phoneIsFound) {
      return res.status(400).json({errors:[{'msg': "Phone already exists"}]});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      age,
      gender,
      username,
      password: hashedPassword,
      email,
      phone,
      location,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (error) {
    console.error("Error: " + error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
