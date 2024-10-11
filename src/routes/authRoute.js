const express = require('express');
const { registerUser, loginUser, validateToken } = require('../api/controllers/authController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/validate', validateToken);

module.exports = router;