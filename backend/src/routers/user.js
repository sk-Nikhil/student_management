const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const passport = require('../passport-config.js');
const generateToken = require('../middleware/generateToken.js')

router.get("/success", (req,res)=>{
    console.log(req)
    res.send({success:"success login"})
})

router.get("/failed", (req,res)=>{
    res.send({failed:"failure"})
})

// router.post('/login', userController.loginUser);
router.post('/addUser', userController.addUser);

router.post('/login',
    passport.authenticate('login', {
        failureRedirect:'/failed',
        successRedirect:'/success?message=success!%20You%20logged%20in!',
        failureFlash: true, // Enable failure flash messages
    }),
);

module.exports = router;