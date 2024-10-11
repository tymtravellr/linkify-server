const express = require('express');
const router = express.Router();
const userController = require('../api/controllers/userController');
const { protect } = require('../api/middleware/auth');

router.route('/view/:email')
    .get(userController.viewUser)

router.route('/:email')
    .get(userController.getUser)

router.route('/:email/profile')
    .put(protect, userController.updateProfile)

router.route('/:email/links')
    .put(protect, userController.updateLinks)

module.exports = router;