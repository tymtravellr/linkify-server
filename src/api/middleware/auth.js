const jwt = require('jsonwebtoken');
// const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const JWT_SECRET = 'ab3cf1f1126aa5340deebf1dd8f5873dc1a63c261240ec200907b86b0758e351d1dd74d330e0a19075b18cc70316336c1b399558665a99e1cb75161e0c754d9c';
const protect = async (req, res, next) => {
    let token;

    console.log('req.headers:', req.headers);
    if (req.headers?.authorization?.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];
            // Verify token
            const decoded = jwt.verify(token, JWT_SECRET);

            // Add user to req object
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error('Error:', error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }
    else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
};

module.exports = { protect };