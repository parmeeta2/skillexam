const express = require('express');
const router = express.Router();
const User = require("../models/users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/verify', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                //login is successful.
                const token = jwt.sign({userId:user[username]}, process.env.JWT_SEVRET ||  'secretkeyasdf', {
                    expiresIn: '3h',
                })
                const userDetails = {
                    name: user.name,
                };

                return res.status(200).json({ message: 'Sign-in successful', user: userDetails , token});
            } else {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', 'Error': error });
    }
});

module.exports = router;
