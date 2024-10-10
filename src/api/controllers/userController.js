const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const crypto = require('crypto');

const registerUser = asyncHandler(async (req, res, next) => {
    const { email, password, isAdmin } = req.body;

    if (!email || !password) {
        next(ErrorHandler.validationError('Email and Password are required'));
        return;
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        next(ErrorHandler.conflict('User already exists'));
        return;
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            email,
            password: hashedPassword,
            isAdmin
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user)
            });
        }
        else {
            next(ErrorHandler.badRequest('Invalid Data'));
            return;
        }
    }
    catch (error) {
        next(ErrorHandler.badRequest(error.message));
    }
});

const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Include '+password' to explicitly select the password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        next(ErrorHandler.notFound('Email Not Found'));
        return;
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        next(ErrorHandler.notFound('Wrong Password'));
        return;
    }

    if (isMatch) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user)
        });
    }
});

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '24h',
        }
    );
};

module.exports = { registerUser, loginUser };