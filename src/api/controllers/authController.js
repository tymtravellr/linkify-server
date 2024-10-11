const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const JWT_SECRET = 'ab3cf1f1126aa5340deebf1dd8f5873dc1a63c261240ec200907b86b0758e351d1dd74d330e0a19075b18cc70316336c1b399558665a99e1cb75161e0c754d9c'

const registerUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({
            message: 'Please provide an email and password'
        });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).json({
            message: 'User already exists'
        });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            email,
            password: hashedPassword,
            firstName: '',
            lastName: '',
            image: '',
            links: [],
        })

        if (user) {
            res.status(201).json({
                _id: user._id,
                email: user.email,
                token: generateToken(user),
            });
        }
        else {
            res.status(400).json({
                message: 'Invalid user data'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
});

const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    console.log('email:', email, 'password:', password);

    // Include '+password' to explicitly select the password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        res.status(401).json({
            message: 'Invalid credentials'
        });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        res.status(401).json({
            message: 'Invalid credentials'
        });
    }

    if (isMatch) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user)
        });
    }
});

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
        },
        JWT_SECRET,
        {
            expiresIn: '24h',
        }
    );
};

module.exports = { registerUser, loginUser };