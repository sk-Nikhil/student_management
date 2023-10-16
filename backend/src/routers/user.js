const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

router.post('/login', userController.loginUser);
router.post('/addUser', userController.addUser);

module.exports = router;