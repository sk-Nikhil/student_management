const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const loginController = require('../controllers/loginController.js');

router.post('/addUser', userController.addUser);
router.post('/login', loginController.loginUser)

module.exports = router;