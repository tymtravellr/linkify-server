const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers?.authorization?.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

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