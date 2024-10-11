const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const viewUser = asyncHandler(async (req, res) => {
    const { email } = req.params;

    try {
        const user = await User.findOne({ email });

        if (user) {
            const userData = {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                image: user.image,
                links: user.links
            }
            return res.status(200).json({
                message: 'User',
                userData
            })
        } else {
            return res.status(404).json({
                message: 'User not found'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Server error'
        })
    }
});

const getUser = asyncHandler(async (req, res) => {
    const { email } = req.params;

    try {
        const user = await User.findOne({ email });
        if (user) {
            return res.status(200).json({
                message: 'User',
                user
            })
        } else {
            return res.status(404).json({
                message: 'User not found'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Server error'
        })
    }
});

const updateProfile = asyncHandler(async (req, res) => {
    const { email } = req.params;
    const { firstName, lastName, image } = req.body;

    try {
        const user = await User.findOne({ email });
        if (user) {
            user.firstName = firstName || user.firstName;
            user.lastName = lastName || user.lastName;
            user.image = image || user.image;

            await user.save();
            return res.status(200).json({
                message: 'User updated',
                user
            })
        } else {
            return res.status(404).json({
                message: 'User not found'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Server error'
        })
    }
});

const updateLinks = asyncHandler(async (req, res) => {
    const { email } = req.params;
    const { links } = req.body;

    console.log('links', links)

    try {
        const user = await User.findOne({ email });
        if (user) {
            user.links = links;

            await user.save();
            return res.status(200).json({
                message: 'User updated',
                user
            })
        }
        else {
            return res.status(404).json({
                message: 'User not found'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Server error'
        })
    }
});

module.exports = {
    viewUser,
    getUser,
    updateProfile,
    updateLinks
}